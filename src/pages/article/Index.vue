<template>
  <div class="container">
    <div class="filter">
      <a-button type="primary" class="button" @click="add">添加</a-button>
    </div>
    <a-table :data-source="state.dataSource" :columns="columns">
      <template #bodyCell="{ column, record }">
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
        :model="formState"
        name="basic"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
      >
        <a-form-item label="标题" name="title" :rules="[{ required: true, message: '请输入标题' }]">
          <a-input v-model:value="formState.title" />
        </a-form-item>
        <a-form-item
          label="内容"
          name="content"
          :rules="[{ required: true, message: '请输入内容' }]"
        >
          <a-input v-model:value="formState.content" />
        </a-form-item>
        <a-form-item
          label="作者"
          name="author"
          :rules="[{ required: true, message: '请输入作者' }]"
        >
          <a-input v-model:value="formState.author" />
        </a-form-item>
        <a-form-item label="类型" name="type" :rules="[{ required: true, message: '请选择类型' }]">
          <a-input v-model:value="formState.type" />
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
    title: '作者',
    dataIndex: 'author',
    key: 'author',
  },
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
  },
  // {
  //   title: '操作',
  //   width: 200,
  //   dataIndex: 'action',
  //   scopedSlots: {
  //     customRender: 'action',
  //   },
  //   fixed: 'right',
  // },
]
const visible = ref<boolean>(false)
interface FormState {
  title: string
  content: string
  author: string
  type: number
}

const formState = reactive<FormState>({
  title: '',
  content: '',
  author: '',
  type: 2,
})

const add = () => {
  visible.value = true
}
function edit(record) {
  console.log('edit', record)
}
async function del(record) {
  await service.deletePosts.delPost(record.id)
  message.success('删除成功')
  getList()
}
const handleOk = async (e: MouseEvent) => {
  await service.addPosts.addPost(formState)
  visible.value = false
  getList()
}
async function getList() {
  state.dataSource = (await service.getPosts.getPostList({ pageNum: 1, pageSize: 10 })).data.list
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
