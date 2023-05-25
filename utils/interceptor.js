import config from '@/config'
const install = (Vue, vm) => {
	// 此为自定义配置参数，具体参数见上方说明
	Vue.prototype.$http.setConfig({
		baseUrl:config.VUE_APP_BASE_URL
	});
	
	// 请求拦截部分，每次请求前都会执行
	Vue.prototype.$http.interceptor.request = (config) => {
		config["content-type"]='application/json'
		// config.header.Token = uni.getStorageSync('token');
		// config.header.Cookie = 'JSESSIONID=80FEBC46644BAA5744073D94B8BF637F; di_c_mti=ba043378-87de-6b49-ba96-4a5137349918; account_id=16575317734; Hm_lvt_fe740601c79b0c00b6d5458d146aa5ef=1683613486; aliyungf_tc=3a633720b2b8c2558e82f971a27b42ef36055cc217c6a8a1024107cf3f9ca0bd; gt_local_id=0V94is96R/nPVzWXpDuC4zIrU0FX/E41mRMPhcCry7vd2a1UuNMIwA==; ssoSessionId=dda77412-96a8-4586-959e-052c36bfe91c'
		return config;
		// 如果return一个false值，则会取消本次请求
		// if(config.url == '/user/rest') return false; // 取消某次请求
	}
    // 响应拦截，每次请求结束都会执行本方法
	Vue.prototype.$http.interceptor.response = (res) => {
		if(res.code == 200) {
			// res为服务端返回值，可能有code，result等字段
			// 这里对res.result进行返回，将会在this.$u.post(url).then(res => {})的then回调中的res的到
			// 如果配置了originalData为true，请留意这里的返回值
			return res.result;
		} else if(res.code == 201) {
			// 假设201为token失效，这里跳转登录
			vm.$toast('验证失败，请重新登录');
			setTimeout(() => {
				// 此为uView的方法，详见路由相关文档
				vm.$uniRouter.navigateTo({url:'/pages/login'})
			}, 1500)
			return false;
		} else {
			// 如果返回false，则会调用Promise的reject回调，
			// 并将进入this.$u.post(url).then().catch(res=>{})的catch回调中，res为服务端的返回值
			return false;
		}
	}
}

export default {
	install
}