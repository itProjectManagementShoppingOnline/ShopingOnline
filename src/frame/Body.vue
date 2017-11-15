<template>
  <div :class=bodyClass ref="body">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  props: {
    header: Boolean,
  },
  computed: {
    bodyClass() {
      if (this.header === true) {
        return 'i-body';
      }
      return '';
    },
  },
};
</script>


<style lang="scss" scoped>
.i-body {
  width: 1190px;
  margin: auto;
}
</style>
