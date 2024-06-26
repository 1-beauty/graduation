import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import TDesign from 'tdesign-vue-next'

import 'tdesign-vue-next/es/style/index.css';

const app = createApp(App).use(store).use(router).use(TDesign)
app.mount('#app')