<template>
    <layout>
        123
        <button>显示</button>
        <button>隐藏</button>
		<u-no-network></u-no-network>
    </layout>
</template>

<script>
export default {
   
    data() {
        return {};
    },
    methods: {},

    onShow(options) {
       uni.onThemeChange(function (res) {
       	console.log(res.theme);
       });
	  // #ifdef APP-PLUS
	  plus.nativeUI.setUIStyle('dark');
	   var style = plus.navigator.getUIStyle();  
	  		console.log(style);
	    if('dark'==style){  
	      console.log('当前为暗黑模式');  
	    }else{  
	      console.log('当前为普通模式');  
	    }  
	  // #endif
    },
};
</script>

<style>
</style>