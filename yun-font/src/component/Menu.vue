<template>
  <div class="menu">
    <a-menu v-model:selectedKeys="state.selectedKeys" style="width: 256px" mode="inline"
            :open-keys="state.selectedKeys"
            :items="items" @click="menuClick"></a-menu>
  </div>
</template>

<script setup lang="ts">

import { h, reactive, type VueElement } from 'vue'
import { type ItemType, message } from 'ant-design-vue'
import { allSpace } from '@/api/space.ts'
import router from '@/router'

function getItem(
  label: VueElement | string,
  key: string,
  icon?: any,
  children?: ItemType[],
  type?: 'group'
): ItemType {
  return {
    key,
    icon,
    children,
    label,
    type
  } as ItemType
}

const items: ItemType[] = reactive([
  getItem('公共图库', '/home'),
  getItem('我的空间', '/mine_space')
])

const state = reactive({
  //默认选中
  selectedKeys: ['/home']
})

/**
 * 监听路由变化-同步更新菜单选中
 */
router.afterEach((to, from, next) => {
  //to-现在所在页面地址
  state.selectedKeys = [to.path]
})

/**
 * 菜单点击方法-不能直接拿组件方法里面的值，得结构确定是哪个
 */
function menuClick({ key }: { key: string }) {
  router.push({
    path: key
  })
}

</script>

<style scoped lang="scss">
.menu {
}
</style>
