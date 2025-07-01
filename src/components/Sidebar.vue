<template>
  <a-layout-sider width="200" class="site-layout-background">
    <div class="logo" />
    <a-menu
      mode="inline"
      theme="dark"
      :selectedKeys="[selectedKey]"
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
import { ref } from 'vue'
const route = useRoute(), router = useRouter()
const selectedKey = ref(route.path)

function onClick(e) {
  selectedKey.value = e.key
  router.push(e.key)
}
</script>

<style scoped>
.logo {
  height: 32px;
  margin: 16px;
  background: #1890ff;
}
</style>
