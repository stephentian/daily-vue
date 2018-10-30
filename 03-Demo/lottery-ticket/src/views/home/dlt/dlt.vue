<template lang="html">
  <div id="dlt">
    <!-- <router-link :to="{ name: 'comDlt'}"></router-link> -->
    <!-- <router-link :to="{ name: 'dantuo'}"></router-link> -->
    <!-- <router-link to="/dlt/comDlt"></router-link>
    <router-link :to="{ name: 'dantuo'}"></router-link>
    <router-view></router-view> -->
    <header class="m-top g-top-login">
      <h2 class="m-top-title tac">
        <i class="iconfont icon-arrow-left mr10" @click="routerBack"></i>
        <!-- <span class="play-type-title">{{DropDownText}}</span> -->
        <span class="play-type-checkbox" @click="toggleDropDown()">大乐透-{{DropDownText}}
          <i class="iconfont ml5" :class="!DropDownShow ? 'icon-arrow-horizontal-down' : 'icon-arrow-horizontal-up'"></i>
        </span>
      </h2>
      <div class="m-top-txt" @click="toggleMenu()">
        <i class="iconfont icon-diandiandian"></i>
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
          <router-link tag="li" to="/open/dltresult"><i class="iconfont icon-BW_jinqigengxin_ mr5 ft20"></i><span>近期开奖</span></router-link>
          <router-link tag="li" :to="{ name: 'trend', query: { 'curId': 1}}"><i class="iconfont icon-zoushitu1 mr5 ft20"></i><span>走势图</span></router-link>
          <!-- <li><i class="iconfont icon-exclamatory-mark mr5"></i><span>玩法说明</span></li> -->
          <router-link tag="li" :to="{ name: 'dltWay'}"><i class="iconfont icon-guize mr5 ft20"></i><span>玩法说明</span></router-link>
        </ul>
      </div>
    </header>
    <div class="header-top-space"></div>
    <div class="morePeriod" :class="morePeriodClass">
      <ul>
        <li class="layoutFlex" v-for="(o, i) in periodDetail" :key = "i">
          <span v-for="(o1, i1) in o" class="tac" :key = "i1" :class="{'periodsDefault': i1 !== 0,'periodsBlue': i1 === 7 || i1 === 6}" :style="{'margin-right': i1 == 0 ? '1rem': ''}">
            <label>{{o1.toString().length === 1 ? '0' + o1 : o1}}</label>
          </span>
        </li>
      </ul>
    </div>
    <p class="morePeriodP" @click="moreShow()">{{ lottery_period }}期 {{ lottery_stop_time }} 截止
      <span class="fr mr5">奖池:{{totalsale}}元</span>
    </p>
    <com-dlt v-show="curId === 0" :eyeShow="eyeShow" :trendData="trendData" @moreShow="moreShow" @missShow="toggleEye()"></com-dlt>
    <dt-dlt v-show="curId === 1" :eyeShow="eyeShow" :trendData="trendData" @moreShow="moreShow" @missShow="toggleEye()"></dt-dlt>
    <trendMark v-if="!eyeShow"></trendMark>
    <trendMissMark></trendMissMark>
    <!-- <router-view :eyeShow="eyeShow"></router-view> -->
<!--     <section class="g-bet-box">
      <div class="m-bet-box" v-show="curId === 0">
        <p class="tac">第2017147期 12-14 19:14 （周四）截止投注</p>
        <h5 class="tar"><span class="tal fl">至少选择5个红球，2个蓝球</span><span class="tar" @click="randomBalls()"><i class="iconfont icon-lottery-random mr5"></i>机选一注</span></h5>
        <div class="balls mt10 mb" :class="eyeShow ? '' : 'mark'">
          <em class="white-ball red" v-for="(item,index) in reds" :class="{selected:item.isSelected}" @click="red_select(item,index)"><span>{{item.num}}</span><mark>25</mark></em>
        </div>
        <div class="balls mt10" :class="eyeShow ? '' : 'mark'">
          <em class="white-ball blue" v-for="(item,index) in blues" :class="{selected:item.isSelected}" @click="blue_select(item)"><span>{{item.num}}</span><mark>25</mark></em>
        </div>
      </div>
      <div class="m-bet-box"  v-show="curId === 1">
        <p class="tac">第2017147期 12-14 19:14 （周四）截止投注</p>
        <h5 class="tar"><span class="tal fl">胆码区-红球，可选1-4个</span><a class="red tdl tar" href="#">什么是胆拖？</a></h5>
        <div class="balls mt10 mb" :class="eyeShow ? '' : 'mark'">
          <em class="white-ball red" v-for="(item,index) in reds" :class="{selected:item.isSelected}" @click="red_select(item,index)"><span>{{item.num}}</span><mark>25</mark></em>
        </div>
        <h5 class="tal mt10">胆码区-蓝球，至多选择1个</h5>
        <div class="balls mt10 mb" :class="eyeShow ? '' : 'mark'">
          <em class="white-ball blue" v-for="(item,index) in blues" :class="{selected:item.isSelected}" @click="blue_select(item)"><span>{{item.num}}</span><mark>25</mark></em>
        </div>
        <h5 class="tal mt10">拖码区-红球，至少选择2个</h5>
        <div class="balls mt10 mb" :class="eyeShow ? '' : 'mark'">
          <em class="white-ball red" v-for="(item,index) in reds" :class="{selected:item.isSelected}" @click="red_select(item,index)"><span>{{item.num}}</span><mark>25</mark></em>
        </div>
        <h5 class="tal mt10">拖码区-蓝球，至少选择2个</h5>
        <div class="balls mt10 mb" :class="eyeShow ? '' : 'mark'">
          <em class="white-ball blue" v-for="(item,index) in blues" :class="{selected:item.isSelected}" @click="blue_select(item)"><span>{{item.num}}</span><mark>25</mark></em>
        </div>
      </div>
    </section>
    <bottom-bet @clear="init" :count="count" :money="money" @submit="submit" :canSubmit="canSubmit"></bottom-bet> -->
  </div>
