// 公用配置

import * as types from '../types'
import axios from 'axios'

const state = {
  loading: false,
  loginFromPath: '',
  floatData: {},
  payData: []
}

const getters = {
  loading: state => state.loading,
  floatData: state => state.floatData,
  payData: state => state.payData
}

const mutations = {
  [types.LOADING_STATUS] (state, status) {
    state.loading = status
  },
  [types.LOGIN_FROM_PATH] (state, path) {
    state.loginFromPath = path
  },
  FLOAT_DATA (state, status) {
    state.floatData = status
  },
  PAY_DATA (state, data) {
    state.payData = data
  }
}

const actions = {
  getFloatData ({ commit, state }, data) {
    let url = ''
    this.isIos = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    let isIosWebview = String(localStorage.getItem('iosWebview')) === 'true' || false
    if (isIosWebview) {
      url = 'https://cstatic.duoduocp.cn/cdd/config/win_cfg.json'
    } else {
      url = 'https://cstatic.duoduocp.cn/cdd/config/win_cfg_h5.json'
    }
    axios.get(url)
      .then(function (data) {
        let floatData = {}
        if (String(data.data.switch) === '1') {
          floatData.switch1 = true
        } else {
          floatData.switch1 = false
        }
        let u = localStorage.getItem('channel_info') ? localStorage.getItem('channel_info') : '100001'

        if (window.location.href.includes('m.duoduocp')) {
          floatData.targeturl = data.data.target_url + '?c=' + u
        } else {
          if (isIosWebview) {
            floatData.targeturl = 'https://h5-client.wangzheka.cn/p/coupon188/index.html'
          } else {
            floatData.targeturl = 'https://p.duoduocp.cn/lotteryspread1/index.html?c=100001'
          }
        }
        floatData.imgurl = data.data.img_url
        commit('FLOAT_DATA', floatData)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
