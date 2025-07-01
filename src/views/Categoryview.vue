<template>
  <div class="category-view">
    <h1 class="page-title">원하는 분야를 공부하세요.</h1>
    <ul>
      <li v-for="question in filteredQuestions" :key="question.id"></li>
    </ul>
  </div>
</template>

<script lang="ts">
import interviewQuestions from '@/data/interviewQuestions.json' // 경로는 실제 파일 위치에 맞게 수정

export default {
  name: 'CategoryView',
  props: {
    category: {
      type: String,
      required: true,
    },
  },
  computed: {
    filteredQuestions() {
      return interviewQuestions.filter((q) => q.category === this.category)
    },
  },
}
</script>

<style scoped>
.category-view {
  padding: 20px;
}
.page-title {
  font-size: 2em;
  color: var(--color-heading);
  margin-bottom: 25px;
  text-align: center;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  margin-bottom: 12px;
}
</style>
