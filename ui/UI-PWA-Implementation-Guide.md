# PWA Implementation Guide for OpenGrad LMS

Purpose: define how to turn this Next.js mock LMS into an installable Progressive Web App without adding backend dependencies.

This document is intentionally implementation-oriented. It is written for the current codebase and its mock UI constraints, so it focuses on app-shell behavior, offline-first presentation, installability, and mobile-native feel rather than production auth or persistence.

---

## 1. Can this app be a PWA?

Yes. The current app is a strong candidate for a PWA because it already has:

- A clear app shell with persistent navigation
- Multiple route groups for role-based experiences
- Consistent branding and responsive layouts
- Static/mock UI content that can be cached aggressively

What a PWA can add here:

- Install to Android home screen and desktop
- Standalone app window without browser chrome
- Faster repeat visits through cached shell assets
- Limited offline access for shell pages and static mock data
- A more native mobile feel through touch-first navigation and full-screen display

What it will not do by itself:

- Replace a real native Android app feature-for-feature
- Add background execution limits beyond what browsers allow
- Create true device-level integrations without additional work

---

## 2. Current repo fit

Relevant files already present in this repository:

- [app/layout.tsx](../app/layout.tsx)
- [next.config.ts](../next.config.ts)
- [branding/branding-reference.md](../branding/branding-reference.md)
- [ui/UI-Mock-LMS-Spec.md](UI-Mock-LMS-Spec.md)
- [ui/UI-Layout-Shell.md](UI-Layout-Shell.md)

Why these matter:

- `app/layout.tsx` is the central place to add metadata and global PWA wiring.
- `next.config.ts` is where security headers and any worker-related headers belong.
- `branding/branding-reference.md` gives the color system for theme and splash alignment.
- The UI specs already define the shell, role-based navigation, and mock-only constraints.

---

## 3. Recommended architecture

### Option A, recommended for this mock app

Use the built-in Next.js App Router manifest support plus a lightweight service worker strategy.

Best fit when:

- You want a fast, low-risk PWA layer
- The app stays mock-only or mostly static
- You do not need advanced runtime caching rules immediately

Core pieces:

- `app/manifest.ts` for install metadata
- `public/sw.js` for service worker registration and caching
- A small client component to register the worker and show install prompts
- Security headers in `next.config.ts`

### Option B, when offline caching needs become serious

Use Serwist for more structured caching and runtime control.

Best fit when:

- You want route-aware caching policies
- You need better control over precaching and runtime caching
- You expect more offline behavior than a simple shell cache

Tradeoff:

- More setup, more configuration, and some build-system sensitivity

### Decision for OpenGrad

Start with Option A for the mock UI, then move to Serwist only if offline behavior becomes a concrete product requirement.

That keeps the implementation aligned with the current app state and avoids over-engineering.

---

## 4. Implementation phases

### Phase 1. Make the app installable

Goal: make the app show up as an installable PWA on Android and desktop.

Files to add or update:

- `app/manifest.ts`
- `app/layout.tsx`
- `next.config.ts`
- `public/icon-192x192.png`
- `public/icon-512x512.png`
- `public/apple-touch-icon.png`

Implementation instructions:

1. Define the manifest with `display: 'standalone'`, a short name, app description, theme color, and icon references.
2. Use the OpenGrad teal as the theme color so the installed app matches the brand.
3. Add `maskable` icons so Android can crop them cleanly.
4. Set `metadata.appleWebApp` and viewport-safe values in the root layout if needed.
5. Ensure the app is served over HTTPS in production.

Suggested manifest shape:

```ts
import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'OpenGrad LMS',
    short_name: 'OpenGrad',
    description: 'OpenGrad learning management system',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#034852',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
  }
}
```

### Phase 2. Add service worker support

Goal: cache the app shell and make common routes usable with degraded connectivity.

Files to add or update:

- `public/sw.js`
- `app/layout.tsx`
- `next.config.ts`

Implementation instructions:

1. Register the service worker only in the browser.
2. Cache the shell, branding assets, icons, and the most important mock routes.
3. Use a network-first strategy for dynamic pages if you want fresh content when online.
4. Use a cache-first strategy for static assets and the logo.
5. Keep the worker versioned so stale caches can be invalidated cleanly.

