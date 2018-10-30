<template lang="html">
  <div id="fail">
    <header class="m-top g-top-open">
      <h2 class="m-top-title tac"><i class="iconfont icon-arrow-left mr10" @click="routerBack"></i><span>投注失败</span></h2>
    </header>
    <section class="g-bet-fail">
      <div class="m-msg">
        <i class="iconfont icon-fail"></i>
        <aside class="red ml15">
          <h3>投注失败</h3>
        </aside>
      </div>
      <ul class="m-msg-info mt30">
        <li class="gray9 tac">{{ lottery_order_msg_err }}</li>
      </ul>
    </section>
    <footer class="m-footer box-shadow">
      <div class="m-bottom-btn">
        <router-link tag="button" class="m-footer-btn bgColor" to="/home">返回首页</router-link>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'fail',
  data () {
    return {
    }
  },
  created () {
  },
  computed: {
    ...mapState({
      lottery_order_msg_err: state => state.userOrder.lottery_order_msg_err
    })
  },
  mounted () {},
  methods: {
    routerBack () {
      // 返回上一级
      window.history.length > 2 ? this.$router.go(-1) : this.$router.push('/home')
    }
  }
}
</script>

<style lang="css" scoped>
.m-top-title i {
  position: absolute;
  top: 50%;
  left: 2rem;
  -webkit-transform: translate(0,-50%);
  -moz-transform: translate(0,-50%);
  transform: translate(0,-50%);
}
</style>
