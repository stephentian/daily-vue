<template lang="html">
  <div id="dlccart">
    <header class="m-top g-top-open">
      <h2 class="m-top-title tac"><i class="iconfont icon-arrow-left mr10" @click="routerBack"></i><span>11选5选号列表</span></h2>
    </header>
    <div class="header-top-space"></div>
    <section class="g-top-timebar">
      <div class="m-top-timebar">
        <!-- <p class="tac">11选5 第{{ lottery_period }}期 {{ lottery_stop_time }}（{{ lottery_stop_weekday }}）截止投注</p> -->
        <p class="tal">距离{{ lottery_period }}期投注截止：<span class="red">{{ countdown }}</span></p>
      </div>
    </section>
    <section class="g-bet-tool mt15">
      <ul class="m-bet-tool">
        <router-link tag="li" class="tac" to="/dlc"><i class="iconfont icon-shoudong1"></i> 自选号码</router-link>
        <li class="tac" @click="addRandomBalls"><i class="iconfont icon-jixuan"></i>机选1注</li>
      </ul>
    </section>
    <section class="g-bet-selected mt15">
      <div class="m-bet-selected">
        <ul class="m-bet-selected-lists box-shadow">
            <li class="m-bet-selected-list" v-for="(item, index) in dlc" :key="index">
              <i class="iconfont icon-fail" @click="deleteCart(item,index)"></i>
              <aside>
                <div class="group">
                  <em class="red mr5" v-for="(ball, i) in item.ante_code" :key="i">{{ ball }}</em>
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
    <!-- <section class="g-bottom-together layoutFlex">
      <div class="">
        <input type="checkbox" disabled checked id="myCheck">
        <span>中奖后停止追号</span>
        <button class="fr">发起合买</button>
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
      <!-- <div class="m-footer-bet-count tac">
        <span class="mr5">{{ count }}注</span>
        <span class="mr5">{{ amount }}倍</span>
        <span class="mr5">{{ follow_num }}期</span>
        <span class="mr5 red">{{ total_money }}元</span>
      </div>
      <button class="m-btn-bet" type="button" @click="submit" v-loading="isClicked">确定</button> -->
      <div class="layoutFlex m-footer-content">
        <div class="m-footer-clear tac ml5" style="padding-right: 0.5rem; border-right: 1px solid rgb(238, 238, 238);" @click="clearCarts">
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
           <!--  <div class="m-input">
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
  name: 'dlccart',
  components: {
    bottomTips
  },
  data () {
    return {
      reds: [], // 红球
      reds_selected: [], // 选中的球
      reds_selected_temp: [],
      follow_num_temp: 1,
      follow_num_input: 1, // 追期数
      amount_temp: 1,
      amount_input: 1, // 投注倍数
      moneyFlag: true, // 金额限制
      dlcTickets: [], // tickets号
      popShow: false, // 确认投注单提示框展示
      topay_money: 0, // 支付金额
      centerDialogVisible: false, // 充值提示框展示
      isClicked: false, // 确认投注单loading效果
      isClicked2: false, // 提交投注loading效果
      isIosWebview: false,
      selectPayIndex: 0,
      countdown: '00:00:00'
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
    this.$store.dispatch('getLotteryStopTime', {name: 'dlc'})
      .then(() => {
        this.timeShow()
      })
    this.$store.dispatch('getCoupon', {user_id: localStorage.user_id, alias: 'dlc', coupon_status: 0})
    this.$store.dispatch('getUserInfo', {'user_id': localStorage.user_id})
    store.commit('dlcAmount', 1)
    store.commit('dlcFollowNum', 1)
    this.popShow = false
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
      },
      period_remain_second: state => state.period.dlcStopTime.period_remain_second,
      dlc: state => state.dlc.dlc,
      lottery_period_dlc: state => state.dlc.lottery_period,
      ante_info: state => state.dlc.ante_info,
      ante_code: state => state.dlc.ante_code,
      play_type: state => state.dlc.play_type,
      amount: state => state.dlc.amount,
      follow_num: state => state.dlc.follow_num,
      balance: state => state.login.user_info.balance,
      pay_switch_data: state => {
        let object1 = state.query.pay_switch_data.filter((o, i) => {
          return o.status === 0
        })
        return object1
      }
    }),
    ...mapGetters({
      count: 'dlc_count',
      total_money: 'dlc_total_money',
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
      let reds = []
      for (let i = 1; i < 12; i++) {
        (i < 10) && (i = '0' + i)
        reds.push({num: i, isSelected: false})
      }
      this.$set(this, 'reds', reds)
      this.reds_selected.splice(0, this.reds_selected.length)
    },
    reds_select: function (item) {
      item.isSelected = !item.isSelected
      if (item.isSelected) {
        if (this.reds_selected.length < 1) {
          this.reds_selected.push(item.num)
        } else {
          item.isSelected = !item.isSelected
        }
      } else {
        for (let i = 0; i < this.reds_selected.length; i++) {
          (String(this.reds_selected[i]) === String(item.num)) && (this.reds_selected.splice(i, 1))
        }
      }
    },
    randomBalls: function () {
      // 随机球号
      return new Promise((resolve, reject) => {
        this.init()
        let reds = parseInt(Math.random() * 11)
        this.reds_select(this.reds[reds])
        this.reds_selected_temp = this.reds_selected.join().split()
        resolve()
      })
    },
    addRandomBalls: function () {
      // 添加球号
      this.randomBalls().then(() => {
        const dlcObj = {}

        dlcObj.play_type = '1'
        dlcObj.ante_info = '前一'
        dlcObj.lottery_alias = 'dlc'
        dlcObj.lottery_period = this.lottery_period
        dlcObj.ante_code = this.reds_selected_temp
        dlcObj.count = 1
        dlcObj.single_money = 2

        this.$store.dispatch('getDlc', {obj: dlcObj})

        let tMoney = this.count * this.amount * this.follow_num * 2
        this.totalMoney(tMoney)
      })
    },
    clearCarts (item) {
      // 清空投注单
      store.commit('dlc_clear')
    },
    deleteCart (item, index) {
      // 删除投注单中的一注投注号
      this.dlc.splice(index, 1)

      let tMoney = this.count * this.amount * this.follow_num * 2
      this.totalMoney(tMoney)
    },
    followNumChange (num) {
      // 追期数
      if (num < this.follow_num) {
        this.moneyFlag = true
      }
      if (this.moneyFlag) {
        if (num <= 1) {
          store.commit('dlcFollowNum', 1)
        } else {
          store.commit('dlcFollowNum', num)
        }
      }
      this.follow_num_temp = this.follow_num
      this.follow_num_input = this.follow_num_input === '' ? '' : this.follow_num
      let tMoney = this.count * this.amount * this.follow_num * 2
      this.totalMoney(tMoney)
    },
    amountChange (num) {
      // 投注倍数
      if (num < this.amount) {
        this.moneyFlag = true
      }
      if (this.moneyFlag) {
        if (num >= 99) {
          store.commit('dlcAmount', 99)
          this.$refs.bTips.bottompopTips('至多投注99倍')
        } else if (num <= 1) {
          store.commit('dlcAmount', 1)
          this.$refs.bTips.bottompopTips('至少投注1倍')
        } else {
          store.commit('dlcAmount', num)
        }
      }
      this.amount_temp = this.amount
      this.amount_input = this.amount_input === '' ? '' : this.amount
      let tMoney = this.count * this.amount * this.follow_num * 2
      this.totalMoney(tMoney)
    },
    totalMoney (sum) {
      // 总金额
      let sSum = sum / this.follow_num
      if (sSum <= 20000) {
      // 金额限制不超过20000元
        this.moneyFlag = true
      } else {
        this.moneyFlag = false
        this.$refs.bTips.bottompopTips('单张投注单最大投注金额不得超过20000元')
      }
      store.commit('dlcTotalMoney', sum)
    },
    submit () {
      // 提交投注
      if (this.isClicked) {
        this.$refs.bTips.bottompopTips('正在加载中，请勿重复点击')
      } else {
        this.isClicked = true
        // console.log("确认提交投注单");
        if (this.total_money > 0) {
          let minimum = this.total_money * 100 / this.follow_num
          this.$store.dispatch('getBetTotalMoney', minimum)
          this.$store.dispatch('getCoupon', {
            user_id: localStorage.user_id,
            alias: 'dlc',
            coupon_status: 0,
            minimum: minimum
          }).then((res) => {
            this.topay_money = ((this.total_money * 100 - this.coupon_face) / 100).toFixed(2)
            this.isClicked = false
            // this.popShow = true
            this.isBalance()
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
      // 取消投注
      this.popShow = false
      this.dlcTickets.splice(0, this.dlcTickets.length)
    },
    isBalance () {
      // 判断余额与购买金额大小
      let c = this.total_money * 100 >= this.balance + this.coupon_face ? (this.total_money * 100 - this.coupon_face - this.balance) : 0
      if (c > 300000) {
        this.centerDialogVisible = true
      } else {
        this.$store.dispatch('getLotteryStopTime', {name: 'dlc'}).then(() => {
          // if (this.balance - this.topay_money * 100 >= 0) {
          this.dlc.forEach(item => {
            const ticketObj = {}
            ticketObj.ante_code = (item.ante_code.indexOf('|') > -1) ? item.ante_code.join('') : item.ante_code.join(',')
            ticketObj.play_type = item.play_type
            ticketObj.total_money = item.single_money * 100
            this.dlcTickets.push(ticketObj)
          })
          const alltickets = {}
          alltickets.tickets = this.dlcTickets

          let p1 = {
            user_id: localStorage.user_id,
            lottery_alias: 'dlc',
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
            name: 'dlc',
            chineseName: '11选5'
          }
          store.commit('PAY_DATA', [p1, p2, 'sz'])

          this.$router.push('/paydetail')
          // api.order({
          //   user_id: localStorage.user_id,
          //   lottery_alias: 'dlc',
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
          //       store.commit('orderLotteryAlias', 'dlc')
          //       this.popShow = false
          //       this.isClicked2 = false
          //       store.state.dlc.dlc.splice(0, this.dlc.length)
          //       store.commit('dlcAmount', 1)
          //       store.commit('dlcFollowNum', 1)
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
          //       store.state.dlc.dlc.splice(0, this.dlc.length)
          //       store.commit('dlcAmount', 1)
          //       store.commit('dlcFollowNum', 1)
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
      // 确认投注单
      if (this.isClicked2) {
        this.$refs.bTips.bottompopTips('正在加载中，请勿重复点击')
      } else {
        this.isClicked2 = true
        this.$store.dispatch('getLotteryStopTime', {name: 'dlc'}).then(() => {
          // if (this.balance - this.topay_money * 100 >= 0) {
          this.dlc.forEach(item => {
            const ticketObj = {}
            ticketObj.ante_code = (item.ante_code.indexOf('|') > -1) ? item.ante_code.join('') : item.ante_code.join(',')
            ticketObj.play_type = item.play_type
            ticketObj.total_money = item.single_money * 100
            this.dlcTickets.push(ticketObj)
          })
          const alltickets = {}
          alltickets.tickets = this.dlcTickets

          api.order({
            user_id: localStorage.user_id,
            lottery_alias: 'dlc',
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
                store.commit('orderLotteryAlias', 'dlc')
                this.popShow = false
                this.isClicked2 = false
                store.state.dlc.dlc.splice(0, this.dlc.length)
                store.commit('dlcAmount', 1)
                store.commit('dlcFollowNum', 1)
                // router.push({path: 'success', query: { order_id: res.data.order_id }})
                if (Number(res.data.needpay_money) > 0) {
                  let recharge_info = {
                    user_id: localStorage.user_id,
                    pay_type: 1,
                    subject: '微信充值',
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
                this.isClicked2 = false
                store.state.dlc.dlc.splice(0, this.dlc.length)
                store.commit('dlcAmount', 1)
                store.commit('dlcFollowNum', 1)
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
    },
    timeShow: function () {
      // 倒计时
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
              self.$store.dispatch('getLotteryStopTime', {name: 'dlc'})
                .then(() => {
                  this.centerDialogVisible = false
                  this.timeShow()
                })
            }, 3000)
          }
          // this.centerDialogVisible = true
        }
      }, 1000)
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
