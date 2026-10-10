# Supabase foundation (local proposal)

`migrations/0001_student_foundation.sql` defines shared student/course records and row-level policies for a future Supabase project. It has **not** been applied to any database. The migration intentionally contains no course seed data, user data, project URL or credential.

The application currently uses the shared static course JSON and does not call Supabase. Empty app-specific `.env.example` files document where public client configuration would go after a project owner provisions and approves a project. Do not put a Supabase service-role key in a web or Android app.

Before applying the migration to any environment:

1. Provision a separate development project and confirm its ownership and backup/restore path.
2. Review the SQL with the project owner; verify the `app_metadata.role` staff-claim issuer and least-privilege grants.
3. Add verified course records only after NITSCTI confirms the fee, duration, curriculum and availability fields.
4. Add server-side email/phone verification, application review, payment-provider webhook verification, enrollment unlock, lesson completion and certificate eligibility workflows.
5. Test the policies with two separate student accounts and staff, including attempts to set status, payment, enrollment, progress and certificate fields from a client.

No production URL or secrets are needed for the current local demo.
