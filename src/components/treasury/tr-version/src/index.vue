<template>
    <view>
        <u-popup
            v-model="show"
            mode="center"
            :popup="false"
            :mask-close-able="true"
            >1231231231231231313123213</u-popup
        >
    </view>
</template>

<script>
import config from "@/vue.config.js";
export default {
    name: "tr-version-up",
    model: {
        prop: "value",
    },
    props: {
        value: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            show: false,
        };
    },
    created() {},
    methods: {
        /**
         * @function 点击更新
         * @describe
         * @author
         * @date
         */
        onUpdate() {
            //判断是否为wifi模式
            uni.getNetworkType({
                success: (res) => {
                    if (res.networkType == "wifi") {
                        this.startUpdate(); //开始更新
                    } else {
                        uni.showModal({
                            title: "提示",
                            content:
                                "当前网络非WIFI,继续更新可能会产生流量,确认要更新吗？",
                            success: (modal_res) => {
                                if (modal_res.confirm) {
                                    this.startUpdate(); //开始更新
                                }
                            },
                        });
                    }
                },
            });
        },
        /**
        * @function 开始更新
        * @describe 
        * @author 
        * @date 
        */
        startUpdate() {
            var dtask = plus.downloader.createDownload(
                config.downloadsURL,
                {
                    filename: "_downloads/",
                },
                function (file, code) {
                    if (code == 200) {
                        plus.runtime.install(
                            file.filename,
                            {
                                force: true,
                            },
                            function () {
                                plus.runtime.restart();
                            },
                            (err) => {
                                this.$toast("安装升级失败");
                                console.error(err);
                            }
                        );
                    } else {
                        this.$toast("下载升级包失败");
                    }
                }
            );
            dtask.addEventListener(
                "statechanged",
                (e) => {
                    if (e && e.downloadedSize > 0) {
                        this.curpercent = Number(
                            ((e.downloadedSize / e.totalSize) * 100).toFixed(0)
                        );
                    }
                },
                false
            );
            dtask.start();
        },
    },
};
</script>

<style lang="scss" scoped>
</style>