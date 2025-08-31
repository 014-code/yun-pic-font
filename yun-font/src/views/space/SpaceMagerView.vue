<template>
  <div id="space-mager">
    <!--  上方表单  -->
    <a-form layout="inline" :model="formState" style="margin-bottom: 30px" :pagination="false"
            bordered>
      <a-form-item>
        <a-input v-model:value="formState.spaceName" placeholder="请输入空间名称">
        </a-input>
      </a-form-item>
      <a-form-item label="分类">
        <a-select v-model:value="formState.spaceLevel" placeholder="请选择空间级别">
          <a-select-option v-for="item in categoryList" :key="item.type" :value="item.code">
            {{ item.type
            }}
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
      <div style="position: absolute; right: 0; margin-right: 30px">
        <a-button type="primary" style="margin-right: 20px" @click="toCreate()">创建空间</a-button>
      </div>
    </a-form>
    <a-table :columns="columns" :data-source="data" :pagination="false">
      <!--   空间   -->
      <template #picInfo="{ record }">
        <div>空间容量：{{ record.totalSize }} / {{ record.maxSize }} MB</div>
        <div>空间图片数：{{ record.totalCount }} / {{ record.maxCount }}</div>
      </template>
      <!--   标签   -->
      <template #spaceLevel="{ record }">
        <div style="display: flex; flex-wrap: wrap">
          <a-tag>{{ record.spaceLevel }}</a-tag>
        </div>
      </template>
      <!--   操作   -->
      <template #operation="{ record }">
        <div style="display: flex; flex-wrap: wrap">
          <a-button type="text" @click="edit(record.spaceId)">编辑</a-button>
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
    <a-modal v-model:visible="modal.visible" title="编辑空间">
      <a-form-item label="空间名称">
        <a-input v-model:value="modal.spaceName" property="请输入空间名称"></a-input>
      </a-form-item>
      <a-form-item label="空间级别">
        <a-select v-model:value="modal.spaceLevel" placeholder="请选择空间级别">
          <a-select-option v-for="item in categoryList" :key="item.type" :value="item.code">
            {{ item.type }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <template #footer>
        <div style="display: flex; text-align: center">
          <a-button type="primary" @click="submitEdit()">确定</a-button>
          <a-button danger type="primary" @click="modal.visible = false">取消</a-button>
        </div>
      </template>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { useForm } from 'ant-design-vue/es/form'
import { type, del, list, update } from '@/api/space.ts'
import router from '@/router'
import { formatSize } from '../../common'

// 列数据
const columns = [
  {
    title: '空间id',
    dataIndex: 'spaceId'
  },
  {
    title: '空间名称',
    dataIndex: 'spaceName',
    slots: { customRender: 'spaceName' }
  },
  {
    title: '空间类型',
    dataIndex: 'spaceLevel',
    slots: { customRender: 'spaceLevel' }
  },
  {
    title: '空间信息',
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

//弹出框数据
const modal = reactive({
  visible: false,
  spaceName: undefined,
  spaceLevel: undefined,
  //当前选择空间id
  spaceId: 0
})

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
  spaceName: undefined,
  spaceLevel: undefined
})

const { resetFields, validate, validateInfos, mergeValidateInfo } = useForm(formState, undefined)

//所有分类信息
const categoryList = ref<API.YunSpaceTypeVo[]>([])

onMounted(() => {
  //获取空间列表信息
  getTableList()
  getTags()
})

/**
 * 获取所有标签
 */
function getTags() {
  type().then(res => {
    categoryList.value = res.data
  }).catch(err => {
    message.error('获取类别失败')
  })
}

/**
 * 创建空间
 */
function toCreate() {
  router.push({
    path: "/create_space"
  })
}

/**
 * 提交编辑表单
 */
function submitEdit() {
  //解构
  const { spaceName, spaceId, spaceLevel } = modal
  //请求
  update({ spaceName, spaceId, spaceLevel }).then(res => {
    message.success(res.msg)
  }).catch(err => {
    message.error(err.msg)
  })
  //关闭弹窗
  modal.visible = false
  //刷新数据
  getTableList()
  //清除表单
  cleanModal()
}

/**
 * 清除模态框方法
 */
function cleanModal() {
  modal.spaceName = undefined
  modal.spaceId = 0
  modal.spaceLevel = undefined
}


/**
 * 编辑空间
 * @param picId
 */
function edit(spaceId: number) {
  //选中
  modal.spaceId = spaceId
  //弹出
  modal.visible = true
}

/**
 * 获取空间表格数据
 */
function getTableList() {
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
 * 删除空间方法
 */
function delUser(spaceId: number) {
  del({ picId: spaceId }).then(res => {
    message.success(res.data.msg)
    getTableList()
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
#space-mager {
  margin: 30px;
}
</style>
