<template>
  <div id="ssqTrend">
    <section class="g-tab">
      <div class="m-tab">
        <a class="pt tac" :class="{'active': curId === 0}" @click="trendSwitch('red')">红球走势</a>
        <a class="dt tac" :class="{'active': curId === 1}" @click="trendSwitch('blue')">蓝球走势</a>
      </div>
    </section>
    <!-- 顶部固定 -->
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
      <div class="detail scrollUl">
        <div class="redDetail" v-if="curId === 0">
          <table>
            <tr>
              <td class="tac" v-for="(o1, i1) in selectRed" :key="i1">
                <span>{{(i1 + 1).toString().length === 1 ? '0' + (i1 + 1) : (i1 + 1) }}</span>
              </td>
            </tr>
          </table>
        </div>
        <div class="blueDetail" v-else>
          <table>
            <tr>
              <td class="tac" v-for="(o1, i1) in selectBlue" :key="i1">
                <span>{{(i1 + 1).toString().length === 1 ? '0' + (i1 + 1) : (i1 + 1) }}</span>
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
          <tr v-for="(o, i) in coupletMissText" :key="'a' + i">
            <td class="tac" :class="i%2 === 0 ? 'blue' : 'gray'">
              <span>{{o}}</span>
            </td>
          </tr>
        </table>
      </div>
      <div class="detail scrollDom" v-on:scroll="onScroll">
        <div class="redDetail" v-if="curId === 0">
          <table class="trBg">
            <tr v-for="(o, i) in containSelectRed" :key="i">
              <td v-for="(o1, i1) in o" :key="i1">
                <span v-if="o1 === 0" class="tac circleRed">
                  <span>{{(i1 + 1).toString().length === 1 ? '0' + (i1 + 1) : (i1 + 1) }}</span>
                </span>
                <span v-else class="tac">{{o1}}</span>
              </td>
            </tr>
            <tr v-for="(o, i) in coupletMiss" :key="'a'+i">
              <td v-for="(o1, i1) in o" :key="i1" :class="i%2 === 0 ? 'blue' : 'gray'">
                <span class="tac">{{o1}}</span>
              </td>
            </tr>
          </table>
        </div>
        <div class="blueDetail" v-else style="position:relative;">
          <table class="trBg blueTable">
            <tr v-for="(o, i) in containSelectBlue" :key="i">
              <td v-for="(o1, i1) in o" :key="i1">
                <span v-if="o1 === 0" class="tac circleBlue">
                  <span>{{(i1 + 1).toString().length === 1 ? '0' + (i1 + 1) : (i1 + 1) }}</span>
                </span>
                <span v-else class="tac">{{o1}}</span>
              </td>
            </tr>
            <tr v-for="(o, i) in coupletMiss" :key="'a'+i">
              <td v-for="(o1, i1) in o" :key="i1" :class="i%2 === 0 ? 'blue' : 'gray'">
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
                  <span>选号</span>
                </td>
              </tr>
            </table>
          </div>
          <div class="detail scrollUl1">
            <div class="redDetail" v-if="curId === 0">
              <table>
                <tr>
                  <td class="tac" v-for="(o1, i1) in selectRed" :key="i1" >
                    <span @click="selectRedFnc(i1)">
                      <span :class="o1 ? 'active' : ''">
                        {{(i1 + 1).toString().length === 1 ? '0' + (i1 + 1) : (i1 + 1) }}
                      </span>
                    </span>
                  </td>
                </tr>
              </table>
            </div>
            <div class="blueDetail" v-else>
              <table>
                <tr>
                  <td class="tac" v-for="(o1, i1) in selectBlue" :key="i1" >
                    <span @click="selectBlueFnc(i1)">
                      <span :class="o1 ? 'active' : ''">
                        {{(i1 + 1).toString().length === 1 ? '0' + (i1 + 1) : (i1 + 1) }}
                      </span>
                    </span>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="yx d_flex ">
        <div class="title tac">
          已选
        </div>
        <div class="selectCircle">
          <ul>
            <li style="color:red" v-for="(o ,i) in selectRed" :key="'red' + i" v-show="o">
              {{(i + 1).toString().length === 1 ? '0' + (i + 1) : (i + 1)}}
            </li>
            <li style="color:blue" v-for="(o ,i) in selectBlue" :key="'blue' + i" v-show="o">
              {{(i + 1).toString().length === 1 ? '0' + (i + 1) : (i + 1)}}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <p class="tac morePeriodP">第{{ lottery_period }}期 {{ lottery_stop_time }} （{{ lottery_stop_weekday }}）截止投注
    </p>
    <bottom-tips ref="bTips"></bottom-tips>
    <bottom-bet @clear="clear" :count="count" :money="money" @submit="submit" @submitFail="submitFail" :canSubmit="canSubmit" :isDigClicked="isDigClicked"></bottom-bet>
  </div>
