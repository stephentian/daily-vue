<template lang="html">
  <div id="jczqdetail" v-loading="isShow">
    <header class="m-top g-top-open">
      <h2 class="m-top-title tac"><i class="iconfont icon-arrow-left mr10" @click="routerBack"></i><span>投注详情</span></h2>
      <div class="m-top-txt">
        <router-link tag="i" class="iconfont icon-home-active" :to="{name: 'home'}"></router-link>
      </div>
    </header>
    <div class="header-top-space"></div>
    <section class="g-detail-bet">
      <div class="m-detail-bet">
        <div class="m-detail-title">
          <i class="ico-small lottery-jczq"></i>
          <h3 class="ml10">竞彩足球</h3>
        </div>
        <div class="m-detail-txt mt10">
          <p class="mr10"><span class="mr10">订单金额</span><span class="mr10">{{ (bet_money / 100).toFixed(2) }}元</span></p>
          <p class="mr10"><span class="mr10">中奖金额</span><span class="mr10">{{ (bonus_money / 100).toFixed(2) }}元</span></p>
        </div>
        <div class="m-detail-txt mt5">
          <p class="mr10"><span class="mr10">订单状态</span><span class="mr10">{{ order_status_txt }}</span></p>
          <p class="mr10"><span v-if="order_detail.order_status === 0" @click="payOrder" class="mr10 m-detail-btn tac red">立即支付</span><span @click="deleteOrder" class="mr10 m-detail-btn tac" v-if="order_status === 0">删除订单</span></p>
        </div>
      </div>
    </section>
    <section class="g-game-detail mt15">
      <h5 class="m-title-h5">投注内容</h5>
      <table cellpadding="0" cellspacing="0">
        <tr class="tac">
          <th>场次</th>
          <th width="100">主队 vs 客队</th>
          <th width="80" v-show="(order_status === 2) || (order_status === 5) || (order_status === 6)">赛果</th>
          <th>您的投注</th>
        </tr>
        <!-- todo -->
        <tr class="tac" v-if="lottery_id !== 'FT10'" v-for="(item, index) in game_detail" :key="index">
          <td><span>周</span>{{item.match_number.split('*')[1] | weekIndexFnc1}}<br><span>{{item.match_number.split('*')[2]}}</span></td>
          <td><span>{{ item.home_team }}<em v-if="lottery_id === 'FT02'">({{ item.ft_let_point_multi > 0 ? ('+' + item.ft_let_point_multi) : item.ft_let_point_multi }})</em><em v-if="(lottery_id == 'FT09 '&& item['lottery_id']=='FT02')">({{ item.ft_let_point_multi > 0 ? ('+' + item.ft_let_point_multi) : item.ft_let_point_multi }})</em></span> <em>{{ (item.ft01_result !== '') ? item.ft03_result : ':' }}</em> <span>{{ item.away_team }}</span></td>
          <td v-show="(order_status === 2) || (order_status === 5) || (order_status === 6)">
            <p v-if="(lottery_id === 'FT01') || (lottery_id === 'FT09') && (item.lottery_id === 'FT01')">{{ item.ft01_result }}</p>
            <p v-if="(lottery_id === 'FT02') || (lottery_id === 'FT09') && (item.lottery_id === 'FT02')">{{ item.ft02_result }}</p>
            <p v-if="(lottery_id === 'FT03') || (lottery_id === 'FT09') && (item.lottery_id === 'FT03')">{{ item.ft03_result }}</p>
            <p v-if="(lottery_id === 'FT04') || (lottery_id === 'FT09') && (item.lottery_id === 'FT04')">{{ item.ft04_result }}</p>
            <p v-if="(lottery_id === 'FT05') || (lottery_id === 'FT09') && (item.lottery_id === 'FT05')">{{ item.ft05_result }}</p>
          </td>
          <td>
            <p :class="{ red: redFlag(item, lottery_id, i) }" v-for="(bet_type, i) in item.lists['bet_type']" :key="i">
              <span v-if="lottery_id !== 'FT09'">{{ [bet_type, lottery_id] | toType }}</span>
              <span v-if="lottery_id === 'FT09'">{{ [bet_type, item['lottery_id']] | toType }}</span>
              <em v-if="(order_status === 2) || (order_status === 5) || (order_status === 6)">{{ (Object.keys(item.lists).indexOf("odds") > -1) ? '(' + item.lists['odds'][i] + ')' : '' }}</em>
            </p>
          </td>
        </tr>
        <!-- 为FT10开辟新的数据 -->
        <tr class="tac" v-if="lottery_id === 'FT10'" v-for="(item,index) in game_detail_ft" :key="index">
          <td><span>周</span>{{index.split('*')[1] | weekIndexFnc1}}<br><span>{{index.split('*')[2]}}</span></td>
          <td> <span v-html="item.team"></span></td>
          <td v-show="(order_status === 2) || (order_status === 5) || (order_status === 6)">
            <p v-for="(item1,index1) in item.lottery_id"  :key="index1">
              {{item.result[item1.split('##')[0]]}}
            </p>
          </td>
          <td>
            <!-- :class="{ red: redFlag(item, item1.split('##')[0], index2) }" -->
            <p v-for="(item1,index1) in item.lottery_id" :key="index1">
              <span :class="{ red: redFlag(item, item1.split('##')[0], 0, item1.split('##')[1].split(',')[index2]) }" v-for="(item2,index2) in item1.split('##')[1].split(',')" :key="index2">
                {{ [item2, item1.split('##')[0]] | toType }}<br>
              </span>
            </p>
          </td>
        </tr>
      </table>
      <div v-if="order_detail.is_farther === 1">
        <p class="tac mt10 mb10" @click="requestSub(order_detail.order_id)" style="color:#4560E5">
          {{ticketDetail ? '收起' : '展开'}}出票详情
          <!-- <i class="ml5 iconfont" style="font-size:10px" :class="subShow ? 'icon-arrow-horizontal-up' : 'icon-arrow-horizontal-down'"></i> -->
          <span class="subArrow" :class="subShow ? '' : 'active'">
          </span>
        </p>
        <table v-show="subShow">
          <tr class="tac">
            <th width="40">序号</th>
            <th>投注内容</th>
            <th width="70">过关方式</th>
            <th width="40">倍数</th>
            <th width="60">状态</th>
          </tr>
          <tr class="tac" v-for="(item,index) in sub_list" :key="index">
            <td>{{index + 1}}</td>
            <td>
              <p class="addh" v-for="(item1,index1) in item.content" :key="index1">
                <span v-html="item1"></span>
              </p>
            </td>
            <td>{{item.type}}</td>
            <td>{{item.bet_multi}}</td>
            <td>
              <span :class="item.status === 6 ? 'red' : ''">
                {{item.status | payStatus}}
              </span>
              <p v-if="item.status === 6" class="red">
                {{item.bonus_money / 100}}
              </p>
            </td>
          </tr>
        </table>
      </div>
    </section>
    <section class="g-game-cartinfo mt15">
      <h5 class="m-title-h5">投注信息</h5>
      <p><span>{{ match_detail.length }}场{{ bet_multi }}倍</span><span>{{ lottery_id | play_type }}</span><span>{{ order_detail.bet_type | bet_type }}</span></p>
    </section>
    <section>
      <a @click="linkto">
        <img style="width:90%;display:inline-block;margin-left:5%;" src="https://cstatic.duoduocp.cn/cdd/p/other/iOS@2x.png" alt="">
      </a>
    </section>
    <section class="g-detail-order mt15">
      <div class="m-input">
        <label>下单时间</label><code>{{ order_time }}</code>
      </div>
      <div class="m-input">
        <label>订单编号</label><code>{{ order_detail.order_id }}</code>
      </div>
      <div class="m-input">
        <label>支付信息</label><code>优惠券支付{{ coupon_money / 100 }}元,余额支付{{ (bet_money - coupon_money) / 100 }}元</code>
      </div>
    </section>
    <h5 class="m-title-h5 tac mt5">
      <router-link class="blue tdl" to="/jczqWay">中奖如何计算？</router-link>
    </h5>
    <div class="footer-bottom-space"></div>
    <footer class="m-footer box-shadow">
      <div class="m-footer-delete" v-if="order_detail.order_status === 0">
        <div class="tac" @click="deleteOrder">
          删除订单
        </div>
        <div>
          <div class="m-bottom-btn">
            <div @click="payOrder" class="m-footer-btn bgColor tac">立即支付</div>
          </div>
        </div>
      </div>
      <div v-else class="m-bottom-btn">
        <router-link tag="button" class="m-footer-btn" to="/jczq">竞彩足球投注</router-link>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { MessageBox } from 'mint-ui'
