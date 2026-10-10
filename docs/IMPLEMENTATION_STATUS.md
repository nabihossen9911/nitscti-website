# Implementation Status

Updated: 2026-10-10

## Repository and production safety

- Repository root: `D:\SE\NITSCTI\NITSCTI_v1`.
- Local work branch: `feature/nitscti-full-mvp` at `ed5d9aa`, currently pointing at the development preview checkpoint. The working tree is intentionally dirty with uncommitted local implementation; preserve it.
- All current work is local. No commit, push, merge, Vercel deployment, production setting, DNS/Cloudflare change, live database write or store submission was performed.
- The original website assets, existing Web Development detail page and `vercel.json` routing configuration were preserved.

## Delivered locally

| Area | Current state | Evidence / limitation |
|---|---|---|
| Existing public site | Course cards now lead to a catalog; `/courses.html`, `/office-course.html` and a useful `404.html` are present locally; sitemap lists new routes. | Existing pages, metadata, SEO file and digital-card rewrites remain. Static HTTP checks passed. Contact form/backend remains unconfigured. |
| Brand audit and design | Audit, tokens, architecture and UI decisions documented. Student Web imports existing SVG logo and course images and uses the brand blues. | WebP source photos are 1.6–2.2 MB each and make the student app build about 12 MB larger; compressed responsive variants remain needed. Visual viewport review remains open. |
| Shared course data | Six public course entries (Office, Graphic Design, Digital Marketing, Video Editing, Web Development and Motion Graphics) with English/Bengali summaries. | Fees, duration and current availability are null/unverified. The known conflicting Web Development details are not treated as canonical. |
| Student Web | React/Vite responsive home, searchable catalog, course information panel, Bengali default/English switch, contact links, empty account/learning states and local-only demo interest. | `npm run lint` and `npm run build` pass. No real account, application, payment, progress or course access. |
| Android Student app | Expo React Native tabs for home, course search/details and profile; language switch; contact action; in-memory demo interests; honest unavailable account/learning states. | TypeScript, lint and Android JS bundle export pass. No emulator/device QA or APK/AAB: Java/JDK, Android SDK, adb and Gradle are unavailable. Expo template app icon/splash still need brand assets. |
| Backend / database | Shared schema proposal and RLS policies under `backend/supabase/migrations/`; empty client environment templates. | Migration is not applied and has not been run against Postgres. No Supabase project/auth providers or trusted payment/admin workflows are connected. |

## 2026-10-10 verified continuation checkpoint

- Added a dependency-free Node test for the shared public course catalog. It checks non-empty unique IDs, required Bengali/English copy, local image and detail paths, and null/unverified fee and duration values.
- Verification: `apps/student-web` `npm test` (3/3), `npm run lint`, `npm run build`; `apps/student-android` `npm run typecheck`, `npm run lint`; repository `git diff --check` all pass.
- Current source status, module acceptance criteria and unresolved blockers are tracked in `docs/MASTER_PROGRESS.md`. Resume from `docs/NEXT_SESSION.md`.

## MVP work that remains

- Owner-confirm current course fees, duration, batch availability, complete curriculum and reconcile the conflicting Web Development details.
- Provision a separate development backend, configure verified identity providers, and test row-level security with multiple student accounts before adding actual sign-in/application workflows.
- Implement server-authoritative application review, payment verification, enrollment unlock, lesson resources/completion, assignment/quiz scoring, and certificate issuance. These are not implemented or simulated.
- Add visual QA on narrow phone, standard phone, tablet and desktop; optimize images; test Bangla rendering on actual Android devices; select final signed app icon and splash screen.
- Add database migration validation, policy tests, UI/unit/integration and end-to-end tests once the required local DB/backend is available.

## Local preview endpoints

- Student Web dev server is running at `http://127.0.0.1:5173/`.
- Existing static website smoke server is running at `http://127.0.0.1:4174/`.
- Expo/Android server is not running. From `apps/student-android`, run `npm start`; Android emulator use additionally requires Android Studio/JDK/SDK/ADB.
