<template>
  <div id="">
    <header class="m-top g-top-user box-shadow">
      <h2 class="m-top-title tal ml20"><i class="iconfont icon-arrow-left mr10" @click='back'></i><span>优惠券</span></h2>
    </header>
    <div class="header-top-space"></div>
    <section class="g-tab">
      <div class="m-tab">
        <router-link class="ky tac" :to="{ name: 'coupon'}">可用</router-link>
        <a class="ls tac active" href="javascript:;">历史</a>
      </div>
    </section>
    <section class="g-history-coupon">
      <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" :bottomPullText="bottomText" ref="loadmore">
        <aside class="m-coupon-new mb15" :class="getCouponState(coupon.coupon_status)" v-for="(coupon, index) in coupon_list" :key="index">
          <div>
            <h2 class="mt10">{{ coupon.coupon_name }}</h2>
            <h5 class="mt10">{{ getType(coupon.coupon_type) }}</h5>
            <h5 class="mt5">{{ getTime(coupon.start_date) }}至{{ getTime(coupon.expired_date) }}</h5>
          </div>
          <div class="tar">
            <p class="mt25"><span>￥</span><span>{{ getMoney(coupon.face) }}</span></p>
            <em>满{{ getMoney(coupon.minimum) }}元可用</em>
          </div>
        </aside>
      </mt-loadmore>
      <p style="text-align:center;padding: 10px 0;" v-show="is_more"><span >- - -记录太少，快去投注吧- - - </span></p>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Loadmore } from 'mint-ui'

export default {
  name: '',
  components: {
    'mt-loadmore': Loadmore
  },
  data: () => ({
    coupon_used_info: {
      user_id: localStorage.user_id,
      page: 1,
      limit: 10,
      alias: '',
      coupon_status: 1 // 1 为不可以，0 为可用
    },
    is_more: false,
    allLoaded: false, // 是否可以上拉属性，false 可以上拉，true 为禁止上拉
    bottomText: '上拉加载更多 . . .'
  }),
  computed: {
    ...mapState({
      coupon_list: state => state.user.coupon_list,
      coupon_count: state => state.user.coupon_count
    })
  },
  methods: {
    back () {
      this.$router.push('/my')
    },
    getMoney (money) {
      return (money * 0.01).toFixed(2)
    },
    getTime (time) {
      return time.slice(0, 10)
    },
    getType (type) {
      switch (type) {
        case 0:
          return '全彩种可使用'
        case 1:
          return '限普通彩使用'
        case 2:
          return '限高频彩使用'
        case 3:
          return '限竞技彩使用'
      }
    },
    // 计较时间
    compareDate (time) {
      const toDate = new Date()
      const couponTime = time.split('-')[0] + '/' + time.split('-')[1] + '/' + time.split('-')[2]
      return Date.parse(couponTime) - Date.parse(toDate.toLocaleDateString())
    },
    getCouponState (status) {
      if (status === 1) {
        return 'used'
      } else {
        return 'expired'
      }
    },
    isMore () {
      if (this.coupon_count <= 10 || this.coupon_count === this.coupon_list.length) {
        this.is_more = true
      } else {
        this.is_more = false
      }
    },
    loadBottom () {
      if (this.coupon_count < 10) {
        this.$refs.loadmore.onBottomLoaded()
        this.allLoaded = true
      } else {
        this.coupon_used_info.limit += 10
        if (this.coupon_used_info.limit > 40) {
          // 调用加载完成事件
          this.$refs.loadmore.onBottomLoaded()
          this.allLoaded = true
        }
        setTimeout(() => {
          this.$store.dispatch('getCouponList', this.coupon_used_info)
        }, 1000)
      }
    }
  },
  watch: {
    coupon_list: function () {
      this.$nextTick(() => {
        this.isMore()
      })
    }
  },
  created () {
    // do something after creating vue instance
    this.$store.dispatch('getCouponList', this.coupon_used_info)
  }
}
</script>
