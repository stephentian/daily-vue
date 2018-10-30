<template lang="html">
  <div id="payResult">
    <header class="m-top g-top-open">
      <h2 class="m-top-title tac"><i class="iconfont icon-arrow-left mr10" @click="routerBack"></i><span>支付</span></h2>
    </header>
    <div class="header-top-space"></div>
    <section class="g-bet-tool">
      <div class="payDetail">
        <ul>
          <li>
            <span class="gray3 ml15">彩种信息</span>
            <span class="gray6 fr mr15">{{chineseName}} {{ payPeriod ? '第' + payPeriod + '期' : ''}}</span>
          </li>
          <li>
            <span class="gray3 ml15">订单金额</span>
            <span class="red fr mr15">{{total_money.toFixed(2)}}元</span>
          </li>
          <li>
            <span class="gray3 ml15">余额抵扣</span>
            <span class="red fr mr15">{{total_money * 100 >= balance + coupon_face ? (balance / 100).toFixed(2) : ((total_money * 100 - coupon_face)/100).toFixed(2)}}元</span>
          </li>
          <li>
            <span class="gray3 ml15">优惠券</span>
            <span class="red fr mr15">{{(coupon_face / 100).toFixed(2)}}元</span>
          </li>
          <li>
            <span class="gray3 ml15">还需支付</span>
            <span class="red fr mr15">{{total_money * 100 >= balance + coupon_face ? ((total_money * 100 - coupon_face -  balance)/100).toFixed(2) : 0}}元</span>
          </li>
        </ul>
      </div>
    </section>
    <section class="payType mt5" v-if="total_money * 100 > balance + coupon_face">
      <div>
        <span class="ml15 gray3">选择支付方式</span>
      </div>
      <div>
        <ul>
          <li class="layoutFlex m-user-list" v-for="(item, index) in pay_switch_data" :key="index" @click="rechargeType(index, item.pay_type)" v-if="item.status === 0">
            <i class="iconfont " :class="item.pay_type | payIcon"></i>
            <span class="ml10">{{item.pay_type | payName}}</span>
            <span style="color:#e52222" v-if="item.pay_type === 4">(2元-980元)</span>
            <span class="fr mr15">
              <i class="radio" :class="index === selectPayIndex ? 'active' : ''"></i>
            </span>
          </li>
        </ul>
      </div>
    </section>
    <p class="red ml15 mt5">如无法支付，请联系客服热线：<a href="tel:0791-82309268" style="color: rgb(241, 44, 44); text-decoration: none;">0791-82309268</a></p>
    <div class="red ft12 ml15 mr15 mt5">
      <span class="tag-read" data-clipboard-text="jiangxijianhai@163.com" @click="copy">如您不便使用以上方式，还可转账至支付宝账号jiangxijianhai@163.com(点击复制)转账时请备注手机号并保留转账截图</span>
    </div>
    <section class="payBtn" @click="submit">
      <div class="tac bgColor">
        {{submitText}}
      </div>
    </section>
    <bottom-tips ref="bTips"></bottom-tips>
  </div>
</template>

<script>
import Clipboard from 'clipboard'
import router from '@/router/index.js'
import store from '@/store/index.js'
import { mapState } from 'vuex'
import api from '@/api/api'
import bottomTips from '@/components/bottom-tips/bottomTips'

