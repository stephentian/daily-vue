<template>
  <div id="jczq">
    <header class="m-top g-top-login">
      <h2 class="m-top-title tac">
        <i class="iconfont icon-arrow-left mr10" @click="routerBack"></i>
        <!-- <span class="play-type-title"></span> -->
        <span class="play-type-checkbox" @click="toggleDropDown()">{{DropDownText}}<i class="iconfont ml5" :class="DownUp ? 'icon-arrow-horizontal-down' : 'icon-arrow-horizontal-up'"></i></span>
      </h2>
      <div class="m-top-txt">
        <i class="iconfont icon-shaixuan mr10" @click="FilterShow()"></i>
        <i @click="toggleMenu()" class="iconfont icon-diandiandian"></i>
      </div>
      <div class="m-top-menu box-shadow" v-show="MenuShow">
        <ul>
          <router-link tag="li" to="/open/jczqresult"><i class="iconfont icon-BW_jinqigengxin_ mr5 ft20"></i><span>近期开奖</span></router-link>
          <!-- 暂无数据，不使用 -->
          <!-- <li @click="toggleEye()"><i class="iconfont mr5" :class="eyeShow ? ' icon-eye-show' : 'icon-eye-hide'"></i><span>{{eyeText}}遗漏</span></li> -->
          <router-link tag="li" :to="{ name: 'jczqWay'}"><i class="iconfont icon-guize mr5 ft20"></i><span>玩法说明</span></router-link>
        </ul>
      </div>
      <div class="m-top-choose box-shadow" v-show="DropDownShow">
        <ul>
          <li class="tac" :class="{'active': curId === index}" v-for="(list,index) in DropDownLists" @click="toggleDropDownLists(list,index)" :key=list.id :to="{path: list.routerlink}">{{list.text}}</li>
        </ul>
      </div>
    </header>
    <div class="header-top-space"></div>
    <spf-jczq v-show="curId === 0" :eyeShow="eyeShow" :countdown="countdown"></spf-jczq>
    <rqspf-jczq v-show="curId === 1" :eyeShow="eyeShow" :countdown="countdown"></rqspf-jczq>
    <bf-jczq v-show="curId === 2" :eyeShow="eyeShow" :countdown="countdown"></bf-jczq>
    <zjq-jczq v-show="curId === 3" :eyeShow="eyeShow" :countdown="countdown"></zjq-jczq>
    <bqc-jczq v-show="curId === 4" :eyeShow="eyeShow" :countdown="countdown"></bqc-jczq>
    <hhgg-jczq v-show="curId === 5" :eyeShow="eyeShow" :countdown="countdown"></hhgg-jczq>
    <exy-jczq v-show="curId === 6" :eyeShow="eyeShow" :countdown="countdown"></exy-jczq>
    <dggd-jczq v-show="curId === 7" :eyeShow="eyeShow" :countdown="countdown"></dggd-jczq>
    <div class="popup-box" v-show="centerDialogVisible">
      <div class="popup-wrap middle">
        <div class="m-tab">
          <a class="qx tac w33" :class="{'active': actId === 0}" @click="matchFilter(0)">全选</a>
          <a class="fx tac w33" :class="{'active': actId === 1}" @click="matchFilter(1)">反选</a>
          <a class="wd tac w33" :class="{'active': actId === 2}" @click="matchFilter(2)">五大联赛</a>
        </div>
        <div class="m-match-filter mt10 mb5">
          <em v-for="(item,index) in leagues" :class="{red:item.isSelected}" @click="league_select(item, index)" :key="index">{{ item.league }}</em>
        </div>
        <div class="m-bottom-btn">
          <button class="m-bottom-btn-white" @click="cancelFilter">取消</button>
          <button class="m-bottom-btn-red bgColor" @click="sureFilter">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import store from '@/store/index.js'
import { mapState } from 'vuex'

import spfJczq from './spfJczq'
import rqspfJczq from './rqspfJczq'
import bfJczq from './bfJczq'
import zjqJczq from './zjqJczq'
import bqcJczq from './bqcJczq'
import hhggJczq from './hhggJczq'
import exyJczq from './exyJczq'
import dggdJczq from './dggdJczq'

