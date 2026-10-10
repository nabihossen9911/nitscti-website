# UI/UX Decisions

1. Preserve the current public-site theme, logo, imagery, typography and core course content.
2. Keep the existing static root website and its Vercel/digital-card rewrites intact.
3. Put the responsive student web experience and native Android app in separate folders so their build tools cannot change the existing static root build.
4. Mark all local sample content as Demo Mode. It must not be mistaken for a real student account, admission, payment, grade or certificate.
5. Do not display course fees, current batch availability or course durations unless supported by current institute data.
6. No form may imply delivery to NITSCTI unless a configured backend confirms it.
7. Use Bengali by default in student experiences, with a working English switch.
8. Show honest loading, empty, offline and unavailable states. Unconfigured authentication and payment stay unavailable rather than returning fake success.
9. The Student Web and Android surfaces both open with a Bengali-default student experience, English language switch and searchable public courses; account/learning views clearly explain their current unavailable status.
10. Student Web course-interest selection stays in browser storage and Android selection stays in process memory. Both are labelled local demos and never contain personally identifying details or create a submitted application.
11. Existing course photos and NITSCTI logo are reused in the web app. The Android screen uses the existing brand colors and NITSCTI wordmark; its launcher icon/splash remain Expo template assets and need approved brand export before release.
