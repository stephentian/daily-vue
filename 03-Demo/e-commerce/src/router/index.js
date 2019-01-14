import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/views/layout'
// import Main from '@/views/main'

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [{
    path: '/',
    component: Layout,
    children: [{
      path: 'main',
      name: 'main',
      component: () => import('@/views/main')
    }, {
      path: 'category',
      name: 'category',
      component: () => import('@/views/category')
    }, {
      path: 'cart',
      name: 'cart',
      component: () => import('@/views/cart')
    }, {
      path: 'mine',
      name: 'mine',
      component: () => import('@/views/mine')
    }]
  }]
})