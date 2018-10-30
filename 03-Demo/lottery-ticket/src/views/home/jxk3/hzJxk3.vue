<template>
  <div id="hzJxk3">
    <section class="g-bet-box">
      <div class="m-bet-box">
        <!-- <p class="tac"><span>距{{ lottery_period }}期还有</span> <span class="red">{{ countdown }}</span></p> -->
        <h5 class="tar">
          <span class="red-circle fl"></span><span class="tal fl h5-txt">猜开奖号码相加之和</span>
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
          <em class="white-rectangle red" v-for="(item, index) in balls" :key="index" :class="{selected:item.isSelected}" @click="balls_select(item, index)">
            <div>
              <span>{{item.num}}</span><i>奖金{{item.bonus}}元</i>
              <mark>{{trendData[index + 6]}}</mark>
            </div>
          </em>
        </div>
        <h5 class="tal mt5"><span class="red-circle fl"></span><span>快捷选号</span></h5>
        <div class="balls mt10 mb quickSelect">
          <em class="white-rectangle" :class="{selected:sizeQuickSelected===0}" @click="quickSelect(0)"><span>大</span></em>
          <em class="white-rectangle" :class="{selected:sizeQuickSelected===1}" @click="quickSelect(1)"><span>小</span></em>
          <em class="white-rectangle" :class="{selected:parityQuickSelected===0}" @click="quickSelect(2)"><span>单</span></em>
          <em class="white-rectangle" :class="{selected:parityQuickSelected===1}" @click="quickSelect(3)"><span>双</span></em>
        </div>
      </div>
    </section>
    <bottom-bet @clear="clear" :count="count" :money="money" @submit="submit" :canSubmit="canSubmit" @submitFail="submitFail" :isDigClicked="isDigClicked" @moreBet="moreBet" @shake="randomBalls()" :moreBtn="true" :shakeBtn="true" :betBtn="false"></bottom-bet>
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
  name: 'hzJxk3',
  components: {
    bottomBet,
    bottomTips
  },
  data () {
    return {
      balls: [], // 球
      balls_selected: [], // 选中的球
      count: 0, // 投注数
      money: 0, // 投注金额
      canSubmit: false, // 提交投注
      isDigClicked: false,
      sizeQuickSelected: -1,
      sizeQuickFlag0: false,
      sizeQuickFlag1: false,
      parityQuickSelected: -1,
      parityQuickFlag0: false,
      parityQuickFlag1: false,
      periodDetail: [], // 期数详细数据
      DropDownShow: false, // 显示更多玩法
      morePeriodShow: false // 显示前十期
    }
  },
  props: ['eyeShow', 'trendData'],
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
      // }
    })
  },
  mounted () {},
  methods: {
    init: function () {
      // 初始化
      let balls = []
      const bonus = [80, 40, 25, 16, 12, 10, 9, 9, 10, 12, 16, 25, 40, 80]
      for (let i = 4; i < 18; i++) {
        (i < 10) && (i = '0' + i)
        balls.push({num: i, isSelected: false})
      }
      for (let i = 0; i < 14; i++) {
        balls[i].bonus = bonus[i]
      }
      this.$set(this, 'balls', balls)
      this.balls_selected.splice(0, this.balls_selected.length)
      this.check()
      this.canSubmit = false
      this.count = 0
      this.money = 0
    },
    moreBet (e) {
      let o = {
        period: this.lottery_period,
        type: 'hzjxk3',
        n: e
      }
      store.commit('hzjxk3', o)
      router.push('/jxk3cart')
    },
    moreShow () {
      this.$emit('moreShow')
    },
    missShow () {
      this.$emit('missShow')
    },
    check: function () {
      if (this.balls_selected.length >= 1) {
        this.$set(this, 'canSubmit', true)

        this.count = this.unique(this.balls_selected).length
        this.money = this.count * 2
      } else {
        this.canSubmit = false
        this.count = 0
        this.money = 0
      }
    },
    clear: function () {
      this.init()
      this.sizeQuickSelected = -1
      this.parityQuickSelected = -1
      this.sizeQuickFlag0 = false
      this.sizeQuickFlag1 = false
      this.parityQuickFlag0 = false
      this.parityQuickFlag1 = false
    },
    balls_select: function (item) {
      item.isSelected = !item.isSelected
      if (item.isSelected) {
        this.balls_selected.push(item.num)
      } else {
        for (let i = 0; i < this.balls_selected.length; i++) {
          (this.balls_selected[i] === item.num) && (this.balls_selected.splice(i, 1))
        }
      }
      this.check()
    },
    randomBalls: function () {
      this.init()
      let reds = parseInt(Math.random() * 14)
      this.balls_select(this.balls[reds])
      this.check()
    },
    quickSelect: function (index) {
      if (index === 0) {
        for (let i = 7; i < 14; i++) {
          this.balls[i].isSelected = !!this.sizeQuickFlag0
        }
        if (this.sizeQuickFlag1) {
          this.Small()
          this.sizeQuickFlag1 = false
        }
        this.sizeQuickFlag1 = false
        this.sizeQuickFlag0 = !this.sizeQuickFlag0
        if (this.sizeQuickFlag0) {
          this.sizeQuickSelected = 0
        } else {
          this.sizeQuickSelected = -1
        }

        if (this.sizeQuickFlag0 && this.parityQuickFlag0) {
          this.init()
          this.BigOdd()
        } else if (!this.sizeQuickFlag0 && this.parityQuickFlag0) {
          this.init()
          this.Odd()
        } else if (this.sizeQuickFlag0 && this.parityQuickFlag1) {
          this.init()
          this.BigEven()
        } else if (!this.sizeQuickFlag0 && this.parityQuickFlag1) {
          this.init()
          this.Even()
        } else {
          this.Big()
        }
      } else if (index === 1) {
        for (let i = 0; i < 7; i++) {
          this.balls[i].isSelected = !!this.sizeQuickFlag1
        }
        if (this.sizeQuickFlag0) {
          this.Big()
          this.sizeQuickFlag0 = false
        }
        this.sizeQuickFlag1 = !this.sizeQuickFlag1
        if (this.sizeQuickFlag1) {
          this.sizeQuickSelected = 1
        } else {
          this.sizeQuickSelected = -1
        }

        if (this.sizeQuickFlag1 && this.parityQuickFlag0) {
          this.init()
          this.SmallOdd()
        } else if (!this.sizeQuickFlag1 && this.parityQuickFlag0) {
          this.init()
          this.Odd()
        } else if (this.sizeQuickFlag1 && this.parityQuickFlag1) {
          this.init()
          this.SmallEven()
        } else if (!this.sizeQuickFlag1 && this.parityQuickFlag1) {
          this.init()
          this.Even()
        } else {
          this.Small()
        }
      } else if (index === 2) {
        for (let i = 0; i < 14; i++) {
          if (i % 2 !== 0) {
            this.balls[i].isSelected = !!this.parityQuickFlag0
          }
        }
        if (this.parityQuickFlag1) {
          this.Even()
          this.parityQuickFlag1 = false
        }
        this.parityQuickFlag1 = false
        this.parityQuickFlag0 = !this.parityQuickFlag0
        if (this.parityQuickFlag0) {
          this.parityQuickSelected = 0
        } else {
          this.parityQuickSelected = -1
        }

        if (this.parityQuickFlag0 && this.sizeQuickFlag0) {
          this.init()
          this.BigOdd()
        } else if (!this.parityQuickFlag0 && this.sizeQuickFlag0) {
          this.init()
          this.Big()
        } else if (this.parityQuickFlag0 && this.sizeQuickFlag1) {
          this.init()
          this.SmallOdd()
        } else if (!this.parityQuickFlag0 && this.sizeQuickFlag1) {
          this.init()
          this.Small()
        } else {
          this.Odd()
        }
      } else if (index === 3) {
        for (let i = 0; i < 14; i++) {
          if (i % 2 === 0) {
            this.balls[i].isSelected = !!this.parityQuickFlag1
          }
        }
        if (this.parityQuickFlag0) {
          this.Odd()
          this.parityQuickFlag0 = false
        }
        this.parityQuickFlag0 = false
        this.parityQuickFlag1 = !this.parityQuickFlag1
        if (this.parityQuickFlag1) {
          this.parityQuickSelected = 1
        } else {
          this.parityQuickSelected = -1
        }

        if (this.parityQuickFlag1 && this.sizeQuickFlag0) {
          this.init()
          this.BigEven()
        } else if (!this.parityQuickFlag1 && this.sizeQuickFlag0) {
          this.init()
          this.Big()
        } else if (this.parityQuickFlag1 && this.sizeQuickFlag1) {
          this.init()
          this.SmallEven()
        } else if (!this.parityQuickFlag1 && this.sizeQuickFlag1) {
          this.init()
          this.Small()
        } else {
          this.Even()
        }
      }
    },
    Big: function () {
      for (let i = 7; i < 14; i++) {
        this.balls_select(this.balls[i])
      }
    },
    Small: function () {
      for (let i = 0; i < 7; i++) {
        this.balls_select(this.balls[i])
      }
    },
    Odd: function () {
      for (let i = 0; i < 14; i++) {
        if (i % 2 !== 0) {
          this.balls_select(this.balls[i])
        }
      }
    },
    Even: function () {
      for (let i = 0; i < 14; i++) {
        if (i % 2 === 0) {
          this.balls_select(this.balls[i])
        }
      }
    },
    BigOdd: function () {
      for (let i = 7; i < 14; i++) {
        if (i % 2 !== 0) {
          this.balls_select(this.balls[i])
        }
      }
    },
    BigEven: function () {
      for (let i = 7; i < 14; i++) {
        if (i % 2 === 0) {
          this.balls_select(this.balls[i])
        }
      }
    },
    SmallOdd: function () {
      for (let i = 0; i < 7; i++) {
        if (i % 2 !== 0) {
          this.balls_select(this.balls[i])
        }
      }
    },
    SmallEven: function () {
      for (let i = 0; i < 7; i++) {
        if (i % 2 === 0) {
          this.balls_select(this.balls[i])
        }
      }
    },
    unique: function (arr) {
      const seen = new Map()
      return arr.filter((a) => !seen.has(a) && seen.set(a, 1))
    },
    submitFail () {
      this.$refs.bTips.bottompopTips('请选择投注内容')
    },
    submit: function () {
      if (this.isDigClicked) {
        this.$refs.bTips.bottompopTips('已经被点击了，请勿重复点击')
      } else {
        let beforeDone = () => (new Promise((resolve, reject) => {
          this.isDigClicked = true
          const jxk3Obj = {}

          jxk3Obj.play_type = '312'
          jxk3Obj.ante_info = '和值'
          jxk3Obj.lottery_alias = 'JXK3'
          jxk3Obj.lottery_period = this.lottery_period
          jxk3Obj.ante_code = this.unique(this.balls_selected)
          jxk3Obj.count = this.count
          jxk3Obj.single_money = this.money

          // console.log('balls_selected: ', this.balls_selected, this.unique(this.balls_selected))

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
.m-bet-box .balls span{
  align-items:start;
  border:1px solid #ccc;
  border-radius: 3px;
  padding-top:0.5rem;
}
.m-bet-box .balls em.white-rectangle{
  width: 21%;
  margin: 0 2% 1rem 2%;
  padding-top: 8%;
  border-radius: 3px;
}
.m-bet-box .balls em.white-rectangle.selected span {
  border:none;
}
.m-bet-box .balls em.white-rectangle i{
  font-size: 1rem;
  color: #999;
  display: block;
  width: 100%;
  text-align: center;
  transform:scale(0.8);
}
.m-bet-box .balls .red.selected i{
 color: #fff;
}
.quickSelect em.white-rectangle{
  padding-top: 11%!important;
}
</style>
