<template lang="html">
  <div>
    <header class="m-top g-top-user box-shadow">
      <h2 class="m-top-title tal ml20"><i class="iconfont icon-arrow-left mr10" @click="back"></i><span>提现</span></h2>
      <div class="m-top-txt">
        <router-link tag="span" style="font-size:1.5rem;" :to="{ name: 'cashRecord'}">提现记录</router-link>
      </div>
    </header>
    <div class="header-top-space"></div>
    <section class="g-my-withdraw">
      <div class="tac">
        <h3 class="m-title-h3">可提购彩金额</h3>
        <p class="m-title-h1 red">{{ money }}元</p>
      </div>
    </section>
    <section class="g-user-inputs">
      <div class="m-user-input">
        <label for="withdraw">提现金额</label>
        <input v-model="cash_num" id="withdraw" name="withdraw" type="text" placeholder="提现金额不得低于20元" required="required" maxlength="20" pattern="[0-9]">
      </div>
      <div class="m-user-input">
        <label for="bank">提现银行卡</label>
        <input v-if="!bank_num" name="bank" type="text" placeholder="请先绑定银行卡" readonly>
        <input v-else name="bank" :placeholder="' **** **** **** **** ' + bank_num " type="text" readonly disabled> **** **** **** **** {{ bank_num }}
      </div>
      <div class="cash-rules mt10">
        <p>1. 为防止恶意提款、洗钱等不法行为，信用卡每笔充值资金100%须用于购彩，储蓄卡每笔充值资金的50%须用于购彩，不可提现；</p>
        <p>2.为保证账户资金安全，每天允许提现2次，每笔提现金额最低为20元；</p>
        <p>3.参与平台活动领取的红包金额不可提现；</p>
        <p>4.提现最快2分钟即可到账，最慢24小时内到账，请您耐心等待；</p>
        <p>5.提现遇到问题请致电客服：0791—82309268</p>
      </div>
    </section>
    <div class="footer-bottom-space"></div>
    <footer class="m-footer">
      <button @click.prevent="makeCash" class="m-footer-btn bgColor" type="button">确定</button>
    </footer>
    <bottom-tips ref="bTips"></bottom-tips>
    <togive188></togive188>
    <div class="popup-box g-tipsbox" v-show="centerDialogVisible">
      <div class="popup-wrap">
        <h3 class="m-title-h3"><span>温馨提示</span><i class="iconfont mr10" @click="centerDialogVisible = false">×</i></h3>
        <div class="mt15 ml15 mr15 mb20">
          <span class="tips" style="text-align:center">
            可提余额不足！<br>
            可提现余额为：{{ legal_cash }} <br>
            <span style="color: red; font-size: 0.2rem;">充值金额的50%必须用于购彩！</span>
          </span>
        </div>
        <div class="m-bottom-btn">
          <button class="m-footer-btn bgColor" type="button" @click="centerDialogVisible = false">知道了</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import api from '@/api/api'
import bottomTips from '@/components/bottom-tips/bottomTips'
import togive188 from '@/components/togive188/index'

export default {
  name: '',
  components: {
    bottomTips,
    togive188
  },
  data: () => ({
    cash_info: {
      user_id: localStorage.user_id,
      cash_money: ''
    },
    bank_num: JSON.parse(localStorage.user_info).bank_id,
    cash_num: '',
    centerDialogVisible: false,
    legal_cash: 0,
    intervalId: null,
    isIosWebview: false
  }),
  computed: {
    ...mapState({
      user_info: state => state.login.user_info
    }),
    money () {
      return this.user_info.balance / 100
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    makeCash () {
      if (!this.isIosWebview) {
        this.$refs.bTips.bottompopTips('请下载app提现')
        return false
      }
      this.cash_info.cash_money = this.cash_num * 100
      if (!this.bank_num) {
        this.$notify({
          type: 'warning',
          message: '请先去绑定银行卡！',
          duration: 1000,
          position: 'bottom-right',
          showClose: false
        })
      } else if (this.cash_num < 20 || this.cash_num > this.money) {
        this.$notify({
          type: 'warning',
          message: '请输入正确的提现金额！',
          duration: 1000,
          position: 'bottom-right',
          showClose: false
        })
      } else {
        api.cash(this.cash_info)
          .then(res => {
            if (res.errno === '0') {
              this.$refs.bTips.bottompopTips(res.errmsg)
              this.intervalId = setInterval(() => {
                this.$router.push('/my')
              }, 2500)
            } else if (res.errno === '1001') {
              this.legal_cash = (res.data.legal_cash * 0.01).toFixed(2)
              this.centerDialogVisible = true
            }
          }).catch(err => console.log(err))
      }
    }
  },
  created () {
    // do something after creating vue instance
    this.$store.dispatch('getUserInfo', {'user_id': localStorage.user_id})
    // this.isIosWebview = window.location.href.toLocaleLowerCase().includes('platform=3')
    this.isIosWebview = String(localStorage.getItem('iosWebview')) === 'true' || false
  },
  beforeDestroy () {
    if (this.intervalId) { // 如果定时器还在运行 或者直接关闭，不用判断
      clearInterval(this.intervalId) // 关闭
    }
  }
}
</script>

<style lang="css" scoped>
.m-user-input{border-bottom:1px solid #f0f0f0;}
</style>
