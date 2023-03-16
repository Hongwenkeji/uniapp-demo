// http请求
import http from './libs/function/request/index.js'
// tr-list 分页全局混入
import Pagination from './libs/mixin/pagination.js'
const prototype = {
    $get: http.get,
    $post: http.post,
    $put: http.put,
    $del: http.delete,
    $http: http
}
const install = (Vue) => {
    for (const key in prototype) {
        const item = prototype[key];
        Vue.prototype[key] = item
    }
    Vue.mixin(Pagination)
}

export default {
    install
}