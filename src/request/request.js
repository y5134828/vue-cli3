/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios';
import store from '../store/index';
import {
  getToken
} from '@/utils/cookie';
import {
  Message,
  MessageBox
} from 'element-ui';

// 创建axios实例
var service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api 的 base_url
  timeout: 1000 * 12,
  headers: {
    'content-type': 'application/x-www-form-urlencoded'
  }
});
/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['CATALYST-ADMIN-TOKEN'] = getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config;
  },
  error => Promise.reject(error));

// 响应拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response;
    if (res.status !== 200) {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      });
      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.status === 50008 || res.status === 50012 || res.status === 50014) {
        MessageBox.confirm(
          '账号信息已过期，请重新登录', {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload(); // 为了重新实例化vue-router对象 避免bug
          });
        });
      }
      return Promise.reject(res);
    } else {
      return response.data;
    }
  },
  error => {
    console.log('err' + error); // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default service;
