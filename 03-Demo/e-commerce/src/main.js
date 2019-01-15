import Vue from 'vue'
import App from './App.vue'
import router from './router'

import {
  Tabbar,
  TabbarItem,
  Button,
  Row,
  Col,
  Swipe,
  SwipeItem,
  List
} from 'vant'

Vue
  .use(Tabbar)
  .use(TabbarItem)
  .use(Button)
  .use(Row)
  .use(Col)
  .use(Swipe)
  .use(SwipeItem)
  .use(List)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')