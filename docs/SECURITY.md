# Security and Privacy Baseline

## Implemented boundaries

- No credentials, tokens, real student records, or production environment values are included in source.
- Local demo data is synthetic and visibly labelled. Local applications contain no name, phone, email or other personal details and are not submitted to the institute.
- A missing backend configuration is an unavailable state, not a successful sign-in/payment.
- The Supabase migration is local source only and must not be applied to an account without a separate approved setup.
- Production Supabase service-role credentials must remain on a trusted server and never be placed in a web or Android bundle.

## Not yet configured or validated

- Supabase project, verified email provider, SMS provider, app signing, live authorization, backups and data deletion.
- Email and phone verification; actual student accounts cannot be provisioned until trusted providers and policies are configured.
- Payment gateway, admin payment verification and any payment state transition.
- Admin/teacher roles and protected operational dashboards.
- Security review against a live database and penetration testing.

## Required backend policy

- Default-deny access to student-specific tables; a student can read/update only permitted fields of their own profile and records.
- Students cannot set their own roles, payment status, admission approval, course enrollment, grades, certificate status or audit fields.
- Enrollment unlock requires server-verified admission approval and payment confirmation.
- Rate-limit authentication and validate every input at the trusted boundary.
- Do not log passwords, OTPs, access tokens, student contact details or payment data.
- Test RLS policies with two distinct accounts before any live use.
