<template>
  <a-layout style="min-height:100vh">
    <Sidebar />
    <a-layout>
      <a-layout-header style="background:#fff;padding:0 16px">
        <h2 style="margin:0">My Dashboard</h2>
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
</script>
