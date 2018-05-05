<template>
  <header class="header" v-if="header">
    <el-menu :default-active="activeItem" class="header-menu" mode="horizontal">
      <div class="header-menu-wrap">
        <div class="header-menu-manage">
          <router-link to="/">
            <el-menu-item index="user">用户管理</el-menu-item>
          </router-link>
          <router-link to="/">
            <el-menu-item index="course">课程管理</el-menu-item>
          </router-link>
          <router-link to="/">
            <el-menu-item index="activity">活动管理</el-menu-item>
          </router-link>
        </div>
        <div class="header-menu-my">
          <router-link :to="{ name: 'Signin'}" v-if="!token">
            <el-menu-item index="signin" >登陆</el-menu-item>
          </router-link>
          <!--<router-link :to="{ name: 'Signup'}" v-if="!token">-->
            <!--<el-menu-item index="signup" >注册</el-menu-item>-->
          <!--</router-link>-->
          <router-link :to="{ name: 'UserInfo'}" v-if="token">
            <el-menu-item index="myInfo" v-if="token">我的信息</el-menu-item>
          </router-link>
          <el-menu-item index="myInfo" v-if="token" @click="handleSignout" >退出登陆</el-menu-item>
        </div>
      </div>
    </el-menu>
    <div class="header-board">
      <div class="header-board-inner">
        <div class="header-board-inner-logo">
          <img src="../assets/logo.png" style="flex: 0 0 auto;margin-right: 16px"/>
          <div>
            <h1>inspire</h1>
            <span>后台管理系统</span>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>


<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  props: ['header'],
  data() {
    return {
      activeItem: 'index',
      searchKey: '',
    };
  },
  methods: {
    ...mapActions({
      signout: 'user.index/signOut',
    }),
    handleSignout() {
      this.signout().then(() => {
        alert('退出账号');
        location.reload();
      });
    },
  },
  watch: {
    $route: 'reload',
  },
  computed: {
    ...mapGetters({
      token: 'user.index/token',
    }),
  },
};

</script>


<style lang="scss">
  .header {
    width: 100%;
    &-menu {
      &-wrap {
        width: 1190px;
        margin: auto;
      }
      &-manage {
        margin-left: 15px;
      }
      &-my {
        float: right;
        margin-right: 15px;
      }
    }
    &-board {
      background-image: linear-gradient(150deg, #93b9ff -13px, #d48dd2 1000px);
      /*height: 115px;*/
      &-inner {
        width: 1190px;
        margin: auto;
        padding: 20px 40px;
        &-logo {
          display: inline-block;
          display: flex;
          img {
            height: 70px;
          }
          h1 {
            display: inline-block;
            font-size: 30px;
            margin: 0 0 8px;
            vertical-align: bottom;
            color: white;
            font-weight: 600;
          }
        }
        span {
          color: white;
          display: block;
        }
      }
    }
  }
</style>
