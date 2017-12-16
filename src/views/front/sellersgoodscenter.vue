<template>
  <div class="user-sell-center">
    <div class="user-sell-center-left">
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
            <el-menu-item index="1" @click="clickgoods">
              <i class="el-icon-goods"></i>
              <span slot="title">已上传商品</span>
            </el-menu-item>
            <el-menu-item index="2" @click="clickorder">
              <i class="el-icon-view"></i>
              <span slot="title" >我的订单</span>
            </el-menu-item>
            <el-menu-item index="3" @click="upitem">
              <i class="el-icon-upload2" ></i>
              <span slot="title">上传商品</span>
            </el-menu-item>
            <!--<el-menu-item index="4" @click="checkstatus">
              <i class="el-icon-warning" ></i>
              <span slot="title">商家资格审核</span>
            </el-menu-item>-->
            <el-menu-item index="3">
              <i class="el-icon-circle-plus"></i>
              <span slot="title">其他</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>
    <div class="user-sell-center-right">
      <div class="user-sell-center-right-one" v-if="page===1">
        <div class="item-list" >
          <item-card-sell
            v-for="(item, index) in goodslist"
            :key="index"
            :Num="item.inumber"
            :name="item.goodsname"
            :price="item.goodsprice"
            :imgURL="item.imgURL">
          </item-card-sell>
        </div>
      </div>
      <div class="user-sell-center-right-two" v-if="page===2">
        <div class="order-list">
          <el-table
          :data="orderlist"
          stripe
          style="width: 84.5%">
            <el-table-column
            prop="orderID"
            label="订单号"
            width="130">
            </el-table-column>
            <el-table-column
            prop="goodsname"
            label="商品名称"
            width="130">
            </el-table-column>
            <el-table-column
            prop="ordernumber"
            label="订单数量"
            sortable
            width="120">
            </el-table-column>
            <el-table-column
            prop="goodsprice"
            label="商品价格"
            sortable
            width="120">
            </el-table-column>
            <el-table-column
            prop="buyerphone"
            label="买家联系电话"
            width="130">
            </el-table-column>
            <el-table-column
              label="操作"
              width="130">
              <template slot-scope="scope">
                <el-button type="success" @click="deleteorder(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="user-sell-center-right-three" v-if="page===3">
        <div class="input-info">
          <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
            <div class="imag">
              <span class="tip">商品图片</span>
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
            <el-form-item label="商品名称">
              <el-input v-model="formLabelAlign.iname" placeholder="请输入您要上传的商品名称"></el-input>
            </el-form-item>
            <el-form-item label="商品价格">
              <el-input v-model="formLabelAlign.iprice" placeholder="请为您的商品确定一个合适的价格" ></el-input>
            </el-form-item>
            <el-form-item label="商品类型">
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="商家地址">
              <el-input v-model="formLabelAlign.iaddress" placeholder="请输入商品仓库地址"></el-input>
            </el-form-item>
            <el-form-item label="详细描述">
              <el-input v-model="formLabelAlign.idesc" placeholder="请为您的商品提供一段详细描述" ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onsubmit">上传商品</el-button>
              <el-button @click="onquit">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <!--<div class="user-sell-center-right-four" v-if="page===4">
        <div class="pass" v-if="userinfo.istatus===1">
          <h1>您已通过卖家审核！</h1>
        </div>
        <div class="unpass" v-if="userinfo.istatus===0">
          <h1>您未参加或未通过卖家审核！</h1>
          <el-button type="primary" round class="button" @click="Open" >发送审核</el-button>
        </div>
      </div>-->
    </div>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex';
  import itemCardsell from './components/itemofseller';

  export default {
    data() {
      return {
        labelPosition: 'right',
        userinfo: {},
        orderlist: [],
        goodslist: [],
        imageUrl: '',
        page: 1,
        formLabelAlign: {
          iname: '',
          imagURL: '',
          iprice: '',
          idesc: '',
          iaddress: '',
          itype: '',
        },
        options: [{
          value: 'allProducts',
          label: '全部商品',
        }, {
          value: 'books',
          label: '书籍',
        }, {
          value: 'dailyNecessities',
          label: '日用品',
        }, {
          value: 'clothing',
          label: '服装',
        }, {
          value: 'electronicProduct',
          label: '电子产品',
        }, {
          value: 'officeSupplies',
          label: '办公用品',
        }, {
          value: 'others',
          label: 'others',
        }],
        value: '',
      };
    },
    mounted() {
      this.sellerorderlist().then((resp) => {
        this.orderlist = resp.data.data;
        console.log(this.orderlist);
      });
      this.sellergoodslist().then((resp) => {
        this.goodslist = resp.data.data;
        console.log(this.goodslist);
      });
      this.getUserInfo({ token: this.token }).then((resp) => {
        this.userinfo = resp.data.data;
      });
    },
    methods: {
      clickgoods() {
        this.page = 1;
      },
      clickorder() {
        this.page = 2;
      },
      upitem() {
        this.page = 3;
      },
      checkstatus() {
        this.page = 4;
      },
      deleteorder(index, row) {
        this.deleteSellerOrder({ orderID: row.orderID }).then((resp) => {
          console.log(resp.data.code);
          console.log(88888);
          if (resp.data.code === 200) {
            this.orderlist.splice(index, 1);
            alert(`成功移除:${row.iname}订单 `);
          } else {
            alert('移除失败');
          }
        });
      },
      onsubmit() {
        this.formLabelAlign.itype = this.value;
        this.sellerupitem(this.formLabelAlign).then((respcode) => {
          console.log(respcode);
          if (respcode === 200) {
            this.$alert('您的商品正在排队审核中......', '温馨提示', {
              confirmButtonText: '确定',
              callback: (action) => {
                this.$message({
                  type: 'info',
                  message: `action: ${action}`,
                });
              },
            });
          } else {
            this.$alert('操作失败！.', '温馨提示', {
              confirmButtonText: '确定',
              callback: (action) => {
                this.$message({
                  type: 'info',
                  message: `action: ${action}`,
                });
              },
            });
          }
        });
      },
      onquit() {
        this.formLabelAlign.iname = '';
        this.formLabelAlign.imagURL = '';
        this.formLabelAlign.iprice = '';
        this.formLabelAlign.idesc = '';
        this.formLabelAlign.iaddress = '';
        this.value = '';
        this.imageUrl = '';
      },
      Open() {
        this.openSellerCenter(this.userinfo.iID, this.userinfo.istatus).then((resp) => {
          if (resp.data.code === 200) {
            const h = this.$createElement;
            this.$notify({
              title: '温馨提示！',
              message: h('i', { style: 'color: teal' }, '您的审核请求已发送，请耐心等待回复！'),
            });
          } else {
            const h = this.$createElement;
            this.$notify({
              title: '温馨提示！',
              message: h('i', { style: 'color: teal' }, '操作失败！'),
            });
          }
        });
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
      ...mapActions({
        sellerorderlist: 'user.index/sellerorderlist',
        sellergoodslist: 'user.index/sellergoodslist',
        getUserInfo: 'user.index/getUserInfo',
        sellerupitem: 'user.index/sellerupitem',
        openSellerCenter: 'user.index/openSellerCenter',
        deleteSellerOrder: 'user.index/deleteSellerOrder',
      }),
    },
    computed: {
      ...mapGetters({
        token: 'user.index/token',
      }),
    },
    components: {
      'item-card-sell': itemCardsell,
    },
  };
</script>
<style lang="scss">
  .user-sell-center {
    width: 100%;
    background-color: #ffffff;
    display: flex;
    .user-sell-center-left {
      flex: 0.42;
      margin-top: 0px;
      margin-bottom: 290px;
      padding-right: 0px;
      .el-menu {
        height: 100%;
      }
    }
    .user-sell-center-right {
      flex: 1.3;
      padding-left: 0px;
      padding-right: 10px;
      .user-sell-center-right-one {
        .item-list {
          overflow: hidden;
          margin: 20px 0px 40px 0px;
        }
      }
      .user-sell-center-right-two {
        .order-list {
          padding-top: 0px;
        }
      }
      .user-sell-center-right-three {
        .input-info {
          padding: 50px 300px 30px 40px;
          margin: 10px 20px 30px 40px;
        }
        .tip {
          font-size:14px;
        }
        .avatar-uploader .el-upload {
          border: 1px dashed #d9d9d9;
          border-radius: 6px;
          cursor: pointer;
          margin-left: 150px;
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
      }
      .user-sell-center-right-four {
        .pass {
          padding: 150px 50px 50px 220px;
        }
        .unpass {
          padding: 150px 50px 50px 200px;
        }
        .button {
          font-size: 22px;
          margin: 50px 50px 50px 100px;
        }
      }
    }
  }
</style>
