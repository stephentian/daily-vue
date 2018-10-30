<template>
  <div id="spfJczq">
    <section class="g-bet-box">
      <div class="m-football-item" v-for="(item, index) in FT01Query" :key="index">
        <h3 class="m-title-h3 tar" @click="toggleArrow($event, item, index)"><span class="tal fl">{{ item[0] }} {{ item[1][0].match_date | toWeek }} {{ item[1].length }}场可投</span><i class="iconfont" :class="matchFlag[index] ? 'icon-arrow-horizontal-up' : 'icon-arrow-horizontal-down'"></i></h3>
        <ul class="m-football-lists" v-show="matchFlag[index]">
          <li class="m-football-list" v-for="(game, i) in item[1]" :key="i" :class="{'support-single': game.unsupport_single.indexOf('FT01') < 0}">
            <aside class="m-football-info">
              <div class="m-football-gameinfo tac" @click.stop="toggleMatchmore($event, game, i, index)">
                <span>{{ game.league }}</span>
                <span>{{ game.match_date | toWeek }} {{ game.match_index }}</span>
                <span>{{ game.end_time | toTime }}截止</span>
                <i class="iconfont" :class="matchmoreFlag[i] && selectedIndex === index ? 'icon-arrow-horizontal-up' : 'icon-arrow-horizontal-down'"></i>
              </div>
              <div class="m-football-teaminfo">
                <div class="m-football-teaminfo-table">
                  <p class="vs-con w33" :class="{selected: game.homeSelected === true}" @click="match_select(index, i, 0)">
                    <span class="gray3 tac">{{ game.home_team }}</span>
                    <span class="gray6 tac">主胜<em class="red">{{ game.rates['3'] | toRate }}</em></span>
                    <span v-show="game.rates['3'] < 1.6" class="icon-hot"></span>
                  </p>
                  <p class="vs-con w33" :class="{selected: game.drawSelected === true}" @click="match_select(index, i, 1)">
                    <span class="gray3 tac">VS</span>
                    <span class="gray6 tac">平<em class="green">{{ game.rates['1'] | toRate }}</em></span>
                    <span v-show="game.rates['1'] < 1.6" class="icon-hot"></span>
                  </p>
                  <p class="vs-con w33" :class="{selected: game.awaySelected === true}" @click="match_select(index, i, 2)">
                    <span class="gray3 tac">{{ game.away_team }}</span>
                    <span class="gray6 tac">客胜<em class="blue">{{ game.rates['0'] | toRate }}</em></span>
                    <span v-show="game.rates['0'] < 1.6" class="icon-hot"></span>
                  </p>
                </div>
              </div>
            </aside>
            <article class="m-football-tableinfo" v-show="matchmoreFlag[i] && selectedIndex === index">
              <router-link :to="{ path: '/jczqAnalysis', query: { match_date: game.match_date, match_number: game.match_number }}">
                <table cellpadding="0" cellspacing="0">
                  <tr class="tac">
                    <td>历史交锋</td>
                    <td colspan="3">近{{ game.match_history["home_away_history_count"] }}次交战，{{ game.home_team }} <em class="red">{{ game.match_history["home_away_history_desc"].substring(0, game.match_history["home_away_history_desc"].indexOf("胜") + 1) }}</em><em class="green">{{ game.match_history["home_away_history_desc"].substring(game.match_history["home_away_history_desc"].indexOf("胜") + 1, game.match_history["home_away_history_desc"].indexOf("平") + 1) }}</em><em class="blue">{{ game.match_history["home_away_history_desc"].substring(game.match_history["home_away_history_desc"].indexOf("平") + 1, game.match_history["home_away_history_desc"].indexOf("负") + 1) }}</em></td>
                  </tr>
                  <tr class="tac">
                    <td>近期战绩</td>
                    <td colspan="3">主队{{ game.match_history["home_history_desc"] }}，客队{{ game.match_history["away_history_desc"] }}</td>
                  </tr>
                  <tr class="tac">
                    <td>平均赔率</td>
                    <td v-for="(rate, rates) in game.match_history['wdl_rate_avg'].split(' ')" :key="rates">{{ (rate !== '') ? rate : '-' }}</td>
                  </tr>
                  <tr class="tac">
                    <td>平均概率</td>
                    <td v-for="(ratio, ratios) in game.match_history['wdl_ratio_avg'].split(' ')" :key="ratios">{{ (ratio !== '') ? ratio : '-' }}</td>
                  </tr>
                </table>
                <p class="m-title-h6 mt5 tac">查看详细数据情报 ></p>
              </router-link>
            </article>
          </li>
        </ul>
      </div>
    </section>
    <bottom-bet-ft @clear="init" :match="match" @submit="submit" :canSubmit="canSubmit" :isFTClicked="isFTClicked" @submitFail="submitFail"></bottom-bet-ft>
    <bottom-tips ref="bTips"></bottom-tips>
  </div>
</template>

<script>
import router from '@/router/index.js'
import store from '@/store/index.js'
import bottomBetFt from '@/components/bottom-bet/bottomBetFT'
import bottomTips from '@/components/bottom-tips/bottomTips'
import { mapState } from 'vuex'

