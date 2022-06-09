<template>
  <div class="container">
    <div class="filter">
      <a-button type="primary" class="button" @click="add">添加</a-button>
    </div>
    <a-table
      :data-source="state.dataSource"
      :columns="columns"
      :pagination="state.pagination"
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
      title="添加文章"
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
        <a-form-item label="标题" name="title" :rules="[{ required: true, message: '请输入标题' }]">
          <a-input v-model:value="formState.title" placeholder="请输入" />
        </a-form-item>
        <a-form-item
          label="内容"
          name="content"
          :rules="[{ required: true, message: '请输入内容' }]"
        >
          <a-input v-model:value="formState.content" placeholder="请输入" />
        </a-form-item>
        <a-form-item label="简介" name="desc" :rules="[{ required: true, message: '请输入简介' }]">
          <a-input v-model:value="formState.desc" placeholder="请输入" />
        </a-form-item>
        <a-form-item label="类型" name="tags" :rules="[{ required: true, message: '请选择类型' }]">
          <a-select
            v-model:value="formState.tags"
            mode="tags"
            style="width: 100%"
            placeholder="请选择类型"
            :options="state.tagList"
          ></a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import service from '@/service/api/post/posts'
import { message } from 'ant-design-vue'

const state = reactive({
  dataSource: [],
  tagList: [],
  pagination: {
    current: 1,
    pageSize: 10,
    showQuickJumper: true,
    total: 0,
    position: 'bottom',
  },
})
const columns = [
  {
    title: '文章标题',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '文章内容',
    dataIndex: 'content',
    key: 'content',
  },
  {
    title: '简介',
    dataIndex: 'desc',
    key: 'desc',
  },
  {
    title: '标签',
    dataIndex: 'tag',
    key: 'tag',
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
  title: string
  content: string
  desc: string
  tags: Array<number>
}

const formState = reactive<FormState>({
  title: '',
  content: '',
  desc: '',
  tags: [],
})

const add = () => {
  formState.title = ''
  formState.desc = ''
  formState.content = ''
  formState.tags = []
  formState.id = ''
  visible.value = true
}
async function edit(record) {
  const { title, desc, content, tags, id } = record
  formState.title = title
  formState.desc = desc
  formState.content = content
  formState.tags = tags
  formState.id = id
  visible.value = true
  // const { title, desc, content, tags, id } = record
  // await service.editPosts.EditPost({ tags, title, desc, content: content, id })
}
async function del(record) {
  await service.deletePosts.delPost({ id: record.id })
  message.success('删除成功')
  getList()
}

const handleOk = async (e: MouseEvent) => {
  await formRef.value.validate()
  const { title, desc, content, tags, id } = formState
  const tag = tags.map((i) => {
    return {
      id: i,
    }
  })
  if (id) {
    await service.editPosts.editPost({ tags: tag, title, desc, content, id })
  } else {
    await service.addPosts.addPost({ tags: tag, title, desc, content })
  }
  visible.value = false
  getList()
}
async function getList() {
  try {
    const res = (await service.getPosts.getPostList({ page: state.pagination.current, size: 10 }))
      .data
    state.dataSource = res.list
    state.pagination = {
      ...state.pagination,
      current: +res.current,
      pageSize: +res.size,
      total: res.total,
    }
  } catch (e) {}
}
async function getTagList() {
  try {
    state.tagList = (await service.getTagList.getTagList()).data.list.map((i) => {
      return {
        value: i.id,
        label: i.label,
      }
    })
  } catch (e) {}
}

function handleChange(val) {
  state.pagination = val
  getList()
}

onMounted(() => {
  getList()
  getTagList()
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
