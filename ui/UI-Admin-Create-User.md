# Create User — Visual Spec

Purpose: describe the single-user creation flow and the role-driven dynamic fields shown in the mock.

Entry
- `Create User` CTA (top-right of `User Management`) opens a slide-over or new page with two tabs: `Single Create` and `Bulk Create`.

Single Create (form)
- Step 0: Role selector (dropdown) — choices: `Student`, `Manager`, `Fellow`, `Super Admin`.
- Once Role selected, show role-specific fields:
  - Student
    - Fields: `Full name` (required), `Roll number` (required), `Programme type` (dropdown: School / UG / PG), `State` (dropdown), `District` (dropdown), `School` (dropdown), `Email (optional)`, `Phone (optional)`, `Temporary password` (required)
    - Microcopy: `Roll number will be the student's login.`
  - Manager / Fellow / Super Admin
    - Fields: `Full name` (required), `Email` (required), `Phone (optional)`, `Assigned state(s)` (multi-select, optional), `Temporary password` (required)

- Buttons: `Create user` (primary), `Cancel` (secondary).
- Success state: small toast `User created` and user row appended to the Users table (mock).

Validation
- Required fields show inline errors if missing. Example messages:
  - `Please enter full name.`
  - `Please enter roll number.`
  - `Please enter a valid email address.`

Bulk Create (see separate spec file)
- Tab or separate modal with `Download template` → `Upload CSV` → `Preview` → `Confirm import` flow.
- Optional field: `Temporary password for all imported students`.

Notes for mock
- No backend: after `Create user` show success and update local list only.
- Role-specific conditional rendering must be clearly visible.
- Keep the UI compact and form-focused; prefer slide-over to full-page if possible.
