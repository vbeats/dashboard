<template>
    <div class="login">
        <!--顶部-->
        <div class="header">
            <!--暂时留空-->
        </div>
        <!--中间内容区-->
        <div class="container">
            <div class="title">
                <div class="main-title">
                    <img alt="" src="@/assets/img/logo.svg"/>
                    <div class="title-text">Vue 棒棒哒</div>
                </div>
                <div class="sub-title">
                    这是一行小字...嘿嘿嘿....账号 密码任意..嘿嘿嘿
                </div>
            </div>
            <div class="content">
                <!--登录入口-->
                <div v-if="type!==2">
                    <a-tabs @change="changeLoginType" class="cus-tabs" default-active-key="1" size="large">
                        <a-tab-pane key="1" tab="账号密码登录">
                            <!--普通登录-->
                            <a-form :form="form" @submit="handleLogin" style="margin-top: 12px">
                                <a-form-item>
                                    <a-input placeholder="用户名"
                                             size="large"
                                             v-decorator="['username',{rules: [{ required: true, message: '用户名不能为空' }]}]">
                                        <a-icon slot="prefix" style="color:rgba(0,0,0,.25)" type="user"/>
                                    </a-input>
                                </a-form-item>
                                <a-form-item style="margin-top: 12px">
                                    <a-input placeholder="密码"
                                             size="large"
                                             type="password"
                                             v-decorator="['password',{rules: [{ required: true, message: '密码不能为空' }]}]">
                                        <a-icon slot="prefix" style="color:rgba(0,0,0,.25)" type="lock"/>
                                    </a-input>
                                </a-form-item>

                                <a-form-item style="margin-top: 12px">
                                    <a-row>
                                        <a-col :lg="{span:14}" :md="{span:14}" :sm="{span:14}" :xl="{span:14}"
                                               :xs="{span:14}">
                                            <a-input placeholder="验证码"
                                                     size="large"
                                                     v-decorator="['captcha',{rules: [{ required: true, message: '验证码不能为空' }]}]">
                                                <a-icon slot="prefix" style="color:rgba(0,0,0,.25)" type="picture"/>
                                            </a-input>
                                        </a-col>
                                        <a-col :lg="{span:8,offset:2}" :md="{span:8,offset:2}" :sm="{span:8,offset:2}"
                                               :xl="{span:8,offset:2}" :xs="{span:8,offset:2}">
                                            <img
                                                :src="captcha"
                                                @click="getCaptchaImg"
                                                alt="" style="width: 100%">
                                        </a-col>
                                    </a-row>
                                </a-form-item>

                                <a-form-item>
                                    <a-button block html-type="submit" size="large" style="margin-top: 16px"
                                              type="primary">
                                        登录
                                    </a-button>
                                </a-form-item>
                            </a-form>
                        </a-tab-pane>

                        <a-tab-pane key="2" tab="手机短信登录">
                            <a-form :form="phoneForm" @submit="handlePhoneLogin" style="margin-top: 12px">
                                <a-form-item>
                                    <a-input placeholder="手机号"
                                             size="large"
                                             v-decorator="['phone',{rules: [{ required: true, message: '手机号不能为空' }]}]">
                                        <a-icon slot="prefix" style="color:rgba(0,0,0,.25)" type="phone"/>
                                    </a-input>
                                </a-form-item>
                                <a-form-item style="margin-top: 12px">
                                    <a-row>
                                        <a-col :lg="{span:14}" :md="{span:14}" :sm="{span:14}" :xl="{span:14}"
                                               :xs="{span:14}">
                                            <a-input placeholder="验证码"
                                                     size="large"
                                                     type="text"
                                                     v-decorator="['code',{rules: [{ required: true, message: '验证码不能为空' }]}]">
                                                <a-icon slot="prefix" style="color:rgba(0,0,0,.25)" type="mail"/>
                                            </a-input>
                                        </a-col>
                                        <a-col :lg="{span:8,offset:2}" :md="{span:8,offset:2}" :sm="{span:8,offset:2}"
                                               :xl="{span:8,offset:2}" :xs="{span:8,offset:2}">
                                            <a-button block size="large">
                                                获取验证码
                                            </a-button>
                                        </a-col>
                                    </a-row>
                                </a-form-item>

                                <a-form-item style="margin-top: 12px">
                                    <a-row>
                                        <a-col :lg="{span:14}" :md="{span:14}" :sm="{span:14}" :xl="{span:14}"
                                               :xs="{span:14}">
                                            <a-input placeholder="验证码"
                                                     size="large"
                                                     v-decorator="['captcha',{rules: [{ required: true, message: '验证码不能为空' }]}]">
                                                <a-icon slot="prefix" style="color:rgba(0,0,0,.25)" type="picture"/>
                                            </a-input>
                                        </a-col>
                                        <a-col :lg="{span:8,offset:2}" :md="{span:8,offset:2}" :sm="{span:8,offset:2}"
                                               :xl="{span:8,offset:2}" :xs="{span:8,offset:2}">
                                            <img
                                                :src="captcha"
                                                @click="getCaptchaImg"
                                                alt="" style="width: 100%">
                                        </a-col>
                                    </a-row>
                                </a-form-item>

                                <a-form-item>
                                    <a-button block html-type="submit" size="large" style="margin-top: 16px"
                                              type="primary">
                                        登录
                                    </a-button>
                                </a-form-item>
                            </a-form>
                        </a-tab-pane>
                    </a-tabs>
                </div>
                <!--注册入口-->
                <div v-if="type===2">
                    <div class="reg-text">用户注册</div>
                    <a-form :form="regForm" @submit="handleRegister" style="margin-top: 20px">
                        <a-form-item>
                            <a-input placeholder="用户名"
                                     size="large"
                                     v-decorator="['reg_username',{rules: [{ required: true, message: '用户名不能为空' }]}]">
                                <a-icon slot="suffix" style="color:rgba(0,0,0,.25)" type="user"/>
                            </a-input>
                        </a-form-item>
                        <a-form-item style="margin-top: 12px">
                            <a-input placeholder="密码, 至少6位, 区分大小写"
                                     size="large"
                                     type="password"
                                     v-decorator="['reg_password',{rules: [{ required: true, message: '密码不能为空' }]}]">
                                <a-icon slot="suffix" style="color:rgba(0,0,0,.25)" type="lock"/>
                            </a-input>
                        </a-form-item>
                        <a-form-item :hasFeedback="hasFeedback"
                                     :help="help"
                                     :validateStatus="validateStatus"
                                     style="margin-top: 12px"
                        >
                            <a-input placeholder="确认密码"
                                     size="large"
                                     type="password"
                                     v-decorator="['reg_repassword',{rules: [{ required: true, message: '密码不能为空' }]}]">
                                >
                                <a-icon slot="suffix" style="color:rgba(0,0,0,.25)" type="lock" v-if="!hasFeedback"/>
                            </a-input>
                        </a-form-item>

                        <div class="reg-bottom">
                            <div class="reg-button">
                                <a-form-item>
                                    <a-button block html-type="submit" size="large" style="margin-top: 16px"
                                              type="primary">
                                        注 册
                                    </a-button>
                                </a-form-item>
                            </div>
                            <div @click="reback" class="reback-text">
                                使用已有账户登录
                            </div>
                        </div>
                    </a-form>
                </div>
                <div class="other" v-if="type!==2">
                    <div class="social">
                        <div class="text">其它登陆方式</div>
                        <!--社交登录 图标-->
                    </div>
                    <div @click="showRegister" class="register">
                        注册账户
                    </div>
                </div>
            </div>
            <div class="foot">

            </div>
        </div>
        <!--脚底下-->
        <div class="footer">
            <div class="text">
                Copyright
                <a-icon type="copyright"/>
                2019 - {{ this.$moment().format('YYYY') }} bootvue
            </div>
        </div>
    </div>
