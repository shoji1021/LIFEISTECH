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
  </div>
</template>

<style scoped>
.home-container { padding-top: 80px; text-align: center; }
.hero { padding: 60px 20px; background-image: url(image/pc.jpg);  border-radius: 8px;}
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
.features {
  display: flex;
  justify-content: center;
  gap: 30px;
  padding: 50px 20px;
}
.feature-card1 {
  background-image: url(image/webcam.jpg);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  width: 300px;
  color: #ffffff;
}

.feature-card2 {
  background-image: url(image/mail.jpg);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  width: 300px;
  color: #ffffff;
}

.feature-card3 {
  background-image: url(image/sec.jpg);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  width: 300px;
  color: #ffffff;
}


</style>