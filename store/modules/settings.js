import themeJson from '@/theme.json'
const state = {
	// 主题 深色主题theme-dark，浅色主题theme-light
	theme: 'light',
	sysTheme: 'auto',
	themeStyle: themeJson['light']
}
const mutations = {
	SETTHEME(state, theme) {
		state.theme = theme
		state.themeStyle = themeJson[theme]
		uni.setTabBarStyle({
			backgroundColor:themeJson[theme].tabBgColor,
			color:themeJson[theme].tabFontColor,
			selectedColor:themeJson[theme].tabSelectedColor
		})
		uni.setNavigationBarColor({
			frontColor:themeJson[theme].navTxtStyle=='white'?'#ffffff':'#000000',
			backgroundColor:themeJson[theme].navBgColor
		})
	}
}

const actions = {
	themeChange({
		commit
	}, theme) {
		// #ifdef H5
		window.document.documentElement.setAttribute(
			"theme-mode",
			theme
		);
		// #endif
		commit('SETTHEME', theme)
	},
	settingTheme({
		commit
	}, theme) {
		let sysTheme
		uni.setStorageSync('theme', theme)
		state.sysTheme=theme
		// #ifdef APP-PLUS
		plus.nativeUI.setUIStyle(theme);
		// #endif
		if (theme === 'auto') {
			// #ifdef APP-PLUS
			sysTheme = plus.navigator.getUIStyle();
			// #endif
			// #ifdef H5
			const themeMedia = window.matchMedia("(prefers-color-scheme: light)");
			themeMedia.matches ? sysTheme = 'light' : sysTheme = 'dark'
			// #endif
		}
		else{
			sysTheme=theme
		}
		// #ifdef H5
		window.document.documentElement.setAttribute(
			"theme-mode",
			sysTheme
		);
		// #endif
		commit('SETTHEME', sysTheme)
	}
}
export default {
	state,
	mutations,
	actions
}