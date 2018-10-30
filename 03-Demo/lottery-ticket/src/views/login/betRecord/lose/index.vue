<template lang="html">
  <div class="">
    <header class="m-top g-top-user box-shadow">
      <h2 class="m-top-title tal ml20 tac"><i class="iconfont icon-arrow-left mr10" @click="backMy"></i>
        <span>
          <span class="lottery">数字彩</span>
          <router-link tag="span" class="match active" :to="{ name: 'zqRecord'}">竞技彩</router-link>
        </span>
      </h2>
    </header>
    <div class="header-top-space"></div>
    <section class="g-tab">
      <div class="m-tab">
        <router-link class="zj w25 tac" :to="{ name: 'betRecord' }">全部</router-link>
        <router-link class="zj w25 tac" :to="{ name: 'betWin' }">中奖</router-link>
        <router-link class="zj w25 tac" :to="{ name: 'betWait' }">待开奖</router-link>
        <a class="qb w25 tac active" href="javascript:;">未中奖</a>
      </div>
    </section>
    <section class="g-record-lists">
      <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" :bottomPullText="bottomText" ref="loadmore">
        <router-link tag="aside" class="m-record-list" v-for="(lottery, index) in bet_list" :key="index" :to="{ path: '/' + lottery.lottery_alias + 'detail', query: { order_id: lottery.order_id }}">
          <div class="tac">
            <h5 class="gray3">第{{ lottery.lottery_period }}期</h5>
            <p class=" gray9 mt5">{{ getTime(lottery.order_time) }}</p>
          </div>
          <div class="tac">
            <h5 class="gray3">{{ getName(lottery.lottery_alias) }}</h5>
          </div>
          <div class="tac">
            <h5 class="gray3">未中奖</h5>
            <p class=" gray9 mt5">投注{{ getMoney(lottery.total_money) }}元</p>
          </div>
        </router-link>
      </mt-loadmore>
      <p style="text-align:center;padding: 10px 0;" v-show="is_more"><span >- - -记录太少，快去投注吧- - - </span></p>
    </section>

    <div class="footer-bottom-space"></div>
    <router-link tag="footer" class="m-footer" :to="{ name: 'ssq'}">
      <button class="m-footer-btn" id="" type="button">投注双色球</button>
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
      order_status: 5 // -1:全部, 5: 未中奖
    },
    is_more: false,
    allLoaded: false, // 是否可以上拉属性，false 可以上拉，true 为禁止上拉
    bottomText: '上拉加载更多 . . .'
  }),
  computed: {
    ...mapState({
      bet_list: state => state.user.bet_list,
      bet_count: state => state.user.bet_count
    })
  },
  methods: {
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
    isMore () {
      if (this.bet_count <= 10 || this.bet_count === this.bet_list.length) {
        this.is_more = true
      } else {
        this.is_more = false
      }
    },
    loadBottom () {
      if (this.bet_list.length < 10) {
        this.$refs.loadmore.onBottomLoaded()
        this.allLoaded = true
      } else {
        this.bet_list_info.limit += 10
        setTimeout(() => {
          this.$store.dispatch('betOrderList', this.bet_list_info)
        }, 1500)
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
    // do something after creating vue instance
    this.$store.dispatch('betOrderList', this.bet_list_info)
  }
}
</script>

<style lang="css" scoped>
</style>
