<template>
  <div id="fc3d">
    <header class="m-top g-top-login">
      <h2 class="m-top-title tac">
        <i class="iconfont icon-arrow-left mr10" @click="routerBack"></i>
        <!-- <span class="play-type-title">{{DropDownText}}</span> -->
        <span class="play-type-checkbox" @click="toggleDropDown()">福彩3d-{{DropDownText}}<i class="iconfont ml5" :class="DownUp ? 'icon-arrow-horizontal-down' : 'icon-arrow-horizontal-up'"></i></span>
      </h2>
      <div class="m-top-txt" @click="toggleMenu()">
        <i class="iconfont icon-diandiandian"></i>
      </div>
      <div class="m-top-menu box-shadow" v-show="MenuShow">
        <ul>
          <router-link tag="li" to="/open/3dresult"><i class="iconfont icon-BW_jinqigengxin_ mr5 ft20"></i><span>近期开奖</span></router-link>
          <!-- 暂无数据，不使用 -->
          <!-- <li @click="toggleEye()"><i class="iconfont mr5" :class="eyeShow ? ' icon-eye-show' : 'icon-eye-hide'"></i><span>{{eyeText}}遗漏</span></li> -->
          <router-link tag="li" :to="{ name: 'trend', query: { 'curId': 4}}"><i class="icon iconfont icon-zoushitu1 mr5 ft20"></i><span>走势图</span></router-link>
          <!-- <li><i class="iconfont icon-exclamatory-mark mr5"></i><span>玩法说明</span></li> -->
          <router-link tag="li" :to="{ name: 'fc3dWay'}"><i class="iconfont icon-guize mr5 ft20"></i><span>玩法说明</span></router-link>
        </ul>
      </div>
      <div class="m-top-choose box-shadow" v-show="DropDownShow">
        <ul>
          <!-- <li class="tac" :class="{active:curId == index}" v-for="(list,index) in DropDownLists" @click="toggleDropDownLists(list,index)">{{list.text}}</li> -->
          <!-- <router-link tag="li" class="tac" active-class="active" v-for="(list,index) in DropDownLists" @click.native="toggleDropDownLists(list,index)" :key=list.id :to="{path: list.routerlink}">{{list.text}}</router-link> -->
          <li class="tac" :class="{'active': curId === index}" v-for="(list,index) in DropDownLists" @click="toggleDropDownLists(list,index)" :key=list.id :to="{path: list.routerlink}">{{list.text}}</li>
          <!-- <li class="tac" :class="{'active': curId === 0}" @click="curId = 0;">单式</li>
          <li class="tac" :class="{'active': curId === 1}" @click="curId = 1;">组选三</li>
          <li class="tac" :class="{'active': curId === 2}" @click="curId = 2;">组选六</li> -->
        </ul>
      </div>
    </header>
    <div class="header-top-space"></div>
    <div class="morePeriod" :class="morePeriodClass">
      <ul>
        <li v-for="(o, i) in periodDetail" :key = "i">
          <span v-for="(o1, i1) in o" class="tac" :key = "i1" :class="{'periodsDefault': i1 !== 0,'periodsBlue': i1 === 7}" :style="{'margin-left':i1 === 1 ? '2.2rem' : '0'}">
            {{o1}}
          </span>
        </li>
      </ul>
    </div>
    <p class="tal morePeriodP" @click="morePeriodShow = !morePeriodShow" >
      {{ lottery_period }}期 {{ lottery_stop_time }} 截止
     <!--  <i class="iconfont ml5" :class="!morePeriodShow? 'icon-arrow-horizontal-down' : 'icon-arrow-horizontal-up'"></i> -->
     <i class="iconArrow" :class="morePeriodShow ? 'iconArrowTop' : 'iconArrowBottom'"></i>
    </p>
    <!-- <router-view :eyeShow="eyeShow"></router-view> -->
    <com-sd v-show="curId === 0" :eyeShow="eyeShow" @moreShow="moreShow()" @missShow="toggleEye()" :trendData="trendData"></com-sd>
    <zx3-sd v-show="curId === 1" :eyeShow="eyeShow" @moreShow="moreShow()" @missShow="toggleEye()" :trendData="trendData"></zx3-sd>
    <zx6-sd v-show="curId === 2" :eyeShow="eyeShow" @moreShow="moreShow()" @missShow="toggleEye()" :trendData="trendData"></zx6-sd>
    <trendMark v-if="!eyeShow"></trendMark>
    <trendMissMark></trendMissMark>
