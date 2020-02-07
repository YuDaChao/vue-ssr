import Vue from 'vue'

const app = new Vue({
  el: '#app',
  template: '<div>this is a template {{ text }}</div>',
  data: {
    text: 0
  }
})

console.log(app)
