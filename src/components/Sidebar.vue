<template>
  <a-layout-sider width="200" class="site-layout-background" style="display: flex; flex-direction: column">
    <div class="logo" />

    <!-- Bosh menyu -->
    <a-menu
      mode="inline"
      theme="dark"
      :selectedKeys="selectedKeys"
      @click="onClick"
      style="flex-grow: 1"
    >
      <a-menu-item key="/posts"><span>{{ t('posts') }}</span></a-menu-item>
      <a-menu-item key="/comments"><span>{{ t('comments') }}</span></a-menu-item>
      <a-menu-item key="/likes"><span>{{ t('likes') }}</span></a-menu-item>
    </a-menu>

    <!-- Logout tugmasi -->
    <div class="logout-section">
      <a-button type="primary" danger block @click="logout">{{ t('logout')}}</a-button>
    </div>
  </a-layout-sider>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth.pinia'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const selectedKeys = ref([route.path])

watch(
  () => route.path,
  (newPath) => {
    selectedKeys.value = [newPath]
  },
  { immediate: true }
)

function onClick(e) {
  selectedKeys.value = [e.key]
  router.push(e.key)
}

function logout() {
  auth.logout()
  router.push('/login')
}
</script>

<style scoped>
.logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.logout-section {
  padding: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}
</style>
