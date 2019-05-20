## Vue
> 知识点总结

### 生命周期钩子函数

beforeCreate
created
beforeMount
mounted
beforeUpdate
updated
beforeDestroy
destroyed

**首次渲染**

第一步执行 beforeCreated： 在 beforeCreated 中, 获取不到 props 或者 data 中的数据, 这些数据的初始化都在 initState 中

然后执行 created 钩子函数, 这时候 上面的数据已经能访问了, 但是组件还没有被挂载, 所以看不到

执行 beforeMount 钩子函数, 开始创建  VDOM

最后执行 mounted 钩子, 并将 VDOM 渲染为真实 DOM 并且渲染数据. 组件中有子组件的话, 会递归挂载子组件, 当所有子组件全部挂载完毕, 才会执行根组件的挂载钩子

**如果数据更新时**

会调用 beforeUpdate 和 updated, 数据更新前和数据更新后.

**keep-alive**

keep-alive 独有的生命周期, activated 和 dectivated

使用了 keep-alive 的组件在切换时不会被销毁, 而是缓存到内存中并执行 deactivated 钩子函数

命中缓存渲染后会执行 activated 钩子函数


### 组件通信

有如下几种情况:
- 父子组件通信
- 兄弟组件通信
- 跨多层级组件通信
- 任意组件通信

**父子通信**

父组件 :propsData="data" 传递数据, 子组件通过 props 接收数据

父组件 @emitEvent="event" 子组件通过 $emit('emitEvent') 发送事件传递数据给父组件

我们还可以通过访问 $parent 或者 $children 来访问组件实例中的方法和数据

**兄弟通信**

这种情况通过查找父组件中的子组件实现, 也就是 this.$parent.$children, 在 $children 中可以通过组件 name 查询到需要的组件实例, 然后进行通信

**跨多层级组件通信**

Vue 新增 API provide/inject

```
// 父组件 
export default {
  provide: {
    data: 1
  }
}

// 子组件
// 跨多层子组件
export default {
  inject: ['data'],
  mounted () {
    console.log(this.data) // 输出 1
  }
}
```

**任意组件**

1. 使用 vuex
2. 使用 Event Bus

```
// eventBus.js

import Vue from 'vue'
export default new Vue()


// 需要监听事件的组件
import Bus from 'eventBus.js'

<buttom @click='event'>

methods: {
  event() {
    Bus.$emit('touch-event')
  }
}

// 需要触发事件的组件
import Bus from 'eventBus.js'

mouted() {
  Bus.$on('touch-event', () => {
    this.data = 1
  })
}
```