</template>
<script>
import api from '@/api/api'
import router from '@/router/index.js'
import { mapState } from 'vuex'
import bottomBet from '@/components/bottom-bet/bottomBet'
import store from '@/store/index.js'
import bottomTips from '@/components/bottom-tips/bottomTips'

export default {
  name: '',
  data: () => ({
    curId: 0,
    periodsData: [],
    periodsData1: [],
    blueBall: [],
    redBall: [],
    containSelectBlue: [],
    containSelectRed: [],
    ball: [],
    coupletMiss: [],
    coupletMissText: [],
    periods: 0,

    selectBlue: [], // 底部投注用 蓝球数据数组
    selectRed: [], // 底部红球用到 红球数据数组
    selectBlueList: [], // 底部投注用 选中蓝球数组
    selectRedList: [], // 底部投注用 选中红球数组
    // selectRedLength
    count: 0, // 投注数
    money: 0, // 投注金额
    canSubmit: false, // 提交投注
    isDigClicked: false, // 重复点击
    blues_selected_temp: [],
    reds_selected_temp: []
  }),
  components: {
    bottomTips,
    bottomBet
  },
  created () {
    this.$store.dispatch('getLotteryStopTime', {name: 'dlt'})
  },
  mounted () {
    api.trend({
      lottery_alias: 'dlt'
    })
      .then(res => {
        this.init(res)
      })
      .catch(err => console.log(err))
    // this.init(JSON.parse(localStorage.getItem('trendData')))
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
  methods: {
    onScroll (e) {
      let l = document.getElementsByClassName('scrollDom')[0].scrollLeft
      document.querySelector('.scrollUl').scrollLeft = l
      document.querySelector('.scrollUl1').scrollLeft = l
    },
    clear () {
      this.count = 0
      this.money = 0
      this.canSubmit = false
      this.selectRed = (new Array(35)).fill(false)
      this.selectBlue = (new Array(12)).fill(false)
    },
    init (res) {
      res.data.forEach((o, i) => {
        this.periodsData.unshift(o.lottery_period.substr(-3) + '期')
        this.redBall.unshift(o.miss_count.normal.slice(0, 35))
        this.blueBall.unshift(o.miss_count.normal.slice(35))
      })
      /**
      * 计算红球蓝球数据  根据点击切换数据
      **/
      this.selectRed = (new Array(35)).fill(false)
      this.selectBlue = (new Array(12)).fill(false)
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
    trendSwitch (s) {
      switch (s) {
        case 'red':
          this.curId = 0
          this.ball = this.redBall
          this.selectBall = this.containSelectRed
          // this.calculationNum(this.containSelectRed, n)
          this.calculationNum(this.containSelectRed, this.periods)
          break
        case 'blue':
          this.curId = 1
          this.ball = this.blueBall
          this.selectBall = this.containSelectBlue
          this.calculationNum(this.containSelectBlue, this.periods)
          break
      }
    },
    filterNum (n) {
      /**
      * 双色球 顶部球号多一行
      **/
      this.periods = n
      this.periodsData1 = this.periodsData.slice(-n)
      this.containSelectBlue = this.blueBall.slice(-n)
      this.containSelectRed = this.redBall.slice(-n)

      if (this.curId === 0) {
        this.calculationNum(this.containSelectRed, n)
      } else {
        this.calculationNum(this.containSelectBlue, n)
      }

      this.coupletMissText = ['出现次数', '平均遗漏', '最大遗漏', '最大连出']
    },
    calculationNum (t, n) {
      /**
      * 计算算法
      **/
      let t1 = t.slice(1)
      let s = t1[0].length
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
      t1.forEach((o, i) => {
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
        if (o.length > 0) {
          averageMiss.push(Math.floor((n - o.length) / o.length))
        } else {
          averageMiss.push(n)
        }
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
      if (this.selectRedList.length >= 18) {
        if (!this.selectRed[i]) {
          this.$refs.bTips.bottompopTips('至多投注18个红球')
        } else {
          this.$set(this.selectRed, i, !this.selectRed[i])
        }
      } else {
        this.$set(this.selectRed, i, !this.selectRed[i])
      }
      this.calSelectLength()
    },
    /**
    * 投注选中蓝球
    **/
    selectBlueFnc (i) {
      this.$set(this.selectBlue, i, !this.selectBlue[i])
      this.calSelectLength()
    },
    /**
    * 投注计算选中长度
    **/
    calSelectLength () {
      let s = []
      let s1 = []

      this.selectRed.forEach((o, i) => {
        let i1 = (i + 1).toString().length === 1 ? '0' + (i + 1) : i + 1
        if (o === true) {
          s.push(i1)
        }
      })

      this.selectBlue.forEach((o, i) => {
        let i1 = (i + 1).toString().length === 1 ? '0' + (i + 1) : i + 1
        if (o === true) {
          s1.push(i1)
        }
      })

      this.selectBlueList = s1
      this.selectRedList = s
      this.check()
    },
    /**
    * 检测提交
    **/
    check: function () {
      if ((this.selectRedList.length >= 5) && (this.selectBlueList.length >= 2)) {
        // 区分红色球、蓝色球
        this.$set(this, 'canSubmit', true)

        if (this.selectRedList.length > 5) {
          if (this.selectBlueList.length > 2) {
            this.count = this.combinations(this.selectRedList.length, 5) * this.combinations(this.selectBlueList.length, 2)
          } else {
            this.count = this.combinations(this.selectRedList.length, 5)
          }
        } else {
          if (this.selectBlueList.length > 2) {
            this.count = this.combinations(this.selectBlueList.length, 2)
          } else {
            this.count = 1
          }
        }
        this.money = this.count * 2
      } else {
        this.canSubmit = false
        this.count = 0
        this.money = 0
      }
    },
    /**
    * 计算注数
    **/
    combinations (m, n) {
      // todo 可提取公共方法
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
    Coms: function () {
      // 普通投注号
      const arr1 = this.selectRedList
      const arr2 = this.selectBlueList
      const arr3 = arr1.concat(arr2)
      const c = arr1[arr1.length - 1] + '#' + arr2[0]

      arr3.splice(arr1.length - 1, 2, c)
      this.ante_code = arr3

      const arr4 = arr3.join(',').replace(/[^0-9]/ig, ',').split(',')
      this.reds_selected_temp = arr4.splice(0, arr1.length)
      this.blues_selected_temp = arr4
    },
    submitFail () {
      this.$refs.bTips.bottompopTips('至少选择5个红球，2个蓝球')
    },
    submit: function () {
      if (this.isDigClicked) {
        this.$refs.bTips.bottompopTips('已经被点击了，请勿重复点击')
      } else {
        let beforeDone = () => (new Promise((resolve, reject) => {
          this.isDigClicked = true
          this.Coms()
          const dltObj = {}

          if ((this.selectRedList.length > 5) || (this.selectBlueList.length > 2)) {
            dltObj.play_type = '102'
            dltObj.ante_info = '基本复式投注'
          } else {
            dltObj.play_type = '101'
            dltObj.ante_info = '基本单式投注'
          }

          dltObj.lottery_alias = 'dlt'
          dltObj.lottery_period = this.lottery_period
          dltObj.reds_selected = this.reds_selected_temp
          dltObj.blues_selected = this.blues_selected_temp
          dltObj.ante_code = this.ante_code
          dltObj.count = this.count
          dltObj.single_money = this.money

          if (localStorage.token) {
            store.commit('Dlt', dltObj)
          }
          resolve()
        }))
        beforeDone().then(() => {
          // this.canSubmit = false;
          router.push('/dltcart')
        }).catch((err) => {
          this.$refs.bTips.bottompopTips(`submit函数出错${err}`)
          this.isDigClicked = false
        })
      }
    }
  }
}
</script>
