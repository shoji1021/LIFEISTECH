<template>
  <div class="page-content">
    <h1>なぜこのサービスを作ったのか</h1>
    <p class="story-text">
      私はよくカフェで作業をしています。しかし、一人で作業していると困るのが「トイレ離席問題」です。<br>
      パソコンを置いていくのは怖い、でも荷物を全部片付けるのは面倒...。<br>
      「この数分の間に、誰かがPCに近づいたらどうしよう？」
    </p>
    <p class="story-text">
      そんな不安を技術で解決するために、この監視システムを開発しました。<br>
      あなたのPCについているカメラが、あなたの代わりに目になります。
    </p>
    </div>
</template>

<style scoped>
h1 {
    color: rgba(155, 255, 130, 0.821);
    /* タイトルも中央揃えにしたい場合は以下を追加 */
    text-align: center;
}

.page-content {
    /* ★変更点1: 幅を制限する (例: 800px) */
    max-width: 800px;
    width: 100%; /* スマホなど狭い画面では幅いっぱいに合わせる */

    /* ★変更点2: 左右の余白を自動(auto)にして中央寄せにする */
    margin: 150px auto;

    /* 元のスタイル */
    padding: 80px 30px;
    line-height: 1.8;
    background-image: url(/image/pc.jpg);
    /* 背景画像を綺麗に表示するための追加設定（推奨） */
    background-size: cover;
    background-position: center;
    
    color: #ffffff;
    border-radius: 8px;
    
    /* パディングを含めた幅計算にする（レイアウト崩れ防止） */
    box-sizing: border-box; 
}
</style>