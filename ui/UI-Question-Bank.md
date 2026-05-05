# Question Bank — Visual Spec

Purpose: visual-only mock of the Question Bank used by Managers to create, edit, organize, and reuse questions. Includes flows for creating questions (all supported types), managing the bank, CSV bulk import/export, and integration points with the Course/Quiz builder (Add from Question Bank / Add to Question Bank).

---

## Overview

- Entry: `Question Bank` in the Manager nav.
- Layout: two-column filter/list layout (filters at top or left, question list as the main area). Each question row/card includes quick actions (Edit, Duplicate, Delete, Add to Quiz).
- Primary CTAs: `Add Question` (primary), `Bulk Import` (secondary), `Export CSV`.

---

## Question Types (supported)
- MCQ (Multiple Choice) — single or multiple correct (configurable per-quiz or per-question)
- Fill in the Blank — typed answer(s) or option-based
- Numerical — numeric answer with tolerance (absolute or percent)
- Group Question — passage + multiple sub-questions (sub-questions may be MCQ/Fill/Numerical)

Each question stores: id, created_by, created_at, status (Draft/Published), type, content, options (if applicable), correct_answer(s), tolerance (numerical), marks/weight, programme_type, subject, topic, difficulty, tags.

---

## Create Question flow (Add Question)
- Trigger: `Add Question` opens a right-side slide-over (panel) with a type selector at the top (MCQ / Fill / Numerical / Group).
- Common fields (top area):
  - `Question title` / `Question text` (rich text or plain HTML)
  - Metadata: `Programme` (School/UG/PG), `Subject`, `Topic`, `Difficulty` (Easy/Medium/Hard), `Tags` (chips)
  - `Status` toggle: `Draft` / `Published`
  - Checkbox: `Add to Question Bank` (checked by default when creating directly from the bank; when creating inside a course quiz, default unchecked — allow manager to check to save a copy to bank)

- Type-specific areas (below metadata):
  - MCQ: dynamic `Options` list (start with 4 rows), radio/checkbox to mark correct option(s), optional `Allow multiple correct` toggle, `Marks` field.
  - Fill in the Blank: `Question text` with blank markers or a simple question entry, `Accepted answers` (comma-separated), optional `Provide options` toggle to show choice options.
  - Numerical: `Question text`, `Correct numeric answer`, `Tolerance` (absolute or % radio selector), `Marks`.
  - Group Question: `Passage / Stem` textarea, `Add Sub-question` button (sub-questions are edited inline and limited to MCQ / Fill / Numerical).

- Actions: `Save` (primary) saves to bank (local mock), `Save & Add Another` (optional), `Cancel` (secondary), `Preview` (shows student-facing view).
- Validation: required fields per type (e.g., MCQ requires ≥2 options and ≥1 correct; Numerical requires numeric answer).

---

## Manage Question Bank (list view)
- Header: `Question Bank` + quick filters and CTAs.
- Filters: search by text, programme, subject, topic, difficulty, question type, status (Draft/Published), tag chips, date range.
- List view: paginated table or card list. Columns: `Preview` (eye icon), `Question excerpt`, `Type`, `Programme`, `Subject`, `Difficulty`, `Status`, `Actions`.
- Actions per row:
  - `Edit` — opens slide-over editor
  - `Duplicate` — create a copy
  - `Add to Quiz` — opens a small modal to select target quiz (mock) or copy to clipboard
  - `Delete` — confirmation modal
  - `Preview` — student-facing render
- Bulk actions: select multiple → `Add to Quiz`, `Export selected`, `Delete` (with confirm)

---

## CSV Import / Export
- `Download Template` CTA provides a CSV template with header fields: `type,question_text,options_json,correct_answer,marks,tolerance,programme,subject,topic,difficulty,tags,status`
- `Bulk Import` flow: Upload CSV → preview rows (first N) → validation column per row → `Confirm Import` (imports valid rows into bank as Draft or Published depending on CSV column)
- Error handling: show row-level errors with messages (missing fields, invalid JSON in options_json, invalid numeric values)

---

## Integration with Course/Quiz Builder
- Add-from-bank inside Course Quiz builder:
  - In Quiz slide-over, include `Add from Question Bank` button next to `Add Question`.
  - Clicking opens a modal with filters/search and multi-select; manager selects questions and clicks `Add to quiz` which inserts snapshot copies into the quiz question list.
  - Option to `Insert as question snapshot` (default) so edits in bank do not retroactively change quiz content (mock only: represent snapshotting visually).
- Add-to-bank when creating a question inside a course/quiz:
  - In the inline question editor, include `Add to Question Bank` checkbox to save the question into the global bank in addition to the quiz lesson.

---

## Preview & Student View
- Each question in bank includes `Preview` action that shows a student-facing rendering (question text, options, input fields) and a `Correct answer` toggle to display answers for managers if `Show answers` is enabled.

---

## UI Details & Microcopy
- `Add Question` CTA label: `Add Question`
- `Bulk Import` CTA label: `Bulk Import (CSV)`
- Template download label: `Download CSV template`
- Import preview header: `Preview import — first 10 rows`
- Confirmation messages: `Question saved to bank.` / `Imported 18 questions (2 rows skipped).`

---

## Accessibility & UX
- All editor fields have visible labels and `aria` attributes.
- Slide-over must trap focus while open; Esc cancels (with confirm if unsaved changes).
- Table rows are keyboard-navigable; actions reachable by keyboard.

---

## Mock Behaviour Notes
- No backend: all CRUD happens in client-side mock dataset. The `Add to Question Bank` checkbox creates a copy entry in the bank dataset.
- Question snapshots: when adding from bank to quiz, create a shallow copy object to simulate snapshotting.
- Provide seeded sample questions (20) across types for demo and filtering.

---

Created to guide the static UI mock implementation of the Question Bank and its integration with course and quiz builders.
