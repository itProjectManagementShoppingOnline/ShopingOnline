<template>
  <div class="in-sign">
    <div class="sign-form" label-position="left">
      <mu-icon-button icon="highlight_off" style="position: absolute;top:-20px;right: 30px;color:red" :to="{ name: 'FrontIndex'}" />
      <div class="form-title">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
          <router-link :to="{ name: 'Signin'}">
            <el-menu-item index="signin">登陆</el-menu-item>
          </router-link>
          <el-menu-item index="signup">注册</el-menu-item>
        </el-menu>
      </div>
      <el-form :model="signupForm" ref="signupForm" :rules="rules">
        <!--<el-form-item prop="email" label="邮箱">-->
          <!--<el-input name="email" type="text" placeholder="邮箱" v-model="signupForm.email"/>-->
        <!--</el-form-item>-->
        <el-form-item prop="phoneNum" label="手机">
          <el-input name="phoneNum" type="text" placeholder="手机" v-model="signupForm.phoneNum"/>
        </el-form-item>
        <el-form-item prop="username" label="用户名">
          <el-input name="username" type="text" placeholder="用户名" v-model="signupForm.username"/>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input name="password" placeholder="密码" v-model="signupForm.password"/>
        </el-form-item>
        <el-form-item prop="passwordForCheck" label="再次输入密码">
          <el-input name="passwordForCheck" placeholder="再次输入密码" v-model="signupForm.passwordForCheck" ref="passwordForCheck"/>
        </el-form-item>
        <el-button type="primary" style="width:100%;margin-bottom:30px;" @click="handlesignup">注册</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    data() {
      const validatePass1 = (rule, value, callback) => {
        if (this.signupForm.checkPass !== '') {
          this.$refs.signupForm.validateField('passwordForCheck');
        }
        callback();
      };
      const validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.signupForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        activeIndex: 'signup',
        passwordError: '',
        signupForm: {
          username: '',
//          email: '',
          phoneNum: '',
          password: '',
          passwordForCheck: '',
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 6, message: '长度至少6个字符', trigger: 'blur' },
          ],
//          email: [
//            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
//          ],
          phoneNum: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { validator: validatePass1, trigger: 'blur' },
          ],
          passwordForCheck: [
            { validator: validatePass2, trigger: 'blur' },
          ],
        },
      };
    },
    methods: {
      handlesignup() {
        this.$refs.signupForm.validate((valid) => {
          if (valid) {
            this.signup({ signupForm: this.signupForm }).then((respCode) => {
//              console.log(respCode);
              if (respCode === 401.1) {
                this.usernameError = '用户名已存在';
                return false;
              }
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
        signup: 'user.index/signup',
      }),
    },
    components: {},
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
      background-color: white;
      left: 0;
      right: 0;
      width: 400px;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      /*background: rgba(220, 220, 220, 0.25);*/
      border-radius: 5px;
      color: #454545;
    }
    .el-form-item__label {
      font-weight: 700;
    }
  }

</style>
