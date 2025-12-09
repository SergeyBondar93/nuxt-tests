// https://nuxt.com/docs/api/configuration/nuxt-config
declare const process: {
  env: Record<string, string | undefined>
}

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
      // Пререндер только страницу prerender fetching
      '/prerender-fetching': { prerender: true },
      // Остальное отдаем через SSR
      '/**': { prerender: false }
    }
  })
})
