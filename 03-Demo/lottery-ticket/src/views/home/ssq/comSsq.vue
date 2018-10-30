<template>
  <div id="comSsq">
    <section class="g-bet-box">
      <div class="m-bet-box">
       <!--  <p class="tac" @click="morePeriodShow = !morePeriodShow" >第{{ lottery_period }}期 {{ lottery_stop_time }} （{{ lottery_stop_weekday }}）截止投注<span>111</span></p> -->
        <h5 class="tar">
          <span class="red-circle fl"></span>
          <span class="tal fl h5-txt">
            红球区 至少选择
            <span class="red">6</span>
            个球号
          </span>
          <span class="tar" @click="moreShow()">
            <i class="iconfont icon-lishi"></i>
            历史开奖
          </span>
          <span class="tar ml5" @click="missShow()">
            <i class="iconfont icon-touzhu-xianshiyilou"></i>
            显示遗漏
          </span>
        </h5>
        <div class="balls mt10 mb" :class="eyeShow ? '' : 'mark'">
          <em class="white-ball red" v-for="(item, index) in reds" :key="index" :class="{selected:item.isSelected}" @click="red_select(item, index)"><span>{{item.num}}</span><mark>{{trendData[index]}}</mark></em>
        </div>
        <h5><span class="blue-circle fl"></span><span>蓝球区 至少选择<span class="blue">1</span>个球号</span></h5>
        <div class="balls mt10" :class="eyeShow ? '' : 'mark'">
          <em class="white-ball blue" v-for="(item, index) in blues" :key="index" :class="{selected:item.isSelected}" @click="blue_select(item)"><span>{{item.num}}</span><mark>{{trendData[index + 33]}}</mark></em>
        </div>
      </div>
    </section>
    <bottom-bet @clear="init" :count="count" :money="money" @submit="submit" @submitFail="submitFail" :canSubmit="canSubmit" :isDigClicked="isDigClicked" @shake="randomBalls()" @moreBet="moreBet" :moreBtn="true" :shakeBtn="true" :betBtn="false"></bottom-bet>
    <bottom-tips ref="bTips"></bottom-tips>
  </div>
</template>

<script>
import router from '@/router/index.js'
import store from '@/store/index.js'
import bottomBet from '@/components/bottom-bet/bottomBetCom'
import bottomTips from '@/components/bottom-tips/bottomTips'
import { mapState } from 'vuex'

