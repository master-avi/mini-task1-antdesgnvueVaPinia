<template>
  <PageLoader>
    <div class="posts-wrapper">

      <a-alert
        v-if="!auth.isLoggedIn()"
        message="Iltimos, postlarni ko‘rish uchun login qiling."
        type="warning"
        show-icon
        style="margin-bottom: 16px"
      />
      <template v-else>
        <div class="top-bar">
          <LanguageSwitcher />
          <a-button type="primary" @click="showAdd = true">
            <template #icon>
              <PlusOutlined />
            </template>
            {{ $t('add') }}
          </a-button>
        </div>
        <a-modal v-model:open="showAdd" title="New Post" :footer="null">
          <AddPostForm @added="showAdd = false" />
        </a-modal>
        <a-modal
          v-model:open="modalVisible"
          :title="selectedPost?.title"
          width="600"
          @cancel="closeModal"
        >
          <template #footer>
            <a-button @click="closeModal">Close</a-button>
          </template>

          <div class="post-modal-content">
            <div class="modal-image-wrapper">
              <img
                :src="selectedPost?.photoUrl"
                :alt="selectedPost?.title"
                class="post-modal-image"
              />
            </div>
            <p>{{ selectedPost?.body }}</p>
          </div>

          <a-divider>Comments</a-divider>
          <div class="comment-form">
            <a-input
              v-model:value="newComment"
              placeholder="Add a comment..."
              @pressEnter="addComment"
            />
            <a-button type="primary" @click="addComment">Post</a-button>
          </div>
          <a-spin :spinning="loadingComments">
            <a-comment
              v-for="comment in allComments"
              :key="comment.id"
              :author="comment.name"
              :content="comment.body"
            >
              <template #avatar>
                <a-avatar :src="`https://i.pravatar.cc/40?u=${comment.email}`" />
              </template>
            </a-comment>
          </a-spin>
        </a-modal>
        <a-modal
          v-model:open="editVisible"
          title="Edit Post"
          :footer="null"
          @cancel="closeEditModal"
        >
          <EditPostForm :post="selectedPost" @updated="closeEditModal" />
        </a-modal>
        <a-row :gutter="[16, 16]" class="posts">
          <a-col
            v-for="p in pagedPosts"
            :key="p.id"
            :xs="24"
            :sm="12"
            :md="8"
          >
            <PostCard :post="p" @openModal="openPostModal" @edit="openEditModal" />
          </a-col>
        </a-row>

        <!-- PAGINATION -->
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
      </template>
    </div>
  </PageLoader>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth.pinia' // Auth store
import { PlusOutlined } from '@ant-design/icons-vue'
import PostCard from './posts/components/PostCard.vue'
import AddPostForm from './posts/components/AddPostForm.vue'
import EditPostForm from './posts/components/EditPostForm.vue'
import { usePostsStore } from '@/stores/posts.pinia'
import PageLoader from '@/components/PageLoader.vue'
import LanguageSwitcher from '@/pages/posts/components/LanguageSwitcher.vue'

const auth = useAuthStore() // Login holatini tekshirish

const postsStore = usePostsStore()
const posts = computed(() => postsStore.posts)

const route = useRoute()
const current = ref(1)
const showAdd = ref(false)
const modalVisible = ref(false)
const editVisible = ref(false)
const selectedPost = ref(null)

const comments = ref([])           // API dan kelgan commentlar
const userComments = ref([])       // Local user commentlar
const loadingComments = ref(false)
const newComment = ref('')         // Yangi comment inputi

// Barcha kommentlar: user + api
const allComments = computed(() => {
  return [...userComments.value, ...comments.value]
})

// localStorage key generator
function getStorageKey(postId) {
  return `comments_${postId}`
}

function loadUserComments(postId) {
  const saved = localStorage.getItem(getStorageKey(postId))
  userComments.value = saved ? JSON.parse(saved) : []
}

function saveUserComments(postId) {
  localStorage.setItem(getStorageKey(postId), JSON.stringify(userComments.value))
}

// COMMENT qo‘shish
function addComment() {
  if (!newComment.value.trim() || !selectedPost.value) return

  const comment = {
    id: Date.now(),
    name: 'You',
    body: newComment.value.trim(),
    email: 'you@example.com'
  }

  userComments.value.push(comment)
  saveUserComments(selectedPost.value.id)
  newComment.value = ''
}

function openPostModal(post) {
  selectedPost.value = post
  modalVisible.value = true
  fetchComments(post.id)
  loadUserComments(post.id)
}

function closeModal() {
  modalVisible.value = false
  selectedPost.value = null
  comments.value = []
  userComments.value = []
  newComment.value = ''
}

function openEditModal(post) {
  selectedPost.value = post
  editVisible.value = true
}

function closeEditModal() {
  editVisible.value = false
}

async function fetchComments(postId) {
  loadingComments.value = true
  comments.value = []
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
    if (!res.ok) throw new Error('Failed to load comments')
    comments.value = await res.json()
  } catch (e) {
    console.error('Error fetching comments:', e)
  } finally {
    loadingComments.value = false
  }
}

const pagedPosts = computed(() => {
  const start = (current.value - 1) * 6
  return posts.value.slice(start, start + 6)
})

function onPageChange(page) {
  current.value = page
}

onMounted(() => {
  postsStore.fetchPosts().then(() => {
    try {
      const postId = parseInt(route.params?.id, 10)
      if (!isNaN(postId)) {
        const post = postsStore.posts.find(p => p.id === postId)
        if (post) {
          openPostModal(post)
        }
      }
    } catch (e) {
      console.error("Error reading post ID:", e)
    }
  })
})
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

.post-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.post-image {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 8px;
}

.comment-form {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  margin-top: 16px;
}

.modal-image-wrapper {
  width: 100%;
  max-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f0f2f5;
  margin-bottom: 16px;
  overflow: hidden;
  border-radius: 8px;
}

.post-modal-image {
  max-width: 100%;
  max-height: 400px;
  object-fit: contain;
  display: block;
}
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
</style>
