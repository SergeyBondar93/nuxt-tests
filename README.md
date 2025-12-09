# Nuxt Exploration Repository

This repository is a **testing and exploration playground** for experimenting with Nuxt, Nuxt modules, Nitro, and Azure Static Web Apps.

> 📖 **For AI/LLM Context**: See [CONTEXT.md](./CONTEXT.md) for repository purpose and guidelines.

**Deployed at**: https://zealous-pond-03bf06210.3.azurestaticapps.net/

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Deploying to Azure Static Web Apps

1. Generate the static site:
   ```bash
   npm run generate
   ```
   The static assets will be output to `.output/public`.
2. In Azure Static Web Apps, set the **App artifact location** to `.output/public`.
3. Build command: `npm run generate` (or `npx nuxt generate`).
4. If you use the Azure SWA GitHub Action, a minimal workflow step looks like:
   ```yaml
   - name: Build
     run: npm ci && npm run generate
   - name: Deploy
     uses: Azure/static-web-apps-deploy@v1
     with:
       app_location: .
       output_location: .output/public
   ```
5. After deploy, navigate between the sample routes:
   - `/routing` for link + programmatic navigation examples
   - `/components` for auto-imported components & composables
   - `/users/7` (any id) for dynamic params
