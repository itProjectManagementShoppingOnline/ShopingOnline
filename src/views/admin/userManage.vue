<template>
  <div class="in-onsale-manage">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/admin/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="table-expand">
            <div class="table-expand-column">
              <el-form-item label="商品名" class="table-expand-item">
                <span>{{ props.row.iname }}</span>
              </el-form-item>
              <el-form-item label="商品编号" class="table-expand-item">
                <span>{{ props.row.iID }}</span>
              </el-form-item>
              <el-form-item label="商品图片" class="table-expand-item">
                <img :src=props.row.image style="height:200px">
              </el-form-item>
            </div>
            <div class="table-expand-column">
              <el-form-item label="商品类别" class="table-expand-item">
                <span>{{ props.row.itype }}</span>
              </el-form-item>
              <el-form-item label="商品描述" class="table-expand-item">
                <span>{{ props.row.idesc }}</span>
              </el-form-item>
              <el-form-item label="原价" class="table-expand-item">
                <span>{{ props.row.ioriginalPrice }}</span>
              </el-form-item>
              <el-form-item label="现价" class="table-expand-item">
                <span>{{ props.row.iprice }}</span>
              </el-form-item>
              <el-form-item label="发货地" class="table-expand-item">
                <span>{{ props.row.iaddress }}</span>
              </el-form-item>
              <el-form-item label="卖家" class="table-expand-item">
                <span>{{ props.row.iseller }}</span>
              </el-form-item>
            </div>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        prop="iID"
        sortable
        label="商品编号">
      </el-table-column>
      <el-table-column
        prop="iname"
        label="商品名"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="iupdate"
        label="上传时间"
        sortable
        width="220">
      </el-table-column>
      <el-table-column
        prop="itype"
        label="类别"
        width="180"
        :filters="[{ text: '电子产品', value: '电子产品' }, { text: '日用品', value: '日用品' }]"
        :filter-method="filtertype"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag
            close-transition>{{scope.row.itype}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="istatus"
        label="状态">
      </el-table-column>
      <el-table-column
        prop="iseller"
        label="卖家">
      </el-table-column>
      <el-table-column
        label="操作"
        width="150">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleRemove(scope.$index, scope.row)">下架</el-button>
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
        tableData: [],
      };
    },
    mounted() {
      this.fetchOnSaleItemList('time').then((resp) => {
//        console.log(resp.data.data);
        this.tableData = resp.data.data;
      });
    },
    methods: {
      handleRemove(index, row) {
        console.log(row.iID);
        alert(`下架:${row.iname} ${row.iID}`);
        this.removeOnSaleItem(row.iID);
        this.fetchOnSaleItemList('time').then((resp) => {
          this.tableData = resp.data.data;
        });
      },
      filtertype(value, row) {
        return row.itype === value;
      },
      ...mapActions({
        fetchOnSaleItemList: 'admin.index/fetchOnSaleItemList',
        removeOnSaleItem: 'admin.index/removeOnSaleItem',
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

  .in-onsale-manage {
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

  .table-expand{
    .table-expand-column{
      width: 50%;
      float: left;
      .table-expand-item{
        width: 100%;
        label {
          width: 90px;
          color: #99a9bf;
          margin-right: 30px;
        }
      }
    }
  }

</style>
