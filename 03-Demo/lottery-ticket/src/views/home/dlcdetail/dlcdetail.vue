<template lang="html">
  <div id="dlcdetail">
    <header class="m-top g-top-open">
      <h2 class="m-top-title tac"><i class="iconfont icon-arrow-left mr10" @click="routerBack"></i><span>投注详情</span></h2>
      <div class="m-top-txt">
        <router-link tag="i" class="iconfont icon-home-active" :to="{name: 'home'}"></router-link>
      </div>
    </header>
    <div class="header-top-space"></div>
    <section class="g-detail-bet">
      <div class="m-detail-bet">
        <div class="m-detail-title">
          <i class="ico-small lottery-dlc"></i>
          <h3 class="ml10">江西多乐彩</h3>
          <span class="ml15">第{{ lottery_period }}期<!--  {{ order_date }}（{{ order_weekday }}） --></span>
        </div>
        <div class="m-detail-txt mt10">
          <p class="mr10"><span class="mr10">订单金额</span><span class="mr10">{{ (total_money / 100).toFixed(2) }}元</span></p>
          <p class="mr10"><span class="mr10">中奖金额</span><span class="mr10">{{ (bonus_money / 100).toFixed(2) }}元</span></p>
        </div>
        <div class="m-detail-txt mt5">
          <p class="mr10"><span class="mr10">订单状态</span><span class="mr10">{{ order_status_txt }}</span></p>
          <p class="mr10"><span v-if="order_status === 0" @click="payOrder" class="mr10 m-detail-btn tac red">立即支付</span><span @click="deleteOrder" class="mr10 m-detail-btn tac" v-if="order_status === 0">删除订单</span></p>
        </div>
        <div class="m-detail-txt mt5">
          <p class="mr10">
            <span class="mr10">开奖号码</span>
            <span class="mr10" v-if="order_status_txt === '未中奖' || order_status_txt === '已中奖'">{{ bonus_code }}</span>
            <span class="mr10" v-else>---</span>
          </p>
        </div>
      </div>
    </section>
    <section class="g-detail-selected mt15">
      <h5 class="mb5">选号详情</h5>
      <aside class="m-detail-selected" v-if="tickets" v-for="(item, index) in tickets" :key="index">
        <div>
          <span class="mr10">{{ item.play_type | play_type }}{{ amount }}倍</span>
          <div class="group">
            <em class="gray9 mr5">{{ item.ante_code }}</em>
          </div>
        </div>
        <div>
          <span class="mr10">{{ item.ticket_status | ticket_status }}</span>
          <span class="red fr" v-if="item.bonus_money > 0">中奖{{ item.bonus_money / 100 }}元</span>
          <span class="gray9 fr" v-else>---</span>
        </div>
      </aside>
    </section>
    <section>
      <a @click="linkto">
        <img style="width:90%;display:inline-block;margin-left:5%;" src="https://cstatic.duoduocp.cn/cdd/p/other/iOS@2x.png" alt="">
      </a>
    </section>
    <section class="g-detail-order mt15">
      <div class="m-input">
        <label>下单时间</label><code>{{ order_time }}</code>
      </div>
      <div class="m-input">
        <label>订单编号</label><code>{{ order_id }}</code>
      </div>
      <div class="m-input">
        <label>支付信息</label><code>优惠券支付{{ coupon_money / 100 }}元，余额支付{{ (total_money - coupon_money) / 100 }}元</code>
      </div>
    </section>
    <div class="popup-box" v-show="popShow">
      <div class="popup-wrap bottom-popup">
        <h3 class="m-title-h3"><i class="iconfont mr10" @click="cancleSubmit">×</i><span>支付详情</span></h3>
        <div class="popup-money mt10 tac">
          {{((total_money - balance - coupon_money)/100).toFixed(2) + '元'}}
        </div>
        <section class="ml15 mr15 mb20 chargeType">
          <h5 class="m-title-h5">请选择支付方式</h5>
          <aside class="m-user-list" v-for="(item, index) in pay_switch_data" :key="index" @click="rechargeType(index, item.pay_type)" v-show="!((item.pay_type === 1) && isIosWebview)">
            <i class="iconfont " :class="item.pay_type | payIcon"></i>
            <span class="ml10">{{item.pay_type | payName}}</span>
            <i class="radio" :class="index === selectPayIndex ? 'active' : ''"></i>
          </aside>
          <p class="red">如无法支付，请联系客服热线：<a href="tel:0791-82309268" style="color: rgb(241, 44, 44); text-decoration: none;">0791-82309268</a></p>
        </section>
        <button class="m-footer-btn bgColor"  @click="payFnc">立即支付</button>
      </div>
    </div>
    <h5 class="m-title-h5 tac mt5">
      <router-link class="blue tdl" to="/dlcWay">中奖如何计算？</router-link>
    </h5>
    <div class="footer-bottom-space"></div>
    <footer class="m-footer box-shadow">
      <div class="m-footer-delete" v-if="order_status === 0">
        <div class="tac" @click="deleteOrder">
          删除订单
        </div>
        <div>
          <div class="m-bottom-btn">
            <div @click="payOrder" class="m-footer-btn tac bgColor">立即支付</div>
          </div>
        </div>
      </div>
      <div  v-else class="m-bottom-btn">
        <button class="m-bottom-btn-red" type="button" @click="submit" v-loading="isDigClicked">继续投注本次号码</button>
        <router-link tag="button" class="m-bottom-btn-white" to="/dlc">11选5投注</router-link>
      </div>
    </footer>
    <bottom-tips ref="bTips"></bottom-tips>
  </div>
