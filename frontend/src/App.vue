<template>
  <div id="app-layout">
    <Background v-if="!isAppPage" />
    <CyberObject v-if="!isAppPage" />
    
    <Navbar class="navbar-layer" />
    
    <div class="content-wrapper">
      <router-view />
    </div>

    <Footer v-if="!isAppPage" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Background from './components/Background.vue'
import CyberObject from './components/CyberObject.vue'
import Footer from './components/Footer.vue'

const route = useRoute()

const isAppPage = computed(() => {
  return route.path === '/app' 
})
</script>

<style>
/* 1. ページ全体の初期化 */
body {
  margin: 0 !important;      /* 画面端の隙間を完全削除 */
  padding: 0 !important;
  width: 100%;
  background-color: #000;
  color: #f1f5f9;
  font-family: "Helvetica Neue", Arial, sans-serif;
  overflow-x: hidden;
}

/* 2. マトリックスを手前に表示（前回修正した部分） */
.matrix-canvas {
  z-index: 0 !important; 
}

/* 3. アプリ全体のレイアウト（フッター押し下げの肝） */
#app-layout {
  min-height: 100vh;      /* 画面の高さいっぱいを使う */
  display: flex;          /* フレックスボックス */
  flex-direction: column; /* 縦並び */
  width: 100%;            /* 横幅いっぱい */
}

/* 4. コンテンツエリア */
.content-wrapper {
  flex: 1;                /* ★余ったスペースを全て埋める＝フッターが下にいく */
  width: 100%;
  position: relative;
  z-index: 1;             /* マトリックスより手前 */
}

/* 5. ナビバー */
.navbar-layer {
  position: relative;
  z-index: 10;
}

/* スマホ対応 */
@media (max-width: 768px) {
  .page { padding: 20px 15px; width: auto; }
  h1 { font-size: 1.5rem; }
  .floating-btn { width: 90%; left: 5%; right: 5%; bottom: 20px; text-align: center; padding: 15px; }
}
</style>