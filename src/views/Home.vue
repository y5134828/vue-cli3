<template>
  <div class="p-wrap">
    <p>登录账号：{{username}}</p>
    <el-button type="primary" >退出登录</el-button>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {

    };
  },
  computed: {
    username: function () {
      return this.$store.state.user.userName;
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
