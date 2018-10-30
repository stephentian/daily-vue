// 彩种奖期信息查询
import * as types from '../types'
import api from '../../api/api'

const state = {
  lottery_alias: '',
  lotteryStopTime: [],
  jxk3StopTime: [],
  dlcStopTime: [],
  lottery_period: ''
}

const getters = {
  lotteryStopTime: state => state.lotteryStopTime
}

const mutations = {
  [types.QUERY_PERIOD] (state, res) {
    if (res.lottery_alias === 'JXK3') {
      state.jxk3StopTime = res.data
    } else if (res.lottery_alias === 'dlc') {
      state.dlcStopTime = res.data
    } else {
      state.lotteryStopTime = res.data
    }
  },
  jxk3StopTimeInit (state, res) {
    state.jxk3StopTime = []
  },
  dlcStopTimeInit (state, res) {
    state.dlcStopTime = []
  }
}

const actions = {
  getLotteryStopTime ({ commit }, lottery_alias) {
    return new Promise((resolve, reject) => {
      api.period({
        lottery_alias: lottery_alias.name
      })
        .then(res => {
          if (res.errno === '0') {
            commit(types.QUERY_PERIOD, {data: res.data, lottery_alias: lottery_alias.name})
            resolve(res)
          } else {
            reject(res.errno)
          }
        })
        .catch(err => console.log(err))
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
