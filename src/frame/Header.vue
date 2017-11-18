<template>
  <div class="header" v-if="header">
    <el-menu :default-active="activeItem" class="header-menu" mode="horizontal" @select="handleSelect">
      <div class="header-menu-wrap">
      <div class="header-menu-hot">
        <el-menu-item index="index">首页</el-menu-item>
        <el-menu-item index="shoppingCart">购物车</el-menu-item>
        <el-menu-item index="shoppingCenter">商品中心</el-menu-item>
        <el-menu-item index="order">我的订单</el-menu-item>
      </div>
      <div class="header-menu-my">
        <router-link :to="{ name: 'Signin'}" v-if="!token">
          <el-menu-item index="signin" >登陆</el-menu-item>
        </router-link>
        <router-link :to="{ name: 'Signup'}" v-if="!token">
          <el-menu-item index="signup" >注册</el-menu-item>
        </router-link>
        <!--<router-link :to="{ name: 'Signin'}" v-if="token">-->
          <el-menu-item index="myInfo" v-if="token">我的信息</el-menu-item>
        <!--</router-link>-->
        <el-menu-item index="myInfo" v-if="token" @click="handleSignout" >退出登陆</el-menu-item>
        <!--<input v-model="token" />-->
      </div>
      </div>
    </el-menu>
    <div class="header-board">
      <div class="header-board-inner">
        <div class="header-board-name-wrap">
          <span class="header-board-inner-name">NPY</span>
          <span class="header-board-inner-desc">网上购物系统</span>
        </div>
        <div class="header-board-search">
          <el-input placeholder="请输入内容" v-model="searchKey" class="input-with-select">
            <el-button slot="append" icon="search"></el-button>
          </el-input>
        </div>
      </div>
    </div>
  </div>
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
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    ...mapActions({
      signout: 'user.index/signOut',
    }),
    handleSignout() {
      this.signout().then(() => {
        alert('退出账号');
      });
    },
  },
  computed: {
    getPath() {
//      const path = this.$route.fullPath.split('/')[1];
    },
    ...mapGetters({
      token: 'user.index/token',
    }),
  },
};

</script>


<style lang="scss">

  .header {
    width: 100%;
    .header-menu-wrap {
      width: 1190px;
      margin: auto;
    }
    .header-menu-hot {
      margin-left: 15px;
    }
    .header-menu-my {
      float: right;
      margin-right: 15px;
    }
    .header-board {
      background-image: linear-gradient(150deg, #93b9ff -13px, #d48dd2 1000px);
      height: 115px;
      .header-board-inner {
        width: 1190px;
        margin: auto;
        span {
          color: white;
          display: block;
        }
        .header-board-name-wrap {
          margin-left: 30px;
          width: 130px;
          float: left;
        }
        .header-board-inner-name {
          font-weight: 900;
          font-size: 60px;
        }
        .header-board-inner-desc {
          font-weight: 400;
          font-size: 21px;
          margin-top: -20px;
        }
        .header-board-search {
          width: 250px;
          float: right;
          margin-top: 20px;
          margin-right: 15px;
          border-radius: 5px;
        }
      }
    }
  }




</style>
