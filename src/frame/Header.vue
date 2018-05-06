<template>
  <header class="header" v-if="header">
    <div class="header-board">
      <div class="header-board-logo">
        <img src="../assets/logo.png" style="flex: 0 0 auto;margin-right: 16px"/>
        <div>
          <h1>inspire</h1>
          <span>后台管理系统</span>
        </div>
      </div>
      <div class="header-board-my">
        <router-link :to="{ name: 'Signin'}">
          <div>登陆</div>
        </router-link>
        <router-link :to="{ name: 'Signin'}">
          <div>我的信息</div>
        </router-link>
        <router-link :to="{ name: 'Signin'}">
          <div>退出登陆</div>
        </router-link>
        <!--<router-link :to="{ name: 'Signin'}" v-if="!token">-->
          <!--<el-menu-item index="signin" >登陆</el-menu-item>-->
        <!--</router-link>-->
        <!--<router-link :to="{ name: 'UserInfo'}" v-if="token">-->
          <!--<el-menu-item index="myInfo" v-if="token">我的信息</el-menu-item>-->
        <!--</router-link>-->
        <!--<el-menu-item index="myInfo" v-if="token" @click="handleSignout" >退出登陆</el-menu-item>-->
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
//  watch: {
//    $route: 'reload',
//  },
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
    background-image: linear-gradient(150deg, #93b9ff -13px, #d48dd2 1000px);
    /*height: 115px;*/
    &-board {
      width: 960px;
      margin: auto;
      padding: 20px 0px;
      display: flex;
      justify-content: space-between;
      &-logo {
        margin-left: 18px;
        display: inline-block;
        display: flex;
        justify-content: space-between;
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
        span {
          color: white;
          display: block;
        }
      }
      &-my {
        margin-right: 20px;
        padding: 4px;
        div {
          float: right;
          margin-left: 16px;
        }
        a {
          color: white;
        }
      }
    }
  }
</style>
