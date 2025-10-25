# Ticket Web App (Multi-framework)

This repository contains three implementations of a Ticket Management Web App sharing a common design system:

- `react-version/` — Vite + React implementation
- `vue-version/` — Vite + Vue 3 implementation
- `twig-version/` — Twig templates for server-side rendering

Shared assets are in `/assets` and include `wave.svg`, `circle.svg` and `shared-styles.css`.

Quick start (React example):

1. cd react-version
2. npm install
3. npm run dev

Switching between versions: follow each version's `README.md` in their folders.

Design system:
- Max content width: 1440px
- Card-style boxes with rounded corners and shadows
- Hero with wave SVG and decorative circles

Accessibility notes:
- Semantic HTML used in templates
- Alt attributes provided for images
- Visible focus states via `.focus-outline` in shared CSS

Known issues:
- Twig version is template-only and requires a PHP front controller to handle POSTs and sessions.