</template>

<script>
import api from '@/api/api'
import comDlt from './comDlt'
import dtDlt from './dtDlt'
import {mapState} from 'vuex'
import trendMark from '@/components/trend-mask'
import trendMissMark from '@/components/trend-miss-mask'

export default {
  name: 'dlt',
  components: {
  //   bottomBet,
    comDlt,
    dtDlt,
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
      // reds:[],          //红色球
      // blues:[],         //蓝色球
      // reds_selected:[], //选中的红色色球
      // blues_selected:[],//选中的蓝色球
      // dlt:[],           //选中的大乐透
      // count:0,          //投注数
      // // count:this.count,          //投注数
      // money:0,          //投注金额
      // // money:this.money,          //投注金额
      // canSubmit:false   //提交投注
    }
  },
  created () {
    // this.init();  //初始化：35个红球，12个蓝球
    // router.push('/dlt/comDlt');
    this.$store.dispatch('getLotteryStopTime', {name: 'dlt'})
      .then(() => {
        api.bonusInfo({
          'lottery_alias': 'dlt',
          'lottery_period': ''
        })
          .then((res) => {
            this.totalsale = res.data
          })
      })
    api.trend({
      lottery_alias: 'dlt'
    })
      .then(res => {
        this.trendData = res.data[0].miss_count.normal
        localStorage.setItem('trendData', JSON.stringify(res.data))
        this.periodDetail = res.data.slice(0, 10).map((o, i) => {
          o.bonus_code.unshift(o.lottery_period.substr(-3) + '期')
          return o.bonus_code
        })
        this.periodDetail = this.periodDetail.reverse()

        console.log(this.periodDetail)
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
    //   if((this.reds_selected.length >= 5) && (this.blues_selected.length >= 2)){
    //     this.reds_selected.sort(function(a,b){return a-b});
    //     this.blues_selected.sort(function(a,b){return a-b});
    //     this.$set(this,'dlt',this.reds_selected.concat(this.blues_selected));
    //     this.$set(this,'canSubmit',true);
    //     if(this.reds_selected.length > 5 || this.blues_selected.length > 2) {
    //       this.count = (this.reds_selected.length - 5) * 6 * (this.blues_selected.length-1);
    //     } else{
    //       this.count = 1;
    //     }
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
      // this.$router.push('/home');
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
    // init: function(){
    //   //初始化
    //   var reds = [];
    //   var blues = [];
    //   for(var i = 1;i <= 35;i++){
    //     (i < 10) && (i = '0' + i);
    //     reds.push({num: i, isSelected: false});
    //   }
    //   for(var j = 1; j <= 12;j++){
    //     (j < 10) && (j = '0' + j);
    //     blues.push({num: j,isSelected: false});
    //   }
    //   this.$set(this, 'reds', reds);
    //   this.$set(this, 'blues', blues);
    //   this.reds_selected.length = 0;
    //   this.blues_selected.length = 0;
    //   this.canSubmit = false;
    //   this.count = 0;
    //   this.money = 0;
    // },
    // red_select: function(item,index){
    //   item.isSelected = !item.isSelected;
    //   if(item.isSelected){
    //     this.reds_selected.push(item.num);
    //   } else{
    //     for(var i = 0; i < this.reds_selected.length; i++){
    //       (this.reds_selected[i] == item.num) && (this.reds_selected.splice(i,1));
    //     }
    //   }
    //   this.check;
    //   console.log("reds_selected: " + this.reds_selected);
    // },
    // blue_select:function(item){
    //   item.isSelected = !item.isSelected;
    //   if(item.isSelected){
    //     this.blues_selected.push(item.num);
    //   } else{
    //     for(var i = 0; i < this.blues_selected.length; i++){
    //       (this.blues_selected[i] == item.num) && (this.blues_selected.splice(i,1));
    //     }
    //   }
    //   this.check;
    //   console.log("blues_selected: " + this.blues_selected);
    // },
    // randomBalls:function(){
    //   this.init();
    //   while(this.reds_selected.length < 5){
    //     var i = parseInt(Math.random() * 35);
    //     this.red_select(this.reds[i]);
    //   }
    //   while(this.blues_selected.length < 2){
    //     var j = parseInt(Math.random() * 12);
    //     this.blue_select(this.blues[j]);
    //   }
    // },
    // submit:function(){
    //   console.log("dlt_selected: " + this.dlt);
    //   // store.commit('dlt_add',this.dlt);
    //   // console.log(store.state.dlt.ticket);
    //   router.push('dltcart');
    // }
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
    align-items: center;
    justify-content: space-between;
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
