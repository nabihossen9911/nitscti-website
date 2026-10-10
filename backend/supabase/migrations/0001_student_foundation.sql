-- Local proposal only; never applied to a hosted Supabase project.
-- Seed course_catalog only from owner-verified public data.
create schema if not exists extensions;
create extension if not exists pgcrypto with schema extensions;
create schema if not exists app_private;
revoke all on schema app_private from public, anon;
grant usage on schema app_private to authenticated;

create type public.application_state as enum ('submitted', 'under_review', 'approved', 'rejected');
create type public.payment_state as enum ('unverified', 'pending', 'verified', 'failed', 'refunded');
create type public.enrollment_state as enum ('pending', 'active', 'expired', 'revoked');

create or replace function app_private.is_staff()
returns boolean language sql stable set search_path = '' as $$
  select coalesce(auth.jwt() -> 'app_metadata' ->> 'role' in ('admin', 'trainer'), false);
$$;
revoke all on function app_private.is_staff() from public, anon;
grant execute on function app_private.is_staff() to authenticated;

create table public.course_catalog (
  id text primary key,
  title text not null,
  category text not null,
  summary_en text not null,
  summary_bn text not null,
  image_path text,
  fee_minor_units bigint check (fee_minor_units is null or fee_minor_units >= 0),
  duration_minutes integer check (duration_minutes is null or duration_minutes > 0),
  curriculum jsonb not null default '[]'::jsonb,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.student_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  preferred_locale text not null default 'bn' check (preferred_locale in ('bn', 'en')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.student_applications (
  id uuid primary key default extensions.gen_random_uuid(),
  student_id uuid not null references auth.users(id) on delete restrict,
  course_id text not null references public.course_catalog(id) on delete restrict,
  state public.application_state not null default 'submitted',
  payment_state public.payment_state not null default 'unverified',
  submitted_at timestamptz not null default now(),
  reviewed_at timestamptz,
  unique (student_id, course_id)
);

create table public.student_payments (
  id uuid primary key default extensions.gen_random_uuid(),
  application_id uuid not null references public.student_applications(id) on delete restrict,
  student_id uuid not null references auth.users(id) on delete restrict,
  amount_minor_units bigint not null check (amount_minor_units > 0),
  currency text not null check (currency ~ '^[A-Z]{3}$'),
  state public.payment_state not null default 'pending',
  provider_reference text,
  verified_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.student_enrollments (
  id uuid primary key default extensions.gen_random_uuid(),
  student_id uuid not null references auth.users(id) on delete restrict,
  course_id text not null references public.course_catalog(id) on delete restrict,
  application_id uuid not null unique references public.student_applications(id) on delete restrict,
  state public.enrollment_state not null default 'pending',
  access_expires_at timestamptz,
  created_at timestamptz not null default now(),
  unique (student_id, course_id)
);

create table public.course_lessons (
  id uuid primary key default extensions.gen_random_uuid(),
  course_id text not null references public.course_catalog(id) on delete restrict,
  title text not null,
  position integer not null check (position > 0),
  published boolean not null default false,
  content_reference text,
  completion_rule jsonb not null default '{}'::jsonb,
  unique (course_id, position)
);

create table public.learning_progress (
  student_id uuid not null references auth.users(id) on delete restrict,
  lesson_id uuid not null references public.course_lessons(id) on delete restrict,
  state text not null default 'not_started' check (state in ('not_started', 'in_progress', 'completed')),
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (student_id, lesson_id)
);

create table public.student_certificates (
  id uuid primary key default extensions.gen_random_uuid(),
  student_id uuid not null references auth.users(id) on delete restrict,
  course_id text not null references public.course_catalog(id) on delete restrict,
  verification_id text not null unique,
  issued_at timestamptz not null default now(),
  revoked_at timestamptz,
  unique (student_id, course_id)
);

alter table public.course_catalog enable row level security;
alter table public.student_profiles enable row level security;
alter table public.student_applications enable row level security;
alter table public.student_payments enable row level security;
alter table public.student_enrollments enable row level security;
alter table public.course_lessons enable row level security;
alter table public.learning_progress enable row level security;
alter table public.student_certificates enable row level security;

create policy "published courses are public" on public.course_catalog
  for select to anon, authenticated using (published);
create policy "staff manage course catalog" on public.course_catalog
  for all to authenticated using (app_private.is_staff()) with check (app_private.is_staff());
create policy "students read own profile" on public.student_profiles
  for select to authenticated using (id = (select auth.uid()));
create policy "students create own profile" on public.student_profiles
  for insert to authenticated with check (id = (select auth.uid()));
create policy "students update own profile" on public.student_profiles
  for update to authenticated using (id = (select auth.uid())) with check (id = (select auth.uid()));

create policy "students read own applications" on public.student_applications
  for select to authenticated using (student_id = (select auth.uid()));
create policy "students submit own applications" on public.student_applications
  for insert to authenticated with check (
    student_id = (select auth.uid()) and exists (
      select 1 from public.course_catalog c
      where c.id = student_applications.course_id and c.published
    )
  );
create policy "staff review applications" on public.student_applications
  for select to authenticated using (app_private.is_staff());
create policy "staff update applications" on public.student_applications
  for update to authenticated using (app_private.is_staff()) with check (app_private.is_staff());

create policy "students read own payments" on public.student_payments
  for select to authenticated using (student_id = (select auth.uid()));
create policy "staff manage payments" on public.student_payments
  for all to authenticated using (app_private.is_staff()) with check (app_private.is_staff());
create policy "students read own enrollments" on public.student_enrollments
  for select to authenticated using (student_id = (select auth.uid()));
create policy "staff manage enrollments" on public.student_enrollments
  for all to authenticated using (app_private.is_staff()) with check (app_private.is_staff());

create policy "enrolled students read published lessons" on public.course_lessons
  for select to authenticated using (
    published and exists (
      select 1 from public.student_enrollments e
      where e.student_id = (select auth.uid()) and e.course_id = course_lessons.course_id
        and e.state = 'active' and (e.access_expires_at is null or e.access_expires_at > now())
    )
  );
create policy "staff manage lessons" on public.course_lessons
  for all to authenticated using (app_private.is_staff()) with check (app_private.is_staff());
create policy "students read own progress" on public.learning_progress
  for select to authenticated using (student_id = (select auth.uid()));
create policy "staff manage progress" on public.learning_progress
  for all to authenticated using (app_private.is_staff()) with check (app_private.is_staff());
create policy "students read own certificates" on public.student_certificates
  for select to authenticated using (student_id = (select auth.uid()));
create policy "staff manage certificates" on public.student_certificates
  for all to authenticated using (app_private.is_staff()) with check (app_private.is_staff());

revoke all on public.course_catalog, public.student_profiles, public.student_applications,
  public.student_payments, public.student_enrollments, public.course_lessons,
  public.learning_progress, public.student_certificates from anon, authenticated;
grant select on public.course_catalog to anon, authenticated;
grant insert, update, delete on public.course_catalog to authenticated;
grant select on public.student_profiles to authenticated;
grant insert (id) on public.student_profiles to authenticated;
grant update (display_name, preferred_locale, updated_at) on public.student_profiles to authenticated;
grant select on public.student_applications to authenticated;
grant insert (student_id, course_id) on public.student_applications to authenticated;
grant update (state, payment_state, reviewed_at) on public.student_applications to authenticated;
grant select on public.student_payments to authenticated;
grant insert, update, delete on public.student_payments to authenticated;
grant select on public.student_enrollments to authenticated;
grant insert, update, delete on public.student_enrollments to authenticated;
grant select on public.course_lessons to authenticated;
grant insert, update, delete on public.course_lessons to authenticated;
grant select on public.learning_progress to authenticated;
grant insert, update, delete on public.learning_progress to authenticated;
grant select on public.student_certificates to authenticated;
grant insert, update, delete on public.student_certificates to authenticated;

comment on table public.student_applications is 'Client inserts can set only student_id and course_id; state fields use defaults and staff-only update policies.';
comment on table public.student_payments is 'Client payment writes are denied by RLS; trusted provider webhook/server verification is required.';
comment on table public.learning_progress is 'Students can read only. Server-side completion validation is not implemented in this proposal.';
comment on table public.student_certificates is 'Certificate issue/revocation requires a trusted staff/server process after eligibility checks.';

