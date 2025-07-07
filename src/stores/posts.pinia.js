import { defineStore } from 'pinia'

export const usePostsStore = defineStore('posts', {
  state: () => ({
    posts: JSON.parse(localStorage.getItem('posts')) || []
  }),
  actions: {
  async fetchPosts() {
    if (this.posts.length) return
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts')
      if (!res.ok) throw new Error('Ошибка загрузки постов')
      const data = await res.json()
      const list = data.slice(0, 100).map(post => ({
        ...post,
        photoUrl: `https://picsum.photos/seed/cat${post.id}/300/200`
      }))
      this.posts = list
    } catch (err) {
      console.error('Ошибка при fetchPosts:', err)
    }
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

  // 🔥 YANGI: EDIT POST ACTION
  editPost(updatedPost) {
    const index = this.posts.findIndex(p => p.id === updatedPost.id)
    if (index !== -1) {
      this.posts[index] = { ...this.posts[index], ...updatedPost }
      this.saveToLocal()
    }
  },

  saveToLocal() {
    localStorage.setItem('posts', JSON.stringify(this.posts))
  }
}

})
