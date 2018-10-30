<template>
  <div id="q2zxDlc">
    <section class="g-bet-box">
      <div class="m-bet-box">
        <!-- <p class="tac"><span>距{{ lottery_period }}期还有</span> <span class="red">{{ countdown }}</span></p> -->
        <h5 class="tar">
          <span class="red-circle fl"></span><span class="tal fl h5-txt">选<span class="red">2</span>个号码，猜对前<span class="red">2</span>个开奖号即中<span class="red">65</span>元</span>
          <!-- <span class="tar" @click="moreShow()">
            <i class="iconfont icon-lishi"></i>
            历史开奖
          </span> -->
          <span class="tar ml5" @click="missShow()">
            <i class="iconfont icon-touzhu-xianshiyilou"></i>
            显示遗漏
          </span>
        </h5>
        <div class="balls mt10 mb" :class="eyeShow ? '' : 'mark'">
          <em class="white-ball red" v-for="(item, index) in two" :key="index" :class="{selected:item.isSelected}" @click="two_select(item, index)"><span>{{item.num}}</span><mark>{{trendData[index]}}</mark></em>
        </div>
      </div>
    </section>
    <bottom-bet @clear="init" :count="count" :money="money" @submit="submit" :canSubmit="canSubmit" :isDigClicked="isDigClicked" :moreBtn="true" @moreBet="moreBet" :shakeBtn="true" @shake="randomBalls()" @submitFail="submitFail"></bottom-bet>
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
  name: 'q2zxDlc',
  components: {
    bottomBet,
    bottomTips
  },
  data () {
    return {
      two: [], // 球
      two_selected: [], // 选中的球
      count: 0, // 投注数
      money: 0, // 投注金额
      canSubmit: false, // 提交投注
      isDigClicked: false // 提交投注loading效果
    }
  },
  props: ['eyeShow', 'trendData'],
  created () {
    this.init() // 01-11个号码
  },
  computed: {
    ...mapState({
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
    init: function () {
      // 初始化
      let two = []
      for (let i = 1; i < 12; i++) {
        (i < 10) && (i = '0' + i)
        two.push({num: i, isSelected: false})
      }
      this.$set(this, 'two', two)
      this.two_selected.splice(0, this.two_selected.length)
      this.check()
      this.canSubmit = false
      this.count = 0
      this.money = 0
    },
    moreBet (e) {
      let o = {
        period: this.lottery_period,
        type: 'q2zxdlc',
        n: e
      }
      store.commit('q2zxdlc', o)
      router.push('/dlccart')
    },
    moreShow () {
      this.$emit('moreShow')
    },
    missShow () {
      this.$emit('missShow')
    },
    check: function () {
      // 金额、注数效验
      if (this.two_selected.length >= 2) {
        this.$set(this, 'canSubmit', true)

        this.count = 1
        this.money = this.count * 2
      } else {
        this.canSubmit = false
        this.count = 0
        this.money = 0
      }
    },
    two_select: function (item) {
      // 选球
      item.isSelected = !item.isSelected
      if (item.isSelected) {
        if (this.two_selected.length < 2) {
          this.two_selected.push(item.num)
        } else {
          item.isSelected = !item.isSelected
          this.$refs.bTips.bottompopTips('至多投注2个球')
        }
      } else {
        for (let i = 0; i < this.two_selected.length; i++) {
          (String(this.two_selected[i]) === String(item.num)) && (this.two_selected.splice(i, 1))
        }
      }
      this.check()
    },
    randomBalls: function () {
      // 随机球号
      this.init()
      let result = this.randomArr(2)

      for (let i in result) {
        let num = parseInt(result[i])
        this.two_select(this.two[num])
      }
      this.check()
    },
    randomArr (sum) {
      // 随机数组选出不重复的号
      let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
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
      this.$refs.bTips.bottompopTips('请至少选择两个号码')
    },
    submit: function () {
      // 提交投注
      if (this.isDigClicked) {
        this.$refs.bTips.bottompopTips('已经被点击了，请勿重复点击')
      } else {
        let beforeDone = () => (new Promise((resolve, reject) => {
          this.isDigClicked = true
          const dlcObj = {}

          dlcObj.play_type = '11'
          dlcObj.ante_info = '前二组选'
          dlcObj.lottery_alias = 'dlc'
          dlcObj.lottery_period = this.lottery_period
          dlcObj.ante_code = this.two_selected
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
