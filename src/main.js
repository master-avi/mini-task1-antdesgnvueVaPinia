import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'

import { createPinia } from 'pinia' 
import i18n from './plugins/i18n'
const app = createApp(App)

const pinia = createPinia()
app.use(pinia)        
app.use(router)
app.use(Antd)
app.use(i18n)

app.mount('#app')
