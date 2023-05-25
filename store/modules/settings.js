import themeJson from '@/theme.json'
const state = {
	// 主题 深色主题theme-dark，浅色主题theme-light
	theme: 'light',
	themeStyle: themeJson['light']
}
const mutations = {
	SETTHEME(state, data) {
		state.theme = data
		state.themeStyle = themeJson[data]
	}
}

const actions = {
	themeChange({
		commit
	}, theme) {
		let sysTheme
		// #ifdef APP-PLUS
		plus.nativeUI.setUIStyle(theme);
		sysTheme = plus.navigator.getUIStyle();
		// #endif
		// #ifdef H5
		if (theme === 'auto') {
			const themeMedia = window.matchMedia("(prefers-color-scheme: light)");
			themeMedia.matches ? sysTheme = 'light' : sysTheme = 'dark'
		} else {
			sysTheme = theme
		}
		window.document.documentElement.setAttribute(
			"data-theme",
			sysTheme
		);
		uni.setStorageSync('theme', sysTheme)
		// #endif
		console.log(sysTheme, '系统主题');
		commit('SETTHEME', sysTheme)
	}
}

export default {
	state,
	mutations,
	actions
}