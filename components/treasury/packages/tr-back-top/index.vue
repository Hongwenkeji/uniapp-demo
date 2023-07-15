<template>
    <view
        @tap="backToTop"
        class="tr-back-top"
        :style="[
            {
                bottom: bottom + 'rpx',
                right: right + 'rpx',
                opacity: opacity,
            },
        ]"
    >
        <view
            v-if="!$slots.default && !$slots.$default"
        >
            <u-icon @click="backToTop()" :name="icon"></u-icon>
        </view>
        <slot v-else />
    </view>
</template>

<script>
export default {
    name: "tr-back-top",
    props: {
        /**
         * @property 图标名称
         */
        icon: {
            type: String,
            default: "arrow-upward",
        },
        /**
         * @property 过度时间
         */
        duration: {
            type: [Number, String],
            default: 100,
        },
        /**
         * @property 滚动条滑动多少距离时显示
         */
        top: {
            type: [Number, String],
            default: 400,
        },
        /**
         * @property 按钮距离顶部距离
         */
        bottom: {
            type: [Number, String],
            default: 200,
        },
        /**
         * @property 按钮距离右侧距离
         */
        right: {
            type: [Number, String],
            default: 40,
        },
    },
    watch: {
        /**
         * @function 监听滚动距离
         * @describe 不透明度，为了让组件有一个显示和隐藏的过渡动画
         * @author
         * @date
         */
        scrollTop(nVal, oVal) {
            if (nVal > this.top) {
                this.opacity = 1;
            } else {
                this.opacity = 0;
            }
        },
    },
    data() {
        return {
            // 不透明度，为了让组件有一个显示和隐藏的过渡动画
            opacity: 0,
            scrollTop: 0,
        };
    },
    methods: {
        /**
         * @function 监听页面滚动
         * @describe
         * @author
         * @date
         */
        onPageScrollRoll() {
            uni.$on("PageScroll", (data) => {
                console.log("页面滚动");
                this.scrollTop = data.scrollTop;
            });
        },
        /**
         * @function 返回顶部
         * @describe
         * @author
         * @date
         */
        backToTop() {
            uni.pageScrollTo({
                scrollTop: 0,
                duration: this.duration,
            });
        },
    },
    created() {
        this.onPageScrollRoll();
    },
};
</script>

<style lang="scss" scoped>
.tr-back-top {
    width: 80rpx;
    height: 80rpx;
    position: fixed;
    z-index: 9;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #e1e1e1;
    color: #000;
    align-items: center;
    transition: opacity 0.4s;
    border-radius: 100%;
}
</style>
