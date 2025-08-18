<template>
  <div id="user-mager">
    <a-table :columns="columns" :data-source="data" >
      <!--   角色标签   -->
      <template #role="{ record }">
      <!--    管理员    -->
      <div v-if="record.role == 'admin'">
        <a-tag color="green">
          {{ record.role }}
        </a-tag>
      </div>
      <div v-else>
        <a-tag color="blue">
          {{ record.role }}
        </a-tag>
      </div>
      </template>
      <!--   操作   -->
      <template #operation="{ record }">
          <div>
            <a-button type="primary" danger @click="delUser(record.userId)">删除</a-button>
          </div>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { delUserUsingDelete, listUserUsingPost } from '@/api/user.ts'
import { message } from 'ant-design-vue'
// 列数据
const columns = [
  {
    title: '用户昵称',
    // 对应表格数据名称
    dataIndex: 'userName',
    align: "center",
    slots: { customRender: 'userName' }
  },
  {
    title: '账号',
    dataIndex: 'account',
    align: "center",
    slots: { customRender: 'account' }
  },
  {
    title: '头像',
    dataIndex: 'avatar',
    align: "center",
    slots: { customRender: 'avatar' }
  },
  {
    title: '角色',
    dataIndex: 'role',
    align: "center",
    slots: { customRender: 'role' }
  },
  {
    title: '简介',
    dataIndex: 'profile',
    align: "center",
    slots: { customRender: 'profile' }
  },
  {
    title: '操作',
    dataIndex: 'operation',
    align: "center",
    slots: { customRender: 'operation' }
  },
];

// 表格中数据
const data = ref(
  [
    {
      userId: '1',
      userName: '胡彦斌',
      account: 32,
      avatar: '西湖区湖底公园1号',
      role: 'admin',
      profile: '很懒'
    },
    {
      userId: '2',
      userName: '吴耀祖',
      account: 32,
      avatar: '西湖区湖底公园2号',
      role: 'user',
      profile: '很懒'
    },
  ]
);

const formState = reactive({
  pageNum: 1,
  pageSize: 10,
})

onMounted(() => {
  //获取用户列表信息
  // getTableList();
})

/**
 * 获取用户表格数据
 */
function getTableList() {
  listUserUsingPost(formState).then(res => {
    data.value = res.data.rows
  }).catch(err => {
    message.success(err.data.msg)
  })
}

/**
 * 删除用户方法-todo-userId哪里拿像element那样直接用插槽里面的{}拿吗?
 */
function delUser(userId: number) {
  delUserUsingDelete(userId).then(res => {
    message.success(res.data.msg)
  }).catch(err => {
    message.error(err.data.msg)
  })
}
</script>

<style lang="scss">
  #user-mager {
    margin: 30px;
  }
</style>

