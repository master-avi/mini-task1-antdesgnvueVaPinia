<template>
  <a-card hoverable class="post-card">
    <template #cover>
      <img :src="post.photoUrl" :alt="post.title" />
    </template>
    <a-card-meta :title="post.title">
      <template #description>
        {{ post.body }}
      </template>
    </a-card-meta>
    <div class="post-actions">
      <a-button type="text" @click.stop="toggleLike">
        <template #icon>
          <heart-filled v-if="isLiked" style="color: red" />
          <heart-outlined v-else />
        </template>
        {{ isLiked ? 'Liked' : 'Like' }}
      </a-button>
    </div>
  </a-card>
</template>

<script setup>
import { HeartFilled, HeartOutlined } from '@ant-design/icons-vue'
import { useLikesStore } from '@/stores/likes'
import { computed } from 'vue'

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

const likesStore = useLikesStore()

const isLiked = computed(() => {
  return likesStore.isLiked(props.post)
})

function toggleLike() {
  likesStore.toggleLike(props.post)
}
</script>