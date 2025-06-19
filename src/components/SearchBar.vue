<script setup lang="ts">
import { ref } from 'vue'

const searchQuery = ref('')
const emit = defineEmits(['search'])

const performSearch = () => {
  emit('search', searchQuery.value)
}
</script>

<template>
  <div class="search-bar">
    <input
      type="text"
      v-model="searchQuery"
      @input="performSearch"
      placeholder="질문, 답변, 키워드를 검색하세요"
      class="search-input"
    />
    <button @click="performSearch" class="search-button">Search</button>
  </div>
</template>

<style scoped>
/* SearchBar.vue 에 특화된 스타일 */
.search-bar {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.search-input {
  flex-grow: 1;
  padding: 12px 15px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  font-size: 1em;
  outline: none;
  transition: border-color 0.2s ease-in-out;
}

.search-input:focus {
  border-color: var(--color-primary);
}

.search-button {
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 1em;
  background-color: var(--color-primary);
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.search-button:hover {
  background-color: var(--color-link-hover);
}
</style>
