<template lang="html">
  <div class="">
    <header class="m-top g-top-user box-shadow">
      <h2 class="m-top-title tal ml20 tac">
        <i class="iconfont icon-arrow-left mr10" @click="backMy"></i>
        <span>
          <router-link tag="span" class="lottery active" :to="{ name: 'betRecord'}">数字彩</router-link>
          <span class="match">竞技彩</span>
        </span>
      </h2>
    </header>
    <div class="header-top-space"></div>
    <section class="g-tab">
      <div class="m-tab">
        <a class="qb w25 tac active" href="javascript:;">全部</a>
        <router-link class="zj w25 tac" :to="{ name: 'zqWaitPay' }">待支付</router-link>
        <router-link class="zj w25 tac" :to="{ name: 'zqWin' }">中奖</router-link>
        <router-link class="zj w25 tac" :to="{ name: 'zqWait' }">待开奖</router-link>
      </div>
    </section>
    <section class="g-record-lists" :style="{paddingBottom: isIosWebview ? '0' : '3.8rem'}">
      <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" :bottomPullText="bottomText" ref="loadmore">
        <router-link tag="aside" class="m-record-list" v-for="(lottery, index) in bet_list" :key="index" :to="{ path: 'jczqdetail', query: { order_id: lottery.order_id }}">
          <div class="tac">
            <h5 class="gray3">竞彩足球</h5>
            <p class=" gray9 mt5">{{ getTime(lottery.order_time) }}</p>
          </div>
          <div class="tac">
            <h5 class="gray3"></h5>
          </div>
          <div class="tac">
            <h5 class="red" v-if="lottery.order_status === 6">中奖{{ getMoney(lottery.bonus_money) }}元</h5>
            <h5 class="gray3" v-else>{{ getStatus(lottery.order_status) }}</h5>
            <p class=" gray9 mt5">投注 {{ getMoney(lottery.bet_money) }} 元</p>
          </div>
        </router-link>
      </mt-loadmore>
      <p style="text-align:center;padding: 10px 0;" v-show="is_more"><span >- - -记录太少，快去投注吧- - - </span></p>
    </section>
    <div class="seeMore tac" v-if="!isIosWebview && bet_list && (bet_list.length < 10 ? false : true)">
      查看更多记录请 <span @click="downApp">下载app</span>
    </div>
    <div class="footer-bottom-space"></div>
    <router-link tag="footer" class="m-footer" :to="{ name: 'jczq'}">
      <button class="m-footer-btn bgColor" id="" type="button">投注竞彩足球</button>
    </router-link>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Loadmore } from 'mint-ui'

export default {
  components: {
    'mt-loadmore': Loadmore
  },
  data: () => ({
    bet_list_info: {
      user_id: localStorage.user_id,
      limit: 10,
      page: 1,
      order_status: -1 // -1:全部
    },
    is_more: false,
    allLoaded: true, // 是否可以上拉属性，false 可以上拉，true 为禁止上拉
    bottomText: '上拉加载更多 . . .',
    isIosWebview: false
  }),
  computed: {
    ...mapState({
      bet_list: state => state.match.bet_list,
      bet_count: state => state.match.bet_count
    })
  },
  methods: {
    downApp () {
      window.open('https://p.duoduocp.cn/lotteryspread1/index.html?c=100001')
    },
    backMy () {
      this.$router.push('/my')
    },
    getMoney (money) {
      return (money * 0.01).toFixed(2)
    },
    getTime (time) {
      return time.slice(0, 10)
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
    isMore () {
      if (this.bet_count <= 10 || this.bet_count === this.bet_list.length) {
        this.is_more = true
      } else {
        this.is_more = false
      }
    },
    loadBottom () {
      // if (this.bet_list.length < 10) {
      //   this.allLoaded = false
      // }
      if (!this.isIosWebview) {
        return false
      }

      if (this.bet_list.length < 10) {
        this.$refs.loadmore.onBottomLoaded()
        this.allLoaded = true
      } else {
        this.bet_list_info.limit += 10
        setTimeout(() => {
          this.$store.dispatch('getGameOrders', this.bet_list_info)
        }, 1000)
      }
    }
  },
  watch: {
    bet_list: function () {
      this.$nextTick(() => {
        this.isMore()
      })
    }
  },
  created () {
    this.$store.dispatch('getGameOrders', this.bet_list_info)
    this.isIosWebview = String(localStorage.getItem('iosWebview')) === 'true' || false
    if (this.isIosWebview) {
      this.allLoaded = false
    }
  }
}
</script>

<style lang="css" scoped>
.m-record-list div:last-child{
  float: right;
}

</style>
