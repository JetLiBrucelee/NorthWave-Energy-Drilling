---
name: Admin session 401 handling
description: React Query useGetAdminSession must suppress errors or admin page goes blank
---

**Rule:** When using `useGetAdminSession` on any page that renders before auth is established, always pass `{ query: { retry: false, throwOnError: false } }`.

**Why:** The `/api/auth/me` endpoint returns 401 when not logged in. React Query treats 401 as a thrown error, which puts the query in error state indefinitely. If the component has `if (isLoading) return null`, it renders nothing because isLoading stays false but data is undefined. With throwOnError:false, the query settles gracefully and data is undefined (falsy), so the page renders normally.

**How to apply:** AdminLogin and AdminDashboard pages. Any protected page that checks session state at load time.
