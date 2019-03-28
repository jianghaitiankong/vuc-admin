<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                                {{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';
    export default {
        data() {
            return {
                collapse: true,
                items: [
//                  {
//                      icon: 'el-icon-menu',
//                      index: 'dashboard',
//                      title: '系统首页'
//                  },
                    {
                        icon: 'el-icon-picture',
                        index: 'Upload',
                        title: '首页大图替换'
                    },
//                  {
//                      icon: 'el-icon-message',
//                      index: 'About',
//                      title: '关于我们'
//                  },
                     {
                        icon: 'el-icon-message',
                        index: 'Team',
                        title: '团队介绍'
                    },
                    {
                        icon: 'el-icon-message',
                        index: '2',
                        title: '关于我们',
                        subs: [
                            {
                                index: 'About',
                                title: '关于我们',
                            },
                            {
                                index: 'Contact',
                                title: '联系我们',
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-news',
                        index: '3',
                        title: '新闻动态',
                        subs: [
                            {
                                index: 'NewsList',
                                title: '新闻列表',
                            },
                            {
                                index: 'AddNews',
                                title: '增加新闻',
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-message',
                        index: '4',
                        title: '加入我们',
                        subs: [
                            {
                                index: 'JobList',
                                title: '招聘列表',
                            },
                            {
                                index: 'AddJob',
                                title: '发布招聘',
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-tickets',
                        index: '5',
                        title: '江海业务',
                        subs: [
                            {
                                index: 'BusinessList',
                                title: '业务列表',
                            },
                            {
                                index: 'BusinessCategory',
                                title: '业务分类',
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-tickets',
                        index: '6',
                        title: '江海产品',
                        subs: [
                            {
                                index: 'ProductList',
                                title: '产品列表'
                            },
                            {
                                index: 'ProductCategory',
                                title: '产品分类'
                            }
                        ]
                    },{
                        icon: 'el-icon-service',
                        index: '7',
                        title: '媒体中心',
                        subs: [
                            {
                                index: 'VideoList',
                                title: '视频列表'
                            },
                            {
                                index: 'AddVideo',
                                title: '添加媒体视频'
                            }
                        ]
                    },
//                  {
//                      icon: 'el-icon-phone',
//                      index: 'Contact',
//                      title: '联系我们'
//                  },
					{
                        icon: 'el-icon-tickets',
                        index: 'Authenticatorlist',
                        title: '认证者列表'
                    },
                    {
                        icon: 'el-icon-view',
                        index: 'Adminlist',
                        title: '管理员列表'
                    }
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 150px;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
