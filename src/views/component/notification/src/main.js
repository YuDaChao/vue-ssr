import Vue from 'vue'
import Main from './main.vue'

const NotificationConstructor = Vue.extend(Main)

let instance
let instances = []
let seed = 1

const Notification = function (options) {
  if (Vue.prototype.$isServer) return
  const userOnClose = options.onClose
  const id = 'notification_' + seed++
  
  options.onClose = function () {
    Notification.close(id, userOnClose)
  }
  
  instance = new NotificationConstructor({
    data: options
  })
  instance.id = id
  // 生成$el对象
  instance.$mount()
  document.body.appendChild(instance.$el)
  // 必须等到组件挂载 动画结束后才去设置 visible
  instance.visible = true
  instance.dom = instance.$el
  
  let verticalOffset = options.offset || 0
  
  instances.forEach(item => {
    verticalOffset += item.$el.offsetHeight + 16
  })
  verticalOffset += 16
  instance.verticalOffset = verticalOffset
  
  instances.push(instance)
  
  return instance
}


Notification.close = function (id, userOnClose) {
  let index = -1
  const len = instances.length
  // 获取需要删除instance和下标
  const instance = instances.filter((instance, i) => {
    if (instance.id === id) {
      index = i
      return true
    }
    return false
  })[0]
  if (!instance) return
  if (typeof userOnClose === 'function') {
    userOnClose(instance)
  }
  // 删除实例
  instances.splice(index, 1)
  // 如果只有一个 什么也不做
  if (len <= 1) return
  const position = instance.position
  // 获取需要移除的组件高度
  const removeHeight = instance.dom.offsetHeight
  // 重新计算位置
  for (let i = index; i < len - 1; i++) {
    if (instances[i].position === position) {
      instances[i].dom.style[instance.verticalProperty] =
        parseInt(instances[i].dom.style[instance.verticalProperty], 10) - removeHeight - 16 + 'px'
    }
  }
}

Notification.closeAll = function () {
  for (let i = instances.length - 1; i >= 0; i--) {
    instances[i].close()
  }
}

export default (Vue) => {
  Vue.prototype.$notify = Notification
}

