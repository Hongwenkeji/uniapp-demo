export default class uniRouter {
	// 主要请求部分
	uniRoute(options = {}) {
		var pages = getCurrentPages();
		let page = pages[pages.length - 1]
		var from = Object.assign({ url: `/${page.route}`,params:options.params }, page);
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
				options = Object.assign(options, params)
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
	constructor({routes}) {
		// 拦截器
		this.routes=routes
		this.beforeEach = null
		this.afterEach = null
		this.errCallback = null
		this.params = null
	}
	switchTab = (options = { url: '', params: {} }) => {
		return this.uniRoute(Object.assign({
			type: 'switchTab'
		}, options))
	}
	navigateTo = (options = { url: '', params: {}, animationType: 'pop-out', animationDuration: 300 }) => {
		return this.uniRoute(Object.assign({
			type: 'navigateTo'
		}, options))
	}
	redirectTo = (options = { url: '', params: {} }) => {
		return this.uniRoute(Object.assign({
			type: 'redirectTo'
		}, options))
	}
	reLaunch = (options = { url: '', params: {} }) => {
		return this.uniRoute(Object.assign({
			type: 'reLaunch'
		}, options))
	}
	navigateBack = (options = { delta: 1, animationType: 'pop-out', animationDuration: 300 }) => {
		return this.uniRoute(Object.assign({
			type: 'navigateBack'
		}, options))
	}
}
uniRouter.install = (Vue) => {
	Vue.mixin({
		beforeCreate() {
			var pages = getCurrentPages();
			var page = pages[pages.length - 1];
			if (page) {
				this.$uniRouter.path = page.route
			}

		}
	})

}