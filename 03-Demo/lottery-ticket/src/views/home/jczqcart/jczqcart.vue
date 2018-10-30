<template lang="html">
  <div id="jczqcart">
    <header class="m-top g-top-open">
      <h2 class="m-top-title tac"><i class="iconfont icon-arrow-left mr10" @click="routerBack"></i><span>竞彩足球</span></h2>
    </header>
    <div class="header-top-space"></div>
    <section class="g-bet-tool mt15">
      <ul class="m-bet-tool">
        <router-link tag="li" class="tac" to="/jczq"><i class="iconfont icon-shoudong1"></i>添加赛事</router-link>
        <li class="tac" @click="clearCarts"><i class="iconfont icon-delete mr5"></i>清空列表</li>
      </ul>
    </section>
    <section class="g-bet-selected">
      <div class="m-bet-selected">
        <ul class="m-bet-selected-lists">
          <li class="m-bet-selected-list" v-for="(item, index) in jczq" :key="index">
            <i class="iconfont icon-fail" @click="deleteCart(item, index)"></i>
            <aside>
              <h3 class="m-title-h3 tac"><span>{{ item.home_team }}</span> VS <span>{{ item.away_team }}</span></h3>
              <article>
                <p v-if="lottery_id != 'FT09'">
                  <span>{{ item.gametype }}：</span>
                  <em class="mr5 red" v-if="item.homeSelected">主胜 <em class="red">({{ item.rates['3'] | toRate }})</em></em>
                  <em class="mr5 green" v-if="item.drawSelected">平 <em class="green">({{ item.rates['1'] | toRate }})</em></em>
                  <em class="mr5 blue" v-if="item.awaySelected">客胜 <em class="blue">({{ item.rates['0'] | toRate }})</em></em>
                  <em class="mr5 red" v-if="lottery_id === 'FT03'" v-for="(score, i) in item.gametext" :key="i">{{ score }}</em>
                  <em class="mr5 red" v-if="lottery_id === 'FT04'">{{ item.scoreSelected | FT04Score }}</em>
                  <em class="mr5 red" v-if="lottery_id === 'FT05'">{{ item.scoreSelected | FT05Score }}</em>
                </p>
                <div class="mr5 red" v-if="lottery_id === 'FT09'">
                  <p v-if="item.selectFT.includes('FT01')">
                    <span>胜平负：</span>
                    <em class="mr5 red" v-if="item.scoreSelected.FT01['0']">客胜</em>
                    <em class="mr5 red" v-if="item.scoreSelected.FT01['1']">平</em>
                    <em class="mr5 red" v-if="item.scoreSelected.FT01['3']">主胜</em>
                  </p>
                  <p v-if="item.selectFT.includes('FT02')">
                    <span>让球胜平负：</span>
                    <em class="mr5 red" v-if="item.scoreSelected.FT02['0']">客胜</em>
                    <em class="mr5 red" v-if="item.scoreSelected.FT02['1']">平</em>
                    <em class="mr5 red" v-if="item.scoreSelected.FT02['3']">主胜</em>
                  </p>
                  <p v-if="item.selectFT.includes('FT03')">
                    <span>比分：</span>
                    <template v-for="(itembf,indexbf) in item.scoreSelected.FT03" >
                      <em class="mr5 red" v-if="itembf==true" :key="indexbf">
                        {{item.selectedName.FT03[indexbf]}}
                      </em>
                    </template>
                  </p>
                  <p v-if="item.selectFT.includes('FT04')">
                    <span>总进球数：</span>
                    <template v-for="(itemzjqs,indexzjqs) in item.scoreSelected.FT04" >
                      <em class="mr5 red" v-if="itemzjqs==true" :key="indexzjqs">
                        {{item.selectedName.FT04[indexzjqs]}}
                      </em>
                    </template>
                  </p>
                  <p v-if="item.selectFT.includes('FT05')">
                    <span>半全场：</span>
                    <template v-for="(itembqc,indexbqc) in item.scoreSelected.FT05">
                      <em class="mr5 red" v-if="itembqc==true" :key="indexbqc">
                        {{item.selectedName.FT05[indexbqc]}}
                      </em>
                    </template>
                  </p>
                </div>
              </article>
            </aside>
          </li>
        </ul>
      </div>
    </section>
    <section class="g-bet-agreement">
      <div class="m-bet-agreement">
        <i class="iconfont icon-checkbox-checked mr5"></i>
        <router-link to="/agreement">我已阅读并同意遵守多多中彩票规则</router-link>
      </div>
    </section>
    <!-- 串关选择 -->
    <section class="g-football-select-bunch">
      <ul class="tac" v-show="selectbunchFlag">
        <li class="tac mt5 mb5" :class="{'active': jczqTypeFlag[i]}" v-for="(type, i) in jczq_type" v-show="!supportTypeFlag[i]" :key=type.id>
          <input @click="JczqType(type, i)" :disabled="supportTypeFlag[i]" type="text" :value="type" readonly>
        </li>
      </ul>
      <div class="layoutFlex">
        <div class="m-bottom-betbar chuanguan tac layoutFlex" @click="toggleBunch()">
          <span class="ellipsis red ft12">
            {{ jczq_type_text.toString() === ""?"还未下注" : jczq_type_text.toString() }}
          </span>
          <i class="iconfont mr5 ft10" :class="selectbunchFlag?'icon-arrow-horizontal-up':'icon-arrow-horizontal-down'" v-show="!isBet"></i>
          <!-- <button class="active" type="button" @click="toggleBunch()">{{ jczq_type_text.toString() === ""?"还未下注" : jczq_type_text.toString() }}</button> -->
        </div>
        <div class="m-bottom-betbar tac">
          <i class="mr5">投</i>
          <span class="m-bottom-betbar-buy">
            <em class="fl" @click="amountChange(--amount_temp)">-</em>
            <div class="tac fl">
              <input class="tac" type="number" v-model="amount_input" maxlength="4" @blur="amount_input=amount_input === '' ? 10 : amount">
            </div>
            <em class="fl" @click="amountChange(++amount_temp)">+</em>
          </span>
          <i class="ml5">倍</i>
        </div>
      </div>
    </section>
    <!-- 投注倍数 -->
    <!-- <section class="g-bottom-betbar">
      <div class="m-bottom-betbar chuanguan tac layoutFlex" @click="toggleBunch()">
        <span class="ellipsis red">
          {{ jczq_type_text.toString() === ""?"还未下注" : jczq_type_text.toString() }}
        </span>
        <i class="iconfont" :class="selectbunchFlag?'icon-arrow-horizontal-up':'icon-arrow-horizontal-down'"></i>
      </div>
      <div class="m-bottom-betbar tac">
        <i class="mr5">投</i>
        <span class="m-bottom-betbar-buy">
          <em class="fl" @click="amountChange(--amount_temp)">-</em>
          <div class="tac fl">
            <input class="tac" type="number" v-model="amount_input" maxlength="4" @blur="amount_input=amount_input === '' ? 10 : amount">
          </div>
          <em class="fl" @click="amountChange(++amount_temp)">+</em>
        </span>
        <i class="ml5">倍</i>
      </div>
    </section> -->
    <footer class="m-footer box-shadow">
      <div class="layoutFlex m-footer-content">
        <div class="m-footer-bet-count" style="text-align:center;">
          <span class="mr5">{{ count }}注</span>
          <span class="mr5">{{ amount }}倍</span>
          <span class="mr5 red">{{ total_money }}元</span>
          <p style="font-size: 1rem;">预测奖金：{{bonus}} 元</p>
        </div>
        <div class="m-btn-next mr10">
          <button class="bgColor" type="button" @click="submit" v-loading="isClicked">立即支付</button>
        </div>
      </div>
    </footer>
    <div class="popup-box" v-show="popShow">
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
          <p class="red">如无法支付，请联系客服热线：<a href="tel:0791-82309268" style="color: rgb(241, 44, 44); text-decoration: none;">0791-82309268</a></p>
        </section>
        <section class="mt10 ml15 mr15 mb20 chargeType" v-if="total_money * 100 > balance + coupon_face">
          <h5 class="m-title-h5">请选择支付方式</h5>
          <aside class="m-user-list" v-for="(item, index) in pay_switch_data" :key="index" @click="rechargeType(index, item.pay_type)" v-show="!((item.pay_type === 1) && isIosWebview)">
            <i class="iconfont " :class="item.pay_type | payIcon"></i>
            <span class="ml10">{{item.pay_type | payName}}</span>
            <i class="radio" :class="index === selectPayIndex ? 'active' : ''"></i>
          </aside>
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
    <bottom-tips ref="bTips"></bottom-tips>
  </div>
