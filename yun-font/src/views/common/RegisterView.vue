<template>
  <!-- 注册页 -->
  <div id="register-page">
    <div style="margin-top: 20px;">
      <h2 style="line-height: 60px;margin: 0 auto; text-align: center">欢迎来到智能协同云图库</h2>
    </div>
    <h3 style="text-align: center">注册</h3>
    <a-form
      ref="formRef"
      :model="formState"
      :rules="rules"
      style="margin-top: 40px"
    >
      <a-form-item label="账号" name="account">
        <a-input v-model:value="formState.account" />
      </a-form-item>
      <a-form-item label="用户昵称" name="userName">
        <a-input v-model:value="formState.userName" />
      </a-form-item>
      <a-form-item label="密码" name="password">
        <a-input v-model:value="formState.password" />
      </a-form-item>
      <a-form-item label="确认密码" name="rePassword">
        <a-input v-model:value="formState.rePassword" />
      </a-form-item>
      <!-- 跳转登录 -->
      <div style="margin-top: 30px; text-align: right">
        <span>已有账号？<router-link to="/login">去登录</router-link></span>
      </div>
      <a-form-item>
        <a-button type="primary" @click="onSubmit" style="width: 100%">注册</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts" setup>
import { defineComponent, reactive, ref, toRaw } from 'vue'
import { info, register } from '@/api/user.ts'
import { useLoginUserStore } from '@/stores/counter.ts'
import { message } from 'ant-design-vue'
import router from '@/router'
import { setToken } from '@/utils/cookies.ts'

//表单ref
const formRef = ref()
const registerUser = useLoginUserStore()

//表单内容
const formState = reactive({
  account: undefined,
  password: undefined,
  rePassword: undefined,
  userName: undefined
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
  ],
  rePassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    {
      validator: (rule: any, value: any) => {
        if (!value || formState.password === value) {
          return Promise.resolve()
        }
        return Promise.reject('两次输入的密码不一致!')
      },
      trigger: 'blur'
    }
  ]
}


/**
 * 提交注册
 */
function onSubmit() {
  // 先进行表单验证
  formRef.value
    .validate()
    .then(() => {
      // 验证通过后执行注册
      register(formState).then(res => {
        message.success(res.msg)
        // 注册成功后自动登录
        // 存储token到cookies中
        setToken(res.data)
        // 调用获取用户信息接口
        info().then(res => {
          // 存储到pinia中
          registerUser.setLoginUser(res.data)
          // 跳转到首页
          router.push({
            path: '/home'
          })
        })
      }).catch(err => {
        message.error(err.data)
      })
    })
}
</script>

<style lang="scss">
#register-page {
  margin: 50px;
}
</style>

