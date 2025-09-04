// @ts-ignore
/* eslint-disable */
import request from '@/utils/request'

/** 创建空间 POST /yunSpace/add */
export async function addSpace(body: API.AddSpaceParam, options?: { [key: string]: any }) {
  return request<API.ResultTUtil>('/yunSpace/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 查询当前用户所有空间 GET /yunSpace/all/space */
export async function allSpace(options?: { [key: string]: any }) {
  return request<API.ResultTUtil>('/yunSpace/all/space', {
    method: 'GET',
    ...(options || {}),
  })
}

/** 图片批量管理 PUT /yunSpace/batch */
export async function batch(body: API.BatchPicParam, options?: { [key: string]: any }) {
  return request<API.ResultTUtil>('/yunSpace/batch', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 删除空间 DELETE /yunSpace/del/${param0} */
export async function del(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.delParams,
  options?: { [key: string]: any }
) {
  const { spaceId: param0, ...queryParams } = params
  return request<API.ResultTUtil>(`/yunSpace/del/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 查询空间详情 GET /yunSpace/detail */
export async function detail(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.detailParams,
  options?: { [key: string]: any }
) {
  return request<API.ResultTUtil>('/yunSpace/detail', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 查询空间列表-管理员 POST /yunSpace/list */
export async function list(body: API.GetSpaceListParam, options?: { [key: string]: any }) {
  return request<API.RowsTUtil>('/yunSpace/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 查询所有空间类别 GET /yunSpace/type */
export async function type(options?: { [key: string]: any }) {
  return request<API.ResultTUtil>('/yunSpace/type', {
    method: 'GET',
    ...(options || {}),
  })
}

/** 更新空间信息-管理员 PUT /yunSpace/update */
export async function update(body: API.UpdateSpaceParam, options?: { [key: string]: any }) {
  return request<API.ResultTUtil>('/yunSpace/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}
