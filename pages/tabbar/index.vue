<template>
	<layout>
		{{$store.state.settings.theme}}
		{{$store.state.settings.sysTheme}}
		<button @tap="themeChange('light')">light</button>
		<button @tap="themeChange('dark')">dark</button>
		<button @tap="themeChange('auto')">auto</button>
		
		<view class="card" @tap="navpage">
			
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
				this.$store.dispatch('settingTheme', theme)
				// uni.showModal({
				// 	title:'提示',
				// 	content:'主题切换'
				// })
				uni.showToast({
					title:'123',
					icon:'none'
				})
			},
			navpage(){
				this.$uniRouter.navigateTo({url:'/pages/404'})
			}
		}
	};
</script>

<style lang="scss" scoped>
	.card{
		width: 200rpx;
		height: 200rpx;
		border: 1rpx solid red;
		background-color: var(--bgColor);
	}
</style>