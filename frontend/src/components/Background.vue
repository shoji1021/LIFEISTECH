<template>
  <canvas ref="canvas" class="matrix-canvas"></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvas = ref(null)
let ctx = null
let animationFrameId = null

// マトリックスの設定
const fontSize = 16
const columns = ref(0)
const drops = ref([]) // 各列の「現在の文字のY位置」を管理
// 半角カナや数字、英字を混ぜて雰囲気を出します
const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'

const initMatrix = () => {
  if (!canvas.value) return
  
  const el = canvas.value
  el.width = window.innerWidth
  el.height = window.innerHeight
  
  ctx = el.getContext('2d')
  
  // 列数を計算
  columns.value = Math.floor(el.width / fontSize)
  
  // すべての列の初期Y位置を0（最上部）より少しランダムにずらして設定
  drops.value = []
  for (let i = 0; i < columns.value; i++) {
    drops.value[i] = Math.random() * -100 // 最初から画面全体にバラつかせるなら 1、上から降らせるなら負の値
  }
}

const draw = () => {
  if (!ctx || !canvas.value) return

  // 背景を完全に塗りつぶさず、半透明の黒を重ねることで「残像（トレーリング）」を作る
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
  ctx.fillRect(0, 0, canvas.value.width, canvas.value.height)

  ctx.fillStyle = '#0F0' // マトリックスグリーン
  ctx.font = `${fontSize}px monospace`

  for (let i = 0; i < drops.value.length; i++) {
    // ランダムな文字を選択
    const text = chars.charAt(Math.floor(Math.random() * chars.length))
    
    // 文字を描画
    // x座標 = 列インデックス * フォントサイズ
    // y座標 = 現在のドロップ数 * フォントサイズ
    const x = i * fontSize
    const y = drops.value[i] * fontSize
    
    // たまに文字を白く光らせる演出（任意）
    if (Math.random() > 0.98) {
        ctx.fillStyle = '#FFF'
        ctx.fillText(text, x, y)
        ctx.fillStyle = '#0F0'
    } else {
        ctx.fillText(text, x, y)
    }

    // 画面下端を超えたら、ランダムなタイミングで一番上に戻す
    if (y > canvas.value.height && Math.random() > 0.975) {
      drops.value[i] = 0
    }

    // Y位置を進める
    drops.value[i]++
  }

  animationFrameId = requestAnimationFrame(draw)
}

const handleResize = () => {
  initMatrix()
}

onMounted(() => {
  initMatrix()
  draw()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId)
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.matrix-canvas {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1; /* 最背面に配置 */
  background-color: black;
}


</style>