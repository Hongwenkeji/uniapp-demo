<template>
	<view class="page">
		<slot></slot>
		<tr-tabbar :border-top="false" :bg-color="themeStyle.tabBgColor" :active-color="themeStyle.tabSelectedColor"
			:inactive-color="themeStyle.tabFontColor" :list="tabBar" v-model="current"></tr-tabbar>
	</view>
</template>

<script>
	const pages = require('@/pages.json')
	import {
		mapState
	} from "vuex";

	export default {
		computed: {
			...mapState({
				themeStyle: state => state.settings.themeStyle
			}),
		},
		data() {
			return {
				tabBar: pages.default.tabBar.list,
				current: 0,
			};
		},
		created() {
			// console.log(this.themeStyle);
		}
	};
</script>

<style lang="scss" scoped>
</style>