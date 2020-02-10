import {
  queryTodoList
} from '../../api/index'

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
  setTodoList (state, todos) {
    state.todoList = todos
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

const actions = {
  async fetchTodoList ({ commit }) {
    const data = await queryTodoList()
    commit('setTodoList', data)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}