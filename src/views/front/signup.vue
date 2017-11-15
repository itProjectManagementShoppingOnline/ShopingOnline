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
      <el-form>
        <el-form-item prop="username">
          <el-input name="username" type="text" placeholder="邮箱" />
        </el-form-item>
        <el-form-item prop="username">
          <el-input name="username" type="text" placeholder="手机" />
        </el-form-item>
        <el-form-item prop="username">
          <el-input name="username" type="text" placeholder="用户名" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input name="password" placeholder="密码" />
        </el-form-item>
        <el-button type="primary" style="width:100%;margin-bottom:30px;"  @click.native.prevent="handlesignin">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: 'signup',
      };
    },
    methods: {},
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
      background: rgba(220, 220, 220, 0.25);
      border-radius: 5px;
      color: #454545;
    }
  }

</style>
