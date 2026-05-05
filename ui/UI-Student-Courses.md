# Student — Courses List — Visual Spec

Purpose: List of courses the student is enrolled in and entry points to each course's detail view.

---

Layout
- Page header: `My Courses` + search and filter controls (search by title, filter by progress: All / In Progress / Completed).
- Toolbar: `Sort by` (Recent / Progress / A–Z) and view switch (grid/list).

Course list
- Grid of `CourseCard` components showing: thumbnail, title, instructor, progress bar, modules count, next lesson or next due assignment, and CTA `Open course`.
- Each `CourseCard` supports direct navigation to the course detail view by clicking anywhere on the card.
- A prominent `Open course` button is visible at the bottom of the card content in both grid and list views.

Course detail navigation
- Clicking `Open course` navigates to the course detail route (see `UI-Student-Course-Detail.md`).

Empty state
- `You're not enrolled in any courses yet. Browse courses` + CTA.

Mock behavior
- Demonstrate sorting and filtering using client-side mock data.

Components to implement
- `CourseCard`, `CoursesGrid`, `CoursesList`, `CourseFilters`.
