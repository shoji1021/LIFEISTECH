<template>
  <div class="scene-container">
    <div class="scene">
      <div class="cube" :style="cubeStyle">
        <div class="face front"></div>
        <div class="face back"></div>
        <div class="face right"></div>
        <div class="face left"></div>
        <div class="face top"></div>
        <div class="face bottom"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const mouseX = ref(0)
const mouseY = ref(0)
const velocity = ref(0)
let lastMouseX = 0
let lastMouseY = 0
let animationId = null

// マウスイベント処理
const handleMouseMove = (e) => {
  const currentX = e.clientX
  const currentY = e.clientY

  // 画面中心からの距離（回転用）
  mouseX.value = (currentX - window.innerWidth / 2)
  mouseY.value = (currentY - window.innerHeight / 2)

  // マウスの移動速度（激しさ用）
  const deltaX = Math.abs(currentX - lastMouseX)
  const deltaY = Math.abs(currentY - lastMouseY)
  velocity.value = deltaX + deltaY

  lastMouseX = currentX
  lastMouseY = currentY
}

// アニメーションループ
const updateLoop = () => {
  // 速度の減衰
  velocity.value *= 0.9
  if (velocity.value < 0.1) velocity.value = 0
  animationId = requestAnimationFrame(updateLoop)
}

// スタイルの動的計算
const cubeStyle = computed(() => {
  // 基本回転
  const rotateY = mouseX.value / 10 // 感度調整
  const rotateX = -(mouseY.value / 10)

  // 激しい動き（シェイク）
  let shakeX = 0
  let shakeY = 0
  let scale = 1

  if (velocity.value > 50) {
    shakeX = (Math.random() - 0.5) * velocity.value * 0.2
    shakeY = (Math.random() - 0.5) * velocity.value * 0.2
    scale = 1.1
  }

  return {
    transform: `
      rotateX(${rotateX}deg) 
      rotateY(${rotateY}deg) 
      translate3d(${shakeX}px, ${shakeY}px, 0)
      scale(${scale})
    `,
    // 激しく動くと赤、普段は水色（大人っぽい色に変更）
    borderColor: velocity.value > 50 ? '#ff0055' : '#38bdf8',
    boxShadow: velocity.value > 50 ? '0 0 20px #ff0055' : '0 0 10px rgba(56, 189, 248, 0.5)'
  }
})

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
  updateLoop()
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  cancelAnimationFrame(animationId)
})
</script>

<style scoped>
/* 右下に固定配置 */
.scene-container {
  position: fixed;
  bottom: 40px; 
  right: 60px;
  width: 150px;
  height: 150px;
  z-index: 50;
  pointer-events: none;
  perspective: 800px;
}

.scene {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  /* 初期角度 */
  transform: rotateX(-15deg) rotateY(-25deg);
}

.cube {
  width: 100px;
  height: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  /* 中心合わせ */
  margin-top: -50px;
  margin-left: -50px;
  transform-style: preserve-3d;
  transition: border-color 0.2s, box-shadow 0.2s;
}

/* ワイヤーフレームの面 */
.face {
  position: absolute;
  width: 100px;
  height: 100px;
  border: 1px solid; /* 線を少し細くして上品に */
  border-color: inherit;
  background: rgba(10, 20, 40, 0.2); /* 少し暗く */
  box-shadow: inherit;
  
  /* グリッド模様 */
  background-image: 
    linear-gradient(rgba(56, 189, 248, 0.3) 1px, transparent 1px),
    linear-gradient(90deg, rgba(56, 189, 248, 0.3) 1px, transparent 1px);
  background-size: 20px 20px;
}

/* 各面の配置（100pxの半分 = 50px） */
.front  { transform: translateZ(50px); }
.back   { transform: rotateY(180deg) translateZ(50px); }
.right  { transform: rotateY(90deg) translateZ(50px); }
.left   { transform: rotateY(-90deg) translateZ(50px); }
.top    { transform: rotateX(90deg) translateZ(50px); }
.bottom { transform: rotateX(-90deg) translateZ(50px); }
</style>