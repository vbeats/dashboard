import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login';
import Index from "./views/index/Index";
import Base from "./views/Base";

/*处理相同路由 再次进入报错*/
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};

const originalReplace = Router.prototype.replace;
Router.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err)
};

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/index',
            name: 'base',
            component: Base,
            children: [
                {
                    path: 'index',
                    name: 'index',
                    component: Index
                }
            ]
        },
        {
            path: '*',
            redirect: '/index/index'
        }
    ]
})
