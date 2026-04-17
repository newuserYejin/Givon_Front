# RULES

## Stack
- Use React, React Router, React Query, Axios, Tailwind CSS, and Ant Design.
- Keep API access in `src/api`.
- Prefer Tailwind utility classes over new `.css` files.

## Routing
- Public routes:
  - `/`
  - `/org/:id`
- Keep route definitions in `src/routes`.

## Data Flow
- Use `useQuery` for read operations.
- Use `useMutation` for donation actions.
- Invalidate or refresh related queries after mutations.
- All HTTP requests must go through the Axios client in `src/api/client.ts`.

## UI
- The app should follow the donation flow:
  - select items
  - donate
  - check status
- Prefer reusable components in `src/components`.

## File Discipline
- Minimize `.css` files.
- Keep page-level logic in `src/pages`.
- Keep hooks in `src/hooks`.

## Quality
- Keep the UI resilient when the API is unavailable.
- Use clear loading, empty, and error states.
- Match the architecture documented in `ARCHITECTURE.md`.
