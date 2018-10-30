/**
* 用户注册，登录，注销
* 发送验证码
* 刷新 token
*/
import * as types from '../types'
import api from '../../api/api'
import axios from 'axios'
import { Notification } from 'element-ui'

const state = {
  token: null,
  get_code: '',
  send_time: null,
  send_code: false,
  isLogined: false,
  user_info: {
    user_id: '',
    nick_name: '',
    avatar_url: '',
    balance: 0, // 余额
    balance_freeze: 0,
    game_coin: 0,
    phone_number: '',
    real_name: null,
    bank_id: '',
    bank_name: ''
  },
  phone_user: {
    login_phone_num: '',
    code: '',
    login_type: '2',
    platform: 1 // h5 平台
  }
}

const getters = {
  sendCode: state => state.send_code,
  getCode: state => state.get_code,
  getTime: state => state.send_time,
  isLogined: state => state.isLogined
}

const mutations = {
  [types.USER_REG] (state, res) {
    localStorage.setItem('token', res)
    state.token = res
  },
  [types.USER_SIGNIN] (state, res) {
    localStorage.setItem('token', res)
    state.token = res
  },
  [types.GET_USER_ID] (state, res) {
    localStorage.setItem('user_id', res)
  },
  [types.LOGOUT] (state) {
    localStorage.removeItem('token')
    let iw = localStorage.getItem('iosWebview')
    let fo = localStorage.getItem('FirstOpen')
    let mf = localStorage.getItem('missFirstOpen')
    let tf = localStorage.getItem('TrendFirstOpen')

    localStorage.clear()
    localStorage.setItem('iosWebview', iw)
    localStorage.setItem('FirstOpen', fo)
    localStorage.setItem('missFirstOpen', mf)
    localStorage.setItem('TrendFirstOpen', tf)

    // if (String(localStorage.getItem('iosWebview')) === 'true') {
    //   localStorage.clear()
    //   localStorage.setItem('iosWebview', true)
    // } else {
    //   localStorage.clear()
    // }

    state.token = null
    state.isLogined = false
  },
  [types.IS_LOGINED] (state, status) {
    state.isLogined = status
  },
  [types.SAVE_CODE] (state, res) {
    state.get_code = res
  },
  [types.SEND_CODE] (state) {
    state.send_code = true
  },
  [types.SEND_CODE_TIME] (state, time) {
    state.send_time = time
  },
  [types.GET_USER_INFO] (state, res) {
    // 保存对象，让对象变成字符
    localStorage.setItem('user_info', JSON.stringify(res))
    state.user_info = res
  }
}

const actions = {
  userLogin ({ commit }, data) {
    api.login(data)
      .then(res => {
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('user_id', res.data.user_id)
        axios.defaults.headers.common['x-cdd-jwt'] = res.data.token ? res.data.token : ''
        if (res.errno === '0') {
          commit(types.USER_SIGNIN, res.data.token)
          commit(types.GET_USER_ID, res.data.user_id)
        }
      }).catch(err => console.log(err))
  },
  getUserInfo ({ commit }, user_id) {
    return api.userInfo(user_id)
      .then(res => {
        commit(types.GET_USER_INFO, res.data)
        commit(types.IS_LOGINED, true)
      })
      .catch(err => {
        console.log(err)
        commit(types.IS_LOGINED, false)
      })
  },
  userLogout ({ commit }) {
    commit(types.LOGOUT)
  },
  userRegister ({ commit }, user) {
    api.register(user)
      .then(res => {
        if (res.errno === '0') {
          commit(types.USER_REG, res.data.token)
        } else if (res.errno === '-1') {
          console.log(res.errmsg)
        } else {
          console.log(res)
        }
      }).catch(err => console.log(err))
  },
  codeSend ({ commit }, phone_number) {
    api.validate(phone_number)
      .then(res => {
        if (res.errno === '0') {
          commit(types.SAVE_CODE, res)
          Notification.success({message: res.errmsg, duration: 1000, position: 'bottom-right', showClose: false})
        }
      }).catch(err => console.log(err))
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
