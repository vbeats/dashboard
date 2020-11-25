import {loadLanguageAsync} from "@/locale";

const actions = {
    logout: ({commit}) => commit('logout'),
    saveUserInfo: ({commit}, user) => commit('saveUserInfo', user),
    getUserInfo: ({commit}) => commit('getUserInfo'),
    refreshToken: ({commit}) => commit('refreshToken'),
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
