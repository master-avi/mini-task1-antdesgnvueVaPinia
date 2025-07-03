<template>
  <a-card
    hoverable
    class="post-card"
    @click="emit('openModal', post)"
  >
    <template #cover>
      <div class="image-wrapper">
        <a-skeleton-image v-if="loading" active />
        <transition name="fade-down">
          <img
            v-show="!loading"
            :src="post.photoUrl"
            :alt="post.title"
            @load="loading = false"
            class="post-img"
          />
        </transition>
        
      </div>
        <div class="content-section">
        <h3 class="post-title">{{ post.title }}</h3>
        <p class="post-description">{{ post.body }}</p>
      </div>
      
    </template>

    <div class="card-body">
    
      <div class="actions-section" @click.stop>
        <a-button type="text" @click.stop="toggleLike">
          <template #icon>
            <heart-filled v-if="isLiked" style="color: red" />
            <heart-outlined v-else />
          </template>
          {{ isLiked ? 'Liked' : 'Like' }}
        </a-button>

        <a-popconfirm
          title="Вы уверены, что хотите удалить пост?"
          @confirm="deletePost"
        >
          <a-button type="text" danger>
            <DeleteOutlined />
            Удалить
          </a-button>
        </a-popconfirm>
      </div>
    </div>
  </a-card>
</template>

<script setup>
import { HeartFilled, HeartOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import { useLikesStore } from '@/stores/likes.pinia'
import { usePostsStore } from '@/stores/posts.pinia'
import { computed, ref } from 'vue'

const emit = defineEmits(['openModal'])

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

const loading = ref(true)

const likesStore = useLikesStore()
const postsStore = usePostsStore()

const isLiked = computed(() => {
  return likesStore.isLiked(props.post)
})

function toggleLike() {
  likesStore.toggleLike(props.post)
}

function deletePost() {
  likesStore.removeLike?.(props.post) // optional chaining for compatibility
  postsStore.deletePost(props.post.id)
}
</script>

<style scoped>
.post-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

}

.card-body {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 16px;
  flex: 1;

}

.content-section {
  flex: 1;
  padding: 16px;
  min-height: 0; /* Важно для корректного сжатия */
}

.post-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-description {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 16px;
}

.actions-section {
  display: flex;
  justify-content: space-between;
  margin-top: auto; /* Ключевое свойство - прижимает к низу */
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
}

.image-wrapper {
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.post-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.fade-down-enter-active {
  transition: all 2s ease;
}
.fade-down-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

</style>