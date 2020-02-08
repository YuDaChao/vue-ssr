import Vue from 'vue'

const comp = {
  template: '<input type="text" :value="value" >',
  data () {
    return {
      value: 123
    }
  },
  mounted () {
    console.log('comp')
  }
}

const CusComp = Vue.extend(comp)

new CusComp({
  el: '#app',
})

// new Vue({
//   el: '#app',
//   extends: comp,
//   data () {
//     return {
//       value: 456
//     }
//   },
//   mounted () {
//     console.log('CusComp')
//   }
// })