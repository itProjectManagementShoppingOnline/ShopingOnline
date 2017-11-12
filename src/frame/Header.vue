<template>
  <div class="i-header appbar" v-if="header">
    <mu-appbar title="思领" titleClass="u-bar" >
      <mu-icon-button icon="keyboard_arrow_left" slot="left"/>
    </mu-appbar>

  </div>
</template>


<script>

export default {
  props: ['header'],
  method: {
    goBack() {
      this.$router.go(-1);
    },
  },
  computed: {
    getPath() {
//      const path = this.$route.fullPath.split('/')[1];
    },
  },
};

</script>


<style lang="scss">
  .i-header {
    position: absolute;
    top: 0;left: 0; right: 0;
  }

  .appbar{
    background-color: white;
  }

  .u-bar {
    padding-left: 30%;
  }

  .mu-appbar{
    background-color: rgba(240,240,240,0.2);
    color: rgb(126,87,194);
  }

</style>
