import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useLikesStore = defineStore('likes', () => {
  const initialLikes = JSON.parse(localStorage.getItem('likedPosts')) || []
  const likedPosts = ref(initialLikes)

  watch(
    likedPosts,
    (newLikes) => {
      localStorage.setItem('likedPosts', JSON.stringify(newLikes))
    },
    { deep: true }
  )

  function toggleLike(post) {
    const index = likedPosts.value.findIndex(p => p.id === post.id)
    if (index === -1) {
      likedPosts.value.push(post)
    } else {
      likedPosts.value.splice(index, 1)
    }
  }

  function isLiked(post) {
    return likedPosts.value.some(p => p.id === post.id)
  }

  function removeLike(post) {
    likedPosts.value = likedPosts.value.filter(p => p.id !== post.id)
  }

  return {
    likedPosts,
    toggleLike,
    isLiked,
    removeLike
  }
})
