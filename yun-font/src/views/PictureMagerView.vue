<template>
  <div id="picture-mager">
    <!--  上方表单  -->
    <a-form layout="inline" :model="formState" style="margin-bottom: 30px" :pagination="false"
            bordered>
      <a-form-item>
        <a-input v-model:value="formState.name" placeholder="请输入名称">
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input v-model:value="formState.introduction" placeholder="请输入简介">
        </a-input>
      </a-form-item>
      <a-form-item label="分类">
        <a-select v-model:value="formState.category" placeholder="请选择分类">
          <a-select-option v-for="item in categoryList" :key="item" :value="item">{{ item }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="标签" placeholder="请选择标签">
        <a-select mode="tags" v-model:value="formState.tags">
          <a-select-option v-for="item in tagsList" :key="item" :value="item">{{ item }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" @click="submit()" style="margin-right: 20px">
          搜索
        </a-button>
        <a-button html-type="submit" @click="reset()">
          重置
        </a-button>
      </a-form-item>
    </a-form>
    <a-table :columns="columns" :data-source="data" :pagination="false">
      <!--   图片   -->
      <template #url="{ record }">
        <a-image :width="60" :src="record.url">
        </a-image>
      </template>
      <template #picInfo="{ record }">
        <div>图片格式：{{ record.picFormat }}</div>
        <div>图片高度：{{ record.picHeight }} px</div>
        <div>图片宽度：{{ record.picWidth }} px</div>
        <div>图片宽高比：{{ record.picScale }} px</div>

        <div>图片大小：{{ formatSize(record.picSize) }}</div>
      </template>
      <!--   标签   -->
      <template #tags="{ record }">
        <div style="display: flex;">
          <a-tag v-for="item in record.tags" :key="item">{{ item }}</a-tag>
        </div>
      </template>
      <!--   操作   -->
      <template #operation="{ record }">
        <div style="display: flex">
          <a-button type="text" @click="edit(record.picId)">编辑</a-button>
          <a-button type="primary" danger @click="delUser(record.picId)">删除</a-button>
        </div>
      </template>
    </a-table>
    <div style="display: flex; margin-top: 30px">
      <!-- 总条数显示 -->
      <span class="total-text" style="margin-top: 8px">共 {{ formPage.total }} 条</span>
      <a-pagination :show-size-changer="true" v-model:current="formPage.pageNum"
                    :total="formPage.total"
                    :pageSize="formPage.pageSize" @showSizeChange="onShowSizeChange"
                    @change="handlePageChange"
                    :pageSizeOptions="[5, 10, 20, 30]" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { useForm } from 'ant-design-vue/es/form'
import { allTagsUsingGet, delUsingDelete, listUsingPost } from '@/api/picture.ts'
import router from '@/router'
import { formatSize } from '../common'

// 列数据
const columns = [
  {
    title: '图片id',
    dataIndex: 'picId'
  },
  {
    title: '图片',
    dataIndex: 'url',
    slots: { customRender: 'url' }
  },
  {
    title: '名称',
    dataIndex: 'name'
  },
  {
    title: '简介',
    dataIndex: 'introduction',
    ellipsis: true
  },
  {
    title: '类型',
    dataIndex: 'category'
  },
  {
    title: '标签',
    dataIndex: 'tags',
    slots: { customRender: 'tags' }
  },
  {
    title: '图片信息',
    dataIndex: 'picInfo',
    slots: { customRender: 'picInfo' }
  },
  {
    title: '用户 id',
    dataIndex: 'userId',
    width: 80
  },
  {
    title: '创建时间',
    dataIndex: 'createTime'
  },
  {
    title: '编辑时间',
    dataIndex: 'updateTime'
  },
  {
    title: '操作',
    key: 'operation',
    slots: { customRender: 'operation' }
  }
]

// 表格中数据
const data = ref([])

const formPage = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0
})

/**
 * 搜索表单
 */
const formState = reactive({
  name: undefined,
  introduction: undefined,
  category: undefined,
  tags: undefined
})

const { resetFields, validate, validateInfos, mergeValidateInfo } = useForm(formState, undefined)

//所有分类信息
const categoryList = ref([])
//所有标签信息
const tagsList = ref([])

onMounted(() => {
  //获取图片列表信息
  getTableList()
  getTags()
})

/**
 * 获取所有标签
 */
function getTags() {
  allTagsUsingGet().then(res => {
    categoryList.value = res.data.category
    tagsList.value = res.data.tags
    console.log(tagsList.value)
  }).catch(err => {
    message.error('获取标签和类别失败')
  })
}

function edit(picId: number) {
  //todo 跳转到图片上传页，并回显数据
  router.push({
    path: `/upload_pic`,
    query: { picId }
  })
}

/**
 * 获取图片表格数据
 */
function getTableList() {
  const { pageNum, pageSize } = formPage
  listUsingPost({
    ...formState,
    pageNum,
    pageSize
  }).then(res => {
    // 对每条记录的tags字段进行JSON解析
    const rows = res.rows.map(row => {
      if (row.tags && typeof row.tags === 'string') {
        row.tags = JSON.parse(row.tags)
      }
      return row
    })
    data.value = rows
    formPage.total = res.total
  }).catch(err => {
    message.success(err.data.msg)
  })
}

/**
 * 删除图片方法
 */
function delUser(pictureId: number) {
  delUsingDelete({ picId: pictureId }).then(res => {
    getTableList()
    message.success(res.data.msg)
  }).catch(err => {
    message.error(err.data.msg)
  })
}

// 页数大小变化处理
const onShowSizeChange = (current: number, size: number) => {
  formPage.pageNum = 1 // 重置到第一页
  formPage.pageSize = size
  getTableList()
}

/**
 * 改变分页
 */
function handlePageChange(page: number, pageSize: number) {
  formPage.pageNum = page
  formPage.pageSize = pageSize
  getTableList()
}


/**
 * 提交搜索表单
 */
function submit() {
  getTableList()
}

/**
 * 重置表单
 */
function reset() {
  resetFields()
  //重新请求
  getTableList()
}
</script>

<style lang="scss">
#picture-mager {
  margin: 30px;
}
</style>
