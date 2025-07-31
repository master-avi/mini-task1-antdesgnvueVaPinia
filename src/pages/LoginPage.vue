<template>
  <div class="login-wrapper">
    <!-- 🌐 Til tanlash -->
  
    <!-- 🔐 Login forma -->
    <a-card :title="$t('login')" style="max-width: 400px; width: 100%">
      <a-form @submit.prevent="handleLogin">
        <a-form-item :label="$t('username')">
          <a-input v-model:value="username" />
        </a-form-item>

        <a-form-item :label="$t('password')">
          <a-input-password v-model:value="password" />
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit" block>
            {{ $t('login') }}
          </a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import LoginSwitcher from '@/pages/posts/components/LanguageSwitcher.vue'
import { useAuthStore } from '@/stores/auth.pinia'
import { useI18n } from 'vue-i18n'

const username = ref('')
const password = ref('')
const router = useRouter()
const auth = useAuthStore()
const { t } = useI18n()

function handleLogin() {
  const success = auth.login(username.value, password.value)
  if (success) {
    router.push('/posts')
  } else {
    alert(t('login_failed'))
  }
}
</script>


<style scoped>
.login-wrapper {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f2f5;
}
.language-switcher {
  position: absolute;
  top: 20px;
  right: 20px;
}

</style>
