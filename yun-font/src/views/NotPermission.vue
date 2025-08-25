<template>
  <div>
    <a-result status="403" title="403"
              sub-title="抱歉，你没有访问该页面的权限">
      <template #extra>
        <a-button type="primary" @click="back()">返回首页</a-button>
      </template>
    </a-result>
  </div>
</template>

<script setup lang="ts">

import router from '@/router'

/**
 * 返回首页方法
 */
function back() {
  router.push('/home')
}

</script>

<style scoped lang="scss">

</style>
