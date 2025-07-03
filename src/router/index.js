import { createRouter, createWebHistory } from 'vue-router'
import PostsPageView from '@/pages/PostsPageView.vue'
import CommentsPage from '@/pages/CommentsPage.vue'
import LikesPage from '../pages/LikesPage.vue'

const routes = [
  { path: '/', redirect: '/posts' },
  { path: '/posts', component: PostsPageView },
  { path: '/likes', component: LikesPage },
  {
  path: '/posts/:id',
  name: 'PostDetail',
  component: () => import('@/views/PostDetail.vue'),
  props: true
},
  { path: '/comments', component: CommentsPage }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
