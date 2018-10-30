<template>
  <div id="bottomTab">
    <div class="footer-bottom-space"></div>
    <footer class="m-footer box-shadow">
      <nav class="m-footer-nav" id="nav">
        <router-link :to="{ name: 'home' }" class="tac" :class="'home' === $route.name ? 'active' : ''" id="navLottery">
          <i class="iconfont" :class="['home' === $route.name ? 'icon-home-active' : 'icon-home-default']"></i>
          <span>购彩</span>
        </router-link>
        <router-link :to="{ name: 'open' }" class="tac" :class="'open' === $route.name ? 'active' : ''" id="navOpen">
          <i class="iconfont" :class="['open' === $route.name ? 'icon-trophy-active' : 'icon-trophy-default']"></i>
          <span>开奖</span>
        </router-link>
        <router-link :to="{ name: 'my' }" class="tac" :class="'my' === $route.name ? 'active' : ''" id="navMy">
          <i class="iconfont" :class="['my' === $route.name ? 'icon-user-active' : 'icon-user-default']"></i>
          <span>我的</span>
        </router-link>
      </nav>
    </footer>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: '',
  data: () => ({

  }),
  computed: {
    ...mapState({
      isLogined: state => state.login.isLogined
    })
  }
}
</script>
<style lang="css" scoped>

</style>
