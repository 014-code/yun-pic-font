<template>
  <div id="picture-mager">
    <!--  上方表单  -->
    <div>
      <!--   搜索表单组件   -->
      <SearchForm
        :on-search="(formState: API.GetPictrueListParam) => { searchFormState = formState; getTableList(formState); }"></SearchForm>
      <div style="position: absolute; right: 0; margin-right: 30px">
        <a-button type="primary" style="margin-right: 20px" @click="toCreate()">创建图片</a-button>
        <a-button type="primary" @click="toCapture()">批量创建图片</a-button>
      </div>
    </div>
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
        <div style="display: flex; flex-wrap: wrap">
          <a-tag v-for="item in record.tags" :key="item">{{ item }}</a-tag>
        </div>
      </template>
      <!--   状态   -->
      <template #status="{ record }">
        <div style="display: flex;">
          <a-tag color="blue" v-if="record.status == '0'">待审核</a-tag>
          <a-tag color="green" v-else-if="record.status == '1'">审核通过</a-tag>
          <a-tag color="red" v-else>审核未通过</a-tag>
        </div>
      </template>
      <!--   操作   -->
      <template #operation="{ record }">
        <div style="display: flex; flex-wrap: wrap">
          <a-button type="link" @click="modal.picId = record.picId; modal.visible = true"
                    v-if="record.status == '0'">审核
          </a-button>
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
    <!--  弹出框  -->
    <a-modal v-model:visible="modal.visible" title="操作">
      <a-form-item label="原因">
        <a-input v-model:value="modal.reason" property="请输入原因"></a-input>
      </a-form-item>
      <template #footer>
        <div style="display: flex; text-align: center">
          <a-button type="primary" @click="reviewPic('1')">通过</a-button>
          <a-button danger type="primary" @click="reviewPic('2')">不通过</a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { useForm } from 'ant-design-vue/es/form'
import { allTags, del, list, review } from '@/api/picture.ts'
import router from '@/router'
import { formatSize } from '../../common'
import SearchForm from '@/component/SearchForm.vue'

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
    title: '状态',
    dataIndex: 'status',
    slots: { customRender: 'status' }
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

//子组件的搜索表单记录-是触发搜索过后获得的-其实不需要搞实时的
const searchFormState = reactive<API.GetPictrueListParam>({})

//弹出框数据
const modal = reactive({
  visible: false,
  reason: undefined,
  // status: undefined
  //当前选择图片id
  picId: 0
})

// 表格中数据
const data = ref([])

const formPage = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0
})

onMounted(() => {
  //获取图片列表信息
  getTableList(searchFormState)
})

/**
 * 跳转至创建图片
 */
function toCreate() {
  router.push('/upload_pic')
}

/**
 * 跳转至批量抓取图片
 */
function toCapture() {
  router.push('/capture_pic')
}


/**
 * 编辑图片
 * @param picId
 */
function edit(picId: number) {
  //todo 跳转到图片上传页，并回显数据
  // 从图片数据中获取spaceId
  const picture = data.value.find(item => item.picId === picId)
  const spaceId = picture?.spaceId

  router.push({
    path: `/upload_pic`,
    query: { picId, spaceId }
  })
}

/**
 * 审核图片
 * @param picId
 */
function reviewPic(status: string) {
  //请求
  const { picId, reason } = modal
  review({ picId, reason, status }).then(res => {
    message.success(res.msg)
    //关闭弹窗
    modal.visible = false
    //清空输入框
    modal.reason = undefined
    //更新列表数据
    getTableList(searchFormState)
  }).catch(err => {
    message.error(err.msg)
  })
}

/**
 * 获取图片表格数据
 */
function getTableList(formState: API.GetPictrueListParam) {
  const { pageNum, pageSize } = formPage
  list({
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
  del({ picId: pictureId }).then(res => {
    message.success(res.data.msg)
    getTableList(searchFormState)
  }).catch(err => {
    message.error(err.data.msg)
  })
}

// 页数大小变化处理
const onShowSizeChange = (current: number, size: number) => {
  formPage.pageNum = 1 // 重置到第一页
  formPage.pageSize = size
  getTableList(searchFormState)
}

/**
 * 改变分页
 */
function handlePageChange(page: number, pageSize: number) {
  formPage.pageNum = page
  formPage.pageSize = pageSize
  getTableList(searchFormState)
}

</script>

<style lang="scss">
#picture-mager {
  margin: 30px;
}
</style>
