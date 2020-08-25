export default {
    getUserInfo: (state) => {
        return state.user.user
    },
    getLang: (state) => {
        return state.app.lang
    }
};
