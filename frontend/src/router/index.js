import { createRouter, createWebHistory } from 'vue-router'

// コンポーネントのインポート
// ※ 注意: 実際にこの場所にファイルがないとエラーになります
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Guide from '../views/Guide.vue'
import AppTool from '../views/AppTool.vue'

const routes = [
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