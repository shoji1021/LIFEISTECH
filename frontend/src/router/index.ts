// src/router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// コンポーネントのインポート（まだ作成していない場合はコメントアウトしておいてください）
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Guide from '../views/Guide.vue'
import AppTool from '../views/AppTool.vue'

// ルートの定義に型をつける
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
    name: 'AppTool',
    component: AppTool
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router