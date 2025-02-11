import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import Antd from 'ant-design-vue'
import { createPinia } from 'pinia'
import 'ant-design-vue/dist/antd.css'

const app = createApp(App)

app.use(router)
app.use(Antd)

app.use(createPinia())

app.mount('#app')
