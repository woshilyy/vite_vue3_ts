<template>
  <div class="container">
    <div class="filter">
      <a-button type="primary" class="button" @click="add">添加</a-button>
    </div>
    <a-table
      :data-source="state.dataSource"
      :columns="columns"
      :pagination="false"
      @change="handleChange"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'tag'">
          <span v-for="(item, index) in record.tags" :key="index"
            >{{ item.label || '--' }}{{ index === record.tags.length - 1 ? '' : ',' }}</span
          >
        </template>
        <template v-if="column.dataIndex === 'action'">
          <a-button type="link" @click="edit(record)">编辑</a-button>
          <a-button type="link" danger @click="del(record)">删除</a-button>
        </template>
      </template>
    </a-table>
    <a-modal
      v-model:visible="visible"
      title="添加标签"
      ok-text="确认"
      cancel-text="取消"
      destroy-on-close
      @ok="handleOk"
    >
      <a-form
        ref="formRef"
        :model="formState"
        name="basic"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
      >
        <a-form-item label="标签名" name="label" :rules="[{ required: true, message: '请输入' }]">
          <a-input v-model:value="formState.label" placeholder="请输入" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import service from '@/service/api/tag/tag'
import { message } from 'ant-design-vue'

const state = reactive({
  dataSource: [],
  tagList: [],
})
const columns = [
  {
    title: '标签名',
    dataIndex: 'label',
    key: 'label',
  },
  {
    title: '操作',
    width: 200,
    dataIndex: 'action',
    scopedSlots: {
      customRender: 'action',
    },
    fixed: 'right',
  },
]
const formRef = ref(null)
const visible = ref<boolean>(false)
interface FormState {
  label: string
}

const formState = reactive<FormState>({
  label: '',
})

const add = () => {
  formState.label = ''
  formState.id = ''
  visible.value = true
}
async function edit(record: any) {
  const { label, id } = record
  formState.label = label
  formState.id = id
  visible.value = true
  // const { title, desc, content, tags, id } = record
  // await service.editPosts.EditPost({ tags, title, desc, content: content, id })
}
async function del(record: any) {
  await service.deleteTags.delTag({ id: record.id })
  message.success('删除成功')
  getList()
}

const handleOk = async (e: MouseEvent) => {
  await formRef.value.validate()
  const { label, id } = formState
  console.log(id)
  if (id) {
    await service.editTags.editTag({ label: label, id })
  } else {
    await service.addTags.addTag({ label: label })
  }
  visible.value = false
  getList()
}
async function getList() {
  try {
    const res = (await service.getTagList.getTagList({ page: 1, size: 1000 }))
      .data
    state.dataSource = res.list
  } catch (e) {}
}

function handleChange() {
  getList()
}

onMounted(() => {
  getList()
})
</script>

<style lang="scss" scoped>
.container {
  .filter {
    display: flex;
    margin-bottom: 20px;
    justify-content: flex-end;
  }
}
</style>
