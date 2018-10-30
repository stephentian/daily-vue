<template>
  <div id="red-packet">
    <!-- <header class="m-top">
      <h2 class="m-top-title tal ml20">
        <i class="iconfont icon-arrow-left mr10" @click="backHome"></i>
        <span>优惠券领取</span>
      </h2>
    </header> -->
    <div class="header-top-space"></div>
    <div class="content">
      <div class="sub-title">
      </div>
      <div class="sub-main">
        <p class="mid-title">恭喜你</p>
        <p class="mid-contet">获得 <span class="mid-account">1.99</span> 元购彩金额</p>
        <p class="mid-tips">领取后自动放入我的-优惠券</p>
        <p class="mid-tips">全彩种可用</p>
        <div class="mid-btn" @click="getCoupon">点击领取</div>
      </div>
      <p class="sub-tips">
        本活动最终解释权归多多中彩票平台所有
      </p>
    </div>

  </div>
</template>
<script>
import axios from 'axios'

export default {
  name: '',
  data: () => ({
    get_coupon_info: {
      user_id: '',
      activity_id: 1
    },
    token: ''
  }),
  methods: {
    backHome () {
      window.history.length > 2 ? this.$router.go(-1) : this.$router.push('/home')
    },
    getCookie (name) {
      name = name + '='
      let start = document.cookie.indexOf(name)
      let value = null
      if (start > -1) {
        let end = document.cookie.indexOf(';', start)
        if (end === -1) {
          end = document.cookie.length
        }
        value = document.cookie.substring(start + name.length, end)
      }
      return value
    },
    getCoupon () {
      axios.defaults.headers.common['x-cdd-jwt'] = localStorage.token ? localStorage.token : this.token
      this.$store.dispatch('getCouponValue', this.get_coupon_info)
    }
  },
  created () {
    // do something after creating vue instance
    this.get_coupon_info.user_id = localStorage.user_id ? localStorage.user_id : this.getCookie('user_id')
    this.token = this.getCookie('token')
  }
}
</script>
<style lang="css" scoped>

</style>
