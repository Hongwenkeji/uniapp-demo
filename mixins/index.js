import themeMixin from './theme.js'

const install =(Vue)=>{
	Vue.mixin(themeMixin)
}
export default {
    install
}