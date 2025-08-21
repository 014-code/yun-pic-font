// @ts-ignore
/* eslint-disable */
import request from '@/utils/request'

/** 测试文件下载 POST /api/file/download */
export async function downloadUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.downloadUsingPOSTParams,
  options?: { [key: string]: any }
) {
  return request<any>('/api/file/download', {
    method: 'POST',
    params: {
      ...params
    },
    ...(options || {})
  })
}

/** 测试文件上传 POST /api/file/upload */
export async function uploadUsingPost(body: {}, file?: File, options?: { [key: string]: any }) {
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

  return request<API.ResultTUtilString>('/api/file/upload', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {})
  })
}
