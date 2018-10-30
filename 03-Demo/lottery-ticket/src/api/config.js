import axios from 'axios'
// 引入数据处理库 Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
import qs from 'qs'
import store from '../store'
import router from '../router'
import { Notification } from 'element-ui'

// axios 全局默认配置
// 设置超时时间（随意）
// axios.defaults.timeout = 3000;
// 接口地址
// 接口地址放在 config/index 里，解决跨域问题
// axios.defaults.baseURL = '/api'
// 设置请求头内容类型
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.headers.common['x-cdd-jwt'] = window.localStorage.token ? window.localStorage.token : ''

// 请求拦截器
axios.interceptors.request.use((config) => {
  // 发送请求前进行的操作

  // 将传入参数序列化
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  // if (store.state.token) {
  // 如果 token 存在，则每个 http header 都加上 token
  // 有些地址要 token，有些不用
  //   config.header.Authrization = `token ${store.state.token}`
  // }
  return config
}, (error) => {
  // 请求错误后的操作
  Notification({
    type: 'warning',
    message: `请求出错:${error}`,
    duration: 3000,
    position: 'bottom-right',
    showClose: false
  })
  return Promise.reject(error)
})

let baseApiUrl
let noIntercept
if (process.env.NODE_ENV === 'development') {
  // 开发环境
  baseApiUrl = 'https://clientsrv.wangzheka.cn/v1'
  noIntercept = ['https://cstatic.duoduocp.cn/cdd/config/win_cfg.json', 'https://cstatic.duoduocp.cn/cdd/config/win_cfg_h5.json']
} else {
  // 编译环境
  if (process.env.HOST === 'pro') {
    // 正式环境
    baseApiUrl = 'https://clientsrv.duoduocp.cn/v1'
    noIntercept = ['https://cstatic.duoduocp.cn/cdd/config/win_cfg.json', 'https://cstatic.duoduocp.cn/cdd/config/win_cfg_h5.json']
  } else {
    // 测试环境
    baseApiUrl = 'https://clientsrv.wangzheka.cn/v1'
    noIntercept = ['https://cstatic.duoduocp.cn/cdd/config/win_cfg.json', 'https://cstatic.duoduocp.cn/cdd/config/win_cfg_h5.json']
  }
}

// 响应拦截器
axios.interceptors.response.use((res) => {
  // let noIntercept=['https://cstatic.duoduocp.cn/cdd/config/win_cfg.json']

  // 如果请求errno不等于0，则弹出错误原因
  // 正式环境
  // if(res.config.url !== 'https://clientsrv.duoduocp.cn/v1/client/lottery/period_info' && noIntercept.indexOf(res.config.url) === -1) {
  //   if (Number(res.data.errno) !== 0 && Number(res.data.errno) !== 1001) {
  //     console.log(`${res.config.url}报${res.data.errmsg} 错误,errno不为0`);
  //     Notification({
  //       type: 'warning',
  //       message: `${res.data.errmsg},${res.data.errno}`,
  //       duration: 3000,
  //       position: 'bottom-right',
  //       showClose: false
  //     })
  //   }
  // }

  // 测试环境
  if (res.config.url !== baseApiUrl + '/client/lottery/period_info' && noIntercept.indexOf(res.config.url) === -1) {
    if (Number(res.data.errno) !== 0 && Number(res.data.errno) !== 1001) {
      console.log(`${res.config.url}报${res.data.errmsg}错误,errno不为0`)
      Notification({
        type: 'warning',
        message: `${res.data.errmsg},errno:${res.data.errno}`,
        duration: 3000,
        position: 'bottom-right',
        showClose: false
      })
    }
  }
  // 接收请求结束进行的操作
  return res
}, (error) => {
  // 首页获取用户中奖信息 不需要判断返回失败
  if (!error.response) {
    // Network Error 兼容uc浏览器
    if (error.indexOf('Network Error') !== -1 && navigator.userAgent.indexOf('UCBrower') !== -1) {
      return false
    } else {
      Notification({
        type: 'warning',
        message: '抱歉，后端接口响应失败，请重试',
        duration: 3000,
        position: 'bottom-right',
        showClose: false
      })
    }
  } else {
    if (error.response.config.url.includes('bonus_pop')) {
      return false
    }
    switch (error.response.status) {
      case 401:
        // Notification.error({message: '登录信息过期，请重新登录！', duration: 1000, position: 'bottom-right', showClose: false})
        // 执行刷新，获取新 token
        // store.dispatch('newToken', {'user_id': localStorage.user_id});
        Notification({
          type: 'warning',
          message: '登录信息已过期，请重新登录',
          duration: 3000,
          position: 'bottom-right',
          showClose: false
        })

        // 执行登出 ，清除 token
        store.dispatch('userLogout')
        router.replace({
          path: '/comLogin',
          query: { redirect: router.currentRoute.fullPath }
        })
        break
      case 403:
        Notification({
          type: 'warning',
          message: '您没有权限进行此操作403',
          duration: 3000,
          position: 'bottom-right',
          showClose: false
        })
        break
      case 404:
        Notification({
          type: 'warning',
          message: '该网址不存在，请检查网址是否正确',
          duration: 3000,
          position: 'bottom-right',
          showClose: false
        })
        break
      default:
        Notification({
          type: 'warning',
          message: `抱歉，后端返回未知错误:${error.response.status}`,
          duration: 3000,
          position: 'bottom-right',
          showClose: false
        })
        break
    }
  }
  return Promise.reject(error)
})

// 请求方法 Post和 Get
export default {
  askPost: function (url, params) {
    return new Promise((resolve, reject) => {
      axios.post(url, params)
        .then(response => {
          resolve(response.data)
        }, err => {
          reject(err)
        })
        .catch((error) => {
          Notification({
            type: 'warning',
            message: `Post请求出错:${error}`,
            duration: 3000,
            position: 'bottom-right',
            showClose: true
          })
          reject(error)
        })
    })
  },
  askGet: function (url, params) {
    return new Promise((resolve, reject) => {
      axios.get(url, params)
        .then(response => {
          resolve(response.data)
        }, err => {
          reject(err)
        })
        .catch((error) => {
          Notification({
            type: 'warning',
            message: `Get请求出错:${error}`,
            duration: 3000,
            position: 'bottom-right',
            showClose: true
          })
          reject(error)
        })
    })
  }
}
