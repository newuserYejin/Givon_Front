# ARCHITECTURE

## Overview
This project is a donation-platform front end centered on the Donor experience.
The user journey is donor-first and expands by role only after login.

## Core Principles
1. Donor is the primary UI.
2. Admin and Organization UI are additive, not replacements.
3. Donor menus always remain visible.
4. Role-based pages are guarded and only appear after login.

## Folder Structure
- `src/api`
  - Axios client and all API functions.
  - Mock fallback data for local development when the server is unavailable.
- `src/pages`
  - Route-level pages for Donor, Admin, and Organization flows.
- `src/components`
  - Shared UI pieces such as cards, shell, and status views.
- `src/routes`
  - Router composition and role-based guards.
- `src/hooks`
  - React Query hooks and auth state helpers.

## Routing
- Public Donor routes:
  - `/home`
  - `/org/:id`
- Public auth routes:
  - `/login`
  - `/register`
- Protected Admin routes:
  - `/admin`
  - `/admin/userList`
- Protected Organization routes:
  - `/organization/dashboard`
- `/` redirects to `/home`.

## UI Flow
- Donor
  - browse organizations
  - open organization detail
  - keep login/register available
- Admin
  - admin dashboard
  - user management
- Organization
  - organization dashboard

## Auth Behavior
- If not logged in, the UI only shows Donor navigation plus login/register.
- After login, role-specific menu items are added.
- `admin` users see management routes.
- `organization` users see the organization dashboard.
- `donor` users keep the Donor flow only.

## Styling
- Tailwind is the primary styling system.
- Ant Design is used for polished controls and feedback states.
- The overall theme is light, warm, and friendly.
