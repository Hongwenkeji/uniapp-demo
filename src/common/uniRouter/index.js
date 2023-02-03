class Router {
	// 主要请求部分
	uniRoute(options = {}) {
		var pages = getCurrentPages();
		var from = pages[pages.length - 1];
		var to = { url: options.url, params: options.params }
		options.complete = (response) => {
			if (response.errMsg == `${options.type}:ok`) {
				if (this.afterEach && typeof this.afterEach === 'function') {
					this.afterEach(to,from);
				}
			} else {
				this.errCallback(response)
			}
		}
		const openPage = () => {
			uni[options.type](options)
		}
		// 检查请求拦截
		if (this.beforeEach && typeof this.beforeEach === 'function') {
			this.beforeEach(to,from,openPage)
		}
		else {
			openPage
		}


	}
	constructor({routes}) {
		// 拦截器
		this.beforeEach = null
		this.afterEach = null
		this.errCallback = null
		this.switchTab = (options = { url: '' }) => {
			return this.uniRoute({
				type: 'switchTab',
				url: options.url
			})
		}
		// get请求
		this.navigateTo = (options = { url: '' }) => {
			return this.uniRoute({
				type: 'navigateTo',
				url: options.url
			})
		}
	}
}
export default Router
