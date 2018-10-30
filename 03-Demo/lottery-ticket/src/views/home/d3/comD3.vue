<template>
  <div id="comD3">
    <section class="g-bet-box">
      <div class="m-bet-box">
        <!-- <p class="tac">第{{ lottery_period }}期 {{ lottery_stop_time }} （{{ lottery_stop_weekday }}）截止投注</p> -->
        <h5>
          <span class="red-circle fl"></span><span class="h5-txt">百位，选择<span class="red">1</span>个号码</span>
          <!-- <span class="tar fr" @click="moreShow()"><i class="iconfont icon-lishi"></i>历史开奖</span> -->
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
          <em class="white-ball red" v-for="(item, index) in bai" :key="index" :class="{selected:item.isSelected}" @click="bai_select(item, index)"><span>{{item.num}}</span><mark>{{trendData[index]}}</mark></em>
        </div>
        <h5><span class="red-circle fl"></span><span>十位，选择<span class="red">1</span>个号码</span></h5>
        <div class="balls mt10 mb" :class="eyeShow ? '' : 'mark'">
          <em class="white-ball red" v-for="(item, index) in shi" :key="index" :class="{selected:item.isSelected}" @click="shi_select(item, index)"><span>{{item.num}}</span><mark>{{trendData[index]}}</mark></em>
        </div>
         <h5><span class="red-circle fl"></span><span>个位，选择<span class="red">1</span>个号码</span></h5>
        <div class="balls mt10 mb" :class="eyeShow ? '' : 'mark'">
          <em class="white-ball red" v-for="(item, index) in ge" :key="index" :class="{selected:item.isSelected}" @click="ge_select(item, index)"><span>{{item.num}}</span><mark>{{trendData[index]}}</mark></em>
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
  name: 'ComSd',
  components: {
    bottomBet,
    bottomTips
  },
  data () {
    return {
      bai: [], // 百位球
      shi: [], // 十位球
      ge: [], // 个位球
      bai_selected: [], // 选中的百位球
      bai_selected_temp: [],
      shi_selected: [], // 选中的十位球
      shi_selected_temp: [],
      ge_selected: [], // 选中的个位球
      ge_selected_temp: [],
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
      let bai = []
      let shi = []
      let ge = []
      for (let i = 0; i < 10; i++) {
        bai.push({num: i, isSelected: false})
        shi.push({num: i, isSelected: false})
        ge.push({num: i, isSelected: false})
      }
      this.$set(this, 'bai', bai)
      this.$set(this, 'shi', shi)
      this.$set(this, 'ge', ge)
      this.bai_selected.splice(0, this.bai_selected.length)
      this.shi_selected.splice(0, this.shi_selected.length)
      this.ge_selected.splice(0, this.ge_selected.length)
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
        type: 'com3d',
        n: e
      }
      store.commit('com3d', o)
      router.push('/d3cart')
    },
    check: function () {
      // 金额、注数效验
      if ((this.bai_selected.length >= 1) && (this.shi_selected.length >= 1) && (this.ge_selected.length >= 1)) {
        // this.$set(this,'count',this.bai_selected.length*this.shi_selected.length*this.ge_selected.length);
        this.$set(this, 'canSubmit', true)

        this.count = 1
        this.money = this.count * 2
      } else {
        this.canSubmit = false
        this.count = 0
        this.money = 0
      }
    },
    bai_select: function (item) {
      // 百位球
      item.isSelected = !item.isSelected
      if (item.isSelected) {
        if (this.bai_selected.length < 1) {
          this.bai_selected.push(item.num)
        } else {
          item.isSelected = !item.isSelected
          this.$refs.bTips.bottompopTips('每一位只能选择一个号码')
        }
      } else {
        for (let i = 0; i < this.bai_selected.length; i++) {
          (String(this.bai_selected[i]) === String(item.num)) && (this.bai_selected.splice(i, 1))
        }
      }
      this.check()
    },
    shi_select: function (item) {
      // 十位球
      item.isSelected = !item.isSelected
      if (item.isSelected) {
        if (this.shi_selected.length < 1) {
          this.shi_selected.push(item.num)
        } else {
          item.isSelected = !item.isSelected
          this.$refs.bTips.bottompopTips('每一位只能选择一个号码')
        }
      } else {
        for (let i = 0; i < this.shi_selected.length; i++) {
          (String(this.shi_selected[i]) === String(item.num)) && (this.shi_selected.splice(i, 1))
        }
      }
      this.check()
    },
    ge_select: function (item) {
      // 个位球
      item.isSelected = !item.isSelected
      if (item.isSelected) {
        if (this.ge_selected.length < 1) {
          this.ge_selected.push(item.num)
        } else {
          item.isSelected = !item.isSelected
          this.$refs.bTips.bottompopTips('每一位只能选择一个号码')
        }
      } else {
        for (let i = 0; i < this.ge_selected.length; i++) {
          (String(this.ge_selected[i]) === String(item.num)) && (this.ge_selected.splice(i, 1))
        }
      }
      this.check()
    },
    randomBalls: function () {
      // 随机球号
      this.init()
      let bai = parseInt(Math.random() * 10)
      this.bai_select(this.bai[bai])
      let shi = parseInt(Math.random() * 10)
      this.shi_select(this.shi[shi])
      let ge = parseInt(Math.random() * 10)
      this.ge_select(this.ge[ge])
      this.check()
    },
    Coms: function () {
      // 普通投注选号拼接
      const arr1 = this.bai_selected
      const arr2 = this.shi_selected
      const arr3 = this.ge_selected
      const arr4 = arr1.concat(arr2, arr3)
      this.ante_code = arr4
    },
    submitFail () {
      this.$refs.bTips.bottompopTips('每一位必须选择一个号码')
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

          d3Obj.play_type = '201'
          d3Obj.ante_info = '直选投注'
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
          // this.canSubmit = false;
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
