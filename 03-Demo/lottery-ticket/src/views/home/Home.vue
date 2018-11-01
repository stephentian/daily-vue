<template lang="html">
  <div id="newHome">
    <v-loading v-show="loading"></v-loading>
    <section class="g-banner">
      <swiper :options="swiperOption" class="m-banner" v-if="bannerList.length">
        <swiper-slide class="swiper-item" v-for="(item, index) in bannerList" :key="index">
          <a @click="toBanner(item.target_url)" href="javascript:;" target="_blank"><img :src="item.img_url"></a>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </section>
    <!-- 双色球选号 -->
    <section class="exchangePosition">
      <section v-show="totalData.show_index ==='1' && totalData.jczq_switch === '1'" v-if="totalData.jczq ? true : false" class="m-index-focus" >
        <div>
          <div class="m-index-focus-icon">
            <img src="../../../public/images/focusIcon.png" alt="">
          </div>
          <div class="m-index-focus-select">
            <div class="m-index-focus-home" :class="teamSelect.homeWin ? 'focusActive' : ''" @click="teamSelectFnc(0)">
              <p><span>{{ totalData.jczq.home_team}}</span><span>胜</span></p>
              <span>{{totalData.jczq.rates['3']}}</span>
            </div>
            <div class="m-index-focus-flat"  :class="teamSelect.flat ? 'focusActive' : ''" @click="teamSelectFnc(1)">
              <p><span>平</span></p>
              <span>{{totalData.jczq.rates['1']}}</span>
            </div>
            <div class="m-index-focus-away" :class="teamSelect.awayWin ? 'focusActive' : ''" @click="teamSelectFnc(2)">
              <p><span>{{totalData.jczq.away_team}}</span><span>胜</span></p>
              <span>{{totalData.jczq.rates['0']}}</span>
            </div>
          </div>
          <div class="m-index-focus-submit">
            <div class="m-index-focus-input">
              <div class="selectMount layoutFlex">
                <input v-model.number="value" type="number" @change="numberChange(value)">
                <span class="text">倍</span>
                <span class="arrow" @click="arrowClick()"><i class="iconfont ml5" :class="DownUp ? 'icon-arrow-horizontal-up' : 'icon-arrow-horizontal-down'"></i></span>
                <div class="selectOption" v-show="DownUp">
                  <ul>
                    <li v-for="(item ,index) in options" @click="selectNumberFnc(item)"
                  :key="index">{{item}}</li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="m-index-focus-btn textEllipsis" @click="popShowFnc">
              <span>提交方案</span><span>(预计奖金{{foreBonus}}元)</span>
            </div>
          </div>
        </div>
      </section>
      <section v-show="totalData.show_index !=='1' && totalData.ssq_switch === '1'" class="m-index-ssq" >
        <div>
          <p class="m-index-title"><span class="m-index-title-txt">双色球</span><span class="m-index-tilte-more"></span></p>
          <div class="m-index-ssq-number">
            <div class="m-index-ssq-number-l">
              <ul>
                <li v-for="(item, index) in reds_selected" :key="index" :class="{'classScale': classList[index] }">
                  {{item}}
                </li>
                <li style="background:#208EFD;color:#fff;border:1px solid #208EFD;" :class="{'classScale': classList[6] }">
                  {{blues_selected[0]}}
                </li>
              </ul>
            </div>
            <div class="m-index-ssq-number-r layoutFlex" @click="randomBalls">
              <img :class="{'classRotate': !randomFlag}" src="../../../public/images/refresh.png" alt="">
            </div>
          </div>
          <div class="m-index-ssq-detail">
            <div class="m-index-ssq-detail-l">
              <span>
                周二四日21:15开奖
              </span>
              <span>
                {{stopTime}}截止
              </span>
            </div>
            <div class="m-index-ssq-detail-r">
              <button class="ssqBuy tac indexCommonBtn" @click="ssqSubmit">立即购买</button>
            </div>
          </div>
        </div>
      </section>
    </section>
    <!-- 公告 -->
    <section class="m-index-gg" :style="{marginTop:(totalData.ssq_switch !== '1' && totalData.jczq_switch !== '1') || (totalData.show_index==='1' && totalData.jczq_switch !== '1') || (totalData.show_index!=='1' && totalData.ssq_switch !== '1') || (!totalData.jczq) ? '1rem' : '0'}">
      <div>
        <div class="m-index-gg-btn">
          <button>公告</button>
        </div>
        <div class="m-index-gg-txt textEllipsis">
          <!-- <span class="textEllipsis">部分彩种系统升级维护通知</span> -->
          <ul :style="{ top, transition }" class="textEllipsis">
            <li class="m-news-list textEllipsis" v-for="(news, index) in notifyList" :key="index" v-if="notifyList.length > 0" @click="homeNotice(news.theme, news.desc)">
              <a href="javascript:;">
                <span>
                  {{news.theme}}
                </span>
              </a>
            </li>
          </ul>
        </div>
        <!-- <div class="m-index-gg-more">
          <span>更多</span>
        </div> -->
      </div>
    </section>
    <!-- 数字彩/竞彩 -->
    <section class="m-index-lottery">
      <div>
        <swiper :options="swiperOption1" class="m-banner" v-if="bannerList.length">
          <swiper-slide class="swiper-item" v-for="(item, index) in sortLotteryList" :key="index">
            <ul>
              <li v-for="(item1, index1) in item" :key="index1">
                <router-link tag="aside" :to="{ path: item1.lottery_alias + timestamp }" class="m-lottery-list fl">
                  <i :class="['ico-big', 'lottery-'+item1.lottery_alias]"></i>
                  <p>{{ item1.lottery_name }}</p>
                  <div>
                    <img :style="{opacity:item1.description == '敬请期待' ? 0 : 1}" src="../../../public/images/lotterDesc.png" alt="">
                    <span class="textEllipsis layoutFlex" :style="{color:item1.description == '敬请期待' ? '#333' : '#fff'}">{{item1.description}}</span>
                    <!-- <span>敬请期待</span> -->
                  </div>
                </router-link>
                <div @click="LotteryStatusPrompt" v-if="item1.status === 0">

                </div>
              </li>
            </ul>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
    </section>
    <!-- 焦点赛事 -->
    <section class="exchangePosition1">
      <div>
        <section v-show="totalData.show_index === '1' && totalData.ssq_switch ==='1'" class="m-index-ssq">
          <div>
            <p class="m-index-title"><span class="m-index-title-txt">双色球</span><span class="m-index-tilte-more"></span></p>
            <div class="m-index-ssq-number">
              <div class="m-index-ssq-number-l">
                <ul>
                  <li v-for="(item, index) in reds_selected" :key="index" :class="{'classScale': classList[index] }">
                    {{item}}
                  </li>
                  <li style="background:#208EFD;color:#fff;border:1px solid #208EFD;" :class="{'classScale': classList[6] }">
                    {{blues_selected[0]}}
                  </li>
                </ul>
              </div>
              <div class="m-index-ssq-number-r layoutFlex" @click="randomBalls">
                <img :class="{'classRotate': !randomFlag}" src="../../../public/images/refresh.png" alt="">
              </div>
            </div>
            <div class="m-index-ssq-detail">
              <div class="m-index-ssq-detail-l">
                <span>
                  周二四日21:15开奖
                </span>
                <span>
                  {{stopTime}}截止
                </span>
              </div>
              <div class="m-index-ssq-detail-r">
                <button class="ssqBuy tac indexCommonBtn" @click="ssqSubmit">立即购买</button>
              </div>
            </div>
          </div>
        </section>
        <section v-show="totalData.show_index !== '1' && totalData.jczq_switch ==='1'" v-if="totalData.jczq ? true : false" class="m-index-focus">
          <div>
            <div class="m-index-focus-icon">
              <img src="../../../public/images/focusIcon.png" alt="">
            </div>
            <div class="m-index-focus-select">
              <div class="m-index-focus-home" :class="teamSelect.homeWin ? 'focusActive' : ''" @click="teamSelectFnc(0)">
                <p><span>{{ totalData.jczq.home_team}}</span><span>胜</span></p>
                <span>{{totalData.jczq.rates['3']}}</span>
              </div>
              <div class="m-index-focus-flat"  :class="teamSelect.flat ? 'focusActive' : ''" @click="teamSelectFnc(1)">
                <p><span>平</span></p>
                <span>{{totalData.jczq.rates['1']}}</span>
              </div>
              <div class="m-index-focus-away" :class="teamSelect.awayWin ? 'focusActive' : ''" @click="teamSelectFnc(2)">
                <p><span>{{totalData.jczq.away_team}}</span><span>胜</span></p>
                <span>{{totalData.jczq.rates['0']}}</span>
              </div>
            </div>
            <div class="m-index-focus-submit">
              <div class="m-index-focus-input">
                <div class="selectMount layoutFlex">
                  <input v-model.number="value" type="number" @change="numberChange(value)">
                  <span class="text">倍</span>
                  <span class="arrow" @click="arrowClick()"><i class="iconfont ml5" :class="DownUp ? 'icon-arrow-horizontal-up' : 'icon-arrow-horizontal-down'"></i></span>
                  <div class="selectOption" v-show="DownUp">
                    <ul>
                      <li v-for="(item ,index) in options" @click="selectNumberFnc(item)"
                    :key="index">{{item}}</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="m-index-focus-btn textEllipsis" @click="popShowFnc">
                <span>提交方案</span><span>(预计奖金{{foreBonus}}元)</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
    <!-- 资讯 -->
    <section class="m-index-information">
      <div>
        <p class="m-index-information-header">
          <img src="../../../public/images/information.png" alt="">
          <router-link :to="{path : '/info'}" tag="span"></router-link>
        </p>
        <div>
          <ul>
            <li v-for="(item, index) in index_info" :key="index">
              <div class="gray3" @click="linkTo(item.url)">
                <div class="layoutFlex">
                  <div class="m-index-information-l layoutFlex">
                    <div class="textEllipsis1">
                      {{item.title}}
                    </div>
                    <p>{{item.date.split('T')[0]}}</p>
                  </div>
                  <div class="m-index-information-r">
                    <img :src="item.img_url">
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <!-- 底部关注公众号内容 -->
    <bottomService></bottomService>
    <bottom-tab></bottom-tab>
    <!-- 支付详情 -->
    <div class="popup-box pay-detail" v-show="popShow">
      <div class="popup-wrap">
        <h3 class="m-title-h3"><i class="iconfont mr10" @click="cancelSubmit">×</i><span>支付详情</span></h3>
        <section class="mt20 ml15 mr15 mb10">
          <div class="m-input">
            <label>订单金额：</label><code>{{ total_money }}元</code>
          </div>
          <div class="m-input">
            <label>优惠券：</label><code>{{ coupon_face / 100 }}元</code>
          </div>
          <div class="m-input">
            <label>余额支付：</label><code class="red">{{ total_money * 100 >= balance + coupon_face ? (balance / 100).toFixed(2) : ((total_money * 100 - coupon_face)/100).toFixed(2) }}元</code>
          </div>
          <div class="m-input">
            <label>还需支付：</label><code class="red">{{ total_money * 100 >= balance + coupon_face ? ((total_money * 100 - coupon_face -  balance)/100).toFixed(2) : 0 }}元</code>
          </div>
        </section>
        <section class="mt10 ml15 mr15 mb20 chargeType" v-if="total_money * 100 > balance + coupon_face">
          <h5 class="m-title-h5">请选择支付方式</h5>
          <aside class="m-user-list" v-for="(item, index) in pay_switch_data" :key="index" @click="rechargeType(index, item.pay_type)" v-show="!((item.pay_type === 1) && isIosWebview)">
            <i class="iconfont " :class="item.pay_type | payIcon"></i>
            <span class="ml10">{{item.pay_type | payName}}</span>
            <i class="radio" :class="index === selectPayIndex ? 'active' : ''"></i>
          </aside>
          <p class="red">如无法支付，请联系客服热线：<a href="tel:0791-82309268" style="color: rgb(241, 44, 44); text-decoration: none;">0791-82309268</a></p>
        </section>
        <button class="m-footer-btn bgColor" @click="isBalance" v-loading="isClicked2">立即支付</button>
      </div>
    </div>
    <div class="popup-box" v-show="centerDialogVisible">
      <div class="popup-wrap middle">
        <h3 class="m-title-h3"><span>温馨提示</span><i class="iconfont mr10" @click="centerDialogVisible = false">×</i></h3>
        <div style="text-align:center" class="mt15 ml15 mr15 mb20">
          <span class="tips">待支付金额过大，请前去充值！</span>
        </div>
        <div class="m-bottom-btn">
          <router-link tag="button" class="m-footer-btn bgColor" :to="{ name: 'recharge'}">前去充值</router-link>
        </div>
      </div>
    </div>
    <div class="popup-box g-tipsbox" v-show="centerDialogVisible1">
      <div class="popup-wrap">
        <h3 class="m-title-h3"><span>温馨提示</span><i class="iconfont mr10" @click="centerDialogVisible1 = false">×</i></h3>
        <div class="mt15 ml15 mr15 mb20">
          <span class="tips">尊敬的用户，该彩种暂未开放，请选择其他玩法投注。</span>
        </div>
        <div class="m-bottom-btn">
          <button class="m-footer-btn bgColor" type="button" @click="centerDialogVisible1 = false">知道了</button>
        </div>
      </div>
    </div>
    <bottom-tips ref="bTips"></bottom-tips>
    <togive188></togive188>
    <openBrower></openBrower>
    <popup></popup>
  </div>
