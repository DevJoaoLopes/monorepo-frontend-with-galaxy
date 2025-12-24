# Meteor Products API (Galaxy)

This package is a MeteorJS REST service that seeds and exposes a simple product catalog for the federation demo.
Built with Meteor’s Galaxy runtime, it highlights rapid full-stack delivery with out-of-the-box hot reload and build tooling.
The API listens on port 3000 by default and enables CORS so front-end remotes can consume it without extra proxies.
Data is seeded on startup to showcase predictable responses for local development.
Exposes REST endpoints for listing and creating products.
- GET /api/products — returns all products.
- POST /api/products — accepts { name, price, stock? }.
Meteor fibers are gone in modern releases, so async/await handlers stay straightforward.
Meteor methods and publications are unused here; the focus is pure REST via WebApp.
Galaxy deployment-friendly: environment-based config, stateless handlers, ready for containerization.
TypeScript-ready: includes @types/meteor for editor autocomplete and safety.
Start locally with pnpm --filter api-products start or meteor run inside this folder.
Best used alongside the host and remote apps to demonstrate Module Federation consuming Meteor-powered data.
