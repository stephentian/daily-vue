<template>
  <div id="trend">
    <header class="m-top g-top-login">
      <h2 class="m-top-title tac">
        <i class="iconfont icon-arrow-left mr10" @click="routerBack"></i>
        <span class="play-type-checkbox">{{title}}</span>
      </h2>
      <div class="m-top-txt">
        <i class="iconfont icon-hopper mr10" @click="FilterShow()"></i>
      </div>
    </header>
    <div class="header-top-space"></div>
    <section>
      <ssqTrend ref="ssqChild" v-if="curId === 0"></ssqTrend>
      <dltTrend ref="dltChild" v-if="curId === 1"></dltTrend>
      <dlcTrend ref="dlcTrend" v-if="curId === 2"></dlcTrend>
      <jxk3Trend ref="jxk3Trend" v-if="curId === 3"></jxk3Trend>
      <d3Trend ref="d3Trend" v-if="curId === 4"></d3Trend>
      <trendMark></trendMark>
    </section>
    <div class="popup-box" v-show="centerDialogVisible">
      <div class="popup-wrap middle">
        <div class="m-match-filter mt10 mb5">
          <em @click = "league_select(30)" :class = "selectId === 30 ? 'red' : ''">30期</em>
          <em @click = "league_select(50)" :class = "selectId === 50 ? 'red' : ''">50期</em>
          <em @click = "league_select(100)" :class = "selectId === 100 ? 'red' : ''">100期</em>
          <em @click = "league_select(200)" :class = "selectId === 200 ? 'red' : ''">200期</em>
        </div>
        <div class="m-bottom-btn">
          <button class="m-bottom-btn-white" @click="cancelFilter">取消</button>
          <button class="m-bottom-btn-red" @click="sureFilter">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import store from '@/store/index.js'
import ssqTrend from './ssqTrend'
import dltTrend from './dltTrend'
import dlcTrend from './dlcTrend'
import d3Trend from './3dTrend'
import jxk3Trend from './jxk3Trend'
import trendMark from '@/components/trend-mask'
export default {
  name: '',
  components: {
    dlcTrend,
    ssqTrend,
    jxk3Trend,
    d3Trend,
    dltTrend,
    trendMark
  },
  // 解决safri 滚动兼容问题
  beforeCreate: function () {
    document.body.style.overflow = 'unset'
  },
  beforeDestroy: function () {
    document.body.style.overflow = 'scroll'
  },
  data: () => ({
    centerDialogVisible: false,
    selectId: 30,
    curId: 0,
    titleList: ['双色球走势', '大乐透走势', '11选5走势图任选二', '新快3走势图三不同号', '福彩3D'],
    title: ''
  }),
  created () {
    this.curId = Number(this.$route.query.curId)
  },
  mounted () {
    this.title = this.titleList[this.curId]
  },
  methods: {
    routerBack () {
      window.history.length > 2 ? this.$router.go(-1) : this.$router.push('/home')
    },
    FilterShow () {
      this.centerDialogVisible = true
    },
    cancelFilter () {
      this.centerDialogVisible = false
    },
    sureFilter () {
      this.centerDialogVisible = false
      store.commit('trendPeriods', this.selectId)
    },
    league_select (n) {
      this.selectId = n
    }
  }
}
</script>
<style lang="css">
#trend .d_flex{
  display: flex;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: -moz-flex;
  display: flex;
}
#trend .w_50{
  width: 50%;
}
#trend .gray{
  color:#a5763c;
}
#trend .blue{
  color:#6275e6;
}
/*选择框调整*/
#trend .popup-wrap {
  padding: 1.5rem 2rem;
  background: #f0f0f0;
}
#trend .popup-wrap .m-tab {
  border: 1px solid #d6d7dc;
  background: #f0f0f0;
}
#trend .popup-wrap .m-tab a {
  font-size: 1.4rem;
  background: #fff;
  color: #333;
}
#trend .popup-wrap .m-tab a.active,#trend .popup-wrap .m-tab a:active{
  background: #e52222;
  color: #fff;
}
#trend .m-match-filter{
  width: 100%;
  height: auto;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: -moz-flex;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}
