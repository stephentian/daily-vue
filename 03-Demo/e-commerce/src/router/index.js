import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/views/layout'

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [{
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home')
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