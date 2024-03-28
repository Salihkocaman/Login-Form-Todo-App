import Login from '@/pages/login.vue'
import Register from '@/pages/register.vue'
import Empty from '@/pages/empty.vue'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

/**
 * Bu router bileşeni için yazıldı
 */
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/empty',
      name: 'empty',
      component: Empty,
    }
  ],
})

export default router
