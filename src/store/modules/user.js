import {logout, refreshToken} from '@/api/user'

const state = {
    user: {}
};

const user = {
    saveUserInfo: (state, user) => {
        user.expire = new Date().getTime() + 7200 * 1000
        state.user = user
        localStorage.setItem('user', JSON.stringify(user))
        window.location.href = '/'
    },
    getUserInfo: (state) => {
        let user = localStorage.getItem('user')
        state.user = JSON.parse(user)
    },
    logout: (state) => {
        logout(state.user).then(() => {
            localStorage.removeItem('user');
            state.user = {};
            window.location.href = '/'
        })
    },
    refreshToken: (state) => {
        refreshToken(state.user).then(res => {
            res.data.expire = new Date().getTime() + 7200 * 1000
            state.user = res.data
            localStorage.setItem('user', JSON.stringify(res.data))
        })
    },
    reLogin: (state) => {
        localStorage.removeItem('user')
        state.user = {}
        window.location.href = '/'
    }
}

export default {
    state,
    mutations: user,
};
