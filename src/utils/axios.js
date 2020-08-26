import request from 'axios';
import store from '@/store';
import code from '@/config/code'
import message from 'ant-design-vue/es/message'

const axios = request.create({
    baseURL: process.env.VUE_APP_API,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 6000
})

// 异常处理
const errorHandler = (error) => {
    message.error('请求异常~')
    return Promise.reject(error)
}

// 请求拦截器
axios.interceptors.request.use((config) => {
    const user = store.state.user.user
    if (user && user.access_token !== '' && config.url !== '/auth/refresh_token') {
        if (user.expire - new Date().getTime() <= 7000) {
            // 刷新 access_token
            store.dispatch('refreshToken')
        }
        config.headers.common['token'] = store.state.user.user.access_token;
    }
    return config;
}, errorHandler);

// 响应拦截器
axios.interceptors.response.use((response) => {
    let res = {};
    try {
        switch (response.data.code) {
            case code.ACCESS_TOKEN_ERROR:  // access_token失效
                break
            case code.REFRESH_TOKEN_ERROR:  // refresh_token失效
                store.dispatch('reLogin')
                break
            default:
                res = response.data
        }
    } catch (e) {
        res = response;
    }

    return res;
}, errorHandler);

export default axios;
