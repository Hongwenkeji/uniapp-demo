
class Router {
	// 主要请求部分
	uniRoute(options = {}) {
		var pages = getCurrentPages();
		var from = pages[pages.length - 1];
		var to = { url: options.url, params: options.params }
		options.complete = (response) => {
			if (response.errMsg == `${options.type}:ok`) {
				if (this.afterEach && typeof this.afterEach === 'function') {
					this.afterEach(to, from);
					this.params = options.params
				}
			} else {
				if (this.errCallback && typeof this.errCallback === 'function') {
					this.errCallback(response)
				}
				return Promise.reject(response)
			}
		}
		const openPage = (params) => {
			if (params) {
				options=Object.assign(options,params)
			} 
			uni[options.type](options)
		}
		// 检查请求拦截
		if (this.beforeEach && typeof this.beforeEach === 'function') {
			this.beforeEach(to, from, openPage)
		}
		else {
			openPage
		}


	}
	constructor({ routes }) {
		// 拦截器
		this.beforeEach = null
		this.afterEach = null
		this.errCallback = null
		this.params = null
		this.switchTab = (options = { url: '', params: {} }) => {
			return this.uniRoute(Object.assign({
				type: 'switchTab'
			}, options))
		}
		this.navigateTo = (options = { url: '', params: {}, animationType: 'pop-out', animationDuration: 300 }) => {
			return this.uniRoute(Object.assign({
				type: 'navigateTo'
			}, options))
		}
		this.redirectTo = (options = { url: '', params: {} }) => {
			return this.uniRoute(Object.assign({
				type: 'redirectTo'
			}, options))
		}
		this.reLaunch = (options = { url: '', params: {} }) => {
			return this.uniRoute(Object.assign({
				type: 'reLaunch'
			}, options))
		}
		this.navigateBack = (options = { delta: 1, animationType: 'pop-out', animationDuration: 300 }) => {
			return this.uniRoute(Object.assign({
				type: 'navigateBack'
			}, options))
		}
	}
}
export default Router
