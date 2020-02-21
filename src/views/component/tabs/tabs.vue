<script>
	import Panel from './pane.vue'
  export default {
    name: 'tabs',
    components: {
      Panel
    },
    props: {
      value: [String, Number],
	  },
	  provide () {
      return {
        rootTabs: this
      }
	  },
	  data () {
      return {
        panels: []
      }
	  },
	  methods: {
      onChange (index) {
        this.$emit('on-change', index)
      }
	  },
	  render () {
      return (
        <div class="tab-container">
          <div class="tabs">
            {this.$slots.default}
          </div>
          <panel panels={this.panels}/>
        </div>
      )
	  }
  }
</script>

<style lang="less" scoped>
.tabs {
	background-color: #fff;
	position: relative;
	&:after {
		content: "";
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 2px;
		background-color: #e4e7ed;
		z-index: 1;
	}
}
</style>