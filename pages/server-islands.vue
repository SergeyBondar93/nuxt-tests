<template>
  <div class="page">
    <header class="header">
      <p class="eyebrow">Server islands</p>
      <h1>Часть страницы SSR, часть приезжает отдельным HTML</h1>
      <p class="lede">
        Хедер и футер рендерятся обычным SSR. Карточки ниже — серверный компонент внутри
        <code>&lt;NuxtIsland&gt;</code>, который подтягивается отдельным запросом.
      </p>
    </header>

    <section class="card">
      <div class="section-heading">
        <p class="eyebrow">JSONPlaceholder</p>
        <h2>Три серверных карточки как islands</h2>
      </div>
      <p class="muted">
        На первой отрисовке карточки пустые. Браузер запрашивает island, сервер рендерит
        <code>ServerPostCard.server.vue</code> и возвращает готовый HTML, который вставляется в DOM.
      </p>

      <div class="grid">
        <NuxtIsland
          v-for="id in postIds"
          :key="id"
          name="ServerPostCard"
          :props="{ postId: id }"
        >
          <template #fallback>
            <div class="skeleton">
              <div class="bar short"></div>
              <div class="bar long"></div>
              <div class="bar long"></div>
            </div>
          </template>
        </NuxtIsland>
      </div>

      <p class="note">
        В DevTools → Network увидите запрос к маршруту island и ответ с HTML карточки. На клиент
        не приезжает JS-гидратация для самой карточки.
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
const postIds = [1, 2, 3]

useSeoMeta({
  title: 'Server islands example',
  description: 'SSR shell with NuxtIsland server-rendered cards.'
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

.skeleton {
  padding: 0.9rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.8rem;
  background: linear-gradient(90deg, #f8fafc 25%, #e9eef5 37%, #f8fafc 63%);
  background-size: 400% 100%;
  animation: shimmer 1.4s ease infinite;
  display: grid;
  gap: 0.35rem;
}

.bar {
  height: 10px;
  border-radius: 999px;
  background: #cbd5e1;
  opacity: 0.8;
}

.bar.short {
  width: 30%;
}

.bar.long {
  width: 70%;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>

