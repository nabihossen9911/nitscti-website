# NITSCTI 2.0 — Master Progress

Updated: 2026-10-10

## Project vision

Preserve the live NITSCTI public website and brand while building a verified, responsive Student Web and native Android MVP with a secure shared backend. This work is local only. No deployment, push, production configuration change, or live-data write is authorized here.

## Current checkpoint

- Repository: `D:\SE\NITSCTI\NITSCTI_v1`
- Branch: `feature/nitscti-full-mvp`; HEAD `ed5d9aa` (development preview checkpoint).
- Git tree: pre-existing uncommitted implementation plus this continuation; do not reset, clean, switch branches, or discard it.
- Completed this session: added dependency-free shared catalog integrity tests; web catalog test, lint and production build passed; Android TypeScript and lint checks passed; `git diff --check` passed.
- Existing root website is static HTML/CSS/JavaScript. Student Web is a separate React/Vite project; Android is Expo React Native. Supabase SQL remains a proposal only.
- Local-only demo behavior: public catalog, search, course details, language selection, and browser/device-local course interest. No real student identity or institute workflow is connected.

## Progress method

Each module percentage is the approximate share of its listed acceptance criteria evidenced in source and successful checks. It is not a line-count or screen-count measure. Bars round the percentage to the nearest 10%. “Partial” means implementation exists but at least one release-relevant criterion remains unverified or incomplete. Project-wide percentage is intentionally omitted because these modules have different risk and effort weights.

## Module dashboard

| Module | Progress | Status | Acceptance evidence and remaining criteria |
|---|---:|---|---|
| 1. Existing Website Preservation | `[#####.....]` 50% | PARTIALLY COMPLETE | Existing root static site, assets, routes and `vercel.json` remain in local source; local static HTTP checks passed. Production behavior, SEO end-to-end and post-change visual review remain unverified. |
| 2. Brand & Design System | `[######....]` 60% | PARTIALLY COMPLETE | Existing logo, colors, typography, spacing and responsive conventions documented/reused. Contrast improvements and real viewport/Bengali visual review remain. |
| 3. Responsive Public Website | `[####......]` 40% | PARTIALLY COMPLETE | Local course listing, Office detail and 404 additions; route/assets/CSS smoke checks passed. Full existing-site regression, accessibility/SEO audit and inquiry workflow remain. |
| 4. Student Web App | `[####......]` 40% | PARTIALLY COMPLETE | Catalog/search/detail, Bengali/English shell, honest unavailable states; test/lint/build pass. Auth, admission, learning records and visual/e2e QA remain. |
| 5. Student Android App | `[###.......]` 30% | PARTIALLY COMPLETE | Expo home/catalog/profile, language toggle, demo states; typecheck, lint and JS export evidence. Native-device QA, backend flows, icon/splash and APK remain. |
| 6. Authentication | `[..........]` 0% | BLOCKED | Acceptance: development identity provider, secure registration/login/recovery and multi-account authorization tests. No provider/project configured. |
| 7. Backend & Database | `[#.........]` 10% | BLOCKED | Proposed schema/RLS and API contract exist. No migration parse/run, development service, policy test or connected API. |
| 8. Course & Admission Workflow | `[#.........]` 15% | PARTIALLY COMPLETE | Shared six-course public catalog and local interest demo are checked; verified fees/batches and real application/review/payment/enrollment workflow are absent. |
| 9. Learning, Assignment & Quiz | `[..........]` 0% | NOT IMPLEMENTED | No trusted lessons/resources, progress writes, assignments, quiz attempts or server-side scoring. |
| 10. Certificate & Progress Tracking | `[..........]` 0% | NOT IMPLEMENTED | No authoritative progress records, eligibility checks, issuance or public verification. |
| 11. Security & Privacy | `[#.........]` 10% | PARTIALLY COMPLETE | Trust boundaries and RLS intent documented; no live backend/security review, authorization tests, privacy/deletion flow or threat-model validation. |
| 12. Testing & Quality Assurance | `[####......]` 40% | PARTIALLY COMPLETE | Catalog tests (3/3), web lint/build, Android typecheck/lint and prior static/Expo smoke evidence. Browser visual, e2e, backend and device checks remain unavailable. |
| 13. Android APK/AAB Build | `[#.........]` 10% | BLOCKED | Android JS bundle export exists; it is not an APK/AAB. JDK, SDK, ADB and Gradle toolchain are unavailable in current PATH. |
| 14. Play Store Readiness | `[#.........]` 5% | BLOCKED | Release checklist exists. App identity/artwork, privacy/policy review, signed AAB and device validation are outstanding. |

## Verified checkpoint results

- Student Web: `npm test` 3 passed; `npm run lint` passed; `npm run build` passed (TypeScript + Vite).
- Student Android: `npm run typecheck` passed; `npm run lint` passed. Earlier Android bundle export passed, but no native package was produced.
- Android bundle export rerun this session: `npm run export:android` passed; Metro bundled 1,263 modules and wrote a 2.7 MB Hermes bundle to ignored `dist/`. This is still not an APK/AAB.
- Local static preview smoke recheck: `http://127.0.0.1:4174/` and `http://127.0.0.1:5173/` returned HTTP 200 using `curl.exe`.
- `git diff --check` passed.
- See [`TEST_REPORT.md`](TEST_REPORT.md) for command evidence and unavailable checks.

## Blockers and known risks

- No configured development backend, authentication provider, payment authority, or verified institute course pricing/batch data.
- Web course photos remain original large assets (about 11.9 MB combined in the current web build).
- No browser visual QA surface was available in the prior session; no Android SDK/JDK/device is available for native testing/build.
- Bangla text in terminal-rendered output may be affected by console encoding; verify UTF-8 source in editor/browser before revising copy.
- Existing content has conflicting Web Development claims; do not canonize unverified details.

## Production safety

No GitHub push, merge, deployment, Vercel/Cloudflare/DNS setting change, live database write, production branch update, or Play Store submission has been performed in this continuation. Do not push or deploy.

## Next actions

1. Resume on the existing dirty feature branch and inspect only the scoped diff and source encoding; preserve current work.
2. Add focused tests for static course-page rendering/routing or student-web local-only behavior without introducing a test framework dependency.
3. Improve responsive image delivery locally using generated variants only after confirming a deterministic tool is already available; keep originals unchanged.
4. Continue backend-independent UX and accessibility improvements; clearly label demo-only behavior.
5. Record any newly available development backend / verified course decisions as blockers until confirmed, then test migration/RLS before connecting identity or student data.
