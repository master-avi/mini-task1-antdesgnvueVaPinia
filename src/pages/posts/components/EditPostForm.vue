<template>
  <a-form @submit.prevent="submitForm" layout="vertical">
    <a-form-item label="Title">
      <a-input v-model:value="form.title" required />
    </a-form-item>

    <a-form-item label="Body">
      <a-textarea v-model:value="form.body" required :rows="4" />
    </a-form-item>

    <a-form-item label="Photo URL">
      <a-input v-model:value="form.photoUrl" required />
    </a-form-item>

    <a-button type="primary" html-type="submit" block>Save Changes</a-button>
  </a-form>
</template>

<script setup>
import { ref } from 'vue'
import { usePostsStore } from '@/stores/posts.pinia'

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['updated'])

const postsStore = usePostsStore()

const form = ref({ ...props.post })

function submitForm() {
  postsStore.editPost({ ...form.value })
  emit('updated') // closes modal
}
</script>
