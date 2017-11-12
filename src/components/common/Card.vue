<template>
  <div class="w-card">
      <slot name="body"></slot>
  </div>
</template>

<style lang="scss" scoped>
.w-card {
  background-color: #FFF;
  margin: 8px 0px;
  padding: 10px 20px;
  /*padding: 0px 20px;*/
  /*border-radius: 3px;*/
  box-shadow: 0 0 5px #ccc;
}
</style>

