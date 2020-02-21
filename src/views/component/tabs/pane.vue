<script>
  export default {
    name: 'pane',
	  props: {
      panels: {
        require: true,
	      type: Array
      }
	  },
	  render () {
      const panel = this.panels.map(panel => {
        return panel.actived ? panel.$slots.default : null
      })
      return (
        <div class="tab-content">
	        {panel}
        </div>
      )
	  }
  }
</script>

<style scoped>

</style>