<template>
  <div class="page">
    <section class="hero">
      <p class="eyebrow">Azure Static Web Apps ready</p>
      <h1>Nuxt routing, pages, components, and composables</h1>
      <p class="lede">
        Explore client-side routing, dynamic params, auto-imported components,
        and shared state. Everything here works with `nuxt generate`, so it can
        be deployed to Azure Static Web Apps.
      </p>
      <div class="actions">
        <NuxtLink class="btn" to="/routing">See routing examples</NuxtLink>
        <NuxtLink class="btn ghost" to="/components">
          Components & composables
        </NuxtLink>
        <NuxtLink class="btn ghost" to="/data-fetching">
          Data fetching examples
        </NuxtLink>
        <button class="btn link" type="button" @click="goToDynamic">
          Programmatic navigation → user 7
        </button>
      </div>
    </section>

    <div class="grid">
      <CounterCard />
      <AsyncGreetingCard />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useSeoMeta } from 'nuxt/app'

useSeoMeta({
  title: 'Home'
})

const router = useRouter()
const goToDynamic = () => {
  router.push({ name: 'users-id', params: { id: '7' }, query: { ref: 'hero' } })
}
</script>

<style scoped>
.page {
  display: grid;
  gap: 1.5rem;
}

.hero {
  background: #0f172a;
  color: white;
  border-radius: 1.25rem;
  padding: 1.5rem;
  display: grid;
  gap: 0.75rem;
  box-shadow: 0 15px 40px rgba(15, 23, 42, 0.4);
}

.eyebrow {
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.75rem;
  color: #94a3b8;
  margin: 0;
}

h1 {
  margin: 0;
  font-size: clamp(1.8rem, 4vw, 2.4rem);
}

.lede {
  margin: 0;
  color: #cbd5e1;
  max-width: 65ch;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 0.5rem;
}

.btn {
  border: 1px solid transparent;
  background: white;
  color: #0f172a;
  padding: 0.65rem 1rem;
  border-radius: 0.85rem;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.1s ease, box-shadow 0.1s ease, background 0.2s ease;
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
}

.btn.ghost {
  background: transparent;
  border-color: #cbd5e1;
  color: #e2e8f0;
}

.btn.link {
  background: transparent;
  color: #c7d2fe;
  border-color: transparent;
  padding-left: 0;
}

.grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}
</style>

