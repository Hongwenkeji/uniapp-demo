import uniRouter from "@/components/treasury/libs/function/route/index.js"
import Vue from "vue"

Vue.use(uniRouter)
const pages = require('@/pages.json')
export const route = pages.default.pages
export default new uniRouter({
    routes:route
})
