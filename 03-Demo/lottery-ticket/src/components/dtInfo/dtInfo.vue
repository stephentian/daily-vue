<template>
  <div id="dtInfo">
    <header class="m-top g-top-login"
            v-if="!topShow">
      <h2 class="m-top-title tal ml20"><i class="iconfont icon-arrow-left mr10"
           @click="routerBack"></i><span>什么是胆拖</span></h2>
    </header>
    <div class="header-top-space"
         v-if="!topShow"></div>
    <section class="g-dantuoinfo">
      <h3 class="m-title-h3">什么是胆拖</h3>
      <p>在胆拖投注中，我们把号码分成胆码和拖码两部分，胆码就是您认为出现的机会非常大的号码，它在所投注的每一注彩票里都固定出现，拖码即补充的其他可能会出的不同号码。由拖码与胆码共同组成一注完整的投注。<br>
        号码以双色球为例：<br>
        假设您认为红球01 02 03 04 05必出，红球31 32 33可能会出，蓝球选择16；那么则将01 02 03 04 05作为胆码，它们在每注彩票中都固定出现；将31 32 33作为拖码，表示为：<br>
        (01 02 03 04 05)31 32 33 | 16<br>
        这样胆码和拖码组合起来就是以下几注号：<br>
        01 02 03 04 05 31 | 16<br>
        01 02 03 04 05 32 | 16<br>
        01 02 03 04 05 33 | 16</p>
    </section>
  </div>
</template>
<script>
export default {
  name: 'dtInfo',
  data: () => ({
    topShow: true
  }),
  mounted() {
    this.topShow = navigator.userAgent.includes('cdd_ios') && true
  },
  methods: {
    routerBack() {
      // 返回上一级
      window.history.length > 2
        ? this.$router.go(-1)
        : this.$router.push('/home')
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
