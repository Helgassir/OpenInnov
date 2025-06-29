import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// Import views
import Home from '@/views/Home.vue'
import Login from '@/views/auth/Login.vue'
import Register from '@/views/auth/Register.vue'
import Profile from '@/views/Profile.vue'
import Dashboard from '@/views/Dashboard.vue'
import Search from '@/views/Search.vue'
import ServiceDetail from '@/views/ServiceDetail.vue'
import CreateService from '@/views/CreateService.vue'
import Messages from '@/views/Messages.vue'
import Calendar from '@/views/Calendar.vue'
import Reviews from '@/views/Reviews.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { requiresGuest: true }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: { requiresGuest: true }
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/service/:id',
      name: 'ServiceDetail',
      component: ServiceDetail
    },
    {
      path: '/profile/:id?',
      name: 'Profile',
      component: Profile,
      meta: { requiresAuth: true }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: { requiresAuth: true }
    },
    {
      path: '/create-service',
      name: 'CreateService',
      component: CreateService,
      meta: { requiresAuth: true }
    },
    {
      path: '/messages',
      name: 'Messages',
      component: Messages,
      meta: { requiresAuth: true }
    },
    {
      path: '/calendar',
      name: 'Calendar',
      component: Calendar,
      meta: { requiresAuth: true }
    },
    {
      path: '/reviews',
      name: 'Reviews',
      component: Reviews,
      meta: { requiresAuth: true }
    }
  ]
})

// Navigation guards
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router