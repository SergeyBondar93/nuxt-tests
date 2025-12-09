<template>
  <article class="post-card">
    <p class="eyebrow">Post #{{ postId }}</p>
    <h3>{{ post?.title }}</h3>
    <p class="body" v-if="post">{{ post.body }}</p>
    <p class="error" v-else>Не удалось получить пост.</p>
  </article>
</template>

<script setup lang="ts">
type Post = {
  id: number
  userId: number
  title: string
  body: string
}

const props = withDefaults(defineProps<{ postId?: number }>(), {
  postId: 1
})

const { data: post } = await useFetch<Post>(
  `https://jsonplaceholder.typicode.com/posts/${props.postId}`
)
</script>

<style scoped>
.post-card {
  display: grid;
  gap: 0.4rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.8rem;
  background: #f8fafc;
  box-shadow: inset 0 1px 0 #fff;
}

.eyebrow {
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.75rem;
  color: #64748b;
  margin: 0;
}

h3 {
  margin: 0;
  font-size: 1.05rem;
  color: #0f172a;
}

.body {
  margin: 0;
  color: #334155;
  line-height: 1.5;
}

.error {
  margin: 0;
  color: #b91c1c;
  font-weight: 600;
}
</style>

