<template>
    <layout>
        <button @tap="tabBarchange(1)">显示</button>
        <button>隐藏</button>
    </layout>
</template>

<script>
import layout from "../../layout/index.vue";
import router from "@/router/index.js";

export default {
    components: {
        layout,
    },
    data() {
        return {
            tabBar: [
                {
                    pagePath: "/pages/tabbar/index",
                    text: "首页",
                },
                {
                    pagePath: "/pages/tabbar/personal",
                    text: "个人中心",
                },
            ],
            current: 0,
            
        };
    },
    methods: {
        tabBarchange(e) {
            router.switchTab({
                url: this.tabBar[e].pagePath,
                params: { id: 0 },
            });
        },
    },
    onLoad(options) {
    //    console.log(ROUTES);
    },
};
</script>

<style>
</style>