# Vuex

## Vue 是什么？

Vuex 是一个专门为 Vue.js 应用程序开发的状态管理模式.
它 采用集中式存储管理应用的所有组件的状态, 并以相应的规则保证状态以一种可预测的方式发生变化.

## 什么是状态管理模式？

状态管理应用分以下 3 个部分：

- state: 驱动应用的数据源;
- view: 以声明方式将 state 映射到视图;
- actions: 响应在 view 上用户输入导致的状态变化.

## 开始

每一个 Vuex 应用的核心是 `store`, Vuex 和单纯的全局对象有以下两点不同：

1. Vuex 的状态存储是响应式的. 当 Vue 组件从 store 读取状态时, 若 store 发生变化, 那么组件也会更新。
2. 不能直接改变 store 中的状态！改变 store 中的状态的唯一途径就是提交 `commit` **mutation**。

## 核心概念

### State

#### 单一状态树

> Single State Tree

Vuex 使用单一状态树，用一个对象就包含了全部的应用层级状态。
每个应用仅仅包含一个 store 实例。

#### 在组件中获得 vuex 状态

1.单组件

```js
// Conster 组件
const Conster =  {
  template: `<div>{{ count }}</div>`,
  computed: {
    count () {
      return store.state.count
    }
  }
}
```

2.从根组件“注入”(`Vue.use(Vuex)`)

```js
const app = new Vue({
  el: '#app',
  store,
  components: { Counter },
  template: `<div id="app">
    <counter></counter>
  </div>`
})
```

该 store 实例会注入到根组件下的所有子组件中, 子组件通过 `this.$store` 访问。

```js
// 子组件
const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count() {
      return this.$store.state.count
    }
  }
}
```

#### `mapState` 辅助函数

当一个组件需要获取多个状态时, `mapState` 赋值函数帮助我们生成计算属性, 少写代码。

```js
import { mapState } from 'vuex'

export default {
  // ...
  computed: mapState({
    // 要获取 this, 必须使用常规函数
    countPlusLocalState (state) {
      return state.count + this.localCount
    },

    // 箭头函数
    count: state => state.count,

    // 传字符串参数 'count' 等同于 `state => state.count`
    countAlias: 'count'
  })
}
```

当映射的计算属性名称与 state 名称相同时, 我们可以给 `mapState` 传一个字符串数组

```js
computed: mapState([
  'count'
])
```

#### 对象展开运算符

`mapState` 函数返回一个对象。
当我们将 `mapState` 与局部计算属性混合使用时，需要使用一个工具函数将多个对象合并，
最后将最终对象传给 `computed` 属性。
但是有对象展开运算符，可以极大简化写法。

```js
computed: {
  ...mapState({
    // ...
  }),
  localComputed () {}
}
```

### Getter

有时候我们需要对 store 中的 state 数据进行处理(文档：派生出一些状态)。
比如对列表进行过滤，合并等等。

Vuex 允许在 store 中定以 "getter"(可认为是 store 里的计算属性).

Getter 接受 state 作为其第一个参数：

```js
const store = new Vuex.Store({
  state: {
    tods: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
  }
})
```

#### 通过属性访问

```js
store.getters.doneTodos
```

Getter 也可以接受 getters 作为第二个参数：

```js
getters: {
  // ...
  doneTodosCount: (state, getters) => {
    return getters.doneTodos.length
  }
}
```

在组件中使用它：

```js
computed: {
  doneTodosCount () {
    return this.$store.getters.doneTodosCount
  }
}
```

#### 通过方法访问

让 getter 返回一个函数, 实现给 getter 传参, 在 store 里数组查询很有用。

```js
getters: {
  getTodoById: (state) => (id) => {
    return state.todos.find(todo => todo.id === id)
  }
}
```

```js
store.getters.getTodoById(2)
```

#### `mapGetters` 辅助函数

`mapGetters` 将 store 中的 getter 映射到局部计算属性：

```js
import { mapGetter } from 'vuex'

export default {
  // ...
  computed: {
    ...mapGetters([
      'doneTodos',
      'doneTodosCount'
    ])
  }
}
```

如果你想给 getter 属性另取一个名字：

```js
mapGetters({
  doneCount: 'doneTodosCount'
})
```

## 实现原理

### 功能分析

1. 实现一个插件：Store 类, 挂载 $store
2. Store 内部：
   1. 响应式 state, 保存 getter, mutations, actions
   2. getter 实现，根据 getter 定义修改 state
   3. commit 实现，执行 mutation
   4. dispatch 实现，执行 action

### 实现 Store

```js
// store.js
let Vue

class Store {
  contstructor(options = {}) {
    this._vm = new Vue({
      data: {
        $$state: options.state
      }
    })
  }
  get state() {
    return this._vm.data.$$state
  }
  set state() {
    console.error('please use replaceState to reset state')
  }
}

function install(_Vue) {
  Vue = _Vue
  Vue.mixin({
    beforeCreate() {
      if(this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}

export default { Store, install }
```

### 实现 commit

```js
// store

class Store {
  constructor(options = {}) {
    this._mutations = options.mutations || {}
  }
  commit(type, payload) {
    const entry = this._mutaions[type]
    if  (!entry) return
    // 传递上下文
    entry(this.state, payload)
  }
}
```

### 实现 actions

```js
// store
class Store {
  constructor(options = {}) {
    this._actions = options.actions || {}
  }

  const store = this
  const { dispatch, commit } = this
  this.dispatch = function boundDispatch(type, payload) {
    return dispatch.call(store, type, payload)
  }
  this.commit = function boundCommit(type, payload, options) {
    return commit.call(store, type, payload, options)
  }

  dispatch(type, payload) {
    const entry = this._mutaions[type]
    if  (!entry) return
    // 传递上下文
    // 返回 Promise
    return entry(this, payload)
  }
}
```
