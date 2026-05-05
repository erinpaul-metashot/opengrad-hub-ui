# Bulk User Import — Visual Spec (Students)

Purpose: visual mock for bulk importing students via CSV. Focused on preview + row-level validation UI.

Page / Modal layout
- Header: `Bulk Import — Students` with `Download student CSV template` button on the right.
- Upload area: drag-and-drop zone + `Choose file` button. Small hint: `CSV columns: name,roll_number,programme_type,state,district,school,email,phone`.

Preview & Validation
- After file upload show a preview card:
  - Top: file name, row count, and `Set temporary password for all` input (optional).
  - Table: show first 10 rows in a scrollable preview with validation column at the end.
- Validation column shows green check or red error with message (e.g., `Missing roll_number`, `Invalid state`).
- If any row has error, show a banner: `Some rows contain errors and will not be imported. Fix CSV and retry.`

Actions
- Buttons: `Confirm import (X valid rows)` (primary, enabled if at least one valid row), `Cancel` (secondary), `Download error report` (shows CSV of invalid rows if present).

Template details (for Download)
- Header row columns exactly: `name,roll_number,programme_type,state,district,school,email,phone`
- Example row included in the template: `Alice Kumar,TN_CUET_001,UG,Tamil Nadu,Chennai,Govt Higher Sec School,alice@example.com,+919999888777`

Notes for mock
- Preview table does not actually import; Confirm updates local mock dataset.
- Provide a simulated error set to demonstrate error handling in the UI.
- Show success toast after confirm: `Imported 18 users (2 rows skipped due to errors).`
