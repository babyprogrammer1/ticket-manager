# TicketFlow — Vue version

This folder contains the Vue 3 (Vite) implementation of TicketFlow.

## Frameworks & libraries used
- Vue 3 (Composition API)
- Vite (dev server / build)
- No additional state library; localStorage used for mock persistence.

## Setup & run
1. Open a terminal in this folder and run:

```powershell
cd "c:\Users\USER\Documents\HNG\task manager\ticket-web-app\vue-version"
npm install
npm run dev
```

2. Open the dev server address from the terminal (e.g. http://localhost:5173).

## Switching between versions
- To view React version: open and run the `react-version` folder (see its README).
- To view Twig version: open `twig-version` and follow its README steps (Composer + PHP server).

## UI components & state structure (short)
- `App.vue` — root layout, header/navigation, toast container and route switching.
- `views/Dashboard.vue` — reads tickets from mockApi and computes stats.
- `views/Tickets.vue` — create/edit form & ticket grid; inline validation and API error handling.
- `components/TicketCard.vue` — ticket display card with actions.
- State & persistence:
  - Mock API in `src/mockApi.js` uses `localStorage` key `ticketapp_data`.
  - Session uses `ticketapp_session` in `localStorage`.

## Error handling & accessibility notes
- Client-side validation: form shows inline messages for required fields.
- API-level auth checks: mockApi returns UNAUTHORIZED rejections when no session; components handle these by showing a toast and redirecting to login.
- Toasts use aria-live and role=status for screen-reader announcements.

## Example test credentials
- Any email/password are accepted. Example:
  - Email: demo@ticketapp.local
  - Password: password
# Vue Version

Minimal Vue 3 (Vite) implementation of the Ticket Management Web App.

Quick start:
- npm install
- npm run dev

Notes:
- Uses `ticketapp_session` localStorage key to simulate authentication.
- Mock data stored in `ticketapp_data`.

Example credentials:
- email: demo@ticketapp.local
- password: password

Accessibility & known issues: similar to React version.
