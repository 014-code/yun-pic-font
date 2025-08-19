declare namespace API {
  type addUserUsingPOSTParams = {
    account?: string
    avatar?: string
    password?: string
    profile?: string
    role?: string
    userName?: string
  }

  type delUserUsingDELETEParams = {
    /** userId */
    userId: number
  }

  type detailUserUsingGETParams = {
    /** userId */
    userId: number
  }

  type detailUserVoUsingGETParams = {
    /** userId */
    userId: number
  }

  type listUserUsingPOSTParams = {
    /** 账号 */
    account?: string
    /** 页码 */
    pageNum: number
    /** 条数 */
    pageSize: number
    /** 用户名 */
    userName?: string
  }

  type LoginParam = {
    /** 账号 */
    account: string
    /** 密码 */
    password: string
  }

  type RegisterParam = {
    /** 账号 */
    account: string
    /** 密码 */
    password: string
    /** 再次输入密码 */
    rePassword: string
    /** 用户名称 */
    userName?: string
  }

  type ResultTUtil = {
    /** 响应状态码 */
    code?: number
    /** 响应内容 */
    data?: Record<string, any>
    /** 响应消息 */
    msg?: string
  }

  type ResultTUtilString_ = {
    /** 响应状态码 */
    code?: number
    /** 响应内容 */
    data?: string
    /** 响应消息 */
    msg?: string
  }

  type ResultTUtilVo_ = {
    /** 响应状态码 */
    code?: number
    data?: Vo_
    /** 响应消息 */
    msg?: string
  }

  type ResultTUtilYunUser_ = {
    /** 响应状态码 */
    code?: number
    data?: YunUser
    /** 响应消息 */
    msg?: string
  }

  type RowsTUtilVo_ = {
    /** 响应状态码 */
    code?: number
    /** 响应消息 */
    msg?: string
    /** 响应内容 */
    rows?: Vo_[]
    /** 总记录数 */
    total?: number
  }

  type updateUserUsingPUTParams = {
    account?: string
    avatar?: string
    password?: string
    profile?: string
    role?: string
    userId?: number
    userName?: string
  }

  type Vo_ = {
    /** 账号 */
    account?: string
    /** 头像 */
    avatar?: string
    /** 创建者 */
    createBy?: string
    /** 创建时间 */
    createTime?: string
    /** 删除标志 */
    delFlag?: string
    /** 简介 */
    profile?: string
    /** 角色 */
    role?: string
    /** 更新者 */
    updateBy?: string
    /** 更新时间 */
    updateTime?: string
    /** 用户id */
    userId?: number
    /** 用户名称 */
    userName?: string
  }

  type YunUser = {
    account?: string
    avatar?: string
    createBy?: string
    createTime?: string
    delFlag?: string
    password?: string
    profile?: string
    role?: string
    updateBy?: string
    updateTime?: string
    userId?: number
    userName?: string
  }
}