export default {
  name: 'jczq',
  components: {
    spfJczq,
    rqspfJczq,
    bfJczq,
    zjqJczq,
    bqcJczq,
    hhggJczq,
    exyJczq,
    dggdJczq
  },
  data () {
    return {
      MenuShow: false, // 菜单展示
      eyeShow: true, // 遗漏显隐
      eyeText: '显示', // 遗漏显隐内容
      DownUp: true, // 下拉框图标
      DropDownShow: false, // 下拉框展示
      DropDownText: '胜平负', // 下拉框内容
      DropDownLists: [
        {
          'text': '胜平负',
          'routerlink': '/jczq/spJczq',
          'lottery_id': 'FT01'
        },
        {
          'text': '让球胜平负',
          'routerlink': '/jczq/rqspJczq',
          'lottery_id': 'FT02'
        },
        {
          'text': '比分',
          'routerlink': '/jczq/bfJczq',
          'lottery_id': 'FT03'
        },
        {
          'text': '总进球',
          'routerlink': '/jczq/zjqJcz',
          'lottery_id': 'FT04'
        },
        {
          'text': '半全场',
          'routerlink': '/jczq/bqcJczq',
          'lottery_id': 'FT05'
        },
        {
          'text': '混合过关',
          'routerlink': '/jczq/hhggJczq',
          'lottery_id': 'FT09'
        }
        // {
        //   "text" : "2选1",
        //   "routerlink" : "/jczq/exyJczq",
        //   "lottery_id": "FT01",
        // },{
        //   "text" : "单关固定",
        //   "routerlink" : "/jczq/dggdJczq",
        //   "lottery_id": "FT01",
        // },
      ],
      curId: 0, // 选项卡切换
      timer: '',
      countdown: '00:00:00', // 倒计时
      centerDialogVisible: false,
      lottery_period_temp: '',
      actId: 0,
      lottery_id: 'FT01'
      // filterSelect: false,
    }
  },
  watch: {
    leagues: function (newnum, oldnum) {
      // console.log("watch - leagues: ", newnum, oldnum);
    }
  },
  created () {
    store.dispatch('getFTQuery', {game: 'FT', lottery_id: 'FT01'})
  },
  computed: {
    ...mapState({
      leagues: state => {
        if (state.jczq.leagues.length > 0) {
          return state.jczq.leagues
        } else {
          return []
        }
      },
      filterSelect: state => state.jczq.filterSelect
    })
  },
  mounted () {},
  methods: {
    routerBack () {
      // 返回上一级
      window.history.length > 2 ? this.$router.go(-1) : this.$router.push('/home')
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
      this.lottery_id = list.lottery_id
      store.dispatch('getFTQuery', {game: 'FT', lottery_id: list.lottery_id})
      // this.init();
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
    FilterShow () {
      this.centerDialogVisible = true
      this.actId = -1
    },
    matchFilter (i) {
      this.actId = i
      store.commit('FTleaguesStore')
      store.commit('FTleaguesSelect', {type: i})
    },
    league_select (item, index) {
      // console.log("league_select: ", JSON.parse(JSON.stringify(item)), index);
      // item.isSelected = !item.isSelected;
      store.commit('FTleaguesStore')
      store.commit('FTleaguesSelect', {index: index})
    },
    cancelFilter () {
      store.commit('FTleaguesStore')
      this.centerDialogVisible = false
      store.commit('FTleaguesChange', {filterSelect: false})
    },
    sureFilter () {
      this.centerDialogVisible = false
      store.commit('FTleaguesChange', {filterSelect: true})
      this.$store.dispatch('getLeaguesFilter', {lottery_id: this.lottery_id})
    }
    // init: function(){
    //   // 初始化  // todo 通用
    //   var FT01Query = store.state.jczq.FT01Query;
    //   for (let index = 0, len = FT01Query.length; index < len; index++) {
    //     // console.log(index, FT01Query[index], ' - ', FT01Query[index][1].length)
    //     for(let i = 0, len = FT01Query[index][1].length; i < len; i++){
    //       // console.log(FT01Query[index][1][i])
    //       if (FT01Query[index][1][i].homeSelected == true ) {
    //         store.commit('FT01matchSelect', {index: index,i: i,m: 0});
    //       }
    //       if (FT01Query[index][1][i].drawSelected == true) {
    //         store.commit('FT01matchSelect', {index: index,i: i,m: 1});
    //       }
    //       if (FT01Query[index][1][i].awaySelected == true ) {
    //         store.commit('FT01matchSelect', {index: index,i: i,m: 2});
    //       }
    //     }
    //   }
    //   this.$store.state.jczq.jczq = [];
    //   // this.canSubmit = false;
    //   // this.match = 0;
    //   store.commit('FTmatch', 0);
    // },
  }
}
</script>
<style lang="css" scoped>
.popup-wrap {
  padding: 1.5rem 2rem;
  background: #f0f0f0;
}
.popup-wrap .m-tab {
  border: 1px solid #d6d7dc;
  background: #f0f0f0;
}
.popup-wrap .m-tab a {
  font-size: 1.4rem;
  background: #fff;
  color: #333;
}
.popup-wrap .m-tab a.active,.popup-wrap .m-tab a:active{
  background: #e52222;
  color: #fff;
}
.m-match-filter{
  width: 100%;
  /*min-width: 22rem;*/
  height: auto;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: -moz-flex;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.m-match-filter em{
  width: 30%;
  min-width: 6rem;
  height: 3.2em;
  margin: 0 5% 1rem 0;
  padding: 1rem 0;
  border: 1px solid #d6d7dc;
  font-size: 1.2rem;
  background: #fff;
  color: #999;
  display: inline-block;
  text-align: center;
  /* position: relative; */
  /* float: left; */
}
.m-match-filter em:nth-child(3n){
  margin: 0 0 1rem 0;
}
.m-match-filter em.red{
  border: 1px solid #e52222;
  color: #e52222;
}
.m-bottom-btn-white,.m-bottom-btn-red{
  width: 45%;
  font-size: 1.4rem;
  -webkit-border-radius: 0.2rem;
  -moz-border-radius: 0.2rem;
  border-radius: 0.2rem;
}
.m-bottom-btn-white{
  margin-right: 10%;
  border: 1px solid #d6d7dc;
  color: #999;
}
.m-bottom-btn-red{
  border: 1px solid #e52222;
}
</style>
