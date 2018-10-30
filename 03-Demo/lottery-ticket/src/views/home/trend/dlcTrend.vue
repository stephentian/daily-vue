<template>
  <div id="ssqTrend">
    <!-- <section class="defaultNum">
      <div class="tac">
          期号
      </div>
      <div>
        <ul class="scrollUl">
          <li class="tac " v-for="(o, i) in selectRed" :key="i">
            <span>{{(i + 1).toString().length === 1 ? '0' + (i + 1) : (i + 1) }}</span>
          </li>
        </ul>
      </div>
    </section> -->
    <!-- 顶部 -->
    <div class="ssqTable defaultNum">
      <div class="periods">
        <!-- <table><tr><td class="tac">期号</td></tr></table> -->
        <table>
          <tr>
            <td class="tac">
              <span>期数</span>
            </td>
          </tr>
        </table>
      </div>
      <div class="detail">
        <div class="redDetail">
          <table>
            <tr>
              <td class="tac" v-for="(o1, i1) in selectRed" :key="i1">
                <span>{{(i1 + 1).toString().length === 1 ? '0' + (i1 + 1) : (i1 + 1) }}</span>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>

    <div class="ssqTable" style="padding-bottom:9.9rem;">
      <div class="periods">
        <table class="trBg">
          <tr v-for="(o, i) in periodsData1" :key="i">
            <td class="tac">
              <span>{{o}}</span>
            </td>
          </tr>
          <tr v-for="(o, i) in coupletMissText" :key="'a' + i" :class="i%2 === 0 ? 'blue' : 'gray'">
            <td>
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
                <span v-if="o1 === 0" class="tac circleRed">
                  <span>{{defaultNumber[i1]}}</span>
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
                  <span>任选二</span>
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
                        {{(i1 + 1).toString().length === 1 ? '0' + (i1 + 1) : (i1 + 1)}}
                      </span>
                    </span>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
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
    // selectBall: []
  }),
  components: {
    bottomTips,
    bottomBet
  },
  mounted () {
    api.trend({
      lottery_alias: 'dlc'
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
  },
  computed: {
    ...mapState({
      periodsNumber: (state) => {
        return state.trend.periods
      },
      lotteryStopTime: state => state.period.dlcStopTime,
      lottery_period: state => state.period.dlcStopTime.lottery_period,
      lottery_stop_time: state => state.period.dlcStopTime.lottery_stop_time,
      lottery_stop_weekday: state => {
        if (state.period.dlcStopTime.lottery_stop_time) {
          let time = state.period.dlcStopTime.lottery_stop_time.replace(/-/g, '/')
          let day = new Date(time).getDay()
          let show_day = ['日', '一', '二', '三', '四', '五', '六']
          return show_day[day]
        }
      }
    })
  },
  methods: {
    clear () {
      this.count = 0
      this.money = 0
      this.canSubmit = false
      this.selectRedNumber = []
      this.selectRed = (new Array(11)).fill(false)
    },
    init (res) {
      res.data.forEach((o, i) => {
        this.periodsData.unshift(o.lottery_period.substr(-2) + '期')
        this.redBall.unshift(o.miss_count.normal)
      })
      // this.periodsData.unshift('期号')
      // this.redBall.unshift(this.defaultNum(11))
      this.selectRed = (new Array(11)).fill(false)
      this.filterNum(30)
    },
    defaultNum (l) {
      /**
      * 返回所有球号
      **/
      let qh = []
      for (let i = 1; i < l + 1; i++) {
        if (i.toString().length < 2) {
          qh.push('0' + i)
        } else {
          qh.push(i)
        }
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
          if (o1 === 0) {
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
      let i1 = (i + 1).toString().length === 1 ? '0' + (i + 1) : i + 1
      if (this.selectRedNumber.indexOf(i1) === -1) {
        this.$set(this.selectRed, i, !this.selectRed[i])
        this.selectRedNumber.push(i1)
      } else {
        this.$set(this.selectRed, i, !this.selectRed[i])
        this.selectRedNumber.splice(this.selectRedNumber.indexOf(i1), 1)
      }

      this.check()
    },
    /**
    * 检测提交
    **/
    check: function () {
      // 金额、注数效验
      if (this.selectRedNumber.length >= 2) {
        this.$set(this, 'canSubmit', true)
        if (this.selectRedNumber.length > 2) {
          this.count = this.combinations(this.selectRedNumber.length, 2)
        } else {
          this.count = 1
        }
        this.money = this.count * 2
      } else {
        this.canSubmit = false
        this.count = 0
        this.money = 0
      }
    },
    combinations (m, n) {
      if (!n || n < 1) {
        return []
      }

      let resultArrs = []
      let flagArr = []
      let isEnd = false
      let i
      let j
      let leftCnt

      for (i = 0; i < m; i++) {
        flagArr[i] = i < n ? 1 : 0
      }

      resultArrs.push(flagArr.concat())

      while (!isEnd) {
        leftCnt = 0
        for (i = 0; i < m - 1; i++) {
          if (flagArr[i] === 1 && flagArr[i + 1] === 0) {
            for (j = 0; j < i; j++) {
              flagArr[j] = j < leftCnt ? 1 : 0
            }
            flagArr[i] = 0
            flagArr[i + 1] = 1
            let aTmp = flagArr.concat()
            resultArrs.push(aTmp)
            if (aTmp.slice(-n).join('').indexOf('0') === -1) {
              isEnd = true
            }
            break
          }
          flagArr[i] === 1 && leftCnt++
        }
      }
      return resultArrs.length
    },
    submitFail () {
      this.$refs.bTips.bottompopTips('至少选择2个号码')
    },
    submit: function () {
      if (this.isDigClicked) {
        this.$refs.bTips.bottompopTips('已经被点击了，请勿重复点击')
      } else {
        let beforeDone = () => (new Promise((resolve, reject) => {
          this.isDigClicked = true
          const dlcObj = {}

          dlcObj.play_type = '2'
          dlcObj.ante_info = '任选二'
          dlcObj.lottery_alias = 'dlc'
          dlcObj.lottery_period = this.lottery_period
          dlcObj.ante_code = this.selectRedNumber
          dlcObj.count = this.count
          dlcObj.single_money = this.money

          this.canSubmit = false
          if (localStorage.token) {
            store.commit('Dlc', dlcObj)
          }
          resolve()
        }))
        beforeDone().then(() => {
          router.push('/dlccart')
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
.circleRed .span2{
  position: absolute;
  width: 1rem!important;
  height: 1rem!important;
  background: #b42824;
  border-radius: 50%;
  top: 0;
  right: -0.15rem;
  font-size: 0.1rem;
  color: #fff;
  line-height: 1rem;
  font-size: 0.1rem;
  transform: scale(0.9);
}
.circleRedrt{
  width: 20px;
  height: 20px;
  background: blue;
  position: relative;
  right: 0;
  top: 0;
}
.ssqTable table,.ssqTable table tr{
  width: 100%;
}

.periods, .title{
  width: 15%;
}
.detail{
  overflow: auto;
  width: 85%;
}
.selectCircle ul{
  white-space: nowrap;
  overflow: auto;
}

#trend .selectNumber{
  bottom: 4.2rem;
}

#trend .xh ul li{
  margin-right: 0.2rem;
}
#trend .defaultNum{
  top:3.8rem;
}
#trend .defaultNum>div:first-child{
  width: 15%;
}
#trend .defaultNum>div:last-child{
  width: 85%;
}
#trend .defaultNum ul li {
  margin-right: 0.4rem;
}
</style>
