<template lang="html">
  <div id="d3cart">
    <header class="m-top g-top-open">
      <h2 class="m-top-title tac"><i class="iconfont icon-arrow-left mr10" @click="routerBack"></i><span>福彩3d选号列表</span></h2>
    </header>
    <div class="header-top-space"></div>
    <!-- <section class="g-top-timebar">
      <div class="m-top-timebar">
        <p class="tac">福彩3D 第{{ lottery_period }}期 {{ lottery_stop_time }}（{{ lottery_stop_weekday }}）截止投注</p>
      </div>
    </section> -->
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
        <router-link tag="li" class="tac" to="/3d"><i class="iconfont icon-shoudong1"></i> 自选号码</router-link>
        <li class="tac" @click="addRandomBalls"><i class="iconfont icon-jixuan"></i> 机选1注</li>
        <!-- <li class="tac" @click="clearCarts">清空列表</li> -->
      </ul>
    </section>
    <section class="g-bet-selected mt15">
      <div class="m-bet-selected">
        <ul class="m-bet-selected-lists box-shadow">
          <li class="m-bet-selected-list" v-for="(item, index) in d3" :key="index">
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
        <div class="m-footer-clear tac ml5" style="padding-right:0.5rem;border-right:1px solid #eee;" @click="clearCarts">
          <i class="iconfont icon-delete"></i>
          <span>清空</span>
        </div>
        <div class="m-footer-bet-count ml5">
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
import router from '@/router/index.js'
import store from '@/store/index.js'
import { mapState, mapGetters } from 'vuex'
import api from '@/api/api'
import bottomTips from '@/components/bottom-tips/bottomTips'

