<template>
  <div class="trendMark" v-if="trendMarkFlag" @click="markHide">
    <img :src="src">
  </div>
</template>
<script>
export default {
  name: 'trendMark',
  data () {
    return {
      trendMarkFlag: false,
      src: ''
    }
  },
  created () {
    // if (localStorage.getItem('TrendFirstOpen') === 'true') {
    //   this.trendMarkFlag = false
    // } else {
    //   this.trendMarkFlag = true
    // }
  },
  methods: {
    markHide () {
      this.trendMarkFlag = false
    }
  },
  mounted () {
    if (window.location.href.includes('trend')) {
      this.src = 'https://cstatic.duoduocp.cn/cdd/p/cdd/trendMark2.png'
      if (localStorage.getItem('TrendFirstOpen') === 'true') {
        this.trendMarkFlag = false
      } else {
        this.trendMarkFlag = true
        localStorage.setItem('TrendFirstOpen', true)
      }
    } else {
      this.src = 'https://cstatic.duoduocp.cn/cdd/p/cdd/missMark.png'
      if (localStorage.getItem('missFirstOpen') === 'true') {
        this.trendMarkFlag = false
      } else {
        this.trendMarkFlag = true
        localStorage.setItem('missFirstOpen', true)
      }
    }
  }
}
</script>
<style lang="css" scoped>
  .trendMark {
    position: fixed;
    width: 100%;
    height: 100%;
    margin:0 auto;
    max-width: 720px;
    top: 3.8rem;
    z-index: 99999;
    background: rgba(0,0,0,.5);
  }
  .trendMark img {
    display:block;
    width: 90%;
    margin:5rem auto;
    /*height: 50%;*/
    pointer-events: none;
  }
</style>
