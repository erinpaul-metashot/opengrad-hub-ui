# User Management — Visual Spec (Super Admin)

Purpose: list & manage platform users (single edit/delete, bulk import preview). This is the primary Super Admin user-management page used to create and maintain accounts.

Layout
- Page header: title `User Management`, top-right CTA buttons: `Create User` (primary), `Bulk Import` (secondary), `Export CSV`.
- Top row: small stat card: `Total Users: 12,345` and quick role-filter chips.
- Search & filters row below: global search (placeholder: `Search by name, roll or email`), role dropdown (All / Student / Manager / Fellow / Super Admin), programme filter, state filter.
- Table area (main): paginated table with columns:
  - `Name`
  - `Roll / Email` (shows roll for students, email for others)
  - `Role`
  - `Programme`
  - `State`
  - `Status` (Active / Inactive)
  - `Actions` (Edit, Deactivate/Reactivate, Delete)

Table behaviour
- Rows: click anywhere on row opens the Edit modal (or `View` action).
- Actions column icons: pencil (Edit), user-lock (Deactivate), trash (Delete).
- Pagination: page size selector (10/25/50), previous/next controls.

Edit user modal (single)
- Title: `Edit user` + user name
- Form fields: Name, Role (disabled if Super Admin?), Roll number (if Student), Email, Phone, Programme, State, District, School, Status (Active/Inactive).
- Buttons: `Save` (primary), `Cancel` (secondary), `Reset Password` (tertiary) – clicking Reset Password opens small confirmation modal.

Delete flow
- Delete icon triggers confirmation modal: `Delete user` with copy: `Are you sure you want to permanently delete <name>? This action cannot be undone.` Buttons: `Confirm Delete` (danger), `Cancel`.

Bulk Import (opens the Bulk Import modal / page)
- CTA: `Bulk Import` opens page: `Download Student CSV template` button and `Upload CSV` field.
- When file uploaded: show preview table (first 10 rows), show validation errors per row (inline). Buttons: `Confirm Import` (primary) and `Cancel`.
- Field: `Temporary password for imported students` (optional) — set the same temporary password for all imported rows (mock only).

Empty state
- If no users, show illustration with copy: `No users found. Use Create User or Bulk Import to add users.`

Microcopy
- Search placeholder: `Search by name, roll or email`.
- Status labels: `Active`, `Inactive`.
- Export label: `Export CSV`.

Notes for mock
- No real changes—Edit / Delete / Reset flows should show modals and update local UI state only.
- Provide sample dataset with mixed roles to demonstrate filters and search.
