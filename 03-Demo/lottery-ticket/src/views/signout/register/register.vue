<template lang="html">
  <div class="g-comRegister">
    <header class="m-top g-top-user box-shadow">
      <h2 class="m-top-title tac ml20"><i class="iconfont icon-arrow-left mr10"  @click="back"></i><span>{{reginster?'找回密码':'注册'}}</span></h2>
    </header>
    <div class="header-top-space"></div>
    <section class="m-com-div">
      <div class="m-login-input layoutFlex">
        <input v-model="user.phone_number" id="mobile" name="mobile" type="text" placeholder="绑定的手机号码" value="" maxlength="11" required="required" pattern="[0-9]">
      </div>
      <div class="m-login-input layoutFlex">
        <input v-model="user.code" name="verify" type="text" placeholder="请输入验证码" maxlength="20">
        <!-- <span class="getVerify tar" >
          获取验证码
        </span> -->
        <div class="getVerify tar">
          <span v-show="!showTimer" @click.prevent="send">获取验证码</span>
          <span v-show="showTimer">{{ time_count }}s后重新发送</span>
        </div>
      </div>
      <div class="m-login-input layoutFlex">
        <input v-model="password1" name="password2" :type="eyeList['0']?'password':'text'" placeholder="请输入您的新密码6-15个字符" value="" maxlength="11" required="required" pattern="[0-9]">
        <span class="eye" @click="eyeClick(0)">
          <img :src="eyeList['0']?'../../../../static/images/eyeClose.png':'../../../../static/images/eyeOpen.png'" alt="">
        </span>
      </div>
      <div class="m-login-input layoutFlex">
        <input v-model="password2" name="password3" :type="eyeList['1']?'password':'text'" placeholder="请再次输入您的新密码6-15个字符" value="" maxlength="11" required="required" pattern="[0-9]">
        <span class="eye" @click="eyeClick(1)">
          <img :src="eyeList['1']?'../../../../static/images/eyeClose.png':'../../../../static/images/eyeOpen.png'" alt="">
        </span>
      </div>
      <div class="m-comlogin-btn bgColor tac" @click="registerBtn">
        {{reginster?'完成':'注册'}}
      </div>
      <div v-if="!reginster">
        <p class="m-title-h5 mt15 tac" style="font-size: 1rem;"><i class="iconfont icon-checkbox-checked mr5"></i>已阅读并同意 <router-link class="red" :to="{ name: 'agreement' }">《多多中彩票委托投注协议》</router-link></p>
      </div>
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
      phone_number: '',
      code: '',
      password: '',
      channel: localStorage.channel_info ? localStorage.channel_info : '100001', // 渠道号，区分由 哪个链接进入
      platform: localStorage.platform1 ? localStorage.platform1 : 1 // 登录平台
    },
    reginster: true,
    loadShow: true,
    eyeList: {
      '0': false,
      '1': false
    },
    password1: '',
    password2: '',
    showTimer: false,
    time_count: ''
  }),
  created () {
    this.reginster = this.$route.query.retrieve === 'true'
  },
  mounted () {
    // let that = this
    // const clientHeight = `${document.documentElement.clientHeight}`
    // window.onresize = function temp () {
    //   let clientHeight1 = `${document.documentElement.clientHeight}`
    //   if (Number(clientHeight1) < Number(clientHeight)) {
    //     that.loadShow = false
    //   } else {
    //     that.loadShow = true
    //   }
    // }
    // window.addEventListener('orientationchange', function () {
    //   if (window.orientation !== 0) {
    //     that.loadShow = false
    //   } else {
    //     that.loadShow = true
    //   }
    // }, false)
  },
  methods: {
    ...mapMutations([
      'types.GET_USER_INFO'
    ]),
    back () {
      this.$router.go(-1)
    },
    eyeClick (s) {
      let i = !this.eyeList[s]
      this.$set(this.eyeList, s, i)
    },
    send () {
      if (this.user.phone_number.length !== 11) {
        this.$notify({
          type: 'warning',
          message: '请输入正确号码！',
          duration: 1000,
          position: 'bottom-right',
          showClose: false
        })
      } else {
        let o = {
          'phone_number': this.user.phone_number,
          'source': 'qipai'
        }
        api.checkRegister(o)
          .then(res => {
            // 该用户已经注册
            if (this.reginster) {
              if (res.data.status === '0') {
                this.$refs.bTips.bottompopTips('该用户还未注册')
              } else {
                this.countDown()
              }
            } else {
              if (res.data.status === '1') {
                this.$refs.bTips.bottompopTips('该用户已经注册')
              } else {
                this.countDown()
              }
            }
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    countDown () {
      let count = 60
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
    },
    registerBtn () {
      if (!this.checkEmpty()) { return false }
      if (!this.reginster) {
        // 注册
        this.user.password = this.password1
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
          }).catch((error) => {
            console.log(error)
          })
      } else {
        // 找回密码
        let phone_user = {
          login_phone_num: this.user.phone_number,
          code: this.user.code,
          login_type: '2',
          channel: localStorage.channel_info ? localStorage.channel_info : '100001', // 渠道号，区分由 哪个链接进入
          platform: localStorage.platform1 ? localStorage.platform1 : 1 // 登录平台
        }
        // 调用快速登陆接口 获取userid 在更换密码
        api.login(phone_user).then(res => {
          if (res.errno === '0') {
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('user_id', res.data.user_id)
            axios.defaults.headers.common['x-cdd-jwt'] = res.data.token

            let change_info = {
              phone_number: this.user.phone_number,
              new_password: this.password1,
              user_id: res.data.user_id
            }
            if (!this.checkEmpty()) { return false }
            api.update(change_info)
              .then(res => {
                if (res.errno === '0') {
                  this.$refs.bTips.bottompopTips(res.errmsg)
                  this.intervalId = setTimeout(() => {
                    this.$router.push('/my')
                  }, 2000)
                } else {
                  this.$refs.bTips.bottompopTips(res.errmsg)
                }
              }).catch(err => console(err))
          }
        })
      }
    },
    checkEmpty () {
      if (!this.user.phone_number || !this.user.code || !this.password1 || !this.password2) {
        this.$refs.bTips.bottompopTips('输入不能为空！')
        return false
      } else if (this.password1 !== this.password2) {
        this.$refs.bTips.bottompopTips('两次密码不相等')
        return false
      } else if (this.password1.length < 6) {
        this.$refs.bTips.bottompopTips('密码长度不能小于6位数')
        return false
      }
      return true
    }
  }
}
</script>

<style lang="scss" scoped>
.g-comRegister{
  position: absolute;
  width:100%;
  height: 100%;
  background:#fff;
  font-size: 1.33rem;
  .m-com-div{
    width: 82%;
    .m-login-input{
      height: 3.6rem;
      margin-top: 1.4rem;
      line-height: 3.6rem;
      .eye{
        border-bottom: 1px solid #E1E1E1;
      }
      input{
        flex:12;
        border-bottom: 1px solid #E1E1E1;
        -webkit-box-shadow: 0 0 0px 1000px white inset !important;
        background-color: rgb(0, 0, 0) !important;
        background-image: none !important;
        color: rgb(0, 0, 0) !important;
        -webkit-tap-highlight-color:rgba(0,0,0,0) !important;
      }
      span{
        flex:1;
        img{
          width: 100%;
          margin-top: -0.5rem;
        }
      }
      .getVerify{
        flex: 7;
        font-size: 1.33rem;
        color: #F12C2C;
        border-bottom: 1px solid #E1E1E1;
      }
    }
    .m-comlogin-btn{
      border-radius: 2rem;
      height: 3rem;
      color:#fff;
      line-height: 3rem;
      font-size: 1.33rem;
      // background: #F12B2C;
      margin-top: 3rem;
    }
    .m-comlogin-fast-login{
      margin-top: 3rem;
      justify-content: space-between;
      font-size:1.08rem;
      color:rgba(142,142,142,1);
    }
  }
}
</style>
