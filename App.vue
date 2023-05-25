<script>
	export default {
		onLaunch: function() {
			console.log("App Launch");
			let sysTheme
			// #ifdef APP-PLUS
			sysTheme = plus.navigator.getUIStyle();
			// #endif
			// #ifdef H5
			let storageTheme = uni.getStorageSync('theme')
			if (storageTheme) {
				sysTheme = storageTheme
			} else {
				const themeMedia = window.matchMedia("(prefers-color-scheme: light)");
				themeMedia.matches ? sysTheme = 'light' : sysTheme = 'dark'
			}
			window.document.documentElement.setAttribute("data-theme",sysTheme);
			// #endif
			this.$store.commit('SETTHEME', sysTheme)
		},
		onShow: function() {
			console.log("App Show");
			uni.onThemeChange((res) => {
				let sysTheme = res.theme
				let theme = this.$store.state.settings.theme
				if (sysTheme != theme && sysTheme != 'auto') {
					this.$store.commit('SETTHEME', sysTheme)
				}
			})
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