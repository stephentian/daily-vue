<template>
  <div id="">
    <header class="m-top box-shadow">
      <h2 class="m-top-title tal ml20">
        <i class="iconfont icon-arrow-left mr10" @click="backMy"></i>
        <span>我的分享</span>
      </h2>
    </header>
    <div class="header-top-space"></div>
    <section class="g-my-share">
      <div class="share-msg">
        <aside class="m-own-list tac">
          <h5>分享人数</h5>
          <p class="mt10">{{ cash_back.share_count }}</p>
        </aside>
        <aside class="m-own-list tac">
          <h5>分享收益</h5>
          <p class="mt10">￥{{ getMoney(cash_back.balance) }}</p>
        </aside>
      </div>
      <div @click.prevent="getCashBack" class="m-middle-button bgColor tac">提现至购彩金额</div>
    </section>
    <section class="g-tab">
      <div class="m-tab m-tab-share">
        <a href="javascript:;" class="sj w33 tac">时间</a>
        <a href="javascript:;" class="sj w33 tac">类型</a>
        <a href="javascript:;" class="sj w33 tac">金额</a>
      </div>
    </section>
    <section class="g-record-lists">
      <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" :bottomPullText="bottomText" ref="loadmore">
        <aside class="m-record-list" v-for="(share, index) in cash_list" :key="index">
          <div class="tac">
            <h5 class="gray3">{{ getTime(share.add_time, 5, 10) +" "+ getTime(share.add_time, 11, 16) }}</h5>
          </div>
          <div class="tac">
            <h5 class="gray3">{{ getType(share.type) }}</h5>
          </div>
          <div class="tac">
            <h5 :class="getColor(share.type)">{{ getFee(share.balance_before, share.balance_now, share.fee) }}</h5>
          </div>
        </aside>
      </mt-loadmore>
      <p style="text-align:center;padding: 10px 0;" v-show="is_more"><span >- - -记录太少，快去分享吧- - - </span></p>
    </section>
    <div class="footer-bottom-space"></div>
    <footer class="m-footer">
      <span style="display: inline-block; text-align:center; line-height:4.2rem" @click="toShare" class="m-footer-btn bgColor">去 分 享</span>
    </footer>
    <bottom-tips ref="bTips"></bottom-tips>
  </div>
</template>

<script>
import api from '@/api/api'
import { mapState } from 'vuex'
import { Loadmore } from 'mint-ui'
import bottomTips from '@/components/bottom-tips/bottomTips'

export default {
  name: '',
  components: {
    'mt-loadmore': Loadmore,
    bottomTips
  },
  data: () => ({
    user_id: localStorage.user_id,
    get_share_info: {
      user_id: localStorage.user_id,
      limit: 10,
      page: 1
    },
    is_more: false,
    allLoaded: false, // 是否可以上拉属性，false 可以上拉，true 为禁止上拉
    bottomText: '上拉加载更多 . . .',
    intervalId: null
  }),
  computed: {
    ...mapState({
      cash_list: state => state.activity.cash_back_list.data,
      cash_count: state => state.activity.cash_back_list.count,
      cash_back: state => state.activity.cash_back
    })

  },
  methods: {
    toShare () {
      let url = window.location.href.includes('m.duoduocp.') ? 'https://m.duoduocp.cn/p/inviteApp/indexrule.html' : 'https://h5-client.wangzheka.cn/p/inviteApp/indexrule.html'
      try {
        window.webkit.messageHandlers.iosBannerIndex.postMessage(url)
      } catch (e) {
        window.top.location.href = url
      } finally {
        window.top.location.href = url
      }
    },
    backMy () {
      this.$router.go(-1)
    },
    getColor (type) {
      switch (type) {
        case 2:
          return 'gray3'
        case 1:
          return 'red'
        default:
          return 'gray3'
      }
    },
    getFee (fee_before, fee_now, fee) {
      if (fee_before > fee_now) {
        return '－' + (fee * 0.01).toFixed(2)
      } else if (fee_before < fee_now) {
        return '+' + (fee * 0.01).toFixed(2)
      } else {
        return (fee * 0.01).toFixed(2)
      }
    },
    getMoney (money) {
      return (money * 0.01).toFixed(2)
    },
    getTime (time, a, b) {
      return time.slice(a, b)
    },
    getType (type) {
      switch (type) {
        case 1:
          return '返佣'
        case 2:
          return '提现'
        default:
          return '未知'
      }
    },
    getCashBack () {
      if (this.cash_back.balance === 0) {
        this.$refs.bTips.bottompopTips('提现金额不足！')
      } else {
        api.getCashBack({'user_id': this.user_id, 'cash_money': this.cash_back.balance})
          .then(res => {
            if (res.errno === '0') {
              this.$refs.bTips.bottompopTips(res.errmsg)
              this.intervalId = setInterval(() => {
                this.$router.push('/my')
              }, 1000)
            } else {
              this.$refs.bTips.bottompopTips(res.errmsg)
            }
          }).catch(err => console.log(err))
      }
    },
    isMore () {
      if (this.cash_count <= 10 || this.cash_count === this.cash_list.length) {
        this.is_more = true
        this.allLoaded = true
      } else {
        this.is_more = false
      }
    },
    loadBottom () {
      if (this.cash_list.length < 10) {
        this.$refs.loadmore.onBottomLoaded()
        this.allLoaded = true
      } else {
        this.get_share_info.limit += 10
        setTimeout(() => {
          this.$store.dispatch('getShareList', this.get_share_info)
        }, 500)
      }
    }
  },
  watch: {
    cash_list: function () {
      this.$nextTick(() => {
        this.isMore()
      })
    }
  },
  created () {
    this.$store.dispatch('getShare', {'user_id': this.user_id})
    this.$store.dispatch('getShareList', this.get_share_info)
  },
  beforeDestroy () {
    if (this.intervalId) { // 如果定时器还在运行 或者直接关闭，不用判断
      clearInterval(this.intervalId) // 关闭
    }
  }
}
</script>

<style lang="scss" scoped>
.share-msg {
  // width: 32rem;
  // margin: 0 auto;
  height: 7rem;
  padding-top: 2rem;
}
</style>
