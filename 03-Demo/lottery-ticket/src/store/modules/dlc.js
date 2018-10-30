// 11选5投注

const state = {
  dlc: [],
  user_id: [],
  lottery_alias: 'dlc',
  lottery_period: [],
  ante_info: [],
  ante_code: [],
  play_type: [],
  amount: 1,
  count: 0,
  total_money: 0,
  single_money: [],
  follow_num: 1,
  betadd: 1
}

const getters = {
  dlc_count: state => {
    let count_total = 0
    state.dlc.forEach(function (value) {
      count_total += parseInt(value.count)
    })
    state.count = count_total
    return state.count
  },
  dlc_total_money: state => {
    state.total_money = state.betadd * state.count * state.amount * state.follow_num * 2
    return state.total_money
  }
}

const mutations = {
  Dlc (state, res) {
    state.dlc.push(res)
  },
  dlcAmount (state, res) {
    state.amount = res
  },
  dlcFollowNum (state, res) {
    state.follow_num = res
  },
  dlcTotalMoney (state, res) {
    state.total_money = res
  },
  dlc_clear (state) {
    state.dlc.splice(0, state.dlc.length)
  }
}

const actions = {
  getDlc ({ commit, state }, obj) {
    return new Promise((resolve, reject) => {
      commit('Dlc', obj.obj)
      resolve()
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
