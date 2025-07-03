<template>
  <a-layout-sider width="200" class="site-layout-background">
    <div class="logo" />
    <a-menu
      mode="inline"
      theme="dark"
      :selectedKeys="selectedKeys"
      @click="onClick"
    >
      <a-menu-item key="/posts"><span>Posts</span></a-menu-item>
      <a-menu-item key="/comments"><span>Comments</span></a-menu-item>
      <a-menu-item key="/likes"><span>likes</span></a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, watch } from 'vue'

const route = useRoute()
const router = useRouter()
const selectedKeys = ref([route.path])

// Следим за изменениями маршрута
watch(
  () => route.path,
  (newPath) => {
    selectedKeys.value = [newPath]
  },
  { immediate: true } // Вызываем сразу при создании
)

function onClick(e) {
  selectedKeys.value = [e.key]
  router.push(e.key)
}
</script>

<style scoped>
.logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}
</style>