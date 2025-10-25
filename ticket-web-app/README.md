# Ticket Web App (Multi-framework)
# Ticket Manager — Multi-framework example

This repository demonstrates the same visual design and UX implemented across three targets:

- `react-version/` — React (Vite) single-page app
- `vue-version/` — Vue 3 (Vite) single-page app
- `twig-version/` — Server-rendered PHP + Twig front-end (front controller in `twig-version/public/index.php`)

Shared assets (icons, SVGs, shared CSS) live in `/assets` and are copied into each framework's public folder when relevant.

This README contains quick start instructions, deployment notes, and troubleshooting common problems.

## Quick links

- React (Vite): `react-version/`
- Vue (Vite): `vue-version/`
- Twig (PHP): `twig-version/`

## Requirements

- Node.js (16+) and npm for React/Vue development
- PHP 8.1+ and Composer for Twig
- Docker (optional, recommended for production-like builds)
- Git

## Quick start — local development

Run the example that you want to work on.

React (dev server):

```powershell
cd 'C:\Users\USER\Documents\HNG\task manager\ticket-web-app\react-version'
npm install
npm run dev
# open the printed local URL (usually http://localhost:5173)
```

Vue (dev server):

```powershell
cd 'C:\Users\USER\Documents\HNG\task manager\ticket-web-app\vue-version'
npm install
npm run dev
```

Twig (PHP built-in server for local testing):

```powershell
cd 'C:\Users\USER\Documents\HNG\task manager\ticket-web-app\twig-version'
composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader
php -S localhost:8000 -t public
# open http://localhost:8000
```

Notes:
- Keep `composer.json` and `composer.lock` committed. Do not commit `vendor/` (the repo's `.gitignore` already excludes it).
- If a package requires private auth, set `COMPOSER_AUTH` in your CI/service environment rather than committing credentials.

## Building for production

React / Vue (build):

```powershell
cd react-version  # or vue-version
npm install
npm run build
# output is in ./dist
```

Twig: production deployments should run `composer install --no-dev` as part of the build and serve the `public/` directory from a web server (Apache / Nginx) or a Docker image.

## Deploying

React → Netlify (recommended)
- Connect your GitHub repo in Netlify and configure the site
- Base directory: `react-version`
- Build command: `npm run build`
- Publish directory: `dist`
- For SPA routing add `react-version/public/_redirects` with:
	```
	/* /index.html 200
	```

Twig → Railway (quick)
- Option 1 (Railway UI): set the service Root Directory to `twig-version` and use:
	- Build command: `composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader`
	- Start command: `php -S 0.0.0.0:$PORT -t public`
- Option 2 (Docker recommended): add `twig-version/Dockerfile` (example available in repository docs). Railway will build the image and run it.

Docker (local test):

```powershell
cd twig-version
docker build -t ticket-twig .
docker run --rm -p 8080:80 ticket-twig
# open http://localhost:8080
```

## CI / GitHub Actions (example)

You can add a simple workflow to run tests and build the frontends. Example ideas:
- install Node, run lint/tests for React/Vue
- build `react-version` and `vue-version` on push to main
- for Twig run `composer install` and optionally PHP unit tests

## Git & repository hygiene

- Do not commit `node_modules/`, `vendor/`, or build artifacts. The repo includes `.gitignore` rules already.
- If you accidentally commit `vendor/`, remove it from tracking without deleting local files:

```powershell
git rm -r --cached twig-version/vendor
git commit -m "Stop tracking vendor/; rely on composer for dependencies"
git push
```

- If `vendor/` has already been pushed and you need to shrink repo size, use `git-filter-repo` or BFG to purge it — this rewrites history and requires a forced push and coordination with collaborators.

## Contributing

- Add an ISSUE describing a bug or feature request.
- Create a branch `feature/your-feature` or `fix/issue-123`.
- Open a Pull Request and include steps to reproduce or test.

Style and accessibility
- Shared CSS variables and utility classes live in `/assets/shared-styles.css`.
- The design aims for a max content width of 1440px and consistent status colors/ badges across apps.

## Troubleshooting

- `cd: twig-version: No such file or directory` in Railway: set the service Root Directory to `twig-version` or use `--working-dir=twig-version` in your build commands.
- `php -S` fails locally: ensure PHP is installed and not blocked by another process on the port.
- Build failures in CI: check logs for missing dependencies or wrong Node/PHP version; pin Node with `.nvmrc` if needed.

## License & author

This repository is maintained by the project owner. Add license info here if you want to publish under a specific license.
