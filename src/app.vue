<template>
  <div id="app">
    <div id="cover"></div>
    <v-header />
    <router-link to="/todo">todo</router-link>
    <router-link to="/login">login</router-link>
    <transition name="fade">
      <router-view />
    </transition>
    <v-footer />
  </div>
</template>

<script>
  import VHeader from './layout/header.vue'
  import VFooter from './layout/footer.jsx'
  export default {
    components: {
      VHeader,
      VFooter
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
