import { login } from '@/request/api/login';
import { getToken, setToken, removeToken } from '@/utils/cookie';
import { Message } from 'element-ui';

const user = {
  state: {
    token: getToken(),
    userName: '123'
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      // const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(JSON.stringify(userInfo)).then(response => {
          if (response.code !== 'SUCCESS') {
            Message({
              showClose: true,
              message: response.msg
            });
            reject(response);
          } else {
            setToken(response.data.token);
            commit('SET_TOKEN', response.data.token);
            commit('SET_NAME', response.data.name);
            resolve();
          }
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 登出
    LogOut ({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '');
        commit('SET_ROLES', []);
        removeToken();
        resolve();
      });
    },

    // 前端 登出
    FedLogOut ({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '');
        removeToken();
        resolve();
      });
    }
  }
};

export default user;
