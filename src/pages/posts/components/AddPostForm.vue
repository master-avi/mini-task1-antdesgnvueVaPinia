<template>
  <a-form @submit.prevent="submitForm" layout="vertical">
    <a-form-item label="Title">
      <a-input v-model:value="title" required />
    </a-form-item>

    <a-form-item label="Body">
      <a-textarea v-model:value="body" required :rows="4" />
    </a-form-item>

    <a-button type="primary" html-type="submit">Add Post</a-button>
  </a-form>
</template>

<script setup>
import { ref } from 'vue'
import { usePostsStore } from '@/stores/posts.pinia'

const emit = defineEmits(['added'])

const postsStore = usePostsStore()
const title = ref('')
const body = ref('')

function submitForm() {
  postsStore.addPost({
    id: Date.now(),
    title: title.value,
    body: body.value,
    photoUrl: `https://picsum.photos/seed/userpost${Date.now()}/300/200`
  })

  title.value = ''
  body.value = ''
  emit('added') // закрыть модалку
}
</script>
