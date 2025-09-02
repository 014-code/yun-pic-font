<template>
  <div style="margin: 30px">
    <a-row :gutter="[16, 16]">
      <!--图片展示区-->
      <a-col :sm="24" :md="16" :xl="18">
        <a-card title="图片预览" style="text-align: center">
          <a-image style="max-height:600px; object-fit: contain" :src="picture.url" />
        </a-card>
      </a-col>
      <!--图片信息区-->
      <a-col :sm="24" :md="8" :xl="6">
        <a-card title="图片信息">
          <a-descriptions :column="1">
            <a-descriptions-item label="作者">
              <a-space>
                <a-avatar :size="24" :src="userPic?.avatar" />
                <div>{{ userPic?.userName }}</div>
              </a-space>
            </a-descriptions-item>
            <a-descriptions-item label="名称">
              {{ picture.name ?? '未命名' }}
            </a-descriptions-item>
            <a-descriptions-item label="简介">
              {{ picture.introduction ?? '- ' }}
            </a-descriptions-item>
            <a-descriptions-item label="分类">
              {{ picture.category ?? '默认' }}
            </a-descriptions-item>
            <a-descriptions-item label="标签">
              <a-tag v-for="tag in picture.tags" :key="tag">
                {{ tag }}
              </a-tag>
            </a-descriptions-item>
            <a-descriptions-item label="格式">
              {{ picture.picFormat ?? '- ' }}
            </a-descriptions-item>
            <a-descriptions-item label="宽度">
              {{ picture.picWidth ?? '- ' }}
            </a-descriptions-item>
            <a-descriptions-item label="高度">
              {{ picture.picHeight ?? '- ' }}
            </a-descriptions-item>
            <a-descriptions-item label="宽高比">
              {{ picture.picScale ?? '- ' }}
            </a-descriptions-item>
            <a-descriptions-item label="大小">
              {{ formatSize(picture.picSize) }}
            </a-descriptions-item>
          </a-descriptions>
          <a-space wrap>
            <a-button v-if="canEdit" type="default" @click="doEdit">
              编辑
            </a-button>
            <a-button v-if="canEdit" type="default" danger @click="doDel">
              删除
            </a-button>
            <a-button v-if="canEdit" type="default" danger @click="doDownload">
              免费下载
            </a-button>
          </a-space>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { del, detail, detailVo, update } from '@/api/picture.ts'
import { useRoute } from 'vue-router'
import { downloadImage, formatSize } from '@/common'
import { useLoginUserStore } from '@/stores/counter.ts'
import ACCESS_ENUM from '@/types/enum/accessEnum.ts'
import { message } from 'ant-design-vue'
import router from '@/router'
//图片信息
const picture = ref<API.YunPictureVo>({})
//图片的用户信息
const userPic = ref<API.YunUser>({})
//当前id
const route = useRoute()
//当前用户
const loginUserStore = useLoginUserStore()

//编辑/删除权限计算方法
const canEdit = computed(() => {
  const loginUser = loginUserStore.loginUser
  //未登录不可
  if (!loginUser.userId) return false
  //图片上传本人和管理员可以
  const user = userPic.value.userId || null
  return user === loginUser.userId || loginUser.role === 'admin'
})

/**
 * 删除方法
 */
function doDel() {
  del(picture.value.picId).then(res => {
    message.success(res.msg)
    // 跳转
    router.push('/home')
  }).catch(err => {
    message.success(err.msg)
  })
}

/**
 * 下载方法
 */
function doDownload() {
  downloadImage(picture.value.url)
}

/**
 * 编辑方法
 */
function doEdit() {
  const picId = picture.value.picId
  const spaceId = route.query.spaceId
  //跳转至编辑页
  router.push({
    path: `/upload_pic`,
    query: { picId, spaceId }
  })
}

/**
 * 获取图片详情
 */
function getDetail() {
  const picId = route.query.picId as number
  detailVo({ picId }).then(res => {
    picture.value = res.data.yunPicture
    userPic.value = res.data.yunUser
  })
}

onMounted(() => {
  getDetail()
})

</script>

<style scoped lang="scss"></style>
