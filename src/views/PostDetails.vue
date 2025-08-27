<script setup>
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"
import api from "../utils/api"

const route = useRoute()
const post = ref(null)
const loading = ref(true)

onMounted(async () => {
  try {
    const res = await api.get(`/posts/${route.params.id}`)
    post.value = res.data
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="max-w-3xl mx-auto py-6">
    <div v-if="loading" class="text-gray-500">Loading...</div>
    <div v-else-if="post">
      <h1 class="text-3xl font-bold mb-4">{{ post.title }}</h1>

      <img
        v-if="post.image"
        :src="`http://127.0.0.1:8000/storage/${post.image}`"
        alt="Post image"
        class="w-full rounded mb-4"
      />

      <p class="text-gray-700 leading-relaxed">{{ post.short_description }}</p>
    </div>
    <div v-else class="text-red-500">Post not found</div>
  </div>
</template>
