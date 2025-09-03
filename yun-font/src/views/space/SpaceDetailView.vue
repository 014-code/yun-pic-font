<template>
  <!-- 空间详情页 -->
  <div class="home-view">
    <div style="margin: 20px">
      <!--   空间名称   -->
      <h1 style="float: left">{{ spaceDetail.spaceName }}</h1>
      <div style="float: right">
        <!--   创建图片   -->
        <a-button type="primary" @click="toCreate(spaceDetail.spaceId)" style="margin-right: 20px;">
          创建图片
        </a-button>
        <!--   空间容量   -->
        <a-progress type="circle" :percent="progressPercent" :size="40" />
      </div>
    </div>
    <a-space>
      <!--   搜索表单组件   -->
      <SearchForm style="margin-top: 10px;"
                  :on-search="(formState: API.GetPictrueListParam) => { searchFormState = formState; getPicList(formState); }">
      </SearchForm>
    </a-space>
    <!-- 按颜色搜索 -->
    <a-form-item label="按颜色搜索" style="margin-top: 16px">
      <color-picker format="hex" @pureColorChange="onColorChange" />
    </a-form-item>
    <a-list :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6 }" :data-source="picData"
            style="margin-top: 80px;">
      <template #renderItem="{ item }">
        <a-list-item style="padding: 0">
          <a-card :title="item.name" class="home-card" @click="toDetail(item.picId)">
            <template #cover>
              <img style="height: 180px; object-fit: cover" alt="图片损坏"
                   :src="item.thumbnailUrl ?? item.url"
                   loading="lazy" />
            </template>
            <div>
              <div>{{ item.category }}</div>
              <a-tag v-for="tag in item.tags" :key="tag" color="green">{{ tag }}</a-tag>
            </div>
            <!--      操作选项     -->
            <template #actions>
              <div @click.stop="share(item.url)">分享</div>
              <div @click.stop="picSearch(item.picId)">以图搜图</div>
              <div @click.stop="edit(item.picId)">修改</div>
              <div @click.stop="deletePic(item.picId)">删除</div>
            </template>
          </a-card>
        </a-list-item>
      </template>
    </a-list>
    <!--  分享弹窗组件  -->
    <Share ref="shareRef" :title="'分享图片'" :link="picUrl"></Share>
    <!--  图片总数  -->
    <span>图片总数 {{ spaceDetail.totalCount }} / {{ spaceDetail.maxCount }}</span>
    <a-pagination :show-size-changer=" false
          " v-model:current="formPage.pageNum"
                  :total="formPage.total"
                  :pageSize="formPage.pageSize" @change="handlePageChange" />
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, reactive, ref } from 'vue'
import { allTags, del, listVo, search, searchByColor } from '@/api/picture.ts'
import { message } from 'ant-design-vue'
import router from '@/router'
import ACCESS_ENUM from '@/types/enum/accessEnum.ts'
import { useRoute } from 'vue-router'
import { detail } from '@/api/space.ts'
import SearchForm from '@/component/SearchForm.vue'
import Share from '@/component/Share.vue'
//图片数据
const picData = ref([])
//空间详情
const spaceDetail = ref({})
const route = useRoute()
const spaceId = route.query.spaceId
//从子组件拿到的搜索表单数据-记录
const searchFormState = reactive<API.GetPictrueListParam>({})
//分页
const formPage = reactive({
  pageNum: 1,
  pageSize: 30,
  total: 0
})

//弹窗ref
const shareRef = ref()

//选中分享的图片地址
const picUrl = ref<string>('')

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
function getPicList(formState: API.GetPictrueListParam) {
  console.log('formPage当前值:', formPage)

  // 确保pageNum有正确的值
  if (!formPage.pageNum || formPage.pageNum <= 0) {
    formPage.pageNum = 1
  }

  const { pageNum, pageSize } = formPage
  console.log('解构后的pageNum:', pageNum, 'pageSize:', pageSize)

  const spaceIdNum = spaceId ? Number(spaceId) : undefined

  // 过滤掉formState中的分页参数，避免覆盖
  const { pageNum: _, pageSize: __, ...searchParams } = formState

  const body: API.GetPictrueListParam = {
    pageNum,
    pageSize,
    spaceId: spaceIdNum,
    ...searchParams
  }
  console.log('API参数:', body)
  listVo(body).then(res => {
    picData.value = res.rows || []
    formPage.total = res.total || 0
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
 * 颜色改变时搜索
 */
function onColorChange(color: string) {
  const spaceId = spaceDetail.value.spaceId
  //调用颜色搜索接口
  searchByColor({ spaceId, color }).then(res => {
    picData.value = res.data
  }).catch(err => {
    message.error('颜色搜索失败' + err.msg)
  })
}

/**
 * 分享图片方法
 */
function share(url: string) {
  //传值给url
  picUrl.value = url
  console.log('啦啦啦啦啦啦啦啦啦啦')
  nextTick(() => {
    if (shareRef.value) {
      shareRef.value.openModel()
    }
  })
}

/**
 * 删除方法
 */
function deletePic(picId: number) {
  del({ picId: picId }).then(res => {
    message.success(res.msg)
  }).catch(err => {
    message.success(err.msg)
  })
  //刷新数据
  getPicList(searchFormState)
}

const progressPercent = computed(() => {
  if (!spaceDetail.value) return 0

  const { totalSize, maxSize } = spaceDetail.value

  if (maxSize === 0) return 0 // 避免除以零

  const percent = (totalSize / maxSize) * 100
  return parseFloat(percent.toFixed(1)) // 保留一位小数，返回 number 类型
})

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
 * 跳转以图搜图
 * @param picId
 */
function picSearch(picId: number) {
  //跳转至以图搜图界面
  router.push({
    path: '/pic_search',
    query: { picId }
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
  console.log('空间' + spaceDetail.value)
}

/**
 * 改变分页
 */
function handlePageChange(page: number, pageSize: number) {
  formPage.pageNum = page
  formPage.pageSize = pageSize
  getPicList(searchFormState)
}

onMounted(() => {
  getPicList(searchFormState)
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
