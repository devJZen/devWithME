<template>
  <div class="category-questions-view">
    <div class="header">
      <router-link to="/category" class="back-link">← 카테고리 목록으로</router-link>
      <h1 class="page-title">{{ categoryName }} 질문 목록</h1>
      <p class="question-count">총 {{ filteredQuestions.length }}개의 질문</p>
    </div>

    <div class="search-container">
      <SearchBar @search="handleSearch" />
    </div>

    <div v-if="filteredQuestions.length === 0" class="no-results">
      <p>해당 카테고리에 질문이 없습니다.</p>
      <router-link to="/category" class="back-to-categories">다른 카테고리 보기</router-link>
    </div>

    <div v-else class="question-list">
      <QuestionCard
        v-for="question in filteredQuestions"
        :key="question.id"
        :question="question"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import SearchBar from '../components/SearchBar.vue'
import QuestionCard from '../components/QuestionCard.vue'
import allQuestions from '../data/interviewQuestions.json'
import type { Question } from '../types'

const route = useRoute()
const categoryName = computed(() => route.params.categoryName as string)
const searchTerm = ref('')

// 카테고리별 질문 필터링
const categoryQuestions = computed(() => {
  return (allQuestions as Question[]).filter(
    (question) => question.category === categoryName.value
  )
})

// 검색어에 따른 추가 필터링
const filteredQuestions = computed(() => {
  if (!searchTerm.value) {
    return categoryQuestions.value
  }

  const lowerCaseSearchTerm = searchTerm.value.toLowerCase()
  return categoryQuestions.value.filter(
    (q) =>
      q.question.toLowerCase().includes(lowerCaseSearchTerm) ||
      q.answer.toLowerCase().includes(lowerCaseSearchTerm) ||
      q.keywords.some((keyword) => keyword.toLowerCase().includes(lowerCaseSearchTerm))
  )
})

const handleSearch = (query: string) => {
  searchTerm.value = query
}
</script>

<style scoped>
.category-questions-view {
  padding: 20px;
  min-width: 800px;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  margin-bottom: 30px;
}

.back-link {
  display: inline-block;
  color: var(--color-primary);
  text-decoration: none;
  font-size: 1.1em;
  margin-bottom: 15px;
  transition: color 0.2s ease;
}

.back-link:hover {
  color: var(--color-link-hover);
}

.page-title {
  font-size: 2.2em;
  color: var(--color-heading);
  margin-bottom: 10px;
  min-width: 300px;
}

.question-count {
  color: var(--color-text-light);
  font-size: 1.1em;
  margin-bottom: 20px;
}

.search-container {
  max-width: 800px;
  width: 100%;
  margin: 0 auto 20px auto;
}

.question-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
  min-width: 800px;
  width: 100%;
}

.no-results {
  text-align: center;
  margin-top: 50px;
  min-width: 300px;
}

.no-results p {
  font-size: 1.2em;
  color: #666;
  margin-bottom: 20px;
}

.back-to-categories {
  display: inline-block;
  background-color: var(--color-primary);
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 8px;
  transition: background-color 0.2s ease;
}

.back-to-categories:hover {
  background-color: var(--color-link-hover);
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .category-questions-view {
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

  .page-title {
    font-size: 1.8em;
  }
}
</style>
