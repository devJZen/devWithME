<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { Question } from '../types' // 타입 정의 임포트

defineProps<{
  question: Question
}>()
</script>

<template>
  <RouterLink
    :to="{ name: 'question-detail', params: { id: question.id } }"
    class="question-card card"
  >
    <h3 class="question-title">{{ question.question }}</h3>
    <div class="question-meta">
      <span class="category">{{ question.category }}</span>
      <span class="difficulty">{{ question.difficulty }}</span>
    </div>
    <div class="question-keywords">
      <span v-for="keyword in question.keywords" :key="keyword" class="keyword-tag">{{
        keyword
      }}</span>
    </div>
  </RouterLink>
</template>

<style scoped>
/* QuestionCard.vue 에 특화된 스타일 */
.question-card {
  display: block; /* RouterLink를 블록 요소로 만듦 */
  text-decoration: none; /* 밑줄 제거 */
  color: var(--color-text); /* 기본 텍스트 색상 */
  transition:
    transform 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
}

.question-card:hover {
  transform: translateY(-5px); /* 호버 시 약간 위로 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 그림자 강화 */
}

.question-title {
  font-size: 1.2em;
  margin-bottom: 10px;
  color: var(--color-heading);
}

.question-meta {
  font-size: 0.85em;
  color: #777;
  margin-bottom: 10px;
  display: flex;
  gap: 10px;
}

.category {
  background-color: #40513b;
  color: #edf1d6;
  padding: 4px 8px;
  border-radius: 4px;
}

.difficulty {
  background-color: #609966;
  color: #edf1d6;
  padding: 4px 8px;
  border-radius: 4px;
}

.question-keywords {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 10px;
}

.keyword-tag {
  background-color: var(--color-background-mute);
  color: #666;
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 0.75em;
}
</style>
