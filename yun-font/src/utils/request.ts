import axios from 'axios'
import {
  AxiosError
} from 'axios'
import type { InternalAxiosRequestConfig } from 'axios'
import { message, Modal } from 'ant-design-vue'
import { getToken, removeToken } from '@/utils/cookies.ts'
import router from '@/router'

// 扩展请求配置类型
interface RequestConfig extends InternalAxiosRequestConfig {
  isToken?: boolean
}

// 创建axios实例
const request = axios.create({
  baseURL: 'http://localhost:8101/api',
  timeout: 10000
})

// 请求拦截器
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const typedConfig = config as RequestConfig

    // 添加token到请求头
    const token = getToken()
    if (token) {
      typedConfig.headers.Authorization = token
    }

    // 转换page参数格式
    if (typedConfig.params?.page) {
      typedConfig.params = {
        ...typedConfig.params,
        pageNum: typedConfig.params.page.pageNum,
        pageSize: typedConfig.params.page.pageSize
      }
      delete typedConfig.params.page
    }

    return typedConfig
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    const { data } = response

    if (data.code !== 0) {
      message.error(data.msg)
      return Promise.reject(data)
    }
    return data
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response

      // 如果是401未授权错误，弹出确认框
      if (status === 401) {
        Modal.confirm({
          title: '登录已过期',
          content: '您的登录状态已过期，请重新登录',
          okText: '去登录',
          cancelText: '取消',
          onOk() {
            // 清除token
            removeToken()
            // 跳转到登录页
            router.push('/login')
          },
          onCancel() {
            // 用户选择取消，不做任何操作
          }
        })
        return Promise.reject(error)
      }

      const errorMsg = data?.msg || '请求错误'
      message.error(errorMsg)
    } else {
      message.error('网络连接异常')
    }
    return Promise.reject(error)
  }
)
export default request
