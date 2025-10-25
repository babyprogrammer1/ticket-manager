# TicketFlow — Twig (PHP + Twig) version

This folder contains the server-side PHP + Twig implementation of TicketFlow. It's a minimal front controller that renders Twig templates and uses PHP session for mock auth. The tickets UI contains a small client-side localStorage-backed store to mirror the JS apps.

## Frameworks & libraries used
- PHP 7.4+ (or PHP 8+) built-in server for local dev
- Twig (installed via Composer)

## Setup & run
1. Install dependencies (from `twig-version` folder):

```powershell
cd "c:\Users\USER\Documents\HNG\task manager\ticket-web-app\twig-version"
composer require twig/twig
```

2. Start PHP built-in server (serves files from `public`):

```powershell
php -S localhost:8000 -t public
```

3. Open http://localhost:8000 in your browser.

## Switching between frameworks
- React: run the `react-version` dev server (see its README).
- Vue: run the `vue-version` dev server (see its README).

## App structure & state (short)
- `public/index.php` — front controller and small router; manages session-based auth and renders templates.
- `templates/layout.twig` — main layout, header/nav and flash toast rendering.
- `templates/tickets.twig` — tickets UI: a client-side localStorage-backed store (`ticketapp_data`) that mirrors the behavior of the JS versions; the server enforces auth via PHP session and sets flash messages when redirecting unauthenticated users.

## Error handling & accessibility notes
- Server-side auth: protected routes (`/dashboard`, `/tickets`) will redirect to `/auth/login` and set a flash message such as: "Your session has expired — please log in again." The login page displays the flash once.
- Client-side validation: tickets form shows inline validation and uses small toasts for confirmations and errors.
- Toasts: accessible role and aria-live are used for announcements.

## Known issues & notes
- The tickets list in Twig uses localStorage for persistence (so it's consistent with JS implementations). This is a minimal demo — not a production backend.
- If the built-in PHP server doesn't start in your environment, ensure Composer is installed and `vendor/autoload.php` exists (see error message in `public/index.php` for guidance).

## Example test user
- Login form accepts any email/password for the mock flow. Example credentials:
  - Email: demo@ticketapp.local
  - Password: password
# Twig Version

This folder contains Twig templates for a server-rendered version of the Ticket Management Web App.

How to use:
- Install PHP and Composer
- Create a small PHP front controller that uses `twig/twig` to render the templates in `templates/`.
- Use session (PHP $_SESSION) to simulate `ticketapp_session`.

Example quick start (minimal):

1. Install dependencies with Composer:

```powershell
cd "c:/Users/USER/Documents/HNG/task manager/ticket-web-app/twig-version"
composer require twig/twig
```

2. Start PHP's built-in server from this folder:

```powershell
php -S localhost:8000 -t public
```

3. Open `http://localhost:8000` in your browser.

Notes:
- The `public/index.php` front controller provided in this folder handles simple routes and mock authentication (accepts any email/password).
- Static assets (SVG and shared CSS) are available under `public/assets/`.

Templates:
- `layout.twig` - shared layout
- `landing.twig` - home
- `auth/*.twig` - login/signup

Notes:
- This is intentionally a template-only scaffold. Implementing full PHP routing/controllers is left as an exercise; examples can be provided on request.
