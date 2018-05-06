<template>
  <div class="clientlist">
    <div class="tool">
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/usermanagement' }">B端用户管理</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button type="primary" icon="el-icon-search">新建账户</el-button>
    </div>
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
            @click="handleEdit(scope.$index, scope.row)">密码重置</el-button>
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
