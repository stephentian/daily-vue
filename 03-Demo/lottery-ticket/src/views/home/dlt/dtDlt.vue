<template>
  <div id="dtDlt">
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
        <!-- <h5 class="tar"><span class="tal fl">胆码区-红球，可选1-4个</span></h5> -->
        <h5><span class="red-circle fl"></span><span>胆码区-红球，可选<span class="red">1-4</span>个</span></h5>
        <div class="balls mt10 mb" :class="eyeShow ? '' : 'mark'">
          <em class="white-ball red" v-for="(item, index) in reds_dan" :key="index" :class="{selected:item.isSelected}" @click="red_dan_select(item)"><span>{{item.num}}</span><mark>{{trendData[index]}}</mark></em>
        </div>
        <h5><span class="blue-circle fl"></span><span>胆码区-蓝球，最多选择<span class="blue">1</span>个</span></h5>
        <div class="balls mt10 mb" :class="eyeShow ? '' : 'mark'">
          <em class="white-ball blue" v-for="(item, index) in blues_dan" :key="index" :class="{selected:item.isSelected}" @click="blue_dan_select(item)"><span>{{item.num}}</span><mark>{{trendData[index + 35]}}</mark></em>
        </div>
        <h5><span class="red-circle fl"></span><span>拖码区-红球，最少选择<span class="red">2</span>个</span></h5>
        <div class="balls mt10 mb" :class="eyeShow ? '' : 'mark'">
          <em class="white-ball red" v-for="(item, index) in reds_tuo" :key="index" :class="{selected:item.isSelected}" @click="red_tuo_select(item,index)"><span>{{item.num}}</span><mark>{{trendData[index]}}</mark></em>
        </div>
        <h5><span class="blue-circle fl"></span><span>拖码区-蓝球，最少选择<span class="blue">2</span>个</span></h5>
        <div class="balls mt10 mb" :class="eyeShow ? '' : 'mark'">
          <em class="white-ball blue" v-for="(item, index) in blues_tuo" :key="index" :class="{selected:item.isSelected}" @click="blue_tuo_select(item)"><span>{{item.num}}</span><mark>{{trendData[index + 35]}}</mark></em>
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
  name: 'dtDlt',
  components: {
    bottomBet,
    bottomTips
  },
  data () {
    return {
      reds_dan: [], // 胆码红色球
      blues_dan: [], // 胆码蓝色球
      reds_tuo: [], // 拖码红色球
      blues_tuo: [], // 拖码蓝色球
      reds_dan_selected: [], // 选中的胆码红色球
      reds_dan_selected_temp: [],
      blues_dan_selected: [], // 选中的胆码蓝色球
      blues_dan_selected_temp: [],
      reds_tuo_selected: [], // 选中的拖码红色球
      reds_tuo_selected_temp: [],
      blues_tuo_selected: [], // 选中的拖码蓝色球
      blues_tuo_selected_temp: [],
      ante_code: '',
      // dlt:[],               //选中的大乐透
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
      let blues_dan = []
      let reds_tuo = []
      let blues_tuo = []
      for (let i = 1; i <= 35; i++) {
        (i < 10) && (i = '0' + i)
        reds_dan.push({num: i, isSelected: false})
      }
      for (let j = 1; j <= 12; j++) {
        (j < 10) && (j = '0' + j)
        blues_dan.push({num: j, isSelected: false})
      }
      for (let i = 1; i <= 35; i++) {
        (i < 10) && (i = '0' + i)
        reds_tuo.push({num: i, isSelected: false})
      }
      for (let j = 1; j <= 12; j++) {
        (j < 10) && (j = '0' + j)
        blues_tuo.push({num: j, isSelected: false})
      }
      this.$set(this, 'reds_dan', reds_dan)
      this.$set(this, 'blues_dan', blues_dan)
      this.$set(this, 'reds_tuo', reds_tuo)
      this.$set(this, 'blues_tuo', blues_tuo)
      this.reds_dan_selected.length = 0
      this.blues_dan_selected.length = 0
      this.reds_tuo_selected.length = 0
      this.blues_tuo_selected.length = 0
      this.canSubmit = false
      this.count = 0
      this.money = 0
    },
    check: function () {
      let reds_dan_selected_length = parseInt(this.reds_dan_selected.length)
      let reds_tuo_selected_length = parseInt(this.reds_tuo_selected.length)

      if ((this.reds_dan_selected.length >= 1) && (this.reds_dan_selected.length <= 4) && (this.blues_dan_selected.length > 0) && (this.reds_tuo_selected.length >= 2) && (this.blues_tuo_selected.length >= 2) && (parseInt(reds_dan_selected_length + reds_tuo_selected_length) >= 6)) {
        // 胆码红色球至少选一个，至多选四个
        // 胆码蓝色球至多选一个
        // 拖码红色球至少选两个
        // 拖码蓝色球至少选两个
        // 红色球至少有六个
        this.reds_dan_selected.sort(function (a, b) { return a - b })
        this.blues_dan_selected.sort(function (a, b) { return a - b })
        this.reds_tuo_selected.sort(function (a, b) { return a - b })
        this.blues_tuo_selected.sort(function (a, b) { return a - b })
        // todo 区分胆码红色球、胆码蓝色球、拖码红色球、拖码蓝色球
        this.$set(this, 'canSubmit', true)

        if (reds_dan_selected_length + reds_tuo_selected_length > 5) {
          this.count = this.combinations(this.reds_tuo_selected.length, (5 - reds_dan_selected_length)) * this.blues_tuo_selected.length
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
        if (this.reds_dan_selected.length < 4) {
          this.reds_dan_selected.push(item.num)
          if (this.reds_tuo_selected.indexOf(item.num) > -1) {
            this.reds_tuo.find(function (x) {
              return String(x.num) === String(item.num)
            }).isSelected = false
            this.deleteArr(this.reds_tuo_selected, item.num)
          }
        } else {
          item.isSelected = !item.isSelected
          this.$refs.bTips.bottompopTips('胆码区红球至多选4个')
        }
      } else {
        for (let i = 0; i < this.reds_dan_selected.length; i++) {
          (String(this.reds_dan_selected[i]) === String(item.num)) && (this.reds_dan_selected.splice(i, 1))
        }
      }
      this.check()
    },
    blue_dan_select: function (item) {
      item.isSelected = !item.isSelected
      if (item.isSelected) {
        if (this.blues_dan_selected.length < 1) {
          this.blues_dan_selected.push(item.num)
          if (this.blues_tuo_selected.indexOf(item.num) > -1) {
            this.blues_tuo.find(function (x) {
              return String(x.num) === String(item.num)
            }).isSelected = false
            this.deleteArr(this.blues_tuo_selected, item.num)
          }
        } else {
          item.isSelected = !item.isSelected
          this.$refs.bTips.bottompopTips('胆码区蓝球至多选1个')
        }
      } else {
        for (let i = 0; i < this.blues_dan_selected.length; i++) {
          (String(this.blues_dan_selected[i]) === String(item.num)) && (this.blues_dan_selected.splice(i, 1))
        }
      }
      this.check()
    },
    red_tuo_select: function (item) {
      item.isSelected = !item.isSelected
      if (item.isSelected) {
        if (this.reds_tuo_selected.length < 20) {
          this.reds_tuo_selected.push(item.num)
          if (this.reds_dan_selected.indexOf(item.num) > -1) {
            this.reds_dan.find(function (x) {
              return String(x.num) === String(item.num)
            }).isSelected = false
            this.deleteArr(this.reds_dan_selected, item.num)
          }
        } else {
          item.isSelected = !item.isSelected
          this.$refs.bTips.bottompopTips('拖码区红球至多选20个')
        }
      } else {
        for (let i = 0; i < this.reds_tuo_selected.length; i++) {
          (String(this.reds_tuo_selected[i]) === String(item.num)) && (this.reds_tuo_selected.splice(i, 1))
        }
      }
      this.check()
    },
    blue_tuo_select: function (item) {
      item.isSelected = !item.isSelected
      if (item.isSelected) {
        if (this.blues_tuo_selected.length < 11) {
          this.blues_tuo_selected.push(item.num)
          if (this.blues_dan_selected.indexOf(item.num) > -1) {
            this.blues_dan.find(function (x) {
              return String(x.num) === String(item.num)
            }).isSelected = false
            this.deleteArr(this.blues_dan_selected, item.num)
          }
        } else {
          item.isSelected = !item.isSelected
          this.$refs.bTips.bottompopTips('拖码区蓝球至多选11个')
        }
      } else {
        for (let i = 0; i < this.blues_tuo_selected.length; i++) {
          (String(this.blues_tuo_selected[i]) === String(item.num)) && (this.blues_tuo_selected.splice(i, 1))
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
      const arr3 = this.blues_dan_selected
      const arr4 = this.blues_tuo_selected
      const arr5 = arr1.concat(arr2)
      const c = arr1[arr1.length - 1] + '$' + arr2[0]
      arr5.splice(arr1.length - 1, 2, c)
      const arr6 = arr5.concat(arr3)
      const d = arr5[arr5.length - 1] + '#' + arr3[0]
      arr6.splice(arr5.length - 1, 2, d)
      const arr7 = arr6.concat(arr4)
      const e = arr6[arr6.length - 1] + '$' + arr4[0]
      arr7.splice(arr6.length - 1, 2, e)
      this.ante_code = arr7

      const arr8 = arr7.join(',').replace(/[^0-9]/ig, ',').split(',')
      this.reds_dan_selected_temp = arr8.splice(0, arr1.length)
      this.reds_tuo_selected_temp = arr8.splice(0, arr2.length)
      this.blues_dan_selected_temp = arr8.splice(0, arr3.length)
      this.blues_tuo_selected_temp = arr8
    },
    moreShow () {
      this.$emit('moreShow')
    },
    missShow () {
      this.$emit('missShow')
    },
    submitFail () {
      // 胆码区蓝球至少选择一个
      //     拖码区红球至少选择2个
      //     拖码区蓝球至少选择2个
      //     红球胆码区和拖码区总和不得低于6个，蓝球胆码区和拖码区综合不得低于3个
      if (this.reds_tuo_selected.length < 2) {
        this.$refs.bTips.bottompopTips('拖码区红球至少选择2个')
      } else if (this.blues_tuo_selected.length < 2) {
        this.$refs.bTips.bottompopTips('拖码区蓝球至少选择2个')
      } else if (this.blues_dan_selected.length < 1) {
        this.$refs.bTips.bottompopTips('胆码区蓝球至少选择一个')
      } else if ((this.reds_dan_selected.length + this.reds_tuo_selected.length) < 6) {
        this.$refs.bTips.bottompopTips('红球胆码区和拖码区总和不得低于7个')
      } else if ((this.blues_tuo_selected.length + this.blues_dan_selected.length) < 2) {
        this.$refs.bTips.bottompopTips('蓝球胆码区和拖码区综合不得低于3个')
      } else {
        this.$refs.bTips.bottompopTips('投注格式错误')
      }
    },
    submit: function () {
      if (this.isDigClicked) {
        this.$refs.bTips.bottompopTips('已经被点击了，请勿重复点击')
      } else {
        let beforeDone = () => (new Promise((resolve, reject) => {
          this.isDigClicked = true
          this.Dts()
          const dltObj = {}

          dltObj.play_type = '106'
          dltObj.ante_info = '基本胆拖投注'
          dltObj.lottery_alias = 'dlt'
          dltObj.lottery_period = this.lottery_period
          dltObj.reds_dan_selected = this.reds_dan_selected_temp
          dltObj.reds_tuo_selected = this.reds_tuo_selected_temp
          dltObj.blues_dan_selected = this.blues_dan_selected_temp
          dltObj.blues_tuo_selected = this.blues_tuo_selected_temp
          dltObj.ante_code = this.ante_code
          dltObj.count = this.count
          dltObj.single_money = this.money

          if (localStorage.token) {
            store.commit('Dlt', dltObj)
          }
          resolve()
        }))
        beforeDone().then(() => {
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
