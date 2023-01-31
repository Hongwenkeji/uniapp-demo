import config from '../vue.config.js'
const install = (Vue) => {
	Vue.prototype.$post = ApiHttp.post
	Vue.prototype.$get = ApiHttp.get
	Vue.prototype.$delete = ApiHttp.delete
	Vue.prototype.$put = ApiHttp.put
}
let errwhite=[0,200,401,2001,603,604,10088,511]
let Interceptor
export const ApiHttp = {
	request: function(http, url, data) {
		
		Interceptor=uni.addInterceptor('request', {
			//请求拦截
			invoke(args) {
				args.header = {
					"Authorization": uni.getStorageSync('token')
				}
			},
			//响应拦截
			success({
				data
			}) {
				if (data.code == 401) {
					if(!updataversion){
						uni.showToast({
							title: '当前未登录，请先登录',
							icon: 'none',
							mask: true,
							
							success: (res) => {
								setTimeout(() => {
									uni.reLaunch({
										url: '/pages/login/login'
									})
									uni.removeStorageSync('token')
								}, 1000);
							},
							fail(err) {
								console.log(err);
							}
						})
					}
				}
				if (errwhite.indexOf(data.code)==-1) {
					uni.showToast({
						title: data.msg,
						icon: 'none',
						mask: true
					})
				}
			},
			fail(err) {
				console.error('错误请求，请检查', err)
				if (err.errMsg == 'request:fail timeout') {
					uni.showToast({
						title: '请求超时',
						icon: 'none'
					})
				} else if (err.errMsg == "request:fail") {
					uni.showToast({
						title: '错误请求',
						icon: 'none'
					})
				}
			},
			complete(com) {
				setTimeout(() => {
					uni.stopPullDownRefresh()
					// uni.hideLoading()
					isloading = false
				}, 800);
			}
		})
		return new Promise((response, error) => {

			return uni.request({
				method: http,
				data: data,
				url: config.baseURL + url,
				timeout: 10000,
				success({
					data
				}) {
					if (data.code == 0 || data.code == 200) {
						response(data)
					} else {
						error(data)
					}
				},
				fail(err) {
					uni.showToast({
						title: err.msg || '活动太火爆，请稍后重试',
						icon: 'none',
						mask: true
					})
					error(err.data)
				},
				complete: (com) => {
					uni.removeInterceptor('request')
				}
			})
		})

	},

	get: function(url, data) {
		return ApiHttp.request('GET', url, data);
	},
	put: function(url, data) {
		return ApiHttp.request('PUT', url, data);
	},
	delete: function(url, data) {
		return ApiHttp.request('DELETE', url, data);
	},
	post: function(url, data) {
		return ApiHttp.request('POST', url, data);
	}
}
export default {
	install
};
