<script>
	export default {
		onLaunch: function() {
			console.log("App Launch");
			let storageTheme =uni.getStorageSync('theme')
			this.$store.dispatch('settingTheme', storageTheme||'auto')
		},
		onShow: function() {
			console.log("App Show");
			uni.onThemeChange((res) => {
				let sysTheme = this.$store.state.settings.sysTheme
				let theme = this.$store.state.settings.theme
				if (res.theme != theme && sysTheme === 'auto' && res.theme !== 'auto') {
					this.$store.dispatch('themeChange', res.theme)
				}
			})
			uni.onNetworkStatusChange(function (res) {
				console.log(res.isConnected);
				console.log(res.networkType);
			});
		},
		onHide: function() {
			console.log("App Hide");
		}
	};
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
	@import "./static/style/index.scss";
</style>