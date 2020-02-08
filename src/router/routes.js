import Todo from '../views/todo/todo.vue'

export default [
  {
    path: '/',
    redirect: '/todo'
  },
  {
    path: '/todo',
    component: Todo
  }
]