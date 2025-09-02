<template>
  <!-- 以图搜图界面 -->
  <div class="pic-search">
    <h2 class="spaces">以图搜图</h2>
    <h3 class="spaces">原图</h3>
    <a-image
      :width="200"
      :src="picDetail.url"
    />
    <h3 class="spaces">识图结果</h3>
    <a-list :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6 }" :data-source="picList"
            :loading="loading">
      <template #renderItem="{ item }">
        <a-list-item style="padding: 0">
          <a-card :title="item.name" class="home-card">
            <template #cover>
              <img style="height: 180px; object-fit: cover" alt="图片损坏"
                   :src="item.imgUrl ?? item.url" loading="lazy" />
            </template>
          </a-card>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script setup lang="ts">

import { type LocationQueryValue, useRoute } from 'vue-router'
import { detail, search } from '@/api/picture.ts'
import { onMounted, reactive, ref } from 'vue'
import { message } from 'ant-design-vue'

const route = useRoute()

//路径的图片id
const picId = route.query.picId
//图片详情
const picDetail = ref<API.YunPictureVo>({})
//相似图列表
const picList = ref([])
//加载效果
const loading = ref(false)

/**
 * 查询图片详情
 */
function getDetail() {
  detail({ picId }).then(res => {
    picDetail.value = res.data.yunPicture
  }).catch(err => {
    message.error(err.msg)
  })
}

/**
 * 以图搜图
 */
function picSearch() {
  loading.value = true
  search({ picId }).then(res => {
    picList.value = res.data
  }).catch(err => {
    message.error(err.msg)
  }).finally(() => {
    loading.value = false
  })
}

onMounted(() => {
  getDetail()
  picSearch()
})

</script>

<style scoped lang="scss">
.pic-search {
  margin: 30px;
}

.home-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.home-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.spaces {
  margin: 10px;
}
</style>
