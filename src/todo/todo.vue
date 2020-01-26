<template>
  <div class="main-todo">
    <input
      class="add-input"
      placeholder="接下来要做什么？"
      autofocus
      @keyup.enter="addTodo"
    >
    <todo-item :todo="todo" />
    <v-tabs
      :filter="filter"
      :filter-todo="handleToggleTodo"
      :clear-all-completed="handleClearAllCompleted"
    />
  </div>
</template>

<script>
  import TodoItem from './todo-item.vue'
  import VTabs from './tabs.vue'
  export default {
    components: {
      TodoItem,
      VTabs
    },
    data () {
      return {
        filter: 'all',
        todo: {
          id: 1,
          content: 'this is a todo',
          completed: false
        }
      }
    },
    methods: {
      addTodo () {},
      handleToggleTodo (state) {
        this.filter = state
      },
      handleClearAllCompleted () {}
    }
  }
</script>

<style lang="less" scoped>
  .main-todo {
    width: 600px;
    margin: 0 auto;
    box-shadow: 0 0 5px #666;
    .add-input {
      width: 100%;
      font-size: 24px;
      border: 0;
      padding: 16px 16px 16px 60px;
      box-sizing: border-box;
      box-shadow: inset 0 -2px 2px rgba(0, 0, 0, 0.03);
      
    }
  }
</style>
