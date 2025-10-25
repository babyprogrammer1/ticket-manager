# TicketFlow — React version

This folder contains the React (Vite) implementation of TicketFlow (a ticket/complaints & requests manager).

## Frameworks & libraries used
- React 18 (JSX)
- Vite (dev server / build)
- No external state library (local component state + localStorage used as the mock persistence)

## Setup & run
1. Open a terminal in this folder:

```powershell
cd "c:\Users\USER\Documents\HNG\task manager\ticket-web-app\react-version"
npm install
npm run dev
```

2. The Vite dev server will show the local address (e.g. http://localhost:5173). Open it in the browser.

## Switching to other versions
- Vue: open `vue-version` folder and run the equivalent npm commands described in its README.
- Twig: open `twig-version` and follow its README (Composer + PHP built-in server).

## UI components & state structure (short)
- App.jsx: root routing / header / toast container. Exposes showToast(payload) used by pages.
- Pages:
  - `Dashboard.jsx` — requests ticket stats and shows numbers. Uses `listTickets()` from mockApi.
  - `Tickets.jsx` — list and create/update/delete UI for tickets. Contains the create/edit form and grid.
  - `Login.jsx` / `Signup.jsx` — simple mock auth; store session in localStorage.
- Components:
  - `TicketCard.jsx` — presentational card for each ticket; shows status badge and actions.
- State & persistence:
  - Mock API functions in `src/mockApi.js` read/write `localStorage` key `ticketapp_data`.
  - Session stored in `localStorage` key `ticketapp_session`.

## Error handling & accessibility notes
- Form validation: inline validation for required fields (Title). Error text is shown near the input.
- API errors: mock API rejects with {code:'UNAUTHORIZED', message: ...} when session missing. Components show toast messages and redirect to login when unauthorized.
- Toasts: accessible role="status" / aria-live used to announce to screen readers.
- Mobile nav: off-canvas drawer with aria-expanded and aria-hidden toggles.

## Known issues & notes
- This app uses a simple mock API (localStorage). No backend persistence.
- No token refresh or server sessions beyond the simple session mock — clearing localStorage simulates session expiry.
- Accessibility: focus trap for off-canvas drawer is not implemented yet (planned enhancement).

## Example test credentials
- Any email/password will be accepted for the mock login. Example:
  - Email: demo@ticketapp.local
  - Password: password

Enjoy exploring the React implementation.

# React Version

This is a minimal React (Vite) implementation of the Ticket Management Web App. It implements:

- Landing page with hero and wave background
- Login and Signup with form validation and localStorage session (`ticketapp_session`)
- Dashboard with basic stats
- Tickets CRUD (create/read/update/delete) using a mock API storing data in `localStorage` under `ticketapp_data`

Quick start

1. Open PowerShell
2. cd into the React folder

```powershell
cd "c:/Users/USER/Documents/HNG/task manager/ticket-web-app/react-version"
npm install
npm run dev
```

Entry points
- `src/main.jsx` — app bootstrap
- `src/App.jsx` — simple hash-based router and layout

Notes
- The app uses a tiny mock API in `src/mockApi.js` and simple auth helpers in `src/utils/auth.js`.
- No external router or state library to keep the scaffold small.

Example credentials
- email: demo@ticketapp.local
- password: password

Accessibility
- Semantic elements, alt attributes for decorative graphics, and visible focus outlines are included in the shared stylesheet.

Next steps
- You can add `react-router` and more robust validation/tests if you want to expand this scaffold.