</template>

<script>
import {getCaptcha, login} from '@/api/user'

export default {
    name: 'Login',
    data() {
        return {
            formLayout: 'horizontal',
            form: this.$form.createForm(this),
            phoneForm: this.$form.createForm(this),
            regForm: this.$form.createForm(this),
            captcha: '',
            type: 0, // 0普通登录, 1短信登录, 2注册
            validateStatus: '', // ‘success’, ‘warning’, ‘error’, ‘validating’
            help: '',// 提示信息
            hasFeedback: false, //是否显示校验图标
        };
    },
    methods: {
        // 普通登录
        handleLogin(e) {
            e.preventDefault();
            this.form.validateFields((err, values) => {
                if (!err) {
                    switch (this.type) {
                        case 0:
                            login(values).then(res => {
                                switch (res.code) {
                                    case 200:
                                        this.$store.dispatch('saveUserInfo', res.data)
                                        break
                                    default:
                                        this.$message.error(res.msg)
                                        this.getCaptchaImg()
                                        break
                                }
                            })
                            break
                        case 1:
                            break
                    }
                }
            });
        },
        // 手机登录
        handlePhoneLogin(e) {
            e.preventDefault();
            this.phoneForm.validateFields((err, values) => {
                if (!err) { // 正常输入
                    console.log(values)
                }
            });
        },
        // 更改登录方式
        changeLoginType(key) {
            if (key === '1') {
                this.type = 0;
            } else {
                this.type = 1;
            }
        },
        // 展示注册
        showRegister() {
            this.type = 2;
        },
        // 提交注册
        handleRegister(e) {
            e.preventDefault();
            this.regForm.validateFields((err, values) => {
                if (!err) {
                    if (values.reg_password === values.reg_repassword) {
                        console.log(values)
                    } else {
                        this.hasFeedback = true;
                        this.validateStatus = 'error';
                        this.help = '两次密码输入不一致'
                    }
                }
            })
        },
        // 返回登陆页
        reback() {
            this.type = 1
        },
        getCaptchaImg() {
            getCaptcha().then(res => {
                this.captcha = res.data
            })
        }
    },
    created() {
        this.getCaptchaImg()
        console.log(this.$store)
    }
};
</script>

<style lang="stylus" scoped>
@import "login.styl";
</style>
