<template>
  <div id="ssqTrend">
    <!-- <section class="defaultNum">
      <div class="tac w_50 d_flex">
        <div class="w_50 tac">
          期号
        </div>
        <div class="w_50 tac">
          和值
        </div>
      </div>
      <div>
        <ul class="scrollUl" >
          <li class="tac " v-for="(o, i) in selectRed" :key="i">
            <span>{{i + 1}}</span>
          </li>
        </ul>
      </div>
    </section> -->
    <!-- 顶部 -->
    <div class="ssqTable defaultNum">
      <div class="periods">
        <table>
          <tr class="haveCombined">
            <td class="tac">
              <span>期数</span>
            </td>
            <td class="tac">
              <span>和值</span>
            </td>
          </tr>
        </table>
      </div>
      <div class="detail">
        <div class="redDetail">
          <table>
            <tr>
              <td class="tac" v-for="(o1, i1) in selectRed" :key="i1">
                <span>{{i1 + 1}}</span>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>

    <div class="ssqTable" style="padding-bottom: 9.9rem;">
      <div class="periods">
        <table class="trBg">
          <tr class="haveCombined" v-for="(o, i) in periodsData1" :key="i">
            <td class="tac">
              <span>{{o}}</span>
            </td>
            <td class="tac">
              <span>{{combinedValue1[i]}}</span>
            </td>
          </tr>
          <tr v-for="(o, i) in coupletMissText" :key="'a' + i" :class="i%2 === 0 ? 'blue' : 'gray'">
            <td class="tac" colspan="2">
              <span>{{o}}</span>
            </td>
          </tr>
        </table>
      </div>
      <div class="detail">
        <div class="redDetail">
          <table class="trBg">
            <tr v-for="(o, i) in containSelectRed" :key="i">
              <td v-for="(o1, i1) in o" :key="i1">
                <span v-if="o1 <= 0" class="tac circleRed">
                  <span class="span1">{{defaultNumber[i1]}}</span>
                  <span class="circleRedrt" v-if="o1 < -1">{{-o1}}</span>
                </span>
                <span v-else class="tac">{{o1}}</span>
              </td>
            </tr>
            <tr v-for="(o, i) in coupletMiss" :key="'a'+i" :class="i%2 === 0 ? 'blue' : 'gray'">
              <td v-for="(o1, i1) in o" :key="i1">
                <span class="tac">{{o1}}</span>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <div class="selectNumber">
      <div class="xh">
        <div class="ssqTable">
          <div class="periods">
            <table class="selectCircle">
              <tr>
                <td class="tac">
                  <span>3不同号</span>
                </td>
              </tr>
            </table>
          </div>
          <div class="detail scrollUl1">
            <div class="redDetail">
              <table>
                <tr>
                  <td class="tac" v-for="(o1, i1) in selectRed" :key="i1" >
                    <span @click="selectRedFnc(i1)">
                      <span :class="o1 ? 'active' : ''">
                        {{i1 + 1 }}
                      </span>
                    </span>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>

       <!--  <div class="title tac">
          3不同号
        </div>
        <div class="selectCircle">
          <ul>
            <li v-for="(o, i) in selectRed" @click="selectRedFnc(i)" :key="'red' + i" :class="o ? 'active' : ''">
              {{i + 1}}
            </li>
          </ul>
        </div> -->
      </div>
      <div class="yx d_flex">
        <div class="title tac">
          已选
        </div>
        <div class="selectCircle">
          <ul>
            <li style="color:red" v-for="(o ,i) in selectRedNumber" :key="'red' + i">
              {{o}}
            </li>
          </ul>
        </div>
      </div>
    </div>
   <!--  <p class="tac morePeriodP">
      <span>距{{ lottery_period }}期还有</span> <span class="red">{{countdown}}</span>
    </p> -->
    <bottom-tips ref="bTips"></bottom-tips>
    <bottom-bet @clear="clear" :count="count" :money="money" @submit="submit" @submitFail="submitFail" :canSubmit="canSubmit" :isDigClicked="isDigClicked"></bottom-bet>
    <div class="popup-box g-tipsbox" v-show="centerDialogVisible">
      <div class="popup-wrap">
        <h3 class="m-title-h3"><span>温馨提示</span><i class="iconfont mr10" @click="centerDialogVisible = false">×</i></h3>
        <div class="mt15 ml15 mr15 mb20">
          <span class="tips">尊敬的用户，<em class="red">{{ lottery_period_temp }}</em>期已截止，期号已更新至下一期，请您核对期号后再投注。</span>
        </div>
        <div class="m-bottom-btn">
          <button class="m-footer-btn bgColor" type="button" @click="centerDialogVisible = false">知道了</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from '@/api/api'
