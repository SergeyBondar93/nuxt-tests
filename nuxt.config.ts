// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  nitro: {
    // Azure preset only for production builds
    preset: process.env.NODE_ENV === 'production' ? 'azure' : undefined
  },
  // Azure Static Web Apps configuration - only for production builds
  ...(process.env.NODE_ENV === 'production' && {
    routeRules: {
      // Pre-render all routes for static hosting. Unknown dynamic params still
      // render client-side in the browser.
      '/**': { prerender: true }
    }
  })
})
