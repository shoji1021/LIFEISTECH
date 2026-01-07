<template>
  <footer class="site-footer">
    <div class="footer-content">
      <p class="copyright">&copy; 2025 SHØJI. All Rights Reserved.</p>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.site-footer {
  /* --- 横幅の制限解除（前回と同じ） --- */
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  
  /* --- ★下の隙間埋め（ここを追加！） --- */
  /* 親の余白(padding)が仮に50pxあっても、それを超えて下へ塗り広げます */
  margin-bottom: -50px;  /* コンテンツの境界線を100px下にずらす */
  padding-bottom: 20px;  /* 元の余白(20px) + 埋め合わせ分(100px) */

  /* --- デザイン設定 --- */
  padding-top: 20px;      /* 上の余白はそのまま */
  background-color: #0f172a;
  color: #94a3b8;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.8rem;
  z-index: 10;
  margin-top: auto;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* 下に大きく余白をとったので、中身が上に行き過ぎないよう調整が必要ならここで行いますが、
     今回は「隙間を背景色で埋める」目的なのでこのままでOKです */
}

.copyright {
  margin: 0;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  letter-spacing: 1px;
}
</style>