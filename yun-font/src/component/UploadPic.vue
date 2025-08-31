<template>
  <div class="upload-pic">
    <h1>创建图片</h1>
    <p v-if="spaceDetail.spaceId != null && spaceDetail.spaceId != undefined">保存至空间：<a :href="'/detail_space?spaceId=' + spaceDetail.spaceId">{{ spaceDetail.spaceName
        }}</a>
    </p>
    <!--  上传  -->
    <PicUpload :picture="picture" :on-success="onSuccess"></PicUpload>
    <div v-if="picture || picId">
      <!--  下方输入表单  -->
      <a-form :model="formState" style="margin-top: 30px">
        <a-form-item label="名称">
          <a-input v-model:value="formState.name" placeholder="请输入名称"></a-input>
        </a-form-item>
        <a-space></a-space>
        <a-form-item label="简介">
          <a-input v-model:value="formState.introduction" type="textarea" placeholder="请输入简介"></a-input>
        </a-form-item>
        <a-space></a-space>
        <a-form-item label="分类">
          <a-select v-model:value="formState.category" placeholder="请选择分类">
            <a-select-option v-for="item in categoryList" :key="item" :value="item">{{ item }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-space></a-space>
        <a-form-item label="标签" placeholder="请选择标签">
          <a-select mode="tags" v-model:value="formState.tags">
            <a-select-option v-for="item in tagsList" :key="item" :value="item">{{ item }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-space></a-space>
        <a-form-item>
          <!--    提交    -->
          <a-button type="primary" style="width: 100%" @click="submit()">提交</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script lang="ts" setup>

import { onMounted, reactive, ref } from 'vue'
import PicUpload from '@/component/PicUpload.vue'
import { message } from 'ant-design-vue'
import { allTags, detailVo, update } from '@/api/picture.ts'
import { useRoute } from 'vue-router'
import router from '@/router'
import { detail } from '@/api/space.ts'
//图片信息
const picture = ref<API.YunPictureVo>()
//所有分类信息
const categoryList = ref([])
//所有标签信息
const tagsList = ref([])
//表单
const formState = reactive({
  name: undefined,
  introduction: undefined,
  category: undefined,
  tags: undefined
})

const route = useRoute()

//空间详情
const spaceDetail = ref({})

//图片id
const picId = route.query.picId

//空间id
const spaceId = route.query.spaceId

/**
 * 加载图片
 */
function onSuccess(newPicture: API.YunPictureVo) {
  picture.value = newPicture
  //填充默认名称
  formState.name = newPicture.name
}

/**
 * 查询空间详情
 */
function getSpaceDetail() {
  if (spaceId) {
    detail({ spaceId: spaceId }).then(res => {
      spaceDetail.value = res.data.yunSpace
    }).catch(err => {
      message.error(err.msg)
    })
  }
}

/**
 * 获取所有标签
 */
function getTags() {
  allTags().then(res => {
    categoryList.value = res.data.category
    tagsList.value = res.data.tags
  }).catch(err => {
    message.error('获取标签和类别失败')
  })
}

/**
 * 查询图片详情-如果参数上面有id则进行查
 */
function getDetail() {
  const picId = route.query.picId
  console.log('picId:', picId)

  detailVo({ picId }).then(res => {
    formState.name = res.data.yunPicture.name
    formState.introduction = res.data.yunPicture.introduction
    formState.category = res.data.yunPicture.category

    // 安全解析tags
    try {
      formState.tags = JSON.parse(res.data.yunPicture.tags || '[]')
    } catch {
      formState.tags = []
    }

    picture.value = {
      ...res.data.yunPicture,
      url: res.data.yunPicture.url
    }
  }).catch(err => {
    message.error('获取图片详情失败')
  })
}

/**
 * 提交表单
 */
function submit() {
  //构造请求参数
  const params: any = {
    picId: picture.value?.picId,
    name: formState.name,
    introduction: formState.introduction,
    category: formState.category,
    tags: formState.tags,
    spaceId: spaceDetail.spaceId
  }
  //提交请求
  update(params, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    message.success('修改成功')
    const picId = picture.value?.picId
    //执行跳转到图片详情页面
    router.push({
      path: `/picture_detail`,
      query: { picId }
    })
  }).catch(err => {
    message.error('修改失败')
  })
}

onMounted(() => {
  getTags()
  if (picId != null) {
    getDetail()
  }
  getSpaceDetail()
})

</script>
<style>
.upload-pic {
  padding: 70px;
}
</style>
