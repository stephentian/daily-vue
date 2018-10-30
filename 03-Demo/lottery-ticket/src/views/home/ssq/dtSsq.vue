<template>
  <div id="dtSsq">
    <section class="g-bet-box">
      <div class="m-bet-box">
        <!-- <p class="tac">第{{ lottery_period }}期 {{ lottery_stop_time }} （{{ lottery_stop_weekday }}）截止投注</p> -->
        <h5>
          <router-link class="red tal h5-txt" to="/dtInfo">什么是胆拖？</router-link>
           <span class="tar fr mr5" @click="moreShow()">
            <i class="iconfont icon-lishi"></i>
            历史开奖
          </span>
          <span class="tar fr" @click="missShow()">
            <i class="iconfont icon-touzhu-xianshiyilou"></i>
            显示遗漏
          </span>
        </h5>
        <h5 class="tar"><span class="red-circle fl"></span><span class="tal fl">胆码区-红球，可选<span class="red">1-5</span>个</span></h5>
        <div class="balls mt10 mb" :class="eyeShow ? '' : 'mark'">
          <em class="white-ball red" v-for="(item, index) in reds_dan" :key="index" :class="{selected:item.isSelected}" @click="red_dan_select(item)"><span>{{item.num}}</span><mark>{{trendData[index]}}</mark></em>
        </div>
        <h5 class="tal mt10"><span class="red-circle fl"></span><span class="tal fl">拖码区-红球，至少选择<span class="red">2</span>个</span></h5>
        <div class="balls mt10 mb" :class="eyeShow ? '' : 'mark'">
          <em class="white-ball red" v-for="(item, index) in reds_tuo" :key="index" :class="{selected:item.isSelected}" @click="red_tuo_select(item, index)"><span>{{item.num}}</span><mark>{{trendData[index]}}</mark></em>
        </div>
        <h5><span class="blue-circle fl"></span><span>拖码区-蓝球，至少选择<span class="blue">1</span>个球号</span></h5>
        <div class="balls mt10 mb" :class="eyeShow ? '' : 'mark'">
          <em class="white-ball blue" v-for="(item, index) in blues_tuo" :key="index" :class="{selected:item.isSelected}" @click="blue_tuo_select(item)"><span>{{item.num}}</span><mark>{{trendData[index + 33]}}</mark></em>
        </div>
      </div>
    </section>
    <bottom-bet @clear="init" :count="count" :money="money" @submit="submit" @submitFail="submitFail" :canSubmit="canSubmit" :isDigClicked="isDigClicked" :moreBtn="false" :shakeBtn="false" :betBtn="true"></bottom-bet>
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
  name: 'dtSsq',
  components: {
    bottomBet,
    bottomTips
  },
  data () {
    return {
      reds_dan: [], // 胆码红色球
      reds_tuo: [], // 拖码红色球
      blues_tuo: [], // 蓝色球
      reds_dan_selected: [], // 选中的胆码红色球
      reds_dan_selected_temp: [],
      reds_tuo_selected: [], // 选中的拖码红色球
      reds_tuo_selected_temp: [],
      blues_tuo_selected: [], // 选中的蓝色球
      blues_tuo_selected_temp: [],
      ante_code: '', // 选中的双色球
      // ssq:[],               //选中的双色球
      count: 0, // 投注数
      money: 0, // 投注金额
      canSubmit: false, // 提交投注
      isDigClicked: false
    }
  },
  props: ['eyeShow', 'trendData'],
  created () {
    this.init() // 初始化：33个红球，16个蓝球
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
      let reds_dan = []
      let reds_tuo = []
      let blues_tuo = []
      for (let i = 1; i <= 33; i++) {
        (i < 10) && (i = '0' + i)
        reds_dan.push({num: i, isSelected: false})
      }
      for (let i = 1; i <= 33; i++) {
        (i < 10) && (i = '0' + i)
        reds_tuo.push({num: i, isSelected: false})
      }
      for (let j = 1; j <= 16; j++) {
        (j < 10) && (j = '0' + j)
        blues_tuo.push({num: j, isSelected: false})
      }
      this.$set(this, 'reds_dan', reds_dan)
      this.$set(this, 'reds_tuo', reds_tuo)
      this.$set(this, 'blues_tuo', blues_tuo)
      this.reds_dan_selected.length = 0
      this.reds_tuo_selected.length = 0
      this.blues_tuo_selected.length = 0
      this.canSubmit = false
      this.count = 0
      this.money = 0
    },
    check: function () {
      let reds_dan_selected_length = parseInt(this.reds_dan_selected.length)
      let reds_tuo_selected_length = parseInt(this.reds_tuo_selected.length)

      if ((this.reds_dan_selected.length >= 1) && (this.reds_dan_selected.length <= 5) && (this.reds_tuo_selected.length >= 2) && (this.blues_tuo_selected.length >= 1) && (parseInt(reds_dan_selected_length + reds_tuo_selected_length) > 6)) {
        // 胆码红色球至少选一个，至多选五个
        // 拖码红色球至少选两个
        // 拖码蓝色球至少选两个
        // 红色球至少有七个
        this.reds_dan_selected.sort(function (a, b) { return a - b })
        this.reds_tuo_selected.sort(function (a, b) { return a - b })
        this.blues_tuo_selected.sort(function (a, b) { return a - b })
        // todo 区分胆码红色球、拖码红色球、拖码蓝色球
        this.$set(this, 'canSubmit', true)

        if (reds_dan_selected_length + reds_tuo_selected_length > 6) {
          this.count = this.combinations(this.reds_tuo_selected.length, (6 - reds_dan_selected_length)) * this.blues_tuo_selected.length
        } else {
          this.count = this.blues_tuo_selected.length
        }
        this.money = this.count * 2
      } else {
        this.canSubmit = false
        this.count = 0
        this.money = 0
      }
    },
    red_dan_select: function (item) {
      item.isSelected = !item.isSelected
      if (item.isSelected) {
        if (this.reds_dan_selected.length < 5) {
          this.reds_dan_selected.push(item.num)
          if (this.reds_tuo_selected.indexOf(item.num) > -1) {
            this.reds_tuo.find(function (x) {
              return x.num === item.num
            }).isSelected = false
            this.deleteArr(this.reds_tuo_selected, item.num)
          }
        } else {
          item.isSelected = !item.isSelected
          this.$refs.bTips.bottompopTips('胆码区红球至多选5个')
        }
      } else {
        for (let i = 0; i < this.reds_dan_selected.length; i++) {
          (this.reds_dan_selected[i] === item.num) && (this.reds_dan_selected.splice(i, 1))
        }
      }
      this.check()
    },
    red_tuo_select: function (item) {
      item.isSelected = !item.isSelected
      if (item.isSelected) {
        this.reds_tuo_selected.push(item.num)
        if (this.reds_dan_selected.indexOf(item.num) > -1) {
          this.reds_dan.find(function (x) {
            return x.num === item.num
          }).isSelected = false
          this.deleteArr(this.reds_dan_selected, item.num)
        }
      } else {
        for (let i = 0; i < this.reds_tuo_selected.length; i++) {
          (this.reds_tuo_selected[i] === item.num) && (this.reds_tuo_selected.splice(i, 1))
        }
      }
      this.check()
    },
    blue_tuo_select: function (item) {
      item.isSelected = !item.isSelected
      if (item.isSelected) {
        this.blues_tuo_selected.push(item.num)
      } else {
        for (let i = 0; i < this.blues_tuo_selected.length; i++) {
          (this.blues_tuo_selected[i] === item.num) && (this.blues_tuo_selected.splice(i, 1))
        }
      }
      this.check()
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
    deleteArr (arr, item) {
      let len = arr.length
      for (let i = 0; i < len; i++) {
        if (arr[i] === item) {
          arr.splice(i, 1)
        }
      }
    },
    Dts: function () {
      // 胆拖投注号
      const arr1 = this.reds_dan_selected
      const arr2 = this.reds_tuo_selected
      const arr3 = arr1.concat(arr2)
      const arr4 = this.blues_tuo_selected
      const c = arr1[arr1.length - 1] + '$' + arr2[0]
      arr3.splice(arr1.length - 1, 2, c)
      const arr5 = arr3.concat(arr4)
      const d = arr3[arr3.length - 1] + '#' + arr4[0]
      arr5.splice(arr3.length - 1, 2, d)
      this.ante_code = arr5

      const arr6 = arr5.join(',').replace(/[^0-9]/ig, ',').split(',')
      this.reds_dan_selected_temp = arr6.splice(0, arr1.length)
      this.reds_tuo_selected_temp = arr6.splice(0, arr2.length)
      this.blues_tuo_selected_temp = arr6
    },
    moreShow () {
      this.$emit('moreShow')
    },
    missShow () {
      this.$emit('missShow')
    },
    submitFail () {
      if ((this.reds_dan_selected.length + this.reds_tuo_selected.length) < 7) {
        this.$refs.bTips.bottompopTips('红球胆码区和拖码区总和不得低于7个')
      } else if (this.blues_tuo_selected.length < 1) {
        this.$refs.bTips.bottompopTips('蓝球至少选择1个')
      }
    },
    submit: function () {
      if (this.isDigClicked) {
        this.$refs.bTips.bottompopTips('已经被点击了，请勿重复点击')
      } else {
        let beforeDone = () => (new Promise((resolve, reject) => {
          this.isDigClicked = true
          this.Dts()
          const ssqObj = {}

          ssqObj.play_type = '103'
          ssqObj.ante_info = '胆拖投注'
          ssqObj.lottery_alias = 'ssq'
          ssqObj.lottery_period = this.lottery_period
          ssqObj.reds_dan_selected = this.reds_dan_selected_temp
          ssqObj.reds_tuo_selected = this.reds_tuo_selected_temp
          ssqObj.blues_tuo_selected = this.blues_tuo_selected_temp
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

<style lang="scss" scoped>
</style>
