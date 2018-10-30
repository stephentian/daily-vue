<template lang="html">
  <div>
    <header class="m-top g-top-user box-shadow" v-if="!topShow">
      <h2 class="m-top-title tal ml20"><i class="iconfont icon-arrow-left mr10" @click="back"></i><span>帮助中心</span></h2>
      <div class="m-top-txt">
        <i class="iconfont "></i>
      </div>
    </header>
    <div class="header-top-space" v-if="!topShow"></div>
    <section class="g-user-help">
      <router-link tag="aside" class="m-help-list tac" :to="{ name: 'addIssue'}">
        <p><i class="iconfont icon-chongzhiwenti"></i><span class="mt10">充值问题</span></p>
      </router-link>
      <router-link tag="aside" class="m-help-list tac" :to="{ name: 'winIssue'}">
        <p><i class="iconfont icon-qukuanwenti"></i><span class="mt10">取款问题</span></p>
      </router-link>
      <router-link tag="aside" class="m-help-list tac" :to="{ name: 'commonIssue'}">
        <p><i class="iconfont icon-changjianwenti"></i><span class="mt10">常见问题</span></p>
      </router-link>
    </section>
    <section class="g-user-lists mt15">
      <router-link class="m-user-list" tag="aside" :to="{ name: 'ssqWay'}">
        <span class="mr10">双色球玩法说明</span>
        <i class=" arrow iconfont icon-arrow-right"></i>
      </router-link>
      <router-link class="m-user-list" tag="aside" :to="{ name: 'dltWay'}">
        <span class="mr10">大乐透玩法说明</span>
        <i class=" arrow iconfont icon-arrow-right"></i>
      </router-link>
      <router-link class="m-user-list" tag="aside" :to="{ name: 'dlcWay'}">
        <span class="mr10">11选5玩法说明</span>
        <i class=" arrow iconfont icon-arrow-right"></i>
      </router-link>
      <router-link class="m-user-list" tag="aside" :to="{ name: 'fc3dWay'}">
        <span class="mr10">福彩3D玩法说明</span>
        <i class=" arrow iconfont icon-arrow-right"></i>
      </router-link>
      <router-link class="m-user-list" tag="aside" :to="{ name: 'jxk3Way'}">
        <span class="mr10">新快三玩法说明</span>
        <i class=" arrow iconfont icon-arrow-right"></i>
      </router-link>
      <router-link class="m-user-list" tag="aside" :to="{ name: 'jczqWay'}">
        <span class="mr10">竞彩足球玩法说明</span>
        <i class=" arrow iconfont icon-arrow-right"></i>
      </router-link>
    </section>
  </div>
</template>

<script>
export default {
  name: '',
  data: () => ({
    topShow: true
  }),
  methods: {
    back () {
      this.$router.go(-1)
    }
  },
  mounted () {
    this.topShow = navigator.userAgent.includes('cdd_ios') && true
  }
}
</script>

<style lang="css">
</style>
