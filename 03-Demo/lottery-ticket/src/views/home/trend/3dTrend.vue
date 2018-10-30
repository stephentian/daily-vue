<template>
  <div id="ssqTrend">
    <!-- <section class="defaultNum">
      <div class="tac">
          期号
      </div>
      <div>
        <ul class="scrollUl">
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
          <tr>
            <td class="tac">
              <span>期号</span>
            </td>
          </tr>
        </table>
      </div>
      <div class="detail">
        <div class="redDetail">
          <table>
            <tr>
              <td class="tac" v-for="(o1, i1) in selectRed" :key="i1">
                <span>{{i1}}</span>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>

    <div class="ssqTable" style="padding-bottom: 11.9rem;">
      <div class="periods">
        <table class="trBg">
          <tr v-for="(o, i) in periodsData1" :key="i">
            <td class="tac">
              <span>{{o}}</span>
            </td>
          </tr>
          <tr v-for="(o, i) in coupletMissText" :key="'a' + i" :class="i%2 === 0 ? 'blue' : 'gray'">
            <td class="tac">
              <span>{{o}}</span>
            </td>
          </tr>
        </table>
      </div>
      <div class="detail">
        <div class="redDetail">
          <table class="trBg">
            <tr v-for="(o, i) in containSelectRed" :key="i">
              <td class="tac" v-for="(o1, i1) in o" :key="i1">
                <span v-if="o1 <= 0" class="tac circleRed">
                 <!--  <span class="circleRedrt" v-if="o1 === -2">
                    2
                  </span> -->
                  <span class="span1">{{defaultNumber[i1]}}</span>
                  <span class="circleRedrt" v-if="o1 < -1">{{-o1}}</span>
                </span>
                <span v-else class="tac">{{o1}}</span>
              </td>
            </tr>
            <tr v-for="(o, i) in coupletMiss" :key="'a'+i" :class="i%2 === 0 ? 'blue' : 'gray'">
              <td class="tac" v-for="(o1, i1) in o" :key="i1">
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
                  <span>组6</span>
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
                        {{i1 }}
                      </span>
                    </span>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <!-- <div class="title tac">
          组6
        </div>
        <div class="selectCircle">
          <ul>
            <li v-for="(o, i) in selectRed" @click="selectRedFnc(i)" :key="'red' + i" :class="o ? 'active' : ''">
              {{i}}
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
    <p class="tac morePeriodP" @click="morePeriodShow = !morePeriodShow" >第{{ lottery_period }}期 {{ lottery_stop_time }} （{{ lottery_stop_weekday }}）截止投注
    </p>
    <bottom-tips ref="bTips"></bottom-tips>
    <bottom-bet @clear="clear" :count="count" :money="money" @submit="submit" @submitFail="submitFail" :canSubmit="canSubmit" :isDigClicked="isDigClicked"></bottom-bet>
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

    selectRed: [], // 底部红球用到 红球数据数组
    selectRedList: [], // 底部投注用 选中红球数组
    count: 0, // 投注数
    money: 0, // 投注金额
    canSubmit: false, // 提交投注
    isDigClicked: false, // 重复点击
    reds_selected_temp: [],
    selectRedNumber: [] // 选中球号的顺序
  }),
  watch: {
    periodsNumber: function (n, o) {
      this.filterNum(n)
    }
  },
  computed: {
    ...mapState({
      periodsNumber: (state) => {
        return state.trend.periods
      },
      lotteryStopTime: state => state.period.lotteryStopTime,
      lottery_period: state => state.period.lotteryStopTime.lottery_period,
      lottery_stop_time: state => state.period.lotteryStopTime.lottery_stop_time,
      lottery_stop_weekday: state => {
        if (state.period.lotteryStopTime.lottery_stop_time) {
          let time = state.period.lotteryStopTime.lottery_stop_time.replace(/-/g, '/')
          let day = new Date(time).getDay()
          let show_day = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
          return show_day[day]
        }
      },
      period_remain_second: state => state.period.lotteryStopTime.period_remain_second
    })
  },
  components: {
    bottomTips,
    bottomBet
  },
  created () {
    this.$store.dispatch('getLotteryStopTime', {name: '3d'})
  },
  mounted () {
    api.trend({
      lottery_alias: '3d'
    })
      .then(res => {
        this.init(res)
      })
      .catch(err => console.log(err))
    // this.init(JSON.parse(localStorage.getItem('trendData')))
    /**
    * 显示当前红球号码
    **/
    this.defaultNumber = this.defaultNum(11)
  },
  methods: {
    clear () {
      this.count = 0
      this.money = 0
      this.canSubmit = false
      this.selectRedNumber = []
      this.selectRed = (new Array(10)).fill(false)
    },
    init (res) {
      res.data.forEach((o, i) => {
        this.periodsData.unshift(o.lottery_period.substr(-3) + '期')
        this.redBall.unshift(o.miss_count.normal)
      })

      // this.periodsData.unshift('期号')
      // this.redBall.unshift(this.defaultNum(10))
      this.selectRed = (new Array(10)).fill(false)

      this.filterNum(30)
    },
    defaultNum (l) {
      /**
      * 返回所有球号
      **/
      let qh = []
      for (let i = 0; i < l; i++) {
        qh.push(i)
      }
      return qh
    },
    filterNum (n) {
      this.periodsData1 = this.periodsData.slice(-n)
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
      // let l1 = ['出现次数', '平均遗漏', '最大遗漏', '最大连出']
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
    /**
    * 投注选中红球
    **/
    selectRedFnc (i) {
      let l = this.selectRedNumber.length
      if (this.selectRedNumber.indexOf(i) === -1) {
        if (l >= 3) {
          this.$refs.bTips.bottompopTips('至多投注3个球')
        } else {
          this.$set(this.selectRed, i, !this.selectRed[i])
          this.selectRedNumber.push(i)
        }
      } else {
        this.$set(this.selectRed, i, !this.selectRed[i])
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
        // this.$set(this,'count',this.bai_selected.length*this.shi_selected.length*this.ge_selected.length);
        this.$set(this, 'canSubmit', true)

        this.count = 1
        this.money = this.count * 2
      } else {
        this.canSubmit = false
        this.count = 0
        this.money = 0
      }
    },
    submitFail () {
      this.$refs.bTips.bottompopTips('请选择3个号码')
    },
    submit: function () {
      // 提交投注
      if (this.isDigClicked) {
        this.$refs.bTips.bottompopTips('已经被点击了，请勿重复点击')
      } else {
        let beforeDone = () => (new Promise((resolve, reject) => {
          this.isDigClicked = true
          const d3Obj = {}

          d3Obj.play_type = '202'
          d3Obj.ante_info = '组选投注'
          d3Obj.lottery_alias = '3d'
          d3Obj.lottery_period = this.lottery_period
          d3Obj.ante_code = this.selectRedNumber
          d3Obj.count = this.count
          d3Obj.single_money = this.money

          this.canSubmit = false
          if (localStorage.token) {
            store.commit('D3', d3Obj)
          }
          resolve()
        }))
        beforeDone().then(() => {
          router.push('/d3cart')
        }).catch((err) => {
          this.$refs.bTips.bottompopTips(`submit函数出错${err}`)
          this.isDigClicked = false
        })
      }
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
.ssqTable table,.ssqTable table tr{
  width: 100%;
}
#trend .periods, {
  width: 15%;
}
#trend .detail{
  overflow: auto;
  width: 85%;
}
.selectCircle ul{
  white-space: nowrap;
  overflow: auto;
}
#trend .xh ul li{
  margin-right: 0.45rem;
}
#trend .xh ul li{
  margin-right: 0.38rem;
}
#trend .defaultNum{
  top: 3.8rem;
}
</style>
