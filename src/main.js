import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store/index';
import 'element-ui/lib/theme-chalk/index.css'; // ele整体样式
import 'css/base/element_theme.scss'; // ele主题样式
import 'assets/css/base/base.scss'; // 基础样式

import ElementUI from 'element-ui'; // 全局引入ele
// import { Button } from 'element-ui' // 按需引入ele
// const components = [ Button ]
// for (let k of components) {
//   Vue.use(k)
// }

Vue.config.productionTip = false;

Vue.use(ElementUI);
process.env.VUE_APP_MOCK && require('@/mock/mock');// 在测试中使用Mockjs

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
