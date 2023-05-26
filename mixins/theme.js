import {
	mapState
} from "vuex";
export default{
	computed: {
		...mapState({
			themeStyle: state => state.settings.themeStyle,
			theme: state => state.settings.theme
		}),
	}
}
