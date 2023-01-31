<template>
	<view style="position: relative;">
		<view class="scale-arrow" :style="[arrowstyle]"></view>
		<scroll-view 
			:scroll-x="scrolltype=='horizontal'" 
			:scroll-y="scrolltype=='vertical'" 
			style="white-space: nowrap"
			class="scroll-view"
			@scroll="scroll"
			:scroll-left="curscale"
			:scroll-top="curscale"
		>
			<view style="width: 50%;display: inline-flex;"></view>
			<view :id="item.id" :style="[{width:step*5+'px'}]" class="scroll-view-item" v-for="(item,index) in scaleList" :key="index">
				<view>
					<view :class="item.class"></view>
					<view v-if="item.class=='long-line'" class="scale-value">{{item.value}}</view>
				</view>
			</view>
			<view :style="[{width: `calc(50% - ${step*5}px)`,display: 'inline-flex'}]"></view>
		</scroll-view>
	</view>
</template>

<script>
	let timer
	export default {
		data() {
			return {
				// vertical:竖，horizontal:横
				scrolltype: 'horizontal',
				customStyle: {
					
				},
				arrowstyle:{
					
				},
				min: 0,
				max: 100,
				step: 2,
				scaleList: [],
				curscale:''
			}
		},
		created() {
			let {
				max,
				step
			} = this
			let i=1
			for (var index = 0; index <= max; index += step) {
				this.scaleList.push({
					value: index,
					id: `scale-${index}`,
					class: i > 1 && i <= 5 ? 'short-line' : 'long-line'
				})
				if(i==5){
					i=0
				}
				i++
			}
		},
		methods: {
			scroll(e){
				let{ step } = this
				let index = (e.detail.scrollLeft / (step*5)).toFixed();
				clearTimeout(timer)
				timer=setTimeout(()=>{
					this.curscale=index*(step*5)
					clearTimeout(timer)
					this.$emit('onscroll',this.curscale)
				},500)
			}
		}
	}
</script>

<style scoped lang="scss">
	.scale-arrow{
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		z-index: 9;
		width: fit-content;
		border: 15rpx solid#AD1616;
		border-left-color: transparent;
		border-right-color: transparent;
		border-bottom-color: transparent;
		margin: 0 auto;
	}
	.scroll-view{
		display: flex;
		align-items: flex-start;
	}
	.scroll-view-item {
		display: inline-flex;
		vertical-align: top;
		// view {
		// 	width: 2px;
		// }
		.scale-value{
			transform: translateX(-50%);
		}
		.long-line {
			background: #000;
			height: 60px;
			width: 2px;
		}

		.short-line {
			background: #000;
			height: 40px;
			width: 2px;
		}
	}
</style>
