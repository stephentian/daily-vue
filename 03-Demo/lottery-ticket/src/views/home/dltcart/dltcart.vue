<template lang="html">
  <div id="dltcart">
    <header class="m-top g-top-open">
      <h2 class="m-top-title tac"><i class="iconfont icon-arrow-left mr10" @click="routerBack"></i><span>大乐透选号列表</span></h2>
    </header>
    <div class="header-top-space"></div>
    <section class="g-top-timebar">
      <div class="m-top-timebar">
        <p>
          {{ '第' + lottery_period }}期
          <span class="fr mr10">
            投注截止时间: <span>{{ lottery_stop_time }}</span>
          </span>
        </p>
      </div>
    </section>
    <section class="g-bet-tool mt15">
      <ul class="m-bet-tool">
        <router-link tag="li" class="tac" to="/dlt"><i class="iconfont icon-shoudong1"></i> 自选号码</router-link>
        <li class="tac" @click="addRandomBalls"><i class="iconfont icon-jixuan"></i> 机选1注</li>
      </ul>
    </section>
    <section class="g-bet-selected">
      <div class="m-bet-selected">
        <ul class="m-bet-selected-lists box-shadow">
          <template v-if="Object.keys(dlt_com).length > 0">
            <li class="m-bet-selected-list" v-for="(item, index) in dlt_com" :key="index">
              <i class="iconfont icon-fail" @click="deleteCart(item,index)"></i>
              <aside>
                <div class="group">
                  <em class="red mr5" v-for="(ball, i) in item.reds_selected" :key="i + '1'">{{ ball }}</em>
                  <em class="mr5">#</em>
                  <em class="blue mr5" v-for="(ball, i) in item.blues_selected" :key="i">{{ ball }}</em>
                </div>
                <p>
                  <span class="mr5">{{ item.ante_info }}</span>
                  <span class="mr5">{{ item.count }}注</span>
                  <span class="mr5">{{ item.single_money * betadd }}元</span>
                </p>
              </aside>
            </li>
          </template>
          <template v-if="Object.keys(dlt_dt).length > 0" v-for="(item, index) in dlt_dt">
            <li class="m-bet-selected-list"  :key="index">
              <i class="iconfont icon-fail" @click="deleteCart(item,index)"></i>
              <aside>
                <div class="group">
                  <em class="red mr5" v-for="(ball, i) in item.reds_dan_selected" :key="i">{{ ball }}</em>
                  <em class="mr5">$</em>
                  <em class="red mr5" v-for="(ball, i) in item.reds_tuo_selected" :key="i">{{ ball }}</em>
                  <em class="mr5">#</em>
                  <em class="blue mr5" v-for="(ball, i) in item.blues_dan_selected" :key="i">{{ ball }}</em>
                  <em class="mr5">$</em>
                  <em class="blue mr5" v-for="(ball, i) in item.blues_tuo_selected" :key="i">{{ ball }}</em>
                </div>
                <p>
                  <span class="mr5">{{ item.ante_info }}</span>
                  <span class="mr5">{{ item.count }}注</span>
                  <span class="mr5">{{ item.single_money * betadd }}元</span>
                </p>
              </aside>
            </li>
          </template>
        </ul>
      </div>
    </section>
    <section class="g-bet-agreement">
      <div class="m-bet-agreement">
        <i class="iconfont icon-checkbox-checked mr5"></i>
        <router-link to="/agreement">我已阅读并同意遵守多多中彩票规则</router-link>
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
    </section>
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
      <div class="layoutFlex m-footer-content" >
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
        <h3 class="m-title-h3"><span>温馨提示</span><i class="iconfont mr10" @click="centerDialogVisible = false">×</i></h3>
        <div style="text-align:center" class="mt15 ml15 mr15 mb20">
          <span class="tips">待支付金额过大，请前去充值！</span>
        </div>
        <div class="m-bottom-btn">
          <router-link tag="button" class="m-footer-btn bgColor" :to="{ name: 'recharge'}">前去充值</router-link>
        </div>
      </div>
    </div>
    <bottom-tips ref="bTips"></bottom-tips>
  </div>
</template>

<script>
import store from '@/store/index.js'
import { mapState, mapGetters } from 'vuex'
import bottomTips from '@/components/bottom-tips/bottomTips'

