import axios from 'axios';
import AppConfig from './AppConfig';
import AppCode from './AppCode';

// 全局axios配置
axios.defaults.baseURL = AppConfig.baseUrl;
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
        if (data.code === AppCode.TOKEN_ERROR) {// token无效
            localStorage.removeItem('token');
            window.location.href = AppConfig.loginUrl;
        }
    } catch (e) {
        data = res;
    }
    return data;
}];

export default axios;
