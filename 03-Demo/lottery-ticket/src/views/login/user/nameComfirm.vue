<template>
  <div>
    <header class="m-top g-top-user box-shadow">
      <h2 class="m-top-title tal ml20"><i class="iconfont icon-arrow-left mr10" @click="backUser"></i><span>实名认证</span></h2>
    </header>
    <div class="header-top-space"></div>
    <section class="g-user-inputs">
      <p class="tac">提现前需先进行身份证信息验证</p>
      <div class="m-user-input">
        <label for="realname">真实姓名</label>
        <input v-model="certify_info.user_name" id="realname" name="realname" type="text" placeholder="需与身份证保持一致" value="" required="required">
      </div>
      <div class="m-user-input">
        <label for="cardid">身份证号</label>
        <input v-model="certify_info.id_card" id="cardid" name="cardid" type="text" placeholder="仅支持大陆第二代居民身份证" value="" required="required">
      </div>
      <div class="m-user-input mt15">
        <label for="mobile">手机号码</label>
        <input v-model="certify_info.phone_number" id="mobile" name="mobile" type="text" readonly value="" maxlength="11" required="required" pattern="[0-9]">
      </div>
      <div class="m-user-input">
        <label for="idcode">验证码</label>
        <input v-model="certify_info.code" id="idcode" name="idcode" type="text" placeholder="请填写6位验证码" maxlength="6" pattern="[0-9]">
        <button @click.prevent="send" :disabled="showTimer" class="getidcode" type="button">
          <span v-show="!showTimer">获取验证码</span>
          <span v-show="showTimer">{{ time_count }}s后重新发送</span>
        </button>
      </div>
      <h6 class="m-title-h6 mt15 tac">温馨提示<br>所有验证信息通过后均不可更改，请谨慎填写</h6>
    </section>
    <div class="footer-bottom-space"></div>
    <footer class="m-footer">
      <button @click="bandId" class="m-footer-btn bgColor" id="" type="button">提交</button>
    </footer>
    <bottom-tips ref="bTips"></bottom-tips>
  </div>
</template>
<script>
import bottomTips from '@/components/bottom-tips/bottomTips'
import api from '@/api/api'

export default {
  name: '',
  components: {
    bottomTips
  },
  data: () => ({
    certify_info: {
      user_id: localStorage.user_id,
      code: '',
      user_name: '',
      id_card: '',
      phone_number: JSON.parse(localStorage.user_info).phone_number
    },
    time_count: '',
    showTimer: false,
    timer: null
  }),
  methods: {
    backUser () {
      this.$router.push('/user')
    },
    send () {
      let count = 60
      if (!this.certify_info.phone_number || this.certify_info.phone_number.length !== 11) {
        this.$refs.bTips.bottompopTips('请输入正确的电话号码！')
      } else {
        this.$store.dispatch('codeSend', this.certify_info.phone_number)
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
    bandId () {
      if (!this.certify_info.code || !this.certify_info.user_name || !this.certify_info.id_card) {
        this.$refs.bTips.bottompopTips('输入不能为空！')
      } else {
        api.auth(this.certify_info)
          .then(res => {
            this.$refs.bTips.bottompopTips(res.errmsg)
            if (res.errno === '0') {
              this.$router.push('/user')
            }
          }).catch(err => console.log(err))
      }
    }
  }
}
</script>
<style lang="css">
.m-user-input .getidcode {
  font-size: 1rem;
}
</style>
