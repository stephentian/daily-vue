// 江西快3投注

const state = {
  jxk3: [],
  user_id: [],
  lottery_alias: 'JXK3',
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
  jxk3_count: state => {
    let count_total = 0
    state.jxk3.forEach(function (value) {
      count_total += parseInt(value.count)
    })
    state.count = count_total
    return state.count
  },
  jxk3_total_money: state => {
    state.total_money = state.betadd * state.count * state.amount * state.follow_num * 2
    return state.total_money
  }
}

const mutations = {
  Jxk3 (state, res) {
    state.jxk3.push(res)
  },
  jxk3Amount (state, res) {
    state.amount = res
  },
  jxk3FollowNum (state, res) {
    state.follow_num = res
  },
  jxk3TotalMoney (state, res) {
    state.total_money = res
  },
  jxk3_clear (state) {
    state.jxk3.splice(0, state.jxk3.length)
  }
}

const actions = {
  getJxk3 ({ commit, state }, obj) {
    return new Promise((resolve, reject) => {
      commit('Jxk3', obj.obj)
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
