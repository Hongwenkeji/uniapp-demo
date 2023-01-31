let devbaseURL = "http://localhost:8080/api"
let probaseURL = "http://localhost:8080/api"

module.exports = {
    // 接口请求地址
    baseURL: process.env.NODE_ENV === 'development' ? devbaseURL : probaseURL,
    // app 下载更新地址
    downloadsURL:"http://localhost:8080"
}