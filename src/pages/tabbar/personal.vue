<template>
    <layout> 个人中心 </layout>
</template>

<script>
import layout from "../../layout/index.vue";
import router from "@/router/index.js";

export default {
    components: {
        layout,
    },
    onLoad(options) {
        console.log(router.params);
    }
};
</script>

<style>
</style>