# How to avoid duplicate rendering

> 如何避免重复渲染

基于 Vue 的双向绑定原理, 每个 watcher 对象都绑定了唯一的 id, 当组件 props 和 data 对象属性发生变化时,
会触发 watcher 对象的 update 方法.

但是, 连续多次改变 props 或者 data 对象属性, watcher 就会重复调用 update, 这会造成性能上的消耗.

所以要去判断是否为重复调用, queueWatcher 方法就是用来判断当前工作队列是否已经存在这个  watcher 对象.

存在, 则不插入 watcher 执行队列, 延后执行。
