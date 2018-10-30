// 双色球投注

const state = {
  // 投注单里展示的每一单双色球（lottery_alias，lottery_period，play_type玩法，ante_code投注号，投注说明，count注数，single_money积分）
  ssq: [], //
  // 普通投注单（加上投注说明）
  ssq_com: [],
  // 胆拖投注单（加上投注说明）
  ssq_dt: [],
  user_id: [],
  lottery_alias: 'ssq',
  lottery_period: [],
  // 投注号（拼装普通\复式投注和胆拖投注）
  ante_info: [], // 投注说明
  ante_code: [],
  // 玩法
  play_type: [],
  amount: 1,
  count: 0,
  total_money: 0,
  single_money: [],
  follow_num: 1
}

const getters = {
  ssq_com: state => {
    return state.ssq.filter(obj => obj.play_type === '101' || obj.play_type === '102')
  },
  ssq_dt: state => {
    return state.ssq.filter(obj => obj.play_type === '103')
  },
  ssq_count: state => {
    let count_total = 0
    state.ssq.forEach(function (value) {
      count_total += parseInt(value.count)
    })
    state.count = count_total
    return state.count
  },
  ssq_total_money: state => {
    state.total_money = state.count * state.amount * state.follow_num * 2
    return state.total_money
  }
}

const mutations = {
  Ssq (state, res) {
    state.ssq.push(res)
  },
  ssqAmount (state, res) {
    state.amount = res
  },
  ssqFollowNum (state, res) {
    state.follow_num = res
  },
  ssqTotalMoney (state, res) {
    state.total_money = res
  },
  ssq_clear (state) {
    state.ssq.splice(0, state.ssq.length)
  }
}

const actions = {
  getSsq ({ commit, state }, obj) {
    return new Promise((resolve, reject) => {
      commit('Ssq', obj.obj)
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
