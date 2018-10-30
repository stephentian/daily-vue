
const state = {
  ssqData: [],
  periods: 30
}
const getters = {
  // periods: state => state.periods
}
const mutations = {
  trendPeriods (state, params) {
    state.periods = params
  }
}
const actions = {
  // getTrend ({ commit }, params) {
  //   api.trend({
  //     lottery_alias: params
  //   })
  //     .then(res => {
  //       commit('ssqData', res.data)
  //     })
  //     .catch(err => console.log(err))
  // }
}

export default {
  state,
  getters,
  mutations,
  actions
}
