<template lang="html">
  <div>
    <header class="m-top g-top-user box-shadow">
      <h2 class="m-top-title tal ml20">
        <i class="iconfont icon-arrow-left mr10" @click="back"></i>
        <span>提现记录</span>
      </h2>
    </header>
    <div class="header-top-space"></div>
    <section class="g-tab">
      <div class="m-tab">
        <a class="sj w33 tac" href="#">时间</a>
        <a class="lx w33 tac" href="#">类型</a>
        <a class="sl w33 tac" href="#">金额</a>
      </div>
    </section>
    <section class="g-record-lists">
      <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" :bottomPullText="bottomText" ref="loadmore">
        <aside class="m-record-list" v-for="(item, index) in cash_list" :key="index">
          <div class="tac">
            <h5 class="gray3">
              {{ getTime(item.req_time, 0, 10) }}
              <p>{{ getTime(item.req_time, 11, 19) }}</p>
            </h5>
          </div>
          <div class="tac">
            <h5 class="gray3">{{ getType(item.status) }}</h5>
          </div>
          <div class="tac">
            <h5 :class="getColor(item.status)">{{ getMoney(item.cash_money) }}</h5>
          </div>
        </aside>
      </mt-loadmore>
      <p style="text-align:center;padding: 10px 0;" v-show="is_more"><span >- - -记录没有啦- - - </span></p>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data: () => ({
    cash_info: {
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
      cash_list: state => state.user.cash_list,
      cash_count: state => state.user.cash_count
    })
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    getColor (status) {
      if (status === 1) {
        return 'red'
      } else {
        return 'gray3'
      }
    },
    getTime (time, a, b) {
      return time.slice(a, b)
    },
    getType (type) {
      switch (type) {
        case 0:
          return '待审核'
        case 1:
          return '成功'
        case 2:
          return '失败'
        case 3:
          return '已审核'
      }
    },
    getMoney (money) {
      return (money * 0.01).toFixed(2)
    },
    isMore () {
      // console.log(this.cash_count, this.cash_list.length)
      if (this.cash_count <= 10 || this.cash_count === this.cash_list.length) {
        this.is_more = true
        this.allLoaded = true
      } else {
        this.is_more = false
      }
    },
    loadBottom () {
      if (this.cash_count < 10) {
        this.$refs.loadmore.onBottomLoaded()
        this.allLoaded = true
      } else {
        this.cash_info.limit += 10
        if (this.cash_info.limit > 40) {
          // 调用加载完成事件
          this.$refs.loadmore.onBottomLoaded()
          this.allLoaded = true
        }
        setTimeout(() => {
          this.$store.dispatch('getCashList', this.cash_info)
        }, 1000)
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
    this.$store.dispatch('getCashList', this.cash_info)
  }
}
</script>

<style lang="css" scoped>
.g-record-lists .m-record-list{height:4.6rem;}
</style>
