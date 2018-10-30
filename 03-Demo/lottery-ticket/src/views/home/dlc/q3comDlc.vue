<template>
  <div id="q3comDlc">
    <section class="g-bet-box">
      <div class="m-bet-box">
        <!-- <p class="tac"><span>距{{ lottery_period }}期还有</span> <span class="red">{{ countdown }}</span></p> -->
        <h5 class="tar">
          <span class="tal fl h5-txt">选<span class="red">3</span>个号码与开奖的前<span class="red">3</span>个号相同且顺序一致即中<span class="red">1170</span>元</span>
          <!-- <span class="tar" @click="moreShow()">
            <i class="iconfont icon-lishi"></i>
            历史开奖
          </span> -->
          <span class="tar ml5" @click="missShow()">
            <i class="iconfont icon-touzhu-xianshiyilou"></i>
            显示遗漏
          </span>
        </h5>
        <h5 class="tal mt10"><span class="red-circle fl"></span>前一，选择<span class="red">1</span>个号码</h5>
        <div class="balls mt10 mb" :class="eyeShow ? '' : 'mark'">
          <em class="white-ball red" v-for="(item, index) in first" :key="index" :class="{selected:item.isSelected}" @click="first_select(item, index)"><span>{{item.num}}</span><mark>{{trendData[index]}}</mark></em>
        </div>
        <h5 class="tal mt10"><span class="red-circle fl"></span>前二，选择<span class="red">1</span>个号码</h5>
        <div class="balls mt10 mb" :class="eyeShow ? '' : 'mark'">
          <em class="white-ball red" v-for="(item, index) in second" :key="index" :class="{selected:item.isSelected}" @click="second_select(item, index)"><span>{{item.num}}</span><mark>{{trendData[index]}}</mark></em>
        </div>
        <h5 class="tal mt10"><span class="red-circle fl"></span>前三，选择<span class="red">1</span>个号码</h5>
        <div class="balls mt10 mb" :class="eyeShow ? '' : 'mark'">
          <em class="white-ball red" v-for="(item, index) in third" :key="index" :class="{selected:item.isSelected}" @click="third_select(item, index)"><span>{{item.num}}</span><mark>{{trendData[index]}}</mark></em>
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
  name: 'q3comDlc',
  components: {
    bottomBet,
    bottomTips
  },
  data () {
    return {
      first: [], // 前一球
      second: [], // 前二球
      third: [], // 前三球
      first_selected: [], // 选中的前一球
      first_selected_temp: [],
      second_selected: [], // 选中的前二球
      second_selected_temp: [],
      third_selected: [], // 选中的前三球
      third_selected_temp: [],
      ante_code: '',
      count: 0, // 投注数
      money: 0, // 投注金额
      canSubmit: false, // 提交投注
      isDigClicked: false
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
  mounted () {},
  methods: {
    init: function () {
      // 初始化
      let first = []
      let second = []
      let third = []
      for (let i = 1; i < 12; i++) {
        (i < 10) && (i = '0' + i)
        first.push({num: i, isSelected: false})
        second.push({num: i, isSelected: false})
        third.push({num: i, isSelected: false})
      }
      this.$set(this, 'first', first)
      this.$set(this, 'second', second)
      this.$set(this, 'third', third)
      this.first_selected.splice(0, this.first_selected.length)
      this.second_selected.splice(0, this.second_selected.length)
      this.third_selected.splice(0, this.third_selected.length)
      this.check()
      this.canSubmit = false
      this.count = 0
      this.money = 0
    },
    moreBet (e) {
      let o = {
        period: this.lottery_period,
        type: 'q3comdlc',
        n: e
      }
      store.commit('q3comdlc', o)
      router.push('/dlccart')
    },
    moreShow () {
      this.$emit('moreShow')
    },
    missShow () {
      this.$emit('missShow')
    },
    check: function () {
      if ((this.first_selected.length >= 1) && (this.second_selected.length >= 1) && (this.third_selected.length >= 1)) {
        this.$set(this, 'canSubmit', true)

        this.count = 1
        this.money = this.count * 2
      } else {
        this.canSubmit = false
        this.count = 0
        this.money = 0
      }
    },
    first_select: function (item) {
      item.isSelected = !item.isSelected
      if (item.isSelected) {
        if (this.first_selected.length < 1) {
          this.first_selected.push(item.num)
          if ((this.second_selected.indexOf(item.num) > -1) || (this.third_selected.indexOf(item.num) > -1)) {
            this.second.find(function (x) {
              return String(x.num) === String(item.num)
            }).isSelected = false
            this.third.find(function (x) {
              return String(x.num) === String(item.num)
            }).isSelected = false
            this.deleteArr(this.second_selected, item.num)
            this.deleteArr(this.third_selected, item.num)
          }
        } else {
          item.isSelected = !item.isSelected
          this.$refs.bTips.bottompopTips('前一至多投注1个球')
        }
      } else {
        for (let i = 0; i < this.first_selected.length; i++) {
          (String(this.first_selected[i]) === String(item.num)) && (this.first_selected.splice(i, 1))
        }
      }
      this.check()
    },
    second_select: function (item) {
      item.isSelected = !item.isSelected
      if (item.isSelected) {
        if (this.second_selected.length < 1) {
          this.second_selected.push(item.num)
          if ((this.first_selected.indexOf(item.num) > -1) || (this.third_selected.indexOf(item.num) > -1)) {
            this.first.find(function (x) {
              return String(x.num) === String(item.num)
            }).isSelected = false
            this.third.find(function (x) {
              return String(x.num) === String(item.num)
            }).isSelected = false
            this.deleteArr(this.first_selected, item.num)
            this.deleteArr(this.third_selected, item.num)
          }
        } else {
          item.isSelected = !item.isSelected
          this.$refs.bTips.bottompopTips('前二至多投注1个球')
        }
      } else {
        for (let i = 0; i < this.second_selected.length; i++) {
          (String(this.second_selected[i]) === String(item.num)) && (this.second_selected.splice(i, 1))
        }
      }
      this.check()
    },
    third_select: function (item) {
      item.isSelected = !item.isSelected
      if (item.isSelected) {
        if (this.third_selected.length < 1) {
          this.third_selected.push(item.num)
          if ((this.first_selected.indexOf(item.num) > -1) || (this.second_selected.indexOf(item.num) > -1)) {
            this.first.find(function (x) {
              return String(x.num) === String(item.num)
            }).isSelected = false
            this.second.find(function (x) {
              return String(x.num) === String(item.num)
            }).isSelected = false
            this.deleteArr(this.first_selected, item.num)
            this.deleteArr(this.second_selected, item.num)
          }
        } else {
          item.isSelected = !item.isSelected
          this.$refs.bTips.bottompopTips('前三至多投注1个球')
        }
      } else {
        for (let i = 0; i < this.third_selected.length; i++) {
          (String(this.third_selected[i]) === String(item.num)) && (this.third_selected.splice(i, 1))
        }
      }
      this.check()
    },
    randomBalls: function () {
      this.init()
      let result = this.randomArr(3)

      this.first_select(this.first[result[0]])
      this.second_select(this.second[result[1]])
      this.third_select(this.third[result[2]])
      this.check()
    },

    randomArr (sum) {
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
    deleteArr (arr, item) {
      let len = arr.length
      for (let i = 0; i < len; i++) {
        if (String(arr[i]) === String(item)) {
          arr.splice(i, 1)
        }
      }
    },
    Coms: function () {
      // 普通投注号
      const arr1 = this.first_selected
      const arr2 = this.second_selected
      const arr3 = this.third_selected
      const arr4 = arr1.concat('|', arr2, '|', arr3)

      this.ante_code = arr4
    },
    submitFail () {
      this.$refs.bTips.bottompopTips('每一位至少选择一个号码')
    },
    submit: function () {
      if (this.isDigClicked) {
        this.$refs.bTips.bottompopTips('已经被点击了，请勿重复点击')
      } else {
        let beforeDone = () => (new Promise((resolve, reject) => {
          this.isDigClicked = true
          this.Coms()
          const dlcObj = {}

          dlcObj.play_type = '10'
          dlcObj.ante_info = '前三直选'
          dlcObj.lottery_alias = 'dlc'
          dlcObj.lottery_period = this.lottery_period
          dlcObj.ante_code = this.ante_code
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
