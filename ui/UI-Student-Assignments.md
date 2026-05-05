# Student — Assignments — Visual Spec

Purpose: Student-facing assignment list, detail, submission, and history view.

---

Assignments list
- Page header: `My Assignments` + filters (All / Due / Submitted / Graded) and search.
- List cards or table: `Title`, `Course`, `Due date`, `Status`, `Grade` (if graded), `Actions` (`Open`).

Assignment detail (student view)
- Header: title, course, due date, status badge, remaining time countdown.
- Full instructions section, attachments from teacher.
- Submission area with controls depending on assignment settings:
  - `Text response` rich text editor (if enabled)
  - `File upload` area (drag-and-drop). Show accepted types and size limits.
  - `URL / Link` input (optional)
  - Buttons: `Save draft`, `Submit` (primary)

Submission history & feedback
- Below submission area: list of previous submissions with timestamp, attached files, grader comments, and grade.
- If resubmissions allowed, show `Resubmit` button until due date (or until teacher disables).

Validation & microcopy
- `Submit` disabled until a required response is present.
- On successful submit: show confirmation toast `Assignment submitted` and store metadata in mock data.

Mock behavior
- Student can view previous grades and feedback from seeded data.
- Provide examples of `Submitted`, `Late`, and `Graded` states in mock dataset.

Next steps
- Reuse UI primitives from manager assignment spec for styling consistency and implement submission save in local mock store.
