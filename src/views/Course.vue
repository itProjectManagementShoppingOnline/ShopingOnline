<template>
  <div class="m-course">
    <div class="u-tab-field">
      <mu-tabs :value="activeTab" @change="handleTabChange">
        <mu-tabs class="second-tabs" :value="activeTab" @change="handleTabChange">
          <mu-tab class="tabItem" value="a" title="人工智能"/>
          <mu-tab class="tabItem" value="b" title="数据结构"/>
          <mu-tab class="tabItem" value="c" title="算法"/>
          <mu-tab class="tabItem" value="d" title="机器学习"/>
          <mu-tab class="tabItem" value="e" title="数据挖掘"/>
        </mu-tabs>
      </mu-tabs>
    </div>
    <div class="u-list">
      <course-card
        v-for="(course, index) in coursesList"
        :key="index"
        :id="course.cId"
        :title="course.cTitle"
        :detail="course.cDetail"
        :price="course.price"
        :evaluation="course.evaluation">
      </course-card>
    </div>

  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import CourseCard from './components/CourseCard';

  export default {
    data() {
      return {
        activeTab: 'tab1',
      };
    },

    mounted() {
      this.fetchList({ type: this.activeTab });   // 调用
    },
    methods: {
      ...mapActions({   // 使用 mapActions 辅助函数将组件的 methods 映射为 store.dispatch 调用
        fetchList: 'course.index/fetchList',
      }),
      handleTabChange(val) {
        this.activeTab = val;
      },
    },
    computed: {
      ...mapGetters({
        coursesList: 'course.index/coursesList',
      }),
    },
    components: {
      'course-card': CourseCard,
    },
};
</script>

<style lang="scss" scoped>
  @import '../common/style/base';
.m-course {
  flex: 1;
}
.u-list {
  box-sizing: border-box;
  /*padding: 0 10px;*/
  .u-list-item {
    display: flex;
    background-color: #FFF;
    box-sizing: border-box;
    padding: 10px;
    box-shadow: 0 0 5px #aaa;
    margin: 10px 0;
    img {
      flex: 1 0 80px;
      width: 80px;
      height: 80px;
    }
  }
  .u-discription {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 10px;
    .title {
      font-size: 16px;
    }
    p {
      margin: 0;
      font-size: 12px;
    }
  }
  .u-evaluation {
    display: flex;
    align-items: center;
    .u-star {
      display: flex;
      align-items: center;
    }
    .u-icons {
      font-size: 16px;
    }
  }
}

</style>
