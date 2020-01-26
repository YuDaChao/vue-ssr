<template>
  <div class="main">
    <v-header />
    <v-todo />
    <v-footer />
  </div>
</template>

<script>
  import VHeader from './header.vue'
  import VTodo from './todo.vue'
  import VFooter from './footer.jsx'
  export default {
    components: {
      VHeader,
      VTodo,
      VFooter
    }
  }
</script>

<style>
  .main {}
</style>
