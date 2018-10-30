<template>
  <div id="jxk3">
    <header class="m-top g-top-login">
      <h2 class="m-top-title tac">
        <i class="iconfont icon-arrow-left mr10" @click="routerBack"></i>
        <span class="play-type-checkbox" @click="toggleDropDown()">{{'快3-' + DropDownText}}<i class="iconfont ml5" :class="DownUp ? 'icon-arrow-horizontal-down' : 'icon-arrow-horizontal-up'"></i></span></h2>
      <div class="m-top-txt" @click="toggleMenu()">
        <i class="iconfont icon-diandiandian"></i>
      </div>
      <div class="m-top-menu box-shadow" v-show="MenuShow">
        <ul>
          <router-link tag="li" to="/open/jxk3result"><i class="iconfont icon-BW_jinqigengxin_ mr5 ft20"></i><span>近期开奖</span></router-link>
          <!-- 暂无数据，不使用 -->
          <!-- <li @click="toggleEye()"><i class="iconfont mr5" :class="eyeShow ? ' icon-eye-show' : 'icon-eye-hide'"></i><span>{{eyeText}}遗漏</span></li> -->
          <router-link tag="li" :to="{ name: 'trend', query: { 'curId': 3}}"><i class="iconfont icon-zoushitu1 mr5 ft20"></i><span>走势图</span></router-link>
          <router-link tag="li" :to="{ name: 'jxk3Way'}"><i class="iconfont icon-guize mr5 ft20"></i><span>玩法说明</span></router-link>
        </ul>
      </div>
      <div class="m-top-choose box-shadow" v-show="DropDownShow">
        <ul>
          <li class="tac" :class="{'active': curId === index}" v-for="(list,index) in DropDownLists" @click="toggleDropDownLists(list,index)" :key=list.id :to="{path: list.routerlink}">{{list.text}}</li>
        </ul>
      </div>
    </header>
    <div class="header-top-space"></div>
    <!-- <p class="tac morePeriodP" @click="morePeriodShow = !morePeriodShow">
      <span>距{{ lottery_period }}期还有</span> <span class="red">{{ countdown }}</span>
      <i class="iconArrow" :class="morePeriodShow ? 'iconArrowTop' : 'iconArrowBottom'"></i>
    </p> -->
    <div class="tac layoutFlex gray9 jxk3-header-more">
      <div class="xk3-header-more-l">
        <p>
          距{{ lottery_period }}期投注截止
        </p>
        <p class="red comFt13">
          {{ countdown }}
        </p>
      </div>
      <div class="layoutFlex jxk3-header-more-r" @click="moreShow()">
        <div>
          <p>{{ lastPeriod }}期开奖结果</p>
          <div>
            <template v-for="(o2, i2) in periodDetail[9]" >
              <img v-if="i2 !== 0" :key = "i2" :src="'../../../../static/images/anmation_k3_p' + o2 + '.png' " alt="">
            </template>
          </div>
        </div>
        <i class="iconfont ft15 ml5 icon-shuangjiantou" :style="{'transform': morePeriodShow ? 'rotate(180deg)' : ''}"></i>
      </div>
    </div>
    <div class="morePeriod" :class="morePeriodClass">
      <ul>
        <li v-for="(o, i) in periodDetail" :key = "i + '1'">
          <span class="tac mr20">
            {{o[0]}}
          </span>
          <template v-for="(o2, i2) in o" >
            <img v-if="i2 !== 0" :key = "i2" :src="'../../../../static/images/anmation_k3_p' + o2 + '.png' " alt="">
          </template>
          <span v-for="(o1, i1) in o" v-show="i1 >= 1" class="tac ml5" :key = "i1 + '2'">
            {{o1}}
          </span>
        </li>
      </ul>
    </div>
    <!-- <div class="morePeriod" v-show="morePeriodShow">
      <ul>
        <li v-for="(o, i) in periodDetail" :key = "i">
          <span v-for="(o1, i1) in o" class="tac" :key = "i1" :class="{'periodsDefault': i1 !== 0,'periodsBlue': i1 === 7 || i1 === 6}" :style="{'margin-right': i1 == 0 ? '2rem': ''}">
            <label>{{o1.toString().length === 1 ? '0' + o1 : o1}}</label>
          </span>
        </li>
      </ul>
    </div> -->
    <hz-jxk3 v-show="curId === 0" :eyeShow="eyeShow" :trendData="trendData" @moreShow="moreShow" @missShow="toggleEye()"></hz-jxk3>
    <t3dx-jxk3 v-show="curId === 1" :eyeShow="eyeShow" @moreShow="moreShow" @missShow="toggleEye()"></t3dx-jxk3>
    <t3tx-jxk3 v-show="curId === 2" :eyeShow="eyeShow" @moreShow="moreShow" @missShow="toggleEye()"></t3tx-jxk3>
    <t2dx-jxk3 v-show="curId === 3" :eyeShow="eyeShow" :trendData="trendData" @moreShow="moreShow" @missShow="toggleEye()"></t2dx-jxk3>
    <t2fx-jxk3 v-show="curId === 4" :eyeShow="eyeShow" @moreShow="moreShow" @missShow="toggleEye()"></t2fx-jxk3>
    <bt2-jxk3 v-show="curId === 5" :eyeShow="eyeShow" :trendData="trendData" @moreShow="moreShow" @missShow="toggleEye()"></bt2-jxk3>
    <bt3-jxk3 v-show="curId === 6" :eyeShow="eyeShow" :trendData="trendData" @moreShow="moreShow" @missShow="toggleEye()"></bt3-jxk3>
    <l3tx-jxk3 v-show="curId === 7" :eyeShow="eyeShow"></l3tx-jxk3>
    <trendMark v-if="!eyeShow"></trendMark>
    <trendMissMark></trendMissMark>
    <div class="popup-box" v-show="centerDialogVisible">
      <div class="popup-wrap middle">
        <h3 class="m-title-h3"><span class="red ft15">提示</span></h3>
        <div style="text-align:center" class="mt5 ml15 mr15 mb20 ft12">
          <span class="tips">尊敬的用户，<em class="red">{{ lottery_period }}</em>期已截止</span><br>
          <span class="tips">期号已更新至下一期，请您核对期号后再投注。</span>
        </div>
        <div class="m-bottom-btn">
          <div  class="m-footer-btn1 bgColor" @click="centerDialogVisible = false">
            确认
          </div>
          <!-- <router-link tag="button" >确认</router-link> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/api.js'
