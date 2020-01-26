<template>
  <div class="main-todo">
    <input
      class="add-input"
      placeholder="接下来要做什么？"
      autofocus
      v-model="content"
      @keyup.enter="addTodo"
    >
    <todo-item
      v-for="todo in filterTodos"
      :todo="todo"
      :key="todo.id"
      @delete="handleDeleteTodo"
    />
    <v-tabs
      :count="unFinishedTodoCount"
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
        id: 0,
        content: '',
        filter: 'all',
        todos: []
      }
    },
    computed: {
      unFinishedTodoCount() {
        return this.todos.filter(todo => !todo.completed).length
      },
      filterTodos () {
        if (this.filter === 'completed') {
          return this.todos.filter(todo => todo.completed)
        } else if (this.filter === 'active') {
          return this.todos.filter(todo => !todo.completed)
        } else {
          return this.todos
        }
      }
    },
    methods: {
      addTodo (e) {
        this.todos.unshift({
          id: ++this.id,
          content: this.content,
          completed: false
        })
        this.content = ''
      },
      handleToggleTodo (state) {
        this.filter = state
      },
      handleDeleteTodo (id) {
        this.todos.splice(
          this.todos.findIndex(todo => todo.id === id),
          1
        )
      },
      handleClearAllCompleted () {
        this.todos = this.todos.filter(todo => !todo.completed)
      }
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
