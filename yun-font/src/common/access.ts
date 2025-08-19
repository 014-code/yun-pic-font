/**
 * 全局校验拦截-使用路由进行拦截
 */

import router from '@/router'
import { useLoginUserStore } from '@/stores/counter.ts'
import ACCESS_ENUM from '@/types/enum/accessEnum.ts'
import { message } from 'ant-design-vue'
import checkAccess from '@/common/checkAccess.ts'

/**
 * 拦截
 */
router.beforeEach(async (to, form, next) => {
  //拿到当前用户-pinia
  const loginUser = useLoginUserStore().loginUser
  //拿到路由上的meta中的accees就是当前路由要的权限-枚举
  const meta = ((to.meta.access) ?? ACCESS_ENUM.NOT_LOGIN)
  //todo自动登录？
  //判断该页面是否要登录-不然就强制跳转到登录页
  if (meta !== ACCESS_ENUM.NOT_LOGIN) {
    //没登录则重定向
    if (!loginUser || !loginUser.role) {
      message.success('当前用户未登录，登录后方可进行访问')
      router.push('/login')
      return
    }
    if (loginUser.role) {
      //校验比对所需权限是否合
      //继续判断权限是否符合-checkAccess方法-不符合则跳到401无权限界面
      if (!checkAccess(loginUser, meta)) {
        //则重定向到401无权限页面
        message.success('您暂无访问该页面的权限')
        router.push('/notpermission')
        return
      }
    }
  }
  next()
})
