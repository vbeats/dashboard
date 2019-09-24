const actions = {
    //登录
    login({commit}, userInfo) {
        commit('login', userInfo);
    },
    //退出登录
    logout({commit}) {
        commit('logout');
    }
};

export default actions;
