<template lang="html">
  <div>
    <header class="m-top g-top-user box-shadow">
      <h2 class="m-top-title tal ml20"><i @click="back" class="iconfont icon-arrow-left mr10"></i><span>充值</span></h2>
    </header>
    <div class="header-top-space"></div>
    <section class="g-user-info">
      <div class="m-user-info">
        <h3>昵称：{{ user_info.phone_number }}</h3>
        <p class="mt10">
          <span>账户余额：{{ getAmount(user_info.balance) }} 元</span>
          <span>游戏币：{{ user_info.game_coin }}</span>
        </p>
      </div>
    </section>
    <section class="g-pay-lists">
      <h5 class="m-title-h5 ml20">请选择充值金额<span style="color:rgb(250,0,0);">(单笔2元 - 3000元)</span></h5>
      <div class="m-pay-list">
        <div class="m-pay-list-box">
          <ul class="m-pay-list-box-wrap">
            <li>
              <input @click="rechage1" :class="{active: charge_amount === 50}" class="tac" type="text" value="50元" readonly>
              <input @click="rechage2" :class="{active: charge_amount === 100}" class="tac" type="text" value="100元" readonly>
            </li>
            <li>
              <input @click="rechage3" :class="{active: charge_amount === 200}" class="tac" type="text" value="200元" readonly>
              <input @click="rechage4" :class="{active: charge_amount === 500}" class="tac" type="text" value="500元" readonly>
            </li>
            <li>
              <input v-model="charge_amount" :class="{active: isSelect}" class="tac m-pay-list-last" type="text" oninput="" placeholder="其他金额" maxlength="10">
            </li>
          </ul>
        </div>
      </div>
    </section>
    <section class="g-pay-way">
      <h5 class="m-title-h5 ml20">请选择支付方式</h5>
      <aside class="m-user-list" v-for="(item, index) in pay_switch_data" :key="index" @click="rechargeType(index, item.pay_type)" v-if="item.status === 0">
        <i class="iconfont " :class="item.pay_type | payIcon"></i>
        <span class="ml10">{{item.pay_type | payName}}</span>
        <span style="color:#e52222" v-if="item.pay_type === 4">(2元-980元)</span>
        <span class="fr mr15">
          <i class="radio" :class="index === selectPayIndex ? 'active' : ''"></i>
        </span>
      </aside>
    </section>
    <p class="red ml15 mt5">如无法支付，请联系客服热线：<a href="tel:0791-82309268" style="color: rgb(241, 44, 44); text-decoration: none;">0791-82309268</a></p>
    <div class="red ft12 ml15 mr15 mt5">
      <span class="tag-read" data-clipboard-text="jiangxijianhai@163.com" @click="copy">如您不便使用以上方式，还可转账至支付宝账号jiangxijianhai@163.com(点击复制)转账时请备注手机号并保留转账截图</span>
    </div>
    <div class="footer-bottom-space"></div>
    <footer class="m-footer">
      <button @click.prevent="makeCharge" :disabled="isDisableFn" class="m-footer-btn bgColor" id="" type="button">{{submitText}}</button>
    </footer>
    <bottom-tips ref="bTips"></bottom-tips>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Clipboard from 'clipboard'
import bottomTips from '@/components/bottom-tips/bottomTips'
import store from '@/store/index.js'

