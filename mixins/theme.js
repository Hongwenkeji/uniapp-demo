import {
	mapState
} from "vuex";
export default{
	computed: {
		...mapState({
			themeStyle: state => state.settings.themeStyle,
			theme: state => state.settings.theme
		}),
	},
	onReady(){
		let{theme,themeStyle}=this
		uni.setNavigationBarColor({
			frontColor:themeStyle.navTxtStyle=='white'?'#ffffff':'#000000',
			backgroundColor:themeStyle.navBgColor
		})
	}
}
