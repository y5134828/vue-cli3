<template>
  <div>
    <div class="title ta-c umar-t40">登录</div>
    <div class="small-title ta-c">
      <span class="line"></span>
      <span>登录</span>
      <span class="line"></span>
    </div>
    <el-form ref="loginForm" :model="form" :rules="loginRules" class="uinn-lr15">
      <el-form-item prop="mobile">
        <el-input placeholder="请输入手机号" v-model="form.mobile">
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input placeholder="请输入密码" v-model="form.password" show-password>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native.prevent="onSubmit" class="w-p-100">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { validMobile } from '../../utils/validate';
export default {
  name: 'Login',
  data () {
    const validateMobile = (rule, value, callback) => {
      if (!validMobile(value)) {
        callback(new Error('请输入正确的电话号'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }
    return {
      form: {
        mobile: '',
        password: ''
      },
      loginRules: {
        mobile: [{ required: true, trigger: 'blur', validator: validateMobile }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      }
    }
  },
  methods: {
    onSubmit () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$store.dispatch('userLogin', this.form).then(res => {
            this.$router.push('/index');
          }).catch(err => {
            console.log(err);
          });
        };
      });
    }
  }
};
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
