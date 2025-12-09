import { defineEventHandler } from 'h3'

export default defineEventHandler(() => {
  return {
    source: 'server-clock',
    generatedAt: new Date().toISOString(),
    note: 'Fetched on the server during SSR with useAsyncData.'
  }
})

