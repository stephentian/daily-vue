<template lang="html">
  <div class="">
    <header class="m-top g-top-user box-shadow">
      <h2 class="m-top-title tac ml20"><i class="iconfont icon-arrow-left mr10" @click="back"></i><span>注册</span></h2>
    </header>
    <div class="header-top-space"></div>
    <section class="m-middle g-middle-register">
      <div class="m-middle-input mt25">
        <input v-model="user.phone_number" id="mobile" name="mobile" type="text" placeholder="请输入手机号" value="" maxlength="11" required="required" pattern="[0-9]">
      </div>
      <div class="m-middle-input mt25">
        <input v-model="user.code" id="idcode" name="idcode" type="text" placeholder="请填写验证码" maxlength="6" pattern="[0-9]">
        <button @click.prevent="send" :disabled="showTimer" class="getidcode" id="smdSend" type="button">
          <span v-show="!showTimer">获取验证码</span>
          <span v-show="showTimer">{{ time_count }}s后重新发送</span>
        </button>
      </div>
      <div class="m-middle-input mt25">
        <input v-model="user.password" id="password" name="password" type="password" placeholder="请输入密码" onkeyup="this.value=this.value.replace(/[^\w\.\/]/ig,'')" maxlength="20">
      </div>
      <button class="m-middle-button mt30" id="" type="button" @click.prevent="register">注册</button>
      <p class="m-title-h5 mt15 tac" style="font-size: 1rem;"><i class="iconfont icon-checkbox-checked mr5"></i>已阅读并同意 <router-link class="red" :to="{ name: 'agreement' }">《多多中彩票委托投注协议》</router-link></p>
      <to-load v-show="loadShow"></to-load>
    </section>
  </div>
</template>

<script>
import api from '@/api/api'
import axios from 'axios'
import toLoad from '@/components/to-load/index'

// function urlParse (urlString) {
//   let url = urlString
//   let obj = {}
//   let reg = /[?&][^?&]+=[^?&]+/g
//   let arr = url.match(reg)
//   if (arr) {
//     arr.forEach((item) => {
//       let tempArr = item.substring(1).split('=')
//       let key = decodeURIComponent(tempArr[0])
//       let value = decodeURIComponent(tempArr[1])
//       obj[key] = value
//     })
//   }
//   return obj
// }

export default {
  data: () => ({
    user: {
      phone_number: '',
      code: '',
      password: '',
      channel: localStorage.channel_info ? localStorage.channel_info : '100001', // 渠道号，区分由 哪个链接进入
      platform: localStorage.platform1 ? localStorage.platform1 : 1 // 登录平台
    },
    check_word: '',
    time_count: '',
    showTimer: false,
    timer: null,
    clientHeight: 0,
    loadShow: true
  }),
  components: {
    toLoad
  },
  mounted () {
    let that = this
    const clientHeight = `${document.documentElement.clientHeight}`
    window.onresize = function temp () {
      let clientHeight1 = `${document.documentElement.clientHeight}`
      if (Number(clientHeight1) < Number(clientHeight)) {
        that.loadShow = false
      } else {
        that.loadShow = true
      }
    }
    window.addEventListener('orientationchange', function () {
      if (window.orientation !== 0) {
        that.loadShow = false
      } else {
        that.loadShow = true
      }
    }, false)
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    send () {
      let count = 60
      if (this.user.phone_number.length !== 11) {
        this.$notify({
          type: 'warning',
          message: '请输入正确号码！',
          duration: 1000,
          position: 'bottom-right',
          showClose: false
        })
      } else {
        this.$store.dispatch('codeSend', this.user.phone_number)
        if (!this.timer) {
          this.time_count = count
          this.showTimer = true
          this.timer = setInterval(() => {
            if (this.time_count > 0 && this.time_count <= 60) {
              this.time_count--
            } else {
              this.showTimer = false
              clearInterval(this.timer)
              this.timer = null
            }
          }, 1000)
        }
      }
    },
    register () {
      if (!this.user.phone_number || !this.user.code || !this.user.password) {
        this.$notify({
          type: 'warning',
          message: '输入不能为空！',
          duration: 1000,
          position: 'bottom-right',
          showClose: false
        })
      } else {
        api.register(this.user)
          .then(res => {
            if (res.errno === '0') {
              this.$notify({
                type: 'success',
                message: res.errmsg,
                duration: 1000,
                position: 'bottom-right',
                showClose: false
              })
              localStorage.setItem('token', res.data.token)
              localStorage.setItem('user_id', res.data.user_id)
              axios.defaults.headers.common['x-cdd-jwt'] = res.data.token
              this.$store.dispatch('getUserInfo', {'user_id': res.data.user_id})
                .then(this.$router.push('/my'))
            }
          }).catch(err => console.log(err))
      }
    }
  }
}
</script>

<style lang="css" scoped>
.getidcode {
  font-size: 1rem;
}
.g-middle-login, .g-middle-register, .g-middle-forget {
  -webkit-transform: translate(-50%,0);
  -moz-transform: translate(-50%,0);
  transform: translate(-50%,0);
}
.m-middle {
  top: 5rem;
}
</style>
