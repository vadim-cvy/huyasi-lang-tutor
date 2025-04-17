import PracticeView from '@/views/PracticeView.vue'
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
      component: () => import('../views/AddDictionaryItemView.vue'),
    },
    {
      path: '/dictionary',
      name: 'dictionary',
      component: () => import('../views/DictionaryView.vue'),
    }
  ],
})

export default router