import router from '@/router/index.js'
import bottomBet from '@/components/bottom-bet/bottomBet'
import store from '@/store/index.js'
import bottomTips from '@/components/bottom-tips/bottomTips'
import { mapState } from 'vuex'
export default {
  name: '',
  data: () => ({
    periodsData: [],
    periodsData1: [],
    blueBall: [],
    redBall: [],
    containSelectRed: [],
    ball: [],
    defaultNumber: [],
    coupletMissText: [],
    coupletMiss: [],
    combinedValue: [],
    combinedValue1: [],

    selectRed: [], // 底部红球用到 红球数据数组
    selectRedList: [], // 底部投注用 选中红球数组
    count: 0, // 投注数
    money: 0, // 投注金额
    canSubmit: false, // 提交投注
    isDigClicked: false, // 重复点击
    reds_selected_temp: [],
    selectRedNumber: [], // 选中球号的顺序

    timer: null,
    countdown: '00:00:00', // 倒计时
    centerDialogVisible: false,
    lottery_period_temp: '',
    lottery_stop_time_temp: '',
    trendData: '',
    periodDetail: [], // 期数详细数据
    DropDownShow: false, // 显示更多玩法
    morePeriodShow: false, // 显示前十期
    lottery_stop_time_flag: false
    // selectBall: []
  }),
  created () {
    // this.$store.dispatch('getLotteryStopTime', {name: 'JXK3'})
  },
  mounted () {
    api.trend({
      lottery_alias: 'JXK3'
    })
      .then(res => {
        this.init(res)
      })
      .catch(err => console.log(err))
    /**
    * 显示当前红球号码
    **/
    // this.init(JSON.parse(localStorage.getItem('trendData')))
    this.defaultNumber = this.defaultNum(11)
  },
  watch: {
    periodsNumber: function (n, o) {
      this.filterNum(n)
    }
    // period_remain_second: function (newnum, oldnum) {
    //   this.centerDialogVisible = false
    //   this.timeShow()
    // }
  },
  components: {
    bottomTips,
    bottomBet
  },
  computed: {
    ...mapState({
      periodsNumber: (state) => {
        return state.trend.periods
      },
      lotteryStopTime: state => state.period.jxk3StopTime,
      lottery_period: state => state.period.jxk3StopTime.lottery_period,
      lottery_stop_time: state => state.period.jxk3StopTime.lottery_stop_time,
      period_remain_second: state => state.period.jxk3StopTime.period_remain_second
    })
  },
  beforeDestroy () {
    store.commit('jxk3StopTimeInit')
    clearInterval(this.timer)
  },
  methods: {
    clear () {
      this.count = 0
      this.money = 0
      this.canSubmit = false
      this.selectRedNumber = []
      this.selectRed = (new Array(6)).fill(false)
    },
    init (res) {
      res.data.forEach((o, i) => {
        this.periodsData.unshift(o.lottery_period.substr(-3) + '期')
        this.redBall.unshift(o.miss_count.normal.slice(0, 6))
        let sum = o.bonus_code.reduce(function (prev, cur, index, arr) {
          return prev + cur
        })
        this.combinedValue.unshift(sum)
      })

      this.selectRed = (new Array(6)).fill(false)

      this.filterNum(30)
    },
    defaultNum (l) {
      /**
      * 返回所有球号
      **/
      let qh = []
      for (let i = 1; i < l + 1; i++) {
        qh.push(i)
      }
      return qh
    },
    filterNum (n) {
      this.periodsData1 = this.periodsData.slice(-n)
      this.combinedValue1 = this.combinedValue.slice(-n)
      this.containSelectRed = this.redBall.slice(-n)
      this.calculationNum(this.containSelectRed, n)
      this.coupletMissText = ['出现次数', '平均遗漏', '最大遗漏', '最大连出']
    },
    calculationNum (t, n) {
      /**
      * 计算算法
      **/
      let s = t[0].length
      let list = []
      let showCount = []
      let averageMiss = []
      let maxMiss = []
      let maxCouplet = []
      /**
      * es6 创建数组写法造成引用地址一致
      * let list = (new Array(s)).fill([])
      **/
      let list1 = []
      for (let i = 0; i < s; i++) {
        list.push([])
        list1.push([])
      }
      /**
      * 取出每一个球数据组成新的数组
      **/
      t.forEach((o, i) => {
        o.forEach(function (o1, i1) {
          if (o1 <= 0) {
            list1[i1].push(i)
          }
          list[i1].push(o1)
        })
      })

      list1.forEach((o, i) => {
        // 显示次数
        showCount.push(o.length)
        // 平均遗漏
        averageMiss.push(Math.floor((n - 1 - o.length) / o.length))
        // 最大遗漏
        maxMiss.push(Math.max(...list[i]))
        // 最大连出
        maxCouplet.push(this.calculationCouplet(o))
      })
      this.coupletMiss = [showCount, averageMiss, maxMiss, maxCouplet]
    },
    calculationCouplet (a) {
      let y = 1
      let y1 = 1
      a.forEach((o, i) => {
        if (i > 0 && a[i] - a[i - 1] === 1) {
          y++
          if (y > y1) {
            y1 = y
          }
        } else {
          y = 1
        }
      })
      return y1
    },
    selectRedFnc (i) {
      i = Number(i) + 1
      let l = this.selectRedNumber.length
      if (this.selectRedNumber.indexOf(i) === -1) {
        if (l >= 3) {
          this.$refs.bTips.bottompopTips('至多投注3个号码')
        } else {
          this.$set(this.selectRed, i - 1, !this.selectRed[i - 1])
          this.selectRedNumber.push(i)
        }
      } else {
        this.$set(this.selectRed, i - 1, !this.selectRed[i - 1])
        this.selectRedNumber.splice(this.selectRedNumber.indexOf(i), 1)
      }
      this.check()
    },
    /**
    * 检测提交
    **/
    check: function () {
      // 金额、注数效验
      if (this.selectRedNumber.length >= 3) {
        this.$set(this, 'canSubmit', true)
        this.count = 1
        this.money = this.count * 2
      } else {
        this.canSubmit = false
        this.count = 0
        this.money = 0
      }
    },
    Coms: function () {
      // 普通投注号
      const arr1 = this.selectRedNumber
      this.ante_code = arr1
    },
    submitFail () {
      this.$refs.bTips.bottompopTips('请选择3个号码')
    },
    submit: function () {
      if (this.isDigClicked) {
        this.$refs.bTips.bottompopTips('已经被点击了，请勿重复点击')
      } else {
        let beforeDone = () => (new Promise((resolve, reject) => {
          this.isDigClicked = true
          this.Coms()
          const jxk3Obj = {}

          jxk3Obj.play_type = '311'
          jxk3Obj.ante_info = '三不同号'
          jxk3Obj.lottery_alias = 'JXK3'
          jxk3Obj.lottery_period = this.lottery_period
          jxk3Obj.ante_code = this.ante_code
          jxk3Obj.count = this.count
          jxk3Obj.single_money = this.money

          if (localStorage.token) {
            store.commit('Jxk3', jxk3Obj)
          }
          resolve()
        }))
        beforeDone().then(() => {
          // this.canSubmit = false;
          router.push('/jxk3cart')
        }).catch((err) => {
          this.$refs.bTips.bottompopTips(`submit函数出错${err}`)
          this.isDigClicked = false
        })
      }
    },
    timeShow: function () {
      let period_remain_second = this.period_remain_second
      this.timer = setInterval(() => {
        if (period_remain_second > 0) {
          period_remain_second--
          let timeDistance = period_remain_second

          let hour = Math.floor(timeDistance / (60 * 60))
          timeDistance -= hour * (60 * 60)
          let minute = Math.floor(timeDistance / 60)
          timeDistance -= minute * 60
          let second = Math.floor(timeDistance)

          if (hour < 10) { hour = '0' + hour }
          if (minute < 10) { minute = '0' + minute }
          if (second < 10) { second = '0' + second }

          this.countdown = hour + ':' + minute + ':' + second
        } else {
          clearInterval(this.timer)
          this.lottery_period_temp = this.lottery_period

          {
            let self = this
            setTimeout(() => {
              self.$store.dispatch('getLotteryStopTime', {name: 'JXK3'})
            }, 2000)
          }
          this.centerDialogVisible = true
        }
      }, 1000)
    }
  }
}
</script>
<style lang="css" scoped>
.circleRed{
  position: relative;
}
#trend .circleRed .circleRedrt{
  position: absolute;
  width: 1rem!important;
  height: 1rem!important;
  background: #b42824;
  border-radius: 50%;
  top: 0;
  right: -0.15rem;
  color: #fff;
  line-height: 1rem;
  transform: scale(0.9);
}
#trend .ssqTable table,#trend .ssqTable table tr{
  width: 100%;
}
#trend .periods,#trend .haveCombined td,#trend .selectCircle,#trend .title{
  width: 50%;
}
#trend .detail{
  overflow: auto;
  width: 50%;
}
#trend .selectCircle ul{
  white-space: nowrap;
  overflow: auto;
}
#trend .selectNumber{
  bottom: 4.2rem;
}
#trend .xh ul li{
  margin-right: 0.38rem;
}
#trend .defaultNum{
  top: 3.8rem;
}
</style>
