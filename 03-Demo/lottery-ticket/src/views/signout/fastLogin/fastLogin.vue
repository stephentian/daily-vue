<template lang="html">
  <div class="">
    <header class="m-top g-top-user box-shadow">
      <h2 class="m-top-title tac ml20"><i class="iconfont icon-arrow-left mr10" @click="back"></i><span>登录</span></h2>
    </header>
    <div class="header-top-space"></div>
    <section class="g-tab">
      <div class="m-tab">
        <router-link :to="{ name: 'comLogin'}" class="zhdl tac">账号登录</router-link>
        <a class="kjdl tac active" href="javascript:;">快捷登录</a>
      </div>
    </section>
    <section class="m-middle g-middle-login">
      <div class="m-middle-input mb25">
        <label class="tac" for="mobile">+86</label>
        <input v-model="phone_user.login_phone_num" id="mobile" name="mobile" type="text" placeholder="请输入手机号" value="" maxlength="11" required="required" pattern="[0-9]">
      </div>
      <div class="m-middle-input mb25">
        <input v-model="phone_user.code" name="idcode" type="text" placeholder="" maxlength="6" pattern="[0-9]">
        <button @click.prevent="send" :disabled="showTimer" class="getidcode" type="button">
          <span v-show="!showTimer">获取验证码</span>
          <span v-show="showTimer">{{ time_count }}s后重新发送</span>
        </button>
      </div>
      <button @click="entry" class="m-middle-button" type="button">登录</button>
      <p class="m-title-h5 mt15 tac">未注册手机请先注册
        <router-link :to="{ name: 'register'}" class="red tdl">去注册</router-link>
      </p>
      <toLoad v-show="loadShow"></toLoad>
    </section>
    <bottom-tips ref="bTips"></bottom-tips>
  </div>
</template>

<script>
import api from '@/api/api'
import axios from 'axios'
import bottomTips from '@/components/bottom-tips/bottomTips'
import toLoad from '@/components/to-load/index'

export default {
  components: {
    bottomTips,
    toLoad
  },
  data: () => ({
    phone_user: {
      login_phone_num: '',
      code: '',
      login_type: '2',
      channel: localStorage.channel_info ? localStorage.channel_info : '100001', // 渠道号，区分由 哪个链接进入
      platform: localStorage.platform1 ? localStorage.platform1 : 1 // 登录平台
    },
    time_count: '',
    showTimer: false,
    timer: null,
    clientHeight: 0,
    loadShow: true
  }),
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
      if (this.phone_user.login_phone_num.length !== 11) {
        this.$refs.bTips.bottompopTips('请输入正确的电话号码！')
      } else {
        this.$store.dispatch('codeSend', this.phone_user.login_phone_num)
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
    entry () {
      if (!this.phone_user.login_phone_num || !this.phone_user.code) {
        this.$refs.bTips.bottompopTips('输入不能为空！')
      } else {
        api.login(this.phone_user)
          .then(res => {
            if (res.errno === '0') {
              localStorage.setItem('token', res.data.token)
              localStorage.setItem('user_id', res.data.user_id)
              axios.defaults.headers.common['x-cdd-jwt'] = res.data.token

              this.$store.dispatch('getUserInfo', {'user_id': res.data.user_id}).then(() => {
                let loginFromPath = this.$store.state.common.loginFromPath
                let lotteryAlias = ['/ssq', '/dlt', '/3d', '/JXK3', '/dlc', '/jczq']
                if (lotteryAlias.indexOf(loginFromPath) > -1) {
                  this.$router.push(loginFromPath)
                } else {
                  this.$router.push('/my')
                }
              })
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
  top: 13rem;
}

</style>
