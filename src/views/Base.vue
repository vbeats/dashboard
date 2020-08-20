<template>
    <div class="base">
        <a-layout>
            <!--侧边导航栏-->
            <a-layout-sider :collapsed="collapsed" @breakpoint="isCollapsed" breakpoint="md"
                            collapsedWidth="80" width="256">
                <div class="logo">
                    <img alt="" src="@/assets/img/logo.svg">
                    <h1 class="text" v-show="!collapsed">哇咔咔 ~ ~</h1>
                </div>
                <a-menu
                    :defaultOpenKeys="['sub1']"
                    :defaultSelectedKeys="['index']"
                    :inlineCollapsed="collapsed"
                    @click="changeRoute"
                    class="slide-nav"
                    mode="inline"
                    theme="dark"
                >
                    <a-menu-item key="index">
                        <a-icon type="pie-chart"/>
                        <span>首页</span>
                    </a-menu-item>
                    <a-menu-item key="2">
                        <a-icon type="desktop"/>
                        <span>Test页</span>
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
                        <a-dropdown placement="bottomCenter">
                            <a class="user-info">
                                <img alt="" class="avatar" src="@/assets/img/avatar.png">
                                <div>{{ getUserInfo.username }}</div>
                            </a>
                            <a-menu @click="handleSystemClick" slot="overlay">
                                <a-menu-item key="0" style="width: 150px">
                                    <a href="https://github.com/boot-vue" target="_blank">
                                        <a-icon style="margin-right: 8px" type="cloud"/>
                                        个人中心</a>
                                </a-menu-item>
                                <a-menu-item key="1">
                                    <a href="https://boot-vue.github.io/Notes/" target="_blank">
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
                        Copyright
                        <div class="copyright-icon">
                            <a-icon type="copyright"/>
                        </div>
                        2019 - {{ copyright }} &nbsp; bootvue
                    </div>
                </a-layout-footer>
            </a-layout>
        </a-layout>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
import moment from 'moment'

export default {
    name: "Base",
    data() {
        return {
            collapsed: false,//是否收起
            copyright: moment().format('YYYY')
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
                    this.$router.replace({path: '/index'});
                    break;
                case '2':
                    this.$router.replace({path: '/test'});
                    break;
            }
        }
    },
    created() {
        this.$store.dispatch('getUserInfo')
    }
}
</script>

<style lang="stylus" scoped>
@import "./base.styl";
</style>
