<script setup>
import { ref, onMounted } from "vue"
import { usePostStore } from "../stores/postStore"
import PostForm from "../components/PostForm.vue"

const postStore = usePostStore()
const showForm = ref(false)
const selectedPost = ref(null)

// Load posts on mount
onMounted(() => {
  postStore.fetchPosts()
})

// Open create form
const createPost = () => {
  selectedPost.value = null
  showForm.value = true
}

// Open edit form
const editPost = (post) => {
  selectedPost.value = post
  showForm.value = true
}

// Delete post
const deletePost = async (post) => {
  if (confirm("Are you sure to delete this post?")) {
    await postStore.deletePost(post.id)
  }
}

// After form submitted
const handleSubmitted = () => {
  showForm.value = false
  selectedPost.value = null
  postStore.fetchPosts()
}
</script>

<template>
  <div class="max-w-5xl mx-auto mt-6">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-3xl font-bold">Blog Posts</h1>
      <button @click="createPost" class="bg-green-500 text-white px-4 py-2 rounded">
        Create Post
      </button>
    </div>

    <!-- Post Form -->
    <PostForm
      v-if="showForm"
      :modelValue="selectedPost"
      :isEdit="!!selectedPost"
      @submitted="handleSubmitted"
    />

    <!-- Post List Table -->
    <table v-if="postStore.posts.length" class="min-w-full border border-gray-300 mt-6">
      <thead class="bg-gray-100">
        <tr>
          <th class="border p-2">#</th>
          <th class="border p-2">Title</th>
          <th class="border p-2">Description</th>
          <th class="border p-2">Image</th>
          <th class="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(post, index) in postStore.posts" :key="post.id">
          <td class="border p-2">{{ index + 1 }}</td>
          <td class="border p-2">{{ post.title }}</td>
          <td class="border p-2">{{ post.short_description }}</td>
          <td class="border p-2">
            <img
              v-if="post.image"
              :src="`http://127.0.0.1:8000/storage/${post.image}`"
              alt="Post Image"
              width="50"
            />
          </td>
          <td class="border p-2 flex gap-2">
            <button @click="editPost(post)" class="bg-blue-500 text-white px-3 py-1 rounded">
              Edit
            </button>
            <button @click="deletePost(post)" class="bg-red-500 text-white px-3 py-1 rounded">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-else class="mt-6 text-gray-500">No posts found.</div>
  </div>
</template>
