import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue"
import About from "../views/About.vue"
import Blog from "../views/Blog.vue"
import Contact from "../views/Contact.vue"
import PostDetails from "../views/PostDetails.vue"

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/about", name: "About", component: About },
  { path: "/blog", name: "Blog", component: Blog },
  { path: "/contact", name: "Contact", component: Contact },  
  { path: "/posts/:id", name: "PostDetails", component: PostDetails, props: true },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router



