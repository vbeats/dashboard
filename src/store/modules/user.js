import {logout, refreshToken, sendSms} from '@/api/user'
import message from 'ant-design-vue/es/message'

const state = {
    user: {
        user_id: 0,
        access_token: '',
        refresh_token: '',
        username: '',
        authorities: '',
        expire: 0
    }
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
    },
    sendSms: (state, phone) => {
        sendSms(phone).then(res => {
            if (res.code !== 200) {
                message.error(res.msg)
            } else {
                message.success('短信已发送')
            }
        })
    }
}

export default {
    state,
    mutations: user,
};
