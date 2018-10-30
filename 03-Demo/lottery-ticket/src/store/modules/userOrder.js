// 投注接口
import * as types from '../types'
import api from '../../api/api'
import store from '../index.js'

const state = {
  userOrder: '',
  gameOrder: '',
  game_detail: [],
  lottery_order_msg_err: '',
  order_money: 0,
  order_lottery_alias: '',
  order_id: ''
}

const getters = {
  userOrder: state => state.userOrder,
  gameOrder: state => state.gameOrder
}

const mutations = {
  [types.GET_userOrder] (state, res) {
    state.userOrder = res
  },
  orderMoney (state, res) {
    state.order_money = res
  },
  lotteryOrderMsgErr (state, res) {
    state.lottery_order_msg_err = res
  },
  orderLotteryAlias (state, res) {
    state.order_lottery_alias = res
  },
  orderId (state, res) {
    state.order_id = res
  },
  [types.GET_GameOrder] (state, res) {
    state.gameOrder = res
  },
  userOrderInit (state, res) {
    state.userOrder = ''
  },
  gameOrderInit (state, res) {
    state.gameOrder = ''
  }
}
const actions = {
  getuserOrder ({ commit }, user) {
    commit('userOrderInit')
    api.betOrder({
      user_id: user.user_id,
      limit: user.limit,
      page: user.page,
      order_status: user.order_status,
      order_id: user.order_id
    })
      .then(res => {
        if (res.errno === '0') {
          commit(types.GET_userOrder, res.data) // todo
          store.dispatch('getPeriodInfos', {name: state.userOrder.lottery_alias, period: state.userOrder.lottery_period})
        } else {
        }
      })
      .catch(err => console.log(err))
  },
  getGameOrder ({ commit }, data) {
    commit('gameOrderInit')
    return api.gameOrder(data)
      .then(res => {
        if (res.errno === '0') {
          commit(types.GET_GameOrder, res.data)
        } else {
          console.log(res)
        }
      })
      .catch(err => console.log(err))
  },
  deleteWaitOrder ({ commit }, data) {
    return api.deleteWaitOrder(data)
      .then(res => {
        if (res.errno === '0') {
          return true
        } else {
          return false
        }
      })
      .catch(err => console.log(err))
  },
  payWaitOrder ({ commit }, data) {
    return api.payWaitOrder(data)
      .then(res => {
        if (res.error === '0') {
          return true
        } else {
          return false
        }
      })
      .catch(err => console.log(err))
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
