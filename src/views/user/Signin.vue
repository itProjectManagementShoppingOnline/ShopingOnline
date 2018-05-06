<template>
  <div class="in-sign">
    <div class="sign-form" label-position="left">
      <h2 class="form-title">登陆</h2>{{pageType}}
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
        pageType: this.$route.name,
        usernameError: '',
        passwordError: '',
        signinForm: {
          username: '',
          password: '',
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, message: '长度至少3个字符', trigger: 'blur' },

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
            this.signIn({ signinForm: this.signinForm, pageType: this.pageType }).then((resp) => {
              if (resp.status === 401.1) {
                this.usernameError = '用户名不存在';
                return false;
              }
              if (resp.status === 401.2) {
                this.usernameError = '密码错误';
                return false;
              }
              this.$router.push({ path: '/' });
              location.reload();
              return true;
            });
            return true;
          }
          console.log('error submit!!');
          return false;
        });
      },
      ...mapActions({
        signIn: 'user.index/signIn',
      }),
    },
    computed: {
      ...mapGetters({
      }),
    },
  };
</script>

<style lang="scss">
  @import "../../common/style/base.scss";

  .in-sign {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: white;


    .form-title {
      margin: 0px auto 40px auto;
      text-align: center;
      font-size: 20px;
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
