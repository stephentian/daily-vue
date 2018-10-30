<template lang="html">
  <div class="">
    <header class="m-top g-top-user box-shadow">
      <h2 class="m-top-title tac ml20"><i class="iconfont icon-arrow-left mr10"  @click="back"></i><span>登录</span></h2>
    </header>
    <div class="header-top-space"></div>
    <section class="g-tab">
      <div class="m-tab">
        <a class="zhdl tac active" href="javascript:;">账号登录</a>
        <router-link :to="{ name: 'fastLogin'}" class="kjdl tac">快捷登录</router-link>
      </div>
    </section>
    <section class="m-middle g-middle-login">
      <div class="m-middle-input mt25">
        <input v-model="user.login_phone_num" id="mobile" name="mobile" type="text" placeholder="请输入手机号" value="" maxlength="11" required="required" pattern="[0-9]">
      </div>
      <div class="m-middle-input mt25">
        <input v-model="user.login_password" name="password" type="password" placeholder="请输入密码" maxlength="20" @keyup.13="entry()">
      </div>
      <button @click="entry" class="m-middle-button mt30" type="button">登录</button>
      <p class="m-title-h5 mt15 tac">忘记密码请使用右侧快捷登录</p>
      <p class="m-title-h5 mt15 tac">未注册手机请先注册
        <router-link :to="{ name: 'register'}" class="red tdl">去注册>>></router-link>
      </p>
      <to-load v-show="loadShow"></to-load>
    </section>
    <bottom-tips ref="bTips"></bottom-tips>

  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import api from '@/api/api'
import axios from 'axios'
import bottomTips from '@/components/bottom-tips/bottomTips'
import toLoad from '@/components/to-load/index'

export default {
  name: '',
  components: {
    bottomTips,
    toLoad
  },
  data: () => ({
    user: {
      login_phone_num: '',
      login_password: '',
      login_type: 'password',
      platform: 1
    },
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
    ...mapMutations([
      'types.GET_USER_INFO'
    ]),
    back () {
      this.$router.go(-1)
    },
    entry () {
      if (!this.user.login_phone_num || !this.user.login_password) {
        this.$refs.bTips.bottompopTips('输入不能为空！')
      } else if (this.user.login_phone_num.length !== 11) {
        this.$refs.bTips.bottompopTips('请输入正确号码！')
      } else {
        api.login(this.user).then(res => {
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
        })
      }
    }
  }
}
</script>

<style lang="css" scoped>
.g-middle-login, .g-middle-register, .g-middle-forget {
  -webkit-transform: translate(-50%,0);
  -moz-transform: translate(-50%,0);
  transform: translate(-50%,0);
}
.m-middle {
  top: 10rem;
}

</style>
