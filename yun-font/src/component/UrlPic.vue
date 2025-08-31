<template>
  <div class="upload-pic">
    <!--  上传  -->
    <h1>根据URL上传图片</h1>
    <a-input-group compact>
      <a-input v-model:value="url" style="width: calc(100% - 200px)" />
      <a-button type="primary" :loading="loading" @click="urlUpload()" style="width: 200px">上传
      </a-button>
    </a-input-group>
    <div v-if="picture || picId">
      <!--   图片   -->
      <div style="text-align: center">
        <a-image :width="200" :src="picture.url" />
      </div>
      <!--  下方输入表单  -->
      <a-form :model="formState" style="margin-top: 30px">
        <a-form-item label="名称">
          <a-input v-model:value="formState.name" placeholder="请输入名称"></a-input>
        </a-form-item>
        <a-space></a-space>
        <a-form-item label="简介">
          <a-input v-model:value="formState.introduction" type="textarea"
                   placeholder="请输入简介"></a-input>
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
import {
  allTags,
  detail,
  update,
  uploadPicUrl
} from '@/api/picture.ts'
import { useRoute } from 'vue-router'
import router from '@/router'
//图片信息
const picture = ref<API.YunPictureVo>()
//url
const url = ref('')
//加载状态
const loading = ref<Boolean>(false)
//所有分类信息
const categoryList = ref([])
//所有标签信息
const tagsList = ref([])
//表单
const formState = reactive({
  name: '' as string | undefined,
  introduction: '' as string | undefined,
  category: '' as string | undefined,
  tags: [] as string[] | undefined
})

const route = useRoute()

const picId = route.query.picId

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
 * url上传图片
 */
function urlUpload() {
  loading.value = true
  uploadPicUrl({ file: url.value }).then(res => {
    // 设置完整的图片信息
    picture.value = {
      url: res.data.url,
      picId: res.data.picId
    }
    // 设置表单默认值
    formState.name = res.data.name || ''
    formState.introduction = res.data.introduction || ''
    formState.category = res.data.category || ''
    formState.tags = res.data.tags || []
    message.success('图片上传成功！')
  }).catch(err => {
    message.error(err.msg)
  }).finally(() => {
    loading.value = false
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
    tags: formState.tags
  }

  //提交请求
  update(params, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    message.success('修改成功')
    //执行跳转到图片详情页面
    //todo 图片详情页面和主页进入图片详情一样
    router.push({
      path: `/picture-manger`
    })
  }).catch(err => {
    message.error('修改失败')
  })
}

onMounted(() => {
  getTags()
})

</script>
<style>
.upload-pic {
  padding: 50px 70px 70px 70px;
}
</style>
