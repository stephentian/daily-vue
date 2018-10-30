<template lang="html">
  <div class="notice">
    <header class="m-top g-top-open">
      <h2 class="m-top-title tal ml20"><i class="iconfont icon-arrow-left mr10" @click="routerBack"></i><span>开奖通知</span></h2>
    </header>
    <div class="header-top-space"></div>
    <section class="g-notice">
      <h6 class="m-title-h5 ml20">声音</h6>
      <div class="m-switch">
        <p>开启声音提醒</p>
        <em class="m-switch-btn active"><i class="m-switch-handle"></i></em>
      </div>
      <h6 class="m-title-h5 ml20">彩种设置</h6>
      <div class="m-switch">
        <p>双色球<span class="ml5">（每周二、四、日提醒）</span></p>
        <em class="m-switch-btn active"><i class="m-switch-handle"></i></em>
      </div>
      <div class="m-switch">
        <p>大乐透<span class="ml5">（每周一、三、六提醒）</span></p>
        <em class="m-switch-btn"><i class="m-switch-handle"></i></em>
      </div>
      <div class="m-switch">
        <p>福彩3D<span class="ml5">（每天提醒）</span></p>
        <em class="m-switch-btn"><i class="m-switch-handle"></i></em>
      </div>
    </section>
    <div class="footer-bottom-space"></div>
    <footer class="m-footer">
      <button class="m-footer-btn bgColor" id="" type="button">确定</button>
    </footer>
  </div>
</template>

<script>

export default {
  name: 'notice',
  data () {
    return {
    }
  },
  created () {
  },
  computed: {
  },
  mounted () {},
  methods: {
    routerBack () {
      // 返回上一级
      window.history.length > 2 ? this.$router.go(-1) : this.$router.push('/open')
    }
  }
}
</script>

<style lang="css" scoped>
</style>
