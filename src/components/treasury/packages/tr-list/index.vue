<template>
    <view>
        <view>
            <slot
                :leftlist="leftlist"
                :rightlist="rightlist"
                v-if="iswaterfall"
            ></slot>
            <slot :list="datalist" v-if="!iswaterfall"></slot>
            <u-empty
                text="暂无数据"
                margin-top="200"
                :show="datalist.length == 0"
                mode="list"
            ></u-empty>
        </view>
        <u-loadmore
            v-show="
                datalist.length > 0 
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
        iswaterfall: {
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
        isRefresh: {
            type: Boolean,
            default: false,
        },

        method: {
            type: String,
            default: "$get",
        },
    },
    watch: {
        isRefresh(val) {
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
            status: 'loadmore',
            total: 0,
            datalist: [],
            rightlist: [],
            leftlist: [],
        };
    },
    methods: {
        get_dataList() {
            let { method, url, queryParams, iswaterfall, params } = this;
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
                        if (iswaterfall) {
                            data.lists.forEach((item, index) => {
                                if (index % 2 == 0) {
                                    this.leftlist.push(item);
                                } else {
                                    this.rightlist.push(item);
                                }
                            });
                        }
                        this.$emit("update:isRefresh", false);
                        resolve();
                    })
                    .catch((err) => {
                        this.$emit("update:isRefresh", false);
                        reject();
                    }).finally(()=>{
                        this.status='loadmore'
                        uni.stopPullDownRefresh()
                    })
            });
        },
        onPageBottom() {
            uni.$on("ReachBottom", (data) => {
                console.log('触底分页');
                if(this.datalist.length==0)return
                this.params.page_no++
                this.status='loading'
                setTimeout(() => {
                    this.$emit("update:isRefresh", true);
                }, 500);
            });
        },
        onPageRefresh() {
            uni.$on("PullDownRefresh", (data) => {
                console.log('下拉刷新');
                this.params.page_no=1
                setTimeout(() => {
                    this.$emit("update:isRefresh", true);
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
.u__loadmore{
    margin-top: 20rpx;display: block;
}
</style>