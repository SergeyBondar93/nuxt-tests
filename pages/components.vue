<template>
  <div class="page">
    <header class="header">
      <p class="eyebrow">Components & Composables</p>
      <h1>Auto-imported UI and reusable logic</h1>
      <p class="lede">
        This page uses auto-imported components and custom composables to share
        UI and state across routes.
      </p>
    </header>

    <CounterCard />
    <AsyncGreetingCard />

    <section class="card">
      <h2>Why composables?</h2>
      <ul>
        <li>Keep logic close to Nuxt features (e.g., `useState`, `useAsyncData`)</li>
        <li>Auto-imported by Nuxt when placed in <code>/composables</code></li>
        <li>Work in both SSR and static (generated) builds</li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useSeoMeta } from 'nuxt/app'

useSeoMeta({
  title: 'Components & Composables'
})
</script>

<style scoped>
.page {
  display: grid;
  gap: 1rem;
}

.header {
  background: white;
  border: 1px solid #cbd5e1;
  border-radius: 1rem;
  padding: 1.25rem;
  box-shadow: 0 10px 40px rgba(15, 23, 42, 0.08);
  display: grid;
  gap: 0.5rem;
}

.eyebrow {
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.75rem;
  color: #64748b;
  margin: 0;
}

.lede {
  margin: 0;
  color: #334155;
}

.card {
  background: white;
  border: 1px solid #cbd5e1;
  border-radius: 1rem;
  padding: 1.25rem;
  box-shadow: 0 10px 40px rgba(15, 23, 42, 0.08);
  display: grid;
  gap: 0.75rem;
}

ul {
  display: grid;
  gap: 0.35rem;
  padding-left: 1.1rem;
  margin: 0;
}

li {
  color: #0f172a;
}
</style>

