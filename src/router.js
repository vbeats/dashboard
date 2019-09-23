import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login';
import Index from "./views/index/Index";
import Base from "./views/Base";

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
