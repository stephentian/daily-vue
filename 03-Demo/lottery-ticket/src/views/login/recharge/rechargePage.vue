<template>
  <div>
  </div>
</template>
<script>
import { android } from '@/api/app'

// 去掉等号后面的
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

export default {
  name: '',
  data: () => ({

  }),
  methods: {
    readyPay () {
      let _this = this
      setTimeout(function () {
        _this.isWeChat()
      }, 200)
    },
    sendAndroid (status) {
      try {
        android.callAndroid(status)
      } catch (e) {
        console.log('出现错误, 如果在非android环境下访问, 出现该警告是正常的.')
      }
    },
    sendIos (status) {
      try {
        window.webkit.messageHandlers.weixinRechargeResult.postMessage(status)
      } catch (e) {
        console.log('非ios环境')
      }
    },
    isWeChat () {
      if (typeof WeixinJSBridge === 'undefined') {
        // alert('请在微信客户端进行支付操作','')
        if (document.addEventListener) {
          document.addEventListener('WeixinJSBridgeReady', this.jsApiCall, false)
        } else if (document.attachEvent) {
          document.attachEvent('WeixinJSBridgeReady', this.jsApiCall)
          document.attachEvent('onWeixinJSBridgeReady', this.jsApiCall)
        }
      } else {
        this.jsApiCall()
      }
    },
    jsApiCall () {
      let urlInfo = urlParse(document.location.href)
      let payInfo = JSON.parse(urlInfo.pay_info)
      let that = this
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest', {
          'appId': payInfo.appId, // 公众号名称，由商户传入
          'timeStamp': payInfo.timeStamp, // 时间戳，自1970 年以来的秒数
          'nonceStr': payInfo.nonceStr, // 随机串
          'package': payInfo.package,
          'signType': payInfo.signType, // 微信签名方式:
          'paySign': payInfo.paySign // 微信签名,
        }, function (res) {
          if (res.err_msg === 'get_brand_wcpay_request:ok') {
            // 此处可以使用此方式判断前端返回,微信团队郑重提示:res.err_msg 将在用户支付成功后返回ok，但并不保证它绝对可靠。
            document.location.href = payInfo.callback_url
          } else {
            that.sendIos(0)
            that.sendAndroid(0)
            for (let i in res) {
              alert(res[i])
            }
            window.top.location.href = 'https://m.duoduocp.cn/my'
          }
        }
      )
    }
  },
  mounted () {
    this.readyPay()
  }
}
</script>
