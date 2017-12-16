<template>
  <div class="good-info">
    <div class="good-info-left">
      <p><img  v-bind:src="goodinfo.image"  width="350" height="380"></p>
    </div>
    <div class="good-info-right">
      <div class="good-info-right-one">
        <h3 color="#C5C1FA">商品详情：</h3>
        <p>
          <span>商品名称：<span class="content">{{goodinfo.iname}}</span></span>
          <span>商品类型：<span class="content">{{goodinfo.itype}}</span></span>
        </p>
        <p>
          <span>商品价格：<span class="content">{{goodinfo.iprice}}</span></span>
          <span class="ind1">商品状态：<span class="content">{{goodinfo.istatus}}</span></span>
        </p>
      </div>
      <div class="good-info-right-two">
        <h3 color="#C5C1FA">商家详情：</h3>
        <p>
          <span>商家名称：<span class="content">{{goodinfo.iseller}}</span></span>
          <span class="ind2">商家地址：<span class="content">{{goodinfo.iaddress}}</span></span>
        </p>
        <p>
          <span>商名描述：<span class="content">{{goodinfo.idesc}}</span></span>
        </p>
        <h3 color="#C5C1FA">选择数量：<el-input-number v-model="num1"   :min="1" :max="10"></el-input-number></h3>
      </div>
      <div class="good-info-right-three">
        <el-button type="success"   class="on"  @click="onSumit">加入购物车 !</el-button>
        <el-button type="primary" @click="back" class="button">    返回  ！  </el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    data() {
      return {
        goodinfo: {},
        userinfo: {},
        form: {
          iID: '',
          iname: '',
          userID: '',
          inumber: '',
        },
        num1: 1,
      };
    },
    mounted() {
      this.fetchGoodinfo({ id: this.id }).then((resp) => {
        this.goodinfo = resp.data.data;
        this.form.iID = this.goodinfo.iID;
        this.form.iname = this.goodinfo.iname;
        console.log(this.goodinfo);
      });
      if (this.token) {
        this.getUserInfo(this.token).then((resp) => {
          this.userinfo = resp.data.data;
          this.form.userID = this.userinfo.userID;
        });
      }
    },
    methods: {
      onSumit() {
        this.form.inumber = this.num1;
        if (this.token) {
          this.addgoodintoCart(this.form).then((resp) => {
            if (resp.data.code === 200) {
              const h = this.$createElement;
              this.$notify({
                title: '温馨提示！',
                message: h('i', { style: 'color: teal' }, '成功加入购物车！'),
              });
            } else {
              const h = this.$createElement;
              this.$notify({
                title: '温馨提示！',
                message: h('i', { style: 'color: teal' }, '加入购物车失败，请重试！'),
              });
            }
          });
        } else {
          this.$router.push({ path: '/signin' });
        }
      },
      back() {
        this.$router.push({ path: '/' });
      },
      ...mapActions({
        fetchGoodinfo: 'front.index/fetchGoodinfo',
        addgoodintoCart: 'user.index/addgoodintoCart',
        getUserInfo: 'user.index/getUserInfo',
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
  .number {
    margin-left: 550px;
  }
  .good-info {
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
      margin-left: 88px;
    }
    .content {
      font-size: 21px;
      margin-top: 50px;
      margin-left: 10px;
      margin-bottom: 50px;
      color: #141414;
    }
    .good-info-left {
      flex: 0.4;
      margin-top: 50px;
      margin-left: 30px;
      margin-right: 60px;
      margin-bottom: 50px;
    }
    .good-info-right {
      flex: 7;
      .good-info-right-one {
        padding: 55px 50px 10px 0px;
        margin-left: 45px;
      }
      .good-info-right-two {
        padding: 50px 50px 20px 0px;
        margin-left: 45px;
        .number {
          padding: 0px 50px 0px 60px;
          margin-left: 0px;
        }
      }
      .good-info-right-three {
        padding: 5px 50px 20px 0px;
        margin-left: 125px;
        .button {
          margin-left: 35px;
        }
      }
    }
  }
</style>
