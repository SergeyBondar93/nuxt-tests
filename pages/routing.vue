<template>
  <div class="page">
    <header class="header">
      <p class="eyebrow">Routing & Pages</p>
      <h1>Link-based and programmatic navigation</h1>
      <p class="lede">
        Demonstrates Nuxt file-system routing, dynamic params, and navigation
        helpers that work both locally and after a static deployment.
      </p>
    </header>

    <section class="card">
      <h2>NuxtLink examples</h2>
      <ul>
        <li><NuxtLink to="/">Home (static route)</NuxtLink></li>
        <li><NuxtLink to="/components">Components & composables</NuxtLink></li>
        <li>
          <NuxtLink :to="{ name: 'users-id', params: { id: '99' }, query: { from: 'routing-page' } }">
            Dynamic route with params and query
          </NuxtLink>
        </li>
      </ul>
    </section>

    <section class="card">
      <h2>Programmatic navigation</h2>
      <p>
        Triggered via <code>useRouter().push</code>; useful for redirects,
        wizards, or button-driven flows.
      </p>
      <div class="actions">
        <button class="btn" type="button" @click="goToUser('15')">
          Go to user 15
        </button>
        <button class="btn ghost" type="button" @click="goToUser('25', true)">
          Replace to user 25 (no history)
        </button>
      </div>
    </section>

    <section class="card">
      <h2>Current route context</h2>
      <p>Useful to debug params/query when testing in Azure Static Web Apps.</p>
      <RouteInfo />
    </section>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useSeoMeta } from 'nuxt/app'

useSeoMeta({
  title: 'Routing'
})

const router = useRouter()

const goToUser = (id: string, replace = false) => {
  const navigation = {
    name: 'users-id',
    params: { id },
    query: { source: 'programmatic' }
  } as const

  return replace ? router.replace(navigation) : router.push(navigation)
}
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

