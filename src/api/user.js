import axios from '../config/axios';

// 获取图形验证码
export function getCaptcha() {
    return axios.get('/auth/captcha')
}

export function login(user) {
    let data = new FormData();
    data.set('username', user.username);
    data.set('password', user.password);
    data.set('captcha', user.captcha);
    return axios.post('/login', data, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
}

export function refreshToken(user) {
    return axios.get('/auth/refresh_token', {
        params: {
            user_id: user.user_id,
            refresh_token: user.refresh_token
        }
    }, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
}

export function logout(user) {
    return axios.post('/logout', {user_id: user.user_id})
}

export function adminList() {
    return axios.get('/admin/list')
}
