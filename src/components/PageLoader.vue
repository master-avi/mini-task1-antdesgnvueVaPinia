<template>
  <div v-if="loading" class="loading-wrapper">
    <a-spin size="large" tip="Загрузка..." />
  </div>
  <div v-else>
    <slot />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const loading = ref(true)

onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 2000)
})
</script>

<style scoped>
.loading-wrapper {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
