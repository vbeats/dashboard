import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import axios from './config/axios';
import moment from 'moment';
import _ from 'lodash';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import './mock';

Vue.config.productionTip = false;

/*全局路由拦截*/
router.beforeEach((to, from, next) => {
    // console.log(to, from);
    const token = localStorage.getItem('token') || '';

    if (token === '') {
        if (to.path === '/login') {
            next();
        } else {
            next({path: '/login'});
        }
    } else {
        // 存在token
        if (to.path === '/login') {
            next({path: '/index/index'}); // 去首页
        } else {
            next();
        }
    }
});

Vue.prototype.$axios = axios;
Vue.prototype.$_ = _;
Vue.prototype.$moment = moment;
Vue.use(Antd);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
