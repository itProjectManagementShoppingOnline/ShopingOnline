<template>
  <div class="i-main">
    <i-header :header="needHeader"></i-header>
    <i-body :header="needHeader"></i-body>
  </div>
</template>

<style lang="scss" scoped>
.i-main {
  width: 100%;
  background-color: #f0eff5;
}
</style>
<script>
import Header from './Header';
import Body from './Body';

const hideHeaderEnums = [
  'signin', 'signup',
];

export default {
  components: {
    'i-header': Header,
    'i-body': Body,
  },
  computed: {
    needHeader() {
      const path = this.$route.fullPath.split('/')[1];
      const flag = hideHeaderEnums.some(hide => hide === path);
      return !flag;
    },
  },
};
</script>

<style lang="scss">
  @import url("//unpkg.com/element-ui@2.0.4/lib/theme-chalk/index.css");
</style>
