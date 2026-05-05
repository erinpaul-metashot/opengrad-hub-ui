# Assignment System — Visual Spec

Purpose: visual-only mock of the Assignment creation, management, submission and grading UIs for Managers/Teachers and Students. This spec describes the pages, fields, actions, microcopy, states, and mock behavior for a static frontend prototype.

---

## Overview

Flows covered:
- Create Assignment (Manager)
- Assignment List / Management (Manager)
- Assignment Submission List & Grading (Manager)
- Assignment Detail / Submit (Student)
- Student Assignment List (Student)

Global notes
- All pages use the same layout shell (sidebar + header) described in `docs/UI-Layout-Shell.md`.
- Assignments can be associated with a Course (optional) or targeted to specific students / groups.
- All actions are mock-only: create/edit/delete update client-side state.

---

## Create Assignment — Page / Slide-over

Layout
- Single-column form (card) within main content area. Title: `Create Assignment`.
- Top-right small helpers: `Save Draft` (button) and `Publish` (disabled until required fields complete).

Fields (exact labels)
1. `Assignment title` (required)
   - Placeholder: `e.g., Week 3: Algebra Worksheet`
   - Validation: `Please enter an assignment title.`

2. `Description / Instructions` (required)
   - Multi-line rich-text placeholder: `Write instructions, rubric, or reference links.`
   - Validation: `Please enter assignment instructions.`

3. `Associated course` (optional)
   - Dropdown to select a course; label: `Associated course (optional)`

4. `Target audience` (required)
   - Controls: radio / segmented control: `All students` | `Specific students` | `By programme / school`
   - If `Specific students` selected: searchable multi-select list or `Upload CSV` option to select many students.
   - If `By programme / school`: cascading selectors (Programme, State, District, School) to target groups.

5. `Due date & time` (required)
   - Combined date + time picker.
   - Validation: due date must be in future. Error: `Please choose a valid due date/time.`

6. `Maximum marks` (required)
   - Numeric input. Placeholder: `e.g., 100`.
   - Validation: numeric ≥ 0.

7. `Submission types` (required)
   - Checkboxes: `File upload` (allow attachments), `Text response` (rich-text), `URL / link` (optional)
   - If `File upload` checked: show `Max files` (default 3), `Max file size` (default 10 MB), `Accepted file types` (list: PDF, DOCX, JPG, PNG; editable)

8. `Resubmissions` (optional)
   - Toggle: `Allow resubmissions before due date` (on/off)
   - If off, show note: `Students can submit only once.`

9. `Late submissions` policy
   - Radio: `Allow late submissions` | `Reject late submissions`
   - If `Allow`, optional `Mark as late after` (auto by due date)

10. `Attachments` (optional)
    - File uploader for manager to attach reference files (not student submissions). Shows thumbnail/name list.

Actions & buttons
- Primary: `Publish assignment` (prominent) — publishes and assigns to selected targets.
- Secondary: `Save draft` — saves as draft locally.
- Tertiary: `Cancel` — if changes unsaved, show confirm: `Discard changes?`

Microcopy
- Helper under `Submission types`: `File upload: PDF, DOCX, JPG, PNG. Max 3 files, 10MB each.`
- Publish confirmation: `Publish assignment and notify students?` (checkbox in modal: `Notify students`)

---

## Manager — Assignment List / Management Page

Layout
- Page header: `Assignments` + CTAs: `Create Assignment`, `Bulk Import` (future), `Export CSV`.
- Filters row: search, course filter, status (Draft / Published / Closed), due date range, programme filter.

List
- Paginated table with columns: `Title`, `Course`, `Due Date`, `Max Marks`, `Assigned To` (count), `Status`, `Actions`.
- Row actions: `Edit` (opens Create form in edit mode), `View Submissions`, `Duplicate`, `Close assignment`/`Reopen`, `Delete`.
- Quick status chips: Draft (gray), Published (green), Closed (muted).

Empty state
- `No assignments yet. Create your first assignment` with `Create Assignment` CTA.

---

## Manager — Submissions List & Grading

Entry
- Click `View Submissions` on an assignment row to open the Submissions page for that assignment.

Layout
- Top: assignment meta (title, due date, marks, description snippet, associated course)
- Stats row: `Submitted` / `Not submitted` / `Late` counts and `Average score`.

Submission table
- Columns: `Select`, `Student name`, `Roll/Email`, `Submitted at` (timestamp), `Files` (links), `Text response` (preview), `Status` (Submitted / Late / Not submitted / Grading / Graded), `Score`, `Actions`.
- Actions per row: `Open submission` (opens grade slide-over), `Download files`, `Mark as not submitted` (if needed).

Grade slide-over
- Opens from right. Shows:
  - Student info (name, roll), submission timestamp, attached files preview or download links, text response preview.
  - `Score` input (numeric) + `Feedback` textarea (rich text), `Mark as` buttons: `Save` (keeps status Grading) and `Publish grade` (sets status Graded — student sees it).
  - Optional: `Add private note` for internal comments.
- Buttons: `Save`, `Publish grade`, `Cancel`.

Bulk grading
- Support selecting multiple submissions and applying a bulk action (e.g., `Export for offline grading`) — mock-only.

Microcopy & validation
- Grade input validation: numeric within 0..MaxMarks.
- Publish confirmation: `Publish grades for this student?` (optional small modal)

---

## Student — Assignment Detail & Submit UI

Assignment list (student)
- Student dashboard includes `Assignments` card showing upcoming assignments (due soon) and link to `My Assignments` page.
- `My Assignments` page: list or cards with `Title`, `Course`, `Due date`, `Status`, `Progress`.

Assignment detail (student view)
- Header: title, due date/time, status badge, remaining time countdown if within window.
- Full instructions area with manager attachments and rubric snippet.

Submission UI
- Submission form components:
  - `Text response` rich-text area (if enabled)
  - `Upload files` area (drag-and-drop) with visible limits: max files, accepted types, max size per file
  - `Submit` button (primary) — disabled until at least one submission type filled if required
  - `Save draft` (secondary) — saves current input locally
- After submit:
  - Show confirmation page: `Assignment submitted` with timestamp and `View submission` link.
  - Show ability to `Resubmit` only if `Allow resubmissions before due date` is enabled and assignment not yet graded.

Late submissions
- If allowed, student can still submit after due date; status marked `Late` and teacher sees `Late` flag.
- If late submissions rejected, hide/disable submission form after due date and show `Submission closed` message.

Student microcopy
- Submit button label: `Submit assignment`
- Draft save microcopy: `Saved locally — remember to submit before due date.`
- Error messages: file size/format validation and `You cannot submit after the due date.`

---

## Assignment States (for mock)
- `Not Started` — no submission
- `Submitted` — student submitted, awaiting grading
- `Late` — submitted after due date
- `Grading` — teacher is grading / opened submission
- `Graded` — teacher published score

State transitions are simulated in mock data only.

---

## Accessibility & UX
- All form fields have labels and `aria` attributes.
- File inputs expose accessible descriptions of limits.
- Keyboard navigation and focus management for slide-overs.

---

## Mock behaviour notes
- All create/edit actions only affect client-side mock dataset.
- File uploads in the mock store only file metadata (name/size/type) — no binary storage.
- `Publish assignment` optionally toggles a mock notification (if `Notify students` checked) — show a toast `Mock notifications sent`.
- Provide seeded assignment examples and student submission samples to illustrate grading flows.

---

Created to guide static UI mock implementation for assignments. Update or ask for details for any specific field or workflow.
