const actions = {
    saveUserInfo: ({commit}, user) => commit('saveUserInfo', user),
    getUserInfo: ({commit}) => commit('getUserInfo'),
    logout: ({commit}) => commit('logout'),
    refreshToken: ({commit}) => commit('refreshToken'),
    reLogin: ({commit}) => commit('reLogin'),
    sendSms: ({commit}, phone) => commit('sendSms', phone)
};

export default actions;
