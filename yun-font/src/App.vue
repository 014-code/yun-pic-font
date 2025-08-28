<template>
  <div id="app">
    <!-- 布局 -->
    <BasicLayout></BasicLayout>
  </div>

</template>

<script setup lang="ts">
import BasicLayout from '@/layout/BasicLayout.vue'
import { onMounted } from 'vue'
import { useLoginUserStore } from '@/stores/counter.ts'

const useUser = useLoginUserStore()

onMounted(() => {
  //获取用户信息
  useUser.fetchLoginUser()
})
</script>

<style lang="scss" scoped>
  #app {
    min-width: 600px;
  }
</style>
