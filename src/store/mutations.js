import getters from './getters';
import AppConfig from '@/config/AppConfig';
import axios from '@/config/axios';

const state = {
    user: {
        username: '测试用户',
    },
    token: ''
};

const mutations = {
    login(state, userInfo) {
        state.user = userInfo;
        axios.post(AppConfig.loginUrl, {user: userInfo}).then(res => {
            let token = res.data.data;  //存储token
            state.token = token;
            localStorage.setItem("token", token);
            window.location.href = '/';
        })
    }
};

export default {
    state,
    mutations,
    getters,
};
