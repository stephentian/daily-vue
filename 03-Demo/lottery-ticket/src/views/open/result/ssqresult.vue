<template lang="html">
  <div id="ssqresult">
    <header class="m-top g-top-open">
      <h2 class="m-top-title tac"><i class="iconfont icon-arrow-left mr10" @click="routerBack"></i><span>双色球历史开奖</span></h2>
    </header>
    <div class="header-top-space"></div>
    <!-- <section class="g-top-tips">
      <div class="m-top-tips">
        <p class="tac">每周二、四、日 21:15开奖</p>
      </div>
    </section> -->
    <section class="g-open-lists" v-for="(item, index) in periodInfos" :key="index">
      <aside class="m-open-list" @click="jumpAward(item.lottery_period, item.official_stop_time.split(' ')[0], item.redBalls, item.blueBalls)">
        <div class="m-open-list-info">
          <h3><span>第{{ item.lottery_period }}期 {{ item.official_stop_time.split(' ')[0]}}</span></h3>
          <div class="balls mt5">
            <em class="tac mr5 fl" :class="index === 0?'red-ball':'red'" v-for="(ball, i) in item.redBalls" :key="i + '0'">{{ ball }}</em>
            <em class="tac mr5 fl ml5" :class="index === 0?'blue-ball':'blue'" v-for="(ball, i) in item.blueBalls" :key="i">{{ ball }}</em>
            <!-- <em class="tac mr5 fl" :class="[redBall ? 'red-ball' : 'blue-ball']" v-for="(item, index) in Balls(item.lottery_alias,item.bonus_code,index)" :index="index">{{ item }}</em> -->
          </div>
        </div>
        <i class="iconfont horizontal icon-arrow-right" ></i>
      </aside>
      <!-- <article class="g-lottery-open" v-show="openFlag[index]">
        <div class="m-lottery-money">
          <p class="w50 tac"><span>本期销量（元）</span><span class="red">{{ item.sales_money }}</span></p>
          <p class="w50 tac"><span>奖池奖金（元）</span><span class="red">{{ item.bonus_money }}</span></p>
        </div> -->
        <!-- <table class="m-bet-rule">
          <thead>
            <tr class="tac">
              <th>奖项</th>
              <th>中奖注数</th>
              <th>每注奖金（元）</th>
            </tr>
          </thead>
          <tbody>
            <tr class="tac">
              <td>一等奖</td>
              <td>18</td>
              <td class="red">6,272,562</td>
            </tr>
            <tr class="tac">
              <td>二等奖</td>
              <td>274</td>
              <td class="red">104,498</td>
            </tr>
            <tr class="tac">
              <td>三等奖</td>
              <td>2210</td>
              <td class="red">3,000</td>
            </tr>
            <tr class="tac">
              <td>四等奖</td>
              <td>102446</td>
              <td class="red">200</td>
            </tr>
            <tr class="tac">
              <td>五等奖</td>
              <td>1843078</td>
              <td class="red">10</td>
            </tr>
            <tr class="tac">
              <td>六等奖</td>
              <td>9046257</td>
              <td class="red">5</td>
            </tr>
            </tbody>
        </table> -->
      <!-- </article> -->
    </section>
    <div class="footer-bottom-space"></div>
    <footer class="m-footer">
      <router-link tag="button" class="m-footer-btn bgColor" to="/ssq">去投注</router-link>
    </footer>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ssqresult',
  data () {
    return {
      redBall: true,
      // DropdownShow: false,  //下拉展示
      // arrowShow: true,    //箭头切换
      openFlag: {}
    }
  },
  created () {
    // console.log(this.$route, this.$route.matched[0].name, this.$route.name);
    this.$store.dispatch('getPeriodInfos', {name: 'ssq'})
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
      // this.arrowShow = !this.arrowShow;
      // this.DropdownShow = !this.DropdownShow;
      if (this.openFlag[index] !== undefined) {
        this.openFlag[index] = !this.openFlag[index]
      } else {
        // this.openFlag[index] = true;
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
      this.$router.push({path: '/award/index', query: {'name': 'ssq', 'lottery': lottery, 'time': time, 'redBall': [redBall], 'blueBall': [blueBall]}})
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
