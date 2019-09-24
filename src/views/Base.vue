<template>
    <div class="base">
        <a-layout>
            <!--侧边导航栏-->
            <a-layout-sider :collapsed="collapsed" @breakpoint="isCollapsed" breakpoint="md"
                            collapsedWidth="80">
                <div class="logo">
                    <img alt="" src="@/assets/img/logo.svg">
                    <h1 class="text" v-show="!collapsed">哇咔咔 ~ ~</h1>
                </div>
                <a-menu
                        :defaultOpenKeys="['sub1']"
                        :defaultSelectedKeys="['index']"
                        :inlineCollapsed="collapsed"
                        class="slide-nav"
                        mode="inline"
                        theme="dark"
                        @click="changeRoute"
                >
                    <a-menu-item key="index">
                        <a-icon type="pie-chart"/>
                        <span>Option 1</span>
                    </a-menu-item>
                    <a-menu-item key="2">
                        <a-icon type="desktop"/>
                        <span>Option 2</span>
                    </a-menu-item>
                    <a-menu-item key="3">
                        <a-icon type="inbox"/>
                        <span>Option 3</span>
                    </a-menu-item>
                    <a-sub-menu key="sub1">
                        <span slot="title"><a-icon type="mail"/><span>Navigation One</span></span>
                        <a-menu-item key="5">Option 5</a-menu-item>
                        <a-menu-item key="6">Option 6</a-menu-item>
                        <a-menu-item key="7">Option 7</a-menu-item>
                        <a-menu-item key="8">Option 8</a-menu-item>
                    </a-sub-menu>
                    <a-sub-menu key="sub2">
                        <span slot="title"><a-icon type="appstore"/><span>Navigation Two</span></span>
                        <a-menu-item key="9">Option 9</a-menu-item>
                        <a-menu-item key="10">Option 10</a-menu-item>
                        <a-sub-menu key="sub3" title="Submenu">
                            <a-menu-item key="11">Option 11</a-menu-item>
                            <a-menu-item key="12">Option 12</a-menu-item>
                        </a-sub-menu>
                    </a-sub-menu>
                </a-menu>
            </a-layout-sider>
            <a-layout>
                <!--头部-->
                <a-layout-header class="base-header">
                    <a-button @click="toggleCollapsed" type="primary">
                        <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'"/>
                    </a-button>
                    <!--右侧 信息-->
                    <div class="system-info">
                        <a-dropdown placement="bottomRight">
                            <a class="user-info">
                                <img alt="" class="avatar" src="@/assets/img/avatar.png">
                                <div>{{getUserInfo.username}}</div>
                            </a>
                            <a-menu @click="handleSystemClick" slot="overlay">
                                <a-menu-item key="0" style="width: 150px">
                                    <a href="http://www.alipay.com/" target="_blank">
                                        <a-icon style="margin-right: 8px" type="cloud"/>
                                        个人中心</a>
                                </a-menu-item>
                                <a-menu-item key="1">
                                    <a href="http://www.taobao.com/" target="_blank">
                                        <a-icon style="margin-right: 8px" type="setting"/>
                                        个人设置</a>
                                </a-menu-item>
                                <a-menu-divider/>
                                <a-menu-item key="logout">退出登录</a-menu-item>
                            </a-menu>
                        </a-dropdown>
                    </div>
                </a-layout-header>
                <!--内容区-->
                <a-layout-content class="base-content">
                    <router-view/>
                </a-layout-content>
                <!--底部-->
                <a-layout-footer>
                    <div class="footer">
                        Copyright &nbsp;
                        <a-icon type="copyright"/> &nbsp;
                        2019 - {{this.$moment().format('YYYY')}} &nbsp; bootvue
                    </div>
                </a-layout-footer>
            </a-layout>
        </a-layout>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: "Base",
        data() {
            return {
                collapsed: false,//是否收起
            }
        },
        computed: {
            ...mapGetters(['getUserInfo'])
        },
        methods: {
            /*切换nav 收起  展开状态*/
            toggleCollapsed() {
                this.collapsed = !this.collapsed
            },
            /*nav触发 收起*/
            isCollapsed(broken) {
                this.collapsed = broken
            },
            /*右上角点击事件*/
            handleSystemClick({key}) {
                switch (key) {
                    case 'logout': //退出登录
                        this.$store.dispatch('logout');
                        break;
                    case '1':
                        break;
                    default:
                        break;
                }
            },
            /*路由切换*/
            changeRoute(e) {
                switch (e.key) {
                    case 'index': //首页
                        this.$router.replace({path: '/index/index'});
                        break;
                    case '2':
                        this.$router.replace({path: '/index/test'});
                        break;
                }
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .base
        width 100%
        height 100%
        min-height 0

        .logo
            width 100%
            height 64px
            display flex
            justify-content center
            align-items center
            min-width 80px

            img
                width 32px
                height 32px

            h1
                display: inline-block
                margin: 0 0 0 12px
                color: #fff
                font-weight: 600
                font-size: 20px
                font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif
                vertical-align: middle

        .slide-nav
            height calc(100vh - 64px)

        .base-header
            background-color #fff
            padding-left 20px
            display flex
            flex-direction row
            align-content center
            align-items center

            .system-info
                margin-left auto
                margin-right 12px

                .user-info
                    display flex
                    flex-direction row
                    align-items center

                    .avatar
                        width 32px
                        height 32px
                        margin-right 12px


        .base-content
            margin 24px

        .footer
            display flex
            flex-direction row
            align-items center
            justify-content center


</style>
