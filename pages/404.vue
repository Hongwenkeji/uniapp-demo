<template>
	<view class="notfund">
		<image src="@/static/images/empty/404.png" mode="widthFix"></image>
		<view>页面不存在</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			console.log(this.$uniRouter);
		}
	}
</script>

<style lang="scss" scoped>
.notfund{
	image{
		margin-top: 40%;
	}
	text-align: center;
	color: var(--textColor);
}
</style>