export default {
  name: 'dltcart',
  components: {
    bottomTips
  },
  data () {
    return {
      reds: [], // 红色球
      blues: [], // 蓝色球
      reds_selected: [], // 选中的红色球
      reds_selected_temp: [],
      blues_selected: [], // 选中的蓝色球
      blues_selected_temp: [],
      ante_code_temp: '', // 选中的大乐透
      follow_num_temp: 1,
      follow_num_input: 1,
      amount_temp: 1,
      amount_input: 1,
      delFlag: false,
      moneyFlag: true,
      betaddFlag: false,
      dltTickets: [],
      popShow: false,
      sureSubmitText: '',
      topay_money: 0,
      centerDialogVisible: false,
      isClicked: false,
      isClicked2: false,
      chargeType: true
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
    }
  },
  created () {
    this.isIosWebview = String(localStorage.getItem('iosWebview')) === 'true' || false
    this.$store.dispatch('getLotteryStopTime', {name: 'dlt'})
    this.$store.dispatch('getCoupon', {user_id: localStorage.user_id, alias: 'dlt', coupon_status: 0})
    this.$store.dispatch('getUserInfo', {'user_id': localStorage.user_id})
    store.commit('dltAmount', 1)
    store.commit('dltFollowNum', 1)
    this.popShow = false
    this.BetAddCheck()
  },
  computed: {
    ...mapState({
      lotteryStopTime: state => state.period.lotteryStopTime,
      lottery_period: state => state.period.lotteryStopTime.lottery_period,
      lottery_stop_time: state => state.period.lotteryStopTime.lottery_stop_time,
      lottery_stop_weekday: state => {
        if (state.period.lotteryStopTime.lottery_stop_time) {
          let time = state.period.lotteryStopTime.lottery_stop_time.replace(/-/g, '/')
          let day = new Date(time).getDay()
          let show_day = ['日', '一', '二', '三', '四', '五', '六']
          return show_day[day]
        }
      },
      period_remain_second: state => state.period.lotteryStopTime.period_remain_second,
      dlt: state => state.dlt.dlt,
      lottery_period_dlt: state => state.dlt.lottery_period,
      ante_info: state => state.dlt.ante_info,
      ante_code: state => state.dlt.ante_code,
      play_type: state => state.dlt.play_type,
      amount: state => state.dlt.amount,
      follow_num: state => state.dlt.follow_num,
      betadd: state => state.dlt.betadd,
      balance: state => state.login.user_info.balance,
      pay_switch_data: state => {
        let object1 = state.query.pay_switch_data.filter((o, i) => {
          return o.status === 0
        })
        return object1
      }
    }),
    ...mapGetters({
      dlt_com: 'dlt_com',
      dlt_dt: 'dlt_dt',
      count: 'dlt_count',
      total_money: 'dlt_total_money',
      coupon_face: 'coupon_face',
      coupon_id: 'coupon_id'
    })
  },
  updated: function () {
    if ((this.total_money / this.follow_num) > 20000) {
      let _amount = this.amount - 1
      this.amountChange(_amount)
    }
  },
  mounted () {
    let list1 = this.pay_switch_data.map((o, i) => {
      return o.priority
    })
    this.selectPayIndex = list1.indexOf(Math.min(...list1))
  },
  filters: {
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
  methods: {
    check: function () {
      if ((this.reds_selected.length >= 5) && (this.blues_selected.length >= 2)) {
        this.reds_selected.sort(function (a, b) { return a - b })
        this.blues_selected.sort(function (a, b) { return a - b })
      }
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
    routerBack () {
      // 返回上一级
      window.history.length > 2 ? this.$router.go(-1) : this.$router.push('/home')
    },
    Coms: function () {
      // 普通投注号
      const arr1 = this.reds_selected
      const arr2 = this.blues_selected
      const arr3 = arr1.concat(arr2)
      const c = arr1[arr1.length - 1] + '#' + arr2[0]

      arr3.splice(arr1.length - 1, 2, c)
      this.ante_code_temp = arr3

      const arr4 = arr3.join(',').replace(/[^0-9]/ig, ',').split(',')
      this.reds_selected_temp = arr4.splice(0, arr1.length)
      this.blues_selected_temp = arr4
    },
    init: function () {
      // 初始化
      let reds = []
      let blues = []
      for (let i = 1; i <= 35; i++) {
        (i < 10) && (i = '0' + i)
        reds.push({num: i, isSelected: false})
      }
      for (let j = 1; j <= 12; j++) {
        (j < 10) && (j = '0' + j)
        blues.push({num: j, isSelected: false})
      }
      this.$set(this, 'reds', reds)
      this.$set(this, 'blues', blues)
      this.reds_selected.length = 0
      this.blues_selected.length = 0
    },
    red_select: function (item, index) {
      item.isSelected = !item.isSelected
      if (item.isSelected) {
        this.reds_selected.push(item.num)
      } else {
        for (let i = 0; i < this.reds_selected.length; i++) {
          (String(this.reds_selected[i]) === String(item.num)) && (this.reds_selected.splice(i, 1))
        }
      }
      this.check()
    },
    blue_select: function (item) {
      item.isSelected = !item.isSelected
      if (item.isSelected) {
        this.blues_selected.push(item.num)
      } else {
        for (let i = 0; i < this.blues_selected.length; i++) {
          (String(this.blues_selected[i]) === String(item.num)) && (this.blues_selected.splice(i, 1))
        }
      }
      this.check()
    },
    randomBalls: function () {
      return new Promise((resolve, reject) => {
        this.init()
        while (this.reds_selected.length < 5) {
          let i = parseInt(Math.random() * 35)
          this.red_select(this.reds[i])
        }
        while (this.blues_selected.length < 2) {
          let j = parseInt(Math.random() * 12)
          this.blue_select(this.blues[j])
        }
        this.Coms()
        resolve()
      })
    },
    addRandomBalls: function () {
      this.randomBalls().then(() => {
        this.Coms()
        const dltObj = {}

        dltObj.play_type = '101'
        dltObj.ante_info = '基本单式投注'
        dltObj.lottery_alias = 'dlt'
        dltObj.lottery_period = this.lottery_period
        dltObj.reds_selected = this.reds_selected_temp
        dltObj.blues_selected = this.blues_selected_temp
        dltObj.ante_code = this.ante_code_temp
        dltObj.count = 1
        dltObj.single_money = 2
        store.commit('Dlt', dltObj)

        this.BetAddCheck()
        let tMoney = this.betadd * this.count * this.amount * this.follow_num * 2
        this.totalMoney(tMoney)
      })
    },
    clearCarts (item) {
      store.commit('dlt_clear')
    },
    deleteCart (item, index) {
      this.dlt.splice(index, 1)

      let tMoney = this.count * this.amount * this.follow_num * 2
      this.totalMoney(tMoney)
    },
    followNumChange (num) {
      if (num < this.follow_num) {
        this.moneyFlag = true
      }
      if (this.moneyFlag) {
        if (num <= 1) {
          store.commit('dltFollowNum', 1)
        } else {
          store.commit('dltFollowNum', num)
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
          store.commit('dltAmount', 99)
          this.$refs.bTips.bottompopTips('至多投注99倍')
        } else if (num <= 1) {
          store.commit('dltAmount', 1)
          this.$refs.bTips.bottompopTips('至少投注1倍')
        } else {
          store.commit('dltAmount', num)
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
      store.commit('dltTotalMoney', sum)
    },
    toggleCheckbox () {
      this.betaddFlag = !this.betaddFlag
      this.BetAddCheck()
    },
    BetAddCheck () {
      if (this.betaddFlag) {
        this.$store.dispatch('getDltBetAdd')
      } else {
        this.$store.dispatch('getDltBetRestore')
      }
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
            alias: 'dlt',
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
      this.dltTickets.splice(0, this.dltTickets.length)
    },
    isBalance () {
      // 判断余额与购买金额大小
      let c = this.total_money * 100 >= this.balance + this.coupon_face ? (this.total_money * 100 - this.coupon_face - this.balance) : 0
      if (c > 300000) {
        this.centerDialogVisible = true
      } else {
        // ss
        this.$store.dispatch('getLotteryStopTime', {name: 'dlt'}).then(() => {
          // if (this.balance - this.topay_money * 100 >= 0) {
          this.dlt.forEach(item => {
            const ticketObj = {}
            ticketObj.ante_code = item.ante_code.join(',')
            ticketObj.play_type = item.play_type
            ticketObj.total_money = item.single_money * this.betadd * 100
            this.dltTickets.push(ticketObj)
          })
          const alltickets = {}
          alltickets.tickets = this.dltTickets

          let p1 = {
            user_id: localStorage.user_id,
            lottery_alias: 'dlt',
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
            name: 'dlt',
            chineseName: '大乐透'
          }
          store.commit('PAY_DATA', [p1, p2, 'sz'])

          this.$router.push('/paydetail')

          // api.order({
          //   user_id: localStorage.user_id,
          //   lottery_alias: 'dlt',
          //   lottery_period: this.lottery_period,
          //   tickets: JSON.stringify(alltickets),
          //   amount: this.amount,
          //   total_money: this.total_money * 100,
          //   // order_id: "",
          //   follow_num: this.follow_num,
          //   mark: '',
          //   coupon_id: this.coupon_id
          // })
          //   .then(res => {
          //     if (res.errno === '0') {
          //       // 投注成功
          //       store.commit('orderMoney', this.total_money * 100)
          //       store.commit('orderLotteryAlias', 'dlt')
          //       this.popShow = false
          //       this.isClicked2 = false
          //       store.state.dlt.dlt.splice(0, this.dlt.length)
          //       store.commit('dltAmount', 1)
          //       store.commit('dltFollowNum', 1)
          //       // router.push('/success');
          //       // router.push({path: 'success', query: { order_id: res.data.order_id }})
          //       if (Number(res.data.needpay_money) > 0) {
          //         let recharge_info = {
          //           user_id: localStorage.user_id,
          //           pay_type: 1,
          //           subject: '微信充值',
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
          //       // 投注失败
          //       store.commit('lotteryOrderMsgErr', res.errmsg)
          //       this.popShow = false
          //       this.isClicked2 = false
          //       store.state.dlt.dlt.splice(0, this.dlt.length)
          //       store.commit('dltAmount', 1)
          //       store.commit('dltFollowNum', 1)
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
      }
    },
    sureSubmit () {
      if (this.isClicked2) {
        this.$refs.bTips.bottompopTips('正在加载中，请勿重复点击')
      } else {
        this.isClicked2 = true
        // this.$store.dispatch('getLotteryStopTime', {name: 'dlt'}).then(() => {
        //   // if (this.balance - this.topay_money * 100 >= 0) {
        //   this.dlt.forEach(item => {
        //     const ticketObj = {}
        //     ticketObj.ante_code = item.ante_code.join(',')
        //     ticketObj.play_type = item.play_type
        //     ticketObj.total_money = item.single_money * this.betadd * 100
        //     this.dltTickets.push(ticketObj)
        //   })
        //   const alltickets = {}
        //   alltickets.tickets = this.dltTickets

        //   api.order({
        //     user_id: localStorage.user_id,
        //     lottery_alias: 'dlt',
        //     lottery_period: this.lottery_period,
        //     tickets: JSON.stringify(alltickets),
        //     amount: this.amount,
        //     total_money: this.total_money * 100,
        //     // order_id: "",
        //     follow_num: this.follow_num,
        //     mark: '',
        //     coupon_id: this.coupon_id
        //   })
        //     .then(res => {
        //       if (res.errno === '0') {
        //         // 投注成功
        //         store.commit('orderMoney', this.total_money * 100)
        //         store.commit('orderLotteryAlias', 'dlt')
        //         this.popShow = false
        //         this.isClicked2 = false
        //         store.state.dlt.dlt.splice(0, this.dlt.length)
        //         store.commit('dltAmount', 1)
        //         store.commit('dltFollowNum', 1)
        //         // router.push('/success');
        //         // router.push({path: 'success', query: { order_id: res.data.order_id }})
        //         if (Number(res.data.needpay_money) > 0) {
        //           let recharge_info = {
        //             user_id: localStorage.user_id,
        //             pay_type: 1,
        //             subject: '微信充值',
        //             detail: '充值金额',
        //             total_amount: res.data.needpay_money,
        //             mark: '',
        //             platform: 1,
        //             service_type: 3,
        //             order_lst: res.data.order_id
        //           }
        //           let c = this.pay_switch_data.find((x) => {
        //             return x.priority === 0
        //           })
        //           if (c.pay_type === 0) {
        //             recharge_info.pay_type = 1
        //             recharge_info.subject = '微信支付'
        //           } else {
        //             recharge_info.pay_type = 2
        //             recharge_info.subject = '支付宝支付'
        //           }
        //           this.$store.dispatch('userCharge', recharge_info)
        //         } else {
        //           router.push({path: 'success', query: {order_id: res.data.order_id}})
        //         }
        //       } else {
        //         // 投注失败
        //         store.commit('lotteryOrderMsgErr', res.errmsg)
        //         this.popShow = false
        //         this.isClicked2 = false
        //         store.state.dlt.dlt.splice(0, this.dlt.length)
        //         store.commit('dltAmount', 1)
        //         store.commit('dltFollowNum', 1)
        //         router.push('/fail')
        //       }
        //     })
        //     .catch(err => {
        //       if (err.msg) {
        //         console.log(err.msg)
        //       } else {
        //         console.log(err)
        //       }
        //     })
        //   // } else {
        //   //   router.push('/recharge')
        //   // }
        // })
      }
    }
  }
}
</script>

<style lang="css" scoped>
.m-top-title i {
  position: absolute;
  top: 50%;
  left: 2rem;
  -webkit-transform: translate(0,-50%);
  -moz-transform: translate(0,-50%);
  transform: translate(0,-50%);
}
.footer-bottom-space {
  margin-bottom: 8.4rem;
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
  border-bottom: 1px solid #ccc;
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
