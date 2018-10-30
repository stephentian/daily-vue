<template>
  <div id="bfJczq">
    <section class="g-bet-box" v-for="(item, index) in FT03Query" :key="index">
      <div class="m-football-item">
        <h3 class="m-title-h3 tar" @click="toggleArrow($event, item, index)"><span class="tal fl">{{ item[0] }} {{ item[1].length }}场可投</span><i class="iconfont" :class="matchFlag[index] ? 'icon-arrow-horizontal-up' : 'icon-arrow-horizontal-down'"></i></h3>
        <ul class="m-football-lists" v-show="matchFlag[index]">
          <li class="m-football-list" v-for="(game, i) in item[1]" :key="i" :class="{'support-single': game.unsupport_single.indexOf('FT03') < 0}">
            <aside class="m-football-info">
              <div class="m-football-gameinfo tac" @click.stop="toggleMatchmore($event, game, i, index)">
                <span>{{ game.league }}</span>
                <span>{{ game.match_date | toWeek }} {{ game.match_index }}</span>
                <span>{{ game.end_time |toTime }}截止</span>
                <i class="iconfont" :class="matchmoreFlag[i] && selectedIndex === index ? 'icon-arrow-horizontal-up' : 'icon-arrow-horizontal-down'"></i>
              </div>
              <div class="m-football-teaminfo">
                <h5 class="tac mb5"><span>{{ game.home_team }}</span> VS <span>{{ game.away_team }}</span></h5>
                <button :class="{'selected' : game.gametext.indexOf('点击选择投注内容') < 0}" type="button" @click.stop="toggleCenterDialog($event, game, i, index)">{{ game.gametext.toString() }}</button>
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
                    <td colspan="3">主队{{ game.match_history["home_history_desc"]}}，客队{{ game.match_history["away_history_desc"] }}</td>
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
            <div class="popup-box g-tipsbox" v-show="centerDialogVisible[i] && selectedIndex === index">
              <div class="popup-wrap">
                <h3 class="m-football-score-tit mt10 tac"><span>{{ game.home_team }}</span> VS <span>{{ game.away_team }}</span></h3>
                <p class="m-football-score-tips tac">竞猜全场90分钟（含伤停补时）的比分</p>
                <div class="m-football-score-wrap">
                  <table class="m-football-score-win mt10" cellpadding="0" cellspacing="0">
                    <tr>
                      <td class="bg-red" rowspan="2">胜</td>
                      <td colspan="1" :class="{selected: game.scoreSelected['10'] === true}" @click="match_select(index, i, '10')"><span>1:0</span><em>{{ game.rates['10'].toFixed(2) }}</em></td>
                      <td colspan="1" :class="{selected: game.scoreSelected['20'] === true}" @click="match_select(index, i, '20')"><span>2:0</span><em>{{ game.rates['20'].toFixed(2) }}</em></td>
                      <td colspan="1" :class="{selected: game.scoreSelected['21'] === true}" @click="match_select(index, i, '21')"><span>2:1</span><em>{{ game.rates['21'].toFixed(2) }}</em></td>
                      <td colspan="1" :class="{selected: game.scoreSelected['30'] === true}" @click="match_select(index, i, '30')"><span>3:0</span><em>{{ game.rates['30'].toFixed(2) }}</em></td>
                      <td colspan="1" :class="{selected: game.scoreSelected['31'] === true}" @click="match_select(index, i, '31')"><span>3:1</span><em>{{ game.rates['31'].toFixed(2) }}</em></td>
                      <td colspan="1" :class="{selected: game.scoreSelected['32'] === true}" @click="match_select(index, i, '32')"><span>3:2</span><em>{{ game.rates['32'].toFixed(2) }}</em></td>
                      <td colspan="1" :class="{selected: game.scoreSelected['40'] === true}" @click="match_select(index, i, '40')"><span>4:0</span><em>{{ game.rates['40'].toFixed(2) }}</em></td>
                    </tr>
                    <tr>
                      <td colspan="1" :class="{selected: game.scoreSelected['41'] === true}" @click="match_select(index, i, '41')"><span>4:1</span><em>{{ game.rates['41'].toFixed(2) }}</em></td>
                      <td colspan="1" :class="{selected: game.scoreSelected['42'] === true}" @click="match_select(index, i, '42')"><span>4:2</span><em>{{ game.rates['42'].toFixed(2) }}</em></td>
                      <td colspan="1" :class="{selected: game.scoreSelected['50'] === true}" @click="match_select(index, i, '50')"><span>5:0</span><em>{{ game.rates['50'].toFixed(2) }}</em></td>
                      <td colspan="1" :class="{selected: game.scoreSelected['51'] === true}" @click="match_select(index, i, '51')"><span>5:1</span><em>{{ game.rates['51'].toFixed(2) }}</em></td>
                      <td colspan="1" :class="{selected: game.scoreSelected['52'] === true}" @click="match_select(index, i, '52')"><span>5:2</span><em>{{ game.rates['52'].toFixed(2) }}</em></td>
                      <td colspan="2" :class="{selected: game.scoreSelected['90'] === true}" @click="match_select(index, i, '90')"><span>胜其他</span><em>{{ game.rates['90'].toFixed(2) }}</em></td>
                    </tr>
                  </table>
                  <table class="m-football-score-draw mt10">
                    <tr>
                      <td class="bg-green">平</td>
                      <td colspan="1" :class="{selected: game.scoreSelected['00'] === true}" @click="match_select(index, i, '00')"><span>0:0</span><em>{{ game.rates['00'].toFixed(2) }}</em></td>
                      <td colspan="1" :class="{selected: game.scoreSelected['11'] === true}" @click="match_select(index, i, '11')"><span>1:1</span><em>{{ game.rates['11'].toFixed(2) }}</em></td>
                      <td colspan="1" :class="{selected: game.scoreSelected['22'] === true}" @click="match_select(index, i, '22')"><span>2:2</span><em>{{ game.rates['22'].toFixed(2) }}</em></td>
                      <td colspan="1" :class="{selected: game.scoreSelected['33'] === true}" @click="match_select(index, i, '33')"><span>3:3</span><em>{{ game.rates['33'].toFixed(2) }}</em></td>
                      <td colspan="3" :class="{selected: game.scoreSelected['99'] === true}" @click="match_select(index, i, '99')"><span>平其他</span><em>{{ game.rates['99'].toFixed(2) }}</em></td>
                    </tr>
                  </table>
                  <table class="m-football-score-lost mt10">
                    <tr>
                      <td class="bg-blue" rowspan="2">负</td>
                      <td colspan="1" :class="{selected: game.scoreSelected['01'] === true}" @click="match_select(index, i, '01')"><span>0:1</span><em>{{ game.rates['01'].toFixed(2) }}</em></td>
                      <td colspan="1" :class="{selected: game.scoreSelected['02'] === true}" @click="match_select(index, i, '02')"><span>0:2</span><em>{{ game.rates['02'].toFixed(2) }}</em></td>
                      <td colspan="1" :class="{selected: game.scoreSelected['12'] === true}" @click="match_select(index, i, '12')"><span>1:2</span><em>{{ game.rates['12'].toFixed(2) }}</em></td>
                      <td colspan="1" :class="{selected: game.scoreSelected['03'] === true}" @click="match_select(index, i, '03')"><span>0:3</span><em>{{ game.rates['03'].toFixed(2) }}</em></td>
                      <td colspan="1" :class="{selected: game.scoreSelected['13'] === true}" @click="match_select(index, i, '13')"><span>1:3</span><em>{{ game.rates['13'].toFixed(2) }}</em></td>
                      <td colspan="1" :class="{selected: game.scoreSelected['23'] === true}" @click="match_select(index, i, '23')"><span>2:3</span><em>{{ game.rates['23'].toFixed(2) }}</em></td>
                      <td colspan="1" :class="{selected: game.scoreSelected['04'] === true}" @click="match_select(index, i, '04')"><span>0:4</span><em>{{ game.rates['04'].toFixed(2) }}</em></td>
                    </tr>
                    <tr>
                      <td colspan="1" :class="{selected: game.scoreSelected['14'] === true}" @click="match_select(index, i, '14')"><span>1:4</span><em>{{ game.rates['14'].toFixed(2) }}</em></td>
                      <td colspan="1" :class="{selected: game.scoreSelected['24'] === true}" @click="match_select(index, i, '24')"><span>2:4</span><em>{{ game.rates['24'].toFixed(2) }}</em></td>
                      <td colspan="1" :class="{selected: game.scoreSelected['05'] === true}" @click="match_select(index, i, '05')"><span>0:5</span><em>{{ game.rates['05'].toFixed(2) }}</em></td>
                      <td colspan="1" :class="{selected: game.scoreSelected['15'] === true}" @click="match_select(index, i, '15')"><span>1:5</span><em>{{ game.rates['15'].toFixed(2) }}</em></td>
                      <td colspan="1" :class="{selected: game.scoreSelected['25'] === true}" @click="match_select(index, i, '25')"><span>2:5</span><em>{{ game.rates['25'].toFixed(2) }}</em></td>
                      <td colspan="2" :class="{selected: game.scoreSelected['09'] === true}" @click="match_select(index, i, '09')"><span>负其他</span><em>{{ game.rates['09'].toFixed(2) }}</em></td>
                    </tr>
                  </table>
                </div>
                <div class="m-football-score-btn">
                  <button class="m-football-score-white" @click="cancleScore(index, i)">取消</button><!-- todo -->
                  <button class="m-football-score-red" @click="sureScore(index, i)">确定</button><!-- todo -->
                </div>
              </div>
            </div>
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
  name: 'bfJczq',
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
      centerDialogVisible: {},
      isFTClicked: false
    }
  },
  props: ['eyeShow', 'countdown'],
  watch: {
    FT03Query: function () {
      this.init()
    }
  },
  created () {
    this.init() // 初始化
  },
  computed: {
    ...mapState({
      FT03Query: state => {
        if (state.jczq.FT03Query) {
          return state.jczq.FT03Query
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
      if (this.matchmoreFlag[i] !== undefined) {
        this.matchmoreFlag[i] = !this.matchmoreFlag[i]
      } else {
        this.$set(this.matchmoreFlag, i, true)
      }
      this.selectedIndex = index
    },
    toggleCenterDialog (event, item, i, index) {
      if (this.centerDialogVisible[i] !== undefined) {
        this.centerDialogVisible[i] = !this.centerDialogVisible[i]
      } else {
        this.$set(this.centerDialogVisible, i, true)
      }
      this.selectedIndex = index
    },
    init: function () {
      // 初始化
      let FT03Query = store.state.jczq.FT03Query
      for (let index = 0, len = FT03Query.length; index < len; index++) {
        this.$set(this.matchFlag, index, true)
        for (let i = 0, len = FT03Query[index][1].length; i < len; i++) {
          let scoreSelected = {'10': false, '11': false, '12': false, '13': false, '14': false, '15': false, '20': false, '21': false, '22': false, '23': false, '24': false, '25': false, '30': false, '31': false, '32': false, '33': false, '40': false, '41': false, '42': false, '50': false, '51': false, '52': false, '90': false, '99': false, '00': false, '01': false, '02': false, '03': false, '04': false, '05': false, '09': false}
          store.commit('FT03InitScore', {index: index, i: i, scoreSelected: scoreSelected})
          store.commit('FT03GameText', {index: index, i: i, gametext: ['点击选择投注内容']})
        }
      }

      this.$store.state.jczq.jczq = []
      this.canSubmit = false
      store.commit('FTmatch', 0)
    },
    match_select: function (index, i, m) {
      store.commit('FT03matchSelect', {index: index, i: i, m: m})
      let FT03Query = store.state.jczq.FT03Query
      let removeObj = this.jczq.find(function (x) {
        return x.game === FT03Query[index][1][i].game && x.match_number === FT03Query[index][1][i].match_number
      })
      if (this.jczq.indexOf(removeObj) > -1) {
        this.jczq.splice(this.jczq.indexOf(removeObj), 1)
      }
      if (this.jczq.length < 4) {
        let scoreSelected = Object.values(FT03Query[index][1][i].scoreSelected)
        if (scoreSelected.indexOf(true) > -1) {
          store.commit('FTSelected', this.$store.state.jczq.FT03Query[index][1][i])
        }
      } else {
        store.commit('FT03matchSelect', {index: index, i: i, m: m})
        this.$refs.bTips.bottompopTips('至多投注4场比赛')
      }
      this.check()
    },
    sureScore (index, i) {
      this.centerDialogVisible[i] = false

      let scoreSelected = this.FT03Query[index][1][i].scoreSelected
      let scores = Object.keys(scoreSelected).filter(function (i, idx) {
        return scoreSelected[i] === true
      })
      let gametext = []
      scores.forEach(s => {
        if (s === '90') {
          gametext.push('胜其他')
        } else if (s === '99') {
          gametext.push('平其他')
        } else if (s === '09') {
          gametext.push('负其他')
        } else {
          gametext.push(s[0] + ':' + s[1])
        }
      })
      store.commit('FT03GameText', {index: index, i: i, gametext: gametext})
    },
    cancleScore (index, i) {
      this.centerDialogVisible[i] = false
      let gametext = (this.FT03Query[index][1][i].gametext[0] === '点击选择投注内容') ? [] : this.FT03Query[index][1][i].gametext
      let selected = []
      gametext.forEach(s => {
        selected.push(s[0] + s[2])
      })

      let scoreSelected = {'10': false, '11': false, '12': false, '13': false, '14': false, '15': false, '20': false, '21': false, '22': false, '23': false, '24': false, '25': false, '30': false, '31': false, '32': false, '33': false, '40': false, '41': false, '42': false, '50': false, '51': false, '52': false, '90': false, '99': false, '00': false, '01': false, '02': false, '03': false, '04': false, '05': false, '09': false}
      selected.forEach(s => {
        switch (s) {
          case '平他':
            scoreSelected['99'] = true
            break
          case '胜他':
            scoreSelected['90'] = true
            break
          case '负他':
            scoreSelected['09'] = true
            break
          default:
            scoreSelected[s] = true
            break
        }
      })
      store.commit('FT03InitScore', {index: index, i: i, scoreSelected: scoreSelected})
      // 删除已加入到jczq中的对象
      let FT03Query = store.state.jczq.FT03Query
      let statuschangeObj = this.jczq.find(function (x) {
        return x.game === FT03Query[index][1][i].game && x.match_number === FT03Query[index][1][i].match_number
      })
      if (this.jczq.indexOf(statuschangeObj) > -1) {
        store.commit('jczq_update', {x: this.jczq.indexOf(statuschangeObj), scoreSelected: scoreSelected})
        let jczq_obj_index = this.jczq.indexOf(statuschangeObj)
        let _scoreSelected = this.jczq[jczq_obj_index].scoreSelected
        let scores = []
        for (let key in _scoreSelected) {
          scores.push(_scoreSelected[key])
        }
        if (Object.values(this.jczq[jczq_obj_index].scoreSelected).indexOf(true) === -1) {
          this.jczq.splice(jczq_obj_index, 1)
        }
      }
    },
    submitFail () {
      this.$refs.bTips.bottompopTips('请至少选择1场比赛')
    },
    submit: function () {
      if (this.isFTClicked) {
        this.$refs.bTips.bottompopTips('正在加载中，请勿重复点击')
      } else {
        this.isFTClicked = true
        // 控制场次下限（有单字标识的，可只选一场。没有单字标识的至少选两场）
        let single_flag = this.jczq.map(function (x) {
          let f = x.unsupport_single.indexOf('FT03')
          return !((f >= 0))
        })
        let support_single_flag = single_flag.indexOf(true)
        if ((support_single_flag > -1) || (this.jczq.length >= 2)) {
          router.push({path: 'jczqcart', query: { lottery_id: 'FT03' }})
        } else if (this.jczq.length === 1) {
          this.$refs.bTips.bottompopTips('请至少选择2场比赛')
          this.isFTClicked = false
        }
      }
    }
  }
}
</script>

<style lang="css" scoped>
.popup-wrap{
  width: 96%;
}
.m-football-score-wrap tr td:nth-child(1){
  width: 2rem;
}
.m-football-score-tit{border-bottom: 1px solid #fff;}
</style>
