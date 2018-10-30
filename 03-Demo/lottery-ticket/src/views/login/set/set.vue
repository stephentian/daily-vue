<template lang="html">
  <div>
    <header class="m-top g-top-user box-shadow">
      <h2 class="m-top-title tal ml20"><i class="iconfont icon-arrow-left mr10" @click="back"></i><span>设置</span></h2>
    </header>
    <div class="header-top-space"></div>
    <section class="g-user-list">
      <router-link tag="aside" class="m-user-list mt15" :to="{ name: 'change'}">
        <span>修改登录密码</span>
        <i class="arrow iconfont icon-arrow-right"></i>
      </router-link>
      <router-link tag="aside" class="m-user-list mt15" :to="{ name: 'about'}">
        <span>关于</span>
        <i class="arrow iconfont icon-arrow-right"></i>
      </router-link>
      <router-link tag="aside" class="m-user-list mt15" :to="{ name: 'help'}">
        <span>帮助中心</span>
        <i class="arrow iconfont icon-arrow-right"></i>
      </router-link>
    </section>
    <div class="footer-bottom-space"></div>
    <footer class="m-footer">
      <button @click.prevent="logout" class="m-footer-btn bgColor" id="" type="button">退出登录</button>
    </footer>
  </div>
</template>

<script>
export default {
  name: '',
  methods: {
    back () {
      this.$router.go(-1)
    },
    logout () {
      this.$store.dispatch('userLogout')
      this.$router.push('/home')
    }
  }
}
</script>
