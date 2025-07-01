<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import allQuestions from '../data/interviewQuestions.json' // JSON 데이터 임포트
import type { Question } from '../types' // 타입 정의 임포트

const route = useRoute()
const router = useRouter()
const question = ref<Question | null>(null)

// 라우트 매개변수 id를 기반으로 질문을 찾습니다.
onMounted(() => {
  const questionId = Number(route.params.id)
  const foundQuestion = (allQuestions as Question[]).find((q) => q.id === questionId)
  if (foundQuestion) {
    question.value = foundQuestion
  } else {
    // 질문을 찾지 못하면 홈으로 리다이렉트
    router.push({ name: 'home' })
  }
})

// 키워드를 쉼표로 구분하여 표시
const formattedKeywords = computed(() => {
  return question.value ? question.value.keywords.join(', ') : ''
})

// 뒤로 가기 버튼
const goBack = () => {
  router.back()
}
</script>

<template>
  <div v-if="question" class="question-detail-view">
    <button @click="goBack" class="back-button">← 뒤로 가기</button>
    <div class="question-card-detail card">
      <h1 class="question-title">{{ question.question }}</h1>
      <div class="question-meta">
        <span class="category">{{ question.category }}</span>
        <span class="difficulty">{{ question.difficulty }}</span>
      </div>
      <div class="question-answer-section">
        <h2>답변</h2>
        <p class="answer-content">{{ question.answer }}</p>
      </div>
      <div class="question-keywords-section">
        <h3>키워드</h3>
        <p class="keywords-content">{{ formattedKeywords }}</p>
      </div>
    </div>
  </div>
  <div v-else class="loading-message">질문을 불러오는 중...</div>
</template>

<style scoped>
/* QuestionDetailView.vue 에 특화된 스타일 */
.question-detail-view {
  padding: 20px;
}

.back-button {
  margin-bottom: 20px;
  background-color: #40513b;
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.back-button:hover {
  background-color: #9dc08b;
}

.question-card-detail {
  padding: 30px;
}

.question-title {
  font-size: 1.8em;
  margin-bottom: 15px;
  color: var(--color-heading);
}

.question-meta {
  font-size: 0.9em;
  color: #777;
  margin-bottom: 25px;
  display: flex;
  gap: 10px;
}

.category {
  background-color: var(--color-primary);
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
}

.difficulty {
  background-color: #eee;
  color: #555;
  padding: 5px 10px;
  border-radius: 5px;
}

.question-answer-section,
.question-keywords-section {
  margin-top: 30px;
  border-top: 1px solid var(--color-border);
  padding-top: 20px;
}

.question-answer-section h2,
.question-keywords-section h3 {
  color: var(--color-heading);
  margin-bottom: 10px;
}

.answer-content {
  font-size: 1.1em;
  line-height: 1.8;
  color: var(--color-text);
  white-space: pre-wrap; /* 줄바꿈 유지 */
}

.keywords-content {
  font-size: 0.95em;
  color: #555;
}

.loading-message {
  text-align: center;
  margin-top: 50px;
  font-size: 1.2em;
  color: #666;
}
</style>
