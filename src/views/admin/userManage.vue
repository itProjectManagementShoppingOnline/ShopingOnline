<template>
  <div class="in-onsale-manage">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
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
        prop="uID"
        sortable
        label="用户ID">
      </el-table-column>
      <el-table-column
        prop="uname"
        label="用户名"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="uphone"
        label="手机"
        sortable
        width="220">
      </el-table-column>
      <el-table-column
        prop="uaddress"
        label="地址"
        sortable
        width="220">
      </el-table-column>
      <el-table-column
        prop="ustatus"
        label="状态"
        width="180"
        :filters="[{ text: '正常', value: '正常' }, { text: '小黑屋', value: '小黑屋' }]"
        :filter-method="filtertype"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag
            close-transition>{{scope.row.ustatus}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="150">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.ustatus === '小黑屋'"
            size="mini"
            @click="toggleStatus(scope.$index, scope.row)">恢复</el-button>
          <el-button
            v-if="scope.row.ustatus === '正常'"
            size="mini"
            type="danger"
            @click="toggleStatus(scope.$index, scope.row)">封禁</el-button>
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
      this.fetchUserList('time').then((resp) => {
        this.tableData = resp.data.data;
      });
    },
    methods: {
      toggleStatus(index, row) {
        this.toggleUserStatus({ uID: row.uID }).then((resp) => {
//          console.log(resp);
          if (resp.data.code === 200) {
            this.tableData[index].ustatus = this.toggle(this.tableData[index].ustatus);
            alert('修改状态成功');
          } else {
            alert('修改状态失败');
          }
        });
      },
      filtertype(value, row) {
        return row.ustatus === value;
      },
      toggle(status) {
        if (status === '正常') {
          return '小黑屋';
        }
        return '正常';
      },
      ...mapActions({
        fetchUserList: 'admin.index/fetchUserList',
        toggleUserStatus: 'admin.index/toggleUserStatus',
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
