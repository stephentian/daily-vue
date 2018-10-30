<template>
  <div class="trendMissMark" v-show="MarkFlag" @click="markHide">
    <img src="https://cstatic.duoduocp.cn/cdd/p/cdd/missMarkOpacity5.png">
  </div>
</template>
<script>
export default {
  name: 'trendMissMark',
  data () {
    return {
      MarkFlag: false
    }
  },
  methods: {
    markHide () {
      this.MarkFlag = false
    }
  },
  mounted () {
    if (localStorage.getItem('FirstOpen') === 'true') {
      this.MarkFlag = false
    } else {
      this.MarkFlag = true
      localStorage.setItem('FirstOpen', true)
    }
  }
}
</script>
<style lang="css" scoped>
  .trendMissMark {
    position: fixed;
    width: 100%;
    height: 100%;
    margin:0 auto;
    max-width: 720px;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99999;
    background: rgba(0,0,0,.5);
  }
  .trendMissMark img {
    display:block;
    width: 90%;
    margin:.2rem 0.5rem 0 auto;;
    /*height: 50%;*/
    pointer-events: none;
    top: 0;
  }
</style>
