<template>
  <div id="zx3D3">
    <section class="g-bet-box">
      <div class="m-bet-box">
        <!-- <p class="tac">第{{ lottery_period }}期 {{ lottery_stop_time }} （{{ lottery_stop_weekday }}）截止投注</p> -->
        <h5><span class="red-circle fl"></span><span class="h5-txt">复号，选择<span class="red">1</span>个号码</span>
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
          <em class="white-ball red" v-for="(item, index) in fu" :key="index" :class="{selected:item.isSelected}" @click="fu_select(item, index)"><span>{{item.num}}</span><mark>{{trendData[index]}}</mark></em>
        </div>
        <h5><span class="red-circle fl"></span><span>单号，选择<span class="red">1</span>个号码</span></h5>
        <div class="balls mt10 mb" :class="eyeShow ? '' : 'mark'">
          <em class="white-ball red" v-for="(item, index) in dan" :key="index" :class="{selected:item.isSelected}" @click="dan_select(item, index)"><span>{{item.num}}</span><mark>{{trendData[index]}}</mark></em>
        </div>
      </div>
    </section>
    <bottom-bet @clear="init" :count="count" :money="money" @submit="submit" :canSubmit="canSubmit" :isDigClicked="isDigClicked" :moreBtn="true" :shakeBtn="true" @moreBet="moreBet" @shake="randomBalls()" @submitFail="submitFail"></bottom-bet>
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
  name: 'zx3Sd',
  components: {
    bottomBet,
    bottomTips
  },
  data () {
    return {
      fu: [], // 复位球
      dan: [], // 单位球
      fu_selected: [], // 选中的复位球
      fu_selected_temp: [],
      dan_selected: [], // 选中的单位球
      dan_selected_temp: [],
      ante_code: '', // 选号
      count: 0, // 投注数
      money: 0, // 投注金额
      canSubmit: false, // 提交投注
      isDigClicked: false // 提交投注loading效果
    }
  },
  props: ['eyeShow', 'trendData'],
  created () {
    this.init() // 0-9个号码
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
      let fu = []
      let dan = []
      for (let i = 0; i < 10; i++) {
        fu.push({num: i, isSelected: false})
        dan.push({num: i, isSelected: false})
      }
      this.$set(this, 'fu', fu)
      this.$set(this, 'dan', dan)
      this.fu_selected.splice(0, this.fu_selected.length)
      this.dan_selected.splice(0, this.dan_selected.length)
      this.check()
      this.canSubmit = false
      this.count = 0
      this.money = 0
    },
    moreShow () {
      this.$emit('moreShow')
    },
    missShow () {
      this.$emit('missShow')
    },
    moreBet (e) {
      let o = {
        period: this.lottery_period,
        type: 'zx3d3',
        n: e
      }
      store.commit('zx3d3', o)
      router.push('/d3cart')
    },
    check: function () {
      // 金额、注数效验
      if ((this.fu_selected.length >= 1) && (this.dan_selected.length >= 1)) {
        this.$set(this, 'canSubmit', true)

        this.count = 1
        this.money = this.count * 2
      } else {
        this.canSubmit = false
        this.count = 0
        this.money = 0
      }
    },
    fu_select: function (item) {
      // 复号球
      item.isSelected = !item.isSelected
      if (item.isSelected) {
        if (this.fu_selected.length < 1) {
          this.fu_selected.push(item.num)
          if (this.dan_selected.indexOf(item.num) > -1) {
            this.dan.find(function (x) {
              return String(x.num) === String(item.num)
            }).isSelected = false
            this.deleteArr(this.dan_selected, item.num)
          }
        } else {
          item.isSelected = !item.isSelected
          this.$refs.bTips.bottompopTips('只能选择一个号码')
        }
      } else {
        for (let i = 0; i < this.fu_selected.length; i++) {
          (String(this.fu_selected[i]) === String(item.num)) && (this.fu_selected.splice(i, 1))
        }
      }
      this.check()
    },
    dan_select: function (item) {
      // 单号球
      item.isSelected = !item.isSelected
      if (item.isSelected) {
        if (this.dan_selected.length < 1) {
          this.dan_selected.push(item.num)
          if (this.fu_selected.indexOf(item.num) > -1) {
            this.fu.find(function (x) {
              return String(x.num) === String(item.num)
            }).isSelected = false
            this.deleteArr(this.fu_selected, item.num)
          }
        } else {
          item.isSelected = !item.isSelected
          this.$refs.bTips.bottompopTips('只能选择一个号码')
        }
      } else {
        for (let i = 0; i < this.dan_selected.length; i++) {
          (String(this.dan_selected[i]) === String(item.num)) && (this.dan_selected.splice(i, 1))
        }
      }
      this.check()
    },
    randomBalls: function () {
      // 随机球号
      this.init()
      let result = this.randomArr(2)
      this.fu_select(this.fu[result[0]])
      this.dan_select(this.dan[result[1]])
      this.check()
    },
    // randomArr(arr,sum){
    randomArr (sum) {
      // 随机数组选出不重复的号
      let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      let result = []
      let newArr = arr
      let count = newArr.length
      for (let i = 0; i < sum; i++) {
        let index = ~~(Math.random() * count) + i
        result[i] = newArr[index]
        newArr[index] = newArr[i]
        count--
      }
      return result
    },
    deleteArr (arr, item) {
      // 删除数组
      let len = arr.length
      for (let i = 0; i < len; i++) {
        if (String(arr[i]) === String(item)) {
          arr.splice(i, 1)
        }
      }
    },
    Coms: function () {
      // 普通投注选号拼接
      const arr1 = this.fu_selected
      const arr2 = this.dan_selected
      const arr3 = arr1.concat(arr1, arr2)

      this.ante_code = arr3
    },
    submitFail () {
      this.$refs.bTips.bottompopTips('单复号必须一个号码')
    },
    submit: function () {
      // 提交投注
      if (this.isDigClicked) {
        this.$refs.bTips.bottompopTips('已经被点击了，请勿重复点击')
      } else {
        let beforeDone = () => (new Promise((resolve, reject) => {
          this.isDigClicked = true
          this.Coms()
          const d3Obj = {}

          d3Obj.play_type = '202'
          d3Obj.ante_info = '组选投注'
          d3Obj.lottery_alias = '3d'
          d3Obj.lottery_period = this.lottery_period
          d3Obj.ante_code = this.ante_code
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

<style lang="scss" scoped>
</style>
