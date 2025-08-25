import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useLoginUserStore = defineStore('loginUser', () => {

  //登录用户
  const loginUser = ref<any>({})

  /**
   * 接口请求
   */
  async function fetchLoginUser() {

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
