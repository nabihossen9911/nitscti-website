# Next Session — Resume Instructions

1. Work in `D:\SE\NITSCTI\NITSCTI_v1` and re-read `docs/MASTER_PROGRESS.md` plus `git status --short --branch` first. Preserve the dirty worktree; do not reset, clean, switch, stage, commit, push or deploy.
2. The current local branch is `feature/nitscti-full-mvp`, last verified at `ed5d9aa`; verify again because branches can move.
3. Start from the existing static root site, `apps/student-web`, `apps/student-android`, `packages/shared`, and the un-applied Supabase proposal. Do not create a replacement starter or duplicate project.
4. Continue with an independent, local improvement and corresponding focused test. First candidate: test course-page link/data rendering or protect browser-local demo state; keep the catalog as the only verified public source and keep fee/duration unverified.
5. Run only relevant local lint/tests/builds and record exact results in `docs/TEST_REPORT.md`, `docs/SESSION_LOG.md` and `docs/MASTER_PROGRESS.md`.
6. Do not connect real student data until a separate development backend, authentication and RLS are configured and verified. Do not change the production site, `main`, Vercel, Cloudflare, DNS or live database. Do not commit/push/deploy or submit an app.

Current passing checks: student-web `npm test` (3 tests), lint and build; student-android typecheck, lint and JS bundle export; `git diff --check`; both loopback preview roots returned HTTP 200. Android JS export is not an APK/AAB. Native device and browser visual QA remain unavailable and must not be reported as passed.
