import { defineEventHandler } from 'h3'

const quotes = [
  'Client-side fetches are great for user-triggered updates.',
  'Server data can hydrate the page; client data can react to input.',
  'Nuxt useFetch works on the client when server is set to false.',
  'Azure Static Web Apps runs these handlers as serverless functions.'
]

export default defineEventHandler(() => {
  const quote = quotes[Math.floor(Math.random() * quotes.length)]

  return {
    source: 'client-quote',
    quote,
    generatedAt: new Date().toISOString()
  }
})

