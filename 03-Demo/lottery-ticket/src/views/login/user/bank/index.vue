<template lang="html">
  <div class="">
    <header class="m-top g-top-user box-shadow">
      <h2 class="m-top-title tal ml20"><i class="iconfont icon-arrow-left mr10" @click="backUser"></i><span>我的银行卡</span></h2>
    </header>
    <div class="header-top-space"></div>
    <section class="g-bank-cards">
      <aside class="m-bank-card boc">
        <div class="m-card-name">
          <span class="ml5">{{ bank_name }}</span>
        </div>
        <h1 class="mt10 tac">**** **** **** {{ bank_id }}</h1>
      </aside>
    </section>
    <div class="footer-bottom-space"></div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      bank_name: JSON.parse(localStorage.user_info).bank_name,
      bank_id: JSON.parse(localStorage.user_info).bank_id
    }
  },
  methods: {
    backUser () {
      this.$router.push('/user')
    }
  }
}
</script>