Minimal worker approach:

```js
const CACHE_NAME = 'opengrad-shell-v1'
const STATIC_ASSETS = [
  '/',
  '/manifest.webmanifest',
  '/logo.png',
  '/icon-192x192.png',
  '/icon-512x512.png',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => (key === CACHE_NAME ? null : caches.delete(key))))
    )
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  )
})
```

### Phase 3. Make it feel native on Android

Goal: make the installed app behave like a real app rather than a browser tab.

Files to consider:

- `components/Header.tsx`
- `components/Sidebar.tsx`
- `components/LayoutShell.tsx`
- role-specific root pages under `app/`

Implementation instructions:

1. Use a compact top-level mobile shell with large tap targets.
2. Prefer a bottom-safe layout with no content hidden behind browser bars.
3. Keep the sidebar collapsible or convert it to a mobile drawer for small screens.
4. Provide role-specific shortcuts such as Dashboard, Courses, Assignments, and Notifications.
5. Preserve the OpenGrad teal/green palette for brand consistency.
6. Avoid browser-like UI chrome inside the installed experience.

Android-oriented behavior to confirm:

- App opens in standalone mode
- Back navigation works naturally across the route stack
- Touch targets are at least 44 px high
- Modals and drawers remain usable in portrait mode

### Phase 4. Add install guidance for iOS and desktop

Goal: make installation discoverable even when the browser does not auto-prompt.

Implementation instructions:

1. Show an install CTA when the app is not already running standalone.
2. For iOS, display the share-sheet install hint instead of relying on `beforeinstallprompt`.
3. For desktop Chromium browsers, listen for `beforeinstallprompt` and defer the prompt until the user taps install.
4. Hide the prompt once the app is installed.

### Phase 5. Keep PWA scope mock-safe

Goal: preserve the repository’s mock UI policy.

Implementation instructions:

1. Do not add backend auth flows just to support PWA installability.
2. Do not add persistent sync, push delivery, or server storage unless the product scope changes.
3. Use client-side mock state and static assets for offline surfaces.
4. If offline data needs become real, add a separate backend plan instead of mixing it into the mock PWA work.

---

## 5. Production notes for later

If this PWA becomes more than a mock, the next real upgrades should be:

- Service worker runtime caching with route-specific rules
- Push notification subscription handling
- Background sync for queued actions
- IndexedDB persistence for drafts and offline interactions
- Analytics for install rate and offline usage

These should be treated as a second phase, not part of the initial mock PWA conversion.

---

## 6. Security and deployment notes

PWA-specific security guidance:

- Serve everything over HTTPS
- Add security headers in `next.config.ts`
- Keep the service worker script tightly scoped
- Do not cache sensitive or user-specific data unless it is safe to store offline
- Bust caches on release so stale UI does not linger

Useful headers to consider:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- A restrictive service-worker response policy for `/sw.js`

---

## 7. Mock run file

This is a dry-run checklist for the PWA work. It is meant to guide implementation and review, not to execute backend logic.

```md
# PWA Mock Run

1. Verify the current app shell and branding.
2. Add a manifest with OpenGrad colors and install metadata.
3. Add PWA icons under public/.
4. Add a browser-safe service worker registration.
5. Test installability in Chrome or Edge.
6. Test standalone launch on Android.
7. Test offline fallback by disabling the network.
8. Confirm that role-based routes still render after install.
9. Confirm the UI remains mock-only and does not depend on backend services.
```

Expected outcome:

- App installs successfully
- App opens in standalone mode
- Branding matches OpenGrad
- Basic offline access works for the cached shell and static assets
- No backend dependency was introduced

---

## 8. Acceptance criteria

The PWA conversion can be considered ready for the mock app when:

- The app can be installed from Android Chromium browsers
- The installed app uses OpenGrad branding and iconography
- The app launches without browser chrome
- The app shell and static assets survive reloads and revisits through caching
- The UI still behaves correctly across Student, Manager, Fellow, and Super Admin routes
- No backend behavior was added accidentally

---

## 9. Recommended next step

Implement the manifest, icon set, and service worker registration first. After that, validate installability and standalone behavior before deciding whether Serwist is worth adding.

That sequencing keeps the work small, reversible, and aligned with the current mock UI architecture.