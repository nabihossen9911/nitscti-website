# Test and Build Report

Updated: 2026-10-10

## Repository safety

- Verified root: `D:/SE/NITSCTI/NITSCTI_v1`.
- Changes are on local `feature/nitscti-full-mvp`.
- No Git commit/push/merge, Vercel deploy, production-setting edit, DNS/Cloudflare change or live database request was made.

## Completed checks

| Check | Result |
|---|---|
| Existing public-site HTTP smoke check | Pass: local Python HTTP server returned 200 for home, courses, Office, existing Web Development, 404, sitemap, robots, shared catalog, CSS/JS, logo and a course photo. |
| Shared public catalog | Pass: JSON parsed, six course IDs found; no fee/duration values were invented. |
| Shared catalog automated tests | Pass: `npm test` (Node built-in test runner), 3/3 tests; unique IDs, bilingual fields, existing local assets/detail paths, and unverified fee/duration safeguards. |
| Student Web lint | Pass: `npm run lint` (Oxlint), no warnings after correction. |
| Student Web typecheck and production build | Pass: `npm run build` (`tsc -b && vite build`, Vite 8.3.4). JS gzip is about 73 KB; original course image assets add about 12 MB uncompressed. |
| Student Web dev server smoke check | Pass: `http://127.0.0.1:5173/`, `/src/App.tsx`, app styles and copied NITSCTI favicon returned 200; Vite resolved shared JSON, logo and course photos. |
| Expo Android typecheck | Pass: `npm run typecheck` (`tsc --noEmit`). |
| Expo Android lint | Pass: `npm run lint` (`expo lint`). One generated starter web theme hook was simplified to remove a synchronous-effect lint error. |
| Expo Android JavaScript bundle export | Pass: `npm run export:android`; Metro bundled 1,263 modules and wrote a 2.7 MB Android Hermes JS bundle under ignored `apps/student-android/dist/`. |

## Not validated / unavailable

| Check | Result |
|---|---|
| Browser visual test at mobile/tablet/desktop sizes | Not run: no browser window was exposed by the current computer-use environment. CSS breakpoints are present, but layout still needs visual review. |
| Native emulator/device test | Not run: no Android SDK/ADB/device. |
| APK/AAB build or signing | Blocked: no JDK/Android SDK/Gradle signing setup. JS export is not an APK. |
| Supabase SQL/migration/RLS test | Not run: no local PostgreSQL/Supabase instance or configured development project. The migration is only a proposal and was not applied. |
| Authentication, application, payment, course access, lesson completion, quiz, certificate, privacy/deletion E2E | Not run/not implemented: no trusted backend, content, verification provider or payment provider. |
| Performance check on optimized images | Not run: source course images are large; responsive compressed variants have not been generated. |

No unchecked item should be interpreted as a pass.

## 2026-10-10 continuation rerun

| Check | Result |
|---|---|
| `apps/student-web`: `npm test` | Pass, 3 tests, 0 failures. |
| `apps/student-web`: `npm run lint` | Pass, exit code 0. |
| `apps/student-web`: `npm run build` | Pass, TypeScript and Vite production build; source images still add about 11.9 MB. |
| `apps/student-android`: `npm run typecheck` | Pass, exit code 0. |
| `apps/student-android`: `npm run lint` | Pass, exit code 0. |
| `apps/student-android`: `npm run export:android` | Pass; Metro bundled 1,263 modules and exported a 2.7 MB Hermes bundle to ignored `dist/`. This is not an APK/AAB. |
| `git diff --check` | Pass, no whitespace errors. |
| Loopback preview recheck via `curl.exe` | Pass: both `http://127.0.0.1:4174/` and `http://127.0.0.1:5173/` returned HTTP 200. |
