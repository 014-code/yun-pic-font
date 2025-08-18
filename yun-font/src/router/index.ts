import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import OtherView from '@/views/OtherView.vue'
import UserMagerView from '@/views/UserMagerView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    // 主页
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    // 其它
    path: '/other',
    name: 'other',
    component: OtherView
  },
  {
    // 用户管理页
    path: '/user-mager',
    name: 'user-mager',
    component: UserMagerView
  },
  {
    // 登录
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    // 注册
    path: '/register',
    name: 'register',
    component: RegisterView
  }

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
