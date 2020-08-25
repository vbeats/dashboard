<template>
    <a-config-provider :locale="this.$i18n.getLocaleMessage(lang).antLocale">
        <div id="app">
            <router-view/>
        </div>
    </a-config-provider>
</template>

<script>

import {mapState} from "vuex";

export default {
    data() {
        return {}
    },
    computed: mapState({
        lang: (state) => state.app.lang
    })
}
</script>

<style lang="stylus">
@import "assets/css/index.css";
</style>
