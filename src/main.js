import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from "@/locale"
import bootstrap from './bootstrap'
import Antd from 'ant-design-vue'
import NProgress from 'nprogress'

Vue.config.productionTip = false;

/*全局路由拦截*/
router.beforeEach((to, from, next) => {
    NProgress.start()
    const user = localStorage.getItem('user') || '';
    if (user === '' || (new Date().getTime() - user.time) <= 5 * 24 * 3600 * 1000) {  // 上次登录获取到的refresh_token最长7天有效
        localStorage.removeItem('user');
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

router.afterEach(() => {
    NProgress.done()
})

Vue.use(Antd);

new Vue({
    router,
    store,
    i18n,
    created: bootstrap,
    render: h => h(App)
}).$mount('#app');
