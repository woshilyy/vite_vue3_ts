<template>
  <!-- <div class="test">用户名:{{ mainStore.name }}<br />长度:{{ mainStore.nameLength }}</div>
  <hr />
  <button @click="updateName">修改store中的name</button>
  <hr />

  <n-button>naive-ui</n-button> -->
  <div class="login">
    <img src="https://test-admin.ideamake.cn/swt04/img/login-bg.aa0ae5c7.png" />
    <div class="login-wrap">
      <a-form
        :model="formState"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <!-- <div class="title">登录</div> -->
        <a-form-item
          label="用户名"
          name="mobile"
          :rules="[{ required: true, message: '请输入手机号码!' }]"
        >
          <a-input v-model:value="formState.mobile" />
        </a-form-item>

        <a-form-item
          label="密码"
          name="password"
          :rules="[{ required: true, message: '请输入密码!' }]"
        >
          <a-input-password v-model:value="formState.password" />
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button type="primary" html-type="submit">登录</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from '@/store/mian'
import { reactive } from 'vue'
import { NButton } from 'naive-ui'
import service from '@/service/api/login/login'
import { message } from 'ant-design-vue'

interface FormState {
  mobile: string
  password: string
}
const mainStore = useMainStore()
const formState = reactive<FormState>({
  mobile: '',
  password: '',
})
const onFinish = async (values: any) => {
  const { mobile, password } = values
  const tokenInfo = await service.loginApi.login({ mobile, password })
  if (tokenInfo.code === 200) {
    localStorage.setItem('token', tokenInfo.data.info.token)
    message.success('登录成功')
    mainStore.updateToken(true)
  }
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}
const updateName = () => {
  mainStore.$patch({
    name: '名称被修改了,nameLength也随之改变了',
  })
}
</script>

<style lang="scss" scoped>
.test {
  color: $test-color;
}
.login {
  background-color: #f1f3f6;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  &-wrap {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background-color: #fff;
    border-radius: 4px;
    height: 300px;
    padding: 0 50px;
    margin-left: 50px;
  }
  img {
    height: 330px;
    width: 598px;
  }
}
.title {
  font-size: 24px;
  text-align: center;
  padding: 20px 0;
}
</style>
