<template>
  <div class="user-order">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item  :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>购物车</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table
      :data="orderlist"
      stripe
      style="width: 100%">
      <el-table-column
        prop="orderID"
        label="订单号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="goodsname"
        label="商品名称"
        width="190">
      </el-table-column>
      <el-table-column
        prop="goodsprice"
        label="商品价格"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="goodsnumber"
        label="订单数量"
        width="180">
      </el-table-column>
      <el-table-column
        prop="sellerphone"
        label="卖家联系电话"
        width="190">
      </el-table-column>
      <el-table-column
        label="操作"
        width="190">
        <template slot-scope="scope">
          <el-button type="success" @click="deleteorder(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex';
  export default {
    data() {
      return {
        orderlist: [],
      };
    },
    mounted() {
      this.getUserorder().then((resp) => {
        this.orderlist = resp.data.data;
        console.log(this.orderlist);
      });
    },
    methods: {
      deleteorder(index, row) {
        this.deleteUserOrder({ orderID: row.orderID }).then((resp) => {
          console.log(resp.data.code);
          console.log(88888);
          if (resp.data.code === 200) {
            this.orderlist.splice(index, 1);
            alert(`成功移除:${row.goodsname}订单 `);
          } else {
            alert('移除失败');
          }
        });
      },
      ...mapActions({
        getUserorder: 'user.index/getUserorder',
        deleteUserOrder: 'user.index/deleteUserOrder',
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
  .user-order {
    padding: 20px 20px 235px 20px;
    margin: 0px 20px 20px 20px;
  }
</style>
