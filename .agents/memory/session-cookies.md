---
name: Session cookie setup
description: How to make express-session cookies work with the generated API client in the frontend
---

The generated `customFetch` in `lib/api-client-react/src/custom-fetch.ts` does not send cookies by default.

**Rule:** Add `credentials: "include"` to the `fetch(...)` call in `customFetch`.

**Also:** Call `setBaseUrl(import.meta.env.BASE_URL.replace(/\/$/, ""))` in `main.tsx` (not App.tsx) so all API calls include the correct path prefix.

**Why:** Replit uses path-based routing; without setBaseUrl, API calls go to `/api/...` without the artifact's base path prefix. Without credentials:include, express-session cookies are never sent, so every request appears unauthenticated.

**How to apply:** Any new web artifact that uses session-based auth (no Bearer token) needs both of these fixes.
