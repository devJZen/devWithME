<script setup lang="ts">
import { ref, computed } from 'vue'
import SearchBar from '../components/SearchBar.vue'
import QuestionCard from '../components/QuestionCard.vue'
import allQuestions from '../data/interviewQuestions.json' // JSON 데이터 임포트
import type { Question } from '../types' // 타입 정의 임포트

const questions = ref<Question[]>(allQuestions as Question[]) // 타입 단언
const searchTerm = ref('')

const handleSearch = (query: string) => {
  searchTerm.value = query
}

// 검색 및 필터링된 질문 목록
const filteredQuestions = computed(() => {
  if (!searchTerm.value) {
    return questions.value
  }
  const lowerCaseSearchTerm = searchTerm.value.toLowerCase()
  return questions.value.filter(
    (q) =>
      q.question.toLowerCase().includes(lowerCaseSearchTerm) ||
      q.answer.toLowerCase().includes(lowerCaseSearchTerm) ||
      q.keywords.some((keyword) => keyword.toLowerCase().includes(lowerCaseSearchTerm)) ||
      q.category.toLowerCase().includes(lowerCaseSearchTerm),
  )
})
</script>

<template>
  <div class="home-view">
    <h1 class="page-title">아침마다 공부하세요.</h1>
    <SearchBar @search="handleSearch" />

    <div v-if="filteredQuestions.length === 0" class="no-results">
      <p>검색 결과가 없습니다.</p>
      <p>다른 키워드로 검색해보세요.</p>
    </div>
    <div v-else class="question-list">
      <QuestionCard v-for="question in filteredQuestions" :key="question.id" :question="question" />
    </div>
  </div>
</template>

<style scoped>
/* HomeView.vue 에 특화된 스타일 */
.home-view {
  padding: 20px;
}

.page-title {
  font-size: 2em;
  color: var(--color-heading);
  margin-bottom: 25px;
  text-align: center;
}

.question-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); /* 반응형 그리드 */
  gap: 20px;
  margin-top: 20px;
}

.no-results {
  text-align: center;
  margin-top: 50px;
  font-size: 1.2em;
  color: #666;
}
</style>
