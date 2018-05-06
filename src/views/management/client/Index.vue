<template>
  <div class="clientlist">
    <div class="tool">
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item>B端用户管理</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button type="primary" icon="el-icon-search" @click="dialogVisible = true">新建账户</el-button>
    </div>
    <el-dialog
      title="创建B端账号"
      :visible.sync="dialogVisible"
      custom-class="w-center"
      :before-close="handleClose">
        <el-form ref="form" :model="clientForm" label-position="left">
          <el-form-item label="账号名">
            <el-input v-model="clientForm.name"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" v-model="clientForm.remark"></el-input>
          </el-form-item>
        </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleCreate">创 建</el-button>
      </span>
    </el-dialog>
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
        label="创建时间"
        width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.add_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleResetPW(scope.$index, scope.row)">密码重置</el-button>
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
        clientForm: {
          name: '',
          remark: '',
        },
        dialogVisible: false,
        tableData: [{
          id: 1,
          username: 'inspire',
          add_time: '2018.4.18',
        }, {
          id: 1,
          username: 'inspire',
          add_time: '2018.4.18',
        }, {
          id: 1,
          username: 'inspire',
          add_time: '2018.4.18',
        }, {
          id: 1,
          username: 'inspire',
          add_time: '2018.4.18',
        }, {
          id: 1,
          username: 'inspire',
          add_time: '2018.4.18',
        }, {
          id: 1,
          username: 'inspire',
          add_time: '2018.4.18',
        }, {
          id: 1,
          username: 'inspire',
          add_time: '2018.4.18',
        }, {
          id: 1,
          username: 'inspire',
          add_time: '2018.4.18',
        }, {
          id: 1,
          username: 'inspire',
          add_time: '2018.4.18',
        }, {
          id: 1,
          username: 'inspire',
          add_time: '2018.4.18',
        }],
      };
    },
    methods: {
      handleResetPW(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      handleClose() {
        this.dialogVisible = false;
      },
      handleCreate() {
        this.dialogVisible = false;
        this.$message({
          showClose: 'true',
          message: '账号新建成功 密码:123456',
          type: 'success',
          duration: 0,
        });
      },
    },
    components: {},
  };
</script>

<style lang="scss">
  @import "../../../common/style/base";

  .clientlist{
    padding: 8px 14px;
    .tool {
      display: flex;
      margin: 8px 8px 12px;
      .breadcrumb{
        flex: auto;
        line-height: 34px;
      }
      el-button {
        flex: auto;
      }
    }
  }
</style>
