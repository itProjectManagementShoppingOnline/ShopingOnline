<template>
  <div class="user-info">
    <div class="user-info-left">
      <el-row >
        <el-col :span="12">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open=""
            @close=""
            background-color="#222"
            text-color="#fff"
            active-text-color="#111">
            <el-menu-item index="1" @click="changepage1">
              <i class="el-icon-view"></i>
              <span slot="title">我的信息</span>
            </el-menu-item>
            <el-menu-item index="2" @click="changepage2">
              <i class="el-icon-view"></i>
              <span slot="title" >完善修改</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-view"></i>
              <span slot="title">其他</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>
    <div class="user-info-right">
      <div class="user-info-right-one" v-if="page===1">
        <p>
          <span>我的头像： <img  v-bind:src="userinfo.imgURL"  width="100" height="100"></span>
        </p>
        <p>
          <span>我的ID：{{ userinfo.userID }}</span>
        </p>
        <p>
          <span>我的名字：{{ userinfo.username }}</span>
        </p>
        <p>
          <span>我的电话：{{ userinfo.phonenum }}</span>
        </p>
        <p>
          <span>我的邮箱：{{ userinfo.email }}</span>
        </p>
      </div>
      <div class="user-info-right-two" v-if="page===2">
        <div style="">
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
          <div class="imag">
            <span class="tip">我的头像</span>
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <el-form-item label="我的ID">
            <el-input v-model="formLabelAlign.userID" v-bind:placeholder="String(userinfo.userID)"></el-input>
          </el-form-item>
          <el-form-item label="我的名字">
            <el-input v-model="formLabelAlign.username" v-bind:placeholder="String(userinfo.username)"></el-input>
          </el-form-item>
          <el-form-item label="我的电话">
            <el-input v-model="formLabelAlign.phone" v-bind:placeholder="String(userinfo.phonenum)"></el-input>
          </el-form-item>
          <el-form-item label="我的邮箱">
            <el-input v-model="formLabelAlign.email" v-bind:placeholder="String(userinfo.email)"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交信息</el-button>
            <el-button @click="onQuit">取消</el-button>
          </el-form-item>
        </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex';

  export default{
    data() {
      return {
        userinfo: {},
        labelPosition: 'right',
        page: 1,
        imageUrl: '',
        formLabelAlign: {
          userID: '',
          picture: '',
          username: '',
          phone: '',
          email: '',
        },
      };
    },
    mounted() {
      this.getUserInfo({ token: this.token }).then((resp) => {
        this.userinfo = resp.data.data;
        console.log(this.userinfo);
        return Promise.resolve(resp);
      });
    },
    methods: {
      changepage1() {
        this.page = 1;
      },
      changepage2() {
        this.page = 2;
      },
      onSubmit() {
        if (this.formLabelAlign.userID !== '') {
          this.userinfo.userID = this.formLabelAlign.userID;
        }
        if (this.formLabelAlign.username !== '') {
          this.userinfo.username = this.formLabelAlign.username;
        }
        if (this.formLabelAlign.phone !== '') {
          this.userinfo.phonenum = this.formLabelAlign.phone;
        }
        if (this.formLabelAlign.email !== '') {
          this.userinfo.email = this.formLabelAlign.email;
        }
        if (this.imageUrl !== '') {
          this.userinfo.imgURL = this.imageUrl;
          this.formLabelAlign.picture = this.imageUrl;
        }
        this.postuserinfo(this.formLabelAlign).then((resp) => {
          console.log(resp.data.code);
          console.log(this.imageUrl);
        });
        this.$alert('修改成功！', '温馨提示', {
          confirmButtonText: '确定',
          callback: (action) => {
            this.$message({
              type: 'info',
              message: `action: ${action}`,
            });
          },
        });
      },
      onQuit() {
        this.formLabelAlign.userID = '';
        this.formLabelAlign.picture = '';
        this.formLabelAlign.username = '';
        this.formLabelAlign.phone = '';
        this.formLabelAlign.email = '';
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      ...mapGetters({
        token: 'user.index/token',
      }),
      ...mapActions({
        getUserInfo: 'user.index/getUserInfo',
        postuserinfo: 'user.index/postuserinfo',
      }),
    },
    computed: {
    },
  };
</script>
<style lang="scss">
  .user-info {
    width: 100%;
    background-color: #ffffff;
    display: flex;
    .user-info-left {
      flex: 0.4;
      margin-top: 0px;
      margin-bottom: 250px;
      .el-menu {
        height: 100%;
      }
    }
    .user-info-right {
      flex:0.4;
      .user-info-right-one {
        margin-top : 50px;
        margin-bottom: 150px;
        p {
          font-size:20px;
          margin-top: 50px;
          margin-bottom: 50px;
        }
      }
      .user-info-right-two {
        margin-top : 50px;
        margin-bottom: 180px;
        margin-left:0px;
        .avatar-uploader .el-upload {
          border: 1px dashed #d9d9d9;
          border-radius: 6px;
          cursor: pointer;
          margin-left: 150px;
          position: relative;
          overflow: hidden;
        }
        .tip {
          font-size:14px;
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
        .el-form {
          .el-form-item {
            font-size: 20px;
            margin-top: 10px;
            margin-bottom: 30px;
          }
        }
      }
    }
  }
</style>
