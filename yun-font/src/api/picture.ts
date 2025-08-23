// @ts-ignore
/* eslint-disable */
import request from '@/utils/request'

/** 删除图片-管理员 DELETE /api/yunPicture/del/${param0} */
export async function delUsingDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.delUsingDELETEParams,
  options?: { [key: string]: any }
) {
  const { picId: param0, ...queryParams } = params
  return request<API.ResultTUtil>(`/api/yunPicture/del/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 查询图片详情-管理员 GET /api/yunPicture/detail */
export async function detailUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.detailUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.ResultTUtilYunPictureUserVo_>('/api/yunPicture/detail', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 查询图片详情 GET /api/yunPicture/detail/vo */
export async function detailVoUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.detailVoUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.ResultTUtilYunPictureUserVos_>('/api/yunPicture/detail/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 分页查询图片列表-管理员 POST /api/yunPicture/list */
export async function listUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listUsingPOSTParams,
  options?: { [key: string]: any }
) {
  return request<API.RowsTUtilYunPicture_>('/api/yunPicture/list', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 分页获取图片 POST /api/yunPicture/list/vo */
export async function listVoUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listVoUsingPOSTParams,
  options?: { [key: string]: any }
) {
  return request<API.RowsTUtilYunPictureVo_>('/api/yunPicture/list/vo', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 审核图片 PUT /api/yunPicture/review */
export async function reviewUsingPut(body: API.ReviewPicParam, options?: { [key: string]: any }) {
  return request<API.ResultTUtil>('/api/yunPicture/review', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 查询所有标签和类别 GET /api/yunPicture/tags/all */
export async function allTagsUsingGet(options?: { [key: string]: any }) {
  return request<API.ResultTUtilYunCategoryTagVo_>('/api/yunPicture/tags/all', {
    method: 'GET',
    ...(options || {}),
  })
}

/** 更新图片信息-管理员 PUT /api/yunPicture/update */
export async function updateUsingPut(
  body: API.UpdatePictrueParam,
  options?: { [key: string]: any }
) {
  return request<API.ResultTUtil>('/api/yunPicture/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 修改图片 PUT /api/yunPicture/update/vo */
export async function updateVoUsingPut(
  body: API.UpdatePictrueParam,
  options?: { [key: string]: any }
) {
  return request<API.ResultTUtil>('/api/yunPicture/update/vo', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 上传图片(并返回图片信息) POST /api/yunPicture/uploadPic */
export async function uploadPicUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.uploadPicUsingPOSTParams,
  body: {},
  file?: File,
  options?: { [key: string]: any }
) {
  const formData = new FormData()

  if (file) {
    formData.append('file', file)
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele]

    if (item !== undefined && item !== null) {
      if (typeof item === 'object' && !(item instanceof File)) {
        if (item instanceof Array) {
          item.forEach((f) => formData.append(ele, f || ''))
        } else {
          formData.append(ele, JSON.stringify(item))
        }
      } else {
        formData.append(ele, item)
      }
    }
  })

  return request<API.ResultTUtilYunPictureVo_>('/api/yunPicture/uploadPic', {
    method: 'POST',
    params: {
      ...params,
    },
    data: formData,
    requestType: 'form',
    ...(options || {}),
  })
}

/** url上传图片(并返回图片信息) POST /api/yunPicture/uploadPic/url */
export async function uploadPicUrlUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.uploadPicUrlUsingPOSTParams,
  options?: { [key: string]: any }
) {
  return request<API.ResultTUtilYunPictureVo_>('/api/yunPicture/uploadPic/url', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}
