# Student — Live Classes — Visual Spec

Purpose: Student-facing view for upcoming/ongoing live classes and the join/attendance flow (student-focused).

---

Overview
- `My Live Classes` lists upcoming and live sessions the student is targeted for.
- Quick filter: `Upcoming` / `Live now` / `Past`.

List items
- Each `LiveClassCard` shows: title, course, start time (local), duration, status badge, and `Join` CTA (enabled within join window).

Join & attendance flow
- Primary behavior: since students are logged in, clicking `Join` will auto-record attendance (no roll entry) and open meeting link in new tab.
- Fallback: if the mock student lacks a validated roll, show a short modal asking `Enter your roll number to mark attendance`.
- On success: show toast `Attendance recorded — joining now` and open external link (`target=_blank`).
- On failure (roll not found or not targeted): show error `Roll number not found for this class. Contact your instructor.`

Ongoing classes
- If a class is `Live now`, the `LiveClassCard` exposes `Join` and a small live indicator; also a compact chat/notes icon (mock only) to view teacher notes.

Past classes
- Show attendance status (Present / Late / Absent) and link to recording if teacher attached one.

My attendance view
- Student can view their attendance history per class with join timestamp and status.

Accessibility & UX
- `Join` is keyboard accessible; aria-live used to announce attendance result.

Mock data
- Seed 3 classes (1 live, 1 upcoming, 1 past with recording) to demo flows.

Next steps
- Implement `JoinAttendanceModal` to handle roll fallback and local attendance writes, then expose `My attendance` in student profile/dashboard.
