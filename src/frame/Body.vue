<template>
  <div class="i-body" ref="body">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  props: ['header', 'bottom'],
  watch: {
    header(val) {
      if (val) this.$refs.body.style.top = '56px';
      else this.$refs.body.style.top = '0';
    },
    bottom(val) {
      if (val) this.$refs.body.style.bottom = '56px';
      else this.$refs.body.style.bottom = '0';
    },
  },
  mounted() {
    if (this.header) this.$refs.body.style.top = '56px';
    else this.$refs.body.style.top = '0';
    if (this.bottom) this.$refs.body.style.bottom = '56px';
    else this.$refs.body.style.bottom = '0';
  },
};
</script>


<style lang="scss" scoped>
.i-body {
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0; right: 0;
  overflow: scroll;
  display: flex;
  background-color: #f0eff5;
}
</style>
