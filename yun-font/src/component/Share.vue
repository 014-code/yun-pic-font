<template>
  <div class="share">
    <a-modal v-model:visible="model.visible" :title="props.title" :footer="false" @cancel="cancel()">
      <h4>复制分享链接</h4>
      <a-typography-link copyable>{{ link }}</a-typography-link>
      <div style="margin-bottom: 16px" />
      <h4>手机扫码查看</h4>
      <a-qrcode :value="link" />
    </a-modal>
  </div>
</template>

<script setup lang="ts">

import { reactive } from 'vue'

//接收父组件值
const props = defineProps<Props>()

interface Props {
  //传入的标题
  title: string,
  //传入的图片链接
  link: string
}

const model = reactive({
  //弹出框数据
  visible: false,
  //当前选择图片id
  picId: 0
})

/**
 * 关闭弹窗方法
 */
function cancel() {
  model.visible = false
}

/**
 * 打开弹窗方法
 */
function openModel() {
  model.visible = true
}

//直接暴露方法给父组件
defineExpose({
  openModel
})

</script>

<style scoped lang="scss">

</style>
