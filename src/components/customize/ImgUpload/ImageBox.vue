<template>
  <div class="image-box box"
    ref="imgBox"
    :class="{'err': status == 'err', 'single': single}"
    @mouseover="handleMouseover"
    @mouseout="handleMouseout">

    <div class="inside-box">
      
      <!-- 图片显示 -->
      <div class="img-box box">
        <img ref="imgShow" @load="imgLoaded" :src="imgUrl" alt="">
      </div>

      <!-- 正在上传的遮罩层 -->
      <div v-if="status == 'uploading'" class="uploading-box box">
        <span>{{(progress * 100).toFixed(2)}}%</span>
        <span class="progress" :style="'width:' + (progress * 100).toFixed(2) + '%'"></span>
      </div>

      <!-- 发生错误的遮罩层 -->
      <div v-if="status == 'err'" class="uploading-box box">
        <i v-if="!disable" class="material-icons icon-btn"
          @click="handleDel">close</i>
      </div>

      <!-- 已上传完成的遮罩层 -->
      <div v-if="status == 'uploaded'" class="cover-box box"
        :class="{'hover': hover}"
        @mouseover="handleMouseoverUploaded"
        @mouseout="handleMouseoutUploaded">
        <div class="content" :class="{'hoverUploaded': hoverUploaded}">
          <i class="material-icons icon-btn"
            @click="see">remove_red_eye</i>
          <i v-if="single && !disable" class="material-icons icon-btn"
            @click="handleReplace">refresh</i>
          <i v-if="!disable" class="material-icons icon-btn"
            @click="handleDel">close</i>
        </div>
      </div>

      <!-- 确认删除的遮罩层 -->
      <transition name="fade">
        <div v-if="delState" class="uploading-box box" style="flex-direction: column">
          <p>确定删除?</p>
          <div>
            <i v-if="!disable" class="material-icons icon-btn"
              style="color:#C00" @click="del">check</i>
            <i v-if="!disable" class="material-icons icon-btn"
              @click="del">close</i>
          </div>
        </div>
      </transition>
    </div>

  </div>
</template>

<script>
require('./style/style.scss')

export default {
  data() {
    return {
      delState: false,

      hover: false,
      hoverUploaded: false,
    }
  },
  props: ['imgUrl', 'status', 'progress', 'single', 'disable'],
  methods: {
    handleMouseover () {
      this.hover = true;
    },
    handleMouseout () {
      this.hover = false;
    },
    handleMouseoverUploaded () {
      this.hoverUploaded = true;
    },
    handleMouseoutUploaded () {
      this.hoverUploaded = false;
    },
    handleReplace () {
      this.$emit('replace');
    },
    handleDel () {
      this.delState = true;
    },
    closeDel () {
      this.delState = false;
    },
    see () {
      this.$emit('show', this.imgUrl);
    },
    del () {
      this.$emit('del');
    },
    imgLoaded () {

      let img = this.$refs.imgShow;
      let box = this.$refs.imgBox;

      let boxRate = box.clientWidth / box.clientHeight;
      let imgRate = img.style.width / img.style.height;

      if (imgRate > boxRate) {
        img.style.width = '100%';
        img.style.height = '';
      } else {
        img.style.height = '100%';
        img.style.width = '';
      }
    }
  },
}
</script>
