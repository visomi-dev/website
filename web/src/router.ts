import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import PageHome from './pages/Home.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: PageHome,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
