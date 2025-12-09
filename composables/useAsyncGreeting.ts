import { useLazyAsyncData } from 'nuxt/app'

/**
 * Simple async example that works on static hosting.
 * Delays for ~400ms, then returns a message.
 */
export const useAsyncGreeting = () => {
  return useLazyAsyncData('demo-greeting', async () => {
    await new Promise((resolve) => setTimeout(resolve, 400))
    return { message: 'Hello from a custom composable!' }
  })
}

