# NITSCTI Brand and Existing Site Audit

Audit date: 2026-10-10  
Scope: local repository source and public homepage; read-only. No production configuration was changed.

## Existing product

- The repository root is a static HTML/CSS/vanilla JavaScript website, not React/Vite.
- Main source: `index.html`, `assets/css/{base,layout,components,pages,responsive}.css`, `assets/js/main.js`.
- Existing course detail page: `courses/web-development.html`.
- Brand assets are under `assets/images/logo/`; course, gallery, hero, about and student imagery are under `assets/images/`.
- There is no root `package.json`, application backend, student account system, or mobile app.
- Existing Vercel rewrites serve the separate digital card. They must remain intact unless separately reviewed.

## Brand elements to preserve

- Logo: `assets/images/logo/web/nitscti-logo.svg`.
- Primary color: `#199edc`; primary dark: `#1487bc`.
- Light surface/background: white; heading `#231f20`; body `#555555`; muted `#777777`; border `#e5e7eb`.
- Typography: Poppins, loaded from Google Fonts, with sans-serif fallback.
- Existing dark mode: `body.dark-mode` token overrides.
- Radius tokens: 8, 12, 18, 24 px and pill; spacing tokens: 8, 12, 20, 32, 48, 72 px.
- Existing voice and content: practical IT training, career support, local institute contact and current course imagery.

## Findings and risks

- Existing home page has responsive breakpoints at 1400, 1200, 992, 768 and 576 px, keyboard focus styling, and reduced-motion support.
- White text on `#199edc` has about 3.01:1 contrast; white text on `#1487bc` about 4.02:1. Both are below 4.5:1 for normal text. Keep the original brand accent for decoration, but use a darker accessible action color for small white button text.
- The branch adds `courses.html`, `office-course.html` and a useful `404.html`, and updates the sitemap for the new public routes. These are local development changes only.
- The public website form has no `action` or application handler. Do not claim it sends an inquiry.
- Placeholder links (`#`) exist for course, overview, social, privacy and terms actions. Check each before describing it as functional.
- The homepage contains different student/course metric figures. Do not reproduce them in new experiences until reconciled with institute records.
- Course claims differ between the home page and the existing web-development detail page. Fees, schedules and curricula must be confirmed by the institute before being treated as canonical.
- The Student Web app reuses the existing NITSCTI SVG logo and course images, with the existing blue palette, Poppins and a Bengali-capable font fallback. Original root image files were not edited.
- Existing course WebP files range from roughly 1.6 to 2.2 MB each; the Student Web build currently includes all six, so responsive compressed variants remain a performance follow-up.

## Scope boundary

The static marketing site is the existing production source. Preserve its root entry point, SEO metadata, routes, design assets and Vercel configuration. New student experiences live in separate app folders and must not be represented as deployed or connected to real learner data until explicitly configured and tested.
