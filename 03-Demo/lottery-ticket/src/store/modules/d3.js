// 福彩3D投注

const state = {
  d3: [],
  user_id: [],
  lottery_alias: '3d',
  lottery_period: [],
  ante_info: [],
  ante_code: [],
  play_type: [],
  amount: 1,
  count: 0,
  total_money: 0,
  single_money: [],
  follow_num: 1
}

const getters = {
  d3_count: state => {
    let count_total = 0
    state.d3.forEach(function (value) {
      count_total += parseInt(value.count)
    })
    state.count = count_total
    return state.count
  },
  d3_total_money: state => {
    state.total_money = state.count * state.amount * state.follow_num * 2
    return state.total_money
  }
}

const mutations = {
  D3 (state, res) {
    state.d3.push(res)
  },
  d3Amount (state, res) {
    state.amount = res
  },
  d3FollowNum (state, res) {
    state.follow_num = res
  },
  d3TotalMoney (state, res) {
    state.total_money = res
  },
  d3_clear (state) {
    state.d3.splice(0, state.d3.length)
  }
}

const actions = {
  getD3 ({ commit, state }, obj) {
    return new Promise((resolve, reject) => {
      commit('D3', obj.obj)
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
