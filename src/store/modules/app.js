const state = {
    lang: 'zh-CN'
}

const app = {
    setLang: (state, lang) => {
        state.lang = lang
    }
}

export default {
    state,
    mutations: app
}