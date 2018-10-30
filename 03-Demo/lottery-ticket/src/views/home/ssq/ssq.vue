<template lang="html">
  <div id="ssq">
    <header class="m-top g-top-login">
      <!-- <h2 class="m-top-title tac"><i class="iconfont icon-arrow-left mr10" @click="routerBack"></i><span>双色球</span></h2> -->
      <h2 class="m-top-title tac">
        <i class="iconfont icon-arrow-left mr10" @click="routerBack"></i>
        <!-- <span class="play-type-title">{{DropDownText}}</span> -->
        <span class="play-type-checkbox" @click="toggleDropDown()">双色球-{{DropDownText}}
          <i class="iconfont ml5" :class="!DropDownShow ? 'icon-arrow-horizontal-down' : 'icon-arrow-horizontal-up'"></i>
        </span>
      </h2>

      <div class="m-top-txt" @click="toggleMenu()">
        <i class="iconfont icon-diandiandian"></i>
        <!-- <span>助手</span> -->
      </div>
      <!-- 更多玩法 -->
      <div class="m-top-choose box-shadow" v-show="DropDownShow">
        <ul>
          <li class="tac" :class="curId === 0 ? 'active' : ''" @click="toggleDropDownLists(0)">普通投注</li>
          <li class="tac" :class="curId === 1 ? 'active' : ''" @click="toggleDropDownLists(1)">胆拖投注</li>
        </ul>
      </div>

      <div class="m-top-menu box-shadow" v-show="MenuShow">
        <ul>
          <router-link tag="li" to="/open/ssqresult"><i class="iconfont icon-BW_jinqigengxin_ mr5 ft20"></i><span>近期开奖</span></router-link>
          <router-link tag="li" :to="{ name: 'trend', query: { 'curId': 0}}"><i class="icon iconfont icon-zoushitu1 mr5 ft20"></i><span>走势图</span></router-link>
          <!-- 暂无数据，不使用 -->
          <!-- <li @click="toggleEye()"><i class="iconfont mr5" :class="eyeShow ? 'icon-eye-show' : 'icon-eye-hide'"></i><span>{{eyeText}}遗漏</span></li> -->
          <router-link tag="li" :to="{ name: 'ssqWay'}"><i class="iconfont icon-guize mr5 ft20"></i><span>玩法说明</span></router-link>
        </ul>
      </div>
    </header>
    <div class="header-top-space"></div>
    <div class="morePeriod" :class="morePeriodClass">
      <ul>
        <li v-for="(o, i) in periodDetail" class="layoutFlex" :key = "i">
          <span v-for="(o1, i1) in o" class="tac" :key = "i1" :class="{'periodsDefault': i1 !== 0,'periodsBlue': i1 === 7}" :style="{'margin-right': i1 == 0 ? '1rem': ''}">
            <label>{{o1.toString().length === 1 ? '0' + o1 : o1}}</label>
          </span>
        </li>
      </ul>
    </div>
    <p class="morePeriodP" @click="moreShow()">{{ lottery_period }}期 {{ lottery_stop_time }} 截止
      <!-- <i class="iconfont ml5" :class="!morePeriodShow? 'icon-arrow-horizontal-down' : 'icon-arrow-horizontal-up'"></i> -->
      <!-- <i class="iconArrow" :class="morePeriodShow ? 'iconArrowTop' : 'iconArrowBottom'"></i> -->

      <span class="fr mr5">奖池:{{totalsale}}元</span>
    </p>
    <com-ssq v-show="curId === 0" :eyeShow="eyeShow" :trendData="trendData" @moreShow="moreShow" @missShow="toggleEye()"></com-ssq>
    <dt-ssq v-show="curId === 1" :eyeShow="eyeShow" :trendData="trendData" @moreShow="moreShow" @missShow="toggleEye()"></dt-ssq>
    <trendMark v-if="!eyeShow"></trendMark>
    <trendMissMark></trendMissMark>
  </div>
</template>

<script>
import api from '@/api/api'
import comSsq from './comSsq'
import dtSsq from './dtSsq'
import {mapState} from 'vuex'
import trendMark from '@/components/trend-mask'
import trendMissMark from '@/components/trend-miss-mask'

