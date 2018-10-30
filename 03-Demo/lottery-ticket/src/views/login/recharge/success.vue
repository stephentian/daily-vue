<template lang="html">
  <div>
    <header class="m-top g-top-user box-shadow">
      <h2 class="m-top-title tal ml20"><i @click="backMy" class="iconfont icon-arrow-left mr10"></i><span>{{service_type ? '充值详情' : '支付详情'}}</span></h2>
    </header>
    <div class="header-top-space"></div>
    <section class="g-recharge-success" v-if="rechargeResult === 1">
      <div class="m-msg">
        <i class="iconfont icon-success"></i>
        <aside class="green ml15">
          <h3> {{service_type ? '充值成功' : '支付成功'}}</h3>
        </aside>
      </div>
    </section>
    <section class="g-recharge-fail" v-if="rechargeResult === 2">
      <div class="m-msg">
        <i class="iconfont icon-fail"></i>
        <aside class="red ml15">
          <h3> {{service_type ? '充值失败' : '支付失败'}}</h3>
        </aside>
      </div>
    </section>
    <div class="footer-bottom-space"></div>
    <footer class="m-footer">
      <button @click.prevent="backMy" class="m-footer-btn bgColor" id="" type="button">返回首页</button>
    </footer>
  </div>
</template>

<script>
import { android } from '@/api/app'
import api from '@/api/api'

function urlParse (urlString) {
  let url = urlString
  let obj = {}
  let reg = /[?&][^?&]+=[^?&]+/g
  let arr = url.match(reg)
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substring(1).split('=')
      let key = decodeURIComponent(tempArr[0])
      let value = decodeURIComponent(tempArr[1])
      obj[key] = value
    })
  }
  return obj
}

var backUrl
if (process.env.NODE_ENV === 'development') {
  // 开发环境
  backUrl = 'https://h5-client.wangzheka.cn//my'
} else {
  // 编译环境
  if (process.env.HOST === 'pro') {
    // 正式环境
    backUrl = 'https://m.duoduocp.cn/my'
  } else {
    // 测试环境
    backUrl = 'https://h5-client.wangzheka.cn//my'
  }
}

export default {
  name: '',
  data: () => ({
    rechargeResult: 0,
    service_type: true
  }),
  methods: {
    backMy () {
      // 测试版
      window.top.location.href = backUrl
      // 正式版
      // window.top.location.href = 'https://m.duoduocp.cn/my'
    },
    sendAndroid (status) {
      let order_info = urlParse(document.location.href)
      try {
        android.callAndroid(status, order_info.service_type, order_info.total_money, order_info.service_order_id, order_info.separate)
      } catch (e) {
        console.log('出现错误, 如果在非android环境下访问, 出现该警告是正常的.')
      }
    },
    sendIos (status) {
      let order_info = urlParse(document.location.href)
      try {
        window.webkit.messageHandlers.weixinRechargeResult.postMessage(status + ',' + order_info.service_type + ',' + order_info.total_money + ',' + order_info.service_order_id + ',' + order_info.separate)
      } catch (e) {
        console.log('非ios环境')
      }
    },
    getRecharge () {
      let order_info = urlParse(document.location.href)
      let order_id = order_info.order_id
      if (order_info.order_id) {
        api.chargeEnd({'order_id': order_id})
          .then(res => {
            if (Number(res.status) === 1) {
              this.rechargeResult = 1
              this.sendAndroid(res.status)
              this.sendIos(res.status)
              // document.querySelector('.g-recharge-fail h3').innerHTML = '1'
            } else {
              this.rechargeResult = 2
              this.sendAndroid(res.status)
              this.sendIos(res.status)
              // document.querySelector('.g-recharge-fail h3').innerHTML = '0'
            }
          })
          .catch(() => {
            // document.querySelector('.g-recharge-fail h3').innerHTML = 'error'
            this.rechargeResult = 2
            try {
              android.callAndroid('0', '2', '0', '0', '0')
            } catch (e) {
              console.log('出现错误, 如果在非android环境下访问, 出现该警告是正常的.')
            }
            try {
              window.webkit.messageHandlers.weixinRechargeResult.postMessage('0,2,0,0,0')
            } catch (e) {
              console.log('非ios环境')
            }
          })
      } else {
        this.rechargeResult = 2
        // document.querySelector('.g-recharge-fail h3').innerHTML = 'error1'
        try {
          android.callAndroid('0', '2', '0', '0', '0')
        } catch (e) {
          console.log('出现错误, 如果在非android环境下访问, 出现该警告是正常的.')
        }
        try {
          window.webkit.messageHandlers.weixinRechargeResult.postMessage('0,2,0,0,0')
        } catch (e) {
          console.log('非ios环境')
        }
      }
    }
  },
  created () {
    // do something after creating vue instance
    this.getRecharge()

    if (urlParse(document.location.href).service_type !== '1') {
      this.service_type = false
    }
  }
}
</script>

<style lang="css">
</style>
