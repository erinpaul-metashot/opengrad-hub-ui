# Course Analytics / Course Stats — Visual Spec

Purpose: Manager-facing per-course analytics mock. Simple, focused view showing enrollment, completion, average progress, and per-student progress list. No backend — charts and tables use seeded mock data.

Layout
- Header: Course selector (dropdown) showing current course title, small date-range picker (default: Last 30 days), and `Export CSV` button.
- Stat cards row (4 cards): Enrolled, Completed, Average Progress, Average Quiz Score.
- Charts row:
  - Left (larger): Line chart titled `Completion Over Time` (daily/weekly completions)
  - Right (tall): Bar chart or donut titled `Progress Distribution` (buckets: 0–20%, 21–40%, 41–60%, 61–80%, 81–100%)
- Student table (below charts): paginated table showing per-student progress and quick actions.

Stat cards (exact labels)
- `Enrolled students` — numeric value (e.g., `1,234`) with subtext `Total enrolled`
- `Completed students` — numeric value (e.g., `456`) with subtext `Completed all lessons`
- `Average progress` — percent (e.g., `64%`) with subtext `Avg % across enrolled students`
- `Average quiz score` — percent (e.g., `72%`) with subtext `Avg across attempted quizzes`

Charts
- `Completion Over Time` (line)
  - X-axis: date; Y-axis: number of completions
  - Controls: date-range, programme filter
  - Tooltip on hover shows date + completions
- `Progress Distribution` (bar or donut)
  - Shows how many students fall in each progress bucket
  - Legend with counts and percentages

Student table (columns)
- `Select` (checkbox)
- `Name`
- `Roll / Email`
- `Progress` (progress bar + percent)
- `Completed Lessons` (count)
- `Quiz Avg` (percent)
- `Assignments` (submitted / total)
- `Last Activity` (relative time, e.g., `2 days ago`)
- `Actions` (View attempts / Message student / Export row)

Table behaviour
- Sortable by Progress, Completed Lessons, Quiz Avg, Last Activity.
- Row click opens student detail slide-over showing progress timeline, recent quiz attempts, and assignment statuses.
- Bulk actions: select multiple students → `Export Selected` / `Send Message` (mock).

Filters
- Global filters above table: search by name/roll, programme (School / UG / PG), state, and `Show at-risk students` checkbox (at-risk = progress < 40%).

Microcopy & labels
- Page title (header): `Course Analytics`
- Course selector label: `Course:`
- Date-range default value: `Last 30 days` with shortcut options (7d, 30d, 90d, All time)
- Export button: `Export CSV`
- Empty state: `No student data available for the selected filters.` with CTA `View course` (links to course detail)

Quick actions & CTAs
- `Export CSV` (header)
- Per-student `View attempts` opens quiz attempts (mock)
- `Send message` opens small compose modal (mock only)

Accessibility
- Charts include textual summaries beneath them (e.g., "Total completions last 30 days: 123").
- Table has proper headings, aria-sort on sortable columns, and keyboard navigation.

Mock behaviour notes
- All interactions update client-side mock data only.
- `Export CSV` downloads a CSV generated from the current mock dataset and filters.
- `Show at-risk students` toggles an inline highlight (red border) on matching rows.

Created to guide the implementation of a focused course analytics mock view for Managers.
