<template>
    <div class="in-admin-index">
      <div style="width: 85%;overflow: hidden;margin: auto;margin-top: 50px">
        <router-link :to="{ name: 'OnSaleManage' }" >
          <div class="admin-board">在售商品管理</div>
        </router-link>
        <router-link :to="{ name: 'UploadManage'}" >
          <div class="admin-board">上传商品审核</div>
        </router-link>
        <router-link :to="{ name: 'UserManage'}" >
          <div class="admin-board">用户管理</div>
        </router-link>
        <router-link :to="{ name: 'FrontIndex'}" >
          <div class="admin-board">退出</div>
        </router-link>
      </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {};
    },
    methods: {},
    components: {},
  };
</script>

<style lang="scss">
  @import "../../common/style/base.scss";
  .in-admin-index {
    width: 100%;
    background-color: #ffffff;
    height: 800px;
    .admin-board {
      /*display: inline-block;*/
      float: left;
      width: 50%;
      text-align: center;
      height: 400px;
      line-height: 400px;
      font-weight: 900;
      font-size: 40px;
    }
    .admin-board:hover {
      background-color: rgba(133,151,255,0.3);
    }
    a{
      color: black;
    }

  }

</style>
