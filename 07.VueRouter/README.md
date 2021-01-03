# VueRouter

## 实现原理

### 功能分析

1.作为一个插件：实现 VueRouter 类和 install 方法

2.全局组件：router-view 和 router-link

3.监控 url 变化：监听 hashchange 和 popstate 事件

4.响应 url 组件：创建一个响应式属性 current, 当它改变时获取对应组件并显示。

### 实现一个插件

```js
// 引用构造函数，VueRouter中要使用
let Vue
class VueRouter {
    constructor(options) {
        this.$options = options
    }
} 

// 实现插件 install
VueRouter.install = function(_Vue) {
    Vue = _Vue
    Vue.mixin({
        // 判断只有根组件才有 router 选项
        if (this.$options.router) {
            Vue.prorotype.$router = this. $options.router
        }
    })
}

export default VueRouter
```

### 创建全局组件

#### router-link

```js
export default {
    props: {
        to: String,
        required: true
    },
    render(h) {
        return h('a', {
            attrs: {
                href: '#' + this.to
            }
        }, [
            this.$slots.default
        ])
    }
}
```

#### router-view

```js
// router-view

export default {
    render(h) {
        return h(null)
    }
}
```

### 监听 url 变化，响应组件

监听 hashchange

```js
// router

class VueRouter {
    constructor(options) {
        // 响应式 current
        Vue.util.defineReactive(this, 'current', '/')

        const initial = window.location.hash.slice(1) || '/'
        Vue.util.defineReactive(this, 'current', initial)

        // 监听 hashchange
        window.addEventListener('hashchange', this.onHashChange.bind(this))
        window.addEventListener('load', this.onHashChange.bing(this))
    }

    onHashChange() {
        this.current = window.location.hash.slice(1)
    }
}
```

获取 url 对应组件

```js
// router-view

export default {
    render(h) {
        let component = null
        this.$router.$options.routes.forEach(route => {
            if  (route.path === this.$router.current) {
                component = route.component
            }
        })
        return h(component)
    }
}
```

### 将 route 换成路由表

```js
// router
class VueRouter {
    constructor(options) {
        this.routeMap = {}
        this.options.routes.forEach(route => {
            this.routeMap[route.path] = route
        })
    }
}
```

```js
export default {
    render(h) {
        const { routeMap, current } = this.$router
        const coponent = routeMap[current].component
        return h(component)
    }
}
```
