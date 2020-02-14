<template>
	<transition name="notification-fade">
		<div
			v-show="visible"
			:class="['notification', horizontalClass]"
			:style="positionStyle"
			@mouseenter="clearTimer"
			@mouseleave="startTimer"
		>
			<div class="notification__content">
				{{ title }}
			</div>
			<div
				v-if="showClose"
				class="close-btn"
				@click="close"
			>
				关闭
			</div>
		</div>
	</transition>
</template>

<script>
  export default {
    name: 'notification',
	  data () {
      return {
        title: '',
        duration: 3000,
	      visible: false,
        showClose: true,
	      closed: false,
	      verticalOffset: 0, // 偏移
	      position: 'top-right', // 位置
	      timer: null,
	      onClose: null
      }
	  },
	  computed: {
      horizontalClass () {
        return this.position.indexOf('right') > -1 ? 'right' : 'left'
      },
      verticalProperty () {
        return /^top-/.test(this.position) ? 'top' : 'bottom'
      },
      positionStyle () {
        return {
          [this.verticalProperty]: `${this.verticalOffset}px`
        }
      }
	  },
	  watch: {
      closed (newVal) {
        if (newVal) {
          this.visible = false
	        this.$el.addEventListener('transitionend', this.destroyElement, false)
        }
      }
	  },
	  mounted () {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this.close()
          }
        }, this.duration)
      }
	  },
	  beforeDestroy () {
      this.clearTimer()
	  },
    methods: {
      close () {
        this.closed = true
	      if (typeof this.onClose === 'function') {
	        this.onClose()
	      }
      },
	    clearTimer () {
        this.timer && clearTimeout(this.timer)
	    },
	    startTimer () {
        if (this.duration > 0) {
          this.timer = setTimeout(() => {
            if (!this.closed) {
              this.close()
            }
          }, this.duration)
        }
	    },
      destroyElement () {
        this.$el.removeEventListener('transitionend', this.destroyElement)
	      this.$destroy()
	      this.$el.parentNode.removeChild(this.$el)
      }
	  }
  }
</script>

<style lang="less" scoped>
.notification-fade-enter {
	&.right {
		right: 0;
		transform: translateX(100%);
	}

	&.left {
		left: 0;
		transform: translateX(-100%);
	}
}

.notification-fade-leave-active {
	opacity: 0;
}
.notification {
	display: flex;
	background-color: #303030;
	color: rgba(255, 255, 255, 1);
	align-items: center;
	padding: 20px;
	position: fixed;
	min-width: 280px;
	flex-wrap: wrap;
	box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
	transition: opacity .3s,transform .3s,left .3s,right .3s,top .4s,bottom .3s;
	&.right {
		right: 16px;
	}
	&.left {
		left: 16px;
	}
	.close-btn {
		color: #ff4081;
		padding-left: 24px;
		margin-left: auto;
		cursor: pointer
	}
}
</style>