export default {
  name: 'spfJczq',
  components: {
    bottomBetFt,
    bottomTips
  },
  data () {
    return {
      canSubmit: false, // 提交投注
      matchFlag: {},
      matchmoreFlag: {'0': true},
      selectedIndex: 0,
      count: 0,
      single_count: 0,
      total_money: 0,
      moneyFlag: true,
      lottery_id: 'FT01',
      isFTClicked: false
    }
  },
  props: ['eyeShow', 'countdown'],
  watch: {
    FT01Query: function () {
      this.init()
    }
  },
  created () {
    this.init() // 初始化
  },
  computed: {
    ...mapState({
      FT01Query: state => {
        if (state.jczq.FT01Query) {
          return state.jczq.FT01Query
        } else {
          return []
        }
      },
      jczq: state => state.jczq.jczq,
      match: state => state.jczq.match
    })
  },
  filters: {
    toWeek: function (strDate) {
      let week
      let date = new Date(strDate).getDay()
      switch (date) {
        case 0: week = '周日'
          break
        case 1: week = '周一'
          break
        case 2: week = '周二'
          break
        case 3: week = '周三'
          break
        case 4: week = '周四'
          break
        case 5: week = '周五'
          break
        case 6: week = '周六'
          break
      }
      return week
    },
    toTime: function (date) {
      let hours = new Date(date.replace(/-/g, '/')).getHours()
      let minutes = new Date(date.replace(/-/g, '/')).getMinutes()
      if (hours >= 0 && hours <= 9) {
        hours = '0' + hours
      }
      if (minutes >= 0 && minutes <= 9) {
        minutes = '0' + minutes
      }
      return hours + ':' + minutes
    },
    toRate: function (rate) {
      return ((rate * 100) * 0.01).toFixed(2)
    }
  },
  activated () {
    if (this.jczq.length >= 1) {
      this.$set(this, 'canSubmit', true)
    }
    this.check()
    this.isFTClicked = false
  },
  updated () {
    this.check()
  },
  methods: {
    check: function () {
      if (this.jczq.length >= 1) {
        this.$set(this, 'canSubmit', true)
        store.commit('FTmatch', this.jczq.length)
      } else {
        this.canSubmit = false
        store.commit('FTmatch', 0)
      }
    },
    toggleArrow (event, item, index) {
      if (this.matchFlag[index] !== undefined) {
        this.matchFlag[index] = !this.matchFlag[index]
      } else {
        this.$set(this.matchFlag, index, true)
      }
    },
    toggleMatchmore (event, item, i, index) {
      // 下拉展示
      if (this.matchmoreFlag[i] !== undefined) {
        this.matchmoreFlag[i] = !this.matchmoreFlag[i]
      } else {
        this.$set(this.matchmoreFlag, i, true)
      }
      this.selectedIndex = index
    },
    init: function () {
      this.count = 0
      this.total_money = 0

      let FT01Query = store.state.jczq.FT01Query
      for (let index = 0, len = FT01Query.length; index < len; index++) {
        this.$set(this.matchFlag, index, true)
        for (let i = 0, len = FT01Query[index][1].length; i < len; i++) {
          if (FT01Query[index][1][i].homeSelected === true) {
            store.commit('FT01matchSelect', {index: index, i: i, m: 0})
          }
          if (FT01Query[index][1][i].drawSelected === true) {
            store.commit('FT01matchSelect', {index: index, i: i, m: 1})
          }
          if (FT01Query[index][1][i].awaySelected === true) {
            store.commit('FT01matchSelect', {index: index, i: i, m: 2})
          }
        }
      }
      this.$store.state.jczq.jczq = []
      this.canSubmit = false
      store.commit('FTmatch', 0)
    },
    match_select: function (index, i, m) {
      store.commit('FT01matchSelect', {index: index, i: i, m: m})
      let FT01Query = store.state.jczq.FT01Query
      let removeObj = this.jczq.find(function (x) {
        return x.game === FT01Query[index][1][i].game && x.match_number === FT01Query[index][1][i].match_number
      })

      if (this.jczq.indexOf(removeObj) > -1) {
        this.jczq.splice(this.jczq.indexOf(removeObj), 1)
      }
      if (this.jczq.length < 8) {
        if (FT01Query[index][1][i].homeSelected === true || FT01Query[index][1][i].drawSelected === true || FT01Query[index][1][i].awaySelected === true) {
          store.commit('FTSelected', this.$store.state.jczq.FT01Query[index][1][i])
        }
      } else {
        store.commit('FT01matchSelect', {index: index, i: i, m: m})
        this.$refs.bTips.bottompopTips('至多投注8场比赛')
      }
      this.check()
    },
    combine (a, n, m, b, x) {
      for (let i = n; i >= m; i--) {
        b[m - 1] = i - 1
        if (m > 1) {
          this.combine(a, i - 1, m - 1, b, x)
        } else {
          let s = ''
          let zhu = 1
          for (let j = x - 1; j >= 0; j--) {
            s = s + a[b[j]] + ','
            zhu = zhu * a[b[j]]
          }
          this.single_count = this.single_count + zhu
        }
      }
      return this.single_count
    },
    submitFail () {
      this.$refs.bTips.bottompopTips('请至少选择两场比赛')
    },
    submit: function () {
      if (this.isFTClicked) {
        this.$refs.bTips.bottompopTips('正在加载中，请勿重复点击')
      } else {
        this.isFTClicked = true
        // 控制场次下限（有单字标识的，可只选一场。没有单字标识的至少选两场）
        let single_flag = this.jczq.map(function (x) {
          let f = x.unsupport_single.indexOf('FT01')
          return !((f >= 0))
        })
        let support_single_flag = single_flag.indexOf(true)
        if ((support_single_flag > -1) || (this.jczq.length >= 2)) {
          router.push({path: 'jczqcart', query: { lottery_id: 'FT01' }})
        } else if (this.jczq.length === 1) {
          this.$refs.bTips.bottompopTips('请至少选择2场比赛')
          this.isFTClicked = false
        }
      }
    }
  }
}
</script>
