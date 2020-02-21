<script>
  export default {
    name: 'tab',
	  props: {
      index: {
        required: true,
	      type: [ String, Number ]
      },
		  label: {
        require: true,
			  type: [ String, Number ]
		  }
	  },
	  inject: ['rootTabs'],
	  computed: {
      actived () {
        // return this.$parent.value === this.index
	      return this.rootTabs.value === this.index
      }
	  },
	  methods: {
      handleClick () {
        this.rootTabs.onChange(this.index)
      }
	  },
	  mounted () {
      this.rootTabs.panels.push(this)
	  },
	  updated () {
      this.rootTabs.panels = [...this.rootTabs.panels]
	  },
    render () {
      const cls = {
        tab: true,
	      active: this.actived
      }
		  const tab = this.$slots.tab || (<span>{this.label}</span>)
		  return (
        <div class={cls} on-click={this.handleClick}>
	        {tab}
        </div>
      )
	  }
  }
</script>

<style lang="less" scoped>
.tab {
	display: inline-block;
	line-height: 40px;
	margin-right: 30px;
	position: relative;
	bottom: -2px;
	cursor: pointer;
	font-size: 14px;
	font-weight: 500;
	color: #303133;
	&.active {
		position: relative;
		&::after {
			content: "";
			position: absolute;
			left: 0;
			bottom: 2px;
			width: 100%;
			height: 2px;
			background-color: #409eff;
			z-index: 2;
		}
	}
	&:last-child {
		margin-right: 0;
	}
}
</style>