<template>
  <div id="">
    <header class="m-top g-top-login" v-if="!topShow">
      <h2 class="m-top-title tac"><i class="iconfont icon-arrow-left mr10" @click="routerBack"></i><span>充值问题</span></h2>
    </header>
    <div class="header-top-space" v-if="!topShow"></div>
    <section class="g-dantuoinfo">
      <h3 class="m-title-h3">账户充值：</h3>
      <p><a href="javascript:;">一、如何给我的账户充值？</a></p>
      <!-- 一、如何给我的账户充值？<br> -->
      1、登录后进入“我的”，点击【充值】<br>

      2、进入充值页面，选择充值金额、充值方式，点击【充值】<br>

      3、进入对应充值方式的支付界面完成付款<br><br>

      <!-- 二、充值遇到问题怎么办？<br> -->
      <p><a href="javascript:;">二、充值遇到问题怎么办？</a></p>
      如充值未到账，请您15分钟后再查看账户余额情况。
        若仍未到账，请核实是否成功扣款。若未成功扣款请您重新充值，
        若已成功扣款请您致电客服热线或联系在线客服人员进行核实（提供用户名、订单号、充值方式、充值金额等信息）。
      <br>

      <!-- 三、如何查看充值记录？<br> -->
      <p><a href="javascript:;">二、如何查看充值记录？</a></p>
      登录后进入“我的”，点击“账户明细”-【充值记录】<br>
    </section>
  </div>
</template>

<script>
export default {
  name: '',
  data: () => ({
    topShow: true
  }),
  mounted () {
    this.topShow = navigator.userAgent.includes('cdd_ios') && true
  },
  methods: {
    routerBack () {
      // 返回上一级
      window.history.length > 2 ? this.$router.go(-1) : this.$router.push('/home')
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
