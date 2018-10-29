import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";

import vueAwesomeSwiper from "vue-awesome-swiper";
import ElementUI from "element-ui";

Vue.use(ElementUI);
Vue.use(vueAwesomeSwiper);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
