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

<style scoped>
  /* --- スマホ対応 (画面幅 768px 以下) --- */
@media (max-width: 768px) {
  /* ページ全体の余白を減らす */
  .page {
    padding: 20px 15px; /* 上下20px, 左右15px */
    width: auto; /* 幅を固定しない */
  }

  /* 見出しを少し小さく */
  h1 {
    font-size: 1.5rem;
  }

  /* ボタンを押しやすく大きく */
  .floating-btn {
    width: 90%; /* 画面いっぱい */
    left: 5%;
    right: 5%;
    bottom: 20px;
    text-align: center;
    padding: 15px;
  }
}
</style>