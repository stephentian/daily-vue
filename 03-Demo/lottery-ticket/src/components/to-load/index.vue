<template>
  <div class="toLoad" v-if="!isIosWebview">
    <div>
      <img @click="linkto" src="https://cstatic.duoduocp.cn/cdd/p/other/cddload.png" alt="">
    </div>
  </div>
</template>
<script>
export default {
  name: 'toload',
  data () {
    return {
      isIosWebview: false
    }
  },
  created () {
    // this.isIosWebview = decodeURIComponent(window.location.href).toLocaleLowerCase().includes('platform=3')
    this.isIosWebview = String(localStorage.getItem('iosWebview')) === 'true' || false
  },
  methods: {
    linkto () {
      let u = localStorage.getItem('channel_info') ? localStorage.getItem('channel_info') : '100001'
      try {
        window.webkit.messageHandlers.iosBannerIndex.postMessage('https://p.duoduocp.cn/lotteryspread1/index.html?c=' + u)
      } catch (err) {
        window.open('https://p.duoduocp.cn/lotteryspread1/index.html?c=' + u)
      }
    }
  }
}
</script>
<style lang="css" scoped>
.toLoad{
  /* position: fixed; */
  /* bottom: 5%; */
  /* width: 100%; */
  margin-top: 2.5rem;
}
.toLoad>div{
  max-width: 720px;
  margin:0 auto;
}
.toLoad img{
  width: 80%;
  margin:0 auto;
  display: block;
}
</style>
