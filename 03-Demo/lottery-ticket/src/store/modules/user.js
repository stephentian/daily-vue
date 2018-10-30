/**
* 用户信息模块
* 修改密码
* 游戏币流水情况
* 兑换游戏币
* 用户彩票订单列表(投注记录)
* 订单详情
* 账户明细
* 用户追单记录表（追单记录）
* 追单详情
* 用户优惠券记录表（优惠券记录）
* 用户提现记录
**/

import * as types from '../types'
import api from '../../api/api'
import { Notification } from 'element-ui'

const state = {
  name: '',
  phone: '',
  token: '',
  data: {},
  bet_list: {},
  bet_count: '',
  account_list: {},
  account_count: '',
  order_list: {},
  order_count: '',
  bet_info: {},
  bet_info_count: '',
  coin_list: {},
  coin_count: '',
  coupon_list: {},
  coupon_count: '',
  cash_list: {},
  cash_count: ''
}

const getters = {
  name: state => state.name,
  phone: state => state.phone
}

const mutations = {
  // 投注记录
  [types.GET_USER_BET] (state, res) {
    state.bet_list = res.data
    state.bet_count = res.count
  },
  [types.GET_USER_ACCOUNT] (state, res) {
    state.account_list = res.data
    state.account_count = res.count
  },
  [types.GET_USER_ORDER] (state, res) {
    state.order_list = res.data
    state.order_count = res.count
  },
  // 追单详情
  [types.GET_BET_INFO] (state, res) {
    state.bet_info = res.data
    state.bet_info_count = res.count
  },
  [types.GET_COIN_INFO] (state, res) {
    state.coin_list = res.data
  },
  // 优惠券记录
  [types.GET_COUPON_LIST] (state, res) {
    state.coupon_list = res.data
    state.coupon_count = res.count
  },
  // 提现记录
  [types.GET_CASH_LIST] (state, res) {
    state.cash_list = res.data
    state.cash_count = res.count
  }
}

const actions = {
  // 修改密码
  updatePwd ({ commit }, data) {
    api.update(data)
      .then(res => {
        if (res.errno === '0') {
          Notification.success({message: res.errmsg, duration: 2000, position: 'bottom-right', showClose: false})
        }
      }).catch(err => console.log(err))
  },
  // 游戏币流水详情
  getCoinInfo ({ commit }, data) {
    api.gameCoinInfo(data)
      .then(res => {
        commit(types.GET_COIN_INFO, res)
      }).catch(err => console.log(err))
  },
  getCoin ({ commit }, data) {
    api.exchange(data)
      .then(res => {
      }).catch(err => console.log(err))
  },
  // 获取投注记录
  betOrderList ({ commit }, data) {
    return api.betOrder(data)
      .then(res => {
        commit(types.GET_USER_BET, res)
      }).catch(err => console.log(err))
  },
  // 获取用户账户记录（账户明细）
  accountList ({ commit }, data) {
    api.account(data)
      .then(res => {
        commit(types.GET_USER_ACCOUNT, res)
      }).catch(err => console.log(err))
  },
  // 获取用户追单记录列表
  chaseOrder ({ commit }, data) {
    api.orderFollow(data)
      .then(res => {
        commit(types.GET_USER_ORDER, res)
      }).catch(err => console.log(err))
  },
  // 获取追单详情
  chaseInfo ({ commit }, data) {
    api.followInfo(data)
      .then(res => {
        commit(types.GET_BET_INFO, res)
      }).catch(err => console.log(err))
  },
  // 优惠券记录
  getCouponList ({ commit }, data) {
    api.coupon(data)
      .then(res => {
        commit(types.GET_COUPON_LIST, res)
      }).catch(err => console.log(err))
  },
  // 提现记录
  getCashList ({commit}, data) {
    api.cashList(data)
      .then(res => {
        commit(types.GET_CASH_LIST, res)
      }).catch(err => console.log(err))
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
