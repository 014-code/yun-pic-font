// @ts-ignore
/* eslint-disable */
import request from '@/utils/request'
import { getToken } from '@/utils/cookies.ts'

/** 删除用户 DELETE /api/user/${param0} */
export async function delUserUsingDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.delUserUsingDELETEParams,
  options?: { [key: string]: any }
) {
  const { userId: param0, ...queryParams } = params
  return request<API.ResultTUtil>(`/api/user/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    headers: {
      'Authorization': getToken() || ''
    },
    ...(options || {})
  })
}

/** 创建用户 POST /api/user/add */
export async function addUserUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.addUserUsingPOSTParams,
  options?: { [key: string]: any }
) {
  return request<API.ResultTUtil>('/api/user/add', {
    method: 'POST',
    params: {
      ...params
    },
    headers: {
      'Authorization': getToken() || ''
    },
    ...(options || {})
  })
}

/** 注销用户 POST /api/user/cancellation */
export async function cancellationUsingPost(options?: { [key: string]: any }) {
  return request<API.ResultTUtil>('/api/user/cancellation', {
    method: 'POST',
    headers: {
      'Authorization': getToken() || ''
    },
    ...(options || {})
  })
}

/** 查询用户详情/未脱敏 GET /api/user/detail */
export async function detailUserUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.detailUserUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.ResultTUtilYunUser_>('/api/user/detail', {
    method: 'GET',
    params: {
      ...params
    },
    headers: {
      'Authorization': getToken() || ''
    },
    ...(options || {})
  })
}

/** 查询用户详情/脱敏 GET /api/user/detail/vo */
export async function detailUserVoUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.detailUserVoUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.ResultTUtilVo_>('/api/user/detail/vo', {
    method: 'GET',
    params: {
      ...params
    },
    headers: {
      'Authorization': getToken() || ''
    },
    ...(options || {})
  })
}

/** 获取当前用户信息 GET /api/user/info */
export async function infoUsingGet(options?: { [key: string]: any }) {
  return request<API.ResultTUtilVo_>('/api/user/info', {
    method: 'GET',
    headers: {
      'Authorization': getToken() || ''
    },
    ...(options || {})
  })
}

/** 获取用户列表 POST /api/user/list */
export async function listUserUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listUserUsingPOSTParams,
  options?: { [key: string]: any }
) {
  return request<API.RowsTUtilVo_>('/api/user/list', {
    method: 'POST',
    params: {
      ...params
    },
    headers: {
      'Authorization': getToken() || ''
    },
    ...(options || {})
  })
}

/** 用户登录 POST /api/user/login */
export async function loginUsingPost(body: API.LoginParam, options?: { [key: string]: any }) {
  return request<API.ResultTUtilString_>('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  })
}

/** 用户注册 POST /api/user/register */
export async function registerUsingPost(
  body: API.RegisterParam,
  options?: { [key: string]: any }
) {
  return request<API.ResultTUtilString_>('/api/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  })
}

/** 修改用户 PUT /api/user/update */
export async function updateUserUsingPut(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateUserUsingPUTParams,
  options?: { [key: string]: any }
) {
  return request<API.ResultTUtil>('/api/user/update', {
    method: 'PUT',
    params: {
      ...params
    },
    headers: {
      'Authorization': getToken('token') || ''
    },
    ...(options || {})
  })
}