</template>

<script>
import router from '@/router/index.js'
import store from '@/store/index.js'
import { mapState } from 'vuex'
import bottomTips from '@/components/bottom-tips/bottomTips'
import { MessageBox } from 'mint-ui'

export default {
  name: 'dlcdetail',
  components: {
    bottomTips
  },
  data () {
    return {
      order_id: this.$route.query.order_id,
      isDigClicked: false,
      count: 0,
      recharge_info: {
        user_id: localStorage.user_id,
        pay_type: 1,
        subject: '微信待付',
        detail: '充值金额',
        total_amount: '',
        mark: '',
        platform: 1,
        service_type: 3,
        order_lst: this.$route.query.order_id
      },
      popShow: false,
      chargeType: true,
      isIosWebview: false,
      selectPayIndex: 0
    }
  },
  created () {
    this.isIosWebview = String(localStorage.getItem('iosWebview')) === 'true' || false
    this.$store.dispatch('getuserOrder', {user_id: localStorage.user_id, order_status: -1, order_id: this.order_id})
    this.$store.dispatch('getUserInfo', {'user_id': localStorage.user_id})
  },
  mounted () {
    let list1 = this.pay_switch_data.map((o, i) => {
      return o.priority
    })
    this.selectPayIndex = list1.indexOf(Math.min(...list1))
  },
  computed: {
    ...mapState({
      userOrder: state => state.userOrder.userOrder,
      lottery_period: state => state.userOrder.userOrder.lottery_period,
      order_date: state => {
        let order_date = new Date(state.userOrder.userOrder.order_time)
        return order_date.getFullYear() + '-' + (order_date.getMonth() + 1) + '-' + order_date.getDate()
      },
      order_time: state => {
        let order_time = new Date(state.userOrder.userOrder.order_time)
        if (state.userOrder.userOrder) {
          return order_time.toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
        } else {
          return '---'
        }
      },
      order_weekday: state => {
        let day = new Date(state.userOrder.userOrder.order_time).getDay()
        let show_day = ['日', '一', '二', '三', '四', '五', '六']
        return show_day[day]
      },
      order_status: state => {
        if (state.userOrder.userOrder) {
          return state.userOrder.userOrder.order_status
        } else {
          return -1
        }
      },
      order_status_txt: state => {
        //  0.待支付 1.支付成功/等待出票 2.出票成功/等待开奖 3.出票失败/等待退款 4.已退款 5.未中奖 6.已中奖
        let order_status = ['待支付', '支付成功/等待出票', '出票成功/等待开奖', '.出票失败/等待退款', '已退款', '未中奖', '已中奖', '部分出票成功/待开奖']
        return order_status[state.userOrder.userOrder.order_status]
      },
      tickets: state => {
        if (state.userOrder.userOrder) {
          return JSON.parse(state.userOrder.userOrder.tickets).tickets
        } else {
          return []
        }
      },
      order_tickets: state => state.userOrder.userOrder.tickets,
      total_money: state => state.userOrder.userOrder.total_money,
      bonus_money: state => state.userOrder.userOrder.bonus_money,
      amount: state => state.userOrder.userOrder.amount,
      coupon_money: state => state.userOrder.userOrder.coupon_money,
      balance: state => state.login.user_info.balance,
      lottery_period_new: state => state.period.dlcStopTime.lottery_period,
      pay_switch_data: state => {
        let object1 = state.query.pay_switch_data.filter((o, i) => {
          return o.status === 0
        })
        return object1
      },
      bonus_code: state => {
        if (state.period_info.periodInfos.length > 0) {
          return state.period_info.periodInfos[0].bonus_code
        } else {
          return '无数据'
        }
      }
    })
  },
  filters: {
    play_type: function (play_type) {
      let x
      switch (play_type) {
        case '1': x = '前一'
          break
        case '2': x = '任选二'
          break
        case '3': x = '任选三'
          break
        case '4': x = '任选四'
          break
        case '5': x = '任选五'
          break
        case '6': x = '任选六'
          break
        case '7': x = '任选七'
          break
        case '8': x = '任选八'
          break
        case '9': x = '前二直选'
          break
        case '10': x = '前三直选'
          break
        case '11': x = '前二组选'
          break
        case '12': x = '前三组选'
          break
      }
      return x
    },
    ticket_status: function (ticket_status) {
      //  0.待支付 1.支付成功/等待出票 2.出票成功/等待开奖 3.出票失败/等待退款 4.已退款 5.未中奖 6.已中奖
      let x
      switch (ticket_status) {
        case 0: x = '待支付'
          break
        case 1: x = '支付成功/等待出票'
          break
        case 2: x = '出票成功/等待开奖'
          break
        case 3: x = '出票失败/等待退款'
          break
        case 4: x = '已退款'
          break
        case 5: x = '未中奖'
          break
        case 6: x = '已中奖'
          break
      }
      return x
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
  methods: {
    linkto () {
      try {
        if (window.location.href.includes('m.duoduocp')) {
          window.webkit.messageHandlers.iosBannerIndex.postMessage('https://m.duoduocp.cn/p/inviteApp/indexrule.html')
        } else {
          window.webkit.messageHandlers.iosBannerIndex.postMessage('https://h5-client.wangzheka.cn//p/inviteApp/indexrule.html')
        }
      } catch (err) {
        if (window.location.href.includes('m.duoduocp')) {
          window.top.location.href = 'https://m.duoduocp.cn/p/inviteApp/indexrule.html'
        } else {
          window.top.location.href = 'https://h5-client.wangzheka.cn//p/inviteApp/indexrule.html'
        }
      }
    },
    payFnc () {
      // let c = this.pay_switch_data.find((x) => {
      //   return x.priority === 0
      // })
      let c = this.pay_switch_data[this.selectPayIndex].pay_type
      if (c === 0) {
        this.recharge_info.pay_type = 1
        this.recharge_info.subject = '微信支付'
      } else if (c === 1) {
        this.recharge_info.pay_type = 2
        this.recharge_info.subject = '支付宝支付'
      } else if (c === 3) {
        this.recharge_info.pay_type = 4
        this.recharge_info.subject = '微信二维码支付'
      } else if (c === 4) {
        this.recharge_info.pay_type = 5
        this.recharge_info.subject = 'QQ支付'
      }
      this.$store.dispatch('userCharge', this.recharge_info)
    },
    cancleSubmit () {
      this.popShow = false
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
    deleteOrder () {
      MessageBox.confirm('您确定要删除该订单吗？删除后将不能恢复', '确认删除', true).then(action => {
        this.$store.dispatch('deleteWaitOrder', {user_id: localStorage.user_id, order_type: 2, order_lst: this.order_id}).then((res) => {
          if (res) {
            window.history.length > 2 ? this.$router.go(-1) : this.$router.push('/home')
          }
        })
      }).catch((error) => {
        console.log(error)
      })
    },
    payOrder () {
      this.$set(this.recharge_info, 'total_amount', this.total_money - this.balance - this.coupon_money)
      store.commit('orderLotteryAlias', 'dlc')
      let p1 = {
        user_id: localStorage.user_id,
        total_money: this.total_money - this.coupon_money,
        order_type: 2,
        order_lst: this.order_id
      }
      let p2 = {
        total_money: parseInt(this.total_money / 100),
        balance: this.balance,
        coupon_face: this.coupon_money,
        period: this.lottery_period,
        name: 'dlc',
        chineseName: '11选5'
      }
      store.commit('PAY_DATA', [p1, p2, 'dzf'])
      store.commit('orderMoney', this.total_money)
      this.$router.push({path: '/paydetail', query: {order_id: this.$route.query.order_id}})
      // if (this.total_money > this.balance + this.coupon_money) {
      //   // let ce = ((this.total_money - this.balance - this.coupon_money) / 100).toFixed(2)
      //   // // 如果金额不足 调用微信支付
      //   // MessageBox.confirm('这笔订单还差' + ce + '元 是否前往支付?', '确认支付', true).then(action => {
      //   //   this.$store.dispatch('userCharge', this.recharge_info)
      //   // }).catch((error) => {
      //   //   console.log(error)
      //   // })
      //   this.popShow = true
      // } else {
      //   MessageBox.confirm('您确认要支付该笔订单吗?支付后将从账户扣除相应金额', '确认支付', true).then(action => {
      //     api.order_pay({
      //       user_id: localStorage.user_id,
      //       total_money: this.total_money - this.coupon_money,
      //       order_type: 2,
      //       order_lst: this.order_id
      //     })
      //       .then(res => {
      //         router.push({path: 'success', query: {order_id: this.order_id}})
      //         store.commit('orderMoney', this.total_money - this.coupon_money)
      //       })
      //       .catch(err => {
      //         console.log(err)
      //       })
      //   }).catch((error) => {
      //     console.log(error)
      //   })
      // }
    },
    routerBack () {
      // 返回上一级
      window.history.length > 2 ? this.$router.go(-1) : this.$router.push('/home')
    },
    ToAnteinfo (play_type) {
      let x
      switch (play_type) {
        case '1': x = '前一'
          break
        case '2': x = '任选二'
          break
        case '3': x = '任选三'
          break
        case '4': x = '任选四'
          break
        case '5': x = '任选五'
          break
        case '6': x = '任选六'
          break
        case '7': x = '任选七'
          break
        case '8': x = '任选八'
          break
        case '9': x = '前二直选'
          break
        case '10': x = '前三直选'
          break
        case '11': x = '前二组选'
          break
        case '12': x = '前三组选'
          break
      }
      return x
    },
    combinations (m, n) {
      // 排列组合
      if (!n || n < 1) {
        return []
      }

      let resultArrs = []
      let flagArr = []
      let isEnd = false
      let i
      let j
      let leftCnt

      for (i = 0; i < m; i++) {
        flagArr[i] = i < n ? 1 : 0
      }

      resultArrs.push(flagArr.concat())

      while (!isEnd) {
        leftCnt = 0
        for (i = 0; i < m - 1; i++) {
          if (flagArr[i] === 1 && flagArr[i + 1] === 0) {
            for (j = 0; j < i; j++) {
              flagArr[j] = j < leftCnt ? 1 : 0
            }
            flagArr[i] = 0
            flagArr[i + 1] = 1
            let aTmp = flagArr.concat()
            resultArrs.push(aTmp)
            if (aTmp.slice(-n).join('').indexOf('0') === -1) {
              isEnd = true
            }
            break
          }
          flagArr[i] === 1 && leftCnt++
        }
      }
      return resultArrs.length
    },
    submit () {
      if (this.isDigClicked) {
        this.$refs.bTips.bottompopTips('已经被点击了，请勿重复点击')
      } else {
        let beforeDone = () => (new Promise((resolve, reject) => {
          this.isDigClicked = true

          this.tickets.forEach(item => {
            let tickets = item
            let play_type = tickets.play_type
            let ante_info = this.ToAnteinfo(play_type)
            let ante_code = tickets.ante_code
            const dlcObj = {}

            dlcObj.play_type = play_type
            dlcObj.ante_info = ante_info
            dlcObj.lottery_alias = 'dlc'
            dlcObj.lottery_period = this.lottery_period
            dlcObj.ante_code = ante_code.split(',')
            dlcObj.single_money = item.total_money / 100

            let play_type_arr = ['1', '2', '3', '4', '5', '6', '7', '8']
            if (play_type_arr.indexOf(play_type) > -1) {
              let ante_code_arr = ante_code.split(',')
              let ante_code_len = ante_code_arr.length

              if (play_type === '1') {
                this.count = ante_code_len
              } else {
                this.count = (ante_code_len > Number(play_type)) ? this.combinations(ante_code_len, Number(play_type)) : 1
              }
            } else {
              this.count = 1
            }

            dlcObj.count = this.count
            this.canSubmit = false
            if (localStorage.token) {
              store.commit('Dlc', dlcObj)
            }
          })
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

<style lang="css" scoped>
.m-top-title i {
  position: absolute;
  top: 50%;
  left: 2rem;
  -webkit-transform: translate(0,-50%);
  -moz-transform: translate(0,-50%);
  transform: translate(0,-50%);
}
</style>
