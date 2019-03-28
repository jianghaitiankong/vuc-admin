import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
//	mode:'history',
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/About',
                    component: resolve => require(['../components/page/About.vue'], resolve),
                    meta: { title: '关于我们' }
                },
                {
                    path: '/Team',
                    component: resolve => require(['../components/page/Team.vue'], resolve),
                    meta: { title: '团队管理' }
                },
                 {
                    path: '/AddCrew',
                    component: resolve => require(['../components/page/AddCrew.vue'], resolve),
                    meta: { title: '添加人员' }
                },
                {
                    path: '/EditCrew',
                    component: resolve => require(['../components/page/EditCrew.vue'], resolve),
                    meta: { title: '修改人员' }
                },
                {
                    path: '/NewsList',
                    component: resolve => require(['../components/page/NewsList.vue'], resolve),
                    meta: { title: '新闻列表' }
                },
                {
                    path: '/AddNews',
                    component: resolve => require(['../components/page/AddNews.vue'], resolve),
                    meta: { title: '添加新闻' }
                },
                {
                    path: '/JobList',
                    component: resolve => require(['../components/page/JobList.vue'], resolve),
                    meta: { title: '招聘列表' }
                },
                {
                    path: '/AddJob',
                    component: resolve => require(['../components/page/AddJob.vue'], resolve),
                    meta: { title: '发布招聘' }
                },
                {
                    path: '/ProductList',
                    component: resolve => require(['../components/page/ProductList.vue'], resolve),
                    meta: { title: '产品列表' }
                },
                {
                    path: '/ProductCategory',
                    component: resolve => require(['../components/page/ProductCategory.vue'], resolve),
                    meta: { title: '产品分类' }
                },
                {
                    path: '/AddProduct',
                    component: resolve => require(['../components/page/AddProduct.vue'], resolve),
                    meta: { title: '添加产品' }
                },
                {
                    path: '/BusinessList',
                    component: resolve => require(['../components/page/BusinessList.vue'], resolve),
                    meta: { title: '业务列表' }
                },
                {
                    path: '/BusinessCategory',
                    component: resolve => require(['../components/page/BusinessCategory.vue'], resolve),
                    meta: { title: '业务分类' }
                },
                {
                    path: '/AddBusiness',
                    component: resolve => require(['../components/page/AddBusiness.vue'], resolve),
                    meta: { title: '添加业务' }
                },
                {
                    path: '/Contact',
                    component: resolve => require(['../components/page/Contact.vue'], resolve),
                    meta: { title: '联系我们' }
                },
                {
                    path: '/AddContact',
                    component: resolve => require(['../components/page/AddContact.vue'], resolve),
                    meta: { title: '增加基地' }
                },
                {
                    path: '/EditContact',
                    component: resolve => require(['../components/page/EditContact.vue'], resolve),
                    meta: { title: '修改基地' }
                },
                {
                    path: '/Authenticatorlist',
                    component: resolve => require(['../components/page/Authenticatorlist.vue'], resolve),
                    meta: { title: '认证者列表' }
                },
                {
                    path: '/AdminList',
                    component: resolve => require(['../components/page/AdminList.vue'], resolve),
                    meta: { title: '管理员列表' }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve),
                    meta: { title: '首页大图替换' }   
                },
                {
                    path: '/VideoList',
                    component: resolve => require(['../components/page/VideoList.vue'], resolve),
                    meta: { title: '媒体视频列表' }
                },
                {
                    path: '/modifyVideo',
                    component: resolve => require(['../components/page/modifyVideo.vue'], resolve),
                    meta: { title: '修改媒体视频' }
                },
                {
                    path: '/AddVideo',
                    component: resolve => require(['../components/page/AddVideo.vue'], resolve),
                    meta: { title: '添加媒体视频' }
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
