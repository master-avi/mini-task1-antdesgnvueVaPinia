<template>
  <div>
    <a-list :data-source="paginatedComments" item-layout="horizontal">
      <template #renderItem="{ item }">
        <a-list-item>
          <a-list-item-meta :title="item.name" :description="item.body" />
        </a-list-item>
      </template>
    </a-list>

    <!-- Siz yuborgan pagination aynan shu -->
    <a-pagination
      v-model:current="currentPage"
      :total="comments.length"
      :page-size="pageSize"
      show-less-items
      @change="onPageChange"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const comments = ref([])
const currentPage = ref(1)
const pageSize = 10 //  10 ta 

const paginatedComments = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return comments.value.slice(start, end)
})

function onPageChange(page) {
  currentPage.value = page
}

onMounted(async () => {
  try {
    const res = await axios.get('https://jsonplaceholder.typicode.com/comments')
    comments.value = res.data.slice(0, 50) // poka wto
  } catch (err) {
    console.error('Error loading comments:', err)
  }
})
</script>
