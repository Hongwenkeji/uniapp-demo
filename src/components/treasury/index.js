import http from './function/request.js'
const prototype={
    $get:http.get,
    $post:http.post,
    $put:http.put,
    $del:http.delete,
    $http:http
}
const install=(Vue)=>{
    for (const key in prototype) {
        const item = prototype[key];
        Vue.prototype[key]=item
    }
}

export default{
    install
}