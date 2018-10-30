<template lang="html">
  <div>
    <header class="m-top g-top-user box-shadow">
      <h2 class="m-top-title tal ml20"><i class="iconfont icon-arrow-left mr10" @click="back"></i><span>账户明细</span></h2>
    </header>
    <div class="header-top-space"></div>
    <section class="g-tab">
      <div class="m-tab">
        <a class="sj w33 tac" href="#">时间</a>
        <a class="lx w33 tac" href="#">类型</a>
        <a class="sl w33 tac" href="#">数量</a>
      </div>
    </section>
    <section class="g-record-lists">
      <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" :bottomPullText="bottomText" ref="loadmore">
        <aside class="m-record-list" v-for="(item, index) in account_list" :key="index">
          <div class="tac">
            <h5 class="gray3">{{ getTime(item.add_time) }}</h5>
          </div>
          <div class="tac">
            <h5 class="gray3">{{ getType(item.type) }}</h5>
          </div>
          <div class="tac">
            <h5 :class="getColor(item.balance_before, item.balance_now)">{{ getFee(item.balance_before, item.balance_now, item.fee) }}</h5>
          </div>
        </aside>
      </mt-loadmore>
      <p style="text-align:center;padding: 10px 0;" v-show="is_more"><span >- - -记录太少，快去投注吧- - - </span></p>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: () => ({
    account_info: {
      user_id: localStorage.user_id,
      limit: 20,
      page: 1
    },
    is_more: false,
    allLoaded: false, // 是否可以上拉属性，false 可以上拉，true 为禁止上拉
    bottomText: '上拉加载更多 . . .'
  }),
  computed: {
    ...mapState({
      account_list: state => state.user.account_list,
      account_count: state => state.user.account_count
    })
  },
  methods: {
    back () {
      this.$router.push('/my')
    },
    getTime (time) {
      return time.slice(0, 10)
    },
    getType (type) {
      switch (type) {
        case 0:
          return '未知'
        case 1:
          return '投注'
        case 2:
          return '中奖'
        case 3:
          return '提现'
        case 4:
          return '充值'
        case 5:
          return '出票失败退款'
        case 6:
          return '提现失败退款'
        case 7:
          return '活动返现'
      }
    },
    getColor (fee_before, fee_now) {
      if (fee_before > fee_now) {
        return 'blue'
      } else if (fee_before < fee_now) {
        return 'red'
      } else {
        return 'gray6'
      }
    },
    getFee (fee_before, fee_now, fee) {
      if (fee_before > fee_now) {
        return '-' + (fee * 0.01).toFixed(2)
      } else if (fee_before < fee_now) {
        return '+' + (fee * 0.01).toFixed(2)
      } else {
        return (fee * 0.01).toFixed(2)
      }
    },
    isMore () {
      if (this.account_count <= 10 || this.account_count === this.account_list.length) {
        this.is_more = true
        this.allLoaded = true
      } else {
        this.is_more = false
      }
    },
    loadBottom () {
      if (this.account_count < 10) {
        this.$refs.loadmore.onBottomLoaded()
        this.allLoaded = true
      } else {
        this.account_info.limit += 10
        if (this.account_info.limit > 40) {
          // 调用加载完成事件
          this.$refs.loadmore.onBottomLoaded()
          this.allLoaded = true
        }
        setTimeout(() => {
          this.$store.dispatch('accountList', this.account_info)
        }, 1000)
      }
    }
  },
  watch: {
    account_list: function () {
      this.$nextTick(() => {
        this.isMore()
      })
    }
  },
  created () {
    // do something after creating vue instance
    this.$store.dispatch('accountList', this.account_info)
  }
}
</script>

<style lang="css" scoped>
.g-record-lists .m-record-list{height:3.6rem;}
</style>
