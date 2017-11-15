<template>
  <div class="in-index">
    <div class="in-index-left">
      <el-menu default-active="2" class="el-menu-vertical-demo" @open="" @close="">
        <div v-for="(typeitem, index) in typeSet">
          <router-link
            :to="{ name: 'Items', params: { type: typeitem.tIndex, page: 1 } }">
            <el-menu-item :index=typeitem.tIndex >
              <i class="el-icon-menu"></i>
              <span slot="title">{{typeitem.tName}}</span>
            </el-menu-item>
          </router-link>
        </div>
      </el-menu>
    </div>
    <div class="in-index-right">
      <div class="in-index-right-select">
      </div>
      <div class="in-index-right-list">

        <item-card
          v-for="(item, index) in itemList"
          :key="index"
          :name="item.name"
          :price="item.price"
          :imgURL="item.imgURL"
        ></item-card>
      </div>
      <div class="in-index-right-pagination">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page=this.page
          :page-size="24"
          layout="total, prev, pager, next, jumper"
          :total=totalItemNum>
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import itemCard from './components/itemCard';

  export default {
    data() {
      return {
        itemList: [],
        totalItemNum: 100,
//        page: this.$route.params.page,
//        type: this.$route.params.type,
        typeSet: [
          {
            tIndex: 'allProducts',
            tName: '全部商品',
          }, {
            tIndex: 'books',
            tName: '书籍',
          }, {
            tIndex: 'dailyNecessities',
            tName: '日用品',
          }, {
            tIndex: 'clothing',
            tName: '服装',
          }, {
            tIndex: 'electronicProduct',
            tName: '电子产品',
          }, {
            tIndex: 'officeSupplies',
            tName: '办公用品',
          }, {
            tIndex: 'others',
            tName: '其他',
          },
        ],
      };
    },
    mounted() {
      this.fetchItemList(this.type, this.page).then((resp) => {
        this.itemList = resp.data.data;
//        console.log(this.itemList);
//        alert(this.page);
//        alert(this.type);
      });
    },
    methods: {
      handleCurrentChange(val) {
        this.$router.push({ name: 'Items', params: { page: val, type: this.type } });
      },
      ...mapActions({
        fetchItemList: 'front.index/fetchItemList',
      }),
    },
    computed: {
      ...mapGetters({
      }),
      type() {
        return this.$route.params.type;
      },
      page() {
        return Number(this.$route.params.page);
      },
    },
    beforeRouteUpdate(to, from, next) {
//      console.log(to.params);
//      console.log(from.params);
      this.fetchItemList(to.params.type, to.params.page).then((resp) => {
        this.itemList = resp.data.data;
      });
      next(true);
    },
    components: {
      'item-card': itemCard,
    },
  };
</script>

<style lang="scss">
  .in-index {
    width: 100%;
    background-color: #ffffff;
    display: flex;
    .in-index-left {
      flex: 2;
      .el-menu {
        height: 100%;
      }
    }
    .in-index-right {
      flex: 7;
      .in-index-right-list {
        overflow: hidden;
        /*max-height: 1600px;*/
        margin: 50px 20px 80px 20px;
      }
      .in-index-right-pagination {
        margin-left: 230px;
        height: 100px;
        .el-pager li.active {
          border-color: #93b9ff;
          background-color: white;
          color: #93b9ff;
          cursor: default;
        }
        span {
          margin: 0 15px;
          height: 35px;
          line-height: 35px;
          font-size: 16px;
        }
        input {
          margin: 0 10px;
        }
        button, li, input {
          height: 35px;
          width: 42px;
          line-height: 35px;
          text-align: center;
        }
      }
    }
  }


  .p-item {
    position: relative;
    float: left;
    margin-left: 2px;
    padding: 34px 20px 40px 21px;
    width: 200px;
    height: 304px;
    background-color: #fff;
    overflow: hidden;
    .p-img {
      width: 160px;
      height: 180px;
      -webkit-transition:-webkit-transform .4s ease-out;
      transition:-webkit-transform .4s ease-out;
      -moz-transition:transform .4s ease-out,-moz-transform .4s ease-out;
      transition:transform .4s ease-out;
    }

    .p-name {
      height: 36px;
      line-height: 25px;
      text-align: center;
      -webkit-transition:-webkit-transform .4s ease-out;
      transition:-webkit-transform .4s ease-out;
      -moz-transition:transform .4s ease-out,-moz-transform .4s ease-out;
      transition:transform .4s ease-out;
    }

    .p-price {
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

    .p-button {
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
  .p-item:hover {
    .p-button {
    bottom: 0px;
      }
    .p-img {
      -webkit-transform:translateY(-15px);
      -moz-transform:translateY(-15px);
      -ms-transform:translateY(-15px);
      transform:translateY(-15px);
      margin-top:-10px\9
      }
    .p-name {
      -webkit-transform:translateY(-20px);
      -moz-transform:translateY(-20px);
      -ms-transform:translateY(-20px);
      transform:translateY(-20px);
    }
    .p-price {
      -webkit-transform:translateY(-20px);
      -moz-transform:translateY(-20px);
      -ms-transform:translateY(-20px);
      transform:translateY(-20px);
    }
  }

</style>
