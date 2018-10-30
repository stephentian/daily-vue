<template lang="html">
  <div>
    <header class="m-top g-top-user">
      <h2 class="m-top-title tal ml20"><i class="iconfont icon-arrow-left mr10" @click="back"></i><span>追号详情</span></h2>
    </header>
    <div class="header-top-space"></div>
    <section class="g-detail-bet">
      <div class="m-detail-bet">
        <div class="m-detail-title">
          <i class="ico-small lottery-3d"></i>
          <h3 class="ml10">福彩3D</h3>
        </div>
      </div>
    </section>
    <section class="g-open-status mt15">
      <div class="m-input" v-if="follow_status === '1'">
        <label>订单状态</label><code>追号进行中</code>
      </div>
      <div class="m-input" v-if="follow_status === '2'">
        <label>订单状态</label><code>已完结</code>
      </div>
      <div class="m-input">
        <label>追号进度</label><code>已追{{ follow_num - follow_remain_num }}期/共{{ follow_num }}期</code>
      </div>
      <div class="m-input" v-if="chase_info[0]">
        <label>追号金额</label><code>{{ getMoney(chase_info[0].total_money) }}元</code>
      </div>
    </section>
    <section class="g-detail-betchase mt15">
      <aside class="m-detail-betchase">
        <div class="m-detail-betchase-title mb5">
          <em class="gray9 tac">序号</em>
          <span class="gray9 tac">期次</span>
          <span class="gray9 tac">倍数</span>
          <span class="gray9 tac">订单信息</span>
        </div>
        <router-link tag="div" class="m-detail-betchase-list" v-for="(ticket, index) in chase_info" :key="index" :to="{ path: '/3ddetail', query: { order_id: ticket.order_id }}">
          <em class="gray3 tac">{{ index + 1 }}</em>
          <span class="gray3 tac">{{ ticket.lottery_period }}</span>
          <span class="gray3 tac">{{ ticket.amount }}</span>
          <span class="gray3 tac">{{ getStatus(ticket.order_status) }}</span>
        </router-link>
      </aside>
    </section>
    <section v-if="chase_info[0]" class="g-detail-order mt15">
      <div class="m-input">
        <label>下单时间</label><code>{{ getTime(chase_info[0].order_time, 0, 10) }} {{ getTime(chase_info[0].order_time, 11, 19) }}</code>
      </div>
      <div class="m-input">
        <label>订单编号</label><code>{{ chase_info[0].order_id }}</code>
      </div>
    </section>
    <div class="footer-bottom-space"></div>
    <router-link  class="m-footer box-shadow" tag="footer" :to="{ name: '3d'}">
      <div class="m-bottom-btn">
        <button class="m-footer-btn bgColor" type="button">继续投注</button>
      </div>
    </router-link>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      chase_order_info: {
        user_id: localStorage.user_id,
        followed_order_id: this.$route.query.order_id,
        limit: 10,
        page: 1
      },
      follow_num: this.$route.query.follow_num,
      follow_remain_num: this.$route.query.follow_remain_num,
      follow_status: this.$route.query.follow_status
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
    getStatus (status) {
      switch (status) {
        case 0:
          return '待支付'
        case 1:
          return '等待出票'
        case 2:
          return '等待开奖'
        case 3:
          return '出票失败'
        case 4:
          return '已退款'
        case 5:
          return '未中奖'
        case 6:
          return '已中奖'
        case 7:
          return '部分出票成功'
      }
    },
    getTime (time, start, end) {
      return time.slice(start, end)
    },
    getMoney (money) {
      return (money * 0.01).toFixed(2)
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
