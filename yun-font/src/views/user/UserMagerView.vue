<template>
  <div id="user-mager">
    <!--  上方表单  -->
    <a-form
      layout="inline"
      :model="formState"
      style="margin-bottom: 30px"
      :pagination="false"
      bordered
    >
      <a-form-item>
        <a-input v-model:value="formState.account" placeholder="请输入账号">
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input v-model:value="formState.userName" placeholder="请输入用户名">
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          @click="submit()"
          style="margin-right: 20px"
        >
          搜索
        </a-button>
        <a-button
          html-type="submit"
          @click="reset()"
        >
          重置
        </a-button>
      </a-form-item>
    </a-form>
    <a-table :columns="columns" :data-source="data" :pagination="false">
      <!--   头像   -->
      <template #avatar="{ record }">
        <a-image
          :width="60"
          :src="record.avatar">
        </a-image>
      </template>
      <!--   角色标签   -->
      <template #role="{ record }">
        <!--    管理员    -->
        <div v-if="record.role == 'admin'">
          <a-tag color="green">
            {{ '管理员' }}
          </a-tag>
        </div>
        <div v-else>
          <a-tag color="blue">
            {{ '用户' }}
          </a-tag>
        </div>
      </template>
      <!--   操作   -->
      <template #operation="{ record }">
        <div>
          <a-button type="primary" danger @click="delUsers(record.userId)">删除</a-button>
        </div>
      </template>
    </a-table>
    <div style="display: flex; margin-top: 30px">
      <!-- 总条数显示 -->
      <span class="total-text" style="margin-top: 8px">共 {{ formPage.total }} 条</span>
      <a-pagination
        :show-size-changer="true"
        v-model:current="formPage.pageNum"
        :total="formPage.total"
        :pageSize="formPage.pageSize"
        @showSizeChange="onShowSizeChange"
        @change="handlePageChange"
        :pageSizeOptions="[5, 10, 20, 30]"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { delUser, listUser } from '@/api/user.ts'
import { message } from 'ant-design-vue'
import { useForm } from 'ant-design-vue/es/form'

// 列数据
const columns = [
  {
    title: '用户昵称',
    // 对应表格数据名称
    dataIndex: 'userName',
    align: 'center',
    slots: { customRender: 'userName' }
  },
  {
    title: '账号',
    dataIndex: 'account',
    align: 'center',
    slots: { customRender: 'account' }
  },
  {
    title: '头像',
    dataIndex: 'avatar',
    align: 'center',
    slots: { customRender: 'avatar' }
  },
  {
    title: '角色',
    dataIndex: 'role',
    align: 'center',
    slots: { customRender: 'role' }
  },
  {
    title: '简介',
    dataIndex: 'profile',
    align: 'center',
    slots: { customRender: 'profile' }
  },
  {
    title: '操作',
    dataIndex: 'operation',
    align: 'center',
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

const formState = reactive({
  account: undefined,
  userName: undefined
})

const { resetFields, validate, validateInfos, mergeValidateInfo } = useForm(formState, undefined)

onMounted(() => {
  //获取用户列表信息
  getTableList()
})

/**
 * 获取用户表格数据
 */
function getTableList() {
  const { pageNum, pageSize } = formPage

  listUser({
    ...formState,
    pageNum,
    pageSize
  }).then(res => {
    data.value = res.rows
    formPage.total = res.total
  }).catch(err => {
    message.success(err.data.msg)
  })
}

/**
 * 删除用户方法
 */
function delUsers(userId: number) {
  console.log(userId)
  delUser({ userId }).then(res => {
    getTableList()
    message.success(res.data.msg)
  }).catch(err => {
    message.error(err.data.msg)
  })
}

// 页数大小变化处理
const onShowSizeChange = (current, size: number) => {
  formPage.pageNum = 1 // 重置到第一页
  formPage.pageSize = size
  getTableList()
}

/**
 * 改变分页
 */
function handlePageChange(page, pageSize) {
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
#user-mager {
  margin: 30px;
}
</style>

