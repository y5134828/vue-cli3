<template>
  <div>
    <div class="title ta-c umar-t40">登录</div>
    <div class="small-title ta-c">
      <span class="line"></span>
      <span>登录</span>
      <span class="line"></span>
    </div>
    <el-form ref="form" :model="form" class="uinn-lr15">
      <el-form-item>
        <el-input placeholder="请输入手机号" v-model="form.mobile">
          <template slot="prepend">Http://</template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="请输入密码" v-model="form.password">
          <template slot="prepend">Http://</template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" class="w-p-100">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        mobile: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit () {
      this.$store
        .dispatch('Login', this.form)
        .then(res => {
          this.$router.push('/index')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss">
.title {
  font-size: 32px;
  color: #6284ff;
  margin-bottom: 30px;
}
.small-title {
  margin: 7px 0 35px;
  font-size: 12px;
  color: #999;
  .line {
    width: 102px;
    display: inline-block;
    vertical-align: middle;
    border-bottom: 1px solid #ccc;
  }
}
</style>
