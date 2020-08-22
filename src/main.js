import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './config/axios'
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

/*全局挂载*/
Vue.prototype.$axios = axios;
Vue.use(Antd);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
