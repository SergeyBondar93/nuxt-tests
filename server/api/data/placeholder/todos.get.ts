import { defineEventHandler, createError } from 'h3'

type Todo = {
  id: number
  title: string
  completed: boolean
}

export default defineEventHandler(async () => {
  try {
    const todos = await $fetch<Todo[]>('https://jsonplaceholder.typicode.com/todos?_limit=5')

    return {
      source: 'placeholder-todos',
      generatedAt: new Date().toISOString(),
      count: todos.length,
      items: todos.map((todo) => ({
        id: todo.id,
        title: todo.title,
        completed: todo.completed
      }))
    }
  } catch (error) {
    throw createError({
      statusCode: 502,
      statusMessage: 'Upstream fetch failed',
      data: { message: 'Could not fetch todos from jsonplaceholder', error }
    })
  }
})

