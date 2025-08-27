<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />  <!-- your existing navbar -->
    <main class="flex-1">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from "./components/Navbar.vue"
import Footer from "./components/Footer.vue"
</script>

