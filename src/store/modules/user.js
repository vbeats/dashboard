import {logout, refreshToken} from '@/api/user'
import router from "@/router";

const state = {
    user: {
        user_id: 0,
        access_token: '',
        refresh_token: '',
        username: '',
        roles: '',
        expires: 0,
        phone: '',
        avatar: '',
        time: 0  // 用户登录时间(比对token有效时间)
    }
};

const user = {
    logout: (state) => {
        logout(state.user)
        localStorage.removeItem('user')
        state.user = {}
        router.replace('/login')
    },
    getUserInfo: (state) => {
        let user = localStorage.getItem('user')
        state.user = JSON.parse(user)
    },
    saveUserInfo: (state, user) => {
        user.time = new Date().getTime()
        user.expires = new Date().getTime() + user.expires * 1000
        state.user = user
        localStorage.setItem('user', JSON.stringify(user))
        router.replace('/index')
    },
    // 刷新新的access_token
    refreshToken: async (state) => {
        await refreshToken(state.user).then(res => {
            const time = state.user.time  // 原始登录时保存的time值
            res.data.expire = new Date().getTime() + res.data.expires * 1000
            state.user = res.data
            state.user.time = time
            localStorage.setItem('user', JSON.stringify(state.user))
        })
    }
}

export default {
    state,
    mutations: user,
};
