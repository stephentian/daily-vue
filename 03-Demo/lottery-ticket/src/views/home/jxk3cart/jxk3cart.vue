<template lang="html">
  <div id="jxk3cart">
    <header class="m-top g-top-open">
      <h2 class="m-top-title tac"><i class="iconfont icon-arrow-left mr10" @click="routerBack"></i><span>新快3选号列表</span></h2>
    </header>
    <div class="header-top-space"></div>
    <section class="g-top-timebar">
      <div class="m-top-timebar">
        <!-- <p class="tac">距离{{ lottery_period }}期 {{ lottery_stop_time }}（{{ lottery_stop_weekday }}）截止投注 {{countdown}}</p> -->
        <p  >距离{{ lottery_period }}期投注截止投注: <span class="red">{{countdown}}</span></p>
      </div>
    </section>
    <section class="g-bet-tool mt15">
      <ul class="m-bet-tool">
        <router-link tag="li" class="tac" to="/JXK3"><i class="iconfont icon-shoudong1"></i> 自选号码</router-link>
        <li class="tac" @click="addRandomBalls"><i class="iconfont icon-jixuan"></i> 机选1注</li>
      </ul>
    </section>
    <section class="g-bet-selected mt15">
      <div class="m-bet-selected">
        <ul class="m-bet-selected-lists box-shadow">
            <li class="m-bet-selected-list" v-for="(item, index) in jxk3" :key="index">
              <i class="iconfont icon-fail" @click="deleteCart(item, index)"></i>
              <aside>
                <div class="group">
                  <em class="red mr5" v-for="(ball, i) in item.ante_code" :key="i">{{ [ball, item.play_type] | anteCode }}</em>
                </div>
                <p>
                  <span class="mr5">{{ item.ante_info }}</span>
                  <span class="mr5">{{ item.count }}注</span>
                  <span class="mr5">{{ item.single_money }}元</span>
                </p>
              </aside>
            </li>
        </ul>
      </div>
    </section>
    <section class="g-bet-agreement">
      <div class="m-bet-agreement">
        <i class="iconfont icon-checkbox-checked mr5"></i>
        <router-link to="/agreement">我已阅读并同意遵守多多中彩票规则</router-link>
      </div>
    </section>
    <!-- 发起合买 暂时注释 -->
    <!-- <section class="g-bottom-together layoutFlex">
      <div class="">
        <input type="checkbox" disabled checked id="myCheck">
        <span>中奖后停止追号</span>
        <button class="fr">发起合买</button>
      </div>
    </section>
    <section class="g-bottom-betadd">
      <div class="m-bottom-betadd tac ml10">
        <i class="iconfont" :class="betaddFlag ? 'icon-checkbox-checked' : 'icon-checkbox-default'" @click="toggleCheckbox()"></i>
        <span class="ml10">追加投注</span>
      </div>
      <div class="tar mr10 gray9">
        每注追加1元，单注最高可中1600万元
      </div>
    </section> -->
    <section class="g-bottom-betbar">
      <div class="m-bottom-betbar tac">
        <i class="mr5">追</i>
        <span class="m-bottom-betbar-buy">
          <em class="fl" @click="followNumChange(--follow_num_temp)">-</em>
          <div class="tac fl">
            <input class="tac" type="number" v-model="follow_num_input" maxlength="3" @blur="follow_num_input=follow_num_input === '' ? 1 : follow_num">
          </div>
          <em class="fl" @click="followNumChange(++follow_num_temp)">+</em>
        </span>
        <i class="ml5">期</i>
      </div>
      <div class="m-bottom-betbar tac">
        <i class="mr5">投</i>
        <span class="m-bottom-betbar-buy">
          <em class="fl" @click="amountChange(--amount_temp)">-</em>
          <div class="tac fl">
           <input class="tac" type="number" v-model="amount_input" maxlength="4" @blur="amount_input=amount_input === '' ? 1 : amount">
          </div>
          <em class="fl" @click="amountChange(++amount_temp)">+</em>
        </span>
        <i class="ml5">倍</i>
      </div>
    </section>
    <div class="footer-bottom-space"></div>
    <footer class="m-footer box-shadow">
      <div class="layoutFlex m-footer-content">
        <div class="m-footer-clear tac ml5" @click="clearCarts" style="padding-right:0.5rem;border-right:1px solid #eee;">
          <i class="iconfont icon-delete"></i>
          <span>清空</span>
        </div>
        <div class="m-footer-bet-count tac ml5">
          <span class="mr5">{{ count }}注</span>
          <span class="mr5">{{ amount }}倍</span>
          <span class="mr5">{{ follow_num }}期</span>
          <span class="mr5 red">{{ total_money }}元</span>
        </div>
        <div class="m-btn-next mr10">
          <button class="bgColor" type="button" @click="submit" v-loading="isClicked">立即支付</button>
        </div>
      </div>
    </footer>
      <div class="popup-box" v-show="popShow">
        <div class="popup-wrap">
          <h3 class="m-title-h3"><i class="iconfont mr10" @click="cancelSubmit">×</i><span>支付详情</span></h3>
          <section class="mt20 ml15 mr15 mb10">
            <div class="m-input">
              <label>订单金额：</label><code>{{ total_money }}元</code>
            </div>
            <div class="m-input">
              <label>优惠券：</label><code>{{ coupon_face / 100 }}元</code>
            </div>
            <!-- <div class="m-input">
              <label>余额支付：</label><code class="red">{{ topay_money }}元</code>
            </div> -->
            <div class="m-input">
              <label>余额支付：</label><code class="red">{{ total_money * 100 >= balance + coupon_face ? (balance / 100).toFixed(2) : ((total_money * 100 - coupon_face)/100).toFixed(2) }}元</code>
            </div>
            <div class="m-input">
              <label>还需支付：</label><code class="red">{{ total_money * 100 >= balance + coupon_face ? ((total_money * 100 - coupon_face -  balance)/100).toFixed(2) : 0 }}元</code>
            </div>
            <p class="red">如无法支付，请联系客服热线：<a href="tel:0791-82309268" style="color: rgb(241, 44, 44); text-decoration: none;">0791-82309268</a></p>
          </section>
          <section class="mt10 ml15 mr15 mb20 chargeType" v-if="total_money * 100 > balance + coupon_face">
            <h5 class="m-title-h5">请选择支付方式</h5>
            <!-- <aside class="m-user-list" @click="rechargeType('0')">
              <i class="iconfont icon-wechat"></i>
              <span class="ml10">微信充值</span>
              <i class="radio" :class="chargeType ? 'active' : ''"></i>
            </aside>
            <aside class="m-user-list" @click="rechargeType('1')">
              <i class="iconfont icon-alipay"></i>
              <span class="ml10">支付宝充值</span>
              <i class="radio" :class="chargeType ? '' : 'active'"></i>
            </aside> -->
            <aside class="m-user-list" v-for="(item, index) in pay_switch_data" :key="index" @click="rechargeType(index, item.pay_type)" v-show="!((item.pay_type === 1) && isIosWebview)">
              <i class="iconfont " :class="item.pay_type | payIcon"></i>
              <span class="ml10">{{item.pay_type | payName}}</span>
              <i class="radio" :class="index === selectPayIndex ? 'active' : ''"></i>
            </aside>
          </section>
          <button class="m-footer-btn bgColor" @click="isBalance" v-loading="isClicked2">立即支付</button>
        </div>
      </div>
      <div class="popup-box" v-show="centerDialogVisible">
        <div class="popup-wrap middle">
          <h3 class="m-title-h3"><span class="red ft15">提示</span></h3>
          <div style="text-align:center" class="mt5 ml15 mr15 mb20 ft12">
            <span class="tips">{{lottery_period}}期已经截止</span><br>
            <span class="tips">请确认方案后投注！</span>
          </div>
          <div class="m-bottom-btn">
            <div  class="m-footer-btn1 bgColor" @click="centerDialogVisible = false">
              确认
            </div>
            <!-- <router-link tag="button" >确认</router-link> -->
          </div>
        </div>
      </div>
      <bottom-tips ref="bTips"></bottom-tips>
    </div>
