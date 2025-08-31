<template>
  <!-- 空间详情页 -->
  <div class="home-view">
    <div style="margin: 20px">
      <!--   空间名称   -->
      <h1 style="float: left">{{ spaceDetail.spaceName }}</h1>
      <div style="float: right">
        <!--   创建图片   -->
        <a-button type="primary" @click="toCreate(spaceDetail.spaceId)" style="margin-right: 20px;">创建图片</a-button>
        <!--   空间容量   -->
        <a-progress type="circle" :percent="progressPercent" :size="40" />
      </div>
    </div>
    <a-list :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6 }" :data-source="picData" style="margin-top: 80px;">
      <template #renderItem="{ item }">
        <a-list-item style="padding: 0">
          <a-card :title="item.name" class="home-card" @click="toDetail(item.picId)">
            <template #cover>
              <img style="height: 180px; object-fit: cover" alt="图片损坏" :src="item.thumbnailUrl ?? item.url"
                loading="lazy" />
            </template>
            <div>
              <div>{{ item.category }}</div>
              <a-tag v-for="tag in item.tags" :key="tag" color="green">{{ tag }}</a-tag>
            </div>
            <!--      操作选项     -->
            <template #actions>
              <div @click.stop="edit(item.picId)">修改</div>
              <div @click.stop="deletePic(item.picId)">删除</div>
            </template>
          </a-card>
        </a-list-item>
      </template>
    </a-list>
    <!--  图片总数  -->
    <span>图片总数 {{ spaceDetail.totalCount }} / {{ spaceDetail.maxCount }}</span>
    <a-pagination :show-size-changer="false" v-model:current="formPage.pageNum" :total="formPage.total"
      :pageSize="formPage.pageSize" @change="handlePageChange" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { allTags, del, listVo } from '@/api/picture.ts'
import { message } from 'ant-design-vue'
import router from '@/router'
import ACCESS_ENUM from '@/types/enum/accessEnum.ts'
import { useRoute } from 'vue-router'
import { detail } from '@/api/space.ts'
//图片数据
const picData = ref([])
//空间详情
const spaceDetail = ref({})
const route = useRoute()
const spaceId = route.query.spaceId
//分页
const formPage = reactive({
  pageNum: 1,
  pageSize: 30,
  total: 0
})
function getListVo() {
  const { pageNum, pageSize } = formPage
  const params = { pageNum, pageSize, spaceId }
  listVo(params).then(res => {
    picData.value = res.rows
    formPage.total = res.total
  }).catch(err => {
    message.error(err.msg)
  })
}


/**
 * 获取图片数据
 */
function getPicList() {
  const { pageNum, pageSize } = formPage
  const params = { pageNum, pageSize, spaceId }
  console.log('API参数:', params)
  listVo(params).then(res => {
    picData.value = res.rows
    formPage.total = res.total
  }).catch(err => {
    message.error(err.msg)
  })
}

/**
 * 跳转编辑
 */
function edit(picId: number) {
  //跳转至编辑页
  router.push({
    path: `/upload_pic`,
    query: { picId, spaceId }
  })
}

/**
 * 删除方法
 */
function deletePic(picId: number) {
    del({picId: picId}).then(res => {
      message.success(res.msg)
    }).catch(err => {
      message.success(err.msg)
    })
  //刷新数据
  getPicList()
}

const progressPercent = computed(() => {
  if (!spaceDetail.value) return 0;

  const { totalSize, maxSize } = spaceDetail.value;

  if (maxSize === 0) return 0; // 避免除以零

  const percent = (totalSize / maxSize) * 100;
  return parseFloat(percent.toFixed(1)); // 保留一位小数，返回 number 类型
});

/**
 * 创建图片
 */
function toCreate(spaceId: number) {
  router.push({
    path: '/upload_pic',
    query: { spaceId: spaceId }
  })
}

/**
 * 进入详情
 * @param picId
 */
function toDetail(picId: number) {
  router.push({
    path: 'picture_detail',
    query: { picId }
  })
}

/**
 * 查询空间详情
 */
function getSpaceDetail() {
  detail({ spaceId: spaceId }).then(res => {
    spaceDetail.value = res.data.yunSpace
  }).catch(err => {
    message.error(err.msg)
  })
  console.log("空间" + spaceDetail.value)
}

/**
 * 改变分页
 */
function handlePageChange(page: number, pageSize: number) {
  formPage.pageNum = page
  formPage.pageSize = pageSize
  getPicList()
}

onMounted(() => {
  getPicList()
  getSpaceDetail()
})


</script>

<style scoped lang="scss">
.home-view {
  padding: 20px;
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
</style>
