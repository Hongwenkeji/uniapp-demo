<template>
	<view class="page">
		<slot></slot>
		<u-no-network></u-no-network>
		<!-- <tr-tabbar :border-top="false" :bg-color="themeStyle.tabBgColor" :active-color="themeStyle.tabSelectedColor"
			:inactive-color="themeStyle.tabFontColor" :list="tabBar" v-model="current"></tr-tabbar> -->
	</view>
</template>

<script>
	const pages = require('@/pages.json')
	export default {
		data() {
			return {
				tabBar: pages.default.tabBar.list,
				current: 0,
			};
		}
	};
</script>

<style lang="scss" scoped>
</style>