<!--     <section class="g-bet-box">
      <div class="m-bet-box" v-show="curId === 0">
        <p class="tac"><span>距55期还有</span> <span class="red">00:07:09</span></p>
        <h5 class="tar"><span class="tal fl">百位，选择1个号码</span><span class="tar" @click="randomBalls()"><i class="iconfont icon-lottery-random mr5"></i>机选一注</span></h5>
        <div class="balls mt10 mb" :class="eyeShow ? '' : 'mark'">
          <em class="white-ball red" v-for="(item,index) in bai" :class="{selected:item.isSelected}" @click="bai_select(item,index)"><span>{{item.num}}</span><mark>25</mark></em>
        </div>
        <h5 class="tal mt10">十位，选择1个号码</h5>
        <div class="balls mt10 mb" :class="eyeShow ? '' : 'mark'">
          <em class="white-ball red" v-for="(item,index) in shi" :class="{selected:item.isSelected}" @click="shi_select(item,index)"><span>{{item.num}}</span><mark>25</mark></em>
        </div>
        <h5 class="tal mt10">个位，选择1个号码</h5>
        <div class="balls mt10 mb" :class="eyeShow ? '' : 'mark'">
          <em class="white-ball red" v-for="(item,index) in ge" :class="{selected:item.isSelected}" @click="ge_select(item,index)"><span>{{item.num}}</span><mark>25</mark></em>
        </div>
      </div>
      <div class="m-bet-box"  v-show="curId === 1">
      </div>
      <div class="m-bet-box"  v-show="curId === 2">
      </div>
    </section>
    <bottom-bet @clear="init" :count="count" :money="money" @submit="submit" :canSubmit="canSubmit"></bottom-bet> -->
  </div>
</template>

<script>
import api from '@/api/api.js'
import comSd from './comD3'
import zx3Sd from './zx3D3'
import zx6Sd from './zx6D3'
import { mapState } from 'vuex'
import trendMark from '@/components/trend-mask'
import trendMissMark from '@/components/trend-miss-mask'