export default {
  data: () => ({
    recharge_info: {
      user_id: localStorage.user_id,
      pay_type: 1,
      subject: '微信充值',
      detail: '充值金额',
      total_amount: '',
      mark: '',
      platform: 1,
      service_type: 1
    },
    submitFlag: true,
    submitText: '充值',
    redirectUrl: '',
    charge_amount: 50,
    isSelect: true,
    wxBrowser: false,
    isDisable: false,
    isIosWebview: false,
    selectPayIndex: 0
  }),
  components: {
    bottomTips
  },
  watch: {
    pay_switch_data (n, o) {
      let list1 = n.map((o, i) => {
        return o.priority
      })
      this.selectPayIndex = list1.indexOf(Math.min(...list1))
    }
  },
  beforeRouteEnter (to, from, next) {
    if (from.path.indexOf('my') > -1 || from.path.indexOf('cart') > -1) {
      next()
    } else {
      next(vm => {
        vm.$router.push('/my')
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
      user_info: state => state.login.user_info,
      pay_switch_data: state => {
        let object1 = state.query.pay_switch_data.filter((o, i) => {
          return o.status === 0
        })
        return object1
      }
    }),
    isDisableFn () {
      if (this.charge_amount < 2) {
        return true
        // return this.isDisable = true
      } else {
        return false
        // return this.isDisable = false
      }
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    rechargeType (i, s) {
      // if (this.pay_switch_data[i].priority === 0) {
      //   return false
      // }
      // this.pay_switch_data.forEach(function (o, i) {
      //   o.priority = 1
      // })
      // this.pay_switch_data[i].priority = 0
      this.selectPayIndex = i
    },
    getAmount (amount) {
      return (amount * 0.01).toFixed(2)
    },
    rechage1 () {
      this.charge_amount = 50
    },
    rechage2 () {
      this.charge_amount = 100
    },
    rechage3 () {
      this.charge_amount = 200
    },
    rechage4 () {
      this.charge_amount = 500
    },
    isWeixinBrowser () {
      let agent = navigator.userAgent.toLowerCase()
      if (agent.match(/MicroMessenger/i) === 'micromessenger') {
        console.log('是微信浏览器')
        this.wxBrowser = true
        this.recharge_info.platform = 2
      } else {
        console.log('不在微信浏览器')
        this.wxBrowser = false
      }
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
    makeCharge () {
      if (!this.submitFlag) {
        return false
      }
      this.submitText = '正在充值当中...'
      this.submitFlag = false
      this.isDisable = true
      this.recharge_info.total_amount = this.charge_amount * 100
      // 测试版
      // let url_1 = 'https://clientsrv.wangzheka.cn/v1/client/user/charge?user_id=' + this.recharge_info.user_id
      // 正式版
      // let url_1 = 'https://clientsrv.duoduocp.cn/v1/client/user/charge?user_id=' + this.recharge_info.user_id

      // 测试版
      // let url_2 = url_1 + '&pay_type=1&subject=微信充值&detail=多多中彩票充值&platform=2&mark=充值&total_amount=' + this.recharge_info.total_amount + '&call_back_url=' + encodeURIComponent('https://h5-client.wangzheka.cn/rechargePage')
      // 正式版
      // let url_2 = url_1 + '&pay_type=1&subject=微信充值&detail=多多中彩票充值&platform=2&mark=充值&total_amount=' + this.recharge_info.total_amount + '&call_back_url=' + encodeURIComponent("https://m.duoduocp.cn/rechargePage")

      // let url_3 = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8fc93ce31b002cb7&redirect_uri=' + encodeURIComponent(url_2) + '&response_type=code&scope=snsapi_base&state=123#wechat_redirect'
      // 判断是否为微信浏览器

      let g = this.pay_switch_data[this.selectPayIndex].pay_type
      if (g === 0) {
        this.recharge_info.pay_type = 1
        this.recharge_info.subject = '微信支付'
      } else if (g === 1) {
        this.recharge_info.pay_type = 2
        this.recharge_info.subject = '支付宝支付'
      } else if (g === 3) {
        this.recharge_info.pay_type = 4
        this.recharge_info.subject = '微信二维码支付'
      } else if (g === 4) {
        this.recharge_info.pay_type = 5
        this.recharge_info.subject = 'QQ支付'
      }

      this.$store.dispatch('userCharge', this.recharge_info)

      // if (!this.wxBrowser) {
      //   // 跳转支付
      //   this.$store.dispatch('userCharge', this.recharge_info)
      // } else {
      //   // window.top.location.href = url_3
      //   // this.recharge_info.platform = 2
      //   this.$store.dispatch('userCharge', this.recharge_info)
      // }
    }
  },
  created () {
    // do something after creating vue instance
    this.isIosWebview = String(localStorage.getItem('iosWebview')) === 'true' || false
    this.isWeixinBrowser()
    this.$store.dispatch('getUserInfo', {'user_id': localStorage.user_id})
    store.dispatch('getPay_swtich')
  }
}
</script>

<style lang="css" scoped>
.m-pay-list-last {
  color: #000;
}
</style>
