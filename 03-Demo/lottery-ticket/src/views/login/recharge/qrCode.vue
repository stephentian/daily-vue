<template lang="html">
  <div class="qrCode">
    <header class="m-top g-top-user box-shadow">
      <h2 class="m-top-title tal ml20"><i @click="back" class="iconfont icon-arrow-left mr10"></i><span>微信二维码支付</span></h2>
    </header>
    <p class="price tac red">
      ¥{{total_amount}}
    </p>
    <div class="tac ft1 mt15">
      <p>请将二维码保存到相册</p>
      <p>然后发送至其他设备</p>
      <p>再用微信扫描二维码进行支付</p>
    </div>
    <div class="qrCodeImg tac">
      <div>
        <img :src="qrCodeImg" alt="">
      </div>
    </div>
    <div class="payBtn tac" @click="routerTo">
      支付完成
    </div>
    <!-- <div class="tac">
      <p class="ft1 mb5">不会操作看这里</p>
      <p>
        <i class="tac iconfont icon-arrow-horizontal-down" style="font-size:1rem"></i>
      </p>
    </div>
    <div class="qrCodeTrod">
      <img src="https://cstatic.duoduocp.cn/cdd/p/other/qrCode.png" alt="">
    </div> -->
  </div>
</template>

<script>
import router from '@/router/index.js'

export default {
  data: () => ({
    isIosWebview: false,
    selectPayIndex: 0,
    qrCodeImg: '',
    total_amount: 0
  }),
  mounted () {
    // let list1 = this.pay_switch_data.map((o, i) => {
    //   return o.priority
    // })
    // this.selectPayIndex = list1.indexOf(Math.min(...list1))
    this.qrCodeImg = localStorage.getItem('qrCodeImg') ? localStorage.getItem('qrCodeImg') : ''
    this.total_amount = Number(this.$route.query.total_amount / 100).toFixed(2)
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    routerTo () {
      router.push({path: '/aliSuccess', 'query': {'trade_no': this.$route.query.trade_no, 'service_type': this.$route.query.service_type, 'order_lst': this.$route.query.order_lst}})
    }
  },
  created () {
    this.isIosWebview = String(localStorage.getItem('iosWebview')) === 'true' || false
  }
}
</script>

<style lang="scss" scoped>
  .ft1{
    font-size: 1.5rem;
  }
  .price{
    font-size: 2.5rem;
    margin-top: 8rem;
  }
  .payBtn{
    font-size: 1.5rem;
    height: 3.5rem;
    line-height: 3.5rem;
    color:#fff;
    width: 80%;
    margin:2rem auto;
    background: linear-gradient(90deg, #ff7149, #f12c2c);
    border-radius: 4px;
  }
  .qrCodeTrod{
    width: 100%;
    margin: 2rem auto;
  }
  .qrCodeTrod img{
    width: 100%;
  }
  .qrCodeImg{
    margin: 1rem auto 3rem;
    width: 60%;
  }
  .qrCodeImg img{
    width: 100%;
  }
</style>