export default {
  name: 'sd',
  components: {
    // bottomBet,
    comSd,
    zx3Sd,
    zx6Sd,
    trendMark,
    trendMissMark
  },
  data () {
    return {
      MenuShow: false, // 菜单展示
      eyeShow: true, // 遗漏显隐
      eyeText: '显示', // 遗漏显隐内容
      DownUp: true, // 下拉框图标
      DropDownShow: false, // 下拉框展示
      DropDownText: '直选', // 下拉框内容
      curId: 0, // 选项卡切换
      trendData: '',
      morePeriodClass: '',
      periodDetail: [], // 期数详细数据
      morePeriodShow: false, // 显示前十期
      DropDownLists: [
        {
          'text': '直选',
          'routerlink': '/3d/comD3'
        }, {
          'text': '组选三',
          'routerlink': '/3d/zx3D3'
        }, {
          'text': '组选六',
          'routerlink': '/3d/zx6D3'
        }
      ]
      // bai:[],             //百位球
      // shi:[],             //十位球
      // ge:[],              //个位球
      // bai_selected:[],    //选中的百位球
      // shi_selected:[],    //选中的十位球
      // ge_selected:[],     //选中的个位球
      // count:0,            //投注数
      // // count:this.count,            //投注数
      // money:0,            //投注金额
      // // money:this.money,            //投注金额
      // canSubmit:false     //提交投注
    }
  },
  created () {
    // this.init();  //0-9个号码
    // router.push('/3d/comD3');
    this.$store.dispatch('getLotteryStopTime', {name: '3d'})

    api.trend({
      lottery_alias: '3d'
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
    // check:function(){
    //   if((this.bai_selected.length >= 1) && (this.shi_selected.length >= 1) && (this.ge_selected.length >= 1)){
    //     this.$set(this,'count',this.bai_selected.length*this.shi_selected.length*this.ge_selected.length);
    //     this.$set(this,'canSubmit',true);
    //     this.money = this.count * 2;
    //   }else{
    //     this.canSubmit = false;
    //     this.count = 0;
    //     this.money = 0;
    //   }
    // }
  },
  mounted () {},
  methods: {
    routerBack () {
      // 返回上一级
      window.history.length > 2 ? this.$router.go(-1) : this.$router.push('/home')
      // this.$router.push('/home');
    },
    toggleDropDown () {
      // 下拉框展示
      this.DropDownShow = !this.DropDownShow
      this.DownUp = !this.DownUp
      this.MenuShow = false
    },
    toggleDropDownLists (list, index) {
      // 下拉框投注玩法切换
      // this.curId = index;
      // this.DropDownText = text;
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
    moreShow () {
      if (!this.morePeriodClass || this.morePeriodClass === 'morePeriodUp') {
        this.morePeriodClass = 'morePeriodDown'
      } else {
        this.morePeriodClass = 'morePeriodUp'
      }
    }
    // init: function(){
    //   //初始化
    //   var bai = [];
    //   var shi = [];
    //   var ge = [];
    //   for(var i = 0;i < 10;i++){
    //     bai.push({num: i, isSelected: false});
    //     shi.push({num: i, isSelected: false});
    //     ge.push({num: i, isSelected: false});
    //   }
    //   this.$set(this, 'bai', bai);
    //   this.$set(this, 'shi', shi);
    //   this.$set(this, 'ge', ge);
    //   this.bai_selected.splice(0, this.bai_selected.length);
    //   this.shi_selected.splice(0, this.shi_selected.length);
    //   this.ge_selected.splice(0, this.ge_selected.length);
    //   this.check;
    //   this.canSubmit = false;
    //   this.count = 0;
    //   this.money = 0;
    // },
    // bai_select: function(item){
    //   item.isSelected = !item.isSelected;
    //   if(item.isSelected){
    //     this.bai_selected.push(item.num);
    //   } else{
    //     for(var i = 0; i < this.bai_selected.length; i++){
    //       (this.bai_selected[i] == item.num) && (this.bai_selected.splice(i, 1));
    //     }
    //   }
    //   this.check;
    // },
    // shi_select:function(item){
    //   item.isSelected = !item.isSelected;
    //   if(item.isSelected){
    //     this.shi_selected.push(item.num);
    //   }else{
    //     for(var i = 0; i < this.shi_selected.length; i++){
    //       (this.shi_selected[i] == item.num) && (this.shi_selected.splice(i, 1));
    //     }
    //   }
    //   this.check;
    // },
    // ge_select:function(item){
    //   item.isSelected = !item.isSelected;
    //   if(item.isSelected){
    //     this.ge_selected.push(item.num);
    //   }else{
    //     for(var i = 0; i<this.ge_selected.length; i++){
    //       (this.ge_selected[i] == item.num) && (this.ge_selected.splice(i, 1));
    //     }
    //   }
    //   this.check;
    // },
    // randomBalls: function(){
    //   this.init();
    //   var bai = parseInt(Math.random() * 10);
    //   this.bai_select(this.bai[bai]);
    //   var shi = parseInt(Math.random() * 10);
    //   this.shi_select(this.shi[shi]);
    //   var ge = parseInt(Math.random() * 10);
    //   this.ge_select(this.ge[ge]);
    //   this.check;
    // },
    // submit:function(){
    //   console.log("bai_selected: " + this.bai_selected);
    //   console.log("shi_selected: " + this.shi_selected);
    //   console.log("ge_selected: " + this.ge_selected);
    //   router.push('d3cart');
    // }
  }
}
</script>

<style lang="scss" scoped>
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
    margin-right: 2.2rem;
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
.m-bet-box .balls em{
  margin: 0 0 1rem 0%;
  margin-right: 1rem;
}
</style>
