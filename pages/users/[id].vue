<template>
  <div class="page">
    <header class="header">
      <p class="eyebrow">Dynamic route</p>
      <h1>User {{ userId }}</h1>
      <p class="lede">
        Route parameters are available on both server and client. In a static
        deployment, Nuxt generates this page for each visited param at build
        time, and falls back to client-side routing for new params.
      </p>
    </header>

    <section class="card">
      <h2>Route data</h2>
      <RouteInfo />
    </section>

    <section class="card">
      <h2>CTA</h2>
      <div class="actions">
        <NuxtLink class="btn" to="/routing">Back to routing examples</NuxtLink>
        <NuxtLink class="btn ghost" to="/components">See composables</NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useSeoMeta } from 'nuxt/app'

const route = useRoute()
const userId = computed(() => route.params.id)

useSeoMeta({
  title: `User ${userId.value}`,
  description: 'Dynamic route example that works after static generation.'
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

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.btn {
  border: 1px solid #0f172a;
  background: #0f172a;
  color: white;
  border-radius: 0.75rem;
  padding: 0.6rem 1rem;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.1s ease, box-shadow 0.1s ease, background 0.2s ease;
}

.btn.ghost {
  background: white;
  color: #0f172a;
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.15);
}
</style>

