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

                                <a-form-item>
                                    <a-button block html-type="submit" size="large" style="margin-top: 16px"
                                              type="primary">
                                        登录
                                    </a-button>
                                </a-form-item>
                            </a-form>
                        </a-tab-pane>

                        <a-tab-pane key="2" tab="手机短信登录">
                            <a-form :form="form" @submit="handlePhoneLogin" style="margin-top: 12px">
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
                    <a-form :form="form" @submit="handleRegister" style="margin-top: 20px">
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
                2019 - {{this.$moment().format('YYYY')}} bootvue
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                formLayout: 'horizontal',
                form: this.$form.createForm(this),
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
                    if (!err) { // 正常输入
                        let user = values;
                        user.type = this.type;
                        this.$store.dispatch('login', user);
                    }
                });
            },
            // 手机登录
            handlePhoneLogin(e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (!err) { // 正常输入
                        let user = values;
                        user.type = this.type;
                        this.$store.dispatch('login', user);
                    }
                });
            },
            // 更改登录方式
            changeLoginType(key) {
                if (key === 1) {
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
                this.form.validateFields((err, values) => {
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
            }
        },
    };
</script>

<style lang="stylus" scoped>
    .login
        width 100vw
        height 100vh
        background-image url("../assets/img/background.svg")
        background-repeat no-repeat
        background-position center 110px
        background-size 100%
        background-color #f0f2f5
        overflow: hidden
        display flex
        flex-direction column

        .header
            widht 100%
            height 40px

        .container
            display flex
            flex-direction column
            width 100%
            align-content center
            flex 1 1

            .title
                display flex
                flex-direction column
                justify-content center
                align-items center

                .main-title
                    display flex
                    flex-direction row
                    justify-content center
                    align-items center

                    img
                        height 44px
                        width 44px

                    .title-text
                        margin-left 20px
                        color: rgba(0, 0, 0, .85)
                        font-weight: 600
                        font-size: 33px
                        font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif

                .sub-title
                    margin-top: 12px
                    margin-bottom: 40px
                    color: rgba(0, 0, 0, .45)
                    font-size: 14px


            .content
                width 368px
                margin 0 auto

                .cus-tabs
                    /*text-align center*/
                .reg-text
                    font-size: 1.4rem
                    text-align: center

                .other
                    display flex
                    flex-direction row
                    justify-content space-between
                    font-size .8rem
                    list-style none
                    line-height 22px
                    font-family -apple-system, BlinkMacSystemFont, Segoe UI, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Helvetica Neue, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
                    font-variant-numeric tabular-nums
                    text-rendering optimizeLegibility
                    font-feature-settings "tnums"

                    .social
                        display flex
                        flex-direction row

                        .text
                            color rgba(0, 0, 0, .65)

                    .register
                        color #096dd9

                        &:hover
                            cursor pointer
                            color #40A9FF

        @media screen and (min-width: 768px)
            padding 32px 0 24px

        .footer
            width 100%
            height 150px
            flex 0 0 auto
            display flex
            flex-direction row
            justify-content center

            .text
                color: rgba(0, 0, 0, .45)
                font-size: 14px;
                position fixed
                bottom 8px

    /* 注册*/
    .reg-bottom
        display flex
        flex-direction row
        justify-content space-between
        align-items center

        .reg-button
            width 200px

        .reback-text
            line-height 100%
            color: #096dd9

            &:hover
                cursor pointer
                color #40A9FF

</style>
