import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { infoUsingGet } from '@/api/user.ts'
import { message } from 'ant-design-vue'

export const useLoginUserStore = defineStore('loginUser', () => {

  //登录用户
  const loginUser = ref<any>({})

  /**
   * 接口请求
   */
  async function fetchLoginUser() {
    infoUsingGet().then(res => {
      loginUser.value = res.data
    }).catch(err => {
      message.error(err.msg ?? "获取用户信息失败")
    })
  }

  /**
   * 重新设置用户信息
   * @param newLoginUser
   */
  function setLoginUser(newLoginUser: any) {
    loginUser.value = newLoginUser
  }

  /**
   * 清空用户信息
   */
  function cleanUser() {
    loginUser.value = null
  }

  return { loginUser, setLoginUser, fetchLoginUser, cleanUser }
})
