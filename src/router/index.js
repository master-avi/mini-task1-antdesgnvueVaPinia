import { createRouter, createWebHistory } from 'vue-router'
import PostsPage from '@/pages/PostsPage.vue'
import CommentsPage from '@/pages/CommentsPage.vue'
import LikesPage from '../pages/LikesPage.vue'

const routes = [
  { path: '/', redirect: '/posts' },
  { path: '/posts', component: PostsPage },
  { path: '/likes', component: LikesPage },
  { path: '/comments', component: CommentsPage }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
