// 竞彩足球、蓝球
// 足球竞彩赛事详情

import * as types from '../types'
import api from '../../api/api'

const state = {
  zq_info: {},
  order_id: '',
  zq_result: {},
  zq_today: {},
  zq_two_ago: {},
  zq_one_ago: {},
  bet_list: {},
  bet_count: '',
  history_list: {
    away_future_match: {
      future_match: []
    },
    away_history_result: {
      data: []
    },
    home_future_match: {
      future_match: []
    },
    home_history_result: {
      data: []
    },
    home_away_history_match: {
      data: []
    }
  },
  point_list: {
    away_ranking: [
      {
        ranks: [],
        title: ''
      }
    ],
    host_ranking: [
      {
        ranks: [],
        title: ''
      }
    ],
    total_ranking: [
      {
        ranks: [],
        title: ''
      }
    ]
  },
  rate_list: {
    europe_rates: {
      rates: []
    },
    asia_rates: {
      rates: []
    },
    dxp_rates: {
      rates: []
    }
  },
  sub_list: {

  }
}

const getters = {
  sub_list: state => state.sub_list
}

const mutations = {
  // 竞彩足球开奖信息处理
  [types.MATCH_RESULT] (state, res) {
    // 判断长度
    if (res.length > 1) {
      // 根据时间分组
      // 分别给每个组按 match_index 排序
      let newRes = {}
      let arr = []
      for (let i = 0; i < res.length; i++) {
        let ri = res[i]
        if (!newRes[ri.match_date]) {
          arr.push({
            match_date: ri.match_date,
            data: [ri]
          })
          newRes[ri.match_date] = ri.match_date
        } else {
          for (let j = 0; j < arr.length; j++) {
            let aj = arr[j]
            if (aj.match_date === ri.match_date) {
              aj.data.push(ri)
              break
            }
          }
        }
      }
      // 根据 ,atch_index 排序
      state.zq_today = !arr[0] || arr[0].data.sort((a, b) => a.match_index - b.match_index)
      state.zq_one_ago = !arr[1] || arr[1].data.sort((a, b) => a.match_index - b.match_index)
      state.zq_two_ago = !arr[2] || arr[2].data.sort((a, b) => a.match_index - b.match_index)
    } else {
      state.zq_result = res
    }
  },
  [types.GAME_ORDERS] (state, res) {
    state.bet_list = res.data
    state.bet_count = res.count
  },
  [types.GAME_HISTORY] (state, res) {
    state.history_list = res.data
  },
  [types.GAME_POINT] (state, res) {
    state.point_list = res.data
  },
  [types.GAME_RATE] (state, res) {
    state.rate_list = res.data
  },
  [types.GET_SubOrder] (state, res) {
    state.sub_list = res.data
  }
}

const actions = {
  // 获取比赛结果
  getMatchResult ({ commit }, data) {
    api.matchResult(data)
      .then(res => {
      // console.log("竞彩开奖结果：")
      // console.log(res.data);
        commit(types.MATCH_RESULT, res.data)
      })
  },
  // 获取对阵信息
  getMatchInfo ({ commit }, data) {
    api.matchQuery(data)
      .then(res => {
      // console.log(res);
      })
  },
  // 竞彩下注
  getMatchOrder ({ commit }, data) {
    api.matchOrder(data)
      .then(res => {
      // console.log(res);
      })
  },
  // 获取竞彩订单信息
  getGameOrders ({ commit }, data) {
    api.gameOrders(data)
      .then(res => {
      // console.log(res)
        commit(types.GAME_ORDERS, res)
      })
  },
  // 获取竞猜子订单信息
  gameSubOrders ({commit}, data) {
    api.gameSub(data)
      .then(res => {
        commit(types.GET_SubOrder, res)
      })
  },
  // 获取竞彩近期战绩
  getMatchHistory ({ commit }, data) {
    api.gameHistory(data)
      .then(res => {
        commit(types.GAME_HISTORY, res)
      })
  },
  // 获取比赛积分详情
  getMatchPoint ({ commit }, data) {
    api.gamePoint(data)
      .then(res => {
        commit(types.GAME_POINT, res)
      })
  },
  // 获取比赛赔率详情
  getMatchRate ({ commit }, data) {
    api.gameRate(data)
      .then(res => {
        commit(types.GAME_RATE, res)
      })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
