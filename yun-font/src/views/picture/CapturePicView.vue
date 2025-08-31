<template>
  <!-- 创建图片页 -->
  <div class="capture-pic">
    <div style="text-align: center; font-size: 30px; font-weight: bold">批量创建图片</div>
    <!--  下方输入表单  -->
    <a-form :model="formState" style="margin: 30px">
      <a-form-item>
        <div style="margin-bottom: 20px">搜索词</div>
        <a-input v-model:value="formState.text" placeholder="请输入搜索词"></a-input>
      </a-form-item>
      <a-space></a-space>
      <a-form-item>
        <div style="margin-bottom: 20px">抓取数量</div>
        <a-input-number style="width: 100%" max="50" min="1" v-model:value="formState.num"
                        placeholder="请输入抓取数量"></a-input-number>
      </a-form-item>
      <a-space></a-space>
      <a-form-item>
        <div style="margin-bottom: 20px">图片前缀</div>
        <a-input v-model:value="formState.prefix"
                 placeholder="请输入图片前缀，会自动补充序号"></a-input>
      </a-form-item>
      <a-space></a-space>
      <a-form-item>
        <!--    提交    -->
        <a-button type="primary" style="width: 100%" @click="submit()" :loading="loading">提交
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">

import { reactive, ref } from 'vue'
import { capture } from '@/api/picture.ts'
import { useLoginUserStore } from '@/stores/counter.ts'
import { message } from 'ant-design-vue'
import router from '@/router'

//表单项
const formState = reactive({
  text: undefined,
  num: undefined,
  prefix: undefined
})

const loading = ref(false)

//当前用户信息
const user = useLoginUserStore()

function submit() {
  loading.value = true
  const userInfo = user.loginUser
  capture({ ...formState, yunUser: userInfo })
    .then(res => {
      message.success(res.msg)
      router.push('/home')
    })
    .catch(err => {
      message.error(err.msg || '提交失败')
    })
    .finally(() => {
      loading.value = false
    })
}


</script>

<style scoped lang="scss">
.capture-pic {
  margin: 60px;
}
</style>
