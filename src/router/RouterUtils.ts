import PracticeView from '@/views/practice/Index.vue'
import { useRouter, type RouteRecordRaw } from 'vue-router'

export class RouterUtils
{
  public static readonly routes = [
    {
      name: 'practice',
      path: '/',
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
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/settings/Index.vue')
    },
    {
      path: '/onboarding',
      name: 'onboarding',
      component: () => import('../views/onboarding/Index.vue')
    }
  ] as const

  public static push( routeName: typeof this.routes[number]['name'] ) : void
  {
    useRouter().push( { name: routeName } )
  }
}