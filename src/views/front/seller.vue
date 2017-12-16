<template>
  <div class="seller-good-info">
    <div class="seller-good-info-left">
      <p><img  v-bind:src="goodinfo.image"  width="350" height="380"></p>
    </div>
    <div class="seller-good-info-right">
      <div class="seller-good-info-right-one">
        <h3 color="#C5C1FA">商品详情：</h3>
        <p>
          <span >商品名称：<span class="content" v-if="page1==1">{{goodinfo.iname}}</span>
            <span class="conten" v-if="page1==2">
              <div class="con">
                <el-input v-model="good.name" placeholder="请输入内容" size="large" ></el-input>
              </div>
            </span>
          </span>
          <span>商品类型：<span class="content" v-if="page1==1">{{goodinfo.itype}}</span>
            <span class="conten" v-if="page1==2">
              <div class="con">
                <el-select v-model="good.type" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              </div>
            </span>
          </span>
        </p>
        <p>
          <span>商品价格：<span class="content" v-if="page1==1">{{goodinfo.iprice}}</span>
            <span class="conten" v-if="page1==2">
              <div class="con">
                <el-input v-model="good.price" placeholder="请输入内容" size="large"></el-input>
              </div>
            </span>
          </span>
          <span class="ind1" v-if="page1==1">商品状态：<span class="content">{{goodinfo.istatus}}</span></span>
        </p>
      </div>
      <span><el-button type="text" @click="page1=2" class="xiugai" >修改</el-button></span>
      <span><el-button type="text"  @click="submitgood" >确定</el-button></span>
      <div class="seller-good-info-right-two">
        <h3 color="#C5C1FA">商家详情：</h3>
        <p>
          <span >商家地址：<span class="content" v-if="page==1">{{goodinfo.iaddress}}</span>
            <span class="conten" v-if="page==2">
              <div class="con">
                <el-input v-model="seller.address" placeholder="请输入内容" size="large"></el-input>
              </div>
            </span>
          </span>
          <span  class="ind2" v-if="page==1">商家名称：<span class="content" >{{goodinfo.iseller}}</span></span>
        </p>
        <p>
          <span>商名描述：<span class="content" v-if="page==1">{{goodinfo.idesc}}</span>
            <span class="conten" v-if="page==2">
              <div class="con">
                <el-input v-model="seller.desc" placeholder="请输入内容" size="large"></el-input>
              </div>
            </span>
          </span>
        </p>
      </div>
      <span><el-button type="text" @click="page=2" class="xiugai" >修改</el-button></span>
      <span><el-button type="text"  @click="submitseller" >确定</el-button></span>
      <div class="seller-good-info-right-three">
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    data() {
      return {
        page1: 1,
        page: 1,
        goodinfo: {},
        form: {
          iID: '',
          iname: '',
          userID: '',
        },
        options: [{
          value: '全部商品',
          label: '全部商品',
        }, {
          value: '书籍',
          label: '书籍',
        }, {
          value: '日用品',
          label: '日用品',
        }, {
          value: '服装',
          label: '服装',
        }, {
          value: '电子产品',
          label: '电子产品',
        }, {
          value: '办公用品',
          label: '办公用品',
        }, {
          value: 'others',
          label: 'others',
        }],
        good: {
          id: '',
          name: '',
          price: '',
          type: '',
        },
        seller: {
          id: '',
          desc: '',
          address: '',
        },
      };
    },
    mounted() {
      this.fetchGoodinfo({ id: this.id }).then((resp) => {
        this.goodinfo = resp.data.data;
        this.form.iID = this.goodinfo.iID;
        this.form.iname = this.goodinfo.iname;
        console.log(this.goodinfo);
      });
    },
    methods: {
      submitgood() {
        this.good.id = this.goodinfo.iID;
        this.changeSellergoodinfo(this.good).then((resp) => {
          console.log(649849846);
          console.log(this.good.type);
          console.log(resp.data.code);
          if (resp.data.code === 200) {
            if (this.good.name !== '') {
              this.goodinfo.iname = this.good.name;
            }
            if (this.good.price !== '') {
              this.goodinfo.iprice = this.good.price;
            }
            if (this.good.type !== '') {
              this.goodinfo.itype = this.good.type;
              console.log(this.goodinfo.itype);
              console.log(544548684);
            }
            this.$notify({
              title: '提示',
              message: '修改成功',
              type: 'success',
            });
          }
        });
        this.page1 = 1;
      },
      submitseller() {
        this.seller.id = this.goodinfo.iID;
        this.changeSellergoodinfo(this.seller).then((resp) => {
          console.log(649849846);
          console.log(this.good.type);
          console.log(resp.data.code);
          if (resp.data.code === 200) {
            if (this.seller.address !== '') {
              this.goodinfo.iaddress = this.seller.address;
            }
            if (this.seller.desc !== '') {
              this.goodinfo.idesc = this.seller.desc;
            }
            this.$notify({
              title: '提示',
              message: '修改成功',
              type: 'success',
            });
          }
        });
        this.page = 1;
      },
      ...mapActions({
        fetchGoodinfo: 'front.index/fetchGoodinfo',
        addgoodintoCart: 'user.index/addgoodintoCart',
        getUserInfo: 'user.index/getUserInfo',
        changeSellergoodinfo: 'user.index/changeSellergoodinfo',
      }),
    },
    computed: {
      id() {
        return Number(this.$route.params.id);
      },
      ...mapGetters({
        token: 'user.index/token',
      }),
    },
  };
</script>
<style lang="scss">
  .con {
    margin-right: 180px;
  }
  .xiugai{
    margin-left: 300px;
  }
  .seller-good-info {
    padding:25px 50px 90px 100px;
    color: #878D99;
    display: flex;
    p {
      font-size: 16px;
      margin-top: 10px;
      margin-bottom: 10px;
    }
    span {
      margin-left: 30px;
    }
    .ind1 {
      margin-left: 62px;
    }
    .ind2{
      margin-left: 45px;
    }
    .content {
      font-size: 21px;
      margin-top: 50px;
      margin-left: 10px;
      margin-bottom: 50px;
      color: #141414;
    }
    .seller-good-info-left {
      flex: 0.4;
      margin-top: 50px;
      margin-left: 30px;
      margin-right: 60px;
      margin-bottom: 50px;
    }
    .seller-good-info-right {
      flex: 7;
      .seller-good-info-right-one {
        padding: 55px 50px 10px 0px;
        margin-left: 45px;
        .change {
          margin-left: 50px;
        }
      }
      .seller-good-info-right-two {
        padding: 5px 50px 20px 0px;
        margin-left: 45px;
        .change {
          margin-left: 50px;
        }
      }
      .seller-good-info-right-three {
        padding: 5px 50px 20px 0px;
        margin-left: 125px;
        .button {
          margin-left: 35px;
        }
      }
    }
  }
</style>
