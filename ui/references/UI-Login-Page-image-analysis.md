# UI Login Page Image Analysis

**Date:** 2026-05-05  
**Source:** Attached UI-Mock-LMS-Spec login page PNG reference  
**Purpose:** Structured analysis to drive the login page mock component implementation

---

## Summary

The login page is a clean, centered card-based form layout with OpenGrad branding (logo, teal color scheme). The interface is minimal and focused on two input fields (email/roll and password) and a prominent call-to-action button to enter the learning portal.

---

## Layout & Composition

- **Page Background:** Soft off-white/light gray (not pure white)
- **Card Placement:** Single centered card, vertically and horizontally centered in viewport
- **Card Style:**
  - White background with subtle drop shadow (elevation effect)
  - Medium border radius (~8–12px)
  - Generous internal padding (24px on desktop; responsive on mobile)
  - Width: ~360–420px on desktop, responsive to 320px minimum on mobile
- **Content Stack Order:**
  1. OpenGrad logo (top-center, small gap from padding)
  2. Primary heading: "Welcome back"
  3. Descriptive subtext: "Enter your details to access your learning portal"
  4. Email/Roll input field
  5. Password input field
  6. Primary CTA button: "Sign In to Platform" (full-width, vibrant green)
  7. Optional secondary link: "Forgot password?" (small text, non-functional in mock)

---

## Visual Elements

