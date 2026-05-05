# Curriculum Builder — Visual Spec

Purpose: visual-only mock of the course curriculum builder. Uses a stacked layout where managers add Chapters (modules) and lessons (video or quiz). Slide-over editors open from the right for adding/editing lessons.

Overview & layout
- Layout: single-column, stacked modules (chapters). Each chapter is a card that can expand/collapse to show lessons.
- Empty state: show a centered translucent `+ Add Chapter` button. Chapters are ordered top→bottom.
- Chapter card has: handle for reordering, title, small meta (lesson count), action buttons: `Add Lesson`, `Edit Chapter`, `Delete Chapter`.

Add Chapter flow
- Clicking `+ Add Chapter` inserts an inline chapter container with:
  - Field: `Chapter title` (placeholder: `e.g., Module 1 — Foundations`)
  - Buttons: `Save chapter` (primary), `Cancel` (secondary)
- After saving, the chapter appears in the stacked list and shows an empty lesson area with a translucent `+ Add Lesson` control.

Add Lesson (choice)
- Click `+ Add Lesson` inside a chapter → show a small chooser overlay with two large buttons: `YouTube Video` and `Quiz`.
- Selecting an option opens a right-side slide-over (panel) that contains the lesson editor for the chosen type.

Video lesson slide-over (right)
- Panel width: ~40–50% of viewport from the right (or fixed 480–640px) with close `X` top-right.
- Fields (top → bottom):
  1. `Lesson title` (required) — placeholder: `e.g., Introduction to Limits`
  2. `YouTube URL` (required) — placeholder: `https://www.youtube.com/watch?v=...`
     - Show a small thumbnail preview beneath the field when a valid YouTube URL is entered (mock thumbnail).
     - Validation: basic URL pattern; show error: `Please enter a valid YouTube URL.`
  3. `Duration (minutes)` (optional) — numeric input
  4. `Notes` (optional) — multi-line textarea for lesson notes/explanation
  5. `Lesson type` readonly: shows `Video` (for clarity)
- Actions: `Save Lesson` (primary), `Cancel` (secondary). On Save the slide-over closes and the lesson card appears under the chapter.

Quiz lesson slide-over (right)
- Panel fields and sections:
  - `Quiz title` (required)
  - `Duration (minutes)` (optional)
  - `Max attempts` (optional: number or `Unlimited`)
  - `Pass threshold (%)` (optional)
   - Toggles: `Shuffle questions`, `Show answers after submission`
   - Quiz-level MCQ mode: radio group `Default MCQ mode` — `Single-correct` (default) | `Multiple-correct`. Per-question override allowed.
  - Question builder area (below meta):
    - Empty state: `+ Add Question` button
    - When `Add Question` clicked, open a small inline form inside the slide-over to add a question (not a separate modal)

Question builder — supported types
- Type selector: `MCQ`, `Fill in the Blank`, `Numerical`, `Group Question`.

1. MCQ
   - Fields: `Question text` (required), dynamic list of `Options` (add/remove rows), radio to mark the correct option.
   - Default: start with 4 option rows (editable). Manager can add or remove options.
   - Optionally show a checkbox `Allow multiple correct answers` if manager wants multi-select MCQs (default: unchecked).
   - Marks/weight: optional numeric field.
   - Validation: require at least 2 options and 1 marked correct (unless multiple-correct enabled and 1+ marked).

2. Fill in the Blank
   - Fields: `Question text` with blanks denoted by `___` (or simple instruction field), `Correct answer(s)` — allow multiple accepted strings separated by commas.
   - Option: `Allow choosing from options` (if teacher wants to provide selectable choices) — then show options fields similar to MCQ.
   - Validation: require a correct answer value.

3. Numerical answer
   - Fields: `Question text`, `Correct numeric answer` (required), `Tolerance` (e.g., ± value or percent)
   - Example helper: `If correct answer is 10 and tolerance is 5, student answers 5–15 accepted.`

4. Group Question (Passage + subquestions)
   - Fields: `Passage / Stem` (large textarea) and an `Add sub-question` list.
   - Each sub-question is itself a simple question object with types limited to MCQ / Fill / Numerical (no nested group).
   - Sub-questions display as numbered items under the passage with their own editor UI (same fields as above).
   - Validation: there must be at least one sub-question.

Question-level controls
- Each question in the quiz shows: `Edit`, `Duplicate`, `Delete`, and drag handle for reorder.
- `Preview question` toggles a small read-only view of how the student will see the question.

Saving & quiz-level actions
- `Save Question` appends the question to the quiz question list (in-panel), the list shows question count and quick summary.
- `Save Lesson` (in the quiz slide-over) saves the quiz as a lesson under the chapter; the lesson card shows `Quiz — N questions` in its meta.

Chapter & lesson management
- Drag-and-drop reorder of chapters and lessons (visual handles).
- Edit chapter title with inline edit action.
- Delete lesson shows confirmation: `Delete lesson — Are you sure?`.

Publish flow
- `Publish Course` button (enabled only after at least one module and one lesson exists) appears on the Course Builder page header.
- Clicking Publish opens a confirm modal: lists course title, number of modules, number of lessons, and asks `Publish course now?` Buttons: `Publish` (primary), `Cancel`.

Accessibility & microcopy
- All editors have clear labels and helper text. Errors placed under fields.
- Keyboard accessible: focus trap within slide-over; Esc closes panel after confirmation if dirty.

Mock behaviour notes
- No backend: all data stored in client-side mock dataset. Slide-overs update local state.
- YouTube preview uses a placeholder thumbnail; duration may be manually entered.
- Question bank integration: out of scope for this slide (but manager can later pull from Question Bank in full build).

Created to guide the static UI mock implementation of the curriculum builder.
