import App from './App'

// #ifndef VUE3
import Vue from 'vue'
// vuex
import store from '@/store'
Vue.prototype.$store = store
// 路由
import uniRouter from './router'
Vue.prototype.$uniRouter=uniRouter
// 路由拦截器
import './utils/permission.js'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	uniRouter,
	store,
	...App
})
app.$mount()
// #endif
// uView库
import uView from "uview-ui";
Vue.use(uView);
// treasury库
import treasury from '@/components/treasury'
Vue.use(treasury)

// http请求拦截器
import httpInterceptor from './utils/interceptor.js'
Vue.use(httpInterceptor, app)

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		
		app
	}
}
// #endif