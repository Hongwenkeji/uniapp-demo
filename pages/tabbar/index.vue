<template>
	<layout>
		<button @tap="themeChange('light')">light</button>
		<button @tap="themeChange('dark')">dark</button>
		<button @tap="themeChange('auto')">auto</button>
		<u-no-network></u-no-network>
		<view class="card">
			
		</view>
	</layout>
</template>

<script>
	export default {

		data() {
			return {};
		},
		methods: {
			themeChange(theme) {
				this.$store.dispatch('themeChange', theme)
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import "../../static/style/index.scss";
	.card{
		width: 200rpx;
		height: 200rpx;
		@include background_color("_bgColor");
	}
</style>