export default {
  name: 'd3cart',
  components: {
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
      ante_code_temp: '', // 选中的福彩3D
      follow_num_temp: 1,
      follow_num_input: 1, // 追期数
      amount_temp: 1,
      amount_input: 1, // 投注倍数
      moneyFlag: true, // 金额限制
      d3Tickets: [], // tickets号
      popShow: false, // 确认投注单提示框展示
      topay_money: 0, // 支付金额
      centerDialogVisible: false, // 充值提示框展示
      isClicked: false, // 确认投注单loading效果
      isClicked2: false, // 提交投注loading效果
      isIosWebview: false,
      selectPayIndex: 0
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
    this.$store.dispatch('getLotteryStopTime', {name: '3d'})
    this.$store.dispatch('getCoupon', {user_id: localStorage.user_id, alias: '3d', coupon_status: 0})
    this.$store.dispatch('getUserInfo', {'user_id': localStorage.user_id})
    store.commit('d3Amount', 1)
    store.commit('d3FollowNum', 1)
    this.popShow = false
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
      d3: state => state.d3.d3,
      lottery_period_d3: state => state.d3.lottery_period,
      pay_switch_data: state => {
        let object1 = state.query.pay_switch_data.filter((o, i) => {
          return o.status === 0
        })
        return object1
      },
      ante_info: state => state.d3.ante_info,
      ante_code: state => state.d3.ante_code,
      play_type: state => state.d3.play_type,
      amount: state => state.d3.amount,
      follow_num: state => state.d3.follow_num,
      balance: state => state.login.user_info.balance
    }),
    ...mapGetters({
      count: 'd3_count',
      total_money: 'd3_total_money',
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
    Coms: function () {
      // 普通投注选号拼接
      const arr1 = this.bai_selected
      const arr2 = this.shi_selected
      const arr3 = this.ge_selected
      const arr4 = arr1.concat(arr2, arr3)

      this.ante_code_temp = arr4
    },
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
    },
    bai_select: function (item) {
      // 百位球
      item.isSelected = !item.isSelected
      if (item.isSelected) {
        if (this.bai_selected.length < 1) {
          this.bai_selected.push(item.num)
        } else {
          item.isSelected = !item.isSelected
        }
      } else {
        for (let i = 0; i < this.bai_selected.length; i++) {
          (String(this.bai_selected[i]) === String(item.num)) && (this.bai_selected.splice(i, 1))
        }
      }
    },
    shi_select: function (item) {
      // 十位球
      item.isSelected = !item.isSelected
      if (item.isSelected) {
        if (this.shi_selected.length < 1) {
          this.shi_selected.push(item.num)
        } else {
          item.isSelected = !item.isSelected
        }
      } else {
        for (let i = 0; i < this.shi_selected.length; i++) {
          (String(this.shi_selected[i]) === String(item.num)) && (this.shi_selected.splice(i, 1))
        }
      }
    },
    ge_select: function (item) {
      // 个位球
      item.isSelected = !item.isSelected
      if (item.isSelected) {
        if (this.ge_selected.length < 1) {
          this.ge_selected.push(item.num)
        } else {
          item.isSelected = !item.isSelected
        }
      } else {
        for (let i = 0; i < this.ge_selected.length; i++) {
          (String(this.ge_selected[i]) === String(item.num)) && (this.ge_selected.splice(i, 1))
        }
      }
    },
    randomBalls: function () {
      // 随机球号
      return new Promise((resolve, reject) => {
        this.init()
        let bai = parseInt(Math.random() * 10)
        this.bai_select(this.bai[bai])
        let shi = parseInt(Math.random() * 10)
        this.shi_select(this.shi[shi])
        let ge = parseInt(Math.random() * 10)
        this.ge_select(this.ge[ge])

        this.Coms()
        resolve()
      })
    },
    addRandomBalls: function () {
      // 添加球号
      this.randomBalls().then(() => {
        this.Coms()
        const d3Obj = {}

        d3Obj.play_type = '201'
        d3Obj.ante_info = '直选投注'
        d3Obj.lottery_alias = '3d'
        d3Obj.lottery_period = this.lottery_period
        d3Obj.ante_code = this.ante_code_temp
        d3Obj.count = 1
        d3Obj.single_money = 2
        store.commit('D3', d3Obj)

        let tMoney = this.count * this.amount * this.follow_num * 2
        this.totalMoney(tMoney)
      })
    },
    clearCarts (item) {
      // 清空投注单
      store.commit('d3_clear')
    },
    deleteCart (item, index) {
      // 删除投注单中的一注投注号
      this.d3.splice(index, 1)

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
          store.commit('d3FollowNum', 1)
        } else {
          store.commit('d3FollowNum', num)
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
          store.commit('d3Amount', 99)
          this.$refs.bTips.bottompopTips('至多投注99倍')
        } else if (num <= 1) {
          store.commit('d3Amount', 1)
          this.$refs.bTips.bottompopTips('至少投注1倍')
        } else {
          store.commit('d3Amount', num)
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
      store.commit('d3TotalMoney', sum)
    },
    submit () {
      // 提交投注
      if (this.isClicked) {
        this.$refs.bTips.bottompopTips('正在加载中，请勿重复点击')
      } else {
        this.isClicked = true
        if (this.total_money > 0) {
          let minimum = this.total_money * 100 / this.follow_num
          this.$store.dispatch('getBetTotalMoney', minimum)
          this.$store.dispatch('getCoupon', {
            user_id: localStorage.user_id,
            alias: '3d',
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
      // 取消投注
      this.popShow = false
      this.d3Tickets.splice(0, this.d3Tickets.length)
    },
    isBalance () {
      // 判断余额与购买金额大小
      let c = this.total_money * 100 >= this.balance + this.coupon_face ? (this.total_money * 100 - this.coupon_face - this.balance) : 0
      if (c > 300000) {
        this.centerDialogVisible = true
      } else {
        // this.sureSubmit()

        this.$store.dispatch('getLotteryStopTime', {name: '3d'}).then(() => {
          // if (this.balance - this.topay_money * 100 >= 0) {
          this.d3.forEach(item => {
            const ticketObj = {}
            ticketObj.ante_code = item.ante_code.join(',')
            ticketObj.play_type = item.play_type
            ticketObj.total_money = item.single_money * 100
            this.d3Tickets.push(ticketObj)
          })
          const alltickets = {}
          alltickets.tickets = this.d3Tickets

          let p1 = {
            user_id: localStorage.user_id,
            lottery_alias: '3d',
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
            name: '3d',
            chineseName: '福彩3d'
          }
          store.commit('PAY_DATA', [p1, p2, 'sz'])

          this.$router.push('/paydetail')
        })
      }
    },
    sureSubmit () {
      // 确认投注单
      if (this.isClicked2) {
        this.$refs.bTips.bottompopTips('正在加载中，请勿重复点击')
      } else {
        this.isClicked2 = true
        this.$store.dispatch('getLotteryStopTime', {name: '3d'}).then(() => {
          // if (this.balance - this.topay_money * 100 >= 0) {
          this.d3.forEach(item => {
            const ticketObj = {}
            ticketObj.ante_code = item.ante_code.join(',')
            ticketObj.play_type = item.play_type
            ticketObj.total_money = item.single_money * 100
            this.d3Tickets.push(ticketObj)
          })
          const alltickets = {}
          alltickets.tickets = this.d3Tickets

          api.order({
            user_id: localStorage.user_id,
            lottery_alias: '3d',
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
                store.commit('orderLotteryAlias', '3d')
                this.popShow = false
                this.isClicked2 = false
                store.state.d3.d3.splice(0, this.d3.length)
                store.commit('d3Amount', 1)
                store.commit('d3FollowNum', 1)

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
                store.state.d3.d3.splice(0, this.d3.length)
                store.commit('d3Amount', 1)
                store.commit('d3FollowNum', 1)
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
