<template>
  <!-- 创建空间页 -->
  <div class="create-space">
    <h1>创建空间</h1>
    <!--  表单  -->
    <a-form v-model="form" style="margin-top: 30px" :rules="rules">
      <a-form-item label="空间名称" name="spaceName">
        <a-input v-model:value="form.spaceName" property="请输入空间名称"></a-input>
      </a-form-item>
      <a-form-item label="空间级别" name="spaceLevel">
        <a-select v-model:value="form.spaceLevel" placeholder="请选择空间级别">
          <a-select-option v-for="item in categoryList" :key="item.type" :value="item.code">
            {{ item.type }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-button type="primary" style="width: 100%" @click="submit()" :loading="loading">提交
      </a-button>
    </a-form>
    <!--  空间级别介绍  -->
    <a-card title="空间级别" :bordered="true" style="margin-top: 30px">
      <p>* 用户目前仅支持使用普通版，如需升级空间请联系管理员</p>
      <p v-for="item in categoryList" :key="item.code">{{ item.type }}：大小
        {{ item.maxSize }} MB，数量 {{ item.maxCount }}</p>
    </a-card>
  </div>
</template>

<script setup lang="ts">

import { onMounted, reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { addSpace, type } from '@/api/space.ts'
import { useLoginUserStore } from '@/stores/counter.ts'

/**
 * 表单数据
 */
const form = reactive({
  spaceName: undefined,
  spaceLevel: undefined
})

const rules = {
  spaceName: [
    {
      required: true,
      message: '请输入空间名称',
      trigger: 'blur'  // 失焦时触发校验
    }
  ],
  spaceLevel: [
    {
      required: true,
      message: '请选择空间类型',
      trigger: 'blur'  // 失焦时触发校验
    }
  ]
}

//加载
const loading = ref(false)

//当前用户
const userInfo = useLoginUserStore()

//标签数据
const categoryList = ref<API.YunSpaceTypeVo[]>([])

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
 * 提交
 */
function submit() {
  const { userId } = userInfo.loginUser
  loading.value = true
  addSpace({ ...form, ...userId }).then(res => {
    message.success(res.msg)
    //跳转我的空间
  }).catch(err => {
    message.error(err.msg)
  }).finally(() => {
    loading.value = false
  })
}

onMounted(() => {
  //获取选项
  getTags()
})

</script>

<style scoped lang="scss">
.create-space {
  margin: 60px;
}
</style>
