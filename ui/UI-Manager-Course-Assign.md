# Course Assignment — Visual Spec (Manager)

Purpose: visual-only mock for assigning one or more courses to one or more users. The flow is manager-facing and supports selecting users by filters/groups and selecting courses from a catalog. No backend — the mock shows selection, preview, and confirmation.

Overview
- Single flow with two steps: (1) Select users, (2) Select courses & confirm.
- Top: breadcrumb `Courses › Assign` and a small progress indicator: `Step 1 of 2 — Select users`.
- Use a single-page layout where Step 1 and Step 2 render in the same page area and navigation uses `Next` / `Back` buttons.

Step 1 — Select users
- Header: `Select users to assign` and a short helper: `Filter and pick students or groups to assign course(s).`
- Left: filter bar (collapsible) with controls:
  - Search box placeholder: `Search by name, roll number, email`
  - Role filter: dropdown (Student / Manager / Fellow / All) — default: `Student`
  - Programme filter: checkboxes (School / UG / PG)
  - State -> District -> School cascading dropdowns
  - Quick group chips: `All in programme`, `All in state`, `Select by CSV` (opens upload preview like bulk import preview)
- Main area: paginated list/table of user rows with checkboxes:
  - Columns: `Select` (checkbox), `Name`, `Roll / Email`, `Programme`, `State`, `School`, `Status`
  - Per-row action: small `View` button to open user's details slide-over (mock)
  - Bulk actions: `Select all on page`, `Select filtered` (selects all matching filter results), and `Clear selection`.
- Selection summary bar (sticky/bottom or top of list): `X users selected` and small chips for applied filters. `Next` button (primary) becomes enabled when at least one user selected.

Step 1 — CSV selection (optional)
- `Select by CSV` opens a modal to upload a CSV of roll numbers/emails; shows preview table and matches rows to platform users (mock). Matched users are pre-selected for assignment.

Step 2 — Select courses
- Header: `Select courses to assign` and helper: `Choose one or more courses from the catalog to assign to the selected users.`
- Left: course catalog filters: `Programme`, `State`, `Status` (Draft / Active / Archived), search by course title.
- Main: grid or table of course cards/rows with checkboxes:
  - Course card/row shows: `Cover thumbnail`, `Title`, `Programme`, `State`, `Status` (badge), `# modules`, small `Preview` link.
  - Allow multi-select of courses (checkbox on each card). A `Select all shown` action available.
- Assignment options area (right or bottom): small form with optional controls:
  - `Start date` (optional) — date picker
  - `End date` / `Access until` (optional) — date picker
  - `Notify students` toggle (On / Off) — if On, show checkbox options: `In-app` (default), `Email` (mock), `WhatsApp` (mock)
  - `Assign as draft` checkbox (optional) — if checked, assigned courses are in student view as Draft (mock semantics)

Preview & Confirm
- `Next` button from Step 2 opens a `Confirm assignments` modal summarising changes:
  - Summary: `Assign X courses to Y users`
  - Table preview (small): first 10 user rows × assigned course titles (or a grouped summary: Course A → 123 users; Course B → 45 users)
  - Buttons: `Confirm Assign` (primary) and `Back` (secondary)
- On `Confirm Assign` show success toast: `Assigned N courses to M users` and update local mock data. Optionally show `View assignments` link.

Edge cases & microcopy
- If no users selected on Step 1, `Next` is disabled and tooltip: `Select at least one user to continue.`
- If no courses selected on Step 2, `Confirm Assign` disabled with tooltip: `Select at least one course.`
- Confirmation modal copy: `This action will grant course access to the selected users. Students will see the course in 'My Courses' according to the assigned access dates.`

Accessibility
- All inputs and pickers have visible labels and `aria` attributes.
- Keyboard nav supported for filters, table rows, and checkboxes.

Mock behaviour notes
- No actual enrolment occurs — the mock updates client-side dataset to show assigned courses on selected users' sample profiles.
- `Notify students` toggles simulate sending notifications with a mock `Sent` state in notifications log.
- CSV selection will show unmatched rows in a small validation list; unmatched rows can be ignored or manually added to selection.

Optional enhancements (can be added later)
- Ability to schedule assignment (publish at later date)
- Assign with role-based overrides (e.g., assign as `Learner` or as `Preview`/`Audit` access)
- Bulk unassign flow (remove course access)

Created to guide building the static Course Assignment mock UI.
