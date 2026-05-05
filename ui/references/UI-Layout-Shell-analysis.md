# UI Layout Shell — Image Analysis

## Summary

The OpenGrad LMS layout shell is a modern, professional dashboard application interface with a persistent two-column layout. The design features a fixed left sidebar for persistent navigation and a main content area with a header bar containing user controls and notifications. The UI employs a clean, minimal aesthetic with teal/green accent colors from the OpenGrad brand palette.

---

## Layout Structure

### Overall Frame
- **Type:** Two-column fixed layout
- **Sidebar:** Fixed left column, 20% width (approx. 240px), full viewport height, persistent across all pages
- **Main Content:** 80% width, flexible, scrollable
- **Background:** Soft off-white (#f9fafb or similar gray-50)

### Sidebar (Left Navigation)
- **Width:** 240px (fixed)
- **Height:** 100vh (full viewport height)
- **Background:** White (#ffffff)
- **Border:** Light right border (gray-200)
- **Shadow:** Subtle shadow for depth
- **Sections:**
  1. **Top:** OpenGrad logo/branding (centered, with padding)
  2. **Middle:** Primary navigation list (scrollable if needed)
  3. **Bottom:** Sign Out button (anchored to footer)

### Top Header (Inside Main Content)
- **Height:** ~56px (64px including padding)
- **Background:** White (#ffffff) with subtle bottom border
- **Layout:** Flex, space-between (left-aligned title / right-aligned controls)
- **Right Controls:** Role badge, notification bell, user avatar/menu
- **Shadow:** Subtle shadow for elevation

---

## Color Palette (OpenGrad Brand)

| Element | Color | Hex Code | Usage |
|---------|-------|----------|-------|
| **Sidebar Background** | White | #ffffff | Main sidebar container |
| **Sidebar Border** | Light Gray | #e5e7eb | Right border separator |
| **Navbar Active Item** | Light Teal | #e0f2fe or #f0fdfa | Active nav item background |
| **Active Indicator** | Deep Teal | #006d6c | Left accent bar on active item |
| **Role Badge** | Teal | #006d6c | Role display pill |
| **Text (Primary)** | Dark Gray | #111827 | Labels and text |
| **Text (Secondary)** | Medium Gray | #6b7280 | Hover/secondary text |
| **Notification Badge** | Red | #dc2626 | Unread count indicator |
| **Button (Sign Out)** | Red | #dc2626 | Sign out button |
| **Page Background** | Light Gray | #f9fafb | Main content area background |

---

## Typography

- **Logo/Brand:** OpenGrad (likely 20-24px, bold/semibold)
- **Page Title (Header):** 18px, semibold, dark gray
- **Nav Items:** 14px, medium weight, gray
- **Badges/Labels:** 12px, bold, varies by context
- **Body Text:** 14px, regular, gray-700

---

## Components & Interactions

### Navigation Sidebar

#### Primary Nav Items
- **Icon + Label Layout:** Icon (left, 20px) + Text label (flex-grow) + Optional badge (right)
- **States:**
  - **Normal:** Gray text, subtle hover background
  - **Active:** Light background + left accent bar + teal text
  - **Hover:** Mild background color change
- **Collapsible Items (e.g., "Courses"):**
  - Show chevron icon (pointing down/right) to indicate expandable state
  - Clicking toggles visibility of child items
  - Child items indented and smaller font
  - Smooth height animation on expand/collapse

#### Badges
- **Style:** Small rounded pill, red background, white text
- **Position:** Right side of nav item
- **Content:** Number (e.g., "3" for 3 unread assignments)
- **Visibility:** Only on items with counts

### Header Bar

#### Role Badge
- **Style:** Rounded pill / badge shape
- **Text:** "Student", "Manager", "Super Admin", "Fellow"
- **Color:** Teal (or role-specific color)
- **Position:** Right side of header, before notifications
- **Size:** Small (12-13px text, ~30px height)

#### Notification Bell
- **Icon:** Standard bell icon (20px)
- **Badge:** Red dot or number on top-right corner
- **Behavior:** Click opens dropdown with notification list
- **Dropdown:** Slides down from bell, white background, shadow, max-width ~300px
- **Content:** Scrollable list of mock notifications

#### User Avatar + Menu
- **Avatar:** Circular, 40px, background color (teal), white text (initials)
- **Behavior:** Click opens dropdown menu
- **Menu Options:**
  - Profile (non-functional)
  - Switch Role (with submenu listing roles)
  - Sign Out (red text/icon)
- **Dropdown:** White background, shadow, scrollable if needed

### Sign Out Button (Sidebar Footer)
- **Style:** Full-width button, red background
- **Text:** "Sign Out" with icon
- **Hover:** Darker red
- **Position:** Bottom of sidebar, above fold

---

## Content Area

### Page Content Region
- **Padding:** 24px (comfortable spacing)
- **Background:** Light gray (f9fafb)
- **Max-width container:** Optional constraint for readability
- **Overflow:** Scrollable if content exceeds viewport

### Cards/Panels (Generic)
- **Background:** White
- **Border:** None or subtle (gray-200)
- **Shadow:** Subtle shadow for elevation
- **Padding:** 16-24px internal spacing
- **Border-radius:** 8px (mild rounding)

---

## Responsive Behavior

- **Desktop (≥1024px):** Full two-column layout as described
- **Tablet (768-1023px):** Sidebar narrows or collapses to icons; header adjusts
- **Mobile (<768px):** Sidebar collapses into hamburger menu; header remains with core controls

---

## Accessibility Notes

- **Keyboard Navigation:** Tab through nav items and controls; Enter to activate
- **Focus Indicators:** Visible focus rings on all interactive elements
- **ARIA Labels:** All buttons and nav items have descriptive labels
- **Color Contrast:** Ensure text/background combos meet WCAG AA (4.5:1 or better)
- **Semantic HTML:** Use `<nav>`, `<header>`, `<main>` for proper document structure

---

## Suggested Components (Implementation)

1. **`LayoutShell`** — Wrapper component combining Sidebar + Header + Page content
2. **`Sidebar`** — Navigation component with collapsible items, nav state management
3. **`Header`** — Top bar with role badge, notifications, user menu
4. **`NavItem`** — Reusable nav item with icon, label, badge, and nested children
5. **`RoleBadge`** — Small badge showing current role
6. **`NotificationDropdown`** — Popover for notifications list
7. **`UserMenu`** — Dropdown for user profile, role switch, sign out

---

## Notes for Implementation

- Use CSS Grid or Flexbox for two-column layout; sidebar is fixed position to maintain width
- Implement smooth transitions for collapsible nav and hover states (~200ms)
- Use Tailwind CSS for rapid styling; leverage utility classes for consistency
- Mock data: Seed with realistic nav items per role (Student, Manager, Fellow, Admin)
- No backend integration: Role switching is client-side state only
- Icons: Use a library like Lucide React for consistent, scalable icons

---

**Created:** 2026-05-05  
**Status:** Ready for component implementation  
**Reference:** UI-Layout-Shell.md, branding-reference.md
