import { createRouter, createWebHistory } from 'vue-router'
import { RouterUtils } from './RouterUtils'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: RouterUtils.routes,
})

export default router