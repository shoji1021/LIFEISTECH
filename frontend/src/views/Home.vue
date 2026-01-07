<template>
  <div class="home-container">
    <section class="hero">
      <h1>カフェでの離席、もう不安にならない。</h1>
      <p>Webカメラがあなたの代わりにPCを見守ります。<br>不審な動きを検知して、即座にメールで通知。</p>
      <router-link to="/app" class="cta-button">今すぐ監視を始める</router-link>
    </section>
    
    <section class="features">
      <div class="feature-card1">
        <h3>📹 リアルタイム検知</h3>
        <p>AIが人の動きを正確に認識します。</p>
      </div>
      <div class="feature-card2">
        <h3>📧 即時メール通知</h3>
        <p>異常があればすぐにあなたのスマホへ。</p>
      </div>
      <div class="feature-card3">
        <h3>🔒 プライバシー保護</h3>
        <p>映像はサーバーに保存されません。</p>
      </div>
    </section>

    <section class="download-section">
      <div class="download-box">
        <h2>デスクトップ版アプリ (Windows)</h2>
        <p>ブラウザを開かずに監視を行いたい方は、<br>ダウンロード後即実行可能なデスクトップ版をご利用ください。</p>
        
        <a href="https://github.com/shoji1021/SENDMAIL/releases/download/Ver0.1/sendmail.exe" class="download-btn">
          <span class="icon">⬇</span> Windows版 (EXE) をダウンロード
        </a>
        <p class="specs">※ Windows 10 / 11 対応</p>
      </div>
    </section>
    </div>
</template>

<style scoped>
.home-container { padding-top: 80px; text-align: center; }

/* ヒーローセクション */
.hero { padding: 60px 20px; background-image: url(image/pc.jpg); border-radius: 8px;}
.hero h1 { font-size: 2.5rem; margin-bottom: 20px; color: rgba(155, 255, 130, 0.821); }
.hero p { font-size: 1.2rem; margin-bottom: 30px; color: #ffffff; }
.cta-button {
  display: inline-block;
  background-color: #42b983;
  color: white;
  padding: 15px 30px;
  font-size: 1.2rem;
  border-radius: 8px;
  text-decoration: none;
  margin-top: 20px;
}

/* 機能紹介セクション */
.features {
  display: flex;
  justify-content: center;
  gap: 30px;
  padding: 50px 20px;
  flex-wrap: wrap; /* スマホで縦並びになるように追加 */
}

/* カード共通設定 */
.feature-card1, .feature-card2, .feature-card3 {
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  width: 300px;
  color: white;
  -webkit-text-stroke: 1px #F8F8F8;
  text-shadow: 0px 1px 4px #23430C;
  background-size: cover; /* 画像が切れないように調整 */
  background-position: center;
}

.feature-card1 { background-image: url(image/webcam.jpg); }
.feature-card2 { background-image: url(image/mail.jpg); }
.feature-card3 { background-image: url(image/sec.jpg); }

/* ▼▼▼ 追加したダウンロードセクションのスタイル ▼▼▼ */
.download-section {
  padding: 40px 20px 80px; /* 下に余裕を持たせる */
  display: flex;
  justify-content: center;
}

.download-box {
  background: rgba(0, 20, 40, 0.8); /* 少し透けた暗い背景 */
  border: 1px solid #42b983;         /* テーマカラーの枠線 */
  border-radius: 12px;
  padding: 40px;
  max-width: 800px;
  width: 100%;
  color: #fff;
  box-shadow: 0 0 15px rgba(66, 185, 131, 0.3); /* 光るエフェクト */
}

.download-box h2 {
  font-size: 1.8rem;
  margin-bottom: 15px;
  color: #fff;
}

.download-box p {
  margin-bottom: 25px;
  line-height: 1.6;
  color: #ccc;
}

.download-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: transparent;
  border: 2px solid #42b983;
  color: #42b983;
  padding: 15px 40px;
  font-size: 1.1rem;
  font-weight: bold;
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.download-btn:hover {
  background-color: #42b983;
  color: #fff;
  box-shadow: 0 0 20px rgba(66, 185, 131, 0.6);
  transform: translateY(-2px);
}

.specs {
  margin-top: 15px !important; /* 上書き用 */
  font-size: 0.85rem;
  color: #888 !important;
  margin-bottom: 0 !important;
}
</style>