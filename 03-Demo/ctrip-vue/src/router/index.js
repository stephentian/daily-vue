import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Tour from '@/components/tour/Tour'
import Meet from '@/components/meet/Meet'
import Link from '@/components/link/Link'
import Bags from '@/components/bags/Bags'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect: '/tour'
    },
    {
      path: '/tour',
      name: 'Tour',
      component: Tour
    },
    {
      path: '/meet',
      name: 'Meet',
      component: Meet
    },
    {
      path: '/link',
      name: 'Link',
      component: Link
    },
    {
      path: '/bags',
      name: 'Bags',
      component: Bags
    }
  ]
})