</template>
<script>
import loading from '@/components/loading'
import 'swiper/dist/css/swiper.css'
import router from '@/router/index.js'
import store from '@/store/index.js'
import bottomTab from '@/components/bottom-tab/bottomTab'
import bottomTips from '@/components/bottom-tips/bottomTips'
import bottomService from '@/components/bottom-service/bottomService'
import togive188 from '@/components/togive188/index'
import popup from '@/components/popup/popup'
import openBrower from '@/components/open-brower/index'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'home',
  components: {
    'v-loading': loading,
    bottomTab,
    bottomTips,
    bottomService,
    togive188,
    popup,
    openBrower
  },
  data () {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        },
        slidesPerView: 1,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        loop: true
      },
      swiperOption1: {
        pagination: {
          el: '.swiper-pagination'
        },
        slidesPerView: 1,
        autoplay: false,
        loop: false
      },
      options: [],
      value: 200,
      activeIndex: 0,
      reds_selected: [],
      blues_selected: [],
      reds_selected_temp: [],
      blues_selected_temp: [],
      stopTime: '',
      isDigClicked: false,
      isClicked2: false,
      teamSelect: {
        homeWin: false,
        flat: false,
        awayWin: false
      },
      totalData: {},
      foreBonus: 0,
      total_money: 0,
      selectNumber: [],
      popShow: false,
      centerDialogVisible: false,
      centerDialogVisible1: false,
      DownUp: false,
      isIosWebview: false,
      selectPayIndex: 0,
      classList: [],
      randomFlag: true
    }
  },
  watch: {
    quick_bet_data (c, o) {
      let t = c.ssq.stop_time.split(' ')[0]
      let time = c.ssq.stop_time.split(' ')[1]
      let time1 = time.slice(0, time.lastIndexOf(':'))
      let n = new Date(t).getDay()

      if (t === new Date().toJSON().split('T')[0]) {
        this.stopTime = '今天' + time1
      } else {
        switch (String(n)) {
          case '0':
            this.stopTime = '周日' + time1
            break
          case '1':
            this.stopTime = '周一' + time1
            break
          case '2':
            this.stopTime = '周二' + time1
            break
          case '3':
            this.stopTime = '周三' + time1
            break
          case '4':
            this.stopTime = '周四' + time1
            break
          case '5':
            this.stopTime = '周五' + time1
            break
          case '6':
            this.stopTime = '周六' + time1
            break
        }
      }
      this.options = c.jczq_bet_money.split(',').map((o, i) => {
        return o
      })
      this.totalData = c
    }
  },
  computed: {
    // 跳转地址添加时间戳
    timestamp () {
      let getTimestamp = new Date().getTime()
      return '?timestamp=' + getTimestamp
    },
    // 取出数据排序
    sortLotteryList () {
      let res = this.lotteryList
      let lastRes = res.sort((a, b) => a.show_index - b.show_index)
      let result = []
      for (let i = 0, len = lastRes.length; i < len; i += 8) {
        result.push(lastRes.slice(i, i + 8))
      }
      return result
    },
    nickName () {
      if (localStorage.user_info || localStorage.user_info !== undefined) {
        let user_info = JSON.parse(localStorage.user_info)
        return user_info.nick_name
      } else if (this.userInfo.nick_name) {
        return this.userInfo.nick_name
      } else {
        return false
      }
    },
    ...mapState({
      balance: state => state.login.user_info.balance,
      bannerList: state => state.query.bannerList,
      bonusList: state => {
        if (state.query.bonusList.length > 0) {
          return state.query.bonusList
        } else {
          return [
            {
              phone_number: '',
              lottery_name: '',
              bonus_money: ''
            }
          ]
        }
      },
      notifyList: state => {
        if (state.query.notifyList.length > 0) {
          return state.query.notifyList
        } else {
          return [
            {
              phone_number: '',
              lottery_name: '',
              bonus_money: ''
            }
          ]
        }
      },
      quick_bet_data: state => state.query.quick_bet_data,
      pay_switch_data: state => {
        let object1 = state.query.pay_switch_data.filter((o, i) => {
          return o.status === 0
        })
        return object1
      },
      isLogined: state => {
        if (localStorage.getItem('token')) {
          return true
        } else {
          state.login.isLogined = false
          return false
        }
      },
      userInfo: state => state.login.user_info,
      index_info: state => state.query.index_info
    }),
    ...mapGetters(['loading', 'lotteryList']),
    ...mapGetters({
      coupon_face: 'coupon_face',
      coupon_id: 'coupon_id'
    }),
    top () {
      return -this.activeIndex * 3.5 + 'rem'
    },
    transition () {
      return this.activeIndex === 0 ? 'none' : 'top 0.5s'
    }
  },
  mounted () {
    let list1 = this.pay_switch_data.map((o, i) => {
      return o.priority
    })
    this.selectPayIndex = list1.indexOf(Math.min(...list1))

    setInterval(_ => {
      this.notifyList.push(this.notifyList[0])
      this.activeIndex += 1
    }, 3000)
    setTimeout(_ => {
      setInterval(_ => {
        this.notifyList.splice(0, 1)
        this.activeIndex = 0
      }, 3000)
    }, 500)
    // 取出platform 原来用法是处理ios与android
    if (this.urlParse(document.location.href).platform) {
      let p = this.urlParse(document.location.href).platform
      if (!isNaN(p)) {
        let z = parseInt(p)
        if (z > 3 || z < 1) {
          localStorage.setItem('platform1', 1)
        } else {
          localStorage.setItem('platform1', z)
        }
        if (z === 3) {
          localStorage.setItem('iosWebview', true)
        }
      } else {
        localStorage.setItem('platform1', 1)
      }
    } else {
      localStorage.setItem('platform1', 1)
    }
  },
  filters: {
    payIcon (v) {
      let s = ''
      switch (v) {
        case 0:
          s = 'icon-wechat'
          break
        case 1:
          s = 'icon-alipay'
          break
        case 3:
          s = 'icon-wechat'
          break
        case 4:
          s = 'icon-QQzhifu1'
          break
      }
      return s
    },
    payName (v) {
      let s = ''
      switch (v) {
        case 0:
          s = '微信支付'
          break
        case 1:
          s = '支付宝支付'
          break
        case 3:
          s = '微信支付'
          break
        case 4:
          s = 'QQ支付'
          break
      }
      return s
    }
  },
  methods: {
    rechargeType (i, s) {
      this.selectPayIndex = i
    },
    // 去往公告
    homeNotice (s, s1) {
      if (s1) {
        localStorage.setItem('noticeTheme', s)
        localStorage.setItem('noticeText', s1)
        router.push('/comNotice')
      }
    },
    // 未开放彩票弹框
    LotteryStatusPrompt: function (o) {
      this.centerDialogVisible1 = true
    },
    // 下拉框数值输入改变
    numberChange (v) {
      let v1 = parseInt(v)
      if (isNaN(v1) || v1 < 1) {
        this.value = 1
      } else if (v1 > 8888) {
        this.value = 8888
      }
      this.forecastBonus()
    },
    // 下拉框数值选中改变
    selectNumberFnc (o) {
      this.value = o
      this.DownUp = false
      this.forecastBonus()
    },
    // 选择倍数箭头点击事件
    arrowClick () {
      this.DownUp = !this.DownUp
    },
    // 预测奖金
    forecastBonus () {
      let oddSelect = []
      this.selectNumber = []
      let odds = this.totalData.jczq.rates

      if (this.teamSelect.awayWin) {
        oddSelect.push(odds['0'])
        this.selectNumber.push('0')
      }
      if (this.teamSelect.flat) {
        oddSelect.push(odds['1'])
        this.selectNumber.push('1')
      }
      if (this.teamSelect.homeWin) {
        oddSelect.push(odds['3'])
        this.selectNumber.push('3')
      }

      if (Math.max(...oddSelect) === Math.min(...oddSelect)) {
        this.foreBonus = (Math.max(...oddSelect) * this.value * 2).toFixed(2)
      } else {
        this.foreBonus =
          (Math.min(...oddSelect) * this.value * 2).toFixed(2) +
          '~' +
          (Math.max(...oddSelect) * this.value * 2).toFixed(2)
      }
      if (oddSelect.length === 0) {
        this.foreBonus = 0
        return false
      } else {
        if (!localStorage.getItem('user_id')) {
          return false
        } else {
          // this.$store.dispatch('getUserInfo', {'user_id': localStorage.user_id})
        }
        this.total_money = this.value * 2 * oddSelect.length
        let minimum = this.total_money * 100
        this.$store.dispatch('getBetTotalMoney', minimum)
        this.$store
          .dispatch('getCoupon', {
            user_id: localStorage.user_id,
            alias: 'FT',
            coupon_status: 0,
            minimum: minimum
          })
          .then(res => {
            // this.topay_money = ((this.total_money * 100 - this.coupon_face) / 100).toFixed(2)
            // this.isClicked = false
            // this.popShow = true
          })
          .catch(err => {
            this.$refs.bTips.bottompopTips('获取优惠券信息出错:' + err)
            this.isClicked = false
          })
      }
    },
    urlParse (urlString) {
      let url = urlString
      let obj = {}
      let reg = /[?&][^?&]+=[^?&]+/g
      let arr = url.match(reg)
      if (arr) {
        arr.forEach(item => {
          let tempArr = item.substring(1).split('=')
          let key = decodeURIComponent(tempArr[0])
          obj[key] = decodeURIComponent(tempArr[1])
        })
      }
      return obj
    },
    // 竞彩足球队伍选择
    teamSelectFnc (i) {
      switch (i) {
        case 0:
          this.teamSelect.homeWin = !this.teamSelect.homeWin
          break
        case 1:
          this.teamSelect.flat = !this.teamSelect.flat
          break
        case 2:
          this.teamSelect.awayWin = !this.teamSelect.awayWin
          break
      }
      this.forecastBonus()
    },
    toBanner (url) {
      try {
        window.webkit.messageHandlers.iosBannerIndex.postMessage(url)
      } catch (e) {
        window.top.location.href = url
      } finally {
        window.top.location.href = url
      }
    },
    showDownload () {
      if (localStorage.token) {
        if (this.urlParse(document.location.href).platform === '3') {
          this.show_download = false
        } else {
          this.show_download = true
        }
      } else {
        this.show_download = false
      }
    },
    // 双色球随机数字
    randomBalls () {
      if (!this.randomFlag) return false
      this.randomFlag = false

      // this.reds_selected = []
      // this.blues_selected = []
      let r = []
      let b = []
      while (r.length < 6) {
        let s = (parseInt(Math.random() * 33) + 1).toString()
        let ss = s.toString().length === 1 ? '0' + s : s
        if (r.indexOf(ss) === -1) {
          r.push(ss)
        }
      }
      let s1 = parseInt(Math.random() * 16) + 1
      if (s1.toString().length === 1) {
        s1 = '0' + s1
      }

      b.push(s1)

      let y = 0
      let inter = setInterval(() => {
        this.$set(this.classList, y, true)
        if (y === 7) {
          clearInterval(inter)
        } else {
          if (y === 6) {
            this.blues_selected[0] = b[0]
          } else {
            this.reds_selected[y] = r[y]
          }
          y++
        }
      }, 100)

      setTimeout(() => {
        this.$set(this, 'classList', [false, false, false, false, false, false])
        this.randomFlag = true
      }, 1000)
    },
    Coms: function () {
      // 普通投注号
      const arr1 = this.reds_selected
      const arr2 = this.blues_selected
      const arr3 = arr1.concat(arr2)
      const c = arr1[arr1.length - 1] + '#' + arr2[0]

      arr3.splice(arr1.length - 1, 2, c)
      this.ante_code = arr3

      const arr4 = arr3
        .join(',')
        .replace(/[^0-9]/gi, ',')
        .split(',')
      this.reds_selected_temp = arr4.splice(0, arr1.length)
      this.blues_selected_temp = arr4
    },
    popShowFnc () {
      if (!localStorage.getItem('user_id')) {
        router.push('/comlogin')
      } else if (!Object.values(this.teamSelect).includes(true)) {
        this.$refs.bTips.bottompopTips('请选择投注项')
        return false
      } else {
        this.$store
          .dispatch('getUserInfo', { user_id: localStorage.user_id })
          .then(() => {
            this.isBalance()
          })
      }
    },
    cancelSubmit () {
      this.popShow = false
    },
    // 余额是否足够
    isBalance () {
      let c =
        this.total_money * 100 >= this.balance + this.coupon_face
          ? this.total_money * 100 - this.coupon_face - this.balance
          : 0
      if (Number(c) > 300000) {
        this.centerDialogVisible = true
      } else {
        this.jczqSubmit()
      }
    },
    // 双色球购买
    ssqSubmit: function () {
      if (this.isDigClicked) {
        this.$refs.bTips.bottompopTips('已经被点击了，请勿重复点击')
      } else {
        let beforeDone = () =>
          new Promise((resolve, reject) => {
            this.isDigClicked = true
            this.Coms()
            const ssqObj = {}
            if (
              this.reds_selected.length > 6 ||
              this.blues_selected.length > 1
            ) {
              ssqObj.play_type = '102'
              ssqObj.ante_info = '复式投注'
            } else {
              ssqObj.play_type = '101'
              ssqObj.ante_info = '普通投注'
            }
            ssqObj.lottery_alias = 'ssq'
            ssqObj.lottery_period = this.totalData.ssq.lottery_period
            ssqObj.reds_selected = this.reds_selected_temp
            ssqObj.blues_selected = this.blues_selected_temp
            ssqObj.ante_code = this.ante_code
            ssqObj.count = 1
            ssqObj.single_money = 2
            if (localStorage.token) {
              store.commit('Ssq', ssqObj)
            }
            resolve()
          })
        beforeDone()
          .then(() => {
            router.push('/ssqcart')
          })
          .catch(err => {
            this.$refs.bTips.bottompopTips(`submit函数出错${err}`)
            this.isDigClicked = false
          })
      }
    },
    // 竞彩足球购买
    jczqSubmit: function () {
      let order_info = {}
      order_info.bet_codes =
        this.totalData.jczq.match_number + '*' + this.selectNumber.join(',')
      order_info.bet_multi = Number(this.value)
      order_info.bet_money = this.total_money * 100
      order_info.bet_type = '110000000'

      let p1 = {
        user_id: localStorage.user_id,
        game: 'FT',
        lottery_id: 'FT01',
        coupon_id: this.coupon_id,
        order_info: JSON.stringify(order_info)
      }

      let p2 = {
        total_money: this.total_money,
        balance: this.balance,
        coupon_face: this.coupon_face,
        period: '',
        name: 'ft',
        chineseName: '竞彩足球-胜平负',
        lottery_id: 'FT01'
      }
      store.commit('PAY_DATA', [p1, p2, 'ft'])
      this.$router.push('/paydetail')
    },
    linkTo (s) {
      try {
        window.webkit.messageHandlers.iosBannerIndex.postMessage(s)
      } catch (e) {
        let u = navigator.userAgent
        if (u.includes('cdd_h5')) {
          window.location.href =
            'cdd://callbacUrl/cddAction?itemAction=2&url=' +
            encodeURIComponent(s)
        } else {
          window.location.href = s
        }
      }
    }
  },
  created () {
    this.randomBalls()
    this.$store.dispatch('getBannerList')
    this.$store.dispatch('getNotifyList')
    this.$store.dispatch('getQuick_bet')
    this.$store.dispatch('getLotteryList')
    // 打开页面 拉取悬浮框数据
    this.$store.dispatch('getFloatData')
    this.$store.dispatch('getIndex_info', {
      limit: 3,
      page: 1,
      type: ''
    })
    this.isIosWebview =
      String(localStorage.getItem('iosWebview')) === 'true' || false
    // this.$store.dispatch('getPay_swtich')
  }
}
</script>

