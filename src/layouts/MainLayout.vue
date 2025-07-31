<template>
  <a-layout style="min-height:100vh">
    <Sidebar />
    <a-layout>
      <a-layout-header style="background:#fff;padding:0 16px; display:flex; align-items: center; justify-content: space-between; width: 100%;">
        <h2 style="margin:0">{{ t('dashboard')}}</h2>
      <LoginSwitcher />

        

      </a-layout-header>
      <a-layout-content style="margin:16px">
        <router-view />
      </a-layout-content>
      <a-layout-footer style="text-align:center">
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script setup>
import Sidebar from '@/components/Sidebar.vue'
import LoginSwitcher from '@/pages/posts/components/LanguageSwitcher.vue'

import { useI18n } from 'vue-i18n';

const { t } = useI18n()
</script>
