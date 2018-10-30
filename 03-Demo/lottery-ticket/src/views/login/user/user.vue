<template lang="html">
  <div class="">
    <header class="m-top g-top-user box-shadow">
      <h2 class="m-top-title tal ml20"><i class="iconfont icon-arrow-left mr10" @click="backMy"></i><span>个人信息</span></h2>
    </header>
    <div class="header-top-space"></div>
    <section class="g-user-lists">
      <aside class="m-user-list avatar">
        <span>头像</span>
        <i class="ico-big avatar mr25 "></i>
      </aside>
      <aside class="m-user-list">
        <span>昵称</span>
        <em class="mr25 fr gray3">{{ this.userInfo.nick_name }}</em>
      </aside>
      <router-link v-if="!this.real_name" tag="aside" :to="{ name: 'nameComfirm'}" class="m-user-list">
        <span>实名认证</span>
        <em class="mr25 fr red">未认证</em>
        <i class="arrow iconfont icon-arrow-right"></i>
      </router-link>
      <router-link v-else class="m-user-list" tag="aside" :to="{ name: 'userName'}">
        <span>实名认证</span>
        <em class="mr25 fr gray3">已认证</em>
        <i class="arrow iconfont icon-arrow-right"></i>
      </router-link>
      <router-link v-if="!this.real_name" tag="aside" :to="{ name: 'nameComfirm'}" class="m-user-list">
        <span>银行卡信息</span>
        <em class="mr25 fr red">请先实名认证</em>
        <i class="arrow iconfont icon-arrow-right"></i>
      </router-link>
      <router-link v-else-if="!this.bank_id" tag="aside" :to="{ name: 'bankComfirm'}" class="m-user-list">
        <span>银行卡信息</span>
        <em class="mr25 fr red">未填写</em>
        <i class="arrow iconfont icon-arrow-right"></i>
      </router-link>
      <router-link v-else class="m-user-list" tag="aside" :to="{ name: 'userBank'}">
        <span>银行卡信息</span>
        <em class="mr25 fr gray3">已填写</em>
        <i class="arrow iconfont icon-arrow-right"></i>
      </router-link>
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
      real_name: state => state.login.user_info.real_name,
      bank_id: state => state.login.user_info.bank_id,
      userInfo: state => state.login.user_info
    })
  },
  methods: {
    backMy () {
      this.$router.push('/my')
    }
  },
  created () {
    // do something after creating vue instance
    this.$store.dispatch('getUserInfo', {'user_id': localStorage.user_id})
  }
}
</script>

<style lang="css">
</style>
