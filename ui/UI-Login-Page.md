# Login Page — Visual Spec

Purpose: visual-only description for the static UI mock of the LMS login page. No authentication logic — clicking the primary CTA navigates to the selected role's dashboard.

## Overview

- Background: soft off-white page background (not pure white).
- Central card: single centered rounded rectangle (card) containing the login form. Card sits vertically and horizontally centered on desktop; on narrower viewports it becomes a vertically stacked single column with comfortable padding.

## Card (container)

- Width: ~360–420px on desktop (responsive to 320px on mobile).
- Background: white (subtle shadow / elevation).
- Border radius: medium (8–12px).
- Padding: generous (24px desktop; 16px mobile).
- Alignment: logo at top-center, form fields stacked beneath, primary button full-width, small secondary link beneath.

## Logo

- Placement: inside the card, top center, small gap from top padding.
- Size: 120px wide (scaled proportionally), or scaled to fit card width with margin.
- Alt text: "OpenGrad" (for accessibility).

## Form fields

1. Username / Roll / Email
   - Label (visible): "Roll number or email"
   - Placeholder: "e.g., TN_CUET_001 or alice@example.com"
   - Input type: text
   - Autocomplete: `username`
   - Validation: required, show error text under field when empty on submit: "Please enter your roll number or email." 

2. Password
   - Label (visible): "Password"
   - Placeholder: "Enter your password"
   - Input type: password
   - Autocomplete: `current-password`
   - Validation: required, show error text under field when empty on submit: "Please enter your password." 

- Field spacing: 12–16px vertical gap.
- Field style: single-line fields with subtle border, clear focus ring.

## Primary CTA

- Button label (confirm with product): `Log in` (as provided)
- Style: full-width, prominent (solid color from branding when provided), medium radius, 44–48px height for touch.
- Action (mock): clicking navigates to role-specific dashboard (no auth). If validation fails, show inline errors and do not navigate.

## Secondary actions / Links

- Optional small text link under CTA: "Forgot password?" (non-functional in mock)
- Optional small text below or top-right: role switcher (if desired later) — simple link list: "Student | Manager | Fellow | Admin".

## Error / Validation states

- Field-level error text in red / error color beneath the affected field.
- Global error banner (card-top) for cross-field errors: e.g., "Invalid credentials" (shown only when simulating a failed login). Use a small dismissible banner.

## Accessibility

- All form fields have visible labels and `aria-label` attributes.
- Button and links are keyboard-focusable and have clear focus outlines.
- Color contrast should meet AA standards (foreground vs background).
- Provide `aria-live` region for global error messages.

## Microcopy & exact copy suggestions

- Page title (card header): none — logo only.
- Field labels: exactly as above.
- Primary button: confirm: `Log in`.
- Placeholder examples: exactly as above.
- Error messages (examples):
  - "Please enter your roll number or email."
  - "Please enter your password."
  - "Invalid credentials. Please check your roll number/email and password."

## Responsive behaviour

- Desktop: centered card with whitespace on both sides.
- Tablet/mobile: card narrows to fit screen, spacing reduced; inputs grow to full width.
- On very small screens, reduce paddings to 12px to keep card usable.

## Notes for the mock implementation

- No real auth required — clicking primary CTA simply sets a client-side role and navigates to the corresponding mock dashboard route.
- Use placeholder logo image; later replace with provided branding asset.
- Keep states for: default, field-level validation errors, and global invalid credentials state (for demo toggles).

---

Created for the static UI mock; let me know any copy or layout adjustments and confirm the primary CTA label.
