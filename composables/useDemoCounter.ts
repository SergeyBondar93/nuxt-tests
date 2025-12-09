import { useState } from 'nuxt/app'

export const useDemoCounter = () => {
  const count = useState<number>('demo-counter', () => 0)

  const increment = () => {
    count.value += 1
  }

  const decrement = () => {
    count.value -= 1
  }

  const reset = () => {
    count.value = 0
  }

  return { count, increment, decrement, reset }
}

