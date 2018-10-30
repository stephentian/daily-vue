
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const state = {
  tabValue: '行程',
  BMAP_STATUS_SUCCESS: 0
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
