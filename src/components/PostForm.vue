<script setup>
import { ref, watch } from "vue"
import { usePostStore } from "../stores/postStore"

const props = defineProps({
  modelValue: { type: Object, default: null },
  isEdit: { type: Boolean, default: false },
})

const emit = defineEmits(["submitted"])

const postStore = usePostStore()

// Form state
const form = ref({
  title: "",
  short_description: "",
  image: null,
})

const previewImage = ref(null)

// Watch modelValue changes to fill form in edit mode
watch(
  () => props.modelValue,
  (newVal) => {
    if (props.isEdit && newVal) {
      form.value.title = newVal.title || ""
      form.value.short_description = newVal.short_description || ""
      form.value.image = null
      previewImage.value = newVal.image
        ? `http://127.0.0.1:8000/storage/${newVal.image}`
        : null
    } else {
      form.value = { title: "", short_description: "", image: null }
      previewImage.value = null
    }
  },
  { immediate: true }
)

// Handle image selection
const handleFileChange = (e) => {
  form.value.image = e.target.files[0]
  if (form.value.image) previewImage.value = URL.createObjectURL(form.value.image)
}

// Handle submit
const handleSubmit = async () => {
  const data = new FormData()
  data.append("title", form.value.title)
  data.append("short_description", form.value.short_description)
  if (form.value.image) data.append("image", form.value.image)

  if (props.isEdit && props.modelValue?.id) {
    await postStore.updatePost(props.modelValue.id, data)
  } else {
    await postStore.createPost(data)
  }

  emit("submitted")
}
</script>

<template>
  <div class="max-w-lg mx-auto mt-6 border p-4 rounded shadow">
    <h1 class="text-2xl font-bold mb-4">
      {{ props.isEdit ? "Edit Post" : "Create Post" }}
    </h1>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="block font-medium">Title</label>
        <input v-model="form.title" type="text" class="border p-2 w-full" required />
      </div>

      <div>
        <label class="block font-medium">Short Description</label>
        <textarea v-model="form.short_description" class="border p-2 w-full" required></textarea>
      </div>

      <div>
        <label class="block font-medium">Image</label>
        <input type="file" @change="handleFileChange" />
      </div>

      <div v-if="previewImage" class="mt-2">
        <img :src="previewImage" alt="Image Preview" width="200" />
      </div>

      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
        {{ props.isEdit ? "Update Post" : "Create Post" }}
      </button>
    </form>
  </div>
</template>