export default {
  name: 'ssq',
  components: {
    // bottomBet
    comSsq,
    dtSsq,
    trendMark,
    trendMissMark
  },
  data () {
    return {
      MenuShow: false, // 菜单展示
      eyeShow: true, // 遗漏显隐
      eyeText: '显示', // 遗漏显隐内容
      curId: 0, // 选项卡切换
      trendData: '',
      DropDownText: '普通投注',
      periodDetail: [], // 期数详细数据
      DropDownShow: false, // 显示更多玩法
      morePeriodShow: false, // 显示前十期
      totalsale: '',
      morePeriodClass: ''
    }
  },
  created () {
    this.$store.dispatch('getLotteryStopTime', {name: 'ssq'})
      .then(() => {
        api.bonusInfo({
          'lottery_alias': 'ssq',
          'lottery_period': ''
        })
          .then((res) => {
            this.totalsale = res.data
          })
      })
    api.trend({
      lottery_alias: 'ssq'
    })
      .then(res => {
        this.trendData = res.data[0].miss_count.normal
        localStorage.setItem('trendData', JSON.stringify(res.data))

        this.periodDetail = res.data.slice(0, 10).map((o, i) => {
          o.bonus_code.unshift(o.lottery_period.substr(-3) + '期')
          return o.bonus_code
        })
        this.periodDetail = this.periodDetail.reverse()
      })
      .catch(err => console.log(err))
  },
  computed: {
    ...mapState({
      lotteryStopTime: state => state.period.lotteryStopTime,
      lottery_period: state => state.period.lotteryStopTime.lottery_period,
      lottery_stop_time: state => state.period.lotteryStopTime.lottery_stop_time,
      lottery_stop_weekday: state => {
        if (state.period.lotteryStopTime.lottery_stop_time) {
          let time = state.period.lotteryStopTime.lottery_stop_time.replace(/-/g, '/')
          let day = new Date(time).getDay()
          let show_day = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
          return show_day[day]
        }
      },
      period_remain_second: state => state.period.lotteryStopTime.period_remain_second
    })
  },
  methods: {
    toggleDropDownLists (index) {
      let list = ['普通投注', '胆拖投注']
      this.DropDownText = list[index]
      this.DropDownShow = false
      this.curId = index
    },
    moreShow () {
      if (!this.morePeriodClass || this.morePeriodClass === 'morePeriodUp') {
        this.morePeriodClass = 'morePeriodDown'
      } else {
        this.morePeriodClass = 'morePeriodUp'
      }
    },
    routerBack () {
      // 返回上一级
      window.history.length > 2 ? this.$router.go(-1) : this.$router.push('/home')
    },
    toggleMenu () {
      // 菜单展示
      this.MenuShow = !this.MenuShow
    },
    toggleEye () {
      // 遗漏显隐
      this.eyeShow = !this.eyeShow
      if (this.eyeShow) {
        this.eyeText = '显示'
      } else {
        this.eyeText = '隐藏'
      }
    },
    toggleDropDown () {
      // 下拉框展示
      this.DropDownShow = !this.DropDownShow
    }
  }
}
</script>

<style lang="scss" scoped>
// 截止投注日期
.morePeriodP{
  height: 2.61rem;
  line-height: 2.61rem;
  background: #fff;
  color: #999;
  text-indent: 1.5rem;
}
// 详细期数
.morePeriod{
  text-indent: 1.5rem;
  ul li{
    font-size:1rem;
    height: 2.61rem;
    line-height: 2.61rem;
    align-items:center;
    justify-content: space-around;
  }
  ul li:nth-of-type(odd) {
    background: #fff;
  }
  ul li:nth-of-type(even) {
    background: rgba(240,240,240,1);
  }
  .periodsDefault{
    color: #fff;
    background:#E52222;
    width: 1.33rem;
    height: 1.33rem;
    line-height: 1.33rem;
    border-radius: 50%;
    margin-right: 1.5rem;
    display:inline-block;
    text-indent: 0;
    label{
      display: inline-block;
      transform: scale(0.8);
    }
  }
  .periodsBlue{
    background: #369af6;
  }
}
</style>
