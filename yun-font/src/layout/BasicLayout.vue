<template>
  <div id="BasicLayout">
    <!-- 通用布局组件 -->
    <a-layout>
      <!--  导航栏  -->
      <a-layout-header class="layout-header">
        <!--  ant布局    -->
        <a-row :wrap="false">
          <a-col flex="300px">
            <!--   左边logo和文字     -->
            <div style="display: flex">
              <img src="../static/images/智能云.png" alt="智能协同云图库" style="height: 60px">
              <h3 style="margin-left: 20px">智能协同云图库</h3>
            </div>
          </a-col>
          <a-col flex="auto">
            <!--    中间导航栏    -->
            <a-menu v-model:selectedKeys="current" mode="horizontal" @click="menuClick"
                    :items="visibleMenus">
            </a-menu>
          </a-col>
          <a-col flex="200px">
            <!--    右边登录注册/个人信息    -->
            <template v-if="loginUserStore.loginUser.userName">
              <a-avatar style="margin-right: 10px;" :src="loginUserStore.loginUser.avatar">
                <template #icon>
                  <AntDesignOutlined />
                </template>
              </a-avatar>
              <a-dropdown>
                <span>{{ loginUserStore.loginUser.userName }}</span>
                <template #overlay>
                  <a-menu>
                    <a-menu-item>
                      <a @click="logoutLogin()">退出登录</a>
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
              <a-tag v-if="loginUserStore.loginUser.role" color="blue" style="margin-left: 10px">
                <div v-if="loginUserStore.loginUser.role === 'admin'">{{ '管理员' }}</div>
                <div v-else="loginUserStore.loginUser.role === 'admin'">{{ '用户' }}</div>
              </a-tag>
            </template>
            <template v-else>
              <a-button type="primary" @click="toLogin">登录</a-button>
            </template>
          </a-col>
        </a-row>
      </a-layout-header>
      <a-layout>
        <!--        &lt;!&ndash;           左边菜单栏     &ndash;&gt;-->
        <!--        <a-layout-sider class="layout-sider">-->
        <!--          <a-menu-->
        <!--            id="amenu"-->
        <!--            style="width: 100%"-->
        <!--            v-model:openKeys="openKeys"-->
        <!--            v-model:selectedKeys="selectedKeys"-->
        <!--            mode="inline"-->
        <!--            @click="handleClick"-->
        <!--          >-->
        <!--            <a-sub-menu key="sub1" @titleClick="titleClick">-->
        <!--              <template #title>菜单</template>-->
        <!--            </a-sub-menu>-->
        <!--          </a-menu>-->
        <!--        </a-layout-sider>-->
        <!--           内容-router-view   -->
        <a-layout-content class="latout-content">
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
      <!--   底部关于我   -->
      <a-layout-footer class="layout-footer">
        <div>
          <a href="https://github.com/014-code">关于我：014-code</a>
        </div>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import router from '@/router'
import { useRouter } from 'vue-router'
import { AntDesignOutlined } from '@ant-design/icons-vue'
import { useLoginUserStore } from '@/stores/counter.ts'
import { cancellationUsingPost } from '@/api/user.ts'
import { removeToken } from '@/utils/cookies.ts'
import ACCESS_ENUM from '@/types/enum/accessEnum.ts'
import checkAccess from '@/common/checkAccess.ts'
//当前选中菜单
const current = ref<string[]>(['home'])
//从pinia里面拿取到的用户信息
const loginUserStore = useLoginUserStore()

const fullMenus: any = [
  {
    key: '/home',
    label: '主页',
    meta: { access: ACCESS_ENUM.NOT_LOGIN }
  },
  {
    key: '/picture-manger',
    label: '图片管理',
    // 仅管理员可见
    meta: { access: ACCESS_ENUM.ADMIN }
  },
  {
    key: '/user-manager',
    label: '用户管理',
    // 仅管理员可见
    meta: { access: ACCESS_ENUM.ADMIN }
  },
  {
    key: '/upload_pic',
    label: '创建图片',
    // 仅管理员可见
    meta: { access: ACCESS_ENUM.ADMIN }
  },
  {
    key: '/other',
    label: '其它',
    meta: { access: ACCESS_ENUM.NOT_LOGIN }
  }
]

//发送获取用户信息接口?
// loginUserStore.fetchLoginUser()

/**
 * 监听路由变化-同步更新菜单选中
 */
router.afterEach((to, from, next) => {
  //to-现在所在页面地址
  current.value = [to.path]
})

/**
 * 菜单点击方法-不能直接拿组件方法里面的值，得结构确定是哪个
 */
function menuClick({ key }: { key: string }) {
  router.push({
    path: key
  })
}

/**
 * 跳转到登录页
 */
function toLogin() {
  router.push('/login')
}

// 动态计算可见菜单
const visibleMenus = computed(() => {
  return fullMenus.filter(menu => {
    // 隐藏菜单项
    if (menu.meta?.hideInMenu) return false

    // 检查权限
    return checkAccess(loginUserStore.loginUser, menu.meta?.access)
  })
})

/**
 * 退出登录方法
 */
function logoutLogin() {
  // 调用后端注销接口
  cancellationUsingPost().then(() => {
    // 移除cookie中的token
    removeToken()
    // 清空pinia里面的用户数据
    loginUserStore.setLoginUser(null)
    console.log(loginUserStore.loginUser)
    // 跳转到登录页
    router.push('/login')
  }).catch((error) => {
    // 即使后端注销失败，也要清除本地状态
    removeToken()
    loginUserStore.setLoginUser(null)
    router.push('/login')
    console.error('注销失败:', error)
  })
}

</script>

<style lang="scss" scoped>
#BasicLayout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

#BasicLayout .ant-layout {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.layout-header {
  background-color: white;
}

.layout-sider {
  background-color: white;
}

.layout-footer {
  width: 100%;
  text-align: center;
  background-color: rgb(243, 243, 243);
  height: 29px; // 明确设置footer高度
  line-height: 29px; // 垂直居中
  transform: translateY(-25px);
}

.latout-content {
  min-height: calc(100vh - 64px - 69px); // 64px是header高度，69px是footer高度
  background-color: white;
}

</style>