import store from '@/store/index.js'
// import api from '@/api/api.js'

export default {
  name: 'jczqdetail',
  data () {
    return {
      order_id: this.$route.query.order_id,
      isShow: false,
      recharge_info: {
        user_id: localStorage.user_id,
        pay_type: 1,
        subject: '微信待付',
        detail: '充值金额',
        total_amount: '',
        mark: '',
        platform: 1,
        service_type: 2,
        order_lst: this.$route.query.order_id
      },
      chargeType: true,
      popShow: false,
      ticketDetail: false,
      ftData: {},
      subShow: false,
      subClickCount: false
    }
  },
  created () {
    this.$store.dispatch('getUserInfo', {'user_id': localStorage.user_id})
    this.isIosWebview = String(localStorage.getItem('iosWebview')) === 'true' || false
    if (!this.isShow) {
      this.isShow = true
      this.$store.dispatch('getGameOrder', {user_id: localStorage.user_id, order_id: this.order_id}).then((res) => {
        this.isShow = false
      })
    }
  },
  computed: {
    ...mapState({
      gameOrder: state => state.userOrder.gameOrder,
      match_detail: state => {
        if (state.userOrder.gameOrder) {
          return state.userOrder.gameOrder.match_detail
        } else {
          return []
        }
      },
      pay_switch_data: state => {
        let object1 = state.query.pay_switch_data.filter((o, i) => {
          return o.status === 0
        })
        return object1
      },
      balance: state => state.login.user_info.balance,
      order_detail: state => {
        if (state.userOrder.gameOrder) {
          return state.userOrder.gameOrder.order_detail
        } else {
          return {}
        }
      },
      sub_list: state => {
        let obj = Array.from(state.match.sub_list).map((o, i) => {
          let b = {}
          b.type = o.bet_type.substr(0, 1) + '串1'
          b.bet_multi = o.bet_multi
          b.status = o.order_status
          b.content = []
          b.bonus_money = o.bonus_money

          let toTypeFnc = function ([bet_type, lottery_id]) {
            if (lottery_id === 'FT01') {
              let x
              switch (bet_type) {
                case '0': x = '客胜'
                  break
                case '1': x = '平'
                  break
                case '3': x = '主胜'
                  break
              }
              return x
            } else if (lottery_id === 'FT02') {
              let x
              switch (bet_type) {
                case '0': x = '让球客胜'
                  break
                case '1': x = '让球平'
                  break
                case '3': x = '让球主胜'
                  break
              }
              return x
            } else if (lottery_id === 'FT03') {
              if ((bet_type[0] !== '9') && (bet_type[1] !== '9')) {
                return '比分' + bet_type[0] + ':' + bet_type[1]
              } else {
                let x
                switch (bet_type) {
                  case '09': x = '比分负其他'
                    break
                  case '90': x = '比分胜其他'
                    break
                  case '99': x = '比分平其他'
                    break
                }
                return x
              }
            } else if (lottery_id === 'FT04') {
              if (bet_type < 7) {
                return '总进球数' + bet_type
              } else {
                return '总进球数' + bet_type + '+'
              }
            } else if (lottery_id === 'FT05') {
              let x
              switch (bet_type) {
                case '00': x = '负负'
                  break
                case '01': x = '负平'
                  break
                case '03': x = '负胜'
                  break
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
              }
              return x
            }
          }

          function weekIndexFnc (c) {
            let dayIndex = ''
            switch (c) {
              case '1':
                dayIndex = '一'
                break
              case '2':
                dayIndex = '二'
                break
              case '3':
                dayIndex = '三'
                break
              case '4':
                dayIndex = '四'
                break
              case '5':
                dayIndex = '五'
                break
              case '6':
                dayIndex = '六'
                break
              case '7':
                dayIndex = '日'
                break
            }
            return dayIndex
          }

          if (o.order_status === 2 || o.order_status === 5 || o.order_status === 6) {
            let code_rate = o.code_rate
            let str = code_rate.split('^').sort((a, b) => a.localeCompare(b))
            let str1
            for (let i = 0; i < str.length; i++) {
              let odds = []
              let type = []
              let lottery_id = str[i].substr(str[i].lastIndexOf('*') + 1, 4)
              str1 = str[i].substring(str[i].indexOf('=') + 1)
              if (str1.indexOf(',') > -1) {
                let str2 = str1.split(',')
                for (let a = 0; a < str2.length; a++) {
                  let sIdx = str2[a].indexOf('(')
                  let eIdx = str2[a].indexOf(')')
                  type.push(str2[a].substring(0, sIdx))
                  odds.push(str2[a].substring(sIdx + 1, eIdx))
                }
              } else {
                let sIdx = str1.indexOf('(')
                let eIdx = str1.indexOf(')')
                type.push(str1.substring(0, sIdx))
                odds.push(str1.substring(sIdx + 1, eIdx))
              }
              let lists = {}
              lists.odds = odds
              lists.bet_type = type
              lists.lottery_id = lottery_id

              let cwList = []
              let cw = '周' + weekIndexFnc(str[i].split('*')[1]) + str[i].split('*')[2]
              for (let h in lists.bet_type) {
                let bb = toTypeFnc([lists.bet_type[h], lists.lottery_id]) + ' <span class="red">' + lists.odds[h] + '</span>'
                cwList.push(bb)
              }
              b.content.push(cw + '(' + cwList.join(',') + ')')
            }
          } else {
            let bet_codes = o.bet_codes
            let str = bet_codes.split('^').sort((a, b) => a.localeCompare(b))
            let type = []
            for (let i = 0; i < str.length; i++) {
              let p = str[i].split('*')
              if (p[p.length - 1].indexOf(',') > -1) {
                let p2 = p[p.length - 1].split(',')
                type = p2
              } else {
                let p3 = p[p.length - 1]
                type = p3.split(' ')
              }
              let lists = {}
              let cwList = []
              if (o.lottery_id === 'FT10' || o.lottery_id === 'FT09') {
                lists.lottery_id = str[i].split('*')[3]
              } else {
                lists.lottery_id = o.lottery_id
              }
              lists.bet_type = type
              let cw = '周' + weekIndexFnc(str[i].split('*')[1]) + str[i].split('*')[2]
              for (let h in lists.bet_type) {
                let bb = toTypeFnc([lists.bet_type[h], lists.lottery_id])
                cwList.push(bb)
              }
              b.content.push(cw + '(' + cwList.join(',') + ')')
            }
          }
          return b
        })
        return obj
      },
      // ft10数据
      game_detail_ft: state => {
        let gameOrder = state.userOrder.gameOrder
        if (gameOrder && gameOrder.order_detail.lottery_id === 'FT10') {
          let FTList = {}
          let bet_codes = gameOrder.order_detail.bet_codes
          let strr = bet_codes.split('^').sort((a, b) => a.localeCompare(b))
          strr.forEach((o, i) => {
            let s = o.split('*FT')[0]
            let sl = o.split('*').length
            let oc = o.split('*')[sl - 2] + '##' + o.split('*')[sl - 1]
            let os = o.split('*')[sl - 1]
            if (!FTList[s]) {
              FTList[s] = {}
              let c = []
              let c1 = []
              c.push(oc)
              c1.push(os)
              FTList[s].lottery_id = c
              FTList[s].bet_type = c1
              FTList[s].lists = {
                'bet_type': 'cs'
              }
              FTList[s].team = gameOrder.match_detail[i].home_team + (gameOrder.match_detail[i].ft_let_point_multi === 0 ? '' : '(' + gameOrder.match_detail[i].ft_let_point_multi + ')') + (gameOrder.match_detail[i].ft03_result ? ' <span class="red">' + gameOrder.match_detail[i].ft03_result + '</span>' : ':') + gameOrder.match_detail[i].away_team + (gameOrder.match_detail[i].bt_let_point_multi === 0 ? '' : '(' + gameOrder.match_detail[i].bt_let_point_multi + ')')
              FTList[s].result = {
                'FT01': gameOrder.match_detail[i].ft01_result,
                'FT02': gameOrder.match_detail[i].ft02_result,
                'FT03': gameOrder.match_detail[i].ft03_result,
                'FT04': gameOrder.match_detail[i].ft04_result,
                'FT05': gameOrder.match_detail[i].ft05_result
              }
              FTList[s]['ft01_result'] = gameOrder.match_detail[i].ft01_result
              FTList[s]['ft02_result'] = gameOrder.match_detail[i].ft02_result
              FTList[s]['ft03_result'] = gameOrder.match_detail[i].ft03_result
              FTList[s]['ft04_result'] = gameOrder.match_detail[i].ft04_result
              FTList[s]['ft05_result'] = gameOrder.match_detail[i].ft05_result
            } else {
              FTList[s].lottery_id.push(oc)
              FTList[s].bet_type.push(os)
            }
          })
          return FTList
        }
      },
      game_detail: state => {
        let gameOrder = state.userOrder.gameOrder
        if (gameOrder) {
          let game_detail = gameOrder.match_detail.sort((a, b) => a['match_number'].localeCompare(b['match_number']))
          let order_status = gameOrder.order_detail.order_status
          if ((gameOrder.order_detail.is_farther === 0) && ((order_status === 2) || (order_status === 5) || (order_status === 6))) {
            let code_rate = gameOrder.order_detail.code_rate
            let str = code_rate.split('^').sort((a, b) => a.localeCompare(b))
            let str1
            for (let i = 0; i < str.length; i++) {
              let odds = []
              let type = []
              let lottery_id = str[i].substr(str[i].lastIndexOf('*') + 1, 4)
              str1 = str[i].substring(str[i].indexOf('=') + 1)
              if (str1.indexOf(',') > -1) {
                let str2 = str1.split(',')
                for (let a = 0; a < str2.length; a++) {
                  let sIdx = str2[a].indexOf('(')
                  let eIdx = str2[a].indexOf(')')
                  type.push(str2[a].substring(0, sIdx))
                  odds.push(str2[a].substring(sIdx + 1, eIdx))
                }
              } else {
                let sIdx = str1.indexOf('(')
                let eIdx = str1.indexOf(')')
                type.push(str1.substring(0, sIdx))
                odds.push(str1.substring(sIdx + 1, eIdx))
              }
              let lists = {}
              lists.odds = odds
              lists.bet_type = type
              lists.lottery_id = lottery_id
              game_detail[i].odds = odds
              game_detail[i].bet_type = type
              game_detail[i].lottery_id = lottery_id
              game_detail[i].lists = lists
            }
          } else {
            let bet_codes = gameOrder.order_detail.bet_codes
            let str = bet_codes.split('^').sort((a, b) => a.localeCompare(b))
            let type = []
            for (let i = 0; i < str.length; i++) {
              let p = str[i].split('*')
              if (p[p.length - 1].indexOf(',') > -1) {
                let p2 = p[p.length - 1].split(',')
                type = p2
              } else {
                let p3 = p[p.length - 1]
                type = p3.split(' ')
              }
              let lists = {}
              lists.bet_type = type
              game_detail[i].bet_type = type
              game_detail[i].lists = lists
            }
          }
          return game_detail
        } else {
          return []
        }
      },
      order_status: state => {
        if (state.userOrder.gameOrder) {
          return state.userOrder.gameOrder.order_detail.order_status
        } else {
          return -1
        }
      },
      order_status_txt: state => {
        //  0.待支付 1.支付成功/等待出票 2.出票成功/等待开奖 3.出票失败/等待退款 4.已退款 5.未中奖 6.已中奖
        if (state.userOrder.gameOrder) {
          let order_status = ['待支付', '支付成功/等待出票', '出票成功/等待开奖', '.出票失败/等待退款', '已退款', '未中奖', '已中奖', '部分出票成功/待开奖']
          return order_status[state.userOrder.gameOrder.order_detail.order_status]
        } else {
          return '---'
        }
      },
      order_time: state => {
        if (state.userOrder.gameOrder) {
          let order_time = new Date(state.userOrder.gameOrder.order_detail.order_time)
          return order_time.toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
        } else {
          return '---'
        }
      },
      bet_money: state => {
        if (state.userOrder.gameOrder) {
          return state.userOrder.gameOrder.order_detail.bet_money
        } else {
          return 0
        }
      },
      coupon_money: state => {
        if (state.userOrder.gameOrder) {
          return state.userOrder.gameOrder.order_detail.coupon_money
        } else {
          return 0
        }
      },
      bonus_money: state => {
        if (state.userOrder.gameOrder) {
          return state.userOrder.gameOrder.order_detail.bonus_money
        } else {
          return 0
        }
      },
      bet_multi: state => {
        if (state.userOrder.gameOrder) {
          return state.userOrder.gameOrder.order_detail.bet_multi
        } else {
          return '-'
        }
      },
      lottery_id: state => {
        if (state.userOrder.gameOrder) {
          return state.userOrder.gameOrder.order_detail.lottery_id
        }
      }
    })
  },
  filters: {
    payStatus: function (i) {
      let order_status = ['待支付', '支付成功/等待出票', '出票成功/等待开奖', '.出票失败/等待退款', '已退款', '未中奖', '已中奖', '部分出票成功/待开奖']
      return order_status[i]
    },
    weekIndexFnc1 (c) {
      let dayIndex = ''
      switch (c) {
        case '1':
          dayIndex = '一'
          break
        case '2':
          dayIndex = '二'
          break
        case '3':
          dayIndex = '三'
          break
        case '4':
          dayIndex = '四'
          break
        case '5':
          dayIndex = '五'
          break
        case '6':
          dayIndex = '六'
          break
        case '7':
          dayIndex = '日'
          break
      }
      return dayIndex
    },
    play_type: function (play_type) {
      let x
      switch (play_type) {
        case 'FT01': x = '胜平负'
          break
        case 'FT02': x = '让球胜平负'
          break
        case 'FT03': x = '比分'
          break
        case 'FT04': x = '总进球数'
          break
        case 'FT05': x = '半全场'
          break
        case 'FT09': x = '混合过关'
          break
        case 'FT10': x = '混合过关'
          break
      }
      return x
    },
    bet_type: function (bet_type) {
      let x = []
      if (bet_type) {
        let len = bet_type.split('').length
        for (let i = 1; i < len; i++) {
          if (bet_type[i] > 1) {
            x.push(bet_type[i] + '串1')
          } else if (bet_type[i] === 1) {
            x.push('单关')
          }
        }
        return x.join()
      } else {
        return '---'
      }
    },
    toType: function ([bet_type, lottery_id]) {
      if (lottery_id === 'FT01') {
        let x
        switch (bet_type) {
          case '0': x = '客胜'
            break
          case '1': x = '平'
            break
          case '3': x = '主胜'
            break
        }
        return x
      } else if (lottery_id === 'FT02') {
        let x
        switch (bet_type) {
          case '0': x = '让球客胜'
            break
          case '1': x = '让球平'
            break
          case '3': x = '让球主胜'
            break
        }
        return x
      } else if (lottery_id === 'FT03') {
        if ((bet_type[0] !== '9') && (bet_type[1] !== '9')) {
          return '比分' + bet_type[0] + ':' + bet_type[1]
        } else {
          let x
          switch (bet_type) {
            case '09': x = '比分负其他'
              break
            case '90': x = '比分胜其他'
              break
            case '99': x = '比分平其他'
              break
          }
          return x
        }
      } else if (lottery_id === 'FT04') {
        if (bet_type < 7) {
          return '总进球数' + bet_type
        } else {
          return '总进球数' + bet_type + '+'
        }
      } else if (lottery_id === 'FT05') {
        let x
        switch (bet_type) {
          case '00': x = '负负'
            break
          case '01': x = '负平'
            break
          case '03': x = '负胜'
            break
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
        }
        return x
      }
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
  watch: {
    sub_list () {
      this.$nextTick(function () {
        this.isShow = false
      })
    }
  },
  methods: {
    linkto () {
      try {
        if (window.location.href.includes('m.duoduocp')) {
          window.webkit.messageHandlers.iosBannerIndex.postMessage('https://m.duoduocp.cn/p/inviteApp/indexrule.html')
        } else {
          window.webkit.messageHandlers.iosBannerIndex.postMessage('https://h5-client.wangzheka.cn//p/inviteApp/indexrule.html')
        }
      } catch (err) {
        if (window.location.href.includes('m.duoduocp')) {
          window.top.location.href = 'https://m.duoduocp.cn/p/inviteApp/indexrule.html'
        } else {
          window.top.location.href = 'https://h5-client.wangzheka.cn//p/inviteApp/indexrule.html'
        }
      }
    },
    requestSub (d) {
      if (!this.subClickCount) {
        this.isShow = true
        this.$store.dispatch('gameSubOrders', {
          order_id: d,
          user_id: localStorage.user_id,
          page: 1,
          limit: 100000
        }).then(() => {
          this.subClickCount = true
        })
      }
      this.subShow = !this.subShow
    },
    cancleSubmit () {
      this.popShow = false
    },
    deleteOrder () {
      MessageBox.confirm('您确定要删除该订单吗？删除后将不能恢复', '确认删除', true).then(action => {
        this.$store.dispatch('deleteWaitOrder', {user_id: localStorage.user_id, order_type: 1, order_lst: this.order_id}).then((res) => {
          if (res) {
            window.history.length > 2 ? this.$router.go(-1) : this.$router.push('/home')
          }
        })
      }).catch((error) => {
        console.log(error)
      })
    },
    payOrder () {
      this.$set(this.recharge_info, 'total_amount', this.bet_money - this.balance - this.coupon_money)
      store.commit('orderLotteryAlias', 'jczq')
      let p1 = {
        user_id: localStorage.user_id,
        total_money: this.bet_money - this.coupon_money,
        order_type: 1,
        order_lst: this.order_id
      }
      let p2 = {
        total_money: parseInt(this.bet_money / 100),
        balance: this.balance,
        coupon_face: this.coupon_money,
        period: this.lottery_period,
        name: 'jczq',
        chineseName: ''
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
        case 'FT10':
          p2.chineseName = '竞彩足球-混合投注'
          break
      }
      store.commit('PAY_DATA', [p1, p2, 'dzfzq'])
      store.commit('orderMoney', this.bet_money / 100)
      this.$router.push({path: '/paydetail', query: {order_id: this.$route.query.order_id}})
      // if (this.bet_money > this.balance + this.coupon_money) {
      //   this.popShow = true
      //   // this.$store.dispatch('userCharge', this.recharge_info)
      //   // 如果金额不足 调用微信支付
      //   // let ce = ((this.bet_money - this.balance - this.coupon_money) / 100).toFixed(2)
      //   // MessageBox.confirm('这笔订单还差' + ce + '元 是否前往支付?', '确认支付', true).then(action => {
      //   //   this.$store.dispatch('userCharge', this.recharge_info)
      //   // }).catch((error) => {
      //   //   console.log(error)
      //   // })
      // } else {
      //   MessageBox.confirm('您确认要支付该笔订单吗?支付后将从账户扣除相应金额', '确认支付', true).then(action => {
      //     api.order_pay({
      //       user_id: localStorage.user_id,
      //       total_money: this.bet_money - this.coupon_money,
      //       order_type: 1,
      //       order_lst: this.order_id
      //     })
      //       .then(res => {
      //         router.push({path: 'success', query: {order_id: this.order_id}})
      //         store.commit('orderMoney', this.bet_money - this.coupon_money)
      //       })
      //       .catch(err => {
      //         console.log(err)
      //       })
      //   }).catch((error) => {
      //     console.log(error)
      //   })
      // }
    },
    routerBack () {
      // 返回上一级
      window.history.length > 2 ? this.$router.go(-1) : this.$router.push('/home')
    },
    redFlag (item, lottery_id, i, c) {
      if (lottery_id === 'FT01') {
        let bet_type = item.lists['bet_type'] === 'cs' ? c.split(',') : item.lists['bet_type']
        let x
        switch (item.ft01_result) {
          case '负': x = '0'
            break
          case '平': x = '1'
            break
          case '胜': x = '3'
            break
        }
        return (bet_type[i].indexOf(x) > -1)
      } else if (lottery_id === 'FT02') {
        let bet_type = item.lists['bet_type'] === 'cs' ? c.split(',') : item.lists['bet_type']
        let x
        switch (item.ft02_result) {
          case '让球负': x = '0'
            break
          case '让球平': x = '1'
            break
          case '让球胜': x = '3'
            break
        }
        return (bet_type[i].indexOf(x) > -1)
      } else if (lottery_id === 'FT03') {
        let bet_type = item.lists['bet_type'] === 'cs' ? c.split(',') : item.lists['bet_type']
        let type = []
        bet_type.forEach(j => {
          type.push(j[0] + ':' + j[1])
        })
        let x = (item.ft03_result !== '') ? item.ft03_result : ' '
        return (type[i].indexOf(x) > -1)
      } else if (lottery_id === 'FT04') {
        let bet_type = item.lists['bet_type'] === 'cs' ? c.split(',') : item.lists['bet_type']
        let x = (item.ft04_result !== '') ? item.ft04_result : ' '
        return (bet_type[i].indexOf(x) > -1)
      } else if (lottery_id === 'FT05') {
        let bet_type = item.lists['bet_type'] === 'cs' ? c.split(',') : item.lists['bet_type']
        let x
        switch (item.ft05_result) {
          case '负负': x = '00'
            break
          case '负平': x = '01'
            break
          case '负胜': x = '03'
            break
          case '平负': x = '10'
            break
          case '平平': x = '11'
            break
          case '平胜': x = '13'
            break
          case '胜负': x = '30'
            break
          case '胜平': x = '31'
            break
          case '胜胜': x = '33'
            break
        }
        return (bet_type[i].indexOf(x) > -1)
      }
    }
  }
}
</script>

<style lang="css" scoped>
.m-top-title i {
  position: absolute;
  top: 50%;
  left: 2rem;
  -webkit-transform: translate(0,-50%);
  -moz-transform: translate(0,-50%);
  transform: translate(0,-50%);
}
.m-game-table {
  width: 100%;
  display: -webkit-flex;
  display: -moz-flex;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  position: relative;
  -webkit-justify-content: space-between;
  -moz-justify-content: space-between;
  justify-content: space-between;
}
.m-game-table dt, .m-game-table dd {
  line-height: 2.6rem;
  padding: 0 0.5rem;
  margin: -1px;
  border: 1px solid #d6d7dc;
  font-size: 1rem;
  background: #fff;
  color: #666;
  vertical-align: middle;
}
.addh{
  position: relative;
  line-height: 1.5;
  margin:15px 0;
}
.addh:after{
    position: absolute;
    content: '+';
    width: 10px;
    height: 10px;
    bottom: -0.4rem;
    left: 50%;
    font-size: 18px;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
}
p.addh:last-child:after {
    display: none;
}
.addh>span {
    display: inline-block;
    line-height: 1.5;
}

.subArrow{
  display: inline-block;
  width: 8px;
  height: 8px;
  border-bottom: 1px solid #4560E5;
  border-left: 1px solid #4560E5;
  position: relative;
}
.subArrow.active{
  transform: rotate(-45deg);
  top: -2px;
}
.subArrow{
  transform: rotate(-225deg);
  top:2px
}

</style>
