<template>
  <div id="app-layout">
    <Background v-if="!isAppPage" />
    <CyberObject v-if="!isAppPage" />
    
    <Navbar />
    
    <div class="content-wrapper">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'            // computed をインポート
import { useRoute } from 'vue-router'     // useRoute をインポート
import Navbar from './components/Navbar.vue'
import Background from './components/Background.vue'
import CyberObject from './components/CyberObject.vue'

// 現在のルート（URL）情報を取得するための設定
const route = useRoute()

// 「今いるページはアプリのページか？」を判定する計算式
// ※ router/index.ts で設定したパス（例: /app）に合わせてください
const isAppPage = computed(() => {
  return route.path === '/app' 
})
</script>