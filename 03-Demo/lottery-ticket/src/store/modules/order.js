// 投注接口
import * as types from '../types'
import api from '../../api/api'

const state = {
  order: []
}

const getters = {
  order: state => state.order
}

const mutations = {
  [types.GET_Order] (state, res) {
    state.order = res
  }
}
const actions = {
  getOrder ({ commit }) {
    api.order()
      .then(res => {
        commit(types.GET_Order, res)
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
