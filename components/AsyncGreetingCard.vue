<template>
  <section class="card">
    <header>
      <p class="eyebrow">Composable + useLazyAsyncData</p>
      <h2>Deferred greeting</h2>
    </header>

    <p>
      This example uses a custom composable that wraps <code>useLazyAsyncData</code>
      to simulate fetching data after a short delay. It is safe for static
      hosting because it does not require a server endpoint.
    </p>

    <div class="body">
      <button type="button" :disabled="loading" @click="() => execute()">
        {{ loading ? 'Loading…' : 'Trigger fetch' }}
      </button>
      <p v-if="data?.message" class="message">“{{ data.message }}”</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useAsyncGreeting } from '../composables/useAsyncGreeting'

const { data, pending: loading, execute } = useAsyncGreeting()
</script>

<style scoped>
.card {
  background: white;
  border: 1px solid #cbd5e1;
  border-radius: 1rem;
  padding: 1.25rem;
  box-shadow: 0 10px 40px rgba(15, 23, 42, 0.08);
  display: grid;
  gap: 0.75rem;
}

.eyebrow {
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.75rem;
  color: #64748b;
  margin: 0;
}

h2 {
  margin: 0.1rem 0 0;
  font-size: 1.2rem;
}

p {
  margin: 0;
  color: #334155;
}

.body {
  display: grid;
  gap: 0.5rem;
}

button {
  border: 1px solid #0f172a;
  background: #0f172a;
  color: white;
  border-radius: 0.75rem;
  padding: 0.6rem 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.1s ease, box-shadow 0.1s ease, background 0.2s ease;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.15);
}

.message {
  font-weight: 600;
  color: #0f172a;
}
</style>

