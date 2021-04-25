import { createApp } from 'vue'
import App from './App'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import { router } from './router'

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
// Mount Vue application
app.mount('#app')
