<template>
  <div v-if="post">
    <h1>{{ post.title }}</h1>
    <img :src="post.photoUrl" alt="Post image" />
    <p>{{ post.body }}</p>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { usePostsStore } from '@/stores/posts.pinia'

const route = useRoute()
const postsStore = usePostsStore()

const post = computed(() => {
  return postsStore.getPostById(Number(route.params.id))
})
</script>
