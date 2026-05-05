# UI Mock — LMS (OpenGrad)

Purpose: a single, concise spec that lists the static pages, components, and sample flows to build a frontend-only UI mock of the LMS. The mock will be static/route-driven (no backend). Clicking primary actions navigates between pages or opens slide-overs; forms collect input but do not submit.

Audience: Designers, Frontend developers, Product owners.

---

## Goals for the mock

- Represent all student-facing and manager-facing screens required for the MVP PRD.
- Showcase role-based navigation and flows (Student / Manager / Fellow / Super Admin).
- Include samples for all assessment and assignment UIs (question types, question bank, grading, submission).
- Provide static examples of course authoring, course assignment, and student consumption flows.

---

## Roles (for UI states)

- Student — dashboard, my courses, take quiz, submit assignments, calendar
- Manager (Course Manager) — course builder, question bank, quiz/assignment authoring, grading, analytics
- Fellow — school analytics, export reports (UI-only)
- Super Admin — user management (single + bulk CSV mock), global analytics, course assignment

---

## Global layout & components

- Topbar: Logo, role switcher (for mock), notification bell (unread badge), user avatar menu
- Left navigation (role-specific): Dashboard, My Courses, Course Builder, Question Bank, Assignments, Live Classes, Analytics, Users (Super Admin)
- Page header: Title, breadcrumb, primary CTAs (Add Course / Publish / Upload CSV)
- Right-side panel: contextual card (e.g., "Next live class")
- Modals / Slide-overs: Add Video, Add Quiz, Add Question, Bulk CSV Import, Grade Submission
- Shared primitives: Form inputs, file uploader, rich text editor placeholder, date/time picker, table, paginated lists, badges, progress bars
- Video component: YouTube iframe + mocked progress indicator + "Mark complete" control for static demo
- Question palette (quiz view): numbered pill list, flagged state, current question pane

---

## Primary Pages (Prioritized for mock)

1. Authentication & Role Switch
   - `/login` — role selector tab (Student / Manager / Fellow / Super Admin), fields: Roll/Email, Password, "Login" button (navigates to role home). Include "Forgot password" link (non-functional).

Manager & Course Authoring flows (priority: high)
2. Manager Dashboard `/manager` — hero (next live class CTA), quick stats (courses, active students, avg completion), recent activity list
3. Course List `/manager/courses` — card or table list of courses (title, programme, state, status, progress, actions: Edit / Assign / Analytics / Archive)
4. Course Builder — multi-step pages (or slide panes):
   - Course Metadata `/manager/courses/new` (step 1): title, description, programme, state, cover image, locking mode, access type, Save Draft / Next
   - Curriculum Builder `/manager/courses/:id/curriculum` (step 2): modules list, drag-and-drop reorder UI (static drag handles); per module: Add Lesson, Add Quiz; lesson card shows title, youtube URL, duration
   - Lesson Editor slide-over: fields (title, YouTube URL, duration, notes), Save
   - Module Settings panel: reorder, rename, delete
   - Publish modal: confirm Publish (moves Draft → Active)
5. Course Assignment `/manager/courses/:id/assign` — select students (search by roll), batch assign (file upload mock), assign by programme/state (multi-select), preview assigned list
6. Course Management / Course Detail `/manager/courses/:id` — course header, modules list with lock icons, enrolled students list, quick analytics (avg completion, average quiz score), CTA: Edit / Assign / Archive

Assessment & Question Bank (priority: high)
7. Question Bank `/manager/question-bank` — searchable filter chips (subject, topic, programme, difficulty); list of question cards (preview text, type, tags), actions: Edit / Add to Quiz / Delete
8. Create Question slide-over `/manager/question-bank/new` — type selector (MCQ / Fill / Numeric / Group), question body editor, options (for MCQ), correct answer input, tags, save as draft
9. Quiz Builder `/manager/quizzes/new` or `/manager/courses/:id/quizzes/new` — meta: title, duration, max attempts, pass threshold, options (shuffle, show answers). Question picker to pull from Question Bank (checkbox list) or Add New question inline
10. Quiz Preview `/manager/quizzes/:id/preview` — student-facing static preview of quiz UI (no attempts stored)

Assignments & Grading (priority: medium)
11. Assignment List `/manager/assignments` — table of assignments with statuses (Open / Closed / Grading / Graded)
12. Assignment Create `/manager/assignments/new` — title, description, attachment, due date, course/target audience
13. Grading View `/manager/assignments/:id/submissions` — list of submissions with action to open submission in slide-over and grade (score + feedback)

Live Classes & Calendar (priority: medium)
14. Live Classes `/manager/live-classes` — scheduled sessions list, Create Live Class modal (title, date/time, meeting link, course/programme target)

Analytics (priority: medium)
15. Manager Course Analytics `/manager/courses/:id/analytics` — charts: enrolment over time, quiz score distribution, completion %. Quick export CSV button (mock download link)

