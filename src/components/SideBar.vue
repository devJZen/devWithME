<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <aside class="sidebar">
    <nav class="sidebar-nav">
      <ul>
        <li><RouterLink to="/" class="nav-link">Main</RouterLink></li>
        <li><RouterLink to="/category" class="nav-link">Category</RouterLink></li>
        <li><RouterLink to="/test" class="nav-link">Test</RouterLink></li>
        <li><RouterLink to="/about" class="nav-link">About DevPrep</RouterLink></li>
      </ul>
    </nav>
    <div class="sidebar-footer">
      <p>&copy; 2025 DevPrep</p>
    </div>
  </aside>
</template>

<style scoped>
/* SideBar.vue 에 특화된 스타일 */
.sidebar {
  width: 150px; /* 사이드바 고정 너비 */
  background-color: #40513b; /* 어두운 배경색 */
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 제목/메뉴와 푸터 분리 */
  flex-shrink: 0; /* 내용이 많아져도 줄어들지 않게 */
}
.sidebar-nav {
  flex-grow: 1; /* 사이드바 내비게이션 영역이 가능한 공간을 모두 차지하도록 */
}
.sidebar-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-nav li {
  margin-bottom: 10px;
}

.sidebar-nav .nav-link {
  display: block;
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  transition:
    background-color 0.2s ease-in-out,
    color 0.2s ease-in-out;
}

.sidebar-nav .nav-link:hover,
.sidebar-nav .nav-link.router-link-active {
  background-color: var(--color-primary); /* 활성화/호버 시 포인트 색상 */
  color: #2c3e50; /* 포인트 색상 위에 대비되는 글자색 */
}

.sidebar-footer {
  text-align: center;
  font-size: 0.8em;
  color: #aaa;
}
</style>
