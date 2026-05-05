# Layout Shell — Visual Spec

Purpose: describe the persistent application frame used by all LMS pages in the UI mock. This file documents the left navigation (20% sidebar), the primary content area (80%), and the per-page top header (role badge + notifications + user dropdown).

---

## Global layout

- Structure: two-column layout (left sidebar = 20%, main content = 80%). Use a min/max width for sidebar (min 200px, max 320px) to keep layout stable across screen sizes.
- Implementation hint: `display: grid` or `display:flex` with fixed sidebar column and flexible main column.
- Background: page background is a soft off-white; the main content area has white cards/panels with subtle shadows.
- Spacing: comfortable gutter between sidebar and content (24px desktop, 12px tablet/mobile when collapsed).

---

## Left Sidebar (persistent)

- Width: 20% of viewport or fixed (recommended: 240px default) with min/max.
- Vertical layout: stacked top-to-bottom.
  - Top: OpenGrad logo (centered horizontally within the sidebar, with top padding)
  - Middle: Navigation list (scrollable if overflow)
  - Bottom: Sign out button (anchored to bottom)

- Navigation items:
  - Items show an icon (left) + label (text) and optional badge (right) for counts.
  - Active item: highlight background and left accent bar/indicator.
  - Hover state: mild background change.
  - Keyboard: up/down focus and Enter to activate.

- Collapsible modules / sub-options:
  - Some top-level items have nested sub-options (e.g., `Courses` → `Create Course`, `Manage Courses`, `Assign Course`). Show a chevron to open/close.
  - Sub-options are indented and use smaller type and reduced icon weight.
  - Expanded/Collapsed states animate (height transition) for a polished mock.

- Example primary nav order (default):
  - Dashboard
  - Courses (collapsible: Create / Manage / Assign)
  - Question Bank
  - Quizzes
  - Assignments
  - Live Classes
  - Analytics
  - Users (Super Admin only — show/hide based on mocked role)

- Footer area:
  - Sign out button (full-width, icon + label), small help/feedback link above it (optional).

---

## Main content area

- Header bar (inside main column, pinned to top of content area):
  - Height: ~56px
  - Background: same as page (no heavy border) or a faint divider line below the header.
  - Left: optional page title / breadcrumb (for visual context). The user requested minimal nav: this can be omitted per page.
  - Right: role badge, notification bell (with unread count badge), and user avatar / name dropdown.

- Role badge & user dropdown behaviour:
  - Role badge: small rounded pill showing current mock role (e.g., `Student`, `Manager`, `Super Admin`). This is informational and not the main role switch control.
  - User avatar (click) opens a dropdown with: `Switch mock user` submenu (Student / Manager / Fellow / Super Admin), `Profile` (non-functional), `Sign out`.
  - The `Switch mock user` action updates visible nav items in the mock and navigates to that role's dashboard view.

- Notifications:
  - Bell icon with red dot or numeric badge for unread messages.
  - Clicking opens an in-page dropdown with a scrollable list of mock notifications.

- Page content region (below header):
  - Content sits in a padded container (24px) and is the place where each page renders its widgets, tables, forms or editors.
  - Use consistent card components for content blocks with title, optional actions on the right, and body area.

---

## Role-based nav & visibility

- The sidebar and top-right dropdown simulate role-based permissions by hiding or disabling items not applicable to the current mock role.
- Examples:
  - `Users` item only visible for `Super Admin` mock user.
  - `Course Builder`, `Question Bank`, `Quizzes`, `Assignments` visible for `Manager` role.
  - `My Courses`, `Assignments`, `Calendar` visible for `Student` role.
  - `Fellow` sees `My Schools` and `School Analytics`.

---

## Course module specifics (sidebar behavior)

- `Courses` is a top-level nav item with collapsible children:
  - `Create Course` — navigates to course metadata builder.
  - `Manage Courses` — list of existing courses (cards or table).
  - `Assign Course` — bulk/individual assignment UI.
- When `Courses` is expanded, the child sub-options render indented beneath the parent and the active sub-option is highlighted.

---

## Responsive behaviour

- Desktop (>=1024px): 20% sidebar + 80% main area.
- Tablet (>=768px && <1024px): sidebar reduces to narrower width; consider collapsing text to icons for dense screens.
- Mobile (<768px): sidebar collapses into a hamburger menu (top-left) and opens as an overlay drawer. Main header retains role badge + bell + avatar.

---

## Accessibility & UX notes

- All interactive elements must have descriptive `aria-label`s (nav items, chevrons, sign out).
- Keyboard navigation: sidebar must be navigable via Tab / Arrow keys.
- Provide visible focus rings for accessibility.
- Ensure color contrast for badges, icons, and labels meets WCAG AA.

---

## Mock behaviour notes

- No backend: role switching is client-side only and controls which nav items are visible.
- Sidebar items may include static counters (e.g., unread notifications, pending assignments) seeded from mock data.
- Use the same card, table, and form components across pages for visual consistency.

---

Created to guide the UI mock implementation and per-page visual specs. Update this file as we iterate on per-page details.
