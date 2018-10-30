<template>
  <div id="zx6D3">
    <section class="g-bet-box">
      <div class="m-bet-box">
        <!-- <p class="tac">第{{ lottery_period }}期 {{ lottery_stop_time }} （{{ lottery_stop_weekday }}）截止投注</p> -->
        <h5><span class="red-circle fl"></span><span class="h5-txt">选择<span class="red">3</span>个号码</span>
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
          <em class="white-ball red" v-for="(item, index) in three" :key="index" :class="{selected:item.isSelected}" @click="three_select(item, index)"><span>{{item.num}}</span><mark>{{trendData[index]}}</mark></em>
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
  name: 'zx6Sd',
  components: {
    bottomBet,
    bottomTips
  },
  data () {
    return {
      three: [], // 球
      three_selected: [], // 选中的球
      // ante_code:'',
      count: 0, // 投注数
      money: 0, // 投注金额
      canSubmit: false, // 提交投注
      isDigClicked: false
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
      let three = []
      for (let i = 0; i < 10; i++) {
        three.push({num: i, isSelected: false})
      }
      this.$set(this, 'three', three)
      this.three_selected.splice(0, this.three_selected.length)
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
        type: 'zx6d3',
        n: e
      }
      store.commit('zx6d3', o)
      router.push('/d3cart')
    },
    check: function () {
      // 金额、注数效验
      if (this.three_selected.length >= 3) {
        this.$set(this, 'canSubmit', true)

        this.count = 1
        this.money = this.count * 2
      } else {
        this.canSubmit = false
        this.count = 0
        this.money = 0
      }
    },
    three_select: function (item) {
      // 选球
      item.isSelected = !item.isSelected
      if (item.isSelected) {
        if (this.three_selected.length < 3) {
          this.three_selected.push(item.num)
        } else {
          item.isSelected = !item.isSelected
          this.$refs.bTips.bottompopTips('至多选择三个号码')
        }
      } else {
        for (let i = 0; i < this.three_selected.length; i++) {
          (String(this.three_selected[i]) === String(item.num)) && (this.three_selected.splice(i, 1))
        }
      }
      this.check()
    },
    randomBalls: function () {
      // 随机球号
      this.init()
      let result = this.randomArr(3)

      for (let i in result) {
        let num = parseInt(result[i])
        this.three_select(this.three[num])
      }
      this.check()
    },
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
    submitFail () {
      this.$refs.bTips.bottompopTips('请选择三个号码')
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
          d3Obj.ante_code = this.three_selected.sort()
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
