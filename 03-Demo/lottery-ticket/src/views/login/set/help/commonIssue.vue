<template>
  <div id="">
    <header class="m-top g-top-login" v-if="!topShow">
      <h2 class="m-top-title tac"><i class="iconfont icon-arrow-left mr10" @click="routerBack"></i><span>常见问题</span></h2>
    </header>
    <div class="header-top-space" v-if="!topShow"></div>
    <section class="g-dantuoinfo">
      <h3 class="m-title-h3">实名认证：</h3>
      <p><a href="javascript:;">一、如何实名认证？</a></p>
      1、登录后进“我的帐户”，点击“头像”-“实名认证”-真实身份【绑定】<br>

      2、录入您的身份信息，点击【提交】<br>

      3、核对身份信息，点击【确认】<br>

      4、验证完成<br>
      <p>温馨提示：为确保帐户安全，身份信息绑定后不可修改</p><br>

      <p><a href="javascript:;">二、为什么要填写真实姓名？身份证号码？</a></p>
      购买者的真实身份信息非常重要，姓名和身份证号码是领奖的凭证，请务必真实填写，否则无法领奖。
          购买彩票是个人行为，请保证您所提交的身份信息是您个人的真实信息，不要使用公司或别人的信息。
          一旦使用错误的身份信息购买了彩票并中了大奖，会导致无法领取奖金的严重后果，请慎重填写自己的真实身份信息。
          如果填写了错误的身份信息，请联系客服进行修改。
          依据财政部《彩票发行与销售管理暂行规定》，如果未满18周岁，即使提交了正确的姓名和身份证号码，亦无法通过系统验证。
          您在多多中彩票每次投注都会单独提交您的身份信息，所以请确保投注时身份信息的准确性。
      <br><br>

      <p><a href="javascript:;">三、真实姓名和身份证号填写错误如何修改？</a></p>
      为了您的帐户安全，网站暂不支持修改真实姓名和身份证号。如有特殊情况，请联系多多中彩票客服进行修改。<br>
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
