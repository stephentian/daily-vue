<template>
  <div id="hhggJczq">
    <section class="g-bet-box" v-for="(item, index) in FT09Query" :key="index">
      <div class="m-football-item">
        <h3 class="m-title-h3 tar" @click="toggleArrow($event, item, index)"><span class="tal fl">{{ item[0] }} {{ item[1].length }}场可投</span><i class="iconfont" :class="matchFlag[index] ? 'icon-arrow-horizontal-up' : 'icon-arrow-horizontal-down'"></i></h3>
        <ul class="m-football-lists" v-show="matchFlag[index]">
          <li class="m-football-list" v-for="(game, i) in item[1]" :key="i">
            <aside class="m-football-info">
              <div class="m-football-gameinfo tac" @click.stop="toggleMatchmore($event, game, i, index)">
                <span>{{ game.league }}</span>
                <span>{{ game.match_date | toWeek }} {{ game.match_index }}</span>
                <span>{{ game.end_time |toTime }}截止</span>
                <i class="iconfont" :class="matchmoreFlag[i] && selectedIndex === index ? 'icon-arrow-horizontal-up' : 'icon-arrow-horizontal-down'"></i>
              </div>
              <div class="m-football-teaminfo">
                <h5 class="tac"><span>{{ game.home_team }}</span> VS <span>{{ game.away_team }}</span></h5>
                <table cellpadding="0" cellspacing="0">
                  <tr class="tac">
                    <td class="bg-orange"><span>0</span></td>
                    <td :class="{selected: game.scoreSelected.FT01['3'] === true}" @click="match_select(index, i, 'FT01', '3')"><span>主胜 <em class="red">{{ game.rates.FT01['3'] }}</em></span></td>
                    <td :class="{selected: game.scoreSelected.FT01['1'] === true}" @click="match_select(index, i, 'FT01', '1')"><span>平 <em class="green">{{ game.rates.FT01['1'] }}</em></span></td>
                    <td :class="{selected: game.scoreSelected.FT01['0'] === true}" @click="match_select(index, i, 'FT01', '0')"><span>客胜 <em class="blue">{{ game.rates.FT01['0'] }}</em></span></td>
                    <td rowspan="2"  style="width:4rem" :style="{background:game.gametext.toString()!='展开全部'?'linear-gradient(90deg,rgba(255,113,73,1),rgba(241,44,44,1))':'#fff'}"><span :style="{color:game.gametext.toString()!='展开全部'?'#fff':'#666'}" @click.stop="toggleCenterDialog($event, game, i, index)">{{ game.gametext.toString() }}</span></td><!-- todo -->
                  </tr>
                  <tr class="tac">
                    <td :class="{'bg-red': game.ft_let_point_multi >= 1, 'bg-orange': game.ft_let_point_multi === 0, 'bg-green': game.ft_let_point_multi <= -1}"><span>{{ game.ft_let_point_multi > 0 ? ('+' + game.ft_let_point_multi) : game.ft_let_point_multi }}</span></td>
                    <td :class="{selected: game.scoreSelected.FT02['3'] === true}" @click="match_select(index, i, 'FT02', '3')"><span>主胜 <em class="red">{{ game.rates.FT02['3'] }}</em></span></td>
                    <td :class="{selected: game.scoreSelected.FT02['1'] === true}" @click="match_select(index, i, 'FT02', '1')"><span>平 <em class="green">{{ game.rates.FT02['1'] }}</em></span></td>
                    <td :class="{selected: game.scoreSelected.FT02['0'] === true}" @click="match_select(index, i, 'FT02', '0')"><span>客胜 <em class="blue">{{ game.rates.FT02['0'] }}</em></span></td>
                  </tr>
                </table>
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
                    <td colspan="3">主队{{ game.match_history["home_history_desc"]}}，客队{{ game.match_history["away_history_desc"]}}</td>
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
                <div class="m-football-score-wrap"><!-- todo -->
                  <table class="m-football-ballroll-table mt10" cellpadding="0" cellspacing="0">
                    <tr class="tac">
                      <td class="m-football-table-tit bg-orange">0</td>
                      <td :class="{selected: game.scoreSelected.FT01['3'] === true}" @click="match_select(index, i, 'FT01', '3')"><span>主胜 <em class="red"> {{ game.rates.FT01['3'] }}</em></span></td>
                      <td :class="{selected: game.scoreSelected.FT01['1'] === true}" @click="match_select(index, i, 'FT01', '1')"><span>平 <em class="green">{{ game.rates.FT01['1'] }}</em></span></td>
                      <td :class="{selected: game.scoreSelected.FT01['0'] === true}" @click="match_select(index, i, 'FT01', '0')"><span>客胜 <em class="blue">{{ game.rates.FT01['0'] }}</em></span></td>
                    </tr>
                    <tr class="tac">
                      <td :class="{'bg-red': game.ft_let_point_multi >= 1, 'bg-orange': game.ft_let_point_multi === 0, 'bg-green': game.ft_let_point_multi <= -1}">{{ game.ft_let_point_multi > 0 ? ('+' + game.ft_let_point_multi) : game.ft_let_point_multi }}</td>
                      <td :class="{selected: game.scoreSelected.FT02['3'] === true}" @click="match_select(index, i, 'FT02', '3')"><span>主胜 <em class="red">{{ game.rates.FT02['3'] }}</em></span></td>
                      <td :class="{selected: game.scoreSelected.FT02['1'] === true}" @click="match_select(index, i, 'FT02', '1')"><span>平 <em class="green">{{ game.rates.FT02['1'] }}</em></span></td>
                      <td :class="{selected: game.scoreSelected.FT02['0'] === true}" @click="match_select(index, i, 'FT02', '0')"><span>客胜 <em class="blue">{{ game.rates.FT02['0'] }}</em></span></td>
                    </tr>
                  </table>
                  <table class="m-football-score-table mt10" cellpadding="0" cellspacing="0">
                    <tr>
                      <td class="m-football-table-tit bg-orange" rowspan="6">比分</td>
                      <td colspan="1" :class="{selected: game.scoreSelected.FT03['10'] === true}" @click="match_select(index, i, 'FT03', '10')"><span>1:0</span><em>{{ game.rates.FT03['10'].toFixed(2) }}</em></td>
                      <td colspan="1" :class="{selected: game.scoreSelected.FT03['20'] === true}" @click="match_select(index, i, 'FT03', '20')"><span>2:0</span><em>{{ game.rates.FT03['20'].toFixed(2) }}</em></td>
                      <td colspan="1" :class="{selected: game.scoreSelected.FT03['21'] === true}" @click="match_select(index, i, 'FT03', '21')"><span>2:1</span><em>{{ game.rates.FT03['21'].toFixed(2) }}</em></td>
                      <td colspan="1" :class="{selected: game.scoreSelected.FT03['30'] === true}" @click="match_select(index, i, 'FT03', '30')"><span>3:0</span><em>{{ game.rates.FT03['30'].toFixed(2) }}</em></td>
                      <td colspan="1" :class="{selected: game.scoreSelected.FT03['31'] === true}" @click="match_select(index, i, 'FT03', '31')"><span>3:1</span><em>{{ game.rates.FT03['31'].toFixed(2) }}</em></td>
                      <td colspan="1" :class="{selected: game.scoreSelected.FT03['32'] === true}" @click="match_select(index, i, 'FT03', '32')"><span>3:2</span><em>{{ game.rates.FT03['32'].toFixed(2) }}</em></td>
                      <td colspan="1" :class="{selected: game.scoreSelected.FT03['40'] === true}" @click="match_select(index, i, 'FT03', '40')"><span>4:0</span><em>{{ game.rates.FT03['40'].toFixed(2) }}</em></td>
                    </tr>
                    <tr>
                      <td colspan="1" :class="{selected: game.scoreSelected.FT03['41'] === true}" @click="match_select(index, i, 'FT03', '41')"><span>4:1</span><em>{{ game.rates.FT03['41'].toFixed(2) }}</em></td>
                      <td colspan="1" :class="{selected: game.scoreSelected.FT03['42'] === true}" @click="match_select(index, i, 'FT03', '42')"><span>4:2</span><em>{{ game.rates.FT03['42'].toFixed(2) }}</em></td>
                      <td colspan="1" :class="{selected: game.scoreSelected.FT03['50'] === true}" @click="match_select(index, i, 'FT03', '50')"><span>5:0</span><em>{{ game.rates.FT03['50'].toFixed(2) }}</em></td>
                      <td colspan="1" :class="{selected: game.scoreSelected.FT03['51'] === true}" @click="match_select(index, i, 'FT03', '51')"><span>5:1</span><em>{{ game.rates.FT03['51'].toFixed(2) }}</em></td>
                      <td colspan="1" :class="{selected: game.scoreSelected.FT03['52'] === true}" @click="match_select(index, i, 'FT03', '52')"><span>5:2</span><em>{{ game.rates.FT03['52'].toFixed(2) }}</em></td>
                      <td colspan="2" :class="{selected: game.scoreSelected.FT03['90'] === true}" @click="match_select(index, i, 'FT03', '90')"><span>胜其他</span><em>{{ game.rates.FT03['90'].toFixed(2) }}</em></td>
                    </tr>
                    <tr>
                      <td colspan="1" :class="{selected: game.scoreSelected.FT03['00'] === true}" @click="match_select(index, i, 'FT03', '00')"><span>0:0</span><em>{{ game.rates.FT03['00'].toFixed(2) }}</em></td>
                      <td colspan="1" :class="{selected: game.scoreSelected.FT03['11'] === true}" @click="match_select(index, i, 'FT03', '11')"><span>1:1</span><em>{{ game.rates.FT03['11'].toFixed(2) }}</em></td>
                      <td colspan="1" :class="{selected: game.scoreSelected.FT03['22'] === true}" @click="match_select(index, i, 'FT03', '22')"><span>2:2</span><em>{{ game.rates.FT03['22'].toFixed(2) }}</em></td>
                      <td colspan="1" :class="{selected: game.scoreSelected.FT03['33'] === true}" @click="match_select(index, i, 'FT03', '33')"><span>3:3</span><em>{{ game.rates.FT03['33'].toFixed(2) }}</em></td>
                      <td colspan="3" :class="{selected: game.scoreSelected.FT03['99'] === true}" @click="match_select(index, i, 'FT03', '99')"><span>平其他</span><em>{{ game.rates.FT03['99'].toFixed(2) }}</em></td>
                    </tr>
                    <tr>
                      <td colspan="1" :class="{selected: game.scoreSelected.FT03['01'] === true}" @click="match_select(index, i, 'FT03', '01')"><span>0:1</span><em>{{ game.rates.FT03['01'].toFixed(2) }}</em></td>
                      <td colspan="1" :class="{selected: game.scoreSelected.FT03['02'] === true}" @click="match_select(index, i, 'FT03', '02')"><span>0:2</span><em>{{ game.rates.FT03['02'].toFixed(2) }}</em></td>
                      <td colspan="1" :class="{selected: game.scoreSelected.FT03['12'] === true}" @click="match_select(index, i, 'FT03', '12')"><span>1:2</span><em>{{ game.rates.FT03['12'].toFixed(2) }}</em></td>
                      <td colspan="1" :class="{selected: game.scoreSelected.FT03['03'] === true}" @click="match_select(index, i, 'FT03', '03')"><span>0:3</span><em>{{ game.rates.FT03['03'].toFixed(2) }}</em></td>
                      <td colspan="1" :class="{selected: game.scoreSelected.FT03['13'] === true}" @click="match_select(index, i, 'FT03', '13')"><span>1:3</span><em>{{ game.rates.FT03['13'].toFixed(2) }}</em></td>
                      <td colspan="1" :class="{selected: game.scoreSelected.FT03['23'] === true}" @click="match_select(index, i, 'FT03', '23')"><span>2:3</span><em>{{ game.rates.FT03['23'].toFixed(2) }}</em></td>
                      <td colspan="1" :class="{selected: game.scoreSelected.FT03['04'] === true}" @click="match_select(index, i, 'FT03', '04')"><span>0:4</span><em>{{ game.rates.FT03['04'].toFixed(2) }}</em></td>
                    </tr>
                    <tr>
                      <td colspan="1" :class="{selected: game.scoreSelected.FT03['14'] === true}" @click="match_select(index, i, 'FT03', '14')"><span>1:4</span><em>{{ game.rates.FT03['14'].toFixed(2) }}</em></td>
                      <td colspan="1" :class="{selected: game.scoreSelected.FT03['24'] === true}" @click="match_select(index, i, 'FT03', '24')"><span>2:4</span><em>{{ game.rates.FT03['24'].toFixed(2) }}</em></td>
                      <td colspan="1" :class="{selected: game.scoreSelected.FT03['05'] === true}" @click="match_select(index, i, 'FT03', '05')"><span>0:5</span><em>{{ game.rates.FT03['05'].toFixed(2) }}</em></td>
                      <td colspan="1" :class="{selected: game.scoreSelected.FT03['15'] === true}" @click="match_select(index, i, 'FT03', '15')"><span>1:5</span><em>{{ game.rates.FT03['15'].toFixed(2) }}</em></td>
                      <td colspan="1" :class="{selected: game.scoreSelected.FT03['25'] === true}" @click="match_select(index, i, 'FT03', '25')"><span>2:5</span><em>{{ game.rates.FT03['25'].toFixed(2) }}</em></td>
                      <td colspan="2" :class="{selected: game.scoreSelected.FT03['09'] === true}" @click="match_select(index, i, 'FT03', '09')"><span>负其他</span><em>{{ game.rates.FT03['09'].toFixed(2) }}</em></td>
                    </tr>
                  </table>
                  <table class="m-football-totalgoals-table mt10" cellpadding="0" cellspacing="0">
                    <tr class="tac">
                      <td class="m-football-table-tit bg-blue" rowspan="2">总进球</td>
                      <td :class="{selected: game.scoreSelected.FT04['0'] === true}" @click="match_select(index, i, 'FT04', '0')"><span>0 <em>{{ game.rates.FT04['0'].toFixed(2) }}</em></span></td>
                      <td :class="{selected: game.scoreSelected.FT04['1'] === true}" @click="match_select(index, i, 'FT04', '1')"><span>1 <em>{{ game.rates.FT04['1'].toFixed(2) }}</em></span></td>
                      <td :class="{selected: game.scoreSelected.FT04['2'] === true}" @click="match_select(index, i, 'FT04', '2')"><span>2 <em>{{ game.rates.FT04['2'].toFixed(2) }}</em></span></td>
                      <td :class="{selected: game.scoreSelected.FT04['3'] === true}" @click="match_select(index, i, 'FT04', '3')"><span>3 <em>{{ game.rates.FT04['3'].toFixed(2) }}</em></span></td>
                    </tr>
                    <tr class="tac">
                      <td :class="{selected: game.scoreSelected.FT04['4'] === true}" @click="match_select(index, i, 'FT04', '4')"><span>4 <em>{{ game.rates.FT04['4'].toFixed(2) }}</em></span></td>
                      <td :class="{selected: game.scoreSelected.FT04['5'] === true}" @click="match_select(index, i, 'FT04', '5')"><span>5 <em>{{ game.rates.FT04['5'].toFixed(2) }}</em></span></td>
                      <td :class="{selected: game.scoreSelected.FT04['6'] === true}" @click="match_select(index, i, 'FT04', '6')"><span>6 <em>{{ game.rates.FT04['6'].toFixed(2) }}</em></span></td>
                      <td :class="{selected: game.scoreSelected.FT04['7'] === true}" @click="match_select(index, i, 'FT04', '7')"><span>7+ <em>{{ game.rates.FT04['7'].toFixed(2) }}</em></span></td>
                    </tr>
                  </table>
                  <table class="m-football-halfcourt-table mt10" cellpadding="0" cellspacing="0">
                    <tr class="tac">
                    <td class="m-football-table-tit bg-purple" rowspan="3">半全场</td>
                      <td :class="{selected: game.scoreSelected.FT05['33'] === true}" @click="match_select(index, i, 'FT05', '33')"><span>胜胜 <em>{{ game.rates.FT05['33'].toFixed(2) }}</em></span></td>
                      <td :class="{selected: game.scoreSelected.FT05['31'] === true}" @click="match_select(index, i, 'FT05', '31')"><span>胜平 <em>{{ game.rates.FT05['31'].toFixed(2) }}</em></span></td>
                      <td :class="{selected: game.scoreSelected.FT05['30'] === true}" @click="match_select(index, i, 'FT05', '30')"><span>胜负 <em>{{ game.rates.FT05['30'].toFixed(2) }}</em></span></td>
                    </tr>
                    <tr class="tac">
                      <td :class="{selected: game.scoreSelected.FT05['13'] === true}" @click="match_select(index, i, 'FT05', '13')"><span>平胜 <em>{{ game.rates.FT05['13'].toFixed(2) }}</em></span></td>
                      <td :class="{selected: game.scoreSelected.FT05['11'] === true}" @click="match_select(index, i, 'FT05', '11')"><span>平平 <em>{{ game.rates.FT05['11'].toFixed(2) }}</em></span></td>
                      <td :class="{selected: game.scoreSelected.FT05['10'] === true}" @click="match_select(index, i, 'FT05', '10')"><span>平负 <em>{{ game.rates.FT05['10'].toFixed(2) }}</em></span></td>
                    </tr>
                    <tr class="tac">
                      <td :class="{selected: game.scoreSelected.FT05['03'] === true}" @click="match_select(index, i, 'FT05', '03')"><span>负胜 <em>{{ game.rates.FT05['03'].toFixed(2) }}</em></span></td>
                      <td :class="{selected: game.scoreSelected.FT05['01'] === true}" @click="match_select(index, i, 'FT05', '01')"><span>负平 <em>{{ game.rates.FT05['01'].toFixed(2) }}</em></span></td>
                      <td :class="{selected: game.scoreSelected.FT05['00'] === true}" @click="match_select(index, i, 'FT05', '00')"><span>负负 <em>{{ game.rates.FT05['00'].toFixed(2) }}</em></span></td>
                    </tr>
                  </table>
                </div>
                <div class="m-football-score-btn" style="justify-content:center;">
                  <button class="m-football-score-red" @click="sureScore(index, i)">确定</button>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
    <bottom-bet-ft @clear="clearFnc" :match="match" @submit="submit" :canSubmit="canSubmit" @submitFail="submitFail"></bottom-bet-ft>
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
  name: 'hhggJczq',
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
      centerDialogVisible: {}
    }
  },
  props: ['eyeShow', 'countdown'],
  watch: {
    FT09Query: function () {
      this.init()
    }
  },
  created () {
    this.init() // 初始化
  },
  computed: {
    ...mapState({
      FT09Query: state => {
        if (state.jczq.FT09Query) {
          return state.jczq.FT09Query
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
    this.check()
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
    clearFnc () {
      store.commit('jczq_clear')
    },
    init: function () {
      let FT09Query = store.state.jczq.FT09Query
      for (let index = 0, len = FT09Query.length; index < len; index++) {
        this.$set(this.matchFlag, index, true)
        for (let i = 0, len = FT09Query[index][1].length; i < len; i++) {
          let FT01Selected = {'0': false, '1': false, '3': false}
          let FT02Selected = {'0': false, '1': false, '3': false}
          let FT03Selected = {'10': false, '11': false, '12': false, '13': false, '14': false, '15': false, '20': false, '21': false, '22': false, '23': false, '24': false, '25': false, '30': false, '31': false, '32': false, '33': false, '40': false, '41': false, '42': false, '50': false, '51': false, '52': false, '90': false, '99': false, '00': false, '01': false, '02': false, '03': false, '04': false, '05': false, '09': false}
          let FT04Selected = {'0': false, '1': false, '3': false, '4': false, '5': false, '6': false, '7': false}
          let FT05Selected = {'00': false, '01': false, '03': false, '10': false, '11': false, '13': false, '30': false, '31': false, '33': false}
          let scoreSelected = {'FT01': FT01Selected, 'FT02': FT02Selected, 'FT03': FT03Selected, 'FT04': FT04Selected, 'FT05': FT05Selected}
          store.commit('FT09InitScore', {index: index, i: i, scoreSelected: scoreSelected})
        }
      }

      this.$store.state.jczq.jczq = []
      this.canSubmit = false
      store.commit('FTmatch', 0)
    },
    screen_fnc (flag, lottery) {
      let tt = JSON.parse(JSON.stringify(store.state.jczq.jczq))
      let l = tt.map((o, i) => {
        return o.scoreSelected
      })
      let l1 = JSON.stringify(l)
      // 以比分为例 已有比分不允许超过4场 已有4场不允许点击比分
      // let f1 = l1.match(/FT01[^;].*?},/g) !== null ? l1.match(/FT01[^;].*?},/g).join('').indexOf('true') : []
      // let f2 = l1.match(/FT02[^;].*?},/g) !== null ? l1.match(/FT02[^;].*?},/g).join('').indexOf('true') : []
      let f3 = l1.match(/FT03[^;].*?},/g) !== null ? l1.match(/FT03[^;].*?},/g).join('').indexOf('true') : []
      let f4 = l1.match(/FT04[^;].*?},/g) !== null ? l1.match(/FT04[^;].*?},/g).join('').indexOf('true') : []
      let f5 = l1.match(/FT05[^;].*?},/g) !== null ? l1.match(/FT05[^;].*?},/g).join('').indexOf('true') : []
      let t1 = tt.length
      t1 = flag ? t1 - 1 : t1
      if (t1 >= 4 && (f3 > -1 || lottery === 'FT03')) {
        this.$refs.bTips.bottompopTips('含比分不得超过4场')
        return false
      } else if (t1 >= 4 && (f5 > -1 || lottery === 'FT05')) {
        this.$refs.bTips.bottompopTips('含半全场不得超过4场')
        return false
      } else if (t1 >= 6 && (f4 > -1 || lottery === 'FT04')) {
        this.$refs.bTips.bottompopTips('含总进球数不得超过6场')
        return false
      } else if (t1 >= 8) {
        this.$refs.bTips.bottompopTips('至多投注8场比赛')
        return false
      }
    },
    match_select: function (index, i, lottery_id, m) {
      // store.commit('FT09matchSelect', {index: index, i: i, lottery_id: lottery_id, m: m})
      let FT09Query = store.state.jczq.FT09Query
      // 通过index  查看是否是同一场比赛
      let removeObj = this.jczq.find(function (x) {
        return x.game === FT09Query[index][1][i].game && x.match_number === FT09Query[index][1][i].match_number
      })

      // 如果点击的不是this.jczq当中已选择过一场比赛
      if (!removeObj) {
        // 限制场次函数
        if (this.screen_fnc(false, lottery_id) === false) {
          return false
        }
      } else {
        // 如果点击的是this.jczq当中已选择过一场比赛
        if (this.jczq.indexOf(removeObj) > -1) {
          // 这场比赛还没选择这个玩法
          if (JSON.stringify(FT09Query[index][1][i].scoreSelected[lottery_id]).indexOf('true') === -1) {
            // this.$refs.bTips.bottompopTips('一场比赛只能选择一种玩法')
            // return false

            if (this.screen_fnc(true, lottery_id) === false) {
              return false
            }
          }
        }
      }
      store.commit('FT09matchSelect', {index: index, i: i, lottery_id: lottery_id, m: m})
      if (this.jczq.indexOf(removeObj) > -1) {
        this.jczq.splice(this.jczq.indexOf(removeObj), 1)
      }
      if (this.jczq.length < 8) {
        let scoreSelected = Object.values(FT09Query[index][1][i].scoreSelected)
        let ts = this.$store.state.jczq.FT09Query[index][1][i]
        ts.selectFT = []
        Object.values(scoreSelected).forEach((o, i) => {
          if (Object.values(o).toString().indexOf('true') > -1) {
            ts.selectFT.push('FT0' + (i + 1))
          }
        })
        if (JSON.stringify(scoreSelected).indexOf('true') > -1) {
          // ts.selectFT = lottery_id
          // 将某场选择的存储起来
          // if (ts.selectFT) {
          //   ts.selectFT.push(lottery_id)
          //   ts.selectFT = Array.from(new Set(ts.selectFT))
          // } else {
          //   var hh = []
          //   hh.push(lottery_id)
          //   ts.selectFT = hh
          // }
          store.commit('FTSelected', ts)
          ts.gametext[0] = '已选' + JSON.stringify(scoreSelected).match(/true/g).length + '项'
        } else {
          ts.gametext[0] = '展开全部'
        }
      } else {
        store.commit('FT09matchSelect', {index: index, i: i, lottery_id: lottery_id, m: m})
        this.$refs.bTips.bottompopTips('至多投注8场比赛')
      }
      this.check()
    },
    sureScore (index, i) {
      this.centerDialogVisible[i] = false
    },
    cancleScore (index, i) {
      this.centerDialogVisible[i] = false

      let gametext = (this.FT09Query[index][1][i].gametext === '点击选择投注内容') ? [] : this.FT09Query[index][1][i].gametext
      let selected = []
      gametext.forEach(s => {
        selected.push(s[0] + s[2])
      })
      let scoreSelected = {'10': false, '11': false, '12': false, '13': false, '14': false, '15': false, '20': false, '21': false, '22': false, '23': false, '24': false, '25': false, '30': false, '31': false, '32': false, '33': false, '40': false, '41': false, '42': false, '50': false, '51': false, '52': false, '90': false, '99': false, '00': false, '01': false, '02': false, '03': false, '04': false, '05': false, '09': false}
      selected.forEach(s => {
        scoreSelected[s] = true
      })
      store.commit('FT09InitScore', {index: index, i: i, scoreSelected: scoreSelected})
      // 删除已加入到jczq中的对象
      let FT09Query = store.state.jczq.FT09Query
      let statuschangeObj = this.jczq.find(function (x) {
        return x.game === FT09Query[index][1][i].game && x.match_number === FT09Query[index][1][i].match_number
      })
      store.commit('jczq_update', {x: this.jczq.indexOf(statuschangeObj), scoreSelected: scoreSelected})
      let jczq_obj_index = this.jczq.indexOf(statuschangeObj)
      if (Object.values(this.jczq[jczq_obj_index].scoreSelected).indexOf(true) === -1) {
        this.jczq.splice(jczq_obj_index, 1)
      }
    },
    submitFail () {
      this.$refs.bTips.bottompopTips('最少投注两场比赛且玩法不同')
    },
    submit: function () {
      // todo
      // 控制场次下限（有单字标识的，可只选一场。没有单字标识的至少选两场）混合投注没有单关概念
      // let support_single_flag = this.jczq.find(function (x) {
      //   return x.unsupport_single.indexOf('FT09') < 0
      // })

      // if ((support_single_flag !== undefined) || (this.jczq.length >= 2)) {
      //   router.push({path: 'jczqcart', query: { lottery_id: 'FT09' }})
      // } else if (this.jczq.length === 1) {
      //   this.$refs.bTips.bottompopTips('请至少选择2场比赛')
      // }
      /**
      ** 判断场次大于两场/判断模式是否超过两种
      **/
      if (this.jczq.length >= 2) {
        let t = this.jczq.map(function (o, i) {
          return o.selectFT
        })

        t.forEach((o, i) => {
          if (o.length >= 2) {
            router.push({path: 'jczqcart', query: {lottery_id: 'FT09'}})
            return false
          }
        })

        // 由于修改混合投注这个方法不完全试用
        if ((new Set(t.join(',').split(','))).size < 2) {
          this.$refs.bTips.bottompopTips('最少投注两场比赛且玩法不同')
          return false
        } else {
          if (this.screen_fnc(true) === false) {
            return false
          }
          router.push({path: 'jczqcart', query: {lottery_id: 'FT09'}})
        }
      } else {
        this.$refs.bTips.bottompopTips('最少投注两场比赛且玩法不同')
      }
    }
  }
}
</script>

<style lang="css" scoped>
.m-football-teaminfo table{
  width:98.5%;
}
.m-football-score-wrap td em{
  display:inline-block;
}
.popup-wrap{
  width: 96%;
}
.m-football-score-wrap tr td:nth-child(1){
  width: 2rem;
}
</style>
