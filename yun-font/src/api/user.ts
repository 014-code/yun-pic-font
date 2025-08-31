// @ts-ignore
/* eslint-disable */
import request from '@/utils/request'

/** 删除用户 DELETE /user/${param0} */
export async function delUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.delUserParams,
  options?: { [key: string]: any }
) {
  const { userId: param0, ...queryParams } = params
  return request<API.ResultTUtil>(`/user/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 创建用户 POST /user/add */
export async function addUser(body: API.AddYunUserParam, options?: { [key: string]: any }) {
  return request<API.ResultTUtil>('/user/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 注销用户 POST /user/cancellation */
export async function cancellation(options?: { [key: string]: any }) {
  return request<API.ResultTUtil>('/user/cancellation', {
    method: 'POST',
    ...(options || {}),
  })
}

/** 查询用户详情/未脱敏 GET /user/detail */
export async function detailUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.detailUserParams,
  options?: { [key: string]: any }
) {
  return request<API.ResultTUtil>('/user/detail', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 查询用户详情/脱敏 GET /user/detail/vo */
export async function detailUserVo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.detailUserVoParams,
  options?: { [key: string]: any }
) {
  return request<API.ResultTUtil>('/user/detail/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 获取当前用户信息 GET /user/info */
export async function info(options?: { [key: string]: any }) {
  return request<API.ResultTUtil>('/user/info', {
    method: 'GET',
    ...(options || {}),
  })
}

/** 获取用户列表 POST /user/list */
export async function listUser(body: API.GetUserListParam, options?: { [key: string]: any }) {
  return request<API.RowsTUtil>('/user/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 用户登录 POST /user/login */
export async function login(body: API.LoginParam, options?: { [key: string]: any }) {
  return request<API.ResultTUtil>('/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 用户注册 POST /user/register */
export async function register(body: API.RegisterParam, options?: { [key: string]: any }) {
  return request<API.ResultTUtil>('/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 修改用户 PUT /user/update */
export async function updateUser(body: API.UpdateYunUserParam, options?: { [key: string]: any }) {
  return request<API.ResultTUtil>('/user/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}
