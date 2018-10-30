<template>
  <div id="dlc">
    <header class="m-top g-top-login">
      <h2 class="m-top-title tac">
        <i class="iconfont icon-arrow-left mr10" @click="routerBack"></i><span class="play-type-title"></span>
        <span class="play-type-checkbox" @click="toggleDropDown()">11选5-{{DropDownText}}<i class="iconfont ml5" :class="DownUp ? 'icon-arrow-horizontal-down' : 'icon-arrow-horizontal-up'"></i></span></h2>
      <div class="m-top-txt" @click="toggleMenu()">
        <i class="iconfont icon-diandiandian"></i>
      </div>
      <div class="m-top-menu box-shadow" v-show="MenuShow">
        <ul>
          <router-link tag="li" to="/open/dlcresult"><i class="iconfont icon-BW_jinqigengxin_ mr5 ft20"></i><span>近期开奖</span></router-link>
          <router-link tag="li" :to="{ name: 'trend', query: { 'curId': 2}}"><i class="iconfont icon-zoushitu1 ft20 mr5"></i><span>走势图</span></router-link>
          <router-link tag="li" :to="{ name: 'dlcWay'}"><i class="iconfont icon-guize mr5 ft20"></i><span>玩法说明</span></router-link>
        </ul>
      </div>
      <div class="m-top-choose box-shadow" v-show="DropDownShow">
        <ul>
          <li class="tac" :class="{'active': curId === index}" v-for="(list,index) in DropDownLists" @click="toggleDropDownLists(list,index)" :key=list.id :to="{path: list.routerlink}">{{list.text}}</li>
        </ul>
      </div>
    </header>
    <div class="header-top-space"></div>
    <!-- <p class="tac"><span>距{{ lottery_period }}期还有</span> <span class="red">{{ countdown }}</span></p>  -->
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
        <div class="mr5">
          <p>{{ lastPeriod }}期开奖结果</p>
          <div>
            <template v-for="(o2, i2) in periodDetail[9]">
              <span :key="i2 = '1'" class="red comFt13" v-if="i2 === 0 ? false : true">
                {{o2}}
              </span>
            </template>
          </div>
        </div>
        <i class="iconfont ft15 ml5 icon-shuangjiantou" :style="{'transform': morePeriodShow ? 'rotate(180deg)' : ''}"></i>
      </div>
    </div>
    <div class="morePeriod" :class="morePeriodClass">
      <ul>
        <li v-for="(o, i) in periodDetail" :key = "i">
          <span v-for="(o1, i1) in o" class="tac" :key = "i1" :class="{'periodsDefault': i1 !== 0,'periodsBlue': i1 === 7}" :style="{'margin-left': i1 === 1 ? '2.2rem' : '0rem'}">
            <label>
              {{o1.toString().length === 1 ? '0' + o1 : o1}}
            </label>
          </span>
        </li>
      </ul>
    </div>
    <rx2-dlc v-show="curId === 0" :eyeShow="eyeShow" :trendData="trendData" @moreShow="moreShow" @missShow="toggleEye()"></rx2-dlc>
    <rx3-dlc v-show="curId === 1" :eyeShow="eyeShow" :trendData="trendData" @moreShow="moreShow" @missShow="toggleEye()"></rx3-dlc>
    <rx4-dlc v-show="curId === 2" :eyeShow="eyeShow" :trendData="trendData" @moreShow="moreShow" @missShow="toggleEye()"></rx4-dlc>
    <rx5-dlc v-show="curId === 3" :eyeShow="eyeShow" :trendData="trendData" @moreShow="moreShow" @missShow="toggleEye()"></rx5-dlc>
    <rx6-dlc v-show="curId === 4" :eyeShow="eyeShow" :trendData="trendData" @moreShow="moreShow" @missShow="toggleEye()"></rx6-dlc>
    <rx7-dlc v-show="curId === 5" :eyeShow="eyeShow" :trendData="trendData" @moreShow="moreShow" @missShow="toggleEye()"></rx7-dlc>
    <rx8-dlc v-show="curId === 6" :eyeShow="eyeShow" :trendData="trendData" @moreShow="moreShow" @missShow="toggleEye()"></rx8-dlc>
    <rx1-dlc v-show="curId === 7" :eyeShow="eyeShow" :trendData="trendData" @moreShow="moreShow" @missShow="toggleEye()"></rx1-dlc>
    <q2com-dlc v-show="curId === 8" :eyeShow="eyeShow" :trendData="trendData" @moreShow="moreShow" @missShow="toggleEye()"></q2com-dlc>
    <q3com-dlc v-show="curId === 9" :eyeShow="eyeShow" :trendData="trendData" @moreShow="moreShow" @missShow="toggleEye()"></q3com-dlc>
    <q2zx-dlc v-show="curId === 10" :eyeShow="eyeShow" :trendData="trendData" @moreShow="moreShow" @missShow="toggleEye()"></q2zx-dlc>
    <q3zx-dlc v-show="curId === 11" :eyeShow="eyeShow" :trendData="trendData" @moreShow="moreShow" @missShow="toggleEye()"></q3zx-dlc>
    <trendMark v-if="!eyeShow"></trendMark>
    <trendMissMark></trendMissMark>
    <div class="popup-box" v-show="centerDialogVisible">
      <div class="popup-wrap middle">
        <h3 class="m-title-h3"><span class="red ft15">提示</span></h3>
        <div style="text-align:center" class="mt5 ml15 mr15 mb20 ft12">
          <span class="tips">尊敬的用户，<em class="red">{{ lottery_period}}</em>期已截止</span><br>
          <span class="tips">期号已更新至下一期，请您核对期号后再投注。</span>
        </div>
        <div class="m-bottom-btn">
          <div  class="m-footer-btn1 bgColor" @click="centerDialogVisible = false">
            确认
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from '@/api/api'
import store from '@/store/index.js'
import { mapState } from 'vuex'
// import store from '@/store/store.js'
// import bottomBet from '@/components/bottom-bet/bottomBet'
import rx1Dlc from './rx1Dlc'
import rx2Dlc from './rx2Dlc'
import rx3Dlc from './rx3Dlc'
import rx4Dlc from './rx4Dlc'
import rx5Dlc from './rx5Dlc'
import rx6Dlc from './rx6Dlc'
import rx7Dlc from './rx7Dlc'
import rx8Dlc from './rx8Dlc'
import q2comDlc from './q2comDlc'
import q3comDlc from './q3comDlc'
import q2zxDlc from './q2zxDlc'
import q3zxDlc from './q3zxDlc'
import trendMark from '@/components/trend-mask'
import trendMissMark from '@/components/trend-miss-mask'

