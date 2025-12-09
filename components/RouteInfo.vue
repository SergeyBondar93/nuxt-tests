<template>
  <div class="route">
    <div class="row">
      <span class="label">Path</span>
      <code>{{ route.path }}</code>
    </div>
    <div class="row">
      <span class="label">Params</span>
      <code>{{ displayable(route.params) }}</code>
    </div>
    <div class="row">
      <span class="label">Query</span>
      <code>{{ displayable(route.query) }}</code>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const displayable = (value: Record<string, unknown>) => {
  const hasKeys = Object.keys(value || {}).length > 0
  return hasKeys ? JSON.stringify(value) : '—'
}
</script>

<style scoped>
.route {
  display: grid;
  gap: 0.35rem;
  font-size: 0.95rem;
  color: #0f172a;
}

.row {
  display: grid;
  grid-template-columns: 110px 1fr;
  align-items: center;
  gap: 0.5rem;
}

.label {
  font-weight: 600;
  color: #334155;
}

code {
  background: #e2e8f0;
  padding: 0.35rem 0.5rem;
  border-radius: 0.4rem;
  display: inline-block;
  word-break: break-all;
}
</style>

