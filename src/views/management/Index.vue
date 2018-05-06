<template>
  <div class="usermanagement">
    <div class="usermanagement-left">
      <el-menu default-active="client">
        <div v-for="(menuItem, index) in asideMenu">
          <router-link :to="{ name: menuItem.name }">
            <el-submenu :index="menuItem.name" v-if="menuItem.type === 'sub'">
            <template slot="title">
              <i class="el-icon-menu"></i>
              {{menuItem.label}}
            </template>
            <router-link v-for="(subItem, index) in menuItem.sub" :to="{ name: subItem.name }">
              <el-menu-item  :index="subItem.name">
                {{subItem.label}}
              </el-menu-item>
            </router-link>
          </el-submenu>
            <el-menu-item :index="menuItem.name" v-if="menuItem.type !== 'sub'">
              <i class="el-icon-menu"></i>
              <span slot="title">{{menuItem.label}}</span>
            </el-menu-item>
          </router-link>
        </div>
      </el-menu>
    </div>
    <div class="usermanagement-right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    data() {
      return {
        asideMenu: [
          {
            name: 'Clients',
            label: 'B端账号管理',
          }, {
            name: 'Users',
            label: '用户管理',
          }, {
            name: 'Activitys',
            label: '活动管理',
          }, {
            type: 'sub',
            name: 'Courses',
            label: '课程管理',
            sub: [
              {
                name: 'Learncircles',
                label: '学习圈管理',
              }, {
                name: 'Discussions',
                label: '讨论管理',
              }, {
                name: 'Replys',
                label: '回复管理',
              },
            ],
          },
        ],
      };
    },
    mounted() {
    },
    methods: {
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
  .usermanagement {
    width: 100%;
    display: flex;
    .usermanagement-left {
      flex: 2;
      .el-menu {
        height: 100%;
      }
    }
    .usermanagement-right {
      flex: 9;
      .usermanagement-right-list {
        overflow: hidden;
        margin: 50px 20px 80px 20px;
      }
      .usermanagement-right-pagination {
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