<style lang="scss" scoped>
.selectMount {
  height: 2.96rem;
  width: 100%;
  border: 1px solid red;
  border-radius: 4px;
  align-items: center;
  font-size: 1.1rem;
  position: relative;
  input {
    width: 50%;
    margin-left: 0.5rem;
    text-indent: 1rem;
  }
  span.text {
    margin-left: 0.5rem;
    margin-right: -0.5rem;
  }
  span.arrow {
    transform: scale(0.5);
  }
  .selectOption {
    position: absolute;
    top: 2.96rem;
    width: 100%;
    left: 0;
    ul {
      border: 1px solid #e4e7ed;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      border-radius: 4px;
    }
    li {
      width: 100%;
      height: 2.96rem;
      line-height: 2.96rem;
      text-align: center;
      background: #fff;
      border-bottom: 1px solid #eee;
    }
  }
}

// 文字颜色
.indexRed {
  color: #f12c2c;
}
// 立即购买 立即合单样式
.indexCommonBtn {
  background: linear-gradient(
    90deg,
    rgba(255, 113, 73, 1),
    rgba(241, 44, 44, 1)
  );
  width: 7.75rem;
  height: 2.38rem;
  border-radius: 3px;
  color: rgba(255, 255, 255, 1);
  font-size: 1.33rem;
}
// 文字超出以省略号显示
.textEllipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.textEllipsis1 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

