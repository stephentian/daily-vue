<template lang="html">
  <div id="dltresult">
    <header class="m-top g-top-open">
      <h2 class="m-top-title tac"><i class="iconfont icon-arrow-left mr10" @click="routerBack"></i><span>大乐透历史开奖</span></h2>
    </header>
    <div class="header-top-space"></div>
    <section class="g-open-lists" v-for="(item, index) in periodInfos" :key="index">
      <aside class="m-open-list" @click="jumpAward(item.lottery_period, item.official_stop_time.split(' ')[0], item.redBalls, item.blueBalls)">
        <div class="m-open-list-info">
          <h3><span>第{{ item.lottery_period }}期 {{ item.official_stop_time | DateTime }}</span></h3>
          <div class="balls mt5">
            <em class="tac mr5 fl" :class="index === 0?'red-ball':'red'" v-for="(ball, i) in item.redBalls" :key="i">{{ ball }}</em>
            <em class="tac mr5 fl" :class="index === 0?'blue-ball':'blue'" v-for="(ball, i) in item.blueBalls" :key="i">{{ ball }}</em>
          </div>
        </div>
        <i class="iconfont horizontal icon-arrow-right" ></i>
        <!-- <i class="iconfont horizontal" :class="openFlag[index] ? ' icon-arrow-horizontal-up' : 'icon-arrow-horizontal-down'"></i> -->
      </aside>
      <!-- <article class="g-lottery-open" v-show="openFlag[index]">
        <div class="m-lottery-money">
          <p class="w50 tac"><span>本期销量（元）</span><span class="red">{{ item.sales_money }}</span></p>
          <p class="w50 tac"><span>奖池奖金（元）</span><span class="red">{{ item.bonus_money }}</span></p>
        </div>
      </article> -->
    </section>
    <div class="footer-bottom-space"></div>
    <footer class="m-footer">
      <router-link tag="button" class="m-footer-btn bgColor" to="/dlt">去投注</router-link>
    </footer>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'dltresult',
  data () {
    return {
      redBall: true,
      openFlag: {}
    }
  },
  created () {
    this.$store.dispatch('getPeriodInfos', {name: 'dlt'})
  },
  computed: {
    ...mapState({
      periodInfos: state => state.period_info.periodInfos
    })
  },
  filters: {
    DateTime (strDate) {
      let date = new Date(strDate.replace(/-/g, '/'))
      let y = date.getFullYear()
      let m = date.getMonth() + 1
      m = m < 10 ? '0' + m : m
      let d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      return y + '-' + m + '-' + d
    }
  },
  mounted () {},
  methods: {
    routerBack () {
      // 返回上一级
      window.history.length > 2 ? this.$router.go(-1) : this.$router.push('/open')
    },
    toggleArrow (event, item, index) {
      // 下拉展示
      if (this.openFlag[index] !== undefined) {
        this.openFlag[index] = !this.openFlag[index]
      } else {
        this.$set(this.openFlag, index, true)
      }
      // console.log('openFlag', index, this.openFlag)
    },
    DateTime (strDate) {
      let date = new Date(strDate)
      let y = date.getFullYear()
      let m = date.getMonth() + 1
      m = m < 10 ? '0' + m : m
      let d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      return y + '-' + m + '-' + d
    },
    jumpAward (lottery, time, redBall, blueBall) {
      this.$router.push({path: '/award/index', query: {'name': 'dlt', 'lottery': lottery, 'time': time, 'redBall': [redBall], 'blueBall': [blueBall]}})
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
</style>
