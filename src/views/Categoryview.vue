<template>
  <div class="category-list-page">
    <h1 class="page-title">원하는 분야를 공부하세요.</h1>
    <div class="category-tags">
      <router-link
        v-for="category in uniqueCategories"
        :key="category"
        :to="{ name: 'category-questions', params: { categoryName: category } }"
        class="category-tag"
      >
        # {{ category }}
      </router-link>
    </div>
    <div v-if="uniqueCategories.length === 0" class="no-categories">
      <p>등록된 카테고리가 없습니다.</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import allQuestions from '@/data/interviewQuestions.json'
import type { Question } from '@/types' // Question 타입 임포트 (없으면 추가)

export default defineComponent({
  name: 'CategoryListPage',
  setup() {
    // interviewQuestions.json에서 고유한 카테고리 목록 추출
    const uniqueCategories = computed(() => {
      const categories = new Set<string>()
      ;(allQuestions as Question[]).forEach((q) => {
        categories.add(q.category)
      })
      return Array.from(categories).sort() // 알파벳 순 정렬
    })

    return {
      uniqueCategories,
    }
  },
})
</script>

<style scoped>
.category-list-page {
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
}
.page-title {
  font-size: 2.2em;
  color: var(--color-heading);
  margin-bottom: 30px;
}
.category-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 30px;
}
.category-tag {
  display: inline-block;
  background-color: var(--color-background-soft);
  color: var(--color-text);
  padding: 12px 25px;
  border-radius: 25px;
  text-decoration: none;
  font-size: 1.1em;
  font-weight: bold;
  transition:
    background-color 0.3s ease,
    color 0.3s ease,
    transform 0.2s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.category-tag:hover {
  background-color: var(--color-primary);
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}
.no-categories {
  text-align: center;
  color: var(--color-text-light);
  margin-top: 50px;
}
</style>
