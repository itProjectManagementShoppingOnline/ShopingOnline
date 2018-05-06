<template>
  <div class="usercenter">
    <h3>基本信息</h3>
    <hr>
    <div class="wrapper">
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <div class="info">
        <ul class="w-list">
          <li class="w-list-item" >
            <span class="w-list-item-label" >账号</span>
            <p class="w-list-item-content">huang</p>
            <span class="w-list-item-label" style="margin-left: 16px;color: cornflowerblue" @click="modifyUsername">修改</span>
          </li>
          <li class="w-list-item" >
            <span class="w-list-item-label" >密码</span>
            <p class="w-list-item-content">123456fafffg</p>
            <span class="w-list-item-label" style="margin-left: 16px;color: cornflowerblue" @click="pwDialogVisible = true">修改</span>
          </li>
          <li class="w-list-item" >
            <span class="w-list-item-label" >创建时间</span>
            <p class="w-list-item-content">2018.3.3</p>
          </li>
        </ul>
      </div>
      <el-dialog
        title="修改密码"
        :visible.sync="pwDialogVisible"
        custom-class="w-center">
        <el-form ref="form" :model="clientForm" label-position="left">
          <el-form-item label="输入旧密码">
            <el-input v-model="oPassword"></el-input>
          </el-form-item>
          <el-form-item label="输入新密码">
            <el-input type="textarea" v-model="nPassword"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="modifyPassword">修 改</el-button>
      </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    data() {
      return {
        oPassword: '',
        nPassword: '',
        imageUrl: '',
        pwDialogVisible: false,
        clientForm: {
          name: '',
          password: '',
        },
      };
    },
    mounted() {
    },
    methods: {
      handleAvatarSuccess(res, file) {
        console.log(res, file);
      },
      modifyUsername() {
        this.$prompt('请输入新的用户名', '修改用户名', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          this.$message({
            type: 'success',
            message: '用户名修改成功',
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入',
          });
        });
      },
      modifyPassword() {
        this.pwDialogVisible = false;
        console.log('modify');
        this.$message({
          type: 'success',
          message: '密码修改成功',
        });
      },
      ...mapActions({
      }),
    },
    computed: {
      ...mapGetters({
      }),
    },
    components: {
    },
  };
</script>

<style lang="scss">
  @import "../../common/style/base";

  .usercenter {
    padding: 30px;
    height: 100%;
  }

  .wrapper {
    margin: 40px 0;
    display: flex;
  }

  .info {
    flex: 1;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
