import Vue from 'vue'

const CusInput = {
  props: {
    value: {}
  },
  template: '<input type="text" :value="value" @input="handleInput" >',
  methods: {
    handleInput (e) {
      this.$emit('input', e.target.value)
    }
  }
}

const CusInputModel = {
  model: {
    prop: 'value1',
    event: 'cus-change'
  },
  props: {
    value1: {}
  },
  template: '<input type="text" :value="value1" @input="handleInputChange" >',
  methods: {
    handleInputChange (e) {
      this.$emit('cus-change', e.target.value)
    }
  }
}

new Vue({
  el: '#app',
  components: {
    CusInput,
    CusInputModel
  },
  data () {
    return {
      value: '1',
      value1: '2'
    }
  },
  template: `
    <div>
        <cus-input v-model="value" />
        <cus-input-model v-model="value1" />
    </div>
  `
})