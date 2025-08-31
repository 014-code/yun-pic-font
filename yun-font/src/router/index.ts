import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/common/HomeView.vue'
import OtherView from '@/views/OtherView.vue'
import UserMagerView from '@/views/user/UserMagerView.vue'
import LoginView from '@/views/common/LoginView.vue'
import RegisterView from '@/views/common/RegisterView.vue'
import ACCESS_ENUM from '@/types/enum/accessEnum.ts'
import NotPermission from '@/views/common/NotPermission.vue'
import UploadPicView from '@/component/UploadPic.vue'
import PictureMagerView from '@/views/picture/PictureMagerView.vue'
import PicDetailView from '@/views/picture/PicDetailView.vue'
import UrlPicView from '@/component/UrlPic.vue'
import CreatePictureView from '@/views/picture/CreatePictureView.vue'
import CapturePicView from '@/views/picture/CapturePicView.vue'
import SpaceMagerView from '@/views/space/SpaceMagerView.vue'
import CreateSpaceView from '@/views/space/CreateSpaceView.vue'
import MineSpaceView from '@/views/space/MineSpaceView.vue'
import SpaceDetailView from '@/views/space/SpaceDetailView.vue'

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
    // 403无权限界面-todo使用ant的无权限界面实现
    path: '/notpermission',
    name: 'notpermission',
    component: NotPermission,
    meta: {
      access: ACCESS_ENUM.NOT_LOGIN
    }
  },
  {
    // 上传图片页
    path: '/upload_pic',
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
  {
    // 批量抓取图片页
    path: '/capture_pic',
    name: 'capture_pic',
    component: CapturePicView,
    meta: {
      access: ACCESS_ENUM.ADMIN
    }
  },
  {
    // 空间管理页
    path: '/space-manger',
    name: 'space-manger',
    component: SpaceMagerView,
    meta: {
      access: ACCESS_ENUM.ADMIN
    }
  },
  {
    // 创建空间页
    path: '/create_space',
    name: 'create_space',
    component: CreateSpaceView,
    meta: {
      access: ACCESS_ENUM.USER
    }
  },
  {
    // 我的空间页
    path: '/mine_space',
    name: 'mine_space',
    component: MineSpaceView,
    meta: {
      access: ACCESS_ENUM.ADMIN
    }
  },
  {
    // 空间详情页
    path: '/detail_space/:spaceId?',
    name: 'detail_space',
    component: SpaceDetailView,
    meta: {
      access: ACCESS_ENUM.ADMIN
    }
  }

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
