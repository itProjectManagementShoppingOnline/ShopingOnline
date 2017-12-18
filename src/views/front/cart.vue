<template>
  <div class="my-cart">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item  :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>购物车</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table
      :data="goodslist"
      stripe
      style="width: 100%">
      <el-table-column
        label="商品图片"
        width="180">
        <template slot-scope="scope">
          <img :src="scope.row.imageURL" style="height: 100px">
        </template>
      </el-table-column>
      <el-table-column
        prop="iname"
        label="商品名称"
        width="140">
      </el-table-column>
      <el-table-column
        prop="itype"
        label="商品类型"
        width="140">
      </el-table-column>
      <el-table-column
        label="商品数量"
        width="190">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.inumber" @change="handleChange" :min="1" :max="10" label="number"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column
        prop="istatus"
        label="商品状态"
        width="140">
      </el-table-column>
      <el-table-column
        label="商品价格"
        width="140">
        <template slot-scope="scope">
          <span>￥ {{scope.row.iprice * scope.row.inumber}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="  编辑"
        width="140">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="deleteitem(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="  操作"
        width="140">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="buy(scope.$index, scope.row)">确认购买</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex';

  export default {
    data() {
      return {
        goodslist: [],
        item: {
          iID: '',
          iname: '',
          inumber: '',
        },
      };
    },
    mounted() {
      this.getCartlist().then((resp) => {
        this.goodslist = resp.data.data;
        console.log(this.goodslist);
        return Promise.resolve(resp);
      });
    },
    methods: {
      handleChange(value) {
        console.log(value);
      },
      deleteitem(index, row) {
        this.deleteFromCart({ iID: row.iID, iname: row.iname, inumber: row.inumber }).then((resp) => {
          console.log(resp.data.code);
          console.log(88888);
          if (resp.data.code === 200) {
            this.goodslist.splice(index, 1);
            alert(`成功移除:${row.iname}商品 `);
          } else {
            alert('移除失败');
          }
        });
      },
      buy(index, row) {
        this.item.iID = row.iID;
        this.item.iname = row.iname;
        this.item.inumber = row.inumber;
        this.addgoodIntoOrder(this.item).then((resp) => {
          console.log(resp.data.code);
          console.log(88888);
          if (resp.data.code === 200) {
            this.goodslist.splice(index, 1);
            alert(`成功购买:${row.iname}商品 `);
          } else {
            alert('操作失败');
          }
        });
      },
      ...mapActions({
        getCartlist: 'user.index/getCartlist',
        deleteFromCart: 'user.index/deleteFromCart',
        addgoodIntoOrder: 'user.index/addgoodIntoOrder',
      }),
    },
    computed: {
      ...mapGetters({
        token: 'user.index/token',
      }),
    },
    components: {},
  };
</script>
<style lang="scss">
  @import "../../common/style/base.scss";
  .my-cart{
    width: 100%;
    background-color: white;
    height: 1000px;
  }
  .breadcrumb{
    height: 60px;
    line-height: 60px;
    margin-left: 20px;
    margin-bottom: 10px;
  }
</style>
