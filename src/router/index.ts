import { createRouter, createWebHistory } from 'vue-router'

import Login from '../views//Login.vue'
import Register from '@/views/Register.vue'
import Tasks from '@/views/crm/Tasks.vue'

import { useStore } from '@/store/Store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/tasks', component: Tasks, meta: { requiresAuth: true }}, // Маркер, что этот маршрут требует авторизации },
  ],

})

router.beforeEach((to, from, next) => { // Сделали защитный маршрут чтобы если пользователь не залогинен он не мог войти в аккаунт
  const store = useStore();
  const isLogin = !store.token; // Так тоже можно вытащить переменную

  if (to.meta.requiresAuth && isLogin) {
    next('/login');
  } else {
    next();
  }
})

export default router