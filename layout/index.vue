<template>
    <view class="page">
        <slot></slot>
        <tr-tabbar
            :list="tabBar"
            v-model="current"
        ></tr-tabbar>
    </view>
</template>

<script>
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
    }
};
</script>

<style lang="scss" scoped>
</style>