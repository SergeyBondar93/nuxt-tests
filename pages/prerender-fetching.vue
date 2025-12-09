<template>
  <div class="page">
    <header class="header">
      <p class="eyebrow">Prerender fetching</p>
      <h1>Static HTML + client/server requests</h1>
      <p class="lede">
        Страница собирается как статика, но примеры ниже позволяют управлять тем,
        что выполняется на сервере и что запускается только в браузере.
      </p>
    </header>

    <section class="card">
      <div class="section-heading">
        <p class="eyebrow">Server-side</p>
        <h2>SSR via useAsyncData</h2>
      </div>
      <p>
        This call runs on the server during the initial render. It is cached into the
        HTML so the browser sees data immediately without an extra request.
      </p>

      <div class="panel">
        <div class="row">
          <span class="label">Status</span>
          <code>{{ serverStatus }}</code>
        </div>
        <div class="row">
          <span class="label">Generated at</span>
          <code>{{ serverGeneratedAt ?? '—' }}</code>
        </div>
        <div class="row">
          <span class="label">Note</span>
          <code>{{ serverData?.note ?? '—' }}</code>
        </div>
      </div>

      <button type="button" :disabled="serverPending" @click="() => refreshServer()">
        {{ serverPending ? 'Refreshing…' : 'Re-fetch on server' }}
      </button>
    </section>

    <section class="card">
      <div class="section-heading">
        <p class="eyebrow">Client-side</p>
        <h2>useFetch on the browser</h2>
      </div>
      <p>
        This request sets <code>server: false</code>, so it only runs in the browser.
        It is great for user-driven fetches that should not block HTML generation.
      </p>

      <div class="panel">
        <div class="row">
          <span class="label">Status</span>
          <code>{{ clientStatus }}</code>
        </div>
        <div class="row">
          <span class="label">Generated at</span>
          <code>{{ clientGeneratedAt ?? '—' }}</code>
        </div>
        <div class="row">
          <span class="label">Quote</span>
          <code>{{ clientData?.quote ?? 'Click fetch to load a quote' }}</code>
        </div>
      </div>

      <div class="actions">
        <button type="button" :disabled="clientPending" @click="() => fetchClient()">
          {{ clientPending ? 'Fetching…' : 'Fetch client-side quote' }}
        </button>
      </div>
    </section>

    <section class="card">
      <div class="section-heading">
        <p class="eyebrow">Server proxy</p>
        <h2>External API via server route</h2>
      </div>
      <p>
        The frontend calls a long nested API route (<code>/api/data/placeholder/todos</code>).
        That route fetches <code>jsonplaceholder</code> on the server and returns a trimmed list.
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
        <button type="button" :disabled="todosPending" @click="() => fetchTodos()">
          {{ todosPending ? 'Fetching…' : 'Fetch server-proxied todos' }}
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

type ClientQuoteResponse = {
  generatedAt: string
  quote: string
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
  title: 'Prerender fetching',
  description: 'Prerendered page with controllable server/client fetch examples.'
})

const {
  data: serverData,
  pending: serverPending,
  refresh: refreshServer,
  status: serverStatus,
} = await useAsyncData<ServerClockResponse>('server-clock', () => $fetch('/api/server-clock'), {
  server: true,
  immediate: true
})

const serverGeneratedAt = computed(() => serverData.value?.generatedAt)

const {
  data: clientData,
  pending: clientPending,
  refresh: fetchClient,
  status: clientStatus
} = useFetch<ClientQuoteResponse>('/api/client-quote', {
  server: false,
  immediate: false
})

const clientGeneratedAt = computed(() => clientData.value?.generatedAt)

const {
  data: todosData,
  pending: todosPending,
  refresh: fetchTodos,
  status: todosStatus
} = useFetch<TodosResponse>('/api/data/placeholder/todos', {
  server: false,
  immediate: false,
  default: () => ({
    generatedAt: '',
    count: 0,
    items: []
  })
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
  gap: 0.15rem;
}

.panel {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  padding: 0.75rem;
  display: grid;
  gap: 0.35rem;
}

.row {
  display: grid;
  grid-template-columns: 130px 1fr;
  gap: 0.35rem;
  align-items: center;
}

.label {
  font-weight: 600;
  color: #334155;
}

code {
  background: #e2e8f0;
  padding: 0.3rem 0.45rem;
  border-radius: 0.4rem;
  display: inline-block;
  word-break: break-word;
}

button {
  border: 1px solid #0f172a;
  background: #0f172a;
  color: white;
  border-radius: 0.75rem;
  padding: 0.6rem 1rem;
  font-weight: 700;
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

.actions {
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
}

.todo-list {
  list-style: none;
  display: grid;
  gap: 0.4rem;
  padding: 0;
  margin: 0;
}

.todo-list li {
  display: grid;
  grid-template-columns: 70px 1fr 90px;
  gap: 0.35rem;
  align-items: center;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 0.6rem;
  padding: 0.5rem 0.65rem;
}

.todo-id {
  font-weight: 700;
  color: #0f172a;
}

.todo-title {
  color: #0f172a;
}

.todo-status {
  justify-self: end;
  font-size: 0.9rem;
  color: #0f172a;
}

.todo-status[data-done='true'] {
  color: #0ea5e9;
}
</style>