</template>

<script>
import router from '@/router/index.js'
import store from '@/store/index.js'
import { mapState, mapGetters } from 'vuex'
import api from '@/api/api'
import bottomTips from '@/components/bottom-tips/bottomTips'

export default {
  name: 'jxk3cart',
  components: {
    bottomTips
  },
  data () {
    return {
      balls: [], // 球
      balls_selected: [], // 选中的球
      balls_selected_temp: [],
      follow_num_temp: 1,
      follow_num_input: 1,
      amount_temp: 1,
      amount_input: 1,
      delFlag: false,
      moneyFlag: true,
      jxk3Tickets: [],
      popShow: false,
      sureSubmitText: '',
      topay_money: 0,
      centerDialogVisible: false,
      lottery_period_temp: '',
      isClicked: false,
      isClicked2: false,
      chargeType: true,
      isIosWebview: false,
      countdown: ''
    }
  },
  watch: {
    follow_num_input: function () {
      this.follow_num_temp = this.follow_num_input
      this.followNumChange(this.follow_num_temp)
    },
    amount_input: function () {
      this.amount_temp = this.amount_input
      this.amountChange(this.amount_input)
    },
    lottery_stop_time: function (newnum, oldnum) {
      // todo
      // this.timeShow();
    },
    period_remain_second: function (newnum, oldnum) {
      // this.$store.dispatch('getLotteryStopTime', {name: 'JXK3'}).then(() => {
      // console.log("watch - period_remain_second", this.period_remain_second);
      // this.lottery_stop_time_flag = true;
      // this.centerDialogVisible = false
      // this.timeShow()
      console.log(newnum)
      // });
    }
  },
  created () {
    this.isIosWebview = String(localStorage.getItem('iosWebview')) === 'true' || false
    this.$store.dispatch('getCoupon', {user_id: localStorage.user_id, alias: 'JXK3', coupon_status: 0})
    this.$store.dispatch('getUserInfo', {'user_id': localStorage.user_id})
    store.commit('jxk3Amount', 1)
    store.commit('jxk3FollowNum', 1)
    this.popShow = false

    this.$store.dispatch('getLotteryStopTime', {name: 'JXK3'})
      .then(() => {
        this.timeShow()
      })
  },
  computed: {
    ...mapState({
      lotteryStopTime: state => state.period.jxk3StopTime,
      lottery_period: state => state.period.jxk3StopTime.lottery_period,
      period_remain_second: state => state.period.jxk3StopTime.period_remain_second,
      lottery_stop_time: state => state.period.jxk3StopTime.lottery_stop_time,
      lottery_stop_weekday: state => {
        if (state.period.jxk3StopTime.lottery_stop_time) {
          let time = state.period.jxk3StopTime.lottery_stop_time.replace(/-/g, '/')
          let day = new Date(time).getDay()
          let show_day = ['日', '一', '二', '三', '四', '五', '六']
          return show_day[day]
        }
      },
      jxk3: state => state.jxk3.jxk3,
      lottery_period_jxk3: state => state.jxk3.lottery_period,
      ante_info: state => state.jxk3.ante_info,
      ante_code: state => state.jxk3.ante_code,
      play_type: state => state.jxk3.play_type,
      amount: state => state.jxk3.amount,
      follow_num: state => state.jxk3.follow_num,
      balance: state => state.login.user_info.balance,
      pay_switch_data: state => {
        let object1 = state.query.pay_switch_data.filter((o, i) => {
          return o.status === 0
        })
        return object1
      }
    }),
    ...mapGetters({
      count: 'jxk3_count',
      total_money: 'jxk3_total_money',
      coupon_face: 'coupon_face',
      coupon_id: 'coupon_id'
    })

  },
  updated: function () {
    if (this.period_remain_second < 1) {
      this.$store.dispatch('getLotteryStopTime', {name: 'JXK3'})
    }
    if ((this.total_money / this.follow_num) > 20000) {
      let _amount = this.amount - 1
      this.amountChange(_amount)
    }
  },
  filters: {
    anteCode: function ([ball, play_type]) {
      let type
      switch (play_type) {
        case '302': type = '111,222,333,444,555,666'
          break
        case '305': type = '123,234,345,456'
          break
        case '313': type = ball
          break
        case '314': type = ball + ',' + ball + ',*'
          break
        default: type = ball
      }
      return type
    },
    payIcon (v) {
      let s = ''
      switch (v) {
        case 0:
          s = 'icon-wechat'
          break
        case 1:
          s = 'icon-alipay'
          break
        case 3:
          s = 'icon-wechat'
          break
        case 4:
          s = 'icon-QQzhifu1'
          break
      }
      return s
    },
    payName (v) {
      let s = ''
      switch (v) {
        case 0:
          s = '微信支付'
          break
        case 1:
          s = '支付宝支付'
          break
        case 3:
          s = '微信支付'
          break
        case 4:
          s = 'QQ支付'
          break
      }
      return s
    }
  },
  mounted () {
  },
  methods: {
    routerBack () {
      // 返回上一级
      window.history.length > 2 ? this.$router.go(-1) : this.$router.push('/home')
    },
    rechargeType (i, s) {
      this.selectPayIndex = i
      // if (this.pay_switch_data[i].priority === 0) {
      //   return false
      // }
      // this.pay_switch_data.forEach(function (o, i) {
      //   o.priority = 1
      // })
      // this.pay_switch_data[i].priority = 0
    },
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
    },
    timeShow: function () {
      let period_remain_second = this.period_remain_second
      this.timer = setInterval(() => {
        if (period_remain_second > 0) {
          period_remain_second--
          let timeDistance = period_remain_second
          let hour = Math.floor(timeDistance / (60 * 60))
          timeDistance -= hour * (60 * 60)
          let minute = Math.floor(timeDistance / 60)
          timeDistance -= minute * 60
          let second = Math.floor(timeDistance)

          if (hour < 10) { hour = '0' + hour }
          if (minute < 10) { minute = '0' + minute }
          if (second < 10) { second = '0' + second }
          this.countdown = hour + ':' + minute + ':' + second
        } else {
          clearInterval(this.timer)
          this.lottery_period_temp = this.lottery_period
          {
            let self = this
            setTimeout(() => {
              self.$store.dispatch('getLotteryStopTime', {name: 'JXK3'})
                .then(() => {
                  self.timeShow()
                  this.centerDialogVisible = false
                })
            }, 3000)
          }
          this.centerDialogVisible = true
        }
      }, 1000)
    },
    randomBalls: function () {
      return new Promise((resolve, reject) => {
        this.init()
        let reds = parseInt(Math.random() * 14)
        this.balls_select(this.balls[reds])
        this.balls_selected_temp = this.balls_selected.join().split()
        resolve()
      })
    },
    addRandomBalls: function () {
      this.randomBalls().then(() => {
        const jxk3Obj = {}

        jxk3Obj.play_type = '312'
        jxk3Obj.ante_info = '和值'
        jxk3Obj.lottery_alias = 'JXK3'
        jxk3Obj.lottery_period = this.lottery_period
        jxk3Obj.ante_code = this.balls_selected_temp
        jxk3Obj.count = 1
        jxk3Obj.single_money = 2
        this.$store.dispatch('getJxk3', {obj: jxk3Obj})

        let tMoney = this.count * this.amount * this.follow_num * 2
        this.totalMoney(tMoney)
      })
    },
    clearCarts (item) {
      store.commit('jxk3_clear')
    },
    deleteCart (item, index) {
      this.jxk3.splice(index, 1)

      let tMoney = this.count * this.amount * this.follow_num * 2
      this.totalMoney(tMoney)
    },
    followNumChange (num) {
      if (num < this.follow_num) {
        this.moneyFlag = true
      }
      if (this.moneyFlag) {
        if (num <= 1) {
          store.commit('jxk3FollowNum', 1)
        } else {
          store.commit('jxk3FollowNum', num)
        }
      }
      this.follow_num_temp = this.follow_num
      this.follow_num_input = this.follow_num_input === '' ? '' : this.follow_num
      let tMoney = this.count * this.amount * this.follow_num * 2
      this.totalMoney(tMoney)
    },
    amountChange (num) {
      if (num < this.amount) {
        this.moneyFlag = true
      }
      if (this.moneyFlag) {
        if (num >= 99) {
          store.commit('jxk3Amount', 99)
          this.$refs.bTips.bottompopTips('至多投注99倍')
        } else if (num <= 1) {
          store.commit('jxk3Amount', 1)
          this.$refs.bTips.bottompopTips('至少投注1倍')
        } else {
          store.commit('jxk3Amount', num)
        }
      }
      this.amount_temp = this.amount
      this.amount_input = this.amount_input === '' ? '' : this.amount
      let tMoney = this.count * this.amount * this.follow_num * 2
      this.totalMoney(tMoney)
    },
    totalMoney (sum) {
      let sSum = sum / this.follow_num
      if (sSum <= 20000) {
      // 金额限制不超过20000元
        this.moneyFlag = true
      } else {
        this.moneyFlag = false
        this.$refs.bTips.bottompopTips('单张投注单最大投注金额不得超过20000元')
      }
      store.commit('jxk3TotalMoney', sum)
    },
    submit () {
      if (this.isClicked) {
        this.$refs.bTips.bottompopTips('正在加载中，请勿重复点击')
      } else {
        this.isClicked = true
        if (this.total_money > 0) {
          let minimum = this.total_money * 100 / this.follow_num
          this.$store.dispatch('getBetTotalMoney', minimum)
          this.$store.dispatch('getCoupon', {
            user_id: localStorage.user_id,
            alias: 'JXK3',
            coupon_status: 0,
            minimum: minimum
          }).then((res) => {
            this.topay_money = ((this.total_money * 100 - this.coupon_face) / 100).toFixed(2)
            this.isClicked = false
            this.isBalance()
            // this.popShow = true
          }).catch((err) => {
            this.$refs.bTips.bottompopTips('获取优惠券信息出错:' + err)
            this.isClicked = false
          })
        } else {
          this.$refs.bTips.bottompopTips('请先投注')
          this.isClicked = false
        }
      }
    },
    cancelSubmit () {
      this.popShow = false
      this.jxk3Tickets.splice(0, this.jxk3Tickets.length)
    },
    // 判断余额 与 购买金额大小
    isBalance () {
      let c = this.total_money * 100 >= this.balance + this.coupon_face ? (this.total_money * 100 - this.coupon_face - this.balance) : 0
      if (c > 300000) {
        this.centerDialogVisible = true
      } else {
        this.$store.dispatch('getLotteryStopTime', {name: 'JXK3'}).then(() => {
          // if (this.balance - this.topay_money * 100 >= 0) {
          this.jxk3.forEach(item => {
            switch (item.ante_info) {
              //   this.getBt2Tickets(item)
              //   break
              // case '三不同号':
              //   this.getBt3Tickets(item)
              //   break
              case '三同号单选':
                this.getT3Tickets(item)
                break
              default:
                const ticketObj = {}
                ticketObj.ante_code = (item.ante_code.indexOf('|') > -1) ? item.ante_code.join('') : item.ante_code.join(',')
                ticketObj.play_type = item.play_type
                ticketObj.total_money = item.single_money * 100
                this.jxk3Tickets.push(ticketObj)
            }
          })
          const alltickets = {}
          alltickets.tickets = this.jxk3Tickets

          let p1 = {
            user_id: localStorage.user_id,
            lottery_alias: 'JXK3',
            lottery_period: this.lottery_period,
            tickets: JSON.stringify(alltickets),
            amount: this.amount,
            total_money: this.total_money * 100,
            follow_num: this.follow_num,
            mark: '',
            coupon_id: this.coupon_id
          }

          // total_money * 100 * 100 >= balance + coupon_face ? (balance / 100).toFixed(2) : ((total_money
          let p2 = {
            total_money: this.total_money,
            balance: this.balance,
            coupon_face: this.coupon_face,
            period: this.lottery_period,
            name: 'jxk3',
            chineseName: '江西快3'
          }
          store.commit('PAY_DATA', [p1, p2, 'sz'])

          this.$router.push('/paydetail')

          // api.order({
          //   user_id: localStorage.user_id,
          //   lottery_alias: 'JXK3',
          //   lottery_period: this.lottery_period,
          //   tickets: JSON.stringify(alltickets),
          //   amount: this.amount,
          //   total_money: this.total_money * 100,
          //   follow_num: this.follow_num,
          //   mark: '',
          //   coupon_id: this.coupon_id
          // })
          //   .then(res => {
          //     if (res.errno === '0') {
          //     // 投注成功
          //       store.commit('orderMoney', this.total_money * 100)
          //       store.commit('orderLotteryAlias', 'JXK3')
          //       this.popShow = false
          //       this.isClicked2 = true
          //       store.state.jxk3.jxk3.splice(0, this.jxk3.length)
          //       store.commit('jxk3Amount', 1)
          //       store.commit('jxk3FollowNum', 1)
          //       // router.push({path: 'success', query: { order_id: res.data.order_id }})
          //       if (Number(res.data.needpay_money) > 0) {
          //         let recharge_info = {
          //           user_id: localStorage.user_id,
          //           pay_type: 1,
          //           subject: '微信支付',
          //           detail: '充值金额',
          //           total_amount: res.data.needpay_money,
          //           mark: '',
          //           platform: 1,
          //           service_type: 3,
          //           order_lst: res.data.order_id
          //         }
          //         let c = this.pay_switch_data.find((x) => {
          //           return x.priority === 0
          //         })
          //         if (c.pay_type === 0) {
          //           recharge_info.pay_type = 1
          //           recharge_info.subject = '微信支付'
          //         } else {
          //           recharge_info.pay_type = 2
          //           recharge_info.subject = '支付宝支付'
          //         }
          //         this.$store.dispatch('userCharge', recharge_info)
          //       } else {
          //         router.push({path: 'success', query: {order_id: res.data.order_id}})
          //       }
          //     } else {
          //     // 投注失败
          //       store.commit('lotteryOrderMsgErr', res.errmsg)
          //       this.popShow = false
          //       this.isClicked2 = true
          //       store.state.jxk3.jxk3.splice(0, this.jxk3.length)
          //       store.commit('jxk3Amount', 1)
          //       store.commit('jxk3FollowNum', 1)
          //       router.push('/fail')
          //     }
          //   })
          //   .catch(err => {
          //     if (err.msg) {
          //       console.log(err.msg)
          //     } else {
          //       console.log(err)
          //     }
          //   })
          // } else {
          //   router.push('/recharge')
          // }
        })
        // this.sureSubmit()
      }
    },
    bonusCombination (arr, num, fun) {
      /**
      * 排列组合算法（列举出数组里取出的元素， 并排成组合）
      **/
      if (arr.length < num || num > 10) {
        return []
      }
      let variable = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u']
      let replaceStr = '#$#'
      let str = 'var arr=arguments[0]; var fun=arguments[1];  var ret=[]; for (var a = 0; a < arr.length; a++) { ' + replaceStr + ' } return ret;'
      for (let i = 1; i < num; i++) {
        str = str.replace(replaceStr, ' for (var ' + variable[i] + ' =' + variable[i - 1] + '+ 1; ' + variable[i] + ' < arr.length; ' + variable[i] + '++) { ' + replaceStr + '  }')
      }
      let temp = 'var temp= [];'
      for (let i = 0; i < num; i++) {
        temp += 'temp.push(arr[' + variable[i] + ']);'
      }
      if (fun) {
        temp += 'ret.push(fun(temp)); '
      } else {
        temp += 'ret.push(temp);'
      }
      str = str.replace(replaceStr, temp)
      return (new Function(str)).apply(null, [arr, fun])
    },
    Coms: function (arr) {
      // 普通投注号
      const arr1 = arr.sort(function (a, b) { return a - b })
      // console.log(arr1)
      return (arr1.join(',').replace(/,/g, '').split())
    },
    getBt2Tickets (item) {
      // 二不同号拆单
      console.log('二不同号拆单', item.ante_code)
      if (item.ante_code.length === 2) {
        let ante_Code = this.Coms(item.ante_code)
        const ticketObj = {}
        ticketObj.ante_code = (ante_Code.indexOf('|') > -1) ? ante_Code.join('') : ante_Code.join(',')
        ticketObj.play_type = item.play_type
        ticketObj.total_money = item.single_money * 100
        this.jxk3Tickets.push(ticketObj)
      } else {
        let two_selected_arr = this.bonusCombination(item.ante_code, 2)
        // console.log(two_selected_arr)
        for (let i = 0; i < two_selected_arr.length; i++) {
          let ante_Code = this.Coms(two_selected_arr[i])
          const ticketObj = {}
          ticketObj.ante_code = (ante_Code.indexOf('|') > -1) ? ante_Code.join('') : ante_Code.join(',')
          ticketObj.play_type = item.play_type
          ticketObj.total_money = 2 * 100
          this.jxk3Tickets.push(ticketObj)
        }
      }
    },
    getBt3Tickets (item) {
      // 三不同号拆单
      console.log('三不同号拆单', item.ante_code)
      if (item.ante_code.length === 3) {
        const ticketObj = {}
        ticketObj.ante_code = (item.ante_code.indexOf('|') > -1) ? item.ante_code.join('') : item.ante_code.join(',')
        ticketObj.play_type = item.play_type
        ticketObj.total_money = item.single_money * 100
        this.jxk3Tickets.push(ticketObj)
      } else {
        let three_selected_arr = this.bonusCombination(item.ante_code, 3)
        // console.log(two_selected_arr)
        for (let i = 0; i < three_selected_arr.length; i++) {
          const ticketObj = {}
          ticketObj.ante_code = (three_selected_arr[i].indexOf('|') > -1) ? three_selected_arr[i].join('') : three_selected_arr[i].join(',')
          ticketObj.play_type = item.play_type
          ticketObj.total_money = 2 * 100
          this.jxk3Tickets.push(ticketObj)
        }
      }
    },
    getT3Tickets (item) {
      // 三同号单选拆单
      console.log('三同号单选拆单', item.ante_code)
      if (item.ante_code.length === 1) {
        const ticketObj = {}
        ticketObj.ante_code = (item.ante_code.indexOf('|') > -1) ? item.ante_code.join('') : item.ante_code.join(',')
        ticketObj.play_type = item.play_type
        ticketObj.total_money = item.single_money * 100
        this.jxk3Tickets.push(ticketObj)
      } else {
        // console.log(two_selected_arr)
        for (let i = 0; i < item.ante_code.length; i++) {
          const ticketObj = {}
          ticketObj.ante_code = (item.ante_code.slice(i, i + 1).indexOf('|') > -1) ? item.ante_code.slice(i, i + 1).join('') : item.ante_code.slice(i, i + 1).join(',')
          ticketObj.play_type = item.play_type
          ticketObj.total_money = 2 * 100
          this.jxk3Tickets.push(ticketObj)
        }
      }
    },
    sureSubmit () {
      if (this.isClicked2) {
        this.$refs.bTips.bottompopTips('正在加载中，请勿重复点击')
      } else {
        this.isClicked2 = true
        this.$store.dispatch('getLotteryStopTime', {name: 'JXK3'}).then(() => {
          // if (this.balance - this.topay_money * 100 >= 0) {
          this.jxk3.forEach(item => {
            switch (item.ante_info) {
              // case '二不同号':
              //   this.getBt2Tickets(item)
              //   break
              case '三不同号':
                this.getBt3Tickets(item)
                break
              case '三同号单选':
                this.getT3Tickets(item)
                break
              default:
                console.log('不拆单', item.ante_code)
                const ticketObj = {}
                ticketObj.ante_code = (item.ante_code.indexOf('|') > -1) ? item.ante_code.join('') : item.ante_code.join(',')
                ticketObj.play_type = item.play_type
                ticketObj.total_money = item.single_money * 100
                this.jxk3Tickets.push(ticketObj)
            }
          })
          const alltickets = {}
          alltickets.tickets = this.jxk3Tickets

          api.order({
            user_id: localStorage.user_id,
            lottery_alias: 'JXK3',
            lottery_period: this.lottery_period,
            tickets: JSON.stringify(alltickets),
            amount: this.amount,
            total_money: this.total_money * 100,
            follow_num: this.follow_num,
            mark: '',
            coupon_id: this.coupon_id
          })
            .then(res => {
              if (res.errno === '0') {
              // 投注成功
                store.commit('orderMoney', this.total_money * 100)
                store.commit('orderLotteryAlias', 'JXK3')
                this.popShow = false
                this.isClicked2 = true
                store.state.jxk3.jxk3.splice(0, this.jxk3.length)
                store.commit('jxk3Amount', 1)
                store.commit('jxk3FollowNum', 1)
                // router.push({path: 'success', query: { order_id: res.data.order_id }})
                if (Number(res.data.needpay_money) > 0) {
                  let recharge_info = {
                    user_id: localStorage.user_id,
                    pay_type: 1,
                    subject: '微信支付',
                    detail: '充值金额',
                    total_amount: res.data.needpay_money,
                    mark: '',
                    platform: 1,
                    service_type: 3,
                    order_lst: res.data.order_id
                  }
                  let c = this.pay_switch_data[this.selectPayIndex].pay_type
                  if (c === 0) {
                    recharge_info.pay_type = 1
                    recharge_info.subject = '微信支付'
                  } else if (c === 1) {
                    recharge_info.pay_type = 2
                    recharge_info.subject = '支付宝支付'
                  } else if (c === 3) {
                    recharge_info.pay_type = 4
                    recharge_info.subject = '微信二维码支付'
                  } else if (c === 4) {
                    recharge_info.pay_type = 5
                    recharge_info.subject = 'QQ支付'
                  }
                  this.$store.dispatch('userCharge', recharge_info)
                } else {
                  router.push({path: 'success', query: {order_id: res.data.order_id}})
                }
              } else {
              // 投注失败
                store.commit('lotteryOrderMsgErr', res.errmsg)
                this.popShow = false
                this.isClicked2 = true
                store.state.jxk3.jxk3.splice(0, this.jxk3.length)
                store.commit('jxk3Amount', 1)
                store.commit('jxk3FollowNum', 1)
                router.push('/fail')
              }
            })
            .catch(err => {
              if (err.msg) {
                console.log(err.msg)
              } else {
                console.log(err)
              }
            })
          // } else {
          //   router.push('/recharge')
          // }
        })
      }
    }
  }
}
</script>

<style scoped>
.m-top-title i {
  position: absolute;
  top: 50%;
  left: 2rem;
  -webkit-transform: translate(0,-50%);
  -moz-transform: translate(0,-50%);
  transform: translate(0,-50%);
}
.popup-wrap{
  width: 100%;
  bottom: 0;
  top: auto;
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  border-radius: 0;
  -webkit-transform: translate(-50%, 0);
  -moz-transform: translate(-50%, 0);
  transform: translate(-50%, 0);
}
.popup-wrap.middle {
  width: 80%;
  -webkit-border-radius: 1rem;
  -ms-border-radius: 1rem;
  border-radius: 1rem;
  top: 50%;
  bottom: auto;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.m-title-h3{
  border-bottom: none;
  padding: 0 1.5rem;
}
.m-title-h3 i{
  font-size: 2.6rem;
  color: #ddd;
  position: absolute;
  top: 0.5rem;
}
.m-title-h3 span{
  text-align: center;
  display: block;
}
.m-input code {
  font-size: 1.4rem;
  color: #999;
  float: right;
  text-align: right;
}
.m-input code.red{
  color: #e52222;
}
</style>
