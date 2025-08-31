declare namespace API {
  type AddSpaceParam = {
    /** 空间名称 */
    spaceName?: string
    /** 空间级别(0普通专业2旗舰) */
    spaceLevel: number
    /** 最大总大小s */
    maxSize?: number
    /** 空间图片最大总数量 */
    maxCount?: number
    /** 用户id */
    userId?: number
  }

  type AddYunUserParam = {
    userName?: string
    account?: string
    password?: string
    avatar?: string
    role?: string
    profile?: string
  }

  type CaptureParam = {
    /** 搜索词 */
    text?: string
    /** 抓取数量 */
    num?: number
    /** 图片前缀(名称) */
    prefix?: string
    yunUser?: YunUser
  }

  type delParams = {
    picId: number
  }

  type delParams = {
    spaceId: number
  }

  type delUserParams = {
    userId: number
  }

  type detailParams = {
    picId: number
  }

  type detailParams = {
    spaceId: number
  }

  type detailUserParams = {
    userId: number
  }

  type detailUserVoParams = {
    userId: number
  }

  type detailVoParams = {
    picId: number
  }

  type downloadParams = {
    filePath: string
  }

  type GetPictrueListParam = {
    /** 图片名称 */
    name?: string
    /** 图片格式 */
    picFormat?: string
    /** 简介 */
    introduction?: string
    /** 分类 */
    category?: string
    /** 标签-json */
    tags?: string[]
    /** 图片体积 */
    picSize?: number
    /** 图片宽度 */
    picWidth?: number
    /** 图片高度 */
    picHeight?: number
    /** 图片宽高比 */
    picScale?: string
    /** 搜索词(同时搜索名称简介) */
    seacherText?: string
    /** 空间id */
    spaceId?: number
    /** 是否只查询spaceId为null的数据(是就查公共图库，不是就查对应的) */
    nullSpace?: boolean
    /** 条数 */
    pageSize: number
    /** 页码 */
    pageNum: number
  }

  type GetSpaceListParam = {
    /** 空间名称 */
    spaceName?: string
    /** 空间级别 */
    spaceLevel?: number
    /** 条数 */
    pageSize: number
    /** 页码 */
    pageNum: number
  }

  type GetUserListParam = {
    /** 账号 */
    account?: string
    /** 用户名 */
    userName?: string
    /** 条数 */
    pageSize: number
    /** 页码 */
    pageNum: number
  }

  type LoginParam = {
    /** 账号 */
    account: string
    /** 密码 */
    password: string
  }

  type PageInfoParam = {
    /** 条数 */
    pageSize: number
    /** 页码 */
    pageNum: number
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
    /** 响应消息 */
    msg?: string
    /** 响应状态码 */
    code?: number
    /** 响应内容 */
    data?: Record<string, any>
  }

  type ReviewPicParam = {
    /** 图片id */
    picId: number
    /** 状态 */
    status: string
    /** 原因 */
    reason?: string
  }

  type RowsTUtil = {
    /** 响应状态码 */
    code?: number
    /** 响应消息 */
    msg?: string
    /** 响应内容 */
    rows?: YunSpace[]
    /** 总记录数 */
    total?: number
  }

  type UpdatePictrueParam = {
    /** 图片id */
    picId?: number
    /** 图片名称 */
    name?: string
    /** 简介 */
    introduction?: string
    /** 分类 */
    category?: string
    /** 标签-json */
    tags?: string[]
  }

  type UpdateSpaceParam = {
    /** 空间id */
    spaceId: number
    /** 空间名称 */
    spaceName?: string
    /** 空间级别()0普通专业2旗舰) */
    spaceLevel?: string
    /** 最大总大小s */
    maxSize?: number
    /** 空间图片最大总数量 */
    maxCount?: number
    /** 当前空间下图片的总大小 */
    totalSize?: number
    /** 当前空间下的图片数量 */
    totalCount?: number
    /** 用户id */
    userId?: number
  }

  type UpdateYunUserParam = {
    userId?: number
    userName?: string
    account?: string
    password?: string
    avatar?: string
    role?: string
    profile?: string
  }

  type uploadPicParams = {
    file: string
    picId: number
    spaceId: number
  }

  type uploadPicUrlParams = {
    file: string
    picId: number
    spaceId: number
  }

  type YunSpace = {
    spaceId?: number
    spaceName?: string
    spaceLevel?: string
    maxSize?: number
    maxCount?: number
    totalSize?: number
    totalCount?: number
    userId?: number
    createTime?: string
    updateTime?: string
    delFlag?: string
  }

  type YunUser = {
    userId?: number
    userName?: string
    account?: string
    password?: string
    avatar?: string
    role?: string
    profile?: string
    delFlag?: string
    createTime?: string
    createBy?: string
    updateTime?: string
    updateBy?: string
  }
}
