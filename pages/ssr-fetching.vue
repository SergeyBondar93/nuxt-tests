<template>
  <div class="page">
    <header class="header">
      <p class="eyebrow">SSR-only data</p>
      <h1>Server-rendered fetching</h1>
      <p class="lede">
        Эти примеры всегда выполняются на сервере при запросе страницы. Данные не
        пререндерятся в билде благодаря route rule.
      </p>
    </header>

    <section class="card">
      <div class="section-heading">
        <p class="eyebrow">useAsyncData</p>
        <h2>Серверные часы</h2>
      </div>
      <p>
        Запрос уходит на сервер при каждом SSR. Можно вручную перезапустить с
        сервера кнопкой ниже.
      </p>

      <div class="panel">
        <div class="row">
          <span class="label">Status</span>
          <code>{{ clockStatus }}</code>
        </div>
        <div class="row">
          <span class="label">Generated at</span>
          <code>{{ clockGeneratedAt ?? '—' }}</code>
        </div>
        <div class="row">
          <span class="label">Note</span>
          <code>{{ clockData?.note ?? '—' }}</code>
        </div>
      </div>

      <button type="button" :disabled="clockPending" @click="() => refreshClock()">
        {{ clockPending ? 'Refreshing…' : 'Re-fetch on server' }}
      </button>
    </section>

    <section class="card">
      <div class="section-heading">
        <p class="eyebrow">useFetch</p>
        <h2>Серверный прокси</h2>
      </div>
      <p>
        <code>useFetch</code> с <code>server: true</code> и <code>immediate: true</code>
        делает запрос на сервер в момент SSR.
      </p>

      <div class="panel">
        <div class="row">
          <span class="label">Status</span>
          <code>{{ todosStatus }}</code>
        </div>
        <div class="row">
          <span class="label">Count</span>
          <code>{{ todosData?.count ?? '—' }}</code>
        </div>
        <div class="row">
          <span class="label">Generated at</span>
          <code>{{ todosGeneratedAt ?? '—' }}</code>
        </div>
      </div>

      <ul class="todo-list">
        <li v-for="item in todosData?.items ?? []" :key="item.id">
          <span class="todo-id">#{{ item.id }}</span>
          <span class="todo-title">{{ item.title }}</span>
          <span class="todo-status" :data-done="item.completed">
            {{ item.completed ? 'done' : 'pending' }}
          </span>
        </li>
      </ul>

      <div class="actions">
        <button type="button" :disabled="todosPending" @click="() => refreshTodos()">
          {{ todosPending ? 'Refreshing…' : 'Re-fetch on server' }}
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
type ServerClockResponse = {
  generatedAt: string
  note: string
}

type TodosResponse = {
  generatedAt: string
  count: number
  items: Array<{
    id: number
    title: string
    completed: boolean
  }>
}

useSeoMeta({
  title: 'SSR data fetching',
  description: 'Server-only data fetching examples with Nuxt.'
})

const {
  data: clockData,
  pending: clockPending,
  refresh: refreshClock,
  status: clockStatus
} = await useAsyncData<ServerClockResponse>('ssr-clock', () => $fetch('/api/server-clock'), {
  server: true,
  // immediate true by default: выполняется на SSR при заходе на страницу
})

const clockGeneratedAt = computed(() => clockData.value?.generatedAt)

const {
  data: todosData,
  pending: todosPending,
  refresh: refreshTodos,
  status: todosStatus
} = useFetch<TodosResponse>('/api/data/placeholder/todos', {
  server: true,
  immediate: true
})

const todosGeneratedAt = computed(() => todosData.value?.generatedAt)
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
  gap: 0.25rem;
}

.panel {
  border: 1px dashed #cbd5e1;
  border-radius: 0.75rem;
  padding: 0.75rem;
  display: grid;
  gap: 0.5rem;
}

.row {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.label {
  min-width: 90px;
  font-weight: 600;
  color: #0f172a;
}

code {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 0.4rem;
  padding: 0.2rem 0.4rem;
  font-size: 0.9rem;
}

.todo-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.35rem;
}

.todo-list li {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 0.5rem;
  align-items: center;
  padding: 0.5rem 0.6rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.6rem;
}

.todo-id {
  font-weight: 700;
  color: #0f172a;
}

.todo-title {
  color: #334155;
}

.todo-status {
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.75rem;
  color: #475569;
}

.todo-status[data-done='true'] {
  color: #0f9f52;
}

.actions {
  display: flex;
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
</style>


