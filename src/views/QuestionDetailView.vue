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

// 답변에서 줄바꿈 문자를 <br> 태그로 변환
const formattedAnswer = computed(() => {
  return question.value ? question.value.answer.replace(/\n/g, '<br>') : ''
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
        <div class="answer-content" v-html="formattedAnswer"></div>

        <!-- 참조 링크 섹션 -->
        <div v-if="question.referenceText && question.referenceURI" class="reference-section">
          <h3>참고 자료</h3>
          <div class="reference-links">
            <a
              v-for="(text, index) in question.referenceText"
              :key="index"
              :href="question.referenceURI[index]"
              target="_blank"
              rel="noopener noreferrer"
              class="reference-link"
            >
              {{ text }}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="external-link-icon">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
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
  word-wrap: break-word;
  margin-bottom: 15px;
}

.answer-content ::v-deep(br) {
  line-height: 2.4;
}

.reference-section {
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid #e0e0e0;
}

.reference-section h3 {
  color: var(--color-heading);
  margin-bottom: 10px;
  font-size: 1.1em;
}

.reference-links {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.reference-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: var(--color-primary);
  text-decoration: none;
  font-size: 0.95em;
  padding: 8px 12px;
  border: 1px solid var(--color-primary);
  border-radius: 6px;
  transition: all 0.2s ease;
  width: fit-content;
}

.reference-link:hover {
  background-color: var(--color-primary);
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.external-link-icon {
  flex-shrink: 0;
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
