import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import Dashboard from '../pages/Dashboard.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;