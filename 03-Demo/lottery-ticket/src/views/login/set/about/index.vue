<template lang="html">
  <div>
    <header class="m-top g-top-user box-shadow">
        <h2 class="m-top-title tal ml20"><i class="iconfont icon-arrow-left mr10" @click="back"></i><span>关于</span></h2>
    </header>
    <div class="header-top-space"></div>
    <section class="m-middle g-middle-about">
      <div class="mb60">
        <h1 class="m-title-h1 red tac">多多中彩票</h1>
        <h5 class="m-title-h5 tac">版本号：v1.0.0</h5>
      </div>
      <aside class="m-user-list">
        <span>官方微信</span>
        <em class="fr gray3">多多中</em>
      </aside>
      <aside class="m-user-list mb20">
        <span>客服热线</span>
        <a class="fr blue tdl" href="tel:0791-82309268" style="font-size: 1.4rem">0791-82309268</a>
      </aside>
    </section>
    <section class="m-bottom g-bottom-copyright">
      <router-link tag="p" class="red  tac" :to="{ name: 'agreement' }">《多多中彩票委托投注协议》</router-link>
      <h6 class="m-title-h6 mt10 mb20 tac">多多中彩票公司 版权所有</h6>
    </section>
  </div>
</template>

<script>
export default {
  name: '',
  methods: {
    back () {
      this.$router.go(-1)
    }
  }
}
</script>
