<template>
  <div class="tool-container">
    <h2>監視モード</h2>
    <p>カメラへのアクセスを許可し、通知先を設定してください。</p>
    <PoseDetect />
  </div>
</template>

<script setup>
import PoseDetect from '../components/PoseDetect.vue'
</script>

<style scoped>
.tool-container { padding-top: 80px; text-align: center; }
</style>