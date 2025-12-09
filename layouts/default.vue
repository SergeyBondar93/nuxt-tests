<template>
  <div class="layout">
    <header class="header">
      <NuxtLink class="brand" to="/">Nuxt Exploration</NuxtLink>
      <nav class="nav">
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/routing">Routing</NuxtLink>
        <NuxtLink to="/components">Components</NuxtLink>
        <NuxtLink :to="`/users/${sampleUserId}`">Dynamic User</NuxtLink>
      </nav>
    </header>

    <main class="content">
      <slot />
    </main>

    <footer class="footer">
      <RouteInfo />
    </footer>
  </div>
</template>

<script setup lang="ts">
const sampleUserId = 42
</script>

<style scoped>
.layout {
  min-height: 100vh;
  background: radial-gradient(circle at 20% 20%, #e2e8f0 0, #e2e8f0 30%, #f8fafc 60%);
  color: #0f172a;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #cbd5e1;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  position: sticky;
  top: 0;
  z-index: 10;
}

.brand {
  font-weight: 700;
  font-size: 1.1rem;
  text-decoration: none;
  color: #0f172a;
}

.nav {
  display: grid;
  grid-auto-flow: column;
  gap: 0.75rem;
}

.nav a {
  text-decoration: none;
  color: #0f172a;
  padding: 0.45rem 0.7rem;
  border-radius: 999px;
  font-size: 0.95rem;
  border: 1px solid transparent;
  transition: all 0.2s ease;
}

.nav a:hover,
.nav a.router-link-active {
  border-color: #0f172a;
  background: #0f172a;
  color: white;
}

.content {
  flex: 1;
  width: min(1100px, 100%);
  margin: 0 auto;
  padding: 2rem 1.5rem 3rem;
  display: grid;
  gap: 1.5rem;
}

.footer {
  padding: 1rem 1.5rem 1.75rem;
  border-top: 1px solid #cbd5e1;
  background: #f8fafc;
}
</style>

