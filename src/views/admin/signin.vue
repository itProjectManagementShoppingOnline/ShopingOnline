<template>
  <div class="in-sign">
    <input v-model="token" />
    <div class="sign-form" label-position="left">
      <mu-icon-button icon="highlight_off" style="position: absolute;top:-20px;right: 30px;color:red" :to="{ name: 'FrontIndex'}" />
      <div class="form-title">
        <span>后台管理系统登陆</span>
      </div>
      <el-form :model="signinForm" ref="signinForm" :rules="rules">
        <el-form-item prop="username" label="用户名" ref="username" :error="usernameError">
          <el-input name="username"  type="text" placeholder="用户名" v-model="signinForm.username"/>
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
            this.signin({ signinForm: this.signinForm, role: 'admin' }).then((respCode) => {
              console.log(respCode);
              if (respCode === 401.2) {
                this.passwordError = '密码错误';
                return false;
              }
              this.$router.push({ name: 'AdminIndex' });
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
      margin-bottom: 40px;
      text-align: center;
      span{
        font-size: 30px;
        font-weight: 900;
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
