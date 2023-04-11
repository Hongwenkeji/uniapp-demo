<template>
    <view>
        <view>
            <slot
                :leftlist="leftlist"
                :rightlist="rightlist"
                v-if="waterfall"
            ></slot>
            <slot :list="datalist" v-if="!waterfall"></slot>
            <u-empty
                text="暂无数据"
                margin-top="200"
                :show="datalist.length == 0"
                mode="list"
            ></u-empty>
        </view>
        <u-loadmore
            v-show="
                datalist.length > 0 &&
                datalist.length > params.page_no * params.page_size
            "
            class="u__loadmore"
            :status="status"
            :icon-type="iconType"
            :load-text="loadText"
        />
    </view>
</template>

<script>
export default {
    props: {
        waterfall: {
            type: Boolean,
            default: false,
        },
        url: String,

        iconType: {
            type: String,
            default: "flower",
        },
        loadText: {
            type: Object,
            default() {
                return {
                    loadmore: "轻轻上拉",
                    loading: "努力加载中",
                    nomore: "实在没有了",
                };
            },
        },
        queryParams: {
            type: Object,
            default() {
                return {};
            },
        },
        refresh: {
            type: Boolean,
            default: false,
        },

        method: {
            type: String,
            default: "$get",
        },
    },
    watch: {
        refresh(val) {
            if (val) {
                this.get_dataList();
            }
        },
    },
    data() {
        return {
            params: {
                page_no: 1,
                page_size: 20,
            },
            status: "loadmore",
            total: 0,
            datalist: [],
            rightlist: [],
            leftlist: [],
        };
    },
    methods: {
        get_dataList() {
            let { method, url, queryParams, waterfall, params } = this;
            return new Promise((resolve, reject) => {
                this[method](url, Object.assign(queryParams, params))
                    .then(({ data }) => {
                        this.total = data.count;
                        if (params.page_no == 1) {
                            this.datalist = data.lists;
                            this.leftlist = [];
                            this.rightlist = [];
                        } else {
                            this.datalist = this.datalist.concat(...data.lists);
                            data.lists.forEach((item, index) => {
                                if (index % 2 == 0) {
                                    this.leftlist.push(item);
                                } else {
                                    this.rightlist.push(item);
                                }
                            });
                        }
                        // 是否是瀑布流
                        if (waterfall) {
                            data.lists.forEach((item, index) => {
                                if (index % 2 == 0) {
                                    this.leftlist.push(item);
                                } else {
                                    this.rightlist.push(item);
                                }
                            });
                        }
                        resolve();
                    })
                    .catch((err) => {
                        reject();
                    })
                    .finally(() => {
                        this.$emit("update:refresh", false);
                        this.status = "loadmore";
                        uni.stopPullDownRefresh();
                    });
            });
        },
        onPageBottom() {
            let { total } = this;
            let { page_no, page_size } = this.params;
            uni.$on("ReachBottom", (data) => {
                console.log("触底分页");
                // 判断当前页乘以条数是否大约总数，大于不触底
                if (page_no * page_size >= total) {
                    this.status = "nomore";
                    return;
                }
                if (this.datalist.length == 0) return;
                this.params.page_no++;
                this.status = "loading";
                setTimeout(() => {
                    this.$emit("update:refresh", true);
                }, 500);
            });
        },
        onPageRefresh() {
            uni.$on("PullDownRefresh", (data) => {
                console.log("下拉刷新");
                this.params.page_no = 1;
                this.status = "loadmore";
                setTimeout(() => {
                    this.$emit("update:refresh", true);
                }, 500);
            });
        },
    },
    created() {
        this.onPageBottom();
        this.onPageRefresh();
    },
};
</script>

<style lang="scss" scoped>
.u__loadmore {
    margin-top: 20rpx;
    display: block;
}
</style>