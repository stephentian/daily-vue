<template>
  <div id="jczqAnalysis">
    <header class="m-top g-top-login">
      <h2 class="m-top-title tac"><i class="iconfont icon-arrow-left mr10" @click="routerBack"></i><span>数据情报</span></h2>
    </header>
    <div class="header-top-space"></div>
    <section class="g-match-vs">
      <aside class="m-match-vs tac">
        <div class="pic"><img :src="history.home_flag_url"></div>
        <p class="mt10 tac">{{ history.home_team }}</p>
      </aside>
      <aside class="m-match-vs tac">
        <div>
          <h5>{{ sliceData(history.match_time, 5, 10) }}({{ sliceData(history.official_number, 0, 2) }}){{ sliceData(history.match_time, 11, 16) }}</h5>
          <h2 class="mt15">VS</h2>
        </div>
        <p class="mt10 tac">未开赛</p>
      </aside>
      <aside class="m-match-vs tac">
        <div class="pic"><img :src="history.away_flag_url"></div>
        <p class="mt10 tac">{{ history.away_team }}</p>
      </aside>
    </section>
    <section class="g-tab">
      <div class="m-tab">
        <a class="fx w33 tac" :class="{'active': curId === 0}" @click="curId = 0;">分析</a>
        <a class="pl w33 tac" :class="{'active': curId === 1}" @click="curId = 1;">赔率</a>
        <a class="jf w33 tac" :class="{'active': curId === 2}" @click="curId = 2;">积分</a>
      </div>
    </section>
    <jczq-history v-show="curId === 0"></jczq-history>
    <jczq-rate :match_date="match_date" :match_number="match_number" v-show="curId === 1"></jczq-rate>
    <jczq-point :match_date="match_date" :match_number="match_number" v-show="curId === 2"></jczq-point>
    <div class="footer-bottom-space"></div>
    <footer class="m-footer box-shadow">
      <div class="m-bottom-btn">
        <router-link tag="button" class="m-footer-btn bgColor" to="/jczq">立即投注</router-link>
      </div>
    </footer>
  </div>
</template>

<script>
import jczqHistory from './jczqHistory'
import jczqRate from './jczqRate'
import jczqPoint from './jczqPoint'
import { mapState } from 'vuex'

export default {
  name: 'jczqAnalysis',
  components: {
    jczqHistory,
    jczqRate,
    jczqPoint
  },
  data () {
    return {
      curId: 0, // 选项卡切换
      match_date: this.$route.query.match_date,
      match_number: this.$route.query.match_number,
      game_info: {
        game: 'FT',
        match_date: this.$route.query.match_date,
        match_number: this.$route.query.match_number
      }
    }
  },
  created () {
    this.$store.dispatch('getMatchHistory', this.game_info)
  },
  computed: {
    ...mapState({
      history: state => state.match.history_list
    })
  },
  methods: {
    routerBack () {
      // 返回上一级
      window.history.length > 2 ? this.$router.go(-1) : this.$router.push('/home')
    },
    sliceData (data = [], a, b) {
      return data.slice(a, b)
    }
  }
}
</script>

<style lang="css" scoped>
.g-match-vs {
  height: 9.8rem;
  background: #4d4d4d;
  display: -webkit-flex;
  display: -moz-flex;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  -webkit-justify-content: space-between;
  -moz-justify-content: space-between;
  justify-content: space-between;
  -webkit-align-items: center;
  -moz-align-items: center;
  align-items: center;
  position: relative;
}
.m-match-vs {
  width: 33.33%;
  height: 7.8rem;
  position: relative;
}
.m-match-vs p {
  font-size: 1.2rem;
  color: #fff;
}
.m-match-vs div {
  height: 5.2rem;
  margin: 0 auto;
}
.m-match-vs div.pic {
  width: 5.2rem;
  background: #fff;
}
.m-match-vs img {
  width: 100%;
  height: 100%;
}
.m-match-vs h2 {
  font-size: 1.6rem;
  font-weight: 500;
  color: #fff;
}
.m-match-vs h5 {
  font-size: 1rem;
  font-weight: 500;
  color: #ccc;
}
</style>
