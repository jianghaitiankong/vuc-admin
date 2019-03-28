import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import request from '@/service/http'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
import './assets/css/icon.css';
import './components/common/directives';
import "babel-polyfill";
import '../theme/index.css'
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.use(ElementUI, {
    size: 'small'
});
Vue.prototype.$axios = axios;
Vue.prototype.$request = request
//使用钩子函数对路由进行权限跳转
//router.beforeEach((to, from, next) => {
//  const role = sessionStorage.getItem('ms_username');
//  if (!role && to.path !== '/login') {
//      next('/login');
//  } else {
//      next();
// }
//})


new Vue({
    router,
    render: h => h(App)
}).$mount('#app')