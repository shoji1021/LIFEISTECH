<template>
  <canvas ref="canvas" class="particle-canvas"></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvas = ref(null)
let ctx = null
let animationFrameId = null
let particles = []

// 設定
const particleCount = 60 // 粒子の数（減らすとよりスッキリします）
const connectionDistance = 150 // 線を結ぶ距離
const mouseDistance = 200 // マウスに反応する範囲

// マウス位置
let mouseX = -1000
let mouseY = -1000

// 粒子クラス
class Particle {
  constructor(width, height) {
    this.x = Math.random() * width
    this.y = Math.random() * height
    // ゆっくり動くように速度をランダム設定
    this.vx = (Math.random() - 0.5) * 0.5
    this.vy = (Math.random() - 0.5) * 0.5
    this.size = Math.random() * 2 + 1
  }

  update(width, height) {
    this.x += this.vx
    this.y += this.vy

    // 画面端で跳ね返る
    if (this.x < 0 || this.x > width) this.vx *= -1
    if (this.y < 0 || this.y > height) this.vy *= -1
  }

  draw(context) {
    context.beginPath()
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    context.fillStyle = 'rgba(100, 200, 255, 0.7)' // 淡いブルー
    context.fill()
  }
}

const init = () => {
  if (!canvas.value) return
  const el = canvas.value
  el.width = window.innerWidth
  el.height = window.innerHeight
  ctx = el.getContext('2d')

  particles = []
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle(el.width, el.height))
  }
}

const animate = () => {
  if (!ctx || !canvas.value) return
  
  const width = canvas.value.width
  const height = canvas.value.height

  // 背景クリア（完全なクリアではなく、グラデーションを描画）
  const gradient = ctx.createLinearGradient(0, 0, width, height)
  gradient.addColorStop(0, '#0f172a') // 深いネイビー（上）
  gradient.addColorStop(1, '#000000') // 黒（下）
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)

  // 粒子の更新と描画
  particles.forEach(p => {
    p.update(width, height)
    p.draw(ctx)
  })

  // 線を結ぶ処理（ここが「大人っぽさ」のキモ）
  connectParticles()

  animationFrameId = requestAnimationFrame(animate)
}

const connectParticles = () => {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i; j < particles.length; j++) {
      const p1 = particles[i]
      const p2 = particles[j]
      
      // 粒子同士の距離
      const dx = p1.x - p2.x
      const dy = p1.y - p2.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < connectionDistance) {
        // 近いほど濃く、遠いほど薄く
        const opacity = 1 - (distance / connectionDistance)
        ctx.strokeStyle = `rgba(100, 200, 255, ${opacity * 0.2})` // 非常に薄い線
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(p1.x, p1.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.stroke()
      }
    }
    
    // マウスとのインタラクション（マウス近くの粒子と線を結ぶ）
    const dxMouse = p1.x - mouseX
    const dyMouse = p1.y - mouseY
    const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse)
    
    if (distMouse < mouseDistance) {
       const opacity = 1 - (distMouse / mouseDistance)
       ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.3})`
       ctx.beginPath()
       ctx.moveTo(p1.x, p1.y)
       ctx.lineTo(mouseX, mouseY)
       ctx.stroke()
    }
  }
}

const handleMouseMove = (e) => {
  mouseX = e.clientX
  mouseY = e.clientY
}

const handleResize = () => {
  init()
}

onMounted(() => {
  init()
  animate()
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId)
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.particle-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1; /* 最背面 */
}
</style>