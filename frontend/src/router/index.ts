// src/router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// コンポーネントのインポート
// ★重要: 実際のファイル名と合わせてください
import Home from '../views/Home.vue'
import About from '../views/About.vue' // まだ作ってないならコメントアウト
import Guide from '../views/Guide.vue' // まだ作ってないならコメントアウト
import AppMain from '../views/AppTool.vue' 

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/guide',
    name: 'Guide',
    component: Guide
  },
  {
    path: '/app',
    name: 'App', // ここも名前を統一
    component: AppMain
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router