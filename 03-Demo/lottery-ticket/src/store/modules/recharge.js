// 充值
// 提现

import * as types from '../types'
import api from '../../api/api'
import router from '@/router/index.js'

const state = {
  pay_url: '',
  chargeData: ''
}

const getters = {
  pay_url: state => state.pay_url
}

const mutations = {
  [types.CHARGE_URL] (state, res) {
    state.pay_url = res.res.pay_info
  },
  chargeData (state, res) {
    state.chargeData = res
  }
}

const actions = {
  userCharge ({ commit }, data) {
    // 访问支付地址
    api.charge(data)
      .then(res => {
      // 拿到返回信息中的支付地址，并直接跳转
        if (res.errno === '0') {
          // window.location.href = res.pay_info
          if (data.pay_type === 2) {
            window.location.href = res.pay_info
            setTimeout(() => {
              router.push({path: '/aliSuccess', 'query': {'trade_no': res.trade_no, 'service_type': data.service_type, 'order_lst': data.order_lst}})
            }, 2000)
          } else if (data.pay_type === 1) {
            window.location.href = res.pay_info
          } else if (data.pay_type === 4) {
            localStorage.setItem('qrCodeImg', res.pay_info)
            router.push({path: '/qrCode', 'query': {'trade_no': res.trade_no, 'service_type': data.service_type, 'order_lst': data.order_lst, 'total_amount': data.total_amount}})
          } else if (data.pay_type === 5) {
            router.push({path: '/aliSuccess', 'query': {'trade_no': res.trade_no, 'service_type': data.service_type, 'order_lst': data.order_lst}})
            setTimeout(() => {
              window.location.href = res.pay_info
            }, 500)
          }
        } else {
          console.log(res.errmsg)
        }
      }).catch(err => console.log(err))
  },
  weixinCharge ({ commit }, data) {
    // 访问支付地址
    api.charge(data)
      .then(res => {
      // 拿到返回信息中的支付地址，并直接跳转
        commit(types.CHARGE_URL, res)
      }).catch(err => console.log(err))
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
