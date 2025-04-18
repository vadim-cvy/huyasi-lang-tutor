import PracticeView from '@/views/practice/Index.vue'
import { useRouter, type RouteRecordRaw } from 'vue-router'

export class RouterUtils
{
  private static readonly viewDirNames = [
    'home',
    'practice',
    'add-dictionary-item',
    'dictionary',
    'onboarding',
    'settings'
  ] as const

  public static get routes() : RouteRecordRaw[]
  {
    return this.viewDirNames.map( viewDirName => ({
      name: viewDirName,
      path: '/' + ( viewDirName === 'home' ? '' : viewDirName ),
      component: () => import( `../views/${viewDirName}/Index.vue` )
    }))
  }

  public static push( viewDirName: typeof this.viewDirNames[number] )
  {
    useRouter().push( viewDirName )
  }
}