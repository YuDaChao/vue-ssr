<template>
  <div class="main">
    <v-header />
    <v-todo />
    <v-footer />
  </div>
</template>

<script>
  import VHeader from '../layout/header.vue'
  import VTodo from './todo/todo.vue'
  import VFooter from '../layout/footer.jsx'
  export default {
    components: {
      VHeader,
      VTodo,
      VFooter
    }
  }
</script>

<style lang="less">
  .main {}
</style>
