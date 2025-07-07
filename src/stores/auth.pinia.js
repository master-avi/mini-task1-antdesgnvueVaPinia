import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null
  }),
  actions: {
    login(username, password) {
      if (username === 'admin' && password === '1234') {
        this.user = { username }
        localStorage.setItem('user', JSON.stringify(this.user))
        return true
      }
      return false
    },
    logout() {
      this.user = null
      localStorage.removeItem('user')
    },
    isLoggedIn() {
      return !!this.user
    }
  }
})
