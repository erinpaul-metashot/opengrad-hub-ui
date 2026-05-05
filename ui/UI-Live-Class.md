# Live Classes — Visual Spec

Purpose: visual-only mock of scheduling, managing, and attending synchronous "live classes" for teachers/managers and students. Covers creation, targeting, external link attachment, attendance marking (roll-number flow), management, roster/attendance reporting, and mock implementation notes for the static frontend prototype.

---

## Overview

Flows covered:
- Create Live Class (Manager/Teacher)
- Manage Live Classes (edit/cancel/duplicate/list)
- Attendance tracking & reporting (Manager)
- Student join & attendance marking (Student)

Goals for mock:
- Demonstrate scheduling UI and targeting (programme/school/batch/specific students)
- Simulate attendance marking when a student clicks a class link and supplies roll number
- Provide a manager view to inspect/export attendance and override entries
- Client-side mock only: no real meeting integration; links open in new tab

---

## Create Live Class — Page / Slide-over

Layout
- Single-column card titled `Create Live Class` inside the main content area or slide-over.
- Top-right controls: `Save draft` and `Schedule` (primary) / `Cancel`.

Fields (exact labels)
1. `Title` (required)
   - Placeholder: `e.g., Live: Week 5 - Linear Equations`.
   - Validation: required.

2. `Description / Notes` (optional)
   - Multi-line text area for context, agenda, or pre-reads.

3. `Associated course` (optional)
   - Dropdown to select a course.

4. `Target audience` (required)
   - Segmented control: `All students` | `Specific students` | `By programme / school / batch`.
   - If `Specific students`: searchable multi-select or `Upload CSV` option.
   - If `By programme/school/batch`: cascading selectors (Programme → State → District → School → Batch) to narrow audience.

5. `Meeting type` (required)
   - Dropdown: `Zoom` | `Google Meet` | `YouTube Live` | `Other (link)`.
   - Selecting `YouTube Live` shows `YouTube stream id` helper; `Zoom` shows `passcode (optional)` field.

6. `Meeting link` (required)
   - Single-line URL input. Microcopy: `Paste meeting URL (zoom:/meet/..., https://meet.google.com/..., https://youtube.com/...)`.

7. `Start date & time` (required)
   - Date + time picker (with timezone selection if desired).

8. `Duration` (minutes) (required)
   - Numeric input; default 60 minutes. UI displays computed end time.

9. `Attendance window / grace period` (optional)
   - Numeric minutes: `Grace period` default 10 minutes (students joining within start + grace marked present; joining after marked late).

10. `Max participants` (optional)
    - Numeric; for capacity warnings in UI (not enforced in mock).

11. `Allow recordings` (toggle)
    - If enabled, manager can later attach recording link to the class record.

12. `Notifications` (toggle)
    - If enabled, mock shows `Mock notification sent` after scheduling when `Notify students` checked.

Actions & buttons
- Primary: `Schedule Live Class` — saves class and (optionally) triggers mock notification.
- Secondary: `Save draft` — store locally.
- Tertiary: `Cancel` — confirm discard if unsaved.

Microcopy
- Under `Meeting link`: `Join link must be a valid URL. Students will be prompted for roll number when joining.`
- Scheduling confirmation: `Schedule this live class and notify selected students?` (checkbox `Notify students` in modal)

---

## Manage Live Classes — List and Details

Page header: `Live Classes` with CTAs: `Create Live Class`, `Import`, `Export`.

List and filters
- Filters: search by title, course, date range, meeting type, status (Draft / Scheduled / Ongoing / Completed / Cancelled), programme filter.
- Cards or table view with columns: `Title`, `Start (local)`, `Duration`, `Target`, `Status`, `Attendance %`, `Actions`.
- Row actions: `Edit`, `View roster & attendance`, `Duplicate`, `Cancel class`/`Reopen`, `Delete`.

Detail panel
- Click to open class detail: full meta, link preview (open), description, attached recording (if any), scheduled/actual times, attendance summary.
- Quick actions: `Mark attendance manually`, `Export CSV`, `Attach recording link`.

Empty state
- `No live classes scheduled. Create your first live class` + CTA.

---

## Attendance & Roster (Manager View)

Roster and stats
- Top: class meta + stats row: `Total targeted`, `Joined` (count), `Present`, `Late`, `Absent`, `Attendance %`.

