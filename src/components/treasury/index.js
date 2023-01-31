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
        console.log(item);
    }
    Vue.prototype.$get=http.get
    
}

export default{
    install
}