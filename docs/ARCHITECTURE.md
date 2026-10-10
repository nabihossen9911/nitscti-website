# Architecture

## Current state

The repository root is the existing static NITSCTI website. It remains the Vercel project root. This task does not change its production deployment, branch settings, DNS, or environment variables.

## Local-first additions

- `apps/student-web`: responsive React/TypeScript student experience, independently buildable.
- `apps/student-android`: Expo React Native Android student experience.
- `packages/shared`: public course catalog and shared, non-secret domain types.
- `backend/supabase/migrations`: proposed Postgres schema with row-level policies; it is not applied to a cloud project.

Each app has its own package manifest. There is no root npm workspace and no change to the existing root website build contract.

## Data and trust boundaries

- The public course catalog only contains course names/description published by the current website. Fee, batch, schedule and curriculum fields remain unspecified until verified.
- Supabase is the proposed shared backend because both web and native clients can use verified email authentication and the same Postgres data with row-level security. It is not connected yet; no project URL, public key, service key, email provider, SMS provider or payment credentials are available.
- `packages/shared` holds only public catalog metadata and client-safe types.
- `packages/shared/course-catalog.test.mjs` is a dependency-free integrity check run via `apps/student-web`'s `npm test`; it validates the public data contract and referenced local assets/detail pages.
- Private user and learning records require server-enforced RLS. A client-supplied student ID never grants access.
- Both apps currently remain explicitly marked demos; Supabase is not integrated, even when placeholders exist. Web course-interest selection is saved only in that browser; Android interest selection is memory-only for the open session. Neither is an admission application or institute submission.
- Payment confirmation, enrollment approval, scoring authority, certificate issuance and identity merges require trusted server/admin processes and are not simulated as completed.

## Build and release boundaries

The website remains served from repository root. Student web and Android are separate build targets. Local Preview/Expo development is safe; no push, merge, cloud deployment, production domain change or Play Store submission is part of this work.
