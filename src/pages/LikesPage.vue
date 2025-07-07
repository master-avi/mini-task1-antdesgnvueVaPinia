<template>
  <PageLoader>
    <div class="liked-posts-wrapper">
      <!-- 🔒 LOGIN TEKSHIRISH -->
      <a-alert
        v-if="!auth.isLoggedIn()"
        message="Iltimos, yoqtirgan postlaringizni ko‘rish uchun login qiling."
        type="warning"
        show-icon
        class="loading-alert"
      />

      <!-- LOGIN BO‘LGAN HOLATDA -->
      <template v-else>
        <h2>Liked Posts ({{ likedPosts.length }})</h2>

        <a-alert
          v-if="loading"
          message="Liked postlar yuklanmoqda..."
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
            <PostCard :post="p" :showActions="false" @openModal="openPostModal" />
          </a-col>
        </a-row>

        <a-empty
          v-if="!loading && likedPosts.length === 0"
          description="Hali hech qanday postni yoqtirmagansiz."
          class="empty-state"
        >
          <template #image>
            <heart-outlined style="font-size: 48px; color: #ff4d4f;" />
          </template>
          <a-button type="primary" @click="$router.push('/posts')">
            Browse Posts
          </a-button>
        </a-empty>

        <!-- MODAL: POST DETAILS -->
        <a-modal
          v-model:open="modalVisible"
          :title="selectedPost?.title"
          width="600"
          @cancel="closeModal"
        >
          <template #footer>
            <a-button @click="closeModal">Yopish</a-button>
          </template>

          <div class="post-content">
            <img
              :src="selectedPost?.photoUrl"
              :alt="selectedPost?.title"
              class="post-image"
            />
            <p>{{ selectedPost?.body }}</p>
          </div>

          <a-divider>Izohlar</a-divider>

          <div class="comment-form">
            <a-input
              v-model:value="newComment"
              placeholder="Izoh yozing..."
              @pressEnter="addComment"
            />
            <a-button type="primary" @click="addComment">Yuborish</a-button>
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
      </template>
    </div>
  </PageLoader>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useLikesStore } from '@/stores/likes.pinia'
import { useAuthStore } from '@/stores/auth.pinia'
import { storeToRefs } from 'pinia'
import { HeartOutlined } from '@ant-design/icons-vue'
import PageLoader from '@/components/PageLoader.vue'
import PostCard from './posts/components/PostCard.vue'

const auth = useAuthStore()
const likesStore = useLikesStore()
const { likedPosts } = storeToRefs(likesStore)

const loading = ref(true)
const modalVisible = ref(false)
const selectedPost = ref(null)

const comments = ref([])
const userComments = ref([])
const loadingComments = ref(false)
const newComment = ref('')

const allComments = computed(() => {
  return [...userComments.value, ...comments.value]
})

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

function addComment() {
  if (!newComment.value.trim() || !selectedPost.value) return

  const comment = {
    id: Date.now(),
    name: 'Siz',
    body: newComment.value.trim(),
    email: 'siz@example.com'
  }

  userComments.value.push(comment)
  saveUserComments(selectedPost.value.id)
  newComment.value = ''
}

async function fetchComments(postId) {
  loadingComments.value = true
  comments.value = []

  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
    if (!res.ok) throw new Error('Izohlar yuklanmadi')
    comments.value = await res.json()
  } catch (e) {
    console.error('Error fetching comments:', e)
  } finally {
    loadingComments.value = false
  }
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

.post-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.post-image {
  width: 100%;
  max-height: 300px;
  object-fit: contain;
  border-radius: 8px;
}

.comment-form {
  display: flex;
  gap: 8px;
  margin: 16px 0;
}
</style>
