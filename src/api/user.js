import axios from '../utils/axios';

// 获取图形验证码
export function getCaptcha() {
    return axios.get('/auth/oauth/captcha?appid=' + process.env.VUE_APP_APPID + "&secret=" + process.env.VUE_APP_SECRET)
}

export function login(user) {
    const data = {
        'tenant_code': user.tenant_code,
        'username': user.username,
        'password': user.password,
        'key': user.key,
        'code': user.code,
        'type': 0
    }
    return axios.post('/auth/oauth/token?appid=' + process.env.VUE_APP_APPID + "&secret=" + process.env.VUE_APP_SECRET, data)
}

export function loginSms(user) {
    const data = {
        'tenant_code': user.tenant_code,
        'phone': user.phone,
        'code': user.code,
        'type': 1
    }
    return axios.post('/auth/oauth/token?appid=' + process.env.VUE_APP_APPID + "&secret=" + process.env.VUE_APP_SECRET, data)
}

export function logout(user) {
    console.log("退出登录", user.username)
}

export function refreshToken(user) {
    const data = {
        'tenant_code': user.tenant_code,
        'refresh_token': user.refresh_token,
        'type': 2
    }
    return axios.post('/auth/oauth/token?appid=' + process.env.VUE_APP_APPID + "&secret=" + process.env.VUE_APP_SECRET, data)
}

export function sendSms(phone) {
    const data = {
        phone
    }
    return axios.post('/auth/oauth/sms?appid=' + process.env.VUE_APP_APPID + "&secret=" + process.env.VUE_APP_SECRET, data)
}

