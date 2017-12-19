<template>
  <div class="in-sign">
    <div class="sign-form" label-position="left">
      <mu-icon-button icon="highlight_off" style="position: absolute;top:-20px;right: 30px;color:red" :to="{ name: 'FrontIndex'}" />
      <div class="form-title">
        <el-menu :default-active="activeIndex" mode="horizontal">
          <el-menu-item index="signin">登陆</el-menu-item>
          <router-link :to="{ name: 'Signup'}">
            <el-menu-item index="signup">注册</el-menu-item>
          </router-link>
        </el-menu>
      </div>
      <el-form :model="signinForm" ref="signinForm" :rules="rules">
        <el-form-item prop="username" label="用户名" ref="username" :error="usernameError">
          <el-input name="username"  type="text" placeholder="手机 用户名" v-model="signinForm.username"/>
        </el-form-item>
        <el-form-item prop="password" label="密码" ref="password">
          <el-input name="password" placeholder="密码" v-model="signinForm.password" :error="passwordError"/>
        </el-form-item>
        <el-button type="primary" style="width:100%;margin-bottom:30px;"  @click.native.prevent="handlesignin">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    data() {
      return {
        activeIndex: 'signin',
        usernameError: '',
        passwordError: '',
        signinForm: {
          username: '',
          password: '',
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 6, message: '长度至少6个字符', trigger: 'blur' },

          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
        },
      };
    },
    methods: {
      handlesignin() {
        this.$refs.signinForm.validate((valid) => {
          if (valid) {
            this.signin({ signinForm: this.signinForm }).then((respCode) => {
              console.log(respCode);
              console.log(151);
              /* 201 for name error
                202 for pass error
              */
              if (respCode === 401) {
                this.usernameError = '用户名不存在';
                return false;
              }
//              if (respCode === 401.1) {
//                this.usernameError = '用户名不存在';
//                return false;
//              }
//              if (respCode === 401.2) {
//                this.passwordError = '密码错误';
//                return false;
//              }
              this.$router.push({ path: '/' });
              return true;
            });
            return true;
          }
          console.log('error submit!!');
          return false;
        });
      },
      ...mapActions({
        signin: 'user.index/signin',
      }),
    },
    computed: {
      ...mapGetters({
        token: 'user.index/token',
      }),
    },
  };
</script>

<style lang="scss">
  @import "../../common/style/base.scss";

  .in-sign {
    height: 100vh;
    background-color: white;


    .form-title {
      margin: 0px auto 40px auto;
      width: 160px;
    li {
      font-size: 20px;
    }
    }
    .sign-form {
      position: absolute;
      position: relative;
      background-color: white;
      left: 0;
      right: 0;
      width: 400px;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }

</style>
