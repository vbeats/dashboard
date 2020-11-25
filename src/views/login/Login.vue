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
                    <a-tabs class="cus-tabs" default-active-key="1" size="large" @change="changeLoginType">
                        <a-tab-pane key="1" tab="账号密码登录">
                            <!--普通登录-->
                            <a-form :form="form" style="margin-top: 12px" @submit="handleLogin">
                                <a-form-item v-show="showTenant">
                                    <a-input v-decorator="['tenant_code',
                                    {rules: [{ required: true, message: '租户编号不能为空' }],initialValue:tenantCode}]"
                                             placeholder="租户编号"
                                             size="large" @change="inputTenantCode">
                                        <a-icon slot="prefix" style="color:rgba(0,0,0,.25)" type="user"/>
                                    </a-input>
                                </a-form-item>
                                <a-form-item>
                                    <a-input v-decorator="['username',{rules: [{ required: true, message: '用户名不能为空' }]}]"
                                             placeholder="用户名"
                                             size="large">
                                        <a-icon slot="prefix" style="color:rgba(0,0,0,.25)" type="user"/>
                                    </a-input>
                                </a-form-item>
                                <a-form-item style="margin-top: 12px">
                                    <a-input v-decorator="['password',{rules: [{ required: true, message: '密码不能为空' }]}]"
                                             placeholder="密码"
                                             size="large"
                                             type="password">
                                        <a-icon slot="prefix" style="color:rgba(0,0,0,.25)" type="lock"/>
                                    </a-input>
                                </a-form-item>

                                <a-form-item style="margin-top: 12px">
                                    <a-row>
                                        <a-col :lg="{span:14}" :md="{span:14}" :sm="{span:14}" :xl="{span:14}"
                                               :xs="{span:14}">
                                            <a-input v-decorator="['code',{rules: [{ required: true, message: '验证码不能为空' }]}]"
                                                     placeholder="验证码"
                                                     size="large">
                                                <a-icon slot="prefix" style="color:rgba(0,0,0,.25)" type="picture"/>
                                            </a-input>
                                        </a-col>
                                        <a-col :lg="{span:8,offset:2}" :md="{span:8,offset:2}" :sm="{span:8,offset:2}"
                                               :xl="{span:8,offset:2}" :xs="{span:8,offset:2}">
                                            <img
                                                :src="captcha"
                                                alt=""
                                                style="width: 100%" @click="getCaptchaImg">
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
                            <a-form :form="phoneForm" style="margin-top: 12px" @submit="handlePhoneLogin">
                                <a-form-item v-show="showTenant">
                                    <a-input v-decorator="['tenant_code',{rules: [{ required: true, message: '租户编号不能为空' }],initialValue:tenantCode}]"
                                             placeholder="租户编号"
                                             size="large" @change="inputTenantCode">
                                        <a-icon slot="prefix" style="color:rgba(0,0,0,.25)" type="user"/>
                                    </a-input>
                                </a-form-item>
                                <a-form-item>
                                    <a-input v-decorator="['phone',{rules: [
                                                 { required: true, message: '手机号不能为空' },
                                                 {
                                                     validator: (rule, value, callback) => {
                                                        const reg=/^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/
                                                          if(!reg.test(value)){
                                                              this.canSendSms=false
                                                              callback('手机号不正确');
                                                              return
                                                          }
                                                          this.canSendSms=true
                                                          callback()

                                                     },
                                                     message: '手机号不正确'
                                                 }
                                                 ]}]"
                                             placeholder="手机号"
                                             size="large"
                                             @change="inputPhone">
                                        <a-icon slot="prefix" style="color:rgba(0,0,0,.25)" type="phone"/>
                                    </a-input>
                                </a-form-item>
                                <a-form-item style="margin-top: 12px">
                                    <a-row>
                                        <a-col :lg="{span:14}" :md="{span:14}" :sm="{span:14}" :xl="{span:14}"
                                               :xs="{span:14}">
                                            <a-input v-decorator="['code',{rules: [{ required: true, message: '验证码不能为空' }]}]"
                                                     placeholder="验证码"
                                                     size="large"
                                                     type="text">
                                                <a-icon slot="prefix" style="color:rgba(0,0,0,.25)" type="mail"/>
                                            </a-input>
                                        </a-col>
                                        <a-col :lg="{span:8,offset:2}" :md="{span:8,offset:2}" :sm="{span:8,offset:2}"
                                               :xl="{span:8,offset:2}" :xs="{span:8,offset:2}">
                                            <a-button block size="large" :disabled="!canSendSms" @click="sendSms">
                                                {{ smsText }}
                                            </a-button>
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
                    <a-form :form="regForm" style="margin-top: 20px" @submit="handleRegister">
                        <a-form-item>
                            <a-input v-decorator="['reg_username',{rules: [{ required: true, message: '用户名不能为空' }]}]"
                                     placeholder="用户名"
                                     size="large">
                                <a-icon slot="suffix" style="color:rgba(0,0,0,.25)" type="user"/>
                            </a-input>
                        </a-form-item>
                        <a-form-item style="margin-top: 12px">
                            <a-input v-decorator="['reg_password',{rules: [{ required: true, message: '密码不能为空' }]}]"
                                     placeholder="密码, 至少6位, 区分大小写"
                                     size="large"
                                     type="password">
                                <a-icon slot="suffix" style="color:rgba(0,0,0,.25)" type="lock"/>
                            </a-input>
                        </a-form-item>
                        <a-form-item :hasFeedback="hasFeedback"
                                     :help="help"
                                     :validateStatus="validateStatus"
                                     style="margin-top: 12px"
                        >
                            <a-input v-decorator="['reg_repassword',{rules: [{ required: true, message: '密码不能为空' }]}]"
                                     placeholder="确认密码"
                                     size="large"
                                     type="password">
                                >
                                <a-icon v-if="!hasFeedback" slot="suffix" style="color:rgba(0,0,0,.25)" type="lock"/>
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
                            <div class="reback-text" @click="reback">
                                使用已有账户登录
                            </div>
                        </div>
                    </a-form>
                </div>
                <div v-if="type!==2" class="other">
                    <div class="social">
                        <div class="text">其它登陆方式</div>
                        <!--社交登录 图标-->
                    </div>
                    <div class="register" @click="showRegister">
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
                2019 - {{ copyright }} bootvue@gamil.com
            </div>
        </div>
    </div>
