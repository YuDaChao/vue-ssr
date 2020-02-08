import Vue from 'vue'

const Comp = {
  props: {
    name: {
      default: 'Vue'
    }
  },
  data () {
    return {
      value: 1
    }
  },
  mounted () {
    console.log(this.name)
  },
  render (h) {
    return h('div', {
      style: {
        width: '200px',
        height: '200px',
        border: '1px solid'
      },
    }, [
      h('p', {
        on: {
          // 自组件自定义事件
          click: () => this.$emit('click')
        }
      }, this.name),
      // 定义slot
      this.$slots.default,
      this.$slots.body
    ])
  }
}

new Vue({
  el: '#app',
  components: {
    Comp
  },
  data () {
    return {
      value: 123
    }
  },
  methods: {
    handleClick () {
      console.log('clicked.')
    },
    handleNativeClick () {
      console.log('nativeClicked.')
    }
  },
  render (h) {
    return h('comp', {
      props: {
        name: 'Jack'
      },
      on: {
        // 处理自组件事件
        click: this.handleClick
      },
      nativeOn: {
        click: this.handleNativeClick
      }
    }, [
      h('span', {}, this.value),
      h('div', {
        attrs: {
          id: 'body',
          name: 'content'
        },
        slot: 'body' // 指定slot
      }, this.value)
    ])
  }
})