section.exchangePosition {
  position: relative;
  top: -1rem;
  z-index: 99;
  width: 94%;
}

section.exchangePosition1 {
  margin-top: 1rem;
  background: #fff;
  > div {
    width: 94%;
    margin: 0 auto;
  }
  .m-index-ssq > div {
    box-shadow: none !important;
  }
}

#newHome {
  font-family: Arial, Helvetica, sans-serif;
  .m-lottery-list i {
    top: 35%;
    transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    left: auto;
  }
  .m-lottery-list > div {
    position: relative;
    img {
      width: 80%;
      display: block;
      margin: 0 auto;
    }
    span {
      position: absolute;
      width: 120%;
      height: 100%;
      left: -10%;
      color: #fff;
      transform: scale(0.7);
      top: 0px;
      justify-content: center;
      align-items: center;
    }
  }
  header {
    .m-top-txt {
      right: 1rem;
    }
  }
  .g-banner {
    .swiper-item {
      background-color: #000;
      width: 100%;
      height: 100%;
      background-position: center;
      background-size: cover;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .swiper-pagination-bullet {
      width: 1.6rem;
      height: 1.6rem;
      opacity: 0.5;
    }
    .swiper-pagination-bullet-active {
      background: #e52222 !important;
      display: block;
    }
    .swiper-pagination-fraction,
    .swiper-pagination-custom,
    .swiper-container-horizontal > .swiper-pagination-bullets {
      bottom: 1.2rem;
    }
  }
  .m-index-title {
    height: 2rem;
    line-height: 2rem;
    font-size: 1.25rem;
    color: rgba(51, 51, 51, 1);
    .m-index-title-txt {
      color: #333;
    }
    .m-index-tilte-more {
      float: right;
      color: rgba(153, 153, 153, 1);
      font-size: 0.92rem;
      span {
        display: inline-block;
        width: 0.5rem;
        height: 0.5rem;
        border-left: 1px solid #999;
        border-bottom: 1px solid #999;
        transform: rotate(-135deg);
        position: relative;
        top: -1px;
        margin-left: 3px;
      }
    }
  }
  // 双色球
  .m-index-ssq {
    > div {
      margin: 0 auto;
      background: rgba(255, 255, 255, 1);
      border-radius: 5px;
      box-shadow: 8rem 0rem 15rem rgba(223, 223, 223, 0.75);
      position: relative;
      // top:-2rem;
      z-index: +1;
      padding: 6px 12px 16px;
      .m-index-ssq-number {
        display: flex;
        margin-top: 5px;
        .m-index-ssq-number-l {
          flex: 7;
          ul {
            display: flex;
            justify-content: space-between;
            li {
              width: 2.92rem;
              height: 2.92rem;
              background: rgba(255, 245, 229, 1);
              border-radius: 50%;
              border: 0.5px solid #f9848e;
              font-size: 1.25rem;
              color: rgba(229, 34, 34, 1);
              line-height: 2.92rem;
              text-align: center;
            }
          }
        }
        .m-index-ssq-number-r {
          flex: 1;
          justify-content: flex-end;
          img {
            width: 1.79rem;
            align-self: center;
          }
        }
      }
      .m-index-ssq-detail {
        display: flex;
        margin-top: 8px;
        .m-index-ssq-detail-l {
          flex: 3;
          position: relative;
          span:first-child {
            position: absolute;
            bottom: 0;
            left: 0;
          }
          span:last-child {
            position: absolute;
            bottom: 0;
            right: 10px;
          }
        }
        .m-index-ssq-detail-r {
          flex: 1;
          display: flex;
          button {
            width: 100%;
          }
        }
      }
    }
  }
  // 公告
  .m-index-gg > div {
    width: 94%;
    margin: 0 auto;
    background: rgba(255, 255, 255, 1);
    border-radius: 5px;
    box-shadow: 8rem 0rem 15rem rgba(223, 223, 223, 0.75);
    display: flex;
    padding: 6px;
    font-size: 1.08rem;
    align-items: center;
    .m-index-gg-btn {
      flex: 1;
      button {
        width: 3.29rem;
        height: 1.88rem;
        background: linear-gradient(
          0deg,
          rgba(241, 47, 60, 1),
          rgba(241, 62, 133, 1)
        );
        border-radius: 0rem;
        color: #fff;
        font-size: 1rem;
        border-radius: 4px;
      }
    }
    .m-index-gg-txt {
      position: relative;
      overflow: hidden;
      flex: 5;
      height: 1.8rem;
      > ul {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
      }
    }
    .m-index-gg-more {
      flex: 1;
    }
  }
  // 数字彩 竞彩
  .m-index-lottery {
    background: #fff;
    margin-top: 1rem;
    border-radius: 5px;
    // padding-bottom: 2rem;
    ul:after {
      display: table;
      clear: both;
      content: "";
    }
    ul li {
      float: left;
      width: 25%;
      text-align: center;
      position: relative;
      > div {
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0;
      }
      p {
        margin-top: 6rem;
        margin-bottom: 3px;
        color: #333;
        font-size: 1.08rem;
      }
    }
  }
  // 焦点赛事
  .m-index-focus {
    background: #fff;
    border-radius: 5px;
    padding: 0px 10px 10px;
    .m-index-focus-icon {
      width: 25%;
      margin: 0px auto 10px;
      img {
        margin-top: 1rem;
        width: 100%;
      }
    }
    .m-index-focus-select {
      font-size: 1rem;
      display: flex;
      text-align: center;
      color: #e52222;

      > div {
        border-radius: 3px;
        border: 1px solid #f9848e;
        padding: 5px 0px;
        margin-right: 5px;
        p {
          margin-bottom: 1px;
        }
        > span {
          font-size: 0.83rem;
          display: inline-block;
          // transform: scale(0.8);
        }
      }
      > div:last-child {
        margin-right: 0px !important;
      }
      > div.focusActive {
        background: rgba(32, 142, 253, 1);
        border: 1px solid rgba(32, 142, 253, 1);
        color: #fff;
      }
      .m-index-focus-home {
        flex: 3;
      }
      .m-index-focus-flat {
        flex: 2;
      }
      .m-index-focus-away {
        flex: 3;
      }
    }
    .m-index-focus-submit {
      margin-top: 13px;
      display: flex;
      .m-index-focus-input {
        flex: 3;
        margin-right: 8px;
        font-size: 1rem;
      }
      .m-index-focus-btn {
        flex: 7;
        font-size: 1.33rem;
        background: linear-gradient(
          90deg,
          rgba(255, 113, 73, 1),
          rgba(241, 44, 44, 1)
        );
        width: 7.75rem;
        height: 2.96rem;
        line-height: 2.96rem;
        border-radius: 3px;
        color: rgba(255, 255, 255, 1);
        font-size: 1.33rem;
        text-align: center;
        span:last-child {
          display: inline-block;
          font-size: 0.92rem;
          margin-left: 4px;
        }
      }
    }
  }
  // 神单推荐
  .m-index-recommend {
    background: #fff;
    margin-top: 1rem;
    border-radius: 5px;
    padding: 3px 20px;
    overflow: hidden;
    .m-index-recommend-content {
      margin-top: 6px;
      .m-index-recommend-l {
        .m-index-recommend-detail {
          .recommend-detail1 {
            font-size: 1.08rem;
            color: rgba(51, 51, 51, 1);
            .indexRed {
              border: 0.5px solid #f12c2c;
              border-radius: 20px;
              margin-left: 5px;
              padding: 2px 8px;
              display: inline-block;
              transform: scale(0.7);
            }
          }
          .recommend-detail2 {
            font-size: 0.92rem;
            color: rgba(153, 153, 153, 1);
          }
          .recommend-detail3 {
            font-size: 0.92rem;
            margin-top: 8px;
            color: rgba(102, 102, 102, 1);
          }
        }
      }
      .m-index-recommend-r {
        justify-content: flex-end;
        .indexCommonBtn {
          align-self: flex-end;
          margin-bottom: 2px;
        }
      }
    }
    .m-index-recommend-img img {
      width: 3.25rem;
      height: 3.25rem;
      border-radius: 50%;
      margin-left: 8px;
      margin-right: 6px;
    }
  }
  // 资讯
  .m-index-information {
    background: #fff;
    margin-top: 1rem;
    border-radius: 5px;
    padding: 0px 20px;
    overflow: hidden;
    .m-index-information-header {
      height: 3rem;
      line-height: 3rem;
      img {
        width: 3.3rem;
      }
      span {
        float: right;
        width: 0.6rem;
        height: 0.6rem;
        border-left: 1px solid #999;
        border-bottom: 1px solid #999;
        -webkit-transform: rotate(-135deg);
        transform: rotate(-135deg);
        position: relative;
        top: 1.1rem;
      }
    }
    li {
      padding: 5px 0;
      border-top: 1px solid #e7e7e7;
      color: rgba(51, 51, 51, 1);
      font-size: 1.08rem;
      .m-index-information-r {
        img {
          width: 7.92rem;
          height: 5.67rem;
        }
      }
      .m-index-information-l {
        flex: 1;
        padding: 5px 5px 5px 0;
        flex-direction: column;
        justify-content: space-between;
        p {
          font-size: 0.92rem;
          color: rgba(153, 153, 153, 1);
        }
      }
    }
  }
}

.pay-detail .popup-wrap {
  width: 100%;
  bottom: 0;
  top: auto;
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  border-radius: 0;
  -webkit-transform: translate(-50%, 0);
  -moz-transform: translate(-50%, 0);
  transform: translate(-50%, 0);
}
.pay-detail .popup-wrap .m-title-h3 {
  border-bottom: 1px solid #ccc;
  padding: 0 1.5rem;
}
.pay-detail .popup-wrap .m-title-h3 i {
  font-size: 2.6rem;
  color: #ddd;
  position: absolute;
  top: 0.5rem;
}
.pay-detail .popup-wrap .m-title-h3 span {
  text-align: center;
  display: block;
}
.pay-detail .popup-wrap .m-input code {
  font-size: 1.4rem;
  color: #999;
  float: right;
  text-align: right;
}
.pay-detail .popup-wrap .m-input code.red {
  color: #e52222;
}
.classScale {
  animation: scale 0.7s 1;
}
.classRotate {
  animation: ro 0.7s 1;
  // animation: fadein ease-in 2s;
  animation-fill-mode: forwards;
}
@keyframes scale {
  0% {
    transform: scale(0.1);
  }
  90% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes ro {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
