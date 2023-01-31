import Router from "./router.js"

export const route = {
    pages: [
        {
            "path": "pages/tabbar/index",
            "style": {
                "navigationBarTitleText": "uni-app"
            }
        },
        {
            "path": "pages/tabbar/personal",
            "style": {
                "navigationBarTitleText": "uni-app"
            }
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