import Vue from 'vue'
import store from '@/store'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      layout: 'main',
      requiresAuth: true
    },
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    meta: { layout: 'empty' },
    component: () => import('@/views/Login')
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {
      layout: 'main',
      requiresAuth: true
    },
    component: () => import('@/views/profile/Profile')
  },
  {
    path: '/school/:id',
    name: 'school',
    meta: {
      layout: 'main',
      requiresAuth: true
    },
    component: () => import('@/views/school/School')
  },
  {
    path: '/schools',
    name: 'SchoolsList',
    meta: {
      layout: 'main',
      requiresAuth: true
    },
    component: () => import('@/views/school/SchoolsList')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next('/login');
  } else {
    next();
  }
})

export default router
