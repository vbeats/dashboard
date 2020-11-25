import request from 'axios';
import store from '@/store';
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
    message.error('网络异常~')
    return Promise.reject(error)
}

// 请求拦截器
axios.interceptors.request.use((config) => {
    const user = store.state.user.user
    config.headers.common['token'] = user.access_token;
    return config;
}, errorHandler);

// 响应拦截器
axios.interceptors.response.use((response) => {
    let res = {};
    try {
        const data = response.data
        switch (data.code) {
            case 401:  //未认证
                store.dispatch('logout')
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
