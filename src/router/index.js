import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue'; // Перевір цей шлях і назву файлу!

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;