import Vue from 'vue'

const app = new Vue({
  template: '<div>{{ text }}</div>',
  data() {
    return {
      text: 0
    }
  },
  // 当创建Vue实例时，就会执行 beforeCreate created，此时的$el不可见
  beforeCreate () {
    console.log('beforeCreate')
  },
  created () {
    console.log('created')
  },
  // 挂载DOM时，执行 beforeMount mounted，$el可见
  beforeMount () {
    console.log('beforeMount')
  },
  mounted () {
    console.log('mounted')
  },
  beforeUpdate () {
    console.log('beforeUpdate')
  },
  updated () {
    console.log('updated')
  },
  activated () {
    console.log('activated')
  },
  deactivated () {
    console.log('deactivated')
  },
  beforeDestroy () {
    console.log('beforeDestroy')
  },
  destroyed () {
    console.log('destroyed')
  }
})

// 挂载
app.$mount('#app')

// 修改数据
app.text = 1 // app.$data.text = 1

console.log(app)
