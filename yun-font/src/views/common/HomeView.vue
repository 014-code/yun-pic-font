<template>
  <!-- 主页 -->
  <div class="home-view">
    <div style="margin: 20px">
      <a-input-search
        v-model:value="formState.name"
        placeholder="请输入"
        enter-button
        @search="onSearch"
        style="width: 100%;"
      />
      <!--    上方菜单   -->
      <a-menu :selected-keys="formState.category ? [formState.category] : []" mode="horizontal"
              @click="(e) => menuClick(e, 'category')"
              :items="fullMenus">
      </a-menu>
      <!--    上方标签栏    -->
      <a-menu :selected-keys="formState.tags" mode="horizontal" @click="(e) => menuClick(e, 'tag')"
              :items="tagMenus">
      </a-menu>
    </div>
    <a-list :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6 }" :data-source="picData">
      <template #renderItem="{ item }">
        <a-list-item style="padding: 0">
          <a-card :title="item.name" class="home-card" @click="toDetail(item.picId)">
            <template #cover>
              <img style="height: 180px; object-fit: cover" alt="图片损坏"
                   :src="item.thumbnailUrl ?? item.url" loading="lazy" />
            </template>
            <div>
              <div>{{ item.category }}</div>
              <a-tag v-for="tag in item.tags" :key="tag" color="green">{{ tag }}</a-tag>
            </div>
          </a-card>
        </a-list-item>
      </template>
    </a-list>
    <a-pagination :show-size-changer="false" v-model:current="formPage.pageNum"
                  :total="formPage.total"
                  :pageSize="formPage.pageSize"
                  @change="handlePageChange"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { allTags, listVo } from '@/api/picture.ts'
import { message } from 'ant-design-vue'
import router from '@/router'
import ACCESS_ENUM from '@/types/enum/accessEnum.ts'
//图片数据
const picData = ref([])
//菜单数据
const tagMenus: any = ref([])
//菜单数据
const fullMenus: any = ref([])
//分页
const formPage = reactive({
  pageNum: 1,
  pageSize: 30,
  total: 0
})

/**
 * 搜索表单
 */
const formState = reactive({
  name: undefined,
  introduction: undefined,
  category: undefined,
  tags: []
})

/**
 * 菜单点击方法-不能直接拿组件方法里面的值，得结构确定是哪个
 */
function menuClick({ key }: { key: string }, type: string) {
  console.log('菜单点击:', { key, type })
  // 更新表单状态
  if (type === 'category') {
    if (formState.category === key) {
      // 如果点击的是已选中的分类，取消选择
      formState.category = ''
    } else {
      formState.category = key
    }
    // 清空标签选择
    formState.tags = []
  } else if (type === 'tag') {
    // 处理标签多选
    const tagIndex = formState.tags.indexOf(key)
    if (tagIndex > -1) {
      // 如果标签已选中，则移除
      formState.tags.splice(tagIndex, 1)
    } else {
      // 如果标签未选中，则添加
      formState.tags.push(key)
    }
    // 清空分类选择
    formState.category = ''
  }

  // 重置页码
  formPage.pageNum = 1

  const { pageNum, pageSize } = formPage
  const params = { pageNum, pageSize, ...formState }
  console.log('API参数:', params)
  listVo(params).then(res => {
    picData.value = res.rows
    formPage.total = res.total
  }).catch(err => {
    message.error(err.msg)
  })
}

/**
 * 搜索资源
 */
function onSearch() {
  const { pageNum, pageSize } = formPage
  const params = { pageNum, pageSize, ...formState }
  console.log('API参数:', params)
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
  const params = { pageNum, pageSize, ...formState }
  console.log('API参数:', params)
  listVo(params).then(res => {
    picData.value = res.rows
    formPage.total = res.total
  }).catch(err => {
    message.error(err.msg)
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
 * 改变分页
 */
function handlePageChange(page: number, pageSize: number) {
  formPage.pageNum = page
  formPage.pageSize = pageSize
  getPicList()
}

/**
 * 获取所有标签
 */
function getTags() {
  allTags().then(res => {
    console.log('API返回数据:', res)
    if (res.data.category) {
      console.log('分类数据:', res.data.category)
      fullMenus.value = res.data.category.map(rd => ({
        label: rd,
        value: rd
      }))
      console.log('分类菜单数据:', fullMenus.value)
    }
    if (res.data.tags) {
      console.log('标签数据:', res.data.tags)
      tagMenus.value = res.data.tags.map(rd => ({
        label: rd,
        value: rd
      }))
      console.log('标签菜单数据:', tagMenus.value)
    }
  }).catch(err => {
    message.error('获取标签和类别失败')
  })
}

onMounted(() => {
  getPicList()
  getTags()
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
