<template>
  <div class="upload-pic">
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
import { allTagsUsingGet, detailUsingGet, updateUsingPut } from '@/api/picture.ts'
import { useRoute } from 'vue-router'
import router from '@/router'
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

const picId = route.query.picId
/**
 * 加载图片
 */
function onSuccess(newPicture: API.YunPictureVo) {
  picture.value = newPicture
  //填充默认名称
  formState.name = newPicture.name
}

/**
 * 获取所有标签
 */
function getTags() {
  allTagsUsingGet().then(res => {
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
  detailUsingGet({picId}).then(res => {
    formState.name = res.data.yunPicture.name
    formState.introduction = res.data.yunPicture.introduction
    formState.category = res.data.yunPicture.category
    formState.tags = JSON.parse(res.data.yunPicture.tags)
    // 创建一个新的对象并赋值给 picture.value 以触发重新渲染
    picture.value = {
      ...res.data.yunPicture,
      url: res.data.yunPicture.url
    }
    console.log(picture.value.url)
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
    tags: formState.tags
  }

  //提交请求
  updateUsingPut(params, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    message.success('修改成功')
    //执行跳转到图片详情页面
    //todo 图片详情页面和主页进入图片详情一样
    router.push({
      path: `/picture-manger`,
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
})

</script>
<style>
.upload-pic {
  padding: 70px;
}
</style>
