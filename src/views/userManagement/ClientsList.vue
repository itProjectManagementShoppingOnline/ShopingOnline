<template>
  <div class="clientlist">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/usermanagement' }">用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>B端用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="ID"
        width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="用户名"
        width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="备注"
        width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.remark }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          id: 1,
          username: 'inspire',
          remark: 'XXXX公司账号',
        }, {
          id: 1,
          username: 'inspire',
          remark: 'XXXX公司账号',
        }, {
          id: 1,
          username: 'inspire',
          remark: 'XXXX公司账号',
        }, {
          id: 1,
          username: 'inspire',
          remark: 'XXXX公司账号',
        }, {
          id: 1,
          username: 'inspire',
          remark: 'XXXX公司账号',
        }, {
          id: 1,
          username: 'inspire',
          remark: 'XXXX公司账号',
        }, {
          id: 1,
          username: 'inspire',
          remark: 'XXXX公司账号',
        }, {
          id: 1,
          username: 'inspire',
          remark: 'XXXX公司账号',
        }, {
          id: 1,
          username: 'inspire',
          remark: 'XXXX公司账号',
        }, {
          id: 1,
          username: 'inspire',
          remark: 'XXXX公司账号',
        }],
      };
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
    },
    components: {},
  };
</script>

<style lang="scss">
  .breadcrumb{
    height: 60px;
    line-height: 60px;
    margin-left: 20px;
    margin-bottom: 10px;
  }
  .clientlist{
    padding: 8px 14px;
  }
</style>
