import ACCESS_ENUM from '@/types/enum/accessEnum.ts'

/**
 * 拦截/校验角色权限方法
 * @param loginUser -当前登录用户
 * @param needAccess -访问需要的权限(没有则默认未登录也可)
 */
function checkAccess(loginUser: any, needAccess = ACCESS_ENUM.NOT_LOGIN): Boolean {
  //获取用户角色
  const loginUserState = loginUser.role
  //如果needAccess直接是未登录则放行
  if (needAccess === ACCESS_ENUM.NOT_LOGIN) {
    return true
  }
  //如果needAccess需要USER，但是用户没登录则不放行
  if (needAccess === ACCESS_ENUM.USER) {
    //但是用户没登录
    if (loginUserState === ACCESS_ENUM.NOT_LOGIN) {
      return false
    }
  }
  //如果需要管理员权限但是用户不是则不放心
  if (needAccess === ACCESS_ENUM.ADMIN) {
    if (loginUserState !== ACCESS_ENUM.ADMIN) {
      return false
    }
  }
  //否则放行
  return true
}

export default checkAccess
