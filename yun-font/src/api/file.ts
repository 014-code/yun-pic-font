// @ts-ignore
/* eslint-disable */
import request from '@/utils/request'

/** 测试文件下载 POST /file/download */
export async function download(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.downloadParams,
  options?: { [key: string]: any }
) {
  return request<any>('/file/download', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 测试文件上传 POST /file/upload */
export async function upload(body: {}, options?: { [key: string]: any }) {
  return request<API.ResultTUtil>('/file/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}
