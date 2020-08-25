import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from "@/locale"
import bootstrap from './bootstrap'
import Antd from 'ant-design-vue'

Vue.config.productionTip = false;

/*全局路由拦截*/
router.beforeEach((to, from, next) => {
    const user = localStorage.getItem('user') || '';

    if (user === '') {
        if (to.path === '/login') {
            next();
        } else {
            next({path: '/login'});
        }
    } else {
        // 存在token
        if (to.path === '/login') {
            next({path: '/index'}); // 去首页
        } else {
            next();
        }
    }
});

Vue.use(Antd);

new Vue({
    router,
    store,
    i18n,
    created: bootstrap,
    render: h => h(App)
}).$mount('#app');
