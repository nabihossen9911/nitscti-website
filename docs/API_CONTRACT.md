# Student API Contract (proposed; not connected)

The current apps load the public catalog from `packages/shared/course-catalog.json` and make no backend requests. These contracts describe the trust boundary for a future development backend; they are not implemented endpoints.

| Resource | Student operation | Trusted operation / rule |
|---|---|---|
| Public course catalog | Read published summaries only | Staff publishes verified price, duration, curriculum and availability. |
| Student profile | Read own record; update display name and language only | `id` comes from verified auth identity; students cannot set role, verification or audit fields. |
| Admission application | Create an application for a published course; read own status | Server defaults state to `submitted`; only staff can review/approve/reject. Admission ID is separate from the auth/student identity. |
| Payment | Read own recorded payment state | A trusted provider webhook/server verifies payment. Clients cannot create or mark a payment successful. |
| Enrollment | Read own enrollment | Trusted staff/server activates access only after separately verified admission and payment. Access expiry is server-enforced. |
| Lessons and learning progress | Read published lesson resources and own progress, subject to active enrollment | Protected media uses expiring authorization. Completion/quiz/assignment state is server-validated; no completion write endpoint exists yet. |
| Certificates | Read own issued certificate and public verification result | Trusted process issues only after verified course, assessment and assignment eligibility. |

Authentication, application submission, provider webhooks, lesson completion, assessments and certificate verification are not currently available. Do not use these proposed resource names as evidence that the workflows are operational.
