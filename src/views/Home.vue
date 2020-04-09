<template>
  <div class="p-wrap">
    <p>登录账号：{{userInfo.name}}</p>
    <el-button type="primary" @click="logout">退出登录</el-button>
  </div>
</template>

<script>
import { getSessionStorage } from '../utils/cookie';
import { Message } from 'element-ui';

export default {
  name: 'home',
  data () {
    return {

    };
  },
  computed: {
    userInfo: function () {
      return JSON.parse(getSessionStorage('userInfo'));
    }
  },
  methods: {
    logout: function () {
      this.$store.dispatch('userLogOut').then(res => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      }).catch(err => {
        Message.error(err || '退出失败，请重试');
      })
    }
  }

};
</script>

<style lang="scss" scoped>
  .p-wrap{
    text-align: center;
    p{
      padding: 10px;
    }
  }
</style>
