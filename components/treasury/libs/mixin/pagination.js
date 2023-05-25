let ReachBottom
let PullDownRefresh
let PageScroll
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
        // this.pageClose()
    },
    onPageScroll(e) {
		if(PageScroll){
            return PageScroll.$emit('PageScroll',e)
        }
        PageScroll = uni.$emit('PageScroll',e)
	},
    methods:{
        pageClose(){
            uni.$off('ReachBottom')
            uni.$off('PullDownRefresh')
            uni.$off('PageScroll')
            ReachBottom = null
            PullDownRefresh = null
            PageScroll=null
        }
    }
}