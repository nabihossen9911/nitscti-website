# NITSCTI Design System Baseline

This baseline records values already present in the static site. It does not replace or silently rebrand the current design.

## Tokens

| Token | Existing value | Use |
|---|---|---|
| Primary | `#199edc` | Brand accent, graphics and active states |
| Primary dark | `#1487bc` | Existing darker accent |
| Background / surface | `#ffffff` | Light mode |
| Heading | `#231f20` | Titles |
| Body text | `#555555` | Paragraphs |
| Muted text | `#777777` | Secondary copy |
| Border | `#e5e7eb` | Dividers and controls |
| Font | Poppins, sans-serif | Existing web typography |
| Container max | `1320px` | Existing site layout |
| Radius | `8 / 12 / 18 / 24px`, pill | Existing component scale |
| Spacing | `8 / 12 / 20 / 32 / 48 / 72px` | Existing spacing scale |

Dark mode uses `#0f172a` background, `#1e293b` surface, `#f8fafc` headings, `#cbd5e1` body, `#94a3b8` muted text, and translucent white borders.

## Accessibility decisions

- Existing primary colors are retained as brand accents.
- For white text on filled small controls, use an accessible dark blue derived from the existing brand rather than the 3.01:1 primary or 4.02:1 primary-dark contrast.
- Focus-visible outline and reduced-motion behavior remain required in new web experiences.
- Native controls use explicit accessibility labels/roles and touch targets.
- Bengali is the default language in student experiences; English is available from settings.

## Components

New experiences should reuse the existing logo and course imagery. Use restrained blue accents, white/dark surfaces, clear typography, rounded cards, visible state labels, and compact spacing. Never use unverified fees, student counts, payment success or certification claims as decoration.

## Student app implementation

- The student apps use the same blue/ink/surface tokens and existing course imagery. Student Web imports the source logo and course photos through Vite, leaving the root assets untouched.
- Student Web uses Poppins with Noto Sans Bengali and system fallback; Android uses native system fonts so Bangla glyphs come from the platform font stack.
- Student Web responsive breakpoints are 1050, 760 and 480 px. These have compile and HTTP smoke coverage, but still need visual review on real viewport sizes.
- Course photos currently ship at original source resolution (about 1.6–2.2 MB each). Add derived, responsive optimized variants before a public release.
