<script setup>
import { ref } from "vue"
import api from "../utils/api"   // your axios instance

const form = ref({
    name: "",
    email: "",
    message: "",
})

const success = ref("")
const errors = ref({})

const handleSubmit = async () => {
    try {
        // const res = await api.post("/contact", form.value)
        const res = await api.post("/contacts", form.value) // ✅ correct
        success.value = res.data.message
        form.value = { name: "", email: "", message: "" }
        errors.value = {}
    } catch (err) {
        if (err.response?.status === 422) {
            errors.value = err.response.data.errors
        }
    }
}
</script>

<template>
    <div class="max-w-lg mx-auto mt-6">
        <h1 class="text-3xl font-bold mb-4">Contact Us</h1>

        <div v-if="success" class="bg-green-100 text-green-700 p-3 rounded mb-4">
            {{ success }}
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-4">
            <div>
                <label class="block font-medium">Name</label>
                <input v-model="form.name" type="text" class="border p-2 w-full" required />
                <p v-if="errors.name" class="text-red-500 text-sm">{{ errors.name[0] }}</p>
            </div>
            <div>
                <label class="block font-medium">Email</label>
                <input v-model="form.email" type="email" class="border p-2 w-full" required />
                <p v-if="errors.email" class="text-red-500 text-sm">{{ errors.email[0] }}</p>
            </div>
            <div>
                <label class="block font-medium">Message</label>
                <textarea v-model="form.message" class="border p-2 w-full" required></textarea>
                <p v-if="errors.message" class="text-red-500 text-sm">{{ errors.message[0] }}</p>
            </div>
            <button class="bg-blue-500 text-white px-4 py-2 rounded">Send</button>
        </form>
    </div>
</template>
