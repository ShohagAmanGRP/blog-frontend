import { defineStore } from "pinia"
import api from "../utils/api"

export const usePostStore = defineStore("post", {
  state: () => ({
    posts: [],
    loading: false,
    selectedPost: null,
  }),

  actions: {
    async fetchPosts() {
      this.loading = true
      try {
        const res = await api.get("/posts")
        this.posts = res.data
      } finally {
        this.loading = false
      }
    },

    async fetchPost(id) {
      this.loading = true
      try {
        const res = await api.get(`/posts/${id}`)
        this.selectedPost = res.data
      } finally {
        this.loading = false
      }
    },

    async createPost(formData) {
      const res = await api.post("/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      this.posts.push(res.data)
      return res.data
    },

    async updatePost(id, formData) {
      const res = await api.post(`/posts/${id}?_method=PUT`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      const index = this.posts.findIndex((p) => p.id === id)
      if (index !== -1) this.posts[index] = res.data
      this.selectedPost = res.data
      return res.data
    },

    async deletePost(id) {
      await api.delete(`/posts/${id}`)
      this.posts = this.posts.filter((p) => p.id !== id)
      if (this.selectedPost?.id === id) this.selectedPost = null
    },
  },
})
