<template>
  <div class="page">
    <header class="header">
      <p class="eyebrow">Server components</p>
      <h1>Пример server-only компонента в Nuxt</h1>
      <p class="lede">
        Карточки ниже рендерятся на сервере (файл <code>.server.vue</code>) и присылают только
        HTML без клиентского JS.
      </p>
    </header>

    <section class="card">
      <div class="section-heading">
        <p class="eyebrow">JSONPlaceholder</p>
        <h2>Три поста, отрендеренные на сервере</h2>
      </div>
      <p class="muted">
        Каждая карточка — это <code>ServerPostCard.server.vue</code> c запросом к
        <code>jsonplaceholder.typicode.com</code>. Никакой гидратации на клиенте нет.
      </p>

      <div class="grid">
        <ServerPostCard v-for="id in postIds" :key="id" :post-id="id" />
      </div>

      <p class="note">
        Подсказка: откройте devtools → Elements и убедитесь, что внутри карточек нет
        следов клиентского бандла или <code>data-v-app</code>.
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
const postIds = [1, 2, 3]

useSeoMeta({
  title: 'Server-only components example',
  description: 'Demo of Nuxt .server.vue components fetching JSONPlaceholder posts.'
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

.section-heading {
  display: grid;
  gap: 0.2rem;
}

.muted {
  margin: 0;
  color: #64748b;
}

.grid {
  display: grid;
  gap: 0.75rem;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.note {
  margin: 0;
  color: #475569;
  background: #f1f5f9;
  border: 1px dashed #cbd5e1;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
}
</style>

