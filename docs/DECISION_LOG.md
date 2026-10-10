# Decision Log

Updated: 2026-10-10

## Confirmed project constraints

- Preserve the existing NITSCTI production website and branding. All current implementation remains local; no push, merge, deploy, production setting, DNS or live-data change.
- Student experience has priority. Employee/salary information must not appear in student views.
- Do not represent demo flows as real institute submissions, payments, course access or learning records.

## Founder-confirmed business decisions

- None newly recorded in this session. Course fees, duration, schedules, curricula, admission approval and payment verification rules remain unconfirmed; do not invent them.

## Engineering decisions (proposals, not founder business approval)

- Keep the existing root public site static and preserve its root build/deployment contract; place student web and Expo app in separate directories.
- Treat Supabase as a proposed backend only. Do not connect clients or apply migrations until a separate development project and policies are configured and tested.
- Keep public fee/duration values null until the institute verifies them.
- Add a Node built-in test for shared catalog integrity instead of a new test-framework dependency.
- Keep work on the current local feature branch and preserve the dirty worktree. Do not stage, commit, push, merge or switch branches as part of this continuation.
