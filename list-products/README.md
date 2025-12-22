# list-products

Remote React microfrontend that exposes a product list via module federation.

- Fetches products from the Meteor REST API and formats currency for BRL.
- Ships a `ProductList` component consumed by the host app at runtime.
- Built with Vite + React + TypeScript.
- Styles live in scoped CSS alongside the component.

## Useful scripts
- `pnpm dev` starts the remote in dev mode.
- `pnpm build` generates the production bundle.
- `pnpm preview` serves the built files locally.
