<template>
  <div class="guide-container">
    <h1>使い方ガイド</h1>
    <div class="steps">
      <div class="step-item">
        <h3>STEP 1: 準備</h3>
        <p>
          このアプリはGmailを使用して通知を送ります。<br>
          事前にGoogleアカウントの設定で<strong>「アプリパスワード」</strong>を取得してください。<br>
          <a href="https://myaccount.google.com/apppasswords" target="_blank" rel="noopener">
            👉 アプリパスワードの作成はこちら
          </a>
        </p>
      </div>

      <div class="step-item">
        <h3>STEP 2: カメラ許可</h3>
        <p>
          「アプリを起動」ページに移動すると、ブラウザがカメラの使用許可を求めてきます。<br>
          <strong>「許可」</strong>を選択してください。
        </p>
      </div>

      <div class="step-item">
        <h3>STEP 3: 設定と開始</h3>
        <p>
          画面上のフォームに「Gmailアドレス」と「アプリパスワード」を入力し、<br>
          <strong>「設定」ボタン</strong>を押してください。<br>
          これで監視モードが有効になります。
        </p>
      </div>
    </div>
    
    <div class="action-area">
      <router-link to="/app" class="btn-primary">アプリを起動する</router-link>
    </div>
  </div>
</template>

<style scoped>
.guide-container {
  padding: 100px 20px;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.steps {
  margin-top: 40px;
  text-align: left;
}

.step-item {
  background: #f4f4f4;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.step-item h3 {
  margin-top: 0;
  color: #42b983;
}

.action-area {
  margin-top: 40px;
}

.btn-primary {
  background-color: #42b983;
  color: white;
  padding: 15px 30px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
}

.steps p {
    color: #555;
}
</style>