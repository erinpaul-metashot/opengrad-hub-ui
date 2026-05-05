# Student Dashboard — Visual Spec

Purpose: Visual-only mock for the student dashboard: an at-a-glance page showing enrolled courses, upcoming assignments, recent activity, progress and quick access to Live Classes.

---

Sidebar (student)
- Dashboard (default)
- Courses
- Assignments
- Live Classes

Overview (main content)
- Top header: `Welcome, <Student Name>` + role/quick-switch (mock) + compact progress ring showing overall course completion %.
- Stats row (tiles): `Courses enrolled`, `Assignments due (7d)`, `Upcoming live classes`, `Average grade`.
- Primary content columns:
  - Left: `Active Courses` (carousel or grid of `CourseCard` components showing thumbnail, progress, next lesson, CTA `Open course`).
  - Center: `Focus area` — shows the currently selected course summary (title, next module, quick `Resume lesson` button), and `Upcoming deadlines` list.
  - Right: `Activity & Notifications` — recent grades, instructor announcements, and a small `Live now` card if any live class is currently ongoing.

Cards & components
- `CourseCard`: thumbnail, title, progress bar, modules count, next due assignment badge, `Open course` button.
- `AssignmentCard`: title, course tag, due date/time, status chip, CTA `Open`.
- `LiveClassCard`: title, start time, join CTA (if within join window), status badge (Upcoming / Live / Ended).
- `ProgressRing`: small circular progress visual used in header and course cards.

Interactions (mock)
- Clicking a `CourseCard` navigates to `Courses` then opens the course detail view.
- `Resume lesson` opens the last-unfinished lesson in a slide-over or new route.
- `Upcoming deadlines` items link to assignment detail/submission UI.
- `Live now` / `Join` opens Join flow (see student live class spec).

Empty states
- If no courses: show CTA `Browse available courses` (mock only).

Accessibility
- All tiles and CTAs keyboard-focusable; aria-live announcements for new notifications.

Mock data
- Dashboard uses seeded mock data for student: 3 courses, 2 upcoming assignments, 1 upcoming live class.

Next steps
- Implement `CourseCard`, `AssignmentCard`, `LiveClassCard` components and wire to sample mock data.
