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
  routeRules: {
    // Пререндерим эту страницу на этапе сборки, остальное оставляем под SSR
    '/prerender-fetching': { prerender: true }
  }
})
