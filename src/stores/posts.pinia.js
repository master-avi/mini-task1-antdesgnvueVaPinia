import { defineStore } from 'pinia'
import axios from 'axios'

export const usePostsStore = defineStore('posts', {
  state: () => ({
    posts: JSON.parse(localStorage.getItem('posts')) || []
  }),
  actions: {
    async fetchPosts() {
      if (this.posts.length) return // не загружаем заново, если есть в localStorage

      const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
      const list = res.data.slice(0, 100).map(post => ({
        ...post,
        photoUrl: `https://picsum.photos/seed/cat${post.id}/300/200`
      }))
      this.posts = list
    },
    addPost(newPost) {
      this.posts.unshift(newPost)
      this.saveToLocal()
    },
    deletePost(id) {
      this.posts = this.posts.filter(p => p.id !== id)
      this.saveToLocal()
    },
    getPostById(id) {
      return this.posts.find(p => p.id === id)
    },
    saveToLocal() {
      localStorage.setItem('posts', JSON.stringify(this.posts))
    }
  }
})
