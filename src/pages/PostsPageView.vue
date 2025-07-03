<template>
  <div class="posts-wrapper">
    <!-- КНОПКА ДОБАВЛЕНИЯ -->
    <div class="top-bar">
      <a-button type="primary" @click="showAdd = true">
        <template #icon>
          <PlusOutlined />
        </template>
        Add
      </a-button>
    </div>

    <!-- МОДАЛ: ДОБАВИТЬ ПОСТ -->
    <a-modal v-model:open="showAdd" title="New Post" :footer="null">
      <AddPostForm @added="showAdd = false" />
    </a-modal>

    <!-- МОДАЛ: ПРОСМОТР ПОСТА -->
    <a-modal
      v-model:open="modalVisible"
      :title="selectedPost?.title"
      width="600"
      @cancel="closeModal"
    >
      <template #footer>
        <a-button @click="closeModal">Закрыть</a-button>
      </template>
      <p>{{ selectedPost?.body }}</p>
    </a-modal>

    <!-- СПИСОК ПОСТОВ -->
    <a-row :gutter="[16, 16]" class="posts">
      <a-col
        v-for="p in pagedPosts"
        :key="p.id"
        :xs="24"
        :sm="12"
        :md="8"
      >
        <PostCard :post="p" @openModal="openPostModal" />
      </a-col>
    </a-row>

    <!-- ПАГИНАЦИЯ -->
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
import { PlusOutlined } from '@ant-design/icons-vue'
import PostCard from './posts/components/PostCard.vue'
import AddPostForm from './posts/components/AddPostForm.vue'
import { usePostsStore } from '@/stores/posts.pinia'

const postsStore = usePostsStore()
const posts = computed(() => postsStore.posts)

const current = ref(1)
const showAdd = ref(false)

const modalVisible = ref(false)
const selectedPost = ref(null)

function openPostModal(post) {
  selectedPost.value = post
  modalVisible.value = true
}

function closeModal() {
  modalVisible.value = false
  selectedPost.value = null
}

const pagedPosts = computed(() => {
  const start = (current.value - 1) * 6
  return posts.value.slice(start, start + 6)
})

function onPageChange(page) {
  current.value = page
}

onMounted(postsStore.fetchPosts)
</script>

<style scoped>
.posts-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding: 16px;
  box-sizing: border-box;
}

.top-bar {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 12px;
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
