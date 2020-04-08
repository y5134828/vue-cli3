import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes';
import store from '../store';
import { Message } from 'element-ui';
import { getToken } from '@/utils/cookie'; // getToken from cookie

Vue.use(Router);

// 路由配置
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {
        x: 0,
        y: 0
      };
    }
  }
});

const whiteList = ['/user/login', 'register']; // 不重定向白名单
router.beforeEach((to, from, next) => {
  if (getToken()) {
    if (whiteList.indexOf(to.path) !== -1) {
      next({ path: '/' });
    } else {
      if (store.state.user.userInfo) {
        store.dispatch('getUserInfo').then(res => {
          next({ ...to });
        }).catch(res => {
          store.dispatch('userLogOut').then(err => {
            Message.error(err || '登录信息过期，请登录');
          });
        });
      }
    };
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/user/login?redirect=${to.path}`); // 否则全部重定向到登录页
    }
  }
  next();
});

router.afterEach((to, from, next) => {
  // window.scrollTo(0, 0);
});

export default router;
