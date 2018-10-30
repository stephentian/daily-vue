<template>
  <div id="t2dxJxk3">
    <section class="g-bet-box">
      <div class="m-bet-box">
        <!-- <p class="tac"><span>距{{ lottery_period }}期还有</span> <span class="red">{{ countdown }}</span></p> -->
        <h5 class="tar">
          <span class="tal fl h5-txt">猜中<span class="red">3</span>个号（有<span class="red">2</span>个号相同）即中<span class="red">80</span>元</span>
          <span class="tar ml5" @click="missShow()">
            <i class="iconfont icon-touzhu-xianshiyilou"></i>
            显示遗漏
          </span>
        </h5>
        <h5 class="tal mt5">
          <span class="red-circle fl"></span>
          <span class="h5-txt">
            同号，选择<span class="red">1</span>个号码
          </span>
          <!-- <span class="tar" @click="moreShow()">
            <i class="iconfont icon-lishi"></i>
            历史开奖
          </span> -->

        </h5>
        <div class="balls mt10 mb">
          <em class="white-rectangle red" v-for="(item, index) in fu" :key="index" :class="{selected:item.isSelected}" @click="fu_select(item, index)"><span>{{item.num}}</span><mark>25</mark></em>
        </div>
        <h5 class="tal mt10">
          <span class="red-circle fl"></span>
          不同号，选择<span class="red">1</span>个号码
          </h5>
        <div class="balls mt10 mb" :class="eyeShow ? '' : 'mark'">
          <em class="white-rectangle red" v-for="(item, index) in dan" :key="index" :class="{selected:item.isSelected}" @click="dan_select(item, index)"><span>{{item.num}}</span><mark>{{trendData[index]}}</mark></em>
        </div>
      </div>
    </section>
    <bottom-bet @clear="init" :count="count" :money="money" @submit="submit" :canSubmit="canSubmit" :isDigClicked="isDigClicked" @shake="randomBalls()" @moreBet="moreBet" :moreBtn="true" :shakeBtn="true" :betBtn="false" @submitFail="submitFail"></bottom-bet>
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
  name: 't2dxJxk3',
  components: {
    bottomBet,
    bottomTips
  },
  data () {
    return {
      fu: [], // 同号球
      dan: [], // 不同号球
      fu_selected: [], // 选中的同号球
      fu_selected_temp: [],
      dan_selected: [], // 选中的不同号球
      dan_selected_temp: [],
      ante_code: '',
      count: 0, // 投注数
      money: 0, // 投注金额
      canSubmit: false, // 提交投注
      isDigClicked: false
    }
  },
  props: ['eyeShow', 'countdown', 'trendData'],
  created () {
    this.init()
  },
  computed: {
    ...mapState({
      // lotteryStopTime: state => state.period.jxk3StopTime,
      lottery_period: state => state.period.jxk3StopTime.lottery_period
      // lottery_stop_time: state => state.period.jxk3StopTime.lottery_stop_time,
      // lottery_stop_weekday: state => {
      //   if (state.period.jxk3StopTime.lottery_stop_time) {
      //     let time = state.period.jxk3StopTime.lottery_stop_time.replace(/-/g, '/')
      //     let day = new Date(time).getDay()
      //     let show_day = ['日', '一', '二', '三', '四', '五', '六']
      //     return show_day[day]
      //   }
      // },
      // period_remain_second: state => state.period.jxk3StopTime.period_remain_second
    })
  },
  mounted () {},
  methods: {
    init: function () {
      // 初始化
      let fu = []
      let dan = []
      for (let i = 1; i < 7; i++) {
        fu.push({num: i + ',' + i, isSelected: false})
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
    moreBet: function (e) {
      let o = {
        period: this.lottery_period,
        type: 't2dxjxk3',
        n: e
      }
      store.commit('t2dxjxk3', o)
      router.push('/jxk3cart')
    },
    moreShow () {
      this.$emit('moreShow')
    },
    missShow () {
      this.$emit('missShow')
    },
    check: function () {
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
      item.isSelected = !item.isSelected
      if (item.isSelected) {
        if (this.fu_selected.length < 1) {
          this.fu_selected.push(item.num)
          if (this.dan_selected.indexOf(item.num) > -1) {
            this.dan.find(function (x) {
              return x.num === item.num
            }).isSelected = false
            this.deleteArr(this.dan_selected, item.num)
          }
        } else {
          item.isSelected = !item.isSelected
          this.$refs.bTips.bottompopTips('同号只能选择一个号码')
        }
      } else {
        for (let i = 0; i < this.fu_selected.length; i++) {
          (this.fu_selected[i] === item.num) && (this.fu_selected.splice(i, 1))
        }
      }
      this.check()
    },
    dan_select: function (item) {
      item.isSelected = !item.isSelected
      if (item.isSelected) {
        if (this.dan_selected.length < 1) {
          this.dan_selected.push(item.num)
          if (this.fu_selected.indexOf(item.num) > -1) {
            this.fu.find(function (x) {
              return x.num === item.num
            }).isSelected = false
            this.deleteArr(this.fu_selected, item.num)
          }
        } else {
          item.isSelected = !item.isSelected
          this.$refs.bTips.bottompopTips('不同号只能选择一个号码')
        }
      } else {
        for (let i = 0; i < this.dan_selected.length; i++) {
          (this.dan_selected[i] === item.num) && (this.dan_selected.splice(i, 1))
        }
      }
      this.check()
    },
    randomBalls: function () {
      this.init()
      let result = this.randomArr(2)
      this.fu_select(this.fu[result[0]])
      this.dan_select(this.dan[result[1]])
      this.check()
    },
    randomArr (sum) {
      let arr = [0, 1, 2, 3, 4, 5]
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
        // console.log(i+"="+arr[i]);
        if (arr[i] === item) {
          arr.splice(i, 1)
        }
      }
    },
    Coms: function () {
      // 普通投注号
      const arr1 = this.fu_selected
      const arr2 = this.dan_selected
      const arr3 = arr1.concat(arr2)

      this.ante_code = arr3.join(',').split()
    },
    submitFail () {
      this.$refs.bTips.bottompopTips('同号区和不同号区均需选择一个号码')
    },
    submit: function () {
      if (this.isDigClicked) {
        this.$refs.bTips.bottompopTips('已经被点击了，请勿重复点击')
      } else {
        let beforeDone = () => (new Promise((resolve, reject) => {
          this.isDigClicked = true
          this.Coms()
          const jxk3Obj = {}

          jxk3Obj.play_type = '311'
          jxk3Obj.ante_info = '二同号单选'
          jxk3Obj.lottery_alias = 'JXK3'
          jxk3Obj.lottery_period = this.lottery_period
          jxk3Obj.ante_code = this.ante_code
          jxk3Obj.count = this.count
          jxk3Obj.single_money = this.money

          if (localStorage.token) {
            store.commit('Jxk3', jxk3Obj)
          }
          resolve()
        }))
        beforeDone().then(() => {
          // this.canSubmit = false;
          router.push('/jxk3cart')
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
.m-bet-box .balls{
  justify-content: space-between;
}
.m-bet-box .balls em.white-rectangle{
  margin:0px;
  width:15%;
  padding-top: 10%;
  border-radius:3px;
}
.m-bet-box .balls em.white-rectangle span{
  border:1px solid #ddd;
  border-radius:3px;
}
</style>
