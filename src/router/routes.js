
export default [
  {
    path: '/',
    name: 'home',
    redirect: '/todo'
  },
  {
    path: '/todo',
    name: 'todo',
    component: () => import(/* webpackChunkName: "todo" */ '../views/todo/todo.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/login.vue')
  }
]