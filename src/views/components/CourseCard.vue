<template>
  <div class="w-course-card">
    <i-card>
      <template slot="body">
        <router-link v-if="!isMyCourse" :to="{ name: 'CourseInfo', params:{ id:id}}">
<!--<<<<<<< HEAD-->
          <div class="u-coursecard">
            <!--<img src="">-->
            <mu-list-item title="作者" titleClass="mu-list-item-color" disabled>
              <mu-avatar slot="left" src="/images/uicon.jpg"/>
            </mu-list-item>
            <hr>
            <h1>{{title}}</h1>
            <h3 v-if="teacherName">{{teacherName}}</h3>
            <p>{{detail}}</p>
            <div class="u-evaluation" v-if="evaluation">
              <span style="margin-right:10px;">{{evaluation.likes}} 赞</span><span style="margin-right:10px;">{{evaluation.comments}} 评论</span>
              <i-star :score="evaluation.stars" class="u-star"></i-star>
              <span style="margin-left:10px" >{{evaluation.stars}}</span>
            </div>
          </div>
        </router-link>
      </template>
    </i-card>
  </div>
</template>

<script >
  import Card from '../../components/common/Card';
  import Star from '../../components/common/star';

  export default {
    props: {
      id: Number,
      title: String,
      detail: String,
      image: String,
      teacherId: String,
      teacherName: String,
      price: Number,
      evaluation: Object,
      isMyCourse: {
        type: Boolean,
        default: false,
      },
      isTakeIn: {
        type: Boolean,
        default: false,
      },
      schedule: {
        type: Number,
        default: 0,
      },
    },

    components: {
      'i-card': Card,
      'i-star': Star,
    },
  };
</script>


<style lang="scss" >
  @import "../../common/style/base";
  hr {
    margin: 0;
    height: 1px;
    border: none;
    background-color:#eee;
    width: 100%;
  }

  .w-course-card {
    h1 {
      margin: 3px 0;
      font-size: 16px;
      height: 44px;
      line-height: 44px;
    }
    p {
      margin: 0;
      color: #888;
      margin-bottom: 6px;

    }
    .u-answer {
      margin-top: 10px;
      display: flex;
      align-items: center;
      img {
        width: 50px;
        height: 50px;
        border-radius: 50px;
        flex: 0 1 50px;
        margin-right: 10px;
        margin-top: 4px;
      }
      .u-answer-person {
        flex: 1;
        h2 {
          margin: 0;
          font-size: 16px;
        }
        p {
          margin: 0;
          font-size: 12px;
          color: #888;
        }
      }
    }

    .u-coursecard{
      position: relative;

      h1{
        display: inline-block;
      }
    }

    .u-schedule{
      display: inline-block;
      margin-left: 20px;
      color: #888;
    }

    .u-evaluation {
      display: flex;
      margin-top: 5px;
      .u-star {
        display: flex;
        margin-top: -3px;
      }
      span{
        font-size: 10px;
        line-height: 10px;
        vertical-align: top;
        color: #888;
      }
      :last-child{
        color: orange;
      }
    }
  }

  .u-interactive{
    .u-button{
      display: inline-block;
      text-align: center;
      width: 30%;
    }
    .u-icon{
      font-size: 14px;
    }
  }

  .button-relative{
    position: relative;
    top: 9px;
  }

  .learncircle-badge{
    font-size: 3px;
    width: 15px;
    height: 15px;
    position: relative;
    top: -9px;
    left: -15px;
  }

  .mu-list-item-color{
    color: #555555;
  }

  .mu-item.show-left {
    padding-left: 57px;
  }
  .mu-item-left {
    left: 1px;
  }



</style>

