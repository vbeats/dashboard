import {loadLanguageAsync} from "@/locale";

const actions = {
    saveUserInfo: ({commit}, user) => commit('saveUserInfo', user),
    getUserInfo: ({commit}) => commit('getUserInfo'),
    logout: ({commit}) => commit('logout'),
    refreshToken: ({commit}) => commit('refreshToken'),
    reLogin: ({commit}) => commit('reLogin'),
    sendSms: ({commit}, phone) => commit('sendSms', phone),
    setLang: ({commit}, lang) => {
        return new Promise((resolve, reject) => {
            commit('setLang', lang)
            loadLanguageAsync(lang).then(() => {
                resolve()
            }).catch((e) => {
                reject(e)
            })
        })
    }
};

export default actions;
