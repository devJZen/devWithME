// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import QuestionDetailView from '../views/QuestionDetailView.vue'
import Aboutview from '@/views/Aboutview.vue'
import Categoryview from '@/views/Categoryview.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: Aboutview,
    },
    {
      path: '/category/', // 카테고리별 질문 목록
      name: 'category-questions',
      props: true, // 라우트 매개변수를 컴포넌트 props로 전달
      component: Categoryview,
    },
    {
      path: '/question/:id', // 질문 ID에 따라 상세 페이지
      name: 'question-detail',
      component: QuestionDetailView,
      props: true, // 라우트 매개변수를 컴포넌트 props로 전달
    },
  ],
})

export default router