export default {
  name: 'ComSsq',
  components: {
    bottomBet,
    bottomTips
  },
  data () {
    return {
      reds: [], // 红色球
      blues: [], // 蓝色球
      reds_selected: [], // 选中的红色球
      reds_selected_temp: [],
      blues_selected: [], // 选中的蓝色球
      blues_selected_temp: [],
      ante_code: '', // 选中的双色球
      count: 0, // 投注数
      money: 0, // 投注金额
      canSubmit: false, // 提交投注
      isDigClicked: false,
      morePeriodShow: false
    }
  },
  props: ['eyeShow', 'trendData'],
  created () {
    this.init() // 初始化：33个红球，16个蓝球
  },
  mounted () {
    // console.log(this.trendData)

  },
  computed: {
    ...mapState({
      // lotteryStopTime: state => state.period.lotteryStopTime,
      lottery_period: state => state.period.lotteryStopTime.lottery_period
      // lottery_stop_time: state => state.period.lotteryStopTime.lottery_stop_time,
      // lottery_stop_weekday: state => {
      //   if (state.period.lotteryStopTime.lottery_stop_time) {
      //     let time = state.period.lotteryStopTime.lottery_stop_time.replace(/-/g, '/')
      //     let day = new Date(time).getDay()
      //     let show_day = ['日', '一', '二', '三', '四', '五', '六']
      //     return show_day[day]
      //   }
      // },
      // period_remain_second: state => state.period.lotteryStopTime.period_remain_second
    })
  },
  methods: {
    init: function () {
      // 初始化
      let reds = []
      let blues = []
      for (let i = 1; i <= 33; i++) {
        (i < 10) && (i = '0' + i)
        reds.push({num: i, isSelected: false})
      }
      for (let j = 1; j <= 16; j++) {
        (j < 10) && (j = '0' + j)
        blues.push({num: j, isSelected: false})
      }
      this.$set(this, 'reds', reds)
      this.$set(this, 'blues', blues)
      this.reds_selected.length = 0
      this.blues_selected.length = 0
      this.canSubmit = false
      this.count = 0
      this.money = 0
    },
    moreBet (e) {
      let j = 0
      while (j < e) {
        j++
        this.machineCal()
      }
    },
    moreShow () {
      this.$emit('moreShow')
    },
    missShow () {
      this.$emit('missShow')
    },
    check: function () {
      if ((this.reds_selected.length >= 6) && (this.blues_selected.length >= 1)) {
        this.reds_selected.sort(function (a, b) { return a - b })
        this.blues_selected.sort(function (a, b) { return a - b })
        // todo 区分红色球、蓝色球
        this.$set(this, 'canSubmit', true)

        if (this.reds_selected.length > 6) {
          this.count = this.combinations(this.reds_selected.length, 6) * this.blues_selected.length
        } else {
          this.count = this.blues_selected.length
        }
        this.money = this.count * 2
      } else {
        this.canSubmit = false
        this.count = 0
        this.money = 0
      }
    },
    red_select: function (item, index) {
      item.isSelected = !item.isSelected
      if (item.isSelected) {
        if (this.reds_selected.length < 16) {
          this.reds_selected.push(item.num)
        } else {
          item.isSelected = !item.isSelected
          this.$refs.bTips.bottompopTips('至多投注16个红球')
        }
      } else {
        for (let i = 0; i < this.reds_selected.length; i++) {
          (this.reds_selected[i] === item.num) && (this.reds_selected.splice(i, 1))
        }
      }
      this.check()
    },
    blue_select: function (item) {
      item.isSelected = !item.isSelected
      if (item.isSelected) {
        this.blues_selected.push(item.num)
      } else {
        for (let i = 0; i < this.blues_selected.length; i++) {
          (this.blues_selected[i] === item.num) && (this.blues_selected.splice(i, 1))
        }
      }
      this.check()
    },
    randomBalls: function () {
      this.init()
      while (this.reds_selected.length < 6) {
        let i = parseInt(Math.random() * 33)
        this.red_select(this.reds[i])
      }
      while (this.blues_selected.length < 1) {
        let j = parseInt(Math.random() * 16)
        this.blue_select(this.blues[j])
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
    Coms: function () {
      // 普通投注号
      const arr1 = this.reds_selected
      const arr2 = this.blues_selected
      const arr3 = arr1.concat(arr2)
      const c = arr1[arr1.length - 1] + '#' + arr2[0]

      arr3.splice(arr1.length - 1, 2, c)
      this.ante_code = arr3

      const arr4 = arr3.join(',').replace(/[^0-9]/ig, ',').split(',')
      this.reds_selected_temp = arr4.splice(0, arr1.length)
      this.blues_selected_temp = arr4
    },
    machineCal () {
      let r = []
      let b = []
      let i = 0
      let j = 0
      while (i < 6) {
        let p = parseInt(Math.random() * 33 + 1)
        let p1 = String(p).length === 1 ? '0' + p : p
        if (r.includes(p1)) {
          continue
        } else {
          r.push(p1)
          i++
        }
      }
      while (j < 1) {
        j++
        let p = parseInt(Math.random() * 16 + 1)
        let p1 = String(p).length === 1 ? '0' + p : p
        b.push(p1)
      }
      let ssqObj = {}
      let a = r.slice(0, -1)
      a.push(r[5] + '#' + b[0])
      ssqObj.play_type = '101'
      ssqObj.ante_info = '普通投注'
      ssqObj.lottery_alias = 'ssq'
      ssqObj.lottery_period = this.lottery_period
      ssqObj.count = 1
      ssqObj.single_money = 2
      ssqObj.reds_selected = r
      ssqObj.blues_selected = b
      ssqObj.ante_code = a

      if (localStorage.token) {
        store.commit('Ssq', ssqObj)
      }
      router.push('/ssqcart')
    },
    submitFail: function () {
      this.$refs.bTips.bottompopTips('至少选择6个红球，1个蓝球')
    },
    submit: function () {
      if (this.isDigClicked) {
        this.$refs.bTips.bottompopTips('已经被点击了，请勿重复点击')
      } else {
        let beforeDone = () => (new Promise((resolve, reject) => {
          this.isDigClicked = true
          this.Coms()
          const ssqObj = {}

          if ((this.reds_selected.length > 6) || (this.blues_selected.length > 1)) {
            ssqObj.play_type = '102'
            ssqObj.ante_info = '复式投注'
          } else {
            ssqObj.play_type = '101'
            ssqObj.ante_info = '普通投注'
          }

          ssqObj.lottery_alias = 'ssq'
          ssqObj.lottery_period = this.lottery_period
          ssqObj.reds_selected = this.reds_selected_temp
          ssqObj.blues_selected = this.blues_selected_temp
          ssqObj.ante_code = this.ante_code

          ssqObj.count = this.count
          ssqObj.single_money = this.money

          if (localStorage.token) {
            store.commit('Ssq', ssqObj)
          }
          resolve()
        }))
        beforeDone().then(() => {
          router.push('/ssqcart')
        }).catch((err) => {
          this.$refs.bTips.bottompopTips(`submit函数出错${err}`)
          this.isDigClicked = false
        })
      }
    }
  }
}
</script>
