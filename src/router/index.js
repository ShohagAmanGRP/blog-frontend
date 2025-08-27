import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue"
import PostForm from "../components/PostForm.vue"

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/posts/create", name: "PostCreate", component: PostForm },
  { path: "/posts/edit/:id", name: "PostEdit", component: PostForm, props: true },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router


