<template>
  <div class="picture-upload">
    <a-upload name="avatar" list-type="picture-card" class="avatar-uploader" :custom-request="uploadPicture"
      :before-upload="beforeUpload" :show-upload-list="false">
      <img v-if="props.picture" :src="getImgUrl(props.picture.url)" alt="avatar" />
      <div v-else style="margin-top: 30px">
        <loading-outlined v-if="loading"></loading-outlined>
        <plus-outlined v-else></plus-outlined>
        <div class="ant-upload-text">点击上传或者拖拽图片</div>
      </div>
    </a-upload>
  </div>
</template>
<script lang="ts" setup>
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { defineComponent, ref } from 'vue'
import { uploadPic } from '../api/picture'
import { useLoginUserStore } from '../stores/counter'

interface Props {
  picture?: any
  onSuccess?: (newPicture: any) => void
}

interface FileItem {
  uid: string;
  name?: string;
  status?: string;
  response?: string;
  url?: string;
  type?: string;
  size: number;
  originFileObj: any;
}

interface FileInfo {
  file: FileItem;
  fileList: FileItem[];
}

//加载状态
const loading = ref<boolean>(false)
//props
const props = defineProps<Props>()
//从pinia里面拿取到的用户信息
const loginUserStore = useLoginUserStore()

/**
 * 上传图片前的校验
 * @param file
 */
const beforeUpload = (file: FileItem) => {
  const isJpgOrPng = file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp'
  if (!isJpgOrPng) {
    message.error('你只能上传 jpg png webp 格式的文件!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('图片大小不能超过 2MB!')
  }
  return isJpgOrPng && isLt2M
}

/**
 * 上传图片
 */
function uploadPicture(options: any) {
  const { file, onSuccess, onError } = options
  loading.value = true
  //将上传成功的图片信息返回给父组件
  //拿到父组件传入的picture进行请求
  const params = props.picture ? { picId: props.picture.picId } : {}
  const userParam = loginUserStore.loginUser
  const realFile = (file && (file as any).originFileObj) ? (file as any).originFileObj : file
  uploadPic(params, { yunUser: userParam }, realFile).then((res: any) => {
    message.success(res.msg || '上传成功')
    //将上传成功的图片信息返回给父组件
    props.onSuccess && props.onSuccess(res.data as any)
    onSuccess && onSuccess(res.data, file)
  }).catch((err: any) => {
    message.error(err.msg || '上传失败')
    onError && onError(err)
  }).finally(() => {
    loading.value = false
  })
}

function getImgUrl(url?: string) {
  if (!url) return ''
  if (/^(https?:)?\/\//.test(url) || url.startsWith('data:')) return url
  return 'http://localhost:8101' + url
}
</script>
<style lang="scss" scoped>
.picture-upload :deep(.ant-upload-select-picture-card) {
  width: 100% !important;
  height: 100% !important;
  min-height: 152px;
  min-width: 152px;
}

.picture-upload :deep(.ant-upload-select-picture-card) img {
  font-size: 32px;
  color: #999;
  height: 152px;
}

.picture-upload :deep(.ant-upload-select-picture-card) .ant-upload-text {
  margin-top: 50px;
  color: #666;
}
</style>
