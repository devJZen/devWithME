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
    <div class="search-container">
      <SearchBar @search="handleSearch" />
    </div>

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
  min-width: 800px;
  max-width: 1200px;
  margin: 0 auto;
}

.page-title {
  font-size: 2em;
  color: var(--color-heading);
  margin-bottom: 25px;
  text-align: center;
  min-width: 300px;
  width: 100%;
}

.search-container {
  max-width: 800px;
  width: 100%;
  margin: 0 auto 20px auto;
}

.question-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); /* 반응형 그리드 */
  gap: 20px;
  margin-top: 20px;
  min-width: 800px;
  width: 100%;
}

.no-results {
  text-align: center;
  margin-top: 50px;
  font-size: 1.2em;
  color: #666;
  min-width: 300px;
  width: 100%;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .home-view {
    min-width: 320px;
    padding: 15px;
  }

  .question-list {
    min-width: 300px;
    grid-template-columns: 1fr;
  }

  .search-container {
    max-width: 100%;
  }
}
</style>
