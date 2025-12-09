<template>
  <div class="page">
    <header class="header">
      <p class="eyebrow">Hybrid rendering</p>
      <h1>SSR shell, client-only data</h1>
      <p class="lede">
        Хедер и футер приходят из SSR, а данные ниже запрашиваются в браузере по
        клику с небольшой задержкой.
      </p>
    </header>

    <section class="card">
      <div class="section-heading">
        <p class="eyebrow">Client fetch</p>
        <h2>3 todos from jsonplaceholder</h2>
      </div>

      <p>Запрос идёт только на фронтенде. Добавлена искусственная задержка 0.5с.</p>

      <div class="actions">
        <button type="button" :disabled="pending" @click="() => refresh()">
          {{ pending ? 'Loading…' : 'Fetch todos' }}
        </button>
        <span class="status" :data-status="status">{{ status }}</span>
      </div>

      <div class="list" v-if="pending">
        <div class="skeleton" v-for="n in 3" :key="n">
          <div class="bar short"></div>
          <div class="bar long"></div>
        </div>
      </div>

      <ul class="list" v-else-if="todos?.length">
        <li v-for="todo in todos" :key="todo.id">
          <span class="id">#{{ todo.id }}</span>
          <span class="title">{{ todo.title }}</span>
          <span class="state" :data-done="todo.completed">
            {{ todo.completed ? 'done' : 'pending' }}
          </span>
        </li>
      </ul>

      <p v-else class="muted">Нет данных. Нажмите кнопку, чтобы загрузить.</p>
    </section>
  </div>
</template>

<script setup lang="ts">
type Todo = {
  id: number
  title: string
  completed: boolean
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

useSeoMeta({
  title: 'Hybrid rendering',
  description: 'SSR shell with client-only fetching and skeleton loading.'
})

const {
  data: todos,
  pending,
  refresh,
  status
} = useFetch<Todo[]>('https://jsonplaceholder.typicode.com/todos?_limit=3', {
  server: false,
  immediate: true,
  async onRequest() {
    await delay(1500)
  }
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

.actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
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

button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.15);
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.status {
  font-family: monospace;
  color: #334155;
  padding: 0.2rem 0.4rem;
  border-radius: 0.5rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
}

.list {
  display: grid;
  gap: 0.5rem;
}

.list li {
  display: grid;
  grid-template-columns: 60px 1fr auto;
  gap: 0.5rem;
  align-items: center;
  padding: 0.6rem 0.8rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.6rem;
  background: #f8fafc;
}

.id {
  font-weight: 700;
  color: #0f172a;
}

.title {
  color: #334155;
}

.state {
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.8rem;
  color: #475569;
}

.state[data-done='true'] {
  color: #0f9f52;
}

.muted {
  color: #64748b;
}

.skeleton {
  padding: 0.6rem 0.8rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.6rem;
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


