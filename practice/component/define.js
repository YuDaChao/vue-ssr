import Vue from 'vue'

// 自定义组件

const myComp = {
  props: {
    name: {
      type: String,
      default: '',
      required: true
    }
  },
  template: '<div>this is myComp, Hello {{ name }}</div>'
}

// 注册全局
Vue.component('MyComp', myComp)

new Vue({
  el: '#app',
  template: '<my-comp name="Jack"></my-comp>'
})