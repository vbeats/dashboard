const actions = {
    saveUserInfo: ({commit}, user) => commit('saveUserInfo', user),
    getUserInfo: ({commit}) => commit('getUserInfo'),
    logout: ({commit}) => commit('logout'),
    refreshToken: ({commit}) => commit('refreshToken'),
    reLogin: ({commit}) => commit('reLogin')
};

export default actions;
