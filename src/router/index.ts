import PracticeView from '@/views/practice/Index.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'practice',
      component: PracticeView,
    },
    {
      path: '/add-dictionary-item',
      name: 'add-dictionary-item',
      component: () => import('../views/add-dictionary-item/Index.vue')
    },
    {
      path: '/dictionary',
      name: 'dictionary',
      component: () => import('../views/dictionary/Index.vue')
    },
    {
      path: '/onboarding',
      name: 'onboarding',
      component: () => import('../views/onboarding/Index.vue')
    }
  ],
})

export default router
