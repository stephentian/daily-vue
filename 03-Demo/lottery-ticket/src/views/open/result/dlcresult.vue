<template lang="html">
  <div id="dlcresult">
    <header class="m-top g-top-open">
      <h2 class="m-top-title tac"><i class="iconfont icon-arrow-left mr10" @click="routerBack"></i><span>11选5开奖结果</span></h2>
    </header>
    <div class="header-top-space"></div>
    <!-- <section class="g-top-tips">
      <div class="m-top-tips">
        <p class="tac">10分钟一期，每天84期</p>
      </div>
    </section> -->
    <section class="g-open-lists" v-for="(item, index) in periodInfos" :key="index">
      <aside class="m-open-list" @click="toggleArrow($event, item, index)">
        <div class="m-open-list-info">
          <h3><span>第{{ item.lottery_period }}期 {{ item.official_stop_time | DateTime }}</span></h3>
          <div class="balls mt10">
            <em class="tac mr5 fl" :class="index === 0 ? 'red-ball' : 'red'" v-for="(ball, i) in item.redBalls" :key="i">{{ ball }}</em>
            <em class="tac mr5 fl blue-ball" v-for="(ball, i) in item.blueBalls" :key="i">{{ ball }}</em>
          </div>
        </div>
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
      <router-link tag="button" class="m-footer-btn bgColor" to="/dlc">去投注</router-link>
    </footer>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'dlcresult',
  data () {
    return {
      redBall: true,
      openFlag: {}
    }
  },
  created () {
    // console.log(this.$route, this.$route.matched[0].name, this.$route.name);
    this.$store.dispatch('getPeriodInfos', {name: 'dlc'})
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
