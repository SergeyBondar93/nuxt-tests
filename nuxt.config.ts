// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  nitro: {
    // Generates output compatible with Azure Static Web Apps hosting.
    preset: 'azure'
  },
  routeRules: {
    // Pre-render all routes for static hosting. Unknown dynamic params still
    // render client-side in the browser.
    '/**': { prerender: true }
  }
})
