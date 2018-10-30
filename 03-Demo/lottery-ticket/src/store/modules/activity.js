/**
* 活动模块
* 获取优惠卷（红包）金额
* 返佣活动
*/

import * as types from '../types'
import api from '../../api/api'
import { Notification } from 'element-ui'

const state = {
  coupon_value: '',
  coupon: [],
  coupon_face: 0,
  coupon_id: 0,
  bet_total_money: 0,
  cash_back: {
    balance: 0,
    share_count: 0
  },
  cash_back_list: {
    count: 0,
    data: [
      {
        balance_before: 0,
        balance_now: 0,
        fee: 0,
        type: 0,
        mark: 0,
        add_time: ''
      }
    ]
  }
}

const getters = {
  coupon_value: state => state.coupon_value,
  coupon_face: state => {
    let usableCoupon = []
    state.coupon.forEach(c => {
      if (c.minimum <= state.bet_total_money) {
        usableCoupon.push(c)
      }
    })
    usableCoupon.sort((a, b) => {
      return b.face - a.face
    })
    return (usableCoupon.length > 0) ? usableCoupon[0].face : 0
  },
  coupon_id: state => {
    let usableCoupon = []
    state.coupon.forEach(c => {
      if (c.minimum <= state.bet_total_money) {
        usableCoupon.push(c)
      }
    })
    usableCoupon.sort((a, b) => {
      return b.face - a.face
    })
    return (usableCoupon.length > 0) ? usableCoupon[0].id : 0
  }
}

const mutations = {
  [types.GET_COUPON_VALUE] (state, res) {
    state.coupon_value = res
  },
  [types.GET_COUPON] (state, res) {
    if (res) {
      state.coupon = res.sort((a, b) => {
        return new Date(a.expired_date) - new Date(b.expired_date)
      })
    }
  },
  betTotalMoney (state, res) {
    state.bet_total_money = res
  },
  [types.GET_CASH_BACK_INDEX] (state, res) {
    state.cash_back = res
  },
  [types.GET_CASH_BACK_LIST] (state, res) {
    state.cash_back_list = res
  }
}

const actions = {
  // 获取优惠券（红包）金额
  getCouponValue ({ commit }, data) {
    return api.getCoupon(data)
      .then(res => {
        commit(types.GET_COUPON_VALUE, res)
        if (res.errno === '0') {
          Notification.success({message: res.errmsg, duration: 1000, position: 'bottom-right', showClose: false})
        }
      }).catch(err => console.log(err))
  },
  // 获取优惠券信息
  getCoupon ({ commit }, data) {
    return api.coupon(data)
      .then(res => {
        commit(types.GET_COUPON, res.data)
      }).catch((err) => { console.log(err) })
  },
  // 获取投注总金额
  getBetTotalMoney ({ commit }, total_money) {
    commit('betTotalMoney', total_money)
  },
  getShare ({commit}, data) {
    api.cashBack(data)
      .then(res => {
        commit(types.GET_CASH_BACK_INDEX, res.data)
      }).catch(err => console.log(err))
  },
  getShareList ({commit}, data) {
    api.cashBackList(data)
      .then(res => {
        commit(types.GET_CASH_BACK_LIST, res)
      }).catch(err => console.log(err))
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
