<template>
  <PageLoader>
    <div>
      <a-list :data-source="paginatedComments" item-layout="horizontal">
        <template #renderItem="{ item }">
          <a-list-item>
            <a-list-item-meta
              :title="`${item.name} (Post ID: ${item.postId || 'N/A'})`"
              :description="item.body"
            />
          </a-list-item>
        </template>
      </a-list>

      <a-pagination
        v-model:current="currentPage"
        :total="combinedComments.length"
        :page-size="pageSize"
        show-less-items
        @change="onPageChange"
      />
    </div>
  </PageLoader>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import PageLoader from '@/components/PageLoader.vue'

const comments = ref([])
const localComments = ref([])
const currentPage = ref(1)
const pageSize = 10

function getLocalComments() {
  const all = []
  for (let key in localStorage) {
    if (key.startsWith('comments_')) {
      const postId = parseInt(key.split('_')[1])
      try {
        const parsed = JSON.parse(localStorage.getItem(key))
        parsed.forEach(c => all.push({ ...c, postId }))
      } catch (e) {
        console.error(`Failed to parse ${key}:`, e)
      }
    }
  }
  return all
}

const combinedComments = computed(() => {
  return [...localComments.value, ...comments.value]
})


const paginatedComments = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return combinedComments.value.slice(start, end)
})

function onPageChange(page) {
  currentPage.value = page
}

// Yuklash
onMounted(async () => {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/comments')
    const apiComments = await res.json()
    comments.value = apiComments.slice(0, 50) // 50 tasi kifoya
    localComments.value = getLocalComments()
  } catch (err) {
    console.error('Error loading comments:', err)
  }
})
</script>

<style scoped>
</style>
