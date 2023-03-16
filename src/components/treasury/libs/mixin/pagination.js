let ReachBottom
let PullDownRefresh
export default {
    onReachBottom() {
        if (ReachBottom) {
            return ReachBottom.$emit('ReachBottom')
        }
        ReachBottom = uni.$emit('ReachBottom')
    },
    onPullDownRefresh() {
        if (PullDownRefresh) {
            return PullDownRefresh.$emit('PullDownRefresh')
        }
        PullDownRefresh = uni.$emit('PullDownRefresh')
    },
    onUnload() {
        this.pageClose()
    },
    onHide() {
        this.pageClose()
    },
    methods:{
        pageClose(){
            uni.$off('ReachBottom')
            uni.$off('PullDownRefresh')
            ReachBottom = null
            PullDownRefresh = null
        }
    }
}