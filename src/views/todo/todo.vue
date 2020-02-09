<template>
  <div class="main-todo">
    <input
      class="add-input"
      placeholder="接下来要做什么？"
      autofocus
      v-model="content"
      @keyup.enter="handleAddTodo"
    >
    <todo-item
      v-for="todo in filterTodoList"
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
  import { mapState, mapMutations, mapGetters } from 'vuex'
  import TodoItem from './todo-item.vue'
  import VTabs from './todo-tabs.vue'
  export default {
    metaInfo: {
      title: 'Todo App'
    },
    // 组件内路由守卫
    beforeRouteEnter (to, from, next) {
      // 在渲染该组件的对应路由被 confirm 前调用
      // 不！能！获取组件实例 `this`
      // 因为当守卫执行前，组件实例还没被创建
      console.log('beforeRouteEnter')
      next()
    },
    beforeRouteUpdate (to, from , next) {
      // 在当前路由改变，但是该组件被复用时调用
      // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
      // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
      // 可以访问组件实例 `this`
      console.log('beforeRouteUpdate', this)
      next()
    },
    beforeRouteLeave (to, from, next) {
      // 导航离开该组件的对应路由时调用
      // 可以访问组件实例 `this`
      console.log('beforeRouteLeave', this)
      next()
    },
    components: {
      TodoItem,
      VTabs
    },
    data () {
      return {
        id: 0,
        content: ''
      }
    },
    computed: {
      ...mapState('todo', {
        todos: state => state.todoList,
        filter: state => state.filter
      }),
      ...mapGetters('todo', [
          'unFinishedTodoCount',
          'filterTodoList'
      ])
    },
    methods: {
      ...mapMutations('todo', [
          'addTodo',
          'deleteTodoById',
          'clearAllCompletedTodo',
          'changeFilter'
      ]),
      handleAddTodo (e) {
        const todo = {
          id: ++this.id,
          content: this.content,
          completed: false
        }
        this.addTodo(todo)
        this.content = ''
      },
      handleToggleTodo (filter) {
        this.changeFilter(filter)
      },
      handleDeleteTodo (id) {
        this.deleteTodoById(id)
      },
      handleClearAllCompleted () {
        this.clearAllCompletedTodo()
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