export default {
  name: 'dlc',
  components: {
    rx1Dlc,
    rx2Dlc,
    rx3Dlc,
    rx4Dlc,
    rx5Dlc,
    rx6Dlc,
    rx7Dlc,
    rx8Dlc,
    q2comDlc,
    q3comDlc,
    q2zxDlc,
    q3zxDlc,
    trendMark,
    trendMissMark
  },
  data () {
    return {
      MenuShow: false, // 菜单展示
      eyeShow: true, // 遗漏显隐
      eyeText: '显示', // 遗漏显隐内容
      DownUp: true, // 下拉框图标
      DropDownText: '前一', // 下拉框内容
      DropDownLists: [
        {
          'text': '任选二',
          'routerlink': '/dlc/rx2Dlc'
        }, {
          'text': '任选三',
          'routerlink': '/dlc/rx3Dlc'
        },
        {
          'text': '任选四',
          'routerlink': '/dlc/rx4Dlc'
        }, {
          'text': '任选五',
          'routerlink': '/dlc/rx5Dlc'
        }, {
          'text': '任选六',
          'routerlink': '/dlc/rx6Dlc'
        }, {
          'text': '任选七',
          'routerlink': '/dlc/rx7Dlc'
        }, {
          'text': '任选八',
          'routerlink': '/dlc/rx8Dlc'
        }, {
          'text': '前一',
          'routerlink': '/dlc/rx1Dlc'
        }, {
          'text': '前二直选',
          'routerlink': '/dlc/q2comDlc'
        }, {
          'text': '前三直选',
          'routerlink': '/dlc/q3comDlc'
        }, {
          'text': '前二组选',
          'routerlink': '/dlc/q2zxDlc'
        }, {
          'text': '前三组选',
          'routerlink': '/dlc/q3zxDlc'
        }
      ],
      curId: 7, // 选项卡切换
      timer: null,
      countdown: '00:00:00', // 倒计时
      centerDialogVisible: false, // 提示框展示
      lottery_period_temp: '',
      trendData: '',
      periodDetail: [], // 期数详细数据
      DropDownShow: false, // 显示更多玩法
      morePeriodShow: false, // 显示前十期
      lottery_stop_time_flag: false,
      lastPeriod: '',
      morePeriodClass: ''
    }
  },
  created () {
    this.$store.dispatch('getLotteryStopTime', {name: 'dlc'})
      .then(() => {
        this.timeShow()
      })
    api.trend({
      lottery_alias: 'dlc'
    })
      .then(res => {
        this.trendData = res.data[0].miss_count.normal
        localStorage.setItem('trendData', JSON.stringify(res.data))
        this.periodDetail = res.data.slice(0, 10).map((o, i) => {
          o.bonus_code.unshift(o.lottery_period.substr(-2) + '期')
          return o.bonus_code
        })

        this.lastPeriod = res.data[0].lottery_period
        this.periodDetail = this.periodDetail.reverse()
      })
      .catch(err => console.log(err))
  },
  computed: {
    ...mapState({
      lotteryStopTime: state => state.period.dlcStopTime,
      lottery_period: state => state.period.dlcStopTime.lottery_period,
      lottery_stop_time: state => state.period.dlcStopTime.lottery_stop_time,
      period_remain_second: state => state.period.dlcStopTime.period_remain_second
    })
  },
  beforeDestroy () {
    store.commit('dlcStopTimeInit')
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
      // 倒计时
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
              self.$store.dispatch('getLotteryStopTime', {name: 'dlc'})
                .then(() => {
                  this.centerDialogVisible = false
                  this.timeShow()
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
  }
  ul li:nth-of-type(odd) {
    background: rgba(240,240,240,1);
  }
  ul li:nth-of-type(even) {
    background: #fff;
  }
  .periodsDefault{
    color: #fff;
    background: #E52222;
    width: 1.33rem;
    height: 1.33rem;
    line-height: 1.33rem;
    border-radius: 50%;
    margin-right: 2.2rem;
    display: inline-block;
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
.m-title-h3{
  border-bottom: none;
}
</style>
