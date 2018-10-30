<template lang="html">
  <div class="">
    <header class="m-top g-top-user box-shadow">
      <h2 class="m-top-title tac ml20">
        <i class="iconfont icon-arrow-left mr10" @click="back"></i>
        <span>登录</span>
      </h2>
    </header>
    <div class="header-top-space"></div>
    <section class="m-middle g-middle-login">
      <h2 class="m-title-h2 tac">输入验证码</h2>
      <p class="m-title-h5 fn-wsn tac">短信已发送至 +86 {{ phone_number }}</p>
      <aside class="m-middle-idcode mt20">
        <input id="" name="" type="text" maxlength="1" required="required" pattern="[0-9]">
        <input id="" name="" type="text" maxlength="1" required="required" pattern="[0-9]">
        <input id="" name="" type="text" maxlength="1" required="required" pattern="[0-9]">
        <input id="" name="" type="text" maxlength="1" required="required" pattern="[0-9]">
        <input id="" name="" type="text" maxlength="1" required="required" pattern="[0-9]">
        <input id="" name="" type="text" maxlength="1" required="required" pattern="[0-9]">
      </aside>
      <p class="m-title-h5 mt15 tac"><span>50</span>s后可重新获取</p>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: () => ({
  }),
  computed: {
    ...mapState({
      phone_number: state => state.login.phoneUser.login_phone_num
    })
  },
  methods: {
    back () {
      this.$router.go(-1)
    }
  }
}
</script>