</template>

<script>
import {getCaptcha, login, loginSms, sendSms} from '@/api/user'
import moment from 'moment'
import message from 'ant-design-vue/es/message'

export default {
    name: 'Login',
    data() {
        return {
            formLayout: 'horizontal',
            form: this.$form.createForm(this),
            phoneForm: this.$form.createForm(this),
            regForm: this.$form.createForm(this),
            tenantCode: '000000', // 租户编号
            captcha: '',  // 验证码base64
            key: '', // 验证码key
            phone: '',
            canSendSms: false,
            smsText: '获取验证码',
            type: 0, // 0普通登录, 1短信登录
            validateStatus: '', // ‘success’, ‘warning’, ‘error’, ‘validating’
            help: '',// 提示信息
            hasFeedback: false, //是否显示校验图标
            showTenant: process.env.VUE_APP_TENANT === 'show', // 是否显示租户编号
            copyright: moment().format('YYYY')
        };
    },
    methods: {
        // 普通登录
        handleLogin(e) {
            e.preventDefault();
            this.form.validateFields((err, values) => {
                if (!err && this.key !== '') {
                    values.key = this.key
                    login(values).then(res => this.handleLoginRes(res));
                }
            });
        },
        // 手机登录
        handlePhoneLogin(e) {
            e.preventDefault();
            this.phoneForm.validateFields((err, values) => {
                if (!err) { // 正常输入
                    values.key = this.key;
                    loginSms(values).then(res => this.handleLoginRes(res))
                }
            });
        },
        handleLoginRes(res) {
            switch (res.code) {
                case 200:
                    this.$store.dispatch('saveUserInfo', res.data)
                    break
                default:
                    this.$message.error(res.msg)
                    break
            }
        },
        sendSms() {
            if (!this.canSendSms) {
                message.error('手机号不正确')
                return
            }
            sendSms(this.phone).then(res => {
                if (res.code !== 200) {
                    message.error(res.msg)
                } else {
                    message.success('短信已发送')
                    this.canSendSms = false;
                    let i = 60;
                    setTimeout(this.handleSmsText(i), 1000)
                }
            })
        },
        handleSmsText(i) {
            if (i <= 0) {
                this.canSendSms = true
                this.smsText = '获取验证码'
                return
            }
            this.smsText = --i + 's'
            setTimeout(this.handleSmsText(i), 1000)
        },
        inputPhone(e) {
            this.phone = e.target.value
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
        inputTenantCode(e) {
            this.tenantCode = e.target.value
        },
        // 返回登陆页
        reback() {
            this.form.resetFields();
            this.phoneForm.resetFields();
            this.type = 1
        },
        getCaptchaImg() {
            getCaptcha().then(res => {
                this.captcha = res.data.image
                this.key = res.data.key
            })
        }
    },
    created() {
        this.getCaptchaImg()
    }
};
</script>

<style lang="stylus" scoped>
@import "login.styl";
</style>
