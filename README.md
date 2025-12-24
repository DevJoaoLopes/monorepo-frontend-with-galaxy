# Monorepo Frontend with Galaxy

This project is a monorepo managed with a [pnpm](https://pnpm.io/) workspace.

## Structure

- `api-products/`: MeteorJS API that serves product data over REST
- `home/`: Main host app that loads remotes via federation
- `list-products/`: Remote React app that renders the product list

## Install dependencies

```sh
pnpm install
```

## How to run each package

To see the full architecture running, use three terminals:

```sh
# 1) Meteor API
pnpm --filter api-products start

# 2) Remote list-products (port 4174 by default)
pnpm --filter list-products dev

# 3) Host shell that consumes the remote (port 4173)
pnpm --filter home dev
```

The Meteor API listens on port `3000` and exposes `GET /api/products` for the remotes to consume.

### Running the Meteor API (detailed)

1. Install the Meteor runtime (if you do not have it yet):

   ```sh
   curl https://install.meteor.com/ | sh
   ```

2. Install the package dependencies (includes Meteor types for TypeScript):

   ```sh
   cd api-products
   meteor npm install
   ```

3. Start the API (default port 3000):

   ```sh
   meteor run
   # or, from the monorepo root:
   pnpm --filter api-products start
   ```

4. Available endpoints:
   - `GET http://localhost:3000/api/products` — lists all seeded products.
   - `POST http://localhost:3000/api/products` — creates a product (`{ name, price, stock? }`) (_optional_).

If your editor's TypeScript cannot resolve `meteor/*` imports, ensure `meteor npm install` was run (it downloads `@types/meteor`) and that `api-products/tsconfig.json` is included in the project.

## Shared configs
- ESLint: `eslint.config.js` at the repo root
- TypeScript: `tsconfig.base.json` at the repo root

## Architecture

- **Backend (MeteorJS):** provides a REST endpoint (`/api/products`) with automatic seeding and open CORS.
- **Remotes (Module Federation):** `list-products` builds a `remote-entry` ESM served by Vite for consumption in other apps.
- **Host:** `home` loads the `remote-entry` at runtime and displays the federated catalog, keeping front-end packages independent and scalable.

## Notes
- Each package can have its own dependencies and configuration.
- Always run `pnpm` from the monorepo root to install dependencies and execute scripts.