#trend .m-match-filter em{
  width: 45%;
  min-width: 6rem;
  height: 3.2em;
  line-height: 3.2rem;
  margin-top: 0.5rem!important;
  border: 1px solid #d6d7dc;
  font-size: 1.2rem;
  background: #fff;
  color: #999;
  text-align: center;
}
#trend .m-match-filter em:nth-child(3n){
  margin: 0 0 1rem 0;
}
#trend .m-match-filter em.red{
  border: 1px solid #e52222;
  color: #e52222;
}
#trend .m-bottom-btn-white,#trend .m-bottom-btn-red{
  width: 45%;
  font-size: 1.4rem;
  -webkit-border-radius: 0.5rem;
  -moz-border-radius: 0.5rem;
  border-radius: 0.5rem;
}
#trend .m-bottom-btn-white{
  margin-right: 10%;
  border: 1px solid #d6d7dc;
  color: #999;
}
#trend .m-bottom-btn-red{
  border: 1px solid #e52222;
}
/*表格*/

#trend .trBg tr:nth-of-type(odd){
  background: rgba(240,240,240,1);
}
#trend .trBg tr:nth-of-type(even){
  background: #fff;
}
#trend .circleRed span{
  background: rgba(229,34,34,1);
}
#trend .circleBlue span{
  background: rgba(69,96,229,1);
}
#trend .circleBlue span, #trend .circleRed span{
  color: #fff;
  position: relative;
  width: 1.74rem!important;
  height: 1.74rem!important;
  border-radius: 50%!important;
  line-height: 1.74rem;
  display: inline-block!important;
}
#trend .ssqTable{
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display:flex;
}
#trend .ssqTable table,#trend .ssqTable table tr{
  width: 100%;
}
#trend .ssqTable table td{
  line-height: 2rem;
}
#trend .periods{
  width: 15%;
}
#trend .detail{
  overflow: auto;
  width: 85%;
}
#trend .detail tr td>span{
  display: block;
  width: 2rem;
  height: 2rem;
}
#trend .periods td span {
    display: block;
    height: 2rem;
    line-height: 2rem;
}

/*选球*/
#trend .selectNumber{
  position: fixed;
  height: 5.9rem;
  width: 100%;
  background: #fff;
  bottom: 6.2rem;
  font-size: 1rem;
  padding-bottom: 0.6rem;
  padding-top: 0.6rem;
  max-width: 720px;
}
#trend .selectNumber>div{
  height: 2.35rem;
  line-height: 2.35rem;
}
#trend .xh .redDetail td>span>span{
  display: inline-block;
  width: 1.57rem;
  height: 1.57rem;
  border-radius: 50%;
  border: 1px solid red;
  line-height: 1.57rem;
  color: red;
  text-align: center;
  /*margin-left: 0.58rem;*/
}
#trend .xh .blueDetail td>span>span{
  display: inline-block;
  width: 1.57rem;
  height: 1.57rem;
  border-radius: 50%;
  border: 1px solid blue;
  line-height: 1.57rem;
  color: blue;
  text-align: center;
  margin-left: 0.58rem;
}
#trend .xh .selectBlueCircle li{
  border: 1px solid blue;
  color: blue;
}
#trend .xh .active{
  -webkit-animation: scale 0.3s ease-in-out;
  -moz-animation: scale 0.3s ease-in-out;
  animation: scale 0.3s ease-in-out;
}
#trend .xh .redDetail .active{
  background: red;
  color: #fff;
}
#trend .xh .blueDetail .active{
  background: blue;
  color: #fff;
}
#trend .yx ul li{
  display: inline-block;
  margin-left: 0.32rem;
}
#trend .selectCircle{
  width: 84%;
}
#trend .selectCircle ul{
  white-space: nowrap;
  overflow: auto;
}
#trend .title{
  width: 15%;
}
#trend p.tac.morePeriodP {
  height: 2rem;
  line-height: 2rem;
  position: fixed;
  bottom: 4.2rem;
  max-width: 720px;
  text-align: center;
  width: 100%;
  background: rgba(240,240,240,1);
}

#trend .defaultNum {
  background: #fff;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display:flex;
  font-size: 1.2rem;
  font-weight: bold;
  line-height: 2rem;
  position: sticky;
  top: 8rem;
  z-index: 999;
}

</style>
