<template>
  <div>
    <div class="mail-pass" style="padding: 20px; position:absolute; background-color: rgba(0,0,0,0.5); border-radius: 20px; left: 50%; bottom:50px; transform: translateX(-50%); color: white;">
      <form @submit.prevent="saveSettings" style="z-index: 3;">
        <input v-model="gmail" placeholder="Gmailアドレス" required style="padding: 10px; margin-right: 5px;">
        <input v-model="appPassword" placeholder="アプリパスワード" type="password" required style="padding: 10px; margin-right: 5px;">
        <button type="submit" style="padding: 10px; background-color: blue; color: white;">設定</button>
      </form>
    </div>
    <div class="video-container" style="position: absolute; left: 50%; top: 30px; width: 640px; height: 480px; transform: translateX(-50%);">
      <video ref="video" autoplay playsinline width="640" height="480"
        style="transform: scaleX(-1); position: absolute; left: 0; top: 0; z-index: 1;"></video>
      <canvas ref="canvas" width="640" height="480"
        style="transform: scaleX(-1); position: absolute; left: 0; top: 0; z-index: 2; pointer-events: none;"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Holistic } from '@mediapipe/holistic'
import axios from 'axios'

const video = ref(null)
const canvas = ref(null)
let prevPose = null
let motionDetected = false
const interval = 20 * 1000 // 20秒に1回メール送信判定
let lastCheck = Date.now()

const gmail = ref('')
const appPassword = ref('')
let userSettings = {}

function saveSettings() {
  userSettings = {
    gmail: gmail.value,
    app_password: appPassword.value
  }
  alert('設定を保存しました')
}

const holistic = new Holistic({
  locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`
})
holistic.setOptions({
  modelComplexity: 1,
  smoothLandmarks: true,
  enableSegmentation: false,
  refineFaceLandmarks: true,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
})
holistic.onResults(onResults)

function getPoseVector(landmarks) {
  return landmarks.flatMap(lm => [lm.x, lm.y, lm.z])
}

function drawConnections(ctx, landmarks, connections, color = 'cyan', lineWidth = 2) {
  ctx.strokeStyle = color
  ctx.lineWidth = lineWidth
  connections.forEach(([start, end]) => {
    const s = landmarks[start]
    const e = landmarks[end]
    if (s && e) {
      ctx.beginPath()
      ctx.moveTo(s.x * ctx.canvas.width, s.y * ctx.canvas.height)
      ctx.lineTo(e.x * ctx.canvas.width, e.y * ctx.canvas.height)
      ctx.stroke()
    }
  })
}

function onResults(results) {
  const ctx = canvas.value.getContext('2d')
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)
  ctx.drawImage(results.image, 0, 0, canvas.value.width, canvas.value.height)

  // 顔を四角で囲む
  if (results.faceLandmarks && results.faceLandmarks.length > 0) {
    const w = canvas.value.width
    const h = canvas.value.height
    const xs = results.faceLandmarks.map(lm => lm.x * w)
    const ys = results.faceLandmarks.map(lm => lm.y * h)
    const xMin = Math.min(...xs)
    const xMax = Math.max(...xs)
    const yMin = Math.min(...ys)
    const yMax = Math.max(...ys)
    ctx.strokeStyle = 'lime'
    ctx.lineWidth = 2
    ctx.strokeRect(xMin, yMin, xMax - xMin, yMax - yMin)
  }

  // 体の骨格を描画
  if (results.poseLandmarks) {
    const connections = [
      [11, 13], [13, 15], [12, 14], [14, 16],
      [11, 12], [23, 24], [11, 23], [12, 24],
      [23, 25], [25, 27], [24, 26], [26, 28]
    ]
    drawConnections(ctx, results.poseLandmarks, connections, 'cyan', 3)
    results.poseLandmarks.forEach(lm => {
      ctx.beginPath()
      ctx.arc(lm.x * ctx.canvas.width, lm.y * ctx.canvas.height, 4, 0, 2 * Math.PI)
      ctx.fillStyle = 'yellow'
      ctx.fill()
    })
  }

  // 手の骨格描画関数
  function drawHand(landmarks, color) {
    const fingers = [
      [0,1],[1,2],[2,3],[3,4],
      [0,5],[5,6],[6,7],[7,8],
      [0,9],[9,10],[10,11],[11,12],
      [0,13],[13,14],[14,15],[15,16],
      [0,17],[17,18],[18,19],[19,20]
    ]
    drawConnections(ctx, landmarks, fingers, color, 2)
    landmarks.forEach(lm => {
      ctx.beginPath()
      ctx.arc(lm.x * ctx.canvas.width, lm.y * ctx.canvas.height, 3, 0, 2 * Math.PI)
      ctx.fillStyle = color
      ctx.fill()
    })
  }
  if (results.leftHandLandmarks) drawHand(results.leftHandLandmarks, 'red')
  if (results.rightHandLandmarks) drawHand(results.rightHandLandmarks, 'blue')

  // 動き検知
  if (results.poseLandmarks) {
    const poseVec = getPoseVector(results.poseLandmarks)
    if (prevPose) {
      const diff = Math.sqrt(poseVec.reduce((sum, v, i) => sum + Math.pow(v - prevPose[i], 2), 0))
      if (diff > 1) motionDetected = true
    }
    prevPose = poseVec
  }

  // 20秒に1回メール送信判定
  const now = Date.now()
  if (now - lastCheck > interval) {
    if (motionDetected && userSettings.gmail && userSettings.app_password) {
      axios.post(import.meta.env.VITE_API_URL + '/notify', userSettings)
        .then(() => {
          console.log('メール通知しました')
        })
        .catch(e => {
          console.error('メール通知エラー', e)
        })
      motionDetected = false
    }
    lastCheck = now
  }
}

onMounted(async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true })
  video.value.srcObject = stream

  async function detect() {
    await holistic.send({ image: video.value })
    requestAnimationFrame(detect)
  }
  detect()
})
</script>

<style scoped>
/* 全体のラッパー */
.camera-wrapper {
  position: relative;
  width: 100%;
  height: 100vh; /* 画面いっぱいに */
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* 設定フォーム */
.mail-pass {
  position: absolute;
  bottom: 100px; /* ボタンとかぶらない位置 */
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  padding: 15px;
  border-radius: 10px;
  width: 90%; /* スマホで横幅いっぱい */
  max-width: 400px;
  z-index: 10;
  text-align: center;
}

.mail-pass input {
  width: 90%;
  margin-bottom: 10px;
  padding: 8px;
  background: #222;
  border: 1px solid #444;
  color: #fff;
}

/* ビデオコンテナ（ここが重要！） */
.video-container {
  position: relative;
  width: 100%;
  max-width: 640px; /* PCではこれ以上大きくならない */
  aspect-ratio: 4 / 3; /* 4:3の比率を維持 */
}

/* ビデオとキャンバスをレスポンシブに重ねる */
.responsive-video,
.responsive-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;  /* コンテナに合わせて伸縮 */
  height: 100%;
  object-fit: cover;
  transform: scaleX(-1); /* 鏡面反転 */
}
</style>
