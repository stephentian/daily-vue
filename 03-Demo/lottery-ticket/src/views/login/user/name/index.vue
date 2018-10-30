<template>
  <div id="">
    <header class="m-top g-top-user box-shadow">
      <h2 class="m-top-title tal ml20"><i class="iconfont icon-arrow-left mr10" @click="backUser"></i><span>实名认证</span></h2>
    </header>
    <div class="header-top-space"></div>
    <section class="g-user-inputs">
      <p class="tac">提现前需先进行身份证信息验证</p>
      <div class="m-user-input">
        <label for="realname">真实姓名</label>
        <input v-model="user_name" name="realname" type="text" readonly value="" required="required">
      </div>
      <div class="m-user-input">
        <label for="cardid">身份证号</label>
        <input v-model="user_id" name="cardid" type="text" readonly value="" required="required">
      </div>
    </section>
    <div class="footer-bottom-space"></div>
  </div>
</template>

<script>
export default {
  name: '',
  data: () => ({
    user_name: JSON.parse(localStorage.user_info).real_name,
    user_id: JSON.parse(localStorage.user_info).id_card
  }),
  methods: {
    backUser () {
      this.$router.push('/user')
    }
  }
}
</script>
<style lang="css">
.m-user-input .getidcode {
  font-size: 1rem;
}
</style>
