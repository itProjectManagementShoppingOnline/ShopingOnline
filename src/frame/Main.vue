<template>
  <div class="i-main">
    <i-header :header="needHeader"></i-header>
    <i-body :header="needHeader" :bottom="needBottom"></i-body>
  </div>
</template>

<style lang="scss" scoped>
.i-main {
  width: 100%;
  height: 100%;
  left: 0; right: 0;
  overflow: scroll;
  display: flex;
  background-color: #f0eff5;
}
</style>
<script>
import Header from './Header';
import Body from './Body';

const hideHeaderEnums = [
  'tools', 'course', 'landing', 'register',
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
