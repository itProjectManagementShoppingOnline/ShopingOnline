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
          :id="item.id"
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
      this.fetchItemList({ type: this.type, page: this.page, key: this.key }).then((resp, error) => {
        if (error) {
          return Promise.reject(error);
        }
        this.itemList = resp.data.data;
        return Promise.resolve(resp);
      }).catch(error => console.log(error));
    },
    methods: {
      handleCurrentChange(val) {
        if (this.key) {
          this.$router.push({ name: 'Search', params: { page: val, type: this.type, key: this.key } });
          return;
        }
        this.$router.push({ name: 'Items', params: { page: val, type: this.type } });
        document.body.scrollTop = 0;
      },
      ...mapActions({
        fetchItemList: 'front.index/fetchItemList',
      }),
    },
    computed: {
      key() {
        return this.$route.fullPath.split('/')[4];
      },
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
      this.fetchItemList({ type: to.params.type, page: to.params.page }).then((resp) => {
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
</style>
