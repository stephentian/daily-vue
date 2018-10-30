<template>
  <div id="comnotice">
    <header class="m-top g-top-login" v-if="!topShow">
      <h2 class="m-top-title tac">
        <i class="iconfont icon-arrow-left mr10" @click="routerBack"></i>
        <span>{{noticeTheme}}</span></h2>
    </header>
    <div class="header-top-space" v-if="!topShow"></div>
    <div class="noticeText">
      {{noticeText}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'comnotice',
  data: () => ({
    topShow: true,
    noticeTheme: '',
    noticeText: ''
  }),
  mounted () {
    this.topShow = navigator.userAgent.includes('cdd_ios') && true
    this.noticeTheme = localStorage.getItem('noticeTheme')
    this.noticeText = localStorage.getItem('noticeText')
  },
  methods: {
    routerBack () {
      // 返回上一级
      window.history.length > 2 ? this.$router.go(-1) : this.$router.push('/dlc')
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
.noticeText{
  width: 94%;
  margin: 1rem auto;
}
</style>
