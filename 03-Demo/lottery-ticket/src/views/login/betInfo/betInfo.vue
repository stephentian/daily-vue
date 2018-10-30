<template lang="html">
  <div>
    <header class="m-top g-top-user">
      <h2 class="m-top-title tal ml20"><i class="iconfont icon-arrow-left mr10" @click="back"></i><span>追号详情</span></h2>
    </header>
    <div class="header-top-space"></div>
    <section class="g-detail-bet">
      <div class="m-detail-bet">
        <div class="m-detail-title">
          <i :class="['ico-small', 'lottery-'+chase_info.lottery_alias]"></i>
          <h3 class="ml10">大乐透</h3>
        </div>
      </div>
      <aside class="m-detail-selected">
        <div class="group">
          <em class="red mr5">02</em>
          <em class="red mr5">13</em>
          <em class="red mr5">16</em>
          <em class="red mr5">25</em>
          <em class="red mr5">29</em>
          <em class="mr5">|</em>
          <em class="blue mr5">05</em>
          <em class="blue">07</em>
        </div>
      </aside>
    </section>
    <section class="g-open-status mt15">
      <div class="m-input">
        <label>订单状态</label><code>追号进行中</code>
      </div>
      <div class="m-input">
        <label>预计开奖</label><code>今天 21:15</code>
      </div>
      <div class="m-input">
        <label>追号进度</label><code>已追3期/共3期</code>
      </div>
      <div class="m-input">
        <label>追号金额</label><code>共4.00元</code>
      </div>
    </section>
    <section class="g-detail-betchase mt15">
      <aside class="m-detail-betchase">
        <div class="m-detail-betchase-title mb5">
          <em class="gray9 tac">序号</em>
          <span class="gray9 tac">期次</span>
          <span class="gray9 tac">状态</span>
          <span class="gray9 tac">中奖信息</span>
        </div>
        <div class="m-detail-betchase-list">
          <em class="gray3 tac">1</em>
          <span class="gray3 tac">2018005</span>
          <span class="gray3 tac">出票成功</span>
          <span class="gray3 tac">未中奖</span>
        </div>
        <div class="m-detail-betchase-list">
          <em class="gray3 tac">2</em>
          <span class="gray3 tac">2018006</span>
          <span class="gray3 tac">出票成功</span>
          <span class="red tac">等待开奖</span>
        </div>
      </aside>
    </section>
    <section class="g-detail-order mt15">
      <div class="m-input">
        <label>下单时间</label><code id="">2017-11-30 17:53:29</code>
      </div>
      <div class="m-input">
        <label>订单编号</label><code id="">2017113017CP4153653</code>
      </div>
      <div class="m-input">
        <label>支付信息</label><code id="">微信支付0.01元，红包支付1.99元</code>
      </div>
    </section>
    <div class="footer-bottom-space"></div>
    <footer class="m-footer box-shadow">
      <div class="m-bottom-btn">
        <button class="m-footer-btn bgColor" id="" type="button">继续投注</button>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      chase_order_info: {
        user_id: localStorage.user_id,
        followed_order_id: this.$route.params.follow_order_id
      }
    }
  },
  computed: {
    ...mapState({
      chase_info: state => state.user.bet_info
    })
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    getName (alias) {
      switch (alias) {
        case 'ssq':
          return '双色球'
        case 'dlt':
          return '大乐透'
        case '3d':
          return '福彩3D'
        case 'JXK3':
          return '江西快3'
        case 'dlc':
          return '江西多乐彩(11选5)'
      }
    }
  },
  created () {
    // do something after creating vue instance
    this.$store.dispatch('chaseInfo', this.chase_order_info)
  }
}
</script>

<style lang="css" scoped>
.g-detail-bet {
  height: 5rem;
}
.g-detail-bet .m-detail-selected {
  position: absolute;
  top: 50%;
  left: 11rem;
  -webkit-transform: translate(0, -50%);
  -ms-transform: translate(0, -50%);
  transform: translate(0, -50%);
  height: 2rem;
  line-height: 2rem;
}
</style>
