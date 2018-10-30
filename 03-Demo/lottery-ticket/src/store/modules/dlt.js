// 大乐透投注

const state = {
  dlt: [],
  dlt_com: [],
  dlt_dt: [],
  user_id: [],
  lottery_alias: 'dlt',
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
  dlt_com: state => {
    return state.dlt.filter(obj => obj.play_type === '101' || obj.play_type === '102' || obj.play_type === '103' || obj.play_type === '104')
  },
  dlt_dt: state => {
    return state.dlt.filter(obj => obj.play_type === '106' || obj.play_type === '107')
  },
  dlt_count: state => {
    let count_total = 0
    state.dlt.forEach(function (value) {
      count_total += parseInt(value.count)
    })
    state.count = count_total
    return state.count
  },
  dlt_total_money: state => {
    state.total_money = state.betadd * state.count * state.amount * state.follow_num * 2
    return state.total_money
  }
}

const mutations = {
  Dlt (state, res) {
    state.dlt.push(res)
  },
  DltAdd (state, res) {
    for (let i = 0, len = state.dlt.length; i < len; i++) {
      if (state.dlt[i].play_type === '101') {
        state.dlt[i].play_type = '103'
        state.dlt[i].ante_info = '追加单式投注'
      } else if (state.dlt[i].play_type === '102') {
        state.dlt[i].play_type = '104'
        state.dlt[i].ante_info = '追加复式投注'
      } else if (state.dlt[i].play_type === '106') {
        state.dlt[i].play_type = '107'
        state.dlt[i].ante_info = '追加胆拖投注'
      }
      state.betadd = 1.5
      state.dlt[i].single_money_betadd = state.dlt[i].single_money * state.betadd
    }
  },
  DltRestore (state, res) {
    for (let i = 0, len = state.dlt.length; i < len; i++) {
      if (state.dlt[i].play_type === '103') {
        state.dlt[i].play_type = '101'
        state.dlt[i].ante_info = '基本单式投注'
      } else if (state.dlt[i].play_type === '104') {
        state.dlt[i].play_type = '102'
        state.dlt[i].ante_info = '基本复式投注'
      } else if (state.dlt[i].play_type === '107') {
        state.dlt[i].play_type = '106'
        state.dlt[i].ante_info = '基本胆拖投注'
      }
      state.betadd = 1
      state.dlt[i].single_money_betadd = state.dlt[i].single_money * state.betadd
    }
  },
  dltAmount (state, res) {
    state.amount = res
  },
  dltFollowNum (state, res) {
    state.follow_num = res
  },
  dltTotalMoney (state, res) {
    state.total_money = res
  },
  dlt_clear (state) {
    state.dlt.splice(0, state.dlt.length)
  }
}

const actions = {
  getDlt ({ commit, state }, obj) {
    return new Promise((resolve, reject) => {
      commit('Dlt', obj.obj)
      resolve()
    })
  },
  getDltBetAdd ({ commit, state }) {
    return new Promise((resolve, reject) => {
      commit('DltAdd')
      resolve()
    })
  },
  getDltBetRestore ({ commit, state }) {
    return new Promise((resolve, reject) => {
      commit('DltRestore')
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
