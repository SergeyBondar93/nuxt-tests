/**
 * Delays briefly, then fetches a todo from jsonplaceholder for demo purposes.
 * Keeps useLazyAsyncData so it only runs when explicitly triggered.
 */
export const useAsyncGreeting = () => {
  return useLazyAsyncData('demo-greeting', async () => {
    await new Promise((resolve) => setTimeout(resolve, 600))

    const todo = await $fetch<{ id: number; title: string }>(
      `https://jsonplaceholder.typicode.com/todos/${Math.floor(Math.random() * 100) + 1}`
    )

    return {
      message: `Fetched todo #${todo.id}: ${todo.title}`
    }
  }, { 'immediate': false })
}

