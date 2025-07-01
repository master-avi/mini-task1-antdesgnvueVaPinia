<template>
  <div class="liked-posts-wrapper">
    <h2>Liked Posts ({{ likedPosts.length }})</h2>
    
    <a-alert
      v-if="loading"
      message="Loading your liked posts..."
      type="info"
      show-icon
      class="loading-alert"
    />
    
    <a-row :gutter="[16, 16]" class="posts" v-else>
      <a-col
        v-for="p in likedPosts"
        :key="p.id"
        :xs="24"
        :sm="12"
        :md="8"
      >
        <PostCard :post="p" />
      </a-col>
    </a-row>

    <a-empty
      v-if="!loading && likedPosts.length === 0"
      description="You haven't liked any posts yet"
      class="empty-state"
    >
      <template #image>
        <heart-outlined style="font-size: 48px; color: #ff4d4f;" />
      </template>
      <a-button type="primary" @click="$router.push('/')">
        Browse Posts
      </a-button>
    </a-empty>
  </div>
</template>

<script setup>
import PostCard from '@/components/PostCard.vue'
import { useLikesStore } from '@/stores/likes'
import { storeToRefs } from 'pinia'
import { HeartOutlined } from '@ant-design/icons-vue'
import { ref, onMounted } from 'vue'

const likesStore = useLikesStore()
const { likedPosts } = storeToRefs(likesStore)
const loading = ref(true)

onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 500)
})
</script>

<style scoped>
.liked-posts-wrapper {
  padding: 16px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
}

.loading-alert {
  margin-bottom: 24px;
}
</style>