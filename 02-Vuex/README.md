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
1. Vuex 的状态存储是响应式的. 当 Vue 组件从 store 读取状态时, 若 store 发生变化, 那么组件也会更新.
2. 不能直接改变 store 中的状态！改变 store 中的状态的唯一途径就是提交 `commit` **mutation**.

## 核心概念

### State

#### 在组件中获得 vuex 状态

1.单组件

```
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
```
const app = new Vue({
  el: '#app',
  store,
  components: { Counter },
  template: `<div id="app">
    <counter></counter>
  </div>`
})
```
