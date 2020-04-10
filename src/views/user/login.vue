<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="form" :rules="loginRules" class="uinn-lr15 login-form">
      <h3 class="title">登录</h3>
      <el-form-item prop="mobile">
        <el-input placeholder="请输入手机号" size="medium" v-model="form.mobile"></el-input>
      </el-form-item>
      <el-form-item  prop="verify_code" class="verify_code">
        <el-input placeholder="请输入六位验证码" size="medium" v-model="form.verify_code" class=""></el-input>
        <el-button :disabled="!canClick" :class="{disabled: !canClick}" type="primary" class="send-code" @click="handleSendCode"> {{ content }} </el-button>
      </el-form-item>
      <el-form-item prop="password">
        <el-input placeholder="请输入密码" v-model="form.password" size="medium" show-password></el-input>
      </el-form-item>
      <el-form-item class="login-btn-item">
        <el-button type="primary" @click.native.prevent="onSubmit" class="w-p-100 login-btn">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { validMobile } from '../../utils/validate';
import { sendSmsCode } from '../../request/api/login';

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
      if (value.length < 6) {
        callback(new Error('密码不能小于6位'))
      } else {
        callback()
      }
    }
    const validateCode = (rule, value, callback) => {
      if (value.length !== 6) {
        callback(new Error('请输入正确的验证码'))
      } else {
        callback()
      }
    }
    return {
      form: {
        mobile: '',
        password: '',
        verify_code: ''
      },
      loginRules: {
        mobile: [{ required: true, trigger: 'blur', validator: validateMobile }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }],
        verify_code: [{ required: true, trigger: 'blur', validator: validateCode }]
      },
      redirect: undefined,
      content: '发送验证码',
      totalTime: 60,
      canClick: true // 添加canClick
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
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
    },
    /** 处理发送验证码 */
    handleSendCode () {
      var formData = JSON.stringify({
        'target': this.form.mobile,
        'vcode_type': 'reset'
      });
      this.countDown(); // 无接口测试
      return;
      // eslint-disable-next-line no-unreachable
      sendSmsCode(formData).then((response) => {
        if (response.code === 1) {
          this.countDown();
        } else {
          this.$message({
            showClose: true,
            message: response.msg,
            type: 'error'
          })
        }
      }).catch(() => {

      })
    },
    /** 倒计时 */
    countDown () {
      if (!this.canClick) return // 改动的是这两行代码
      this.canClick = false
      this.content = this.totalTime + 's后重新发送'
      var clock = window.setInterval(() => {
        this.totalTime--
        this.content = this.totalTime + 's后重新发送'
        if (this.totalTime < 0) {
          window.clearInterval(clock)
          this.content = '重新发送验证码'
          this.totalTime = 60
          this.canClick = true // 这里重新开启
        }
      }, 1000)
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 98%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  .el-form-item.verify_code{
    width: 70%;
    position: relative;
    .send-code{
      position: absolute;
      right: -43%;
      height: 47px;
    }
  }
  .disabled{
    background-color: #a0cfff;
    border-color: #a0cfff;
    color:#FFF;
    cursor: not-allowed;  // 鼠标变化
  }
}

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
    .login-btn-item{
      border: none;
      margin-top: 30px;
      .login-btn{
        height: 47px;
        font-size: 16px;
      }
    }
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
