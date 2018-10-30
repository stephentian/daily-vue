<template lang="html">
  <div>
    <header class="m-top g-top-user box-shadow">
      <h2 class="m-top-title tal ml20"><i class="iconfont icon-arrow-left mr10" @click="backMy"></i><span>追号管理</span></h2>
    </header>
    <div class="header-top-space"></div>
    <section class="g-tab">
      <div class="m-tab">
        <router-link  class="jxz tac" :to="{ name: 'betting'}">进行中</router-link>
        <a class="ywj tac active" href="javascript:;">已完结</a>
      </div>
    </section>
    <section class="g-betchase-lists" style="overflow:scroll">
      <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" :bottomPullText="bottomText" ref="loadmore">
        <router-link tag="aside" class="m-betchase-list" v-for="(order, index) in order_list" :key="index"
         :to="{ path: '/' + order.lottery_alias + 'More', query: { order_id: order.order_id, follow_num: order.follow_num, follow_remain_num: order.follow_remain_num, follow_status: 2 }}">
          <div class="tal">
            <h5 class="gray3">{{ getName(order.lottery_alias) }}</h5>
            <p class="gray9 mt5">{{ getTime(order.order_date) }}</p>
          </div>
          <div class="tar">
            <h5 class="red">投注{{ getMoney(order.total_money) }}元</h5>
            <p class="gray9 mt5">{{ order.follow_num - order.follow_remain_num }} / {{ order.follow_num }}期</p>
          </div>
          <i class="iconfont icon-arrow-right"></i>
        </router-link>
      </mt-loadmore>
      <p style="text-align:center;padding: 10px 0;" v-show="is_more"><span >- - -记录太少，快去投注吧- - - </span></p>
    </section>
    <div class="footer-bottom-space" style="margin-bottom: 10rem"></div>
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
    chase_order_info: {
      user_id: localStorage.user_id,
      limit: 10,
      page: 1,
      follow_status: 2 // 0：已停止，1：正常追号，2：已完成
    },
    is_more: false,
    allLoaded: false, // 是否可以上拉属性，false 可以上拉，true 为禁止上拉
    bottomText: '上拉加载更多 . . .'
  }),
  computed: {
    ...mapState({
      order_list: state => state.user.order_list,
      order_count: state => state.user.order_count
    })
  },
  methods: {
    backMy () {
      this.$router.push('/my')
    },
    getTime (time) {
      return time.slice(0, 10)
    },
    getMoney (money) {
      return money * 0.01
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
    getStatus (bonus) {
      if (bonus === 0) {
        return '未中奖'
      } else {
        return '中奖' + bonus + '元'
      }
    },
    isMore () {
      if (this.order_count <= 10 || this.order_count === this.order_list.length) {
        this.allLoaded = true
        this.is_more = true
      } else {
        this.is_more = false
      }
    },
    loadBottom () {
      if (this.order_count < 10) {
        this.$refs.loadmore.onBottomLoaded()
        this.allLoaded = true
      } else {
        this.chase_order_info.limit += 10
        if (this.chase_order_info.limit > 40) {
          // 调用加载完成事件
          this.$refs.loadmore.onBottomLoaded()
          this.allLoaded = true
        }
        setTimeout(() => {
          this.$store.dispatch('chaseOrder', this.chase_order_info)
        }, 1000)
      }
    }
  },
  watch: {
    order_list: function () {
      this.$nextTick(() => {
        this.isMore()
      })
    }
  },
  created () {
    // do something after creating vue instance
    this.$store.dispatch('chaseOrder', this.chase_order_info)
  }
}
</script>
