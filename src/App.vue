<template>
  <div id="app">
    <i-main></i-main>
  </div>
</template>

<script>
  import Main from '@/frame/Main';

  export default {
    name: 'app',
    components: {
      'i-main': Main,
    },
  };
</script>

<style>
  html, body {
    width: 100%;
    height: 100%;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color: #2c3e50;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>
