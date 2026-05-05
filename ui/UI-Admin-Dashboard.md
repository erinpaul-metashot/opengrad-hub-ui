# Super Admin Dashboard — Visual Spec

Purpose: visual-only mock of the Super Admin landing dashboard. Shows high-level platform metrics and a primary analytics chart. No backend functionality — CTA buttons use mock interactions (filters, exports).

Layout
- Top: page title `Dashboard` (optional) and small date-range selector (default: Last 30 days).
- Stat cards row (3–4 cards) directly under title.
- Main analytics area below cards: primary chart on left, two compact summary cards on right.
- Bottom area: quick links / recent activity list.

Stat cards (4 — left to right)
1. Total Active Users
   - Value example: `1,234`
   - Subtext: `Active in last 30 days`
2. Active Courses
   - Value example: `42`
   - Subtext: `Published courses`
3. Average Completion Rate
   - Value example: `65%`
   - Subtext: `Platform average`
4. Pending Manager Approvals
   - Value example: `3`
   - Subtext: `Courses awaiting approval`

Each card:
- Title (small), large value, small subtext, optional sparkline mini-chart.
- CTA (optional): small `View` / `Export` link.

Primary analytics area
- Left (2/3 width): Line chart titled `Enrolments (Last 30 days)` showing daily active enrolments or logins.
  - Chart controls: date range dropdown, programme-type filter (School / UG / PG), state filter.
- Right (1/3 width): two stacked compact cards:
  - `Programme Distribution` — donut chart showing School/UG/PG share.
  - `Top 5 States by Enrolment` — small vertical bar list or horizontal bars.

Bottom area
- `Recent Activity` list (mock): rows like `Manager X published Course Y (2 hours ago)`.
- Quick actions: `Export Summary (CSV)` button and `Open Analytics` link (navigates to analytics page).

Interactions & microcopy
- Date range default: `Last 30 days`.
- Filter chip labels: `State: All`, `Programme: All` (click to open selection).
- Export button label: `Export CSV`.
- Empty states: show friendly illustration + copy: `No data available for the selected filters.`

Accessibility
- All charts provide textual summaries beneath (e.g., "Total enrolments last 30 days: 2,345").
- Filter controls keyboard accessible.

Notes for mock
- Use static sample numbers seeded from mock JSON.
- Chart is a visual-only component; hover states can show sample tooltips but no data drill-down required.
