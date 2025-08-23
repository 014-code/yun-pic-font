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

  type delUsingDELETEParams = {
    /** picId */
    picId: number
  }

  type detailUserUsingGETParams = {
    /** userId */
    userId: number
  }

  type detailUserVoUsingGETParams = {
    /** userId */
    userId: number
  }

  type detailUsingGETParams = {
    /** picId */
    picId?: number
  }

  type detailVoUsingGETParams = {
    /** picId */
    picId?: number
  }

  type downloadUsingPOSTParams = {
    /** filePath */
    filePath?: string
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

  type listUsingPOSTParams = {
    /** 分类 */
    category?: string
    /** 简介 */
    introduction?: string
    /** 图片名称 */
    name?: string
    /** 页码 */
    pageNum: number
    /** 条数 */
    pageSize: number
    /** 图片格式 */
    picFormat?: string
    /** 图片高度 */
    picHeight?: number
    /** 图片宽高比 */
    picScale?: string
    /** 图片体积 */
    picSize?: number
    /** 图片宽度 */
    picWidth?: number
    /** 搜索词(同时搜索名称简介) */
    seacherText?: string
    /** 标签-json */
    tags?: string[]
  }

  type listVoUsingPOSTParams = {
    /** 分类 */
    category?: string
    /** 简介 */
    introduction?: string
    /** 图片名称 */
    name?: string
    /** 页码 */
    pageNum: number
    /** 条数 */
    pageSize: number
    /** 图片格式 */
    picFormat?: string
    /** 图片高度 */
    picHeight?: number
    /** 图片宽高比 */
    picScale?: string
    /** 图片体积 */
    picSize?: number
    /** 图片宽度 */
    picWidth?: number
    /** 搜索词(同时搜索名称简介) */
    seacherText?: string
    /** 标签-json */
    tags?: string[]
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

  type ResultTUtilYunCategoryTagVo_ = {
    /** 响应状态码 */
    code?: number
    data?: YunCategoryTagVo
    /** 响应消息 */
    msg?: string
  }

  type ResultTUtilYunPictureUserVo_ = {
    /** 响应状态码 */
    code?: number
    data?: YunPictureUserVo
    /** 响应消息 */
    msg?: string
  }

  type ResultTUtilYunPictureUserVos_ = {
    /** 响应状态码 */
    code?: number
    data?: YunPictureUserVos
    /** 响应消息 */
    msg?: string
  }

  type ResultTUtilYunPictureVo_ = {
    /** 响应状态码 */
    code?: number
    data?: YunPictureVo
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

  type ReviewPicParam = {
    /** 图片id */
    picId: number
    /** 原因 */
    reason?: string
    /** 状态 */
    status: string
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

  type RowsTUtilYunPicture_ = {
    /** 响应状态码 */
    code?: number
    /** 响应消息 */
    msg?: string
    /** 响应内容 */
    rows?: YunPicture[]
    /** 总记录数 */
    total?: number
  }

  type RowsTUtilYunPictureVo_ = {
    /** 响应状态码 */
    code?: number
    /** 响应消息 */
    msg?: string
    /** 响应内容 */
    rows?: YunPictureVo[]
    /** 总记录数 */
    total?: number
  }

  type UpdatePictrueParam = {
    /** 分类 */
    category?: string
    /** 简介 */
    introduction?: string
    /** 图片名称 */
    name?: string
    /** 图片id */
    picId?: number
    /** 标签-json */
    tags?: string[]
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

  type uploadPicUrlUsingPOSTParams = {
    /** file */
    file?: string
    /** picId */
    picId?: number
  }

  type uploadPicUsingPOSTParams = {
    /** picId */
    picId?: number
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

  type YunCategoryTagVo = {
    /** 分类信息 */
    category?: string[]
    /** 标签信息 */
    tags?: string[]
  }

  type YunPicture = {
    category?: string
    createTime?: string
    delFlag?: string
    introduction?: string
    name?: string
    picFormat?: string
    picHeight?: number
    picId?: number
    picScale?: number
    picSize?: number
    picWidth?: number
    reason?: string
    reviewId?: number
    status?: string
    tags?: string
    updateTime?: string
    url?: string
    userId?: number
  }

  type YunPictureUserVo = {
    yunPicture?: YunPicture
    yunUser?: YunUser
  }

  type YunPictureUserVos = {
    yunPicture?: YunPictureVo
    yunUser?: Vo_
  }

  type YunPictureVo = {
    /** 分类 */
    category?: string
    /** 创建时间 */
    createTime?: string
    /** 简介 */
    introduction?: string
    /** 图片名称 */
    name?: string
    /** 图片格式 */
    picFormat?: string
    /** 图片高度 */
    picHeight?: number
    /** 图片id */
    picId?: number
    /** 图片宽高比 */
    picScale?: string
    /** 图片体积 */
    picSize?: number
    /** 图片宽度 */
    picWidth?: number
    /** 原因 */
    reason?: string
    /** 审核人id */
    reviewId?: number
    /** 图片状态 */
    status?: string
    /** 标签-json */
    tags?: string[]
    /** 更新时间 */
    updateTime?: string
    /** 图片地址 */
    url?: string
    /** 创建用户 */
    userId?: number
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
