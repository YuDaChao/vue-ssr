<template>
  <div id="app">
    <div id="cover"></div>
    <v-todo />
  </div>
</template>

<script>
  import VTodo from './todo/index.vue'
  export default {
    components: {
      VTodo
    }
  }
</script>

<style lang="less" scoped>
  #app {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    #cover {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background-color: #999;
      opacity: 0.7;
      z-index: -1;
    }
  }
</style>