Roster table
- Columns: `Select`, `Student name`, `Roll number`, `Program/Batch`, `Join time` (timestamp), `Status` (Present/Late/Absent/Excused), `Duration (min)`, `Actions`.
- Ability to filter/sort by status or join time.

Manual override
- Inline controls to set status or edit join timestamp.
- Bulk actions: `Mark selected Present`, `Mark selected Absent`, `Export selected`.

Export
- `Export CSV` button — CSV columns: `class_id`, `title`, `start_time`, `student_name`, `roll`, `status`, `join_time`, `duration_minutes`, `notes`.

Notes and audit
- Each attendance row can have an internal `private note` added by the teacher.

---

## Student — Live Class Join & Attendance Flow

Student entry points
- `Live classes` card on student dashboard showing upcoming classes.
- `My Live Classes` page listing scheduled classes with `Join` CTA.

Join flow
1. Student clicks `Join` (or the public link in the UI).
2. App shows modal prompt: `Enter your roll number to mark attendance` with input and `Join` button.
3. Student enters roll number and submits.
   - Mock validation: check roll exists in client-side mock data and belongs to the target audience.
   - If valid: show `Attendance recorded — redirecting to meeting` toast and open meeting link in new tab; record attendance with join timestamp and status `Present` or `Late` depending on time.
   - If invalid: show error `Roll number not found for this class. Contact your teacher.` and allow retry.
4. If class requires passcode (Zoom passcode), include small helper telling student to use the external meeting passcode after joining.

Auto-marking behaviour (mock)
- Default: student is marked `Present` if they join before start + grace period; if join after that window, mark `Late`.
- Student can `Resubmit roll` only until the class end time if `allow resubmissions` enabled in the schedule (mock flag).

Offline/Edge cases
- If student closes the join modal without providing roll number, they are not marked.
- If meeting link is not reachable, show friendly guidance and allow teacher contact.

---

## Attendance States & Rules

Default statuses
- `Not targeted` — not in the target audience
- `Targeted` — in target audience but not joined
- `Present` — joined within start + grace
- `Late` — joined after grace but before end
- `Absent` — did not join before end
- `Excused` — manual override by teacher

Time-based rules (defaults for mock)
- Grace period: 10 minutes
- Class end time = start + duration
- If join timestamp ≤ start + grace => `Present`
- If start + grace < join timestamp ≤ end => `Late`
- If no join timestamp by end => `Absent`

---

## Mock Behaviour & Implementation Notes

Storage & data
- Client-side only: store scheduled classes and attendance in an in-memory mock store and persist to `localStorage` for demo persistence.
- Attendance entries store: class_id, student_id (roll), student_name, join_time (ISO), status, duration_minutes, note.

Join link handling
- Clicking `Join` opens meeting link in new tab/window via `target=_blank` after attendance is recorded.
- No API calls; meeting link opened directly.

Validation
- Roll validation checks the mock student list for membership in the targeted set. If class targets programme/batch, ensure roll belongs to that group.

Notifications
- `Notify students` is mock-only: show toast `Mock notifications sent`.

Permissions
- Only users with `manager`/`teacher` roles see create/manage controls; students see join UI.

Components to implement (suggested)
- `LiveClassForm` — create/edit form
- `LiveClassList` — list view with filters
- `LiveClassCard` — small preview card for dashboard
- `JoinAttendanceModal` — roll input + validation + join action
- `RosterTable` — attendance table with exports
- `AttendanceChart` — simple Chart.js line/bar showing attendance over time

Paths (suggested)
- `/manager/live-classes` — list & create
- `/manager/live-classes/[id]` — detail & roster
- `/student/live-classes` — student list
- `/student/live-classes/[id]` — detail + join modal

Seed data suggestions
- Create 3 sample scheduled classes across 2 courses, each targeted differently (all students, specific batch, specific students).
- Seed 20 students with rolls across 2 batches to demonstrate targeting and attendance stats.

Accessibility & UX
- All form controls labeled and keyboard focus preserved when modal opens.
- Provide aria-live notifications for attendance toasts.

---

## Next steps for mock implementation
1. Add `docs/UI-Live-Class.md` to repo (this file).
2. Seed mock data for classes and students in `mock/` JSON.
3. Scaffold UI pages and components under `opengrad-hub-ui/app/` as suggested paths.
4. Implement `JoinAttendanceModal` with roll validation and local attendance writes.

---

If you want I can scaffold the Live Class pages next (forms, list, join modal) and add seed JSON for students and sample classes.