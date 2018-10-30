// 获取彩种的开通状态
import * as types from '../types'
import api from '../../api/api'

const state = {
  bannerList: [],
  bonusList: [],
  lotteryList: [],
  notifyList: [],
  quick_bet_data: [],
  pay_switch_data: [],
  bonus_pop: '',
  index_info: ''
}

const getters = {
  bannerList: state => state.bannerList,
  bonusList: state => state.bonusList,
  notifyList: state => state.notifyList,
  lotteryList: state => state.lotteryList,
  quick_bet_data: state => state.quick_bet_data,
  pay_switch_data: state => state.pay_switch_data,
  pay_bonusPop: state => state.bonus_pop,
  index_info: state => state.index_info
}

const mutations = {
  [types.GET_BANNER] (state, res) {
    state.bannerList = res
  },
  [types.GET_BONUS] (state, res) {
    state.bonusList = res
  },
  [types.QUERY_STATUS] (state, res) {
    state.lotteryList = res.sort((a, b) => {
      return a.id - b.id
    })
  },
  [types.GET_NOTIFY] (state, res) {
    state.notifyList = res
  },
  [types.QUICK_BET] (state, res) {
    state.quick_bet_data = res
  },
  [types.PAY_SWITCH] (state, res) {
    state.pay_switch_data = res
  },
  [types.PAY_BONUSPOP] (state, res) {
    state.bonus_pop = res
  },
  [types.GET_INDEXINFO] (state, res) {
    state.index_info = res
  }
}

const actions = {
  getBannerList ({ commit }) {
    api.banner()
      .then(res => {
        commit(types.GET_BANNER, res.data)
      })
      .catch(err => console.log(err))
  },
  getBonusList ({ commit }) {
    api.bonus()
      .then(res => {
        commit(types.GET_BONUS, res.data)
      })
      .catch(err => console.log(err))
  },
  getLotteryList ({ commit }) {
    // 请求的前操作
    commit(types.LOADING_STATUS, true)
    api.query()
      .then(res => {
        // 返回数据后的操作
        commit(types.QUERY_STATUS, res.data)
        commit(types.LOADING_STATUS, false)
      }).catch(err => console.log(err))
  },
  getNotifyList ({ commit }) {
    api.notify()
      .then(res => {
        commit(types.GET_NOTIFY, res.data)
      })
      .catch(err => console.log(err))
  },
  getQuick_bet ({ commit }) {
    api.quick_bet()
      .then(res => {
        commit(types.QUICK_BET, res.data)
      })
      .catch(err => console.log(err))
  },
  getPay_swtich ({ commit }) {
    api.pay_swtich()
      .then(res => {
        commit(types.PAY_SWITCH, res.data)
      })
      .catch(err => console.log(err))
  },
  getBonus_pop ({commit}, data) {
    api.bonusPop(data)
      .then(res => {
        commit(types.PAY_BONUSPOP, res.data)
      })
      .catch(err => console.log(err))
  },
  getBonus_popclear ({commit}, data) {
    commit(types.PAY_BONUSPOP, '')
  },
  getIndex_info ({commit}, data) {
    api.indexInfo(data)
      .then(res => {
        commit(types.GET_INDEXINFO, res.data)
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
