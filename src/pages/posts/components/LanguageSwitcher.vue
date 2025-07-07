<template>
  <div style="padding: 8px; text-align: center">
    <a-select v-model:value="locale" @change="changeLang" style="width: 120px">
      <a-select-option value="uz">Uzbek</a-select-option>
      <a-select-option value="ru">Русский</a-select-option>
      <a-select-option value="en">English</a-select-option>
    </a-select>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'

const { locale } = useI18n({ useScope: 'global' })
const changeLang = (val) => {
  locale.value = val
  localStorage.setItem('lang', val)
}

locale.value = localStorage.getItem('lang') || 'uz'
</script>
