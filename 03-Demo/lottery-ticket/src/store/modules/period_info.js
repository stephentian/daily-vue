// 奖期开奖结果查询
import * as types from '../types'
import api from '../../api/api'

const state = {
  periodInfo: [],
  periodInfos: []
}

const getters = {
  periodInfo: state => state.periodInfo,
  periodInfos: state => state.periodInfos
}

const mutations = {
  [types.GET_PeriodInfo] (state, res) {
    res.forEach(item => {
      if (item.bonus_code.indexOf('#') > -1) {
        item.redBalls = item.bonus_code.split('#')[0].split(',')
        item.blueBalls = item.bonus_code.split('#')[1].split(',')
      } else {
        item.redBalls = item.bonus_code.split(',')
        item.blueBalls = []
      }
    })
    state.periodInfo = res.sort((a, b) => {
      return new Date(b.official_stop_time) - new Date(a.official_stop_time)
    })
  },
  [types.GET_PeriodInfos] (state, res) {
    res.forEach(item => {
      if (item.bonus_code.indexOf('#') > -1) {
        item.redBalls = item.bonus_code.split('#')[0].split(',')
        item.blueBalls = item.bonus_code.split('#')[1].split(',')
      } else {
        item.redBalls = item.bonus_code.split(',')
        item.blueBalls = []
      }
    })
    state.periodInfos = res.sort((a, b) => {
      return new Date(b.official_stop_time) - new Date(a.official_stop_time)
    })
  }
}
const actions = {
  getPeriodInfo ({ commit }) {
    api.periodInfo()
      .then(res => {
        commit(types.GET_PeriodInfo, res.data)
      })
      .catch(err => console.log(err))
  },
  getPeriodInfos ({ commit }, lottery_alias) {
    state.periodInfos = []
    api.periodInfo({
      lottery_alias: lottery_alias.name,
      lottery_period: lottery_alias.period
    })
      .then(res => {
        if (res.errno === '0') {
          commit(types.GET_PeriodInfos, res.data)
        } else {
        // console.log(res);
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