### Logo
- **Size:** ~120px wide (scaled proportionally)
- **Color:** Teal gradient or solid teal (#006d6c or darker from OpenGrad palette)
- **Alignment:** Top-center of card
- **Styling:** The graduation cap icon is prominent in the OpenGrad wordmark

### Typography & Microcopy

| Element | Text | Font Style | Color | Notes |
|---------|------|-----------|-------|-------|
| Heading | "Welcome back" | Bold, 24–28px, sans-serif (Norwester or similar) | Dark gray/charcoal | Strong, welcoming tone |
| Subheading | "Enter your details to access your learning portal" | Regular, 14–16px, sans-serif (Montserrat) | Medium gray | Descriptive, secondary info |
| Field Label | "EMAIL OR ROLL NUMBER" | Uppercase, 12px, sans-serif | Medium gray | Small caps or all-caps style |
| Field Label | "PASSWORD" | Uppercase, 12px, sans-serif | Medium gray | Small caps or all-caps style |
| Placeholder Email | "name@opengrad.edu or OG-STU-001" | Italic, 14px, sans-serif | Light gray | Example format for both email and roll |
| Placeholder Password | "Enter your password" | Italic, 14px, sans-serif | Light gray | Generic password prompt |
| Button Label | "Sign In to Platform" | Bold, 16px, sans-serif | White text on button | Primary action |
| Link (optional) | "Forgot password?" | Regular, 12px, underline, sans-serif | Teal/link color | Secondary action (non-functional) |

### Color Palette (from OpenGrad branding)

| Role | Hex Code | Usage |
|------|----------|-------|
| Primary Accent | `#006d6c` (Deep Teal Green) | Logo, links, focus rings |
| Button / CTA | `#0abe62` (Vibrant Green) | "Sign In to Platform" button |
| Page Background | `#f5f5f5` or `#fafafa` | Soft off-white page background |
| Card Background | `#ffffff` | Form container |
| Text Primary | `#1a1a1a` or `#2c2c2c` | Field labels, heading |
| Text Secondary | `#666666` | Subheading, placeholder text |
| Error State | `#d32f2f` or red | Error messages below fields |
| Focus Ring | `#006d6c` | Border/outline on input focus |

---

## Form Fields

### Field 1: Email or Roll Number
- **Label:** "EMAIL OR ROLL NUMBER" (uppercase, visible label)
- **Input Type:** `text`
- **Placeholder:** "name@opengrad.edu or OG-STU-001"
- **Styling:**
  - Single-line text input
  - Subtle border (~1px, light gray or neutral)
  - Clear focus ring (2px, teal color)
  - Height: 44–48px (touch-friendly)
  - Padding: 12px horizontal, 10px vertical
- **Validation:** Required field; show error if empty on submit: "Please enter your roll number or email."

### Field 2: Password
- **Label:** "PASSWORD" (uppercase, visible label)
- **Input Type:** `password` (masked dots)
- **Placeholder:** "Enter your password" (shown before focus)
- **Styling:**
  - Single-line password input
  - Subtle border (~1px, light gray or neutral)
  - Clear focus ring (2px, teal color)
  - Height: 44–48px (touch-friendly)
  - Padding: 12px horizontal, 10px vertical
  - Optional: show/hide toggle icon (eye icon) on the right
- **Validation:** Required field; show error if empty on submit: "Please enter your password."

### Field Spacing
- **Vertical gap between fields:** 16px
- **Label-to-input gap:** 8px
- **Field-to-button gap:** 20–24px

---

## Primary CTA Button

- **Label:** "Sign In to Platform"
- **Style:**
  - Full-width (100% of form container)
  - Background color: Vibrant Green (`#0abe62`)
  - Text color: White
  - Font: Bold, 16px
  - Height: 44–48px
  - Border radius: Medium (8px, matching card border-radius)
  - No border (solid fill)
- **States:**
  - **Default:** Vibrant green background, white text
  - **Hover:** Slightly darker green or subtle shadow lift
  - **Active/Pressed:** Slightly darker green, inset shadow
  - **Disabled:** Grayed out (opacity 0.5)
- **Action (Mock):** Clicking navigates to role-specific dashboard (no real auth)

---

## Optional Secondary Link

- **Label:** "Forgot password?" (non-functional in mock)
- **Style:**
  - Small text (~12px)
  - Link color (teal)
  - Positioned below primary button or top-right of card
  - Underline on hover
- **Action:** Non-functional (no navigation)

---

## Error & Validation States

### Field-Level Errors
- **Style:** Red error text (~12px) positioned directly below the affected field
- **Example Error:** "Please enter your roll number or email."
- **Icon:** Optional small error icon (⚠) or red asterisk before text

### Global Error Banner (Optional)
- **Style:** Subtle red/error banner at top of card
- **Example Message:** "Invalid credentials. Please check your roll number/email and password."
- **Dismissibility:** Optional close button (×)
- **Display:** Only shown when simulating a failed login attempt (mock state)

---

## Accessibility

- **Form Structure:**
  - All inputs have associated visible `<label>` elements
  - All inputs have `aria-label` attributes as fallback
  - Form errors are linked to inputs via `aria-describedby`

- **Keyboard Navigation:**
  - All interactive elements (inputs, button, links) are keyboard-focusable (tab order)
  - Clear focus ring visible on all focused elements (>2px, high-contrast)
  - Focus order: Email → Password → "Sign In" Button → "Forgot Password?" link

- **Color Contrast:**
  - Text-on-background contrast: WCAG AA minimum (4.5:1 for normal text, 3:1 for large text)
  - Button text contrast: 4.5:1 (white on vibrant green)
  - Error text on white background: sufficient contrast

- **Screen Reader Support:**
  - Page title: "Login - OpenGrad"
  - Headings properly marked with `<h1>`, `<h2>` as appropriate
  - Form instructions announced via `aria-label` or surrounding text
  - Button announces intent: "Sign In to Platform"

- **Mobile Touch:**
  - Input height: 44–48px for comfortable finger targeting
  - Adequate padding and spacing between interactive elements
  - Responsive font sizes and padding on smaller viewports

---

## Responsive Behaviour

| Viewport | Width | Padding | Font Size | Changes |
|----------|-------|---------|-----------|---------|
| Desktop (≥1024px) | 360–420px | 24px | 16px heading, 14px body | Standard layout |
| Tablet (768–1023px) | 340–380px | 20px | 16px heading, 14px body | Card slightly narrower |
| Mobile (320–767px) | 100% – 16px margin | 16px | 16px heading, 14px body | Full viewport width with gutters |
| Small Mobile (< 320px) | 100% – 8px margin | 12px | 14px heading, 12px body | Tight spacing |

---

## Interactions & Microbehaviors

- **Input Focus:** Clear teal focus ring, smooth transition (0.2s)
- **Button Hover:** Slight green darkening or shadow lift, cursor pointer
- **Button Active:** Inset shadow or darker green
- **Field Validation:** On blur, if field is empty, show error message with red text
- **Form Submission:** On "Sign In" button click, validate both fields; if valid, navigate to role dashboard; if invalid, show field-level errors
- **Forgot Password Link:** Non-functional in mock (click does nothing or shows a toast: "Feature not available in mock")

---

## Implementation Notes

- **No Real Authentication:** Mock login sets client-side state and navigates to role-specific dashboard
- **Client-Side Validation Only:** Required field checks, email format (optional strict validation)
- **No Backend Submission:** Form does not POST to a server
- **Demo Roles:** Support switching roles (Student, Manager, Fellow, Super Admin) via navigation
- **Sample Credentials (for mock):**
  - Roll: `TN_CUET_001` (Student), `TN_MGR_001` (Manager), etc.
  - Password: Any non-empty string (no real password validation)
- **Placeholder Logo:** Use OpenGrad logo PNG; later replace with branding asset if provided
- **Static Images:** Use placeholder images for cover art; no real file uploads

---

End of analysis.
