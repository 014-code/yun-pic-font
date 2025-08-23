import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import OtherView from '@/views/OtherView.vue'
import UserMagerView from '@/views/UserMagerView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import ACCESS_ENUM from '@/types/enum/accessEnum.ts'
import NotPermission from '@/views/NotPermission.vue'
import UploadPicView from '@/component/UploadPicView.vue'
import PictureMagerView from '@/views/PictureMagerView.vue'
import PicDetailView from '@/views/PicDetailView.vue'
import UrlPicView from '@/component/UrlPicView.vue'
import CreatePictureView from '@/views/CreatePictureView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    // 主页
    path: '/home',
    name: 'home',
    component: HomeView,
    meta: {
      access: ACCESS_ENUM.NOT_LOGIN
    }
  },
  {
    // 其它
    path: '/other',
    name: 'other',
    component: OtherView,
    meta: {
      access: ACCESS_ENUM.NOT_LOGIN
    }
  },
  {
    // 用户管理页
    path: '/user-manager',
    name: 'user-manager',
    component: UserMagerView,
    //配置可访问路径-的状态(角色)
    meta: {
      access: ACCESS_ENUM.ADMIN
    }
  },
  {
    // 登录
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      access: ACCESS_ENUM.NOT_LOGIN
    }
  },
  {
    // 注册
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: {
      access: ACCESS_ENUM.NOT_LOGIN
    }
  },
  {
    // 401无权限界面-todo使用ant的无权限界面实现
    path: '/notpermission',
    name: 'notpermission',
    component: NotPermission,
    meta: {
      access: ACCESS_ENUM.NOT_LOGIN
    }
  },
  {
    // 上传图片页
    path: '/upload_pic/:picId?',
    name: 'upload_pic',
    component: CreatePictureView,
    meta: {
      access: ACCESS_ENUM.USER
    }
  },
  {
    // 图片管理页
    path: '/picture-manger',
    name: 'picture-manger',
    component: PictureMagerView,
    meta: {
      access: ACCESS_ENUM.ADMIN
    }
  },
  {
    // 图片详情页
    path: '/picture_detail/:picId?',
    name: 'picture_detail',
    component: PicDetailView,
    meta: {
      access: ACCESS_ENUM.USER
    }
  },

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
