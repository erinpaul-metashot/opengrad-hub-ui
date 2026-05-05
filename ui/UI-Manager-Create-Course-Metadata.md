# Create Course — Step 1: Metadata (Visual Spec)

Purpose: visual-only mock for the first step of the course creation flow. Single-column form that collects course metadata before entering the curriculum (modules/lessons).

Layout
- Single-column form centered within the main content area. Use a card with padding and a subtle shadow.
- Form width: responsive; ideal max-width ~720px; full-width on mobile.
- Top of card: page title `Create Course` and a small breadcrumb `Courses › Create` if present.

Field order & exact copy
1. Course Title (required)
   - Label: `Course title`
   - Placeholder: `e.g., IPMAT Kerala 2026`
   - Validation: required. Error: `Please enter the course title.`

2. Description (required)
   - Label: `Description`
   - Input: multi-line textarea (3–6 rows)
   - Placeholder: `Short summary of the course and learning outcomes.`
   - Validation: required. Error: `Please enter a description.`

3. Access Type (required)
   - Label: `Access type`
   - Control: radio buttons — `Free` | `Paid`
   - If `Paid` selected: show `Price` input (number) + `Currency` dropdown (default INR)
   - Price validation: numeric ≥ 0. Error: `Please enter a valid price.`

4. Locking Mode (required)
   - Label: `Locking mode`
   - Control: toggle or radio — `Open` | `Sequential`
   - Tooltip/help text: `Sequential: students must complete previous lessons to unlock the next. Open: all lessons available immediately.`

5. Programme Type (required)
   - Label: `Programme type`
   - Control: checkboxes — `School`, `UG`, `PG` (allow multiple)
   - Helper text: `Which student programmes should this course be available to?`
   - Validation: at least one must be selected. Error: `Please select at least one programme type.`

6. Cover image (optional for mock)
   - Label: `Cover image URL`
   - Input: text input for image URL and a small thumbnail preview to the right or above (auto-loads image preview when URL is valid).
   - Placeholder: `https://.../cover.jpg`
   - Validation: if present, validate basic URL. Error: `Please enter a valid image URL.`

7. Tags / Category (optional)
   - Label: `Tags (optional)`
   - Input: tokenized input (comma-separated or chips) — used for filtering/search in Manage Courses.

Form behaviour & microcopy
- Required fields show a small `*` marker.
- Inline validation: validate on blur and on submit; show red error text beneath the field.
- Save behaviour: clicking primary button writes a local draft (mock) and proceeds to Step 2 (Curriculum Builder).

Primary & secondary actions
- Primary (prominent): `Save & Next` — saves draft and navigates to Course Curriculum (Step 2).
- Secondary: `Cancel` — if changes exist, show confirm modal: `Discard changes?` with `Discard` / `Keep editing` buttons.
- `Publish` button: visible but disabled on this step (show tooltip: `Publish after adding curriculum and at least one lesson`). When enabled (in future) label: `Publish Course`.

Accessibility
- All inputs have visible labels and `aria-describedby` for helper/error text.
- Button sizes: at least 44px height for touch.
- All actions keyboard accessible.

Empty / error states
- If user clicks `Save & Next` and required fields are missing, show inline errors and keep user on this step.
- If image preview fails to load, show fallback placeholder image and small warning: `Image preview failed to load.`

Notes for mock implementation
- No backend: `Save & Next` stores input in client-side mock dataset and opens the Curriculum Builder route (`/manager/courses/new/curriculum` or similar).
- `Publish` remains disabled until modules/lessons exist.
- Provide example placeholder values in the form for demonstration.

Created for the static UI mock. After you confirm this, I'll prepare the Step 2 (Curriculum Builder) spec.
