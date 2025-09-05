<template>
  <section>
    <!-- 説明ページ -->
    <div v-if="!started" class="intro">
      <h1>システム説明</h1>
      <p>
      <strong>
        このサイトでは、パソコンにデフォルトでついているWEBカメラを使い、動作を検知し、<br />設定したGmail宛に通知を送ります。<br />
        使い方は簡単です。<u>以下の手順で始めてください。</u>
      </strong>
      </p>
        <li>1. 以下のスタートボタンを押して次のページへ遷移</li>
        <li>2. カメラのアクセスを許可</li>
        <li>3. フォームで Gmail アドレスとアプリパスワードを入力して保存ボタンをクリック</li>
        <li>※<u><a href="https://myaccount.google.com/apppasswords">アプリパスワードの作成・管理</a></u></li>
        <li>4. 動きが検知されるとメールが届きます</li>
      <button @click="started = true" class="start-btn">スタート</button>
    </div>
    

    <PoseDetect v-else />
  </section>
</template>

<script setup>
import { ref } from 'vue'
import PoseDetect from './components/PoseDetect.vue'

const started = ref(false)
</script>

<style scoped>
.intro {
  list-style-type: none; 
  font-size: 1.5rem;
  text-align: left;
  padding: 40px;
  max-width: 800px;
  margin: auto;
}

.start-btn {
  padding: 12px 24px;
  margin-top: 20px;
  background-color: blue;
  color: white;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  right: 0;
}
.start-btn:hover {
  background-color: rgb(3, 3, 176);
}
</style>
