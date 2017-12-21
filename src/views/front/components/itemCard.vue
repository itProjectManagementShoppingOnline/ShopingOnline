<template>
  <div class="item-card">
    <div class="item-card-img">
      <img :src=imgURL style="width: 160px" @click="lookinfo">
    </div>
    <div class="item-card-name">{{name}}</div>
    <div class="item-card-price">{{price}} 元</div>
    <span class="item-card-button" @click="addcart">加入购物车</span>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    props: {
      id: Number,
      name: String,
      price: Number,
      imgURL: String,
    },
    data() {
      return {
        userinfo: {},
        good: {
          iID: '',
          iname: '',
          userID: '',
          inumber: '',
        },
      };
    },
    methods: {
      lookinfo() {
        alert(this.id);
        this.$router.push({ name: 'GoodInfo', params: { id: this.id } });
      },
      addcart() {
        alert(this.token);
        if (this.token) {
          this.getUserInfo(this.token).then((resp) => {
            this.userinfo = resp.data.data;
          });
          this.good.iID = this.id;
          this.good.iname = this.name;
          this.good.userID = this.userinfo.userID;
          this.good.inumber = 1;
          this.addgoodintoCart(this.good).then((resp) => {
            console.log(resp.data.code);
            alert(resp.data.code);
          });
        } else {         // 提醒登录或注册
          this.$router.push({ name: 'Signin' });
        }
        console.log(this.good.userID);
      },
      ...mapActions({
        addgoodintoCart: 'user.index/addgoodintoCart',
        getUserInfo: 'user.index/getUserInfo',
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

  .item-card {
    position: relative;
    float: left;
    margin-left: 2px;
    padding: 34px 20px 40px 21px;
    width: 200px;
    height: 304px;
    background-color: #fff;
    overflow: hidden;
    .item-card-img {
      width: 160px;
      height: 180px;
      overflow: hidden;
      display: flex;
      align-items: center;
      -webkit-transition:-webkit-transform .4s ease-out;
      transition:-webkit-transform .4s ease-out;
      -moz-transition:transform .4s ease-out,-moz-transform .4s ease-out;
      transition:transform .4s ease-out;
    }

    .item-card-name {
      height: 36px;
      line-height: 25px;
      text-align: center;
      -webkit-transition:-webkit-transform .4s ease-out;
      transition:-webkit-transform .4s ease-out;
      -moz-transition:transform .4s ease-out,-moz-transform .4s ease-out;
      transition:transform .4s ease-out;
    }

    .item-card-price {
      height: 28px;
      line-height: 28px;
      font-size: 16px;
      /*color: #d13030;*/
      text-align: center;
      -webkit-transition:-webkit-transform .4s ease-out;
      transition:-webkit-transform .4s ease-out;
      -moz-transition:transform .4s ease-out,-moz-transform .4s ease-out;
      transition:transform .4s ease-out;
    }

    .item-card-button {
      position: absolute;
      left: 0;
      bottom: -40px;
      width: 200px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 14px;
      color: #fff;
      background-color: #93b9ff;
      -webkit-transition:-webkit-transform .4s ease-out;
      transition:-webkit-transform .4s ease-out;
      -moz-transition:transform .4s ease-out,-moz-transform .4s ease-out;
      transition:transform .4s ease-out;
    }
  }
  .item-card:hover {
    .item-card-button {
      bottom: 0px;
    }
    .item-card-img {
      -webkit-transform:translateY(-15px);
      -moz-transform:translateY(-15px);
      -ms-transform:translateY(-15px);
      transform:translateY(-15px);
      margin-top:-10px\9
    }
    .item-card-name {
      -webkit-transform:translateY(-20px);
      -moz-transform:translateY(-20px);
      -ms-transform:translateY(-20px);
      transform:translateY(-20px);
    }
    .item-card-price {
      -webkit-transform:translateY(-20px);
      -moz-transform:translateY(-20px);
      -ms-transform:translateY(-20px);
      transform:translateY(-20px);
    }
  }

</style>
