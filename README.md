# NITSCTI Website and Student MVP

This repository contains the existing NITSCTI static public website and local-only Student Web/Android development targets. The existing root website remains the original HTML/CSS/JavaScript deployment target; the student apps are separate projects under `apps/`.

## Existing public website

- Static entry: `index.html`
- Published course listing and the Office course details added locally: `courses.html`, `office-course.html`
- Shared public course summaries: `packages/shared/course-catalog.json`
- Existing visual assets: `assets/images/`
- Existing Vercel routing configuration: `vercel.json` (preserved)

Course fees, schedules, duration and verified curricula are intentionally blank or referred to the institute until they are confirmed. Existing Web Development detail content conflicts with the public homepage summary, so the student catalogue does not treat that page as canonical.

## Student Web

Requires Node.js and npm. In PowerShell:

```powershell
cd apps/student-web
npm ci --cache "D:\SE\NITSCTI\npm-cache-nitscti"
npm run dev
```

Vite prints the local URL. Checks are `npm test`, `npm run lint` and `npm run build`. `npm test` validates shared catalog IDs, bilingual copy, local asset/detail-page paths, and keeps unverified fees/durations unpublished.

## Student Android

The native Expo app is in `apps/student-android`. Install its dependencies with the same npm cache option, then run `npm start`. Press `a` to open an Android emulator/device when Android Studio, JDK, SDK and ADB are installed. `npm run typecheck` checks TypeScript and `npm run export:android` exports the JavaScript bundle; neither command produces a signed APK/AAB.

Bangla is the default language. Profile settings switch to English. Course interest in Android memory lasts only for the open app session; the Web demo interest is local to that browser. Neither is an admission application or sent to NITSCTI.

## Backend and environment

`backend/supabase/migrations/0001_student_foundation.sql` is an un-applied local schema proposal with row-level policies. No Supabase project or provider is connected. App `.env.example` files contain empty placeholders only; do not add service-role credentials to either client app. Authentication, admission review, payment verification, lessons, progress and certificate issuance are unavailable until server workflows and policies are configured and tested.

## Production safety

Work is local to `feature/nitscti-full-mvp`. No GitHub push, merge, Vercel deployment, DNS/Cloudflare change, live database write or Play Store submission is part of this task. Review the local diff and validation notes in `docs/` before any future release decision.

For the current verified checkpoint and resume steps, see [`docs/MASTER_PROGRESS.md`](docs/MASTER_PROGRESS.md) and [`docs/NEXT_SESSION.md`](docs/NEXT_SESSION.md).
