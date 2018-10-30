<template lang="html">
  <div id="success">
    <header class="m-top g-top-open">
      <h2 class="m-top-title tac"><i class="iconfont icon-arrow-left mr10" @click="routerBack"></i><span>投注成功</span></h2>
    </header>
    <section class="g-bet-success">
      <div class="m-msg">
        <i class="iconfont icon-success"></i>
        <aside class="green ml15">
          <h5>支付成功，祝您好运</h5>
          <p>您的方案正在往投注站发送中...</p>
        </aside>
      </div>
      <ul class="m-msg-info mt30">
        <li class="gray3 tac">本次支付：<span class="green">{{ order_money / 100 }}</span>元</li>
        <li class="gray3 tac">账户余额：<span class="red">{{ balance }}</span>元</li>
      </ul>
    </section>
    <footer class="m-footer box-shadow">
      <div class="m-bottom-btn">
        <router-link tag="button" class="m-bottom-btn-red bgColor" to="/home">返回首页</router-link>
        <!-- <router-link tag="button" class="m-bottom-btn-white" :to="{ path: '/' + order_lottery_alias + 'detail' }">查看详情</router-link> -->
        <router-link v-if="separate === '1'" tag="button" class="m-bottom-btn-white" :to="{ path: '/zqRecord'}">投注记录</router-link>
        <router-link v-else tag="button" class="m-bottom-btn-white" :to="{ path: '/' + order_lottery_alias + 'detail', query: { order_id: order_id }}">查看详情</router-link>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'success',
  data () {
    return {
      order_id: this.$route.query.order_id,
      separate: this.$route.query.separate
    }
  },
  created () {
    this.$store.dispatch('getUserInfo', {'user_id': localStorage.user_id})
  },
  computed: {
    ...mapState({
      user_info: state => state.login.user_info,
      balance: state => {
        return (state.login.user_info.balance / 100).toFixed(2)
      },
      order_money: state => state.userOrder.order_money,
      order_lottery_alias: state => state.userOrder.order_lottery_alias
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
.m-msg{width:24.5rem;}
.m-msg aside{width:19rem;float:right;}
</style>
