import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/login/Login.vue'),
  },
  {
    path: '/article',
    name: 'article',
    component: () => import('@/pages/article/Index.vue'),
  },
  {
    path: '/tag',
    name: 'tag',
    component: () => import('@/pages/tag/Index.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