Super Admin (priority: medium)
16. Super Admin Dashboard `/admin` — global metrics (active users, active courses, avg completion) and pending approvals
17. User Management `/admin/users` — table, filters (role, programme, state), actions: Create user modal (single) and Bulk CSV Import modal (file upload → preview table)

Student flows (priority: high)
18. Student Dashboard `/student` — hero (next live class), enrolled courses with progress bars, upcoming assignments, notifications
19. My Courses `/student/courses` — list of enrolled courses; cards showing progress and quick actions (Continue / View)
20. Course Overview `/student/courses/:id` — course title, description, module list, per-module progress, lock states, progress indicator
21. Module / Lesson List `/student/courses/:id/modules/:moduleId` — list lessons and module test entry
22. Lesson Detail `/student/courses/:id/lessons/:lessonId` — video embed (YouTube), notes, right panel: "Take Module Test" (if present), previous attempts summary, mark as complete button (static)
23. Quiz Taking `/student/quizzes/:id/take` — full-screen quiz UI with timer, question palette, single-question pane that supports MCQ / Fill / Numeric / Group (subquestions). Provide "Submit" and "Flag" actions. Timer display and auto-submit mock (simulated countdown)
24. Quiz Result `/student/quizzes/:id/result` — immediate score summary and attempt history
25. Assignment Submission `/student/assignments/:id` — rich text answer + file uploads UI + Submit button (navigates to confirmation page)
26. Calendar `/student/calendar` — aggregated events (live classes, due dates)
27. Notifications `/notifications` — list, mark as read

Fellow flows (priority: low for mock)
28. Fellow Dashboard `/fellow` — assigned schools list, per-school cards with basic metrics and CSV export button

---

## Page details: Manager Course Builder (example breakdown)

- Course Metadata page: simple form; required fields marked; uploads show preview. Primary CTAs: Save Draft, Next. Row of helper text for locking mode explanation.
- Curriculum Builder: left column module list, center module content (lessons), drag handles icons, "Add Module" at bottom. Each lesson row shows title, type (Video / Quiz), duration, small actions (edit/delete).
- Lesson Editor slide-over: fields (Title, YouTube URL, Duration, Notes). When editing YouTube URL, show small embedded preview (thumbnail + play icon). Save persists in local mock data.
- Publish flow: Publish modal confirms and shows which students will be impacted (mock list). Publish action marks course card as Active and shows a small success toast.

---

## Quiz UI notes (student-facing)

- Layout: left: question content + choices; right: question palette with numbered chips and time remaining displayed top-right.
- MCQ choices: radio buttons; highlight on select; show "Next" / "Previous" buttons.
- Fill-in-the-blank: single-line text input; Numeric: number input; Group question: render a shared passage followed by enumerated sub-questions (each sub-question uses MCQ/text/number as configured).
- Flagging: allow flagging (changes palette color). Palette supports direct navigation to question number.
- Timer: visible and counts down (simulated). On expiry, show "Time up — submitting" and navigate to result page.

---

## Question Bank & CSV Import

- CSV Import modal: file chooser, parsing preview table below, show first 5 rows and list of errors if any. "Confirm import" button completes mock import.
- Question card: shows question text, type, tags, and quick actions. Selecting multiple questions and clicking "Add to Quiz" opens the quiz builder slide-over and pre-populates selection.

---

## Assignment Grading UI

- Submission list: row for each student with roll, submitted_at, status, files (download links), quick open.
- Grade slide-over: display submission content + file viewer placeholder + numeric score input + feedback textarea + Save. Save navigates back with a success toast and updates grade status.

---

## Student Quiz Attempt UX (static behaviours)

- Start quiz button opens timed attempt route. The timer is a UI-only countdown.
- Show attempt summary after submit: score, correct/wrong breakdown, time taken. Provide "View Answers" if ShowAnswer toggle is true in quiz meta (for mock it can be toggled in quiz preview).

---

## Non-functional notes for the mock

- All forms should validate fields client-side (required fields, url format for YouTube, date formats).
- Provide sample/mock data JSON for: users (student/manager/fellow), 3 sample courses (one sequential, one open, one mixed), 20 sample questions in question bank covering types, assignments and few live-class events.
- No real auth or backend. Clicking "Login" sets a role cookie or client-side state and redirects to the chosen role's dashboard.
- Files: Use placeholder thumbnails and static images for cover art and assignment files.

---

## Deliverables from this mock (what I'll produce next)

1. A single Markdown spec (this file) — done.
2. A prioritized list of static Next.js routes/pages to scaffold and fill with mock data (I will scaffold next on request).
3. A small seed JSON used by the UI to populate lists, cards, and detail pages (to be added in `opengrad-hub-ui` app folder).

---

## Questions / Clarifications

- Do you prefer the mock located inside `opengrad-hub-ui` (recommended) or a separate demo app? I recommend `opengrad-hub-ui/app/mock/`.
- Any branding / color / type tokens to apply (I can use a neutral clean palette if none provided)?

---

End of spec.