import store from '@/store/index.js'
import { mapState } from 'vuex'
import hzJxk3 from './hzJxk3'
import t3dxJxk3 from './t3dxJxk3'
import t3txJxk3 from './t3txJxk3'
import t2dxJxk3 from './t2dxJxk3'
import t2fxJxk3 from './t2fxJxk3'
import bt2Jxk3 from './bt2Jxk3'
import bt3Jxk3 from './bt3Jxk3'
import l3txJxk3 from './l3txJxk3'
import trendMark from '@/components/trend-mask'
import trendMissMark from '@/components/trend-miss-mask'

export default {
  name: 'jxk3',
  components: {
    hzJxk3,
    t3dxJxk3,
    t3txJxk3,
    t2dxJxk3,
    t2fxJxk3,
    bt2Jxk3,
    bt3Jxk3,
    l3txJxk3,
    trendMark,
    trendMissMark
  },
  data () {
    return {
      MenuShow: false, // 菜单展示
      eyeShow: true, // 遗漏显隐
      eyeText: '显示', // 遗漏显隐内容
      DownUp: true, // 下拉框图标
      DropDownText: '和值', // 下拉框内容
      DropDownLists: [
        {
          'text': '和值',
          'routerlink': '/jxk3/hzJxk3'
        }, {
          'text': '三同号单选',
          'routerlink': '/jxk3/t3dxJxk3'
        }, {
          'text': '三同号通选',
          'routerlink': '/jxk3/t3txJxk3'
        }, {
          'text': '二同号单选',
          'routerlink': '/jxk3/t2dxJxk3'
        }, {
          'text': '二同号复选',
          'routerlink': '/jxk3/t2fxJxk3'
        }, {
          'text': '二不同号',
          'routerlink': '/jxk3/bt2Jxk3'
        }, {
          'text': '三不同号',
          'routerlink': '/jxk3/bt3Jxk3'
        }, {
          'text': '三连号通选',
          'routerlink': '/jxk3/l3txJxk3'
        }
      ],
      curId: 0, // 选项卡切换
      timer: null,
      countdown: '00:00:00', // 倒计时
      centerDialogVisible: false,
      lottery_period_temp: '',
      lottery_stop_time_temp: '',
      trendData: '',
      periodDetail: [], // 期数详细数据
      DropDownShow: false, // 显示更多玩法
      morePeriodShow: false, // 显示前十期
      lottery_stop_time_flag: false,
      lastPeriod: '',
      morePeriodClass: ''
    }
  },
  watch: {
    // period_remain_second: function (newnum, oldnum) {
    //   // this.$store.dispatch('getLotteryStopTime', {name: 'JXK3'}).then(() => {
    //   // console.log("watch - period_remain_second", this.period_remain_second);
    //   // this.lottery_stop_time_flag = true;
    //   this.centerDialogVisible = false
    //   this.timeShow()
    //   // });
    // }
  },
  created () {
    this.$store.dispatch('getLotteryStopTime', {name: 'JXK3'})
      .then(() => {
        this.timeShow()
      })
    api.trend({
      lottery_alias: 'JXK3'
    })
      .then(res => {
        this.trendData = res.data[0].miss_count.normal
        localStorage.setItem('trendData', JSON.stringify(res.data))
        this.periodDetail = res.data.slice(0, 10).map((o, i) => {
          o.bonus_code.unshift('第' + o.lottery_period.slice(-3) + '期')
          return o.bonus_code
        })
        this.lastPeriod = res.data[0].lottery_period
        this.periodDetail = this.periodDetail.reverse()
      })
      .catch(err => console.log(err))
  },
  computed: {
    ...mapState({
      lotteryStopTime: state => state.period.jxk3StopTime,
      lottery_period: state => state.period.jxk3StopTime.lottery_period,
      lottery_stop_time: state => state.period.jxk3StopTime.lottery_stop_time,
      period_remain_second: state => state.period.jxk3StopTime.period_remain_second
    })
  },
  mounted () {},
  beforeDestroy () {
    // this.$store.state.period.jxk3StopTime = [];
    store.commit('jxk3StopTimeInit')
    // console.log("beforeDestroy - period_remain_second", this.period_remain_second);
    clearInterval(this.timer)
  },
  methods: {
    routerBack () {
      // 返回上一级
      window.history.length > 2 ? this.$router.go(-1) : this.$router.push('/home')
    },
    moreShow () {
      if (!this.morePeriodClass || this.morePeriodClass === 'morePeriodUp') {
        this.morePeriodClass = 'morePeriodDown'
      } else {
        this.morePeriodClass = 'morePeriodUp'
      }
      this.morePeriodShow = !this.morePeriodShow
    },
    toggleDropDown () {
      // 下拉框展示
      this.DropDownShow = !this.DropDownShow
      this.DownUp = !this.DownUp
      this.MenuShow = false
    },
    toggleDropDownLists (list, index) {
      // 下拉框投注玩法切换
      this.DropDownText = list.text
      this.DownUp = true
      this.DropDownShow = false
      this.curId = index
      // console.log(list.text);
    },
    toggleMenu () {
      // 菜单展示
      this.MenuShow = !this.MenuShow
      this.DropDownShow = false
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
    timeShow: function () {
      let period_remain_second = this.period_remain_second
      this.timer = setInterval(() => {
        if (period_remain_second > 0) {
          period_remain_second--
          let timeDistance = period_remain_second
          let hour = Math.floor(timeDistance / (60 * 60))
          timeDistance -= hour * (60 * 60)
          let minute = Math.floor(timeDistance / 60)
          timeDistance -= minute * 60
          let second = Math.floor(timeDistance)

          if (hour < 10) { hour = '0' + hour }
          if (minute < 10) { minute = '0' + minute }
          if (second < 10) { second = '0' + second }
          this.countdown = hour + ':' + minute + ':' + second
        } else {
          clearInterval(this.timer)
          this.lottery_period_temp = this.lottery_period

          {
            let self = this
            setTimeout(() => {
              self.$store.dispatch('getLotteryStopTime', {name: 'JXK3'})
                .then(() => {
                  self.timeShow()
                  this.centerDialogVisible = false
                })
            }, 3000)
          }
          this.centerDialogVisible = true
        }
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
.m-top-title .icon-arrow-left {
  position: absolute;
  top: 50%;
  left: 2rem;
  -webkit-transform: translate(0,-50%);
  -moz-transform: translate(0,-50%);
  transform: translate(0,-50%);
}
.g-tipsbox .m-title-h3{
  border-bottom: 1px solid #ccc;
  padding: 0 1.5rem;
}
.g-tipsbox .m-title-h3 span{
  text-align: center;
  display: block;
}
.g-tipsbox .m-title-h3 i{
  font-size: 2.6rem;
  color: #ddd;
  position: absolute;
  top: 0.5rem;
  right: 0;
}
.g-tipsbox .tips{
  font-size: 1.2rem;
  color: #999;
  line-height: 2;
  text-indent: 2.4rem;
  display: block;
}

.m-top-title i {
  position: absolute;
  top: 50%;
  -webkit-transform: translate(0,-50%);
  -moz-transform: translate(0,-50%);
  transform: translate(0,-50%);
}
.iconArrow{
  width: 0.7rem;
  height: 0.7rem;
  margin-left: 0.5rem;
  display: inline-block;
}
.iconArrowTop{
  transform: rotate(45deg);
  top: 0.2rem;
  position: relative;
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
}
.iconArrowBottom{
  transform: rotate(225deg);
  position: relative;
  top: -0.2rem;
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
}
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
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  ul li{
    font-size:1rem;
    height: 2.61rem;
    line-height: 2.61rem;
    img{
      width:1.8rem;
    }
  }
  ul li:nth-of-type(odd) {
    background: rgba(240,240,240,1);
  }
  ul li:nth-of-type(even) {
    background: #fff;
  }
  .periodsDefault{
    color: #999;
    label{
      display: inline-block;
      transform: scale(0.8);
    }
  }
  .periodsBlue{
    background: #369af6;
  }
}
.m-title-h3{
  border-bottom: none;
}
</style>
