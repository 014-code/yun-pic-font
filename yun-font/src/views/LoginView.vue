<template>
  <!-- 登录页 -->
  <div id="login-page">
    <div style="margin-top: 20px;">
      <h2 style="line-height: 60px;margin: 0 auto; text-align: center">欢迎来到智能协同云图库</h2>
    </div>
    <h3 style="margin: 0 auto; text-align: center">登录</h3>
    <a-form
      ref="formRef"
      :model="formState"
      :rules="rules"
      style="margin-top: 40px"
    >
      <a-form-item label="账号" name="account">
        <a-input v-model:value="formState.account" />
      </a-form-item>
      <a-form-item label="密码" name="password">
        <a-input v-model:value="formState.password" />
      </a-form-item>
      <!-- 跳转注册 -->
      <div style="margin-top: 30px; text-align: right">
        <span>没有账号？<router-link to="/register">去注册</router-link></span>
      </div>
      <a-form-item>
        <a-button type="primary" @click="onSubmit" style="width: 100%">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts" setup>
import { defineComponent, reactive, ref, toRaw } from 'vue'
import { infoUsingGet, loginUsingPost } from '@/api/user.ts'
import { useLoginUserStore } from '@/stores/counter.ts'
import { message } from 'ant-design-vue'
import router from '@/router'

//表单ref
const formRef = ref()
const loginUser = useLoginUserStore()

//表单内容
const formState = reactive({
  account: undefined,
  password: undefined
})
const rules = {
  account: [
    {
      required: true,
      message: '请输入账号',
      trigger: 'blur'  // 失焦时触发校验
    },
    {
      min: 6,
      max: 20,
      message: '账号长度需在6-20个字符之间',
      trigger: 'blur'  // 失焦时触发校验
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'  // 失焦时触发校验
    },
    {
      min: 6,
      max: 20,
      message: '密码长度需在6-20个字符之间',
      trigger: 'blur'  // 失焦时触发校验
    }
  ]
}


/**
 * 提交登录
 */
function onSubmit() {
  // 先进行表单验证
  formRef.value
    .validate()
    .then(() => {
      // 验证通过后执行登录
      loginUsingPost(formState).then(res => {
        //调用获取用户信息接口
        infoUsingGet().then(res => {
          //存储到pinia中
          loginUser.setLoginUser(res.data.data)
        })
        message.success(res.data.msg)
        //跳转
        router.push({
          path: '/home'
        })
      }).catch(err => {
        message.error(err.data.msg)
      })
    })
    .catch(err => {
      // 验证失败，不执行登录
      console.log('表单验证失败:', err)
    })
}
</script>

<style lang="scss">
#login-page {
  margin: 50px;
}
</style>

