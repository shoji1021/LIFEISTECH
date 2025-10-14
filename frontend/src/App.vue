<template>
  <section>
    <!-- ステップページ -->
    <div v-if="step === 1" class="page">
      <h1>サイト作成の経緯</h1>
      <p><strong>
        このサイトは、個人や家庭での簡単なセキュリティ向上のために作りました。<br />
        私はよくカフェで作業をしています。<br>そんな時に一人になりパソコンを置いてトイレに行くタイミングがありました。<br>そんな時に「この間にパソコンに何かがあったら怖いな」と思い、<br>もしパソコンの周辺で変な動きがあってもわかるように、<br>WEBカメラで動きを検知し、メールで通知する仕組みを作りました。<br />
      </strong></p>
    </div>

    <div v-else-if="step === 2" class="page">
      <h1>システム説明</h1>
      <p><strong>
        このサイトでは、パソコンにデフォルトでついているWEBカメラを使い、動作を検知し、<br />設定したGmail宛に通知を送ります。<br />使い方は簡単です。<u>以下の手順で始めてください。</u>
      </strong></p>
      <li>1. 右下の青いスタートボタンを押して次のページへ遷移</li>
      <li>2. カメラのアクセスを許可</li>
      <li>3. フォームで Gmail アドレスとアプリパスワードを入力して保存ボタンをクリック</li>
      <li>※<u><a href="https://myaccount.google.com/apppasswords" target="_blank">アプリパスワードの作成・管理</a></u></li>
      <li>4. 動きが検知されるとメールが届きます</li>
    </div>

    <div v-else-if="step === 3" class="page">
      <PoseDetect />
    </div>

    <div v-else-if="step === 4" class="page">
      <h1>セキュリティへの思い</h1>
      <p><strong>
        このサイトを通じて、気づかない間に降りかかる身の回りの危険やセキュリティに普段から気を使うことの大切さを感じてほしいと思っています。<br />
        また、小さな工夫で、大きな安心につながります。<br>
        ぜひ、あなたの大切な人にもこのサイトを紹介してください。<br />
        みんなで安全な社会を作っていきましょう！<br />
      </strong></p>
    </div>

    <!-- 右下固定ボタン with アニメーション -->
    <transition name="slide-fade">
      <button
        v-if="step <= 4"
        @click="step < 4 ? nextStep() : reset()"
        class="floating-btn right-btn"
      >
        {{ step < 4 ? '次へ' : '最初に戻る' }}
      </button>
    </transition>

    <!-- 左下固定ボタン with アニメーション（前のページに戻る） -->
    <transition name="slide-fade">
      <button
        v-if="step > 1"
        @click="prevStep()"
        class="floating-btn left-btn"
      >
        戻る
      </button>
    </transition>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import PoseDetect from './components/PoseDetect.vue'

const step = ref(1)

const nextStep = () => step.value++
const prevStep = () => step.value--
const reset = () => step.value = 1
</script>

<style scoped>
.page {
  font-size: 1.2rem;
  text-align: left;
  padding: 40px;
  max-width: 800px;
  margin: auto;
}

.floating-btn {
  position: fixed;
  bottom: 50px;
  padding: 12px 24px;
  background-color: blue;
  color: white;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  z-index: 1000;
}

.right-btn {
  right: 15%;
}

.left-btn {
  left: 15%;
}

/* アニメーション設定 */
.slide-fade-enter-active {
  transition: all 0.4s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from {
  transform: translateY(50px);
  opacity: 0;
}
.slide-fade-enter-to {
  transform: translateY(0);
  opacity: 1;
}
.slide-fade-leave-from {
  transform: translateY(0);
  opacity: 1;
}
.slide-fade-leave-to {
  transform: translateY(50px);
  opacity: 0;
}

li {
  list-style-type: none;
}
</style>
