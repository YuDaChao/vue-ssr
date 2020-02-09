const state = {
  todoList: [],
  filter: 'all'
}

const getters = {
  unFinishedTodoCount (state) {
    return state.todoList.filter(todo => !todo.completed).length
  },
  filterTodoList (state) {
    if (state.filter === 'completed') {
      return state.todoList.filter(todo => todo.completed)
    } else if (state.filter === 'active') {
      return state.todoList.filter(todo => !todo.completed)
    } else {
      return state.todoList
    }
  }
}

const mutations = {
  addTodo (state, todo) {
    state.todoList.push(todo)
  },
  deleteTodoById (state, id) {
    state.todoList.splice(
      state.todoList.findIndex(todo => todo.id === id),
      1
    )
  },
  clearAllCompletedTodo (state) {
    state.todoList = state.todoList.filter(todo => !todo.completed)
  },
  changeFilter (state, filter) {
    state.filter = filter
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}