</template>

<script>
import store from '@/store/index.js'
import { mapState, mapGetters } from 'vuex'
import bottomTips from '@/components/bottom-tips/bottomTips'

export default {
  name: 'jczqcart',
  components: {
    bottomTips
  },
  data () {
    return {
      count: 0,
      single_count: 0,
      amount: 10,
      total_money: 0,
      amount_temp: 10,
      amount_input: 10,
      moneyFlag: true,
      popShow: false,
      topay_money: 0,
      selectbunchFlag: false,
      jczq_type_text: [],
      jczq_type: ['单关', '2串1', '3串1', '4串1', '5串1', '6串1', '7串1', '8串1'],
      jczqTypeFlag: {},
      supportTypeFlag: {},
      lottery_id: this.$route.query.lottery_id,
      centerDialogVisible: false,
      isClicked: false,
      isClicked2: false,
      bonus: '0.00',
      chargeType: true,
      isIosWebview: false,
      isBet: false
    }
  },
  watch: {
    amount_input: function () {
      this.amount_temp = this.amount_input
      this.amountChange(this.amount_input)
    },
    supportTypeFlag: {
      handler (n, o) {
        let object = Object.values(this.supportTypeFlag).filter((o, i) => {
          return o === false
        })
        if (object.length <= 1) {
          this.selectbunchFlag = false
          this.isBet = true
        } else {
          this.isBet = false
        }
      },
      deep: true
    }
  },
  created () {
    this.isIosWebview = String(localStorage.getItem('iosWebview')) === 'true' || false
    this.$store.dispatch('getUserInfo', {'user_id': localStorage.user_id})
    this.$store.dispatch('getCoupon', {user_id: localStorage.user_id, alias: 'FT', coupon_status: 0})
    this.popShow = false
    this.amount = 10
  },
  computed: {
    ...mapState({
      balance: state => state.login.user_info.balance,
      matchQuery: state => state.jczq.matchQuery,
      FT01Query: state => {
        if (state.jczq.FT01Query.length > 0) {
          return state.jczq.FT01Query
        } else {
          return []
        }
      },
      jczq: state => state.jczq.jczq,
      pay_switch_data: state => {
        let object1 = state.query.pay_switch_data.filter((o, i) => {
          return o.status === 0
        })
        return object1
      },
      jczq_type_text_temp: state => {
        // 投注方式初始值
        let ft = state.jczq.jczq
        let ftLength = state.jczq.jczq.length
        let not_support_single_flag = ft.find(function (x) { return x.unsupport_single !== '' })
        if ((ft.indexOf(not_support_single_flag) > -1) || (ftLength >= 2)) {
          let type
          switch (ftLength) {
            case 0: type = ['场次不足']
              break
            case 1: type = ['单关']
              break
            case 2: type = ['2串1']
              break
            case 3: type = ['3串1']
              break
            case 4: type = ['4串1']
              break
            case 5: type = ['5串1']
              break
            case 6: type = ['6串1']
              break
            case 7: type = ['7串1']
              break
            case 8: type = ['8串1']
              break
          }
          return type
        } else {
          return ['场次不足']
        }
      }
    }),
    ...mapGetters({
      coupon_face: 'coupon_face',
      coupon_id: 'coupon_id'
    })
  },
  filters: {
    FT04Score: function (score) {
      let values = Object.values(score)
      let toscore = []
      let scores = Object.keys(score).filter(k => {
        return values[k] === true
      })
      scores.forEach(s => {
        if (s <= 6) {
          toscore.push(' ' + s + '球')
        } else {
          toscore.push(' ' + s + '+球')
        }
      })
      return toscore.toString()
    },
    toRate: function (rate) {
      return ((rate * 100) * 0.01).toFixed(2)
    },
    FT05Score: function (score) {
      let toscore = []
      let scores = Object.keys(score).filter(k => {
        return score[k] === true
      })
      scores.forEach(s => {
        let x
        switch (s) {
          case '10': x = '平负'
            break
          case '11': x = '平平'
            break
          case '13': x = '平胜'
            break
          case '30': x = '胜负'
            break
          case '31': x = '胜平'
            break
          case '33': x = '胜胜'
            break
          case '00': x = '负负'
            break
          case '01': x = '负平'
            break
          case '03': x = '负胜'
            break
        }
        toscore.push(x)
      })
      return toscore.toString()
    },
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
  mounted () {
    let i = store.state.jczq.jczq.length - 1
    // if (Array.from(this.jczqTypeFlag).length === 0) {
    //   this.$set(this.jczqTypeFlag, i, true)
    // }
    this.$set(this.jczqTypeFlag, i, true)
    this.supportTypeRange()
    this.jczq_type_text = this.jczq_type_text_temp
    this.betSum(i + 1)
    this.bonusArray(store.state.jczq.jczq, this.jczqTypeFlag)

    let list1 = this.pay_switch_data.map((o, i) => {
      return o.priority
    })
    this.selectPayIndex = list1.indexOf(Math.min(...list1))
  },
  updated () {
    // let i = store.state.jczq.jczq.length - 1
    // this.$set(this.jczqTypeFlag, i, true)
    this.supportTypeRange()
    if (this.total_money > 2000000) {
      this.$refs.bTips.bottompopTips('单张投注单最大投注金额不得超过200万元')
    }
  },
  methods: {
    routerBack () {
      // 返回上一级
      window.history.length > 2 ? this.$router.go(-1) : this.$router.push('/home')
    },
    rechargeType (i, s) {
      this.selectPayIndex = i
      // if (this.pay_switch_data[i].priority === 0) {
      //   return false
      // }
      // this.pay_switch_data.forEach(function (o, i) {
      //   o.priority = 1
      // })
      // this.pay_switch_data[i].priority = 0
    },
    toggleBunch () {
      if (this.isBet) {
        return false
      }
      this.selectbunchFlag = !this.selectbunchFlag
    },
    supportTypeRange () {
      // 投注方式可选范围
      let ft = store.state.jczq.jczq
      let ftLength = store.state.jczq.jczq.length
      let lottery_id = this.lottery_id
      let single_flag = ft.map(function (x) {
        let f = x.unsupport_single.indexOf(lottery_id)
        return !((f >= 0))
      })
      // 只要有一个不支持，就不能玩单关
      let not_support_single_flag = single_flag.indexOf(false)
      // 只有所有的都支持，才能玩单关
      let support_single_flag = single_flag.indexOf(true)

      if (ftLength >= 1) {
        // 单关是否可选
        if (ftLength > 1) {
          if (ft.indexOf(not_support_single_flag) > -1) {
            this.$set(this.supportTypeFlag, 0, false)
          } else {
            this.$set(this.supportTypeFlag, 0, true)
          }
        } else {
          if (support_single_flag > -1) {
            this.$set(this.supportTypeFlag, 0, false)
          } else {
            this.$set(this.supportTypeFlag, 0, true)
          }
        }
        // 串关可选范围
        for (let i = 1; i < ftLength; i++) {
          this.$set(this.supportTypeFlag, i, false)
        }
        for (let i = ftLength; i <= 7; i++) {
          this.$set(this.supportTypeFlag, i, true)
        }
      } else {
        // 初始值
        for (let i = 0; i <= 7; i++) {
          this.$set(this.supportTypeFlag, i, true)
        }
      }
    },
    JczqType (type, i) {
      // 投注方式切换
      // this.selectbunchFlag = false
      if (this.jczqTypeFlag[i]) {
        this.jczqTypeFlag[i] = !this.jczqTypeFlag[i]
        this.jczq_type_text = this.jczq_type_text.filter(v => v !== this.jczq_type[i])
        this.betSum(i + 1)
      } else {
        if (Object.keys(this.jczqTypeFlag).length === 0) {
          this.jczq_type_text = this.jczq_type_text_temp
        }
        this.$set(this.jczqTypeFlag, i, true)
        this.jczq_type_text.push(type)
        this.betSum(i + 1)
      }
      this.bonusArray(store.state.jczq.jczq, this.jczqTypeFlag)
    },
    clearCarts (item) {
      store.commit('jczq_clear')
      // 清除所有投注方式标识状态
      this.jczq_type_text = this.jczq_type_text_temp
      this.jczqTypeFlag = {}
      this.count = 0
      this.total_money = 0
      this.bonus = '0.00'
    },
    deleteCart (item, index) {
      store.commit('jczq_delete', {index: index})
      // 清除该投注方式标识状态
      this.jczq_type_text = this.jczq_type_text_temp
      this.jczqTypeFlag = {}
      this.count = 0
      this.total_money = 0
      let i = store.state.jczq.jczq.length - 1
      this.$set(this.jczqTypeFlag, i, true)
      this.betSum(i + 1)
      let tMoney = this.count * this.amount * 2
      this.totalMoney(tMoney)

      if (i < 0) {
        this.bonus = '0.00'
      } else {
        this.bonusArray(store.state.jczq.jczq, this.jczqTypeFlag)
      }
    },
    combine (a, n, m, b, x) {
      for (let i = n; i >= m; i--) {
        b[m - 1] = i - 1
        if (m > 1) {
          this.combine(a, i - 1, m - 1, b, x)
        } else { // m == 1, 输出一个组合
          let s = ''
          let zhu = 1
          for (let j = x - 1; j >= 0; j--) {
            s = s + a[b[j]] + ','
            zhu = zhu * a[b[j]]
          }
          this.single_count = this.single_count + zhu
        }
      }
      return this.single_count
    },
    betSum (i) {
      let a = [] // 是记录每场比赛选择了多少种投注
      this.jczq.forEach(obj => {
        if (this.lottery_id === 'FT03') {
          a.push(obj.gametext.length)
        } else if (this.lottery_id === 'FT04' || this.lottery_id === 'FT05') {
          let selected = Object.values(obj.scoreSelected).filter(function (item) {
            return item === true
          })
          a.push(selected.length)
        } else if (this.lottery_id === 'FT09') {
          // 通过正则匹配 到多少个true
          var c = JSON.stringify(obj.scoreSelected)
          a.push(c.match(/true/g).length)
          console.log(a)
        } else {
          let selected = Object.values(obj).filter(function (item) {
            return item === true
          })
          a.push(selected.length)
        }
      })

      let n = a.length // 是记录a存储了多少个数据
      let m = i // 是几串1
      let b = [] // 是新数组，数组大小为x
      let x = i // 同为几串1
      this.single_count = 0
      this.combine(a, n, m, b, x)

      let ft = store.state.jczq.jczq
      let ftLength = store.state.jczq.jczq.length
      let not_support_single_flag = ft.find(function (x) { return x.unsupport_single !== '' })
      if ((ft.indexOf(not_support_single_flag) > -1) || (ftLength >= 2)) {
        if (this.jczqTypeFlag[i - 1]) {
          this.count = this.count + this.single_count
        } else {
          this.count = this.count - this.single_count
        }
      } else {
        this.count = 0
      }
      this.total_money = this.count * this.amount * 2
    },
    bonusArray (obj, type) {
      let minArray = []
      let maxArray = []
      let minBonus = []
      let maxBonus = []
      /**
      * 取出倍率的最大值 最小值组成的数组
      **/
      switch (this.$route.query.lottery_id) {
        case 'FT01':
        case 'FT02':
          obj.forEach((o, i) => {
            let o1 = []
            if (o.homeSelected) {
              o1.push(o.rates[3])
            }
            if (o.drawSelected) {
              o1.push(o.rates[1])
            }
            if (o.awaySelected) {
              o1.push(o.rates[0])
            }
            minArray.push(Math.min(...o1))
            maxArray.push(Math.max(...o1))
          })
          break
        case 'FT03':
        case 'FT04':
        case 'FT05':
          obj.forEach((o, i) => {
            let o1 = []
            let aa = Object.keys(o.scoreSelected).filter((k) => {
              return o.scoreSelected[k] === true
            })
            aa.forEach((o2, i2) => {
              o1.push(o.rates[o2])
            })
            minArray.push(Math.min(...o1))
            maxArray.push(Math.max(...o1))
          })
          break
        case 'FT09':
          obj.forEach((o, i) => {
            Object.values(o.scoreSelected).forEach((o1, i1) => {
              let o2 = []
              let aa = Object.keys(o1).filter((k) => {
                return o1[k] === true
              })
              if (aa.length === 0) { return false }
              let ratesArray = Object.values(o.rates)
              aa.forEach((o3, i3) => {
                o2.push(ratesArray[i1][o3])
              })
              minArray.push(Math.min(...o2))
              maxArray.push(Math.max(...o2))
            })
          })
          break
      }
      let chuanList = Object.keys(type).filter((k) => {
        return type[k] === true
      })
      if (chuanList.length === 0 || Number(chuanList[0]) === -1) {
        this.bonus = '0.00'
        return false
      } else {
        let m = 0
        let m1 = 0
        chuanList.forEach((o, i) => {
          let cNumber = parseInt(o) + 1
          let p1 = 0
          let p2 = 0
          function bonusFnc (obj) {
            var f = 1
            for (var i = 0; i < obj.length; i++) {
              f = f * obj[i]
            }
            return f
          }
          /**
          * 得出排列组合后的概率组成数组
          **/
          let y = this.bonusCombination(maxArray, cNumber, bonusFnc)
          let y1 = this.bonusCombination(minArray, cNumber, bonusFnc)
          y.forEach((o, i) => {
            p1 = p1 + parseFloat(o)
          })
          p2 = Math.min(...y1)
          maxBonus.push((p1 * 2 * this.amount).toFixed(2))
          minBonus.push((p2 * 2 * this.amount).toFixed(2))
        })
        /**
        * 最大奖金 最大概率和
        **/
        maxBonus.forEach((o, i) => {
          if (o) {
            m = m + parseFloat(o)
          }
        })
        /**
        * 最少奖金 最小概率
        **/
        minBonus.forEach((o, i) => {
          if (i === 0 || parseFloat(o) < m1) {
            m1 = parseFloat(o)
          }
        })
        if (m1 === m) {
          this.bonus = m1.toFixed(2)
        } else {
          this.bonus = m1.toFixed(2) + '-' + m.toFixed(2)
        }
      }
    },
    bonusCombination (arr, num, fun) {
      /**
      * 排列组合算法（目的不同组合下最大倍率最小倍率的乘积）
      **/
      if (arr.length < num || num > 10) {
        return []
      }
      let variable = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u']
      let replaceStr = '#$#'
      let str = 'var arr=arguments[0]; var fun=arguments[1];  var ret=[]; for (var a = 0; a < arr.length; a++) { ' + replaceStr + ' } return ret;'
      for (let i = 1; i < num; i++) {
        str = str.replace(replaceStr, ' for (var ' + variable[i] + ' =' + variable[i - 1] + '+ 1; ' + variable[i] + ' < arr.length; ' + variable[i] + '++) { ' + replaceStr + '  }')
      }
      let temp = 'var temp= [];'
      for (let i = 0; i < num; i++) {
        temp += 'temp.push(arr[' + variable[i] + ']);'
      }
      if (fun) {
        temp += 'ret.push(fun(temp)); '
      } else {
        temp += 'ret.push(temp);'
      }
      str = str.replace(replaceStr, temp)
      return (new Function(str)).apply(null, [arr, fun])
    },
    amountChange (num) {
      if (num < this.amount) {
        this.moneyFlag = true
      }
      if (this.moneyFlag) {
        if (num >= 8888) {
          this.amount = 8888
          this.$refs.bTips.bottompopTips('至多投注8888倍')
        } else if (num <= 1) {
          this.amount = 1
          this.$refs.bTips.bottompopTips('至少投注1倍')
        } else {
          this.amount = num
        }
      }
      this.amount_temp = this.amount
      this.amount_input = this.amount_input === '' ? '' : this.amount
      this.total_money = this.count * this.amount * 2
      let tMoney = this.count * this.amount * 2
      this.totalMoney(tMoney)
      this.bonusArray(store.state.jczq.jczq, this.jczqTypeFlag)
    },
    totalMoney (sum) {
      if (sum <= 2000000) {
      // 金额限制不超过20000元
        this.moneyFlag = true
      } else {
        this.moneyFlag = false
        this.$refs.bTips.bottompopTips('单张投注单最大投注金额不得超过20000元')
      }
    },
    submit () {
      if (this.count > 10000) {
        this.$refs.bTips.bottompopTips('最高注数不超过10000')
        return false
      } else if (this.total_money > 2000000) {
        this.$refs.bTips.bottompopTips('最高金额不超过200万')
        return false
      } else if (this.amount > 8888) {
        this.$refs.bTips.bottompopTips('最高倍数不超过8888')
        return false
      }

      if (this.isClicked) {
        this.$refs.bTips.bottompopTips('正在加载中，请勿重复点击')
      } else {
        this.isClicked = true
        if (this.total_money > 0) {
          let lottery_id = this.lottery_id
          if (this.lottery_id === 'FT09') {
            if (this.jczq.length >= 2) {
              let t = this.jczq.map(function (o, i) {
                return o.selectFT
              })

              // 如何场次超过两场 而其中一场有两种玩法  就可以通过
              let b = t.filter((o, i) => {
                return o.length > 1
              })

              if (b.length === 0 && (new Set(t)).size < 2) {
                this.$refs.bTips.bottompopTips('请至少选择2中不同模式比赛')
                this.isClicked = false
                return false
              }
            } else {
              this.$refs.bTips.bottompopTips('请至少选择2场比赛')
              this.isClicked = false
              return false
            }
          }
          let single_flag = this.jczq.map(function (x) {
            let f = x.unsupport_single.indexOf(lottery_id)
            return !((f >= 0))
          })
          let support_single_flag = single_flag.indexOf(true)
          if ((support_single_flag > -1) || (this.jczq.length >= 2)) {
            let minimum = this.total_money * 100
            this.$store.dispatch('getBetTotalMoney', minimum)
            this.$store.dispatch('getCoupon', {
              user_id: localStorage.user_id,
              alias: 'FT',
              coupon_status: 0,
              minimum: minimum
            }).then((res) => {
              this.topay_money = ((this.total_money * 100 - this.coupon_face) / 100).toFixed(2)
              this.isClicked = false
              this.isBalance()
              // this.popShow = true
            }).catch((err) => {
              this.$refs.bTips.bottompopTips('获取优惠券信息出错:' + err)
              this.isClicked = false
            })
          } else {
            this.$refs.bTips.bottompopTips('该方式不支持单关，请至少选两场比赛')
            this.isClicked = false
          }
        } else {
          this.$refs.bTips.bottompopTips('请先投注')
          this.isClicked = false
        }
      }
    },
    cancelSubmit () {
      this.popShow = false
    },
    // 判断余额 与 购买金额大小
    isBalance () {
      let c = this.total_money * 100 >= this.balance + this.coupon_face ? (this.total_money * 100 - this.coupon_face - this.balance) : 0
      if (Number(c) > 300000) {
        this.centerDialogVisible = true
      } else {
        this.sureSubmit()
      }
    },
    sureSubmit () {
      // 拼装bet_codes
      let match_codes = []
      this.jczq.forEach(item => {
        let arr = []
        if (item.homeSelected) {
          arr.push('3')
        }
        if (item.drawSelected) {
          arr.push('1')
        }
        if (item.awaySelected) {
          arr.push('0')
        }

        if (item.scoreSelected !== undefined) {
          if (this.lottery_id === 'FT09') {
            // let t1 = JSON.parse(JSON.stringify(item.scoreSelected))
            // for (let i = 0; i < t1.length; i++) {
            //   let s = Object.keys(item.scoreSelected[i]).filter(k1 => {
            //     return item.scoreSelected[i][k1] === true
            //   })
            // }
            let scores1 = Object.keys(item.scoreSelected.FT01).filter(k => {
              return item.scoreSelected.FT01[k] === true
            })
            let scores2 = Object.keys(item.scoreSelected.FT02).filter(k => {
              return item.scoreSelected.FT02[k] === true
            })
            let scores3 = Object.keys(item.scoreSelected.FT03).filter(k => {
              return item.scoreSelected.FT03[k] === true
            })
            let scores4 = Object.keys(item.scoreSelected.FT04).filter(k => {
              return item.scoreSelected.FT04[k] === true
            })
            let scores5 = Object.keys(item.scoreSelected.FT05).filter(k => {
              return item.scoreSelected.FT05[k] === true
            })
            let sList = [scores1, scores2, scores3, scores4, scores5]
            let strList = ['FT01', 'FT02', 'FT03', 'FT04', 'FT05']
            for (let j in sList) {
              if (sList[j].length === 0) { continue }
              var mc = item.match_number + '*' + strList[j] + '*' + sList[j].toString()
              match_codes.push(mc)
            }
          } else {
            let scores = Object.keys(item.scoreSelected).filter(k => {
              return item.scoreSelected[k] === true
            })
            scores.forEach(s => {
              arr.push(s)
            })
          }
        }
        if (this.lottery_id !== 'FT09') {
          let match_code
          match_code = item.match_number + '*' + arr.toString()
          match_codes.push(match_code)
        }
      })
      // 拼装bet_type
      let match_type = ''
      let i
      for (i in this.jczqTypeFlag) {
        if (this.jczqTypeFlag[i] === true) {
          let m = Number(i) + 1
          match_type = match_type + m
        }
      }

      // 自动补齐0
      let len = match_type.length
      for (let j = 0; j < 8 - len; j++) {
        match_type = match_type + 0
      }

      // 拼装order_info
      const order_info = {}
      order_info.bet_codes = match_codes.join('^')
      order_info.bet_multi = Number(this.amount)
      order_info.bet_money = this.total_money * 100
      order_info.bet_type = this.jczq.length + match_type

      let p1 = {
        user_id: localStorage.user_id,
        game: 'FT',
        lottery_id: this.lottery_id,
        coupon_id: this.coupon_id,
        order_info: JSON.stringify(order_info)
      }

      // total_money * 100 * 100 >= balance + coupon_face ? (balance / 100).toFixed(2) : ((total_money
      let p2 = {
        total_money: this.total_money,
        balance: this.balance,
        coupon_face: this.coupon_face,
        period: this.lottery_period,
        name: 'ft',
        chineseName: '',
        lottery_id: this.lottery_id
      }
      switch (this.lottery_id) {
        case 'FT01':
          p2.chineseName = '竞彩足球-胜平负'
          break
        case 'FT02':
          p2.chineseName = '竞彩足球让-球胜平负'
          break
        case 'FT03':
          p2.chineseName = '竞彩足球-比分'
          break
        case 'FT04':
          p2.chineseName = '竞彩足球-总进球'
          break
        case 'FT05':
          p2.chineseName = '竞彩足球-半全场'
          break
        case 'FT09':
          p2.chineseName = '竞彩足球-混合投注'
          break
      }

      if (p1.lottery_id === 'FT09') {
        p1.lottery_id = 'FT10'
        p2.lottery_id = 'FT10'
      }

      store.commit('PAY_DATA', [p1, p2, 'ft'])

      this.$router.push('/paydetail')

      // api.matchOrder({
      //   user_id: localStorage.user_id,
      //   game: 'FT',
      //   lottery_id: this.lottery_id,
      //   coupon_id: this.coupon_id,
      //   order_info: JSON.stringify(order_info)
      // })
      //   .then(res => {
      //     if (res.errno === '0') {
      //     // 投注成功
      //       store.commit('orderMoney', this.total_money * 100)
      //       store.commit('orderLotteryAlias', 'jczq')
      //       store.dispatch('getFTQuery', {game: 'FT', lottery_id: this.lottery_id})
      //       this.popShow = false
      //       this.isClicked2 = false
      //       store.commit('jczq_clear')
      //       this.amount = 1

      //       // router.push({path: 'success', query: { order_id: res.data.order_id, separate: res.data.separate }})
      //       // 如果余额不足 吊起微信支付
      //       if (Number(res.data.needpay_money) > 0) {
      //         let recharge_info = {
      //           user_id: localStorage.user_id,
      //           pay_type: 1,
      //           subject: '微信支付',
      //           detail: '充值金额',
      //           total_amount: res.data.needpay_money,
      //           mark: '',
      //           platform: 1,
      //           service_type: 2,
      //           order_lst: res.data.order_lst
      //         }
      //         let c = this.pay_switch_data.find((x) => {
      //           return x.priority === 0
      //         })
      //         if (c.pay_type === 0) {
      //           recharge_info.pay_type = 1
      //           recharge_info.subject = '微信支付'
      //         } else {
      //           recharge_info.pay_type = 2
      //           recharge_info.subject = '支付宝支付'
      //         }
      //         this.$store.dispatch('userCharge', recharge_info)
      //       } else {
      //         router.push({path: 'success', query: {order_id: res.data.order_id, separate: res.data.separate}})
      //       }
      //     } else {
      //     // 投注失败
      //       store.commit('lotteryOrderMsgErr', res.errmsg)
      //       this.popShow = false
      //       this.isClicked2 = false
      //       store.commit('jczq_clear')
      //       this.amount = 1
      //       router.push('/fail')
      //     }
      //   })
      //   .catch(err => {
      //     if (err.msg) {
      //       console.log(err.msg)
      //     } else {
      //       console.log(err)
      //     }
      //   })
      // } else {
      //   router.push('/recharge')
      // }
    }
  }
}
</script>

<style scoped>
.m-top-title i {
  position: absolute;
  top: 50%;
  left: 2rem;
  -webkit-transform: translate(0,-50%);
  -moz-transform: translate(0,-50%);
  transform: translate(0,-50%);
}
.popup-wrap{
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
.popup-wrap .m-title-h3{
  border-bottom: 1px solid #ccc;
  padding: 0 1.5rem;
}
.popup-wrap .m-title-h3 i{
  font-size: 2.6rem;
  color: #ddd;
  position: absolute;
  top: 0.5rem;
}
.popup-wrap .m-title-h3 span{
  text-align: center;
  display: block;
}
.popup-wrap .m-input code {
  font-size: 1.4rem;
  color: #999;
  float: right;
  text-align: right;
}
.popup-wrap .m-input code.red{
  color: #e52222;
}
.m-bet-tool li{width: 46%;}
.m-bet-selected-lists{padding: 0.5rem 0;}
.m-bet-selected-list{height: auto;}
.m-bet-selected-list h3{position: relative;color: #999;}
.m-bet-selected-list h3 span{color: #333;}
.m-bet-selected-list h3 i{left: auto;right: 1rem;}
.m-bet-selected-list article{margin:0 1rem 1rem 1rem;padding:0.5rem 1rem;background: #f5f5f5;}
.m-bet-selected-list p{
  color: #666;
  white-space: normal;
  word-wrap: break-word;
  word-break: break-word;}
.m-bet-selected-list p em{display: inline-block;}

.m-bottom-betbar button{
  width: 12rem;
  line-height: 2.2rem;
  height: 2.2rem;
  padding: 0 0.5rem;
  border: 1px solid #d6d7dc;
  font-size: 1.2rem;
  background: #fff;
  color: #999;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-border-radius:0.5rem;
  -moz-border-radius:0.5rem;
  border-radius: 0.5rem;
}
.m-bottom-betbar button.active,.g-football-select-bunch li.active{
  border: 1px solid #e52222;
  color: #e52222;
}
.g-football-select-bunch{
  padding-bottom: 4.4rem;
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  display: -webkit-flex;
  display: -moz-flex;
  display: flex;
  flex-direction: column-reverse;
}
.g-football-select-bunch>div{
  background: #fff;
}
.g-football-select-bunch ul{
  padding: 1rem 0rem;
  margin: 0 auto;
  width: 100%;
  background: #fff;
  border-top:1px solid #D6D7DC;
}
.g-football-select-bunch li{
  width: 30%;
  line-height: 2.6rem;
  border: 1px solid #d6d7dc;
  font-size:1.2rem;
  color: #999;
  float: left;
  margin-left: 2.5%;
}
.g-football-select-bunch li input{
  width: 100%;
  height: 2.6rem;
  background: transparent;
  text-align: center;
  display: block;
  position: relative;
}
.g-football-select-bunch li input:after{
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 10px;
  height: 10px;
  background: red;
}
.g-football-select-bunch li input[disabled] {
  background: #ddd !important;
}
.m-bottom-betbar button{
  position: relative;
}
.m-bottom-betbar button:after {
  content: "";
  border-right: 0.7rem solid #f00;
  border-top: 0.7rem solid transparent;
  position: absolute;
  right: 0.3rem;
  bottom: 0.3rem;
  z-index: 98;
}
.m-bet-tool li:nth-child(2){margin:0 0 0 8%;}
</style>
