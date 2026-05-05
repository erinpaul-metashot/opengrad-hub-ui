# Student — Course Detail & Lesson View — Visual Spec

Purpose: Detail view for a single course showing modules, lessons, progress and lesson playback (video + notes). This page is the primary learning surface.

---

Course header
- Title, instructor(s), progress bar, `Continue` / `Resume` CTA, course metadata (enrolled date, total modules, estimated hours).

Modules & lessons
- Left sidebar (or collapsible panel): `Modules` list with module-level progress and expandable lesson lists.
- Each `Lesson` row: title, duration estimate, content type icon (video / reading / quiz / assignment), `Mark complete` checkbox.

Lesson playback area (main column)
- Top: lesson title + `Mark complete` button + navigation arrows (Prev / Next).
- Video area: mock YouTube embed or static thumbnail with play button. Controls: `Play`, `Speed`, `Captions` (mock). Beneath video: `Mark watched` / `Mark complete`.
- Notes & resources panel: collapsible area with lesson notes, attachments (PDFs), links, and teacher comments.
- Quiz/Assignment CTA: if lesson contains a quiz, show `Start quiz` button; if assignment, show `Open assignment`.

Progress behavior
- Completing a lesson updates module progress; completing all lessons marks module complete.
- Quick completion: `Mark all lessons in this module complete` (manager flagged optional).

Quizzes
- Quizzes live inside lessons. `Start quiz` opens the quiz flow (mock—sample MCQ UI) within a fullscreen modal or routed page.

Mobile/responsive
- Collapsible module list; lesson content stacks vertically.

Mock data
- Seed each course with 3 modules and 4 lessons per module; include 1 quiz and 1 assignment in different lessons for demo.

Accessibility
- Video area provides accessible description and keyboard controls for `Mark complete` and navigation.

Next steps
- Implement `CourseDetail` route and `LessonPlayer` component; wire to mock course JSON.
