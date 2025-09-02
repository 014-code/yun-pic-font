<template>
  <!-- 搜索表单组件 -->
  <div class="search-form">
    <!--  上方表单  -->
    <a-form layout="inline" :model="formState" style="margin-bottom: 30px" :pagination="false"
            bordered>
      <a-form-item>
        <a-input v-model:value="formState.name" placeholder="请输入名称">
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input v-model:value="formState.introduction" placeholder="请输入简介">
        </a-input>
      </a-form-item>
      <a-form-item label="分类">
        <a-select v-model:value="formState.category" placeholder="请选择分类">
          <a-select-option v-for="item in categoryList" :key="item" :value="item">{{ item }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="标签" placeholder="请选择标签">
        <a-select mode="tags" v-model:value="formState.tags">
          <a-select-option v-for="item in tagsList" :key="item" :value="item">{{ item }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <!--   日期   -->
        <a-form-item label="日期" name="">
          <a-range-picker
            style="width: 400px"
            show-time
            v-model:value="dateRange"
            :placeholder="['编辑开始日期', '编辑结束时间']"
            format="YYYY/MM/DD HH:mm:ss"
            :presets="rangePresets"
            @change="onRangeChange"
          />
        </a-form-item>
      </a-form-item>
      <a-form-item>
        <a-input v-model:value="formState.picHeight" placeholder="请输入高度">
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input v-model:value="formState.picWidth" placeholder="请输入宽度">
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input v-model:value="formState.picFormat" placeholder="请输入格式">
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" @click="submit()" style="margin-right: 20px">
          搜索
        </a-button>
        <a-button html-type="submit" @click="reset()">
          重置
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">

import { allTags } from '@/api/picture.ts'
import { onMounted, reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import dayjs, { type Dayjs } from 'dayjs'

type RangeValue = [Dayjs, Dayjs];

const dateValue = ref<RangeValue>()

//父组件传入方法-比如刷新数据的方法
interface Props {
  onSearch?: (searchParams: API.GetPictrueListParam) => void
}

//接收父组件值
const props = defineProps<Props>()

//所有分类信息
const categoryList = ref([])
//所有标签信息
const tagsList = ref([])

/**
 * 搜索表单
 */
const formState = reactive<API.GetPictrueListParam>({})

/**
 * 获取所有标签
 */
function getTags() {
  allTags().then(res => {
    categoryList.value = res.data.category
    tagsList.value = res.data.tags
  }).catch(err => {
    message.error('获取标签和类别失败')
  })
}

const dateRange = ref<[]>(([]))

/**
 * 日期范围更改时触发
 * @param dates
 * @param dateStrings
 */
const onRangeChange = (dates: any[], dateStrings: string[]) => {
  if (dates.length < 2) {
    formState.startEditTime = undefined
    formState.endEditTime = undefined
  } else {
    formState.startEditTime = dates[0].toDate()
    formState.endEditTime = dates[1].toDate()
  }
}

const rangePresets = ref([
  { label: '过去 7 天', value: [dayjs().add(-7, 'd'), dayjs()] },
  { label: '过去 14 天', value: [dayjs().add(-14, 'd'), dayjs()] },
  { label: '过去 30 天', value: [dayjs().add(-30, 'd'), dayjs()] },
  { label: '过去 90 天', value: [dayjs().add(-90, 'd'), dayjs()] }
])

/**
 * 提交搜索表单 todo 提交父组件
 */
function submit() {
  //触发父组件的onSearch方法
  //formState-提交表单数据
  props.onSearch?.(formState)
}

/**
 * 重置表单 todo 提交父组件
 */
function reset() {
  // 取消所有对象的值
  Object.keys(formState).forEach((key) => {
    formState[key] = undefined
  })
  dateRange.value = []
  props.onSearch?.(formState)
}

onMounted(() => {
  getTags()
})

</script>

<style scoped lang="scss">
.picture-search-form.ant-form-item {
  margin-top: 16px;
}
</style>
