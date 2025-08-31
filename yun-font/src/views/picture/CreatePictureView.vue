<template>
  <div class="create-picture">
    <!--    中间导航栏    -->
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="pic" tab="图片上传">
        <UploadPicView></UploadPicView>
      </a-tab-pane>
      <a-tab-pane key="url" tab="URL上传">
        <UrlPicView></UrlPicView>
      </a-tab-pane>
    </a-tabs>

  </div>
</template>

<script setup lang="ts">
//选择菜单
import { ref } from 'vue'
import UploadPicView from '@/component/UploadPic.vue'
import UrlPicView from '@/component/UrlPic.vue'

const activeKey = ref('pic');

</script>

<style scoped lang="scss">
.create-picture {
  margin: 30px;
}
</style>
