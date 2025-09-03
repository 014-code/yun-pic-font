// @ts-ignore
/* eslint-disable */
import request from '@/utils/request'

/** 批量抓取图片 POST /yunPicture/capture */
export async function capture(body: API.CaptureParam, options?: { [key: string]: any }) {
  return request<API.ResultTUtil>('/yunPicture/capture', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 删除图片-管理员 DELETE /yunPicture/del/${param0} */
export async function del(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.delParams,
  options?: { [key: string]: any }
) {
  const { picId: param0, ...queryParams } = params
  return request<API.ResultTUtil>(`/yunPicture/del/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 查询图片详情-管理员 GET /yunPicture/detail */
export async function detail(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.detailParams,
  options?: { [key: string]: any }
) {
  return request<API.ResultTUtil>('/yunPicture/detail', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 查询图片详情 GET /yunPicture/detail/vo */
export async function detailVo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.detailVoParams,
  options?: { [key: string]: any }
) {
  return request<API.ResultTUtil>('/yunPicture/detail/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 分页查询图片列表-管理员 POST /yunPicture/list */
export async function list(body: API.GetPictrueListParam, options?: { [key: string]: any }) {
  return request<API.RowsTUtil>('/yunPicture/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 分页获取图片 POST /yunPicture/list/vo */
export async function listVo(body: API.GetPictrueListParam, options?: { [key: string]: any }) {
  return request<API.RowsTUtil>('/yunPicture/list/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 审核图片 PUT /yunPicture/review */
export async function review(body: API.ReviewPicParam, options?: { [key: string]: any }) {
  return request<API.ResultTUtil>('/yunPicture/review', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 以图搜图 GET /yunPicture/search */
export async function search(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.searchParams,
  options?: { [key: string]: any }
) {
  return request<API.ResultTUtil>('/yunPicture/search', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 颜色搜图 GET /yunPicture/search/color */
export async function searchByColor(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.searchByColorParams,
  options?: { [key: string]: any }
) {
  return request<API.ResultTUtil>('/yunPicture/search/color', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 查询所有标签和类别 GET /yunPicture/tags/all */
export async function allTags(options?: { [key: string]: any }) {
  return request<API.ResultTUtil>('/yunPicture/tags/all', {
    method: 'GET',
    ...(options || {}),
  })
}

/** 更新图片信息-管理员 PUT /yunPicture/update */
export async function update(body: API.UpdatePictrueParam, options?: { [key: string]: any }) {
  return request<API.ResultTUtil>('/yunPicture/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 修改图片 PUT /yunPicture/update/vo */
export async function updateVo(body: API.UpdatePictrueParam, options?: { [key: string]: any }) {
  return request<API.ResultTUtil>('/yunPicture/update/vo', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 上传图片(并返回图片信息) POST /yunPicture/uploadPic */
export async function uploadPic(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.uploadPicParams,
  options?: { [key: string]: any }
) {
  return request<API.ResultTUtil>('/yunPicture/uploadPic', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** url上传图片(并返回图片信息) POST /yunPicture/uploadPic/url */
export async function uploadPicUrl(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.uploadPicUrlParams,
  options?: { [key: string]: any }
) {
  return request<API.ResultTUtil>('/yunPicture/uploadPic/url', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}
