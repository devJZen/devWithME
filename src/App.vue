<script setup lang="ts">
import SideBar from './components/SideBar.vue' // 사이드바 컴포넌트 임포트
import { RouterView } from 'vue-router' // RouterView를 직접 임포트

// App.vue에서는 전역 스타일을 임포트하지 않습니다. main.ts에서 처리
</script>

<template>
  <div class="app-container">
    <SideBar />
    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
/* App.vue 자체의 레이아웃 스타일 */
.app-container {
  display: flex; /* Flexbox를 사용하여 SideBar와 main-content를 나란히 배치 */
  min-height: 100vh; /* 뷰포트 전체 높이를 차지하도록 */
}

.main-content {
  flex-grow: 1; /* 남은 공간을 모두 차지하도록 */
  padding: 20px; /* 메인 콘텐츠 영역의 기본 패딩 */
  background-color: var(--color-background-soft);
  overflow-y: auto; /* 내용이 넘칠 경우 스크롤바 */
}
</style>
