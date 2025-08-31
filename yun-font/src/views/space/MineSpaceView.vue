<template>
  <!-- 我的空间页 -->
  <div class="mine-space">
    <a-button style="float: right; transform: translateY(-30px)" type="primary" @click="toCreate()">
      创建空间
    </a-button>
    <!--  展示没数据情况  -->
    <div v-if="!spaceData"></div>
    <div>
      <!-- 卡片列表展示所有空间 -->
      <a-row :gutter="16">
        <a-col :span="6" v-for="item in spaceData" :key="item.spaceId">
          <a-card :title="item.spaceName" :bordered="false" class="space-card"
                  @click="toDetail(item.spaceId)">
            <p class="space-level">{{ getSpaceLevelLabel(item.spaceLevel) }}</p>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { allSpace } from '@/api/space.ts'
import { message } from 'ant-design-vue'
import router from '@/router'
import { SPACE_OPTIONS } from '@/types/enum/spaceEnum.ts'
//空间数据
const spaceData = ref<API.YunSpace[]>([])

/**
 * 查询该用户所有空间
 */
function getSpaceList() {
  allSpace().then(res => {
    spaceData.value = res.data
  }).catch(err => {
    message.error(err.msg)
  })
}

/**
 * 根据 spaceLevel（数字）找到对应的中文名称
 */
const getSpaceLevelLabel = (level: number) => {
  const option = SPACE_OPTIONS[level]
  console.log(option)
  return option ? option.label : '未知空间类型' // 如果没找到，显示默认值
}

/**
 * 跳转空间详情页
 */
function toDetail(spaceId: number) {
  router.push({
    path: '/detail_space',
    query: { spaceId }
  })
}

/**
 * 菜单点击方法-不能直接拿组件方法里面的值，得结构确定是哪个
 */
function menuClick({ key }: { key: string }) {
  router.push({
    path: key
  })
}

/**
 * 创建空间
 */
function toCreate() {
  router.push({
    path: '/create_space'
  })
}

onMounted(() => {
  getSpaceList()
})

</script>

<style scoped lang="scss">
.mine-space {
  padding: 40px 20px; // 页面左右和上边留白，更透气
  margin: 0 auto;
  max-width: 1200px; // 可选：限制最大宽度，居中布局更简约

  .ant-row {
    margin-bottom: 0; // 避免 antd row 默认 margin
  }

  .space-card {
    cursor: pointer;
    height: 100%; // 让卡片高度撑满
    transition: all 0.3s ease; // 卡片 hover 动画
    border-radius: 12px; // 圆角更柔和
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08); // 更柔和的阴影

    &:hover {
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12); // hover 时略微加深阴影
      transform: translateY(-2px); // 轻微上浮
    }

    .ant-card-head {
      padding: 0 16px;
      min-height: auto;
      border-bottom: 1px solid #f0f0f0;

      .ant-card-head-title {
        font-size: 16px;
        font-weight: 600;
        color: #1f1f1f;
      }
    }

    .ant-card-body {
      padding: 16px;

      .space-level {
        margin: 0;
        font-size: 14px;
        color: #666;
        text-align: center; // 空间级别居中显示更简约
      }
    }
  }
}
</style>
