import axios from 'axios';

// 全局axios配置
axios.defaults.baseURL = '';
axios.defaults.headers['Content-Type'] = 'application/json';
axios.defaults.transformRequest = [(params) => {
    // 请求拦截
    console.log("请求参数: ", params);
    return params;
}];

axios.defaults.transformResponse = [(res) => {
    console.log("响应: ", res);
    // 响应拦截
    let data = 0;
    try {
        data = JSON.parse(res);
        if (data.code === 601) {// token无效
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
    } catch (e) {
        data = res;
    }
    return data;
}];

export default axios;
