<template>
    <footer class="bg-gray-800 text-white py-4 mt-10">
        <div class="max-w-6xl mx-auto flex justify-between items-center">
            <p>&copy; {{ new Date().getFullYear() }} My Blog. All rights reserved.</p>
            <div class="space-x-4">
                <RouterLink to="/" class="hover:text-gray-300">Home</RouterLink>
                <RouterLink to="/about" class="hover:text-gray-300">About</RouterLink>
                <RouterLink to="/blog" class="hover:text-gray-300">Blog</RouterLink>
                <RouterLink to="/contact" class="hover:text-gray-300">Contact</RouterLink>
            </div>
        </div>
    </footer>
</template>
