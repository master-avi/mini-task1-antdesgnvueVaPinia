import { createRouter, createWebHistory } from 'vue-router'
import PostsPageView from '@/pages/PostsPageView.vue'
import CommentsPage from '@/pages/CommentsPage.vue'
import LikesPage from '@/pages/LikesPage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import { useAuthStore } from '@/stores/auth.pinia'

const routes = [
  { path: '/', redirect: '/posts' },
  { path: '/login', component: LoginPage },
  { path: '/posts', component: PostsPageView },
  { path: '/likes', component: LikesPage },
  { path: '/comments', component: CommentsPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 🚧 Navigation Guard — login tekshiradi
router.beforeEach((to, from, next) => {
  const publicPages = ['/login']
  const authRequired = !publicPages.includes(to.path)

  const auth = useAuthStore()

  if (authRequired && !auth.isLoggedIn()) {
    alert('Please login first.')
    return next('/login')
  }

  // Agar /login ga kirmoqchi lekin allaqachon login bo‘lsa — redirect
  if (to.path === '/login' && auth.isLoggedIn()) {
    return next('/posts')
  }

  next()
})

export default router