export default {
  name: 'pay',
  data () {
    return {
      selectPayIndex: 0,
      isIosWebview: false,
      submitFlag: true,
      submitText: '确认支付'
    }
  },
  components: {
    bottomTips
  },
  beforeRouteEnter (to, from, next) {
    if (from.path === '/' || from.path.indexOf('cart') > -1 || from.path.indexOf('detail') > -1) {
      next()
    } else {
      next(vm => {
        vm.$router.push('/')
      })
    }
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
  computed: {
    ...mapState({
      pay_switch_data: state => {
        let object1 = state.query.pay_switch_data.filter((o, i) => {
          return o.status === 0
        })
        return object1
      },
      payData: state => {
        return state.common.payData[0] ? state.common.payData[0] : []
      },
      p2: state => {
        return state.common.payData[1] ? state.common.payData[1] : []
      },
      type: state => {
        return state.common.payData[2] ? state.common.payData[2] : []
      },
      // 未乘 100
      total_money: state => {
        return state.common.payData[1] ? state.common.payData[1].total_money : 0
      },
      balance: state => {
        return state.common.payData[1] ? state.common.payData[1].balance : 0
      },
      coupon_face: state => {
        return state.common.payData[1] ? state.common.payData[1].coupon_face : 0
      },
      name: state => {
        return state.common.payData[1] ? state.common.payData[1].name : 0
      },
      chineseName: state => {
        return state.common.payData[1] ? state.common.payData[1].chineseName : 0
      },
      payPeriod: state => {
        return state.common.payData[1] ? state.common.payData[1].period : 0
      },
      ssq: state => state.ssq.ssq,
      jxk3: state => state.jxk3.jxk3,
      dlt: state => state.dlt.dlt,
      dlc: state => state.dlt.dlc,
      d3: state => state.d3.d3,
      jczq: state => state.jczq.jczq
    })
  },
  created () {
    store.dispatch('getPay_swtich')
  },
  watch: {
    pay_switch_data (n, o) {
      let list1 = n.map((o, i) => {
        return o.priority
      })
      this.selectPayIndex = list1.indexOf(Math.min(...list1))
    }
  },
  methods: {
    routerBack () {
      // 返回上一级
      window.history.length > 2 ? this.$router.go(-1) : this.$router.push('/home')
    },
    rechargeType (i) {
      this.selectPayIndex = i
    },
    copy () {
      let clipboard = new Clipboard('.tag-read')
      clipboard.on('success', e => {
        this.$refs.bTips.bottompopTips('已复制支付宝账号')
        // 释放内存
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        // 不支持复制
        this.$refs.bTips.bottompopTips('该浏览器不支持复制')
        // 释放内存
        clipboard.destroy()
      })
    },
    submit () {
      // 新增
      let _self = this
      if (!this.submitFlag) {
        return false
      }
      this.submitText = '正在支付当中...'
      this.submitFlag = false
      if (this.type === 'sz') {
        api.order(_self.payData)
          .then(res => {
            if (res.errno === '0') {
            // 投注成功
              store.commit('orderMoney', this.total_money * 100)

              switch (_self.name) {
                case 'ssq':
                  store.commit('orderMoney', this.total_money * 100)
                  store.commit('orderLotteryAlias', 'ssq')
                  store.state.ssq.ssq.splice(0, this.ssq.length)
                  store.commit('ssqAmount', 1)
                  store.commit('ssqFollowNum', 1)
                  break
                case 'jxk3':
                  store.commit('orderMoney', this.total_money * 100)
                  store.commit('orderLotteryAlias', 'JXK3')
                  store.state.jxk3.jxk3.splice(0, this.jxk3.length)
                  store.commit('jxk3Amount', 1)
                  store.commit('jxk3FollowNum', 1)
                  break
                case 'dlt':
                  store.commit('orderMoney', this.total_money * 100)
                  store.commit('orderLotteryAlias', 'dlt')
                  store.state.dlt.dlt.splice(0, this.dlt.length)
                  store.commit('dltAmount', 1)
                  store.commit('dltFollowNum', 1)
                  break
                case 'dlc':
                  store.commit('orderMoney', this.total_money * 100)
                  store.commit('orderLotteryAlias', 'dlc')
                  store.state.dlt.dlt.splice(0, this.dlt.length)
                  store.commit('dlctAmount', 1)
                  store.commit('dlcFollowNum', 1)
                  break
                case '3d':
                  store.commit('orderMoney', this.total_money * 100)
                  store.commit('orderLotteryAlias', '3d')
                  store.state.d3.d3.splice(0, this.d3.length)
                  store.commit('d3Amount', 1)
                  store.commit('d3FollowNum', 1)
                  break
              }

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

                let g = this.pay_switch_data[this.selectPayIndex].pay_type
                if (g === 0) {
                  recharge_info.pay_type = 1
                  recharge_info.subject = '微信支付'
                } else if (g === 1) {
                  recharge_info.pay_type = 2
                  recharge_info.subject = '支付宝支付'
                } else if (g === 3) {
                  recharge_info.pay_type = 4
                  recharge_info.subject = '微信二维码支付'
                } else if (g === 4) {
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
              switch (_self.name) {
                case 'ssq':
                  store.state.ssq.ssq.splice(0, this.ssq.length)
                  store.commit('ssqAmount', 1)
                  store.commit('ssqFollowNum', 1)
                  break
                case 'jxk3':
                  store.state.jxk3.jxk3.splice(0, this.jxk3.length)
                  store.commit('jxk3Amount', 1)
                  store.commit('jxk3FollowNum', 1)
                  break
                case 'dlt':
                  store.state.dlt.dlt.splice(0, this.dlt.length)
                  store.commit('dltAmount', 1)
                  store.commit('dltFollowNum', 1)
                  break
                case 'dlc':
                  store.state.dlt.dlt.splice(0, this.dlt.length)
                  store.commit('dlctAmount', 1)
                  store.commit('dlcFollowNum', 1)
                  break
                case '3d':
                  store.state.d3.d3.splice(0, this.d3.length)
                  store.commit('d3Amount', 1)
                  store.commit('d3FollowNum', 1)
                  break
              }
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
      } else if (this.type === 'ft') {
        api.matchOrder(_self.payData)
          .then(res => {
            if (res.errno === '0') {
              store.commit('orderMoney', this.total_money * 100)
              store.commit('orderLotteryAlias', 'jczq')
              store.dispatch('getFTQuery', {game: 'FT', lottery_id: this.p2.lottery_id})
              store.commit('jczq_clear')

              // 如果余额不足 吊起微信支付
              if (Number(res.data.needpay_money) > 0) {
                let recharge_info = {
                  user_id: localStorage.user_id,
                  pay_type: 1,
                  subject: '微信支付',
                  detail: '充值金额',
                  total_amount: res.data.needpay_money,
                  mark: '',
                  platform: 1,
                  service_type: 2,
                  order_lst: res.data.order_lst
                }

                let g = this.pay_switch_data[this.selectPayIndex].pay_type
                if (g === 0) {
                  recharge_info.pay_type = 1
                  recharge_info.subject = '微信支付'
                } else if (g === 1) {
                  recharge_info.pay_type = 2
                  recharge_info.subject = '支付宝支付'
                } else if (g === 3) {
                  recharge_info.pay_type = 4
                  recharge_info.subject = '微信二维码支付'
                } else if (g === 4) {
                  recharge_info.pay_type = 5
                  recharge_info.subject = 'QQ支付'
                }

                this.$store.dispatch('userCharge', recharge_info)
              } else {
                router.push({path: 'success', query: {order_id: res.data.order_id, separate: res.data.separate}})
              }
            } else {
            // 投注失败
              store.commit('lotteryOrderMsgErr', res.errmsg)
              store.commit('jczq_clear')
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
      } else if (this.type === 'dzf') {
        if (this.total_money * 100 > this.balance + this.coupon_face) {
          let recharge_info = {
            user_id: localStorage.user_id,
            pay_type: 1,
            subject: '微信支付',
            detail: '充值金额',
            total_amount: this.total_money * 100 - this.coupon_face - this.balance,
            mark: '',
            platform: 1,
            service_type: 3,
            order_lst: _self.$route.query.order_id
          }

          let g = this.pay_switch_data[this.selectPayIndex].pay_type
          if (g === 0) {
            recharge_info.pay_type = 1
            recharge_info.subject = '微信支付'
          } else if (g === 1) {
            recharge_info.pay_type = 2
            recharge_info.subject = '支付宝支付'
          } else if (g === 3) {
            recharge_info.pay_type = 4
            recharge_info.subject = '微信二维码支付'
          } else if (g === 4) {
            recharge_info.pay_type = 5
            recharge_info.subject = 'QQ支付'
          }

          this.$store.dispatch('userCharge', recharge_info)
        } else {
          _self.payData.total_money = this.total_money * 100 - this.coupon_face
          api.order_pay(_self.payData)
            .then(res => {
              router.push({path: 'success', query: {order_id: _self.payData.order_lst}})
              store.commit('orderMoney', this.total_money - this.coupon_face)
            })
            .catch(err => {
              console.log(err)
            })
        }
      } else if (this.type === 'dzfzq') {
        if (this.total_money * 100 > this.balance + this.coupon_face) {
          let recharge_info = {
            user_id: localStorage.user_id,
            pay_type: 1,
            subject: '微信支付',
            detail: '充值金额',
            total_amount: this.total_money * 100 - this.coupon_face - this.balance,
            mark: '',
            platform: 1,
            service_type: 2,
            order_lst: _self.$route.query.order_id
          }

          let g = this.pay_switch_data[this.selectPayIndex].pay_type
          if (g === 0) {
            recharge_info.pay_type = 1
            recharge_info.subject = '微信支付'
          } else if (g === 1) {
            recharge_info.pay_type = 2
            recharge_info.subject = '支付宝支付'
          } else if (g === 3) {
            recharge_info.pay_type = 4
            recharge_info.subject = '微信二维码支付'
          } else if (g === 4) {
            recharge_info.pay_type = 5
            recharge_info.subject = 'QQ支付'
          }
          this.$store.dispatch('userCharge', recharge_info)
        } else {
          _self.payData.total_money = this.total_money * 100 - this.coupon_face
          api.order_pay(_self.payData)
            .then(res => {
              router.push({path: 'success', query: {order_id: _self.payData.order_lst}})
              store.commit('orderMoney', this.total_money - this.coupon_face)
            })
            .catch(err => {
              console.log(err)
            })
        }
      }
    }
  }
  // beforeCreate: function () {
  //   document.body.style.background = '#fff'
  // },
  // beforeDestroy: function () {
  //   document.body.style.background = '#f0f0f0'
  // }
}
</script>

<style lang="scss" scoped>
  .inlineBlock{
    display: inline-block;
  }
  $ft:1.33rem;
  #payResult{
    ul{
      li{
        height: 4.17rem;
        line-height: 4.17rem;
        border-bottom:0.5px solid #eee;
        font-size:$ft;
      }
    }
    .payDetail{
      background: #fff;
    }
    .payType{
      background: #fff;
      overflow: hidden;
      >div:first-child{
        height: 4.17rem;
        line-height: 4.17rem;
        font-size:$ft;
        border-bottom:0.5px solid #eee;
      }
      li{
        align-items: center;
        i{
          font-size:2.5rem;
        }
        span:last-child{
          flex:1;
          text-align: right;
        }
      }
    }
    .payBtn{
      >div{
        width: 80%;
        height: 3.38rem;
        line-height: 3.38rem;
        font-size:$ft;
        color:#fff;
        margin:2rem auto;
        border-radius: 3px;
      }
    }
  }
</style>
