import Router from "@/common/uniRouter"

export const route = {
    pages: [
        {
            "path": "pages/tabbar/index"
        },
        {
            "path": "pages/tabbar/personal"
        }
    ],
    tabBar: {
        list: [
            {
                "pagePath": "pages/tabbar/index",
                "text": "首页"
            },
            {
                "pagePath": "pages/tabbar/personal",
                "text": "个人中心"
            }
        ]
    }
}
export default new Router({
    routes:route.pages
})
