<template>
  <div class="posts-wrapper">
    <a-row :gutter="[16, 16]" class="posts">
      <a-col
        v-for="p in pagedPosts"
        :key="p.id"
        :xs="24"
        :sm="12"
        :md="8"
      >
        <PostCard :post="p" />
      </a-col>
    </a-row>

    <div class="pagination-wrapper">
      <a-pagination
        v-model:current="current"
        :page-size="6"
        :total="posts.length"
        :show-size-changer="false"
        @change="onPageChange"
        show-less-items
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import PostCard from '@/components/PostCard.vue'

const posts = ref([])
const current = ref(1)

async function fetch() {
  try {
    const resPosts = await axios.get('https://jsonplaceholder.typicode.com/posts')
    const postList = resPosts.data.slice(0, 100)

    posts.value = postList.map((post) => ({
      ...post,
      photoUrl: `https://picsum.photos/seed/cat${post.id}/300/200`
    }))
  } catch (e) {
    console.error('Xatolik yuz berdi:', e)
  }
}
const pagedPosts = computed(() => {
  const start = (current.value - 1) * 6
  return posts.value.slice(start, start + 6)
})

function onPageChange(page) {
  current.value = page
}

onMounted(fetch)
</script>

<style scoped>
.posts-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
  box-sizing: border-box;
}

.posts {
  flex-grow: 1;
  overflow: hidden;
}

.pagination-wrapper {
  text-align: center;
  margin-top: 12px;
}
</style>
