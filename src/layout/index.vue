<template>
    <view class="page">
        <slot></slot>
        <u-tabbar :list="tabBar" @change="tabBarchange"></u-tabbar>
        <tr-version />
    </view>
</template>

<script>
import router from '@/router/index.js'
export default {
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
    }
};
</script>

<style lang="scss" scoped>
.page {
    min-height: 100%;
}
uni-page-body {
    min-height: 100%;
}
</style>