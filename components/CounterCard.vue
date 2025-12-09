<template>
  <section class="card">
    <header>
      <p class="eyebrow">Composable + useState</p>
      <h2>Shared counter</h2>
    </header>

    <p>
      This counter uses a composable (`useDemoCounter`) with `useState`, so the
      value is shared across pages during the session.
    </p>

    <div class="counter">
      <button type="button" @click="decrement">-1</button>
      <strong>{{ count }}</strong>
      <button type="button" @click="increment">+1</button>
    </div>

    <button class="reset" type="button" @click="reset">
      Reset shared state
    </button>
  </section>
</template>

<script setup lang="ts">
import { useDemoCounter } from '../composables/useDemoCounter'

const { count, increment, decrement, reset } = useDemoCounter()
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

.counter {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, auto));
  gap: 0.75rem;
  align-items: center;
  justify-content: start;
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

button:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.15);
}

button:active {
  transform: translateY(0);
  box-shadow: none;
}

strong {
  font-size: 1.4rem;
  text-align: center;
}

.reset {
  width: fit-content;
  background: white;
  color: #0f172a;
}
</style>

