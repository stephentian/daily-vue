<template lang="html">
  <div>
    <header class="m-top g-top-my box-shadow">
      <h2 class="m-top-title tal ml20"><i class="avatar mr10"></i><span>您还未登录</span></h2>
      <div class="m-top-txt">
        <i class="iconfont "></i>
      </div>
    </header>
    <div class="header-top-space"></div>
    <section class="g-quick-login">
      <router-link :to="{ name: 'my'}" class="m-login-btn">立即登录</router-link>
    </section>
    <section class="g-my-deal">
      <aside class="m-deal-list tac fl">
        <i class="iconfont "></i>
        <span class="ml5">充值</span>
      </aside>
      <aside class="m-deal-list tac fl">
        <i class="iconfont "></i>
        <span class="ml5">提现</span>
      </aside>
    </section>
    <!-- 登录后 end -->
    <section class="g-user-list mt15">
      <aside class="m-user-list">
        <i class="iconfont "></i>
        <span class="ml10">投注记录</span>
        <i class="iconfont "></i>
      </aside>
      <aside class="m-user-list">
        <i class="iconfont "></i>
        <span class="ml10">账户明细</span>
        <i class="iconfont "></i>
      </aside>
      <aside class="m-user-list">
        <i class="iconfont "></i>
        <span class="ml10">追号管理</span>
        <i class="iconfont "></i>
      </aside>
      <aside class="m-user-list">
        <i class="iconfont "></i>
        <span class="ml10">优惠券</span>
        <i class="iconfont "></i>
      </aside>
      <aside class="m-user-list">
        <i class="iconfont "></i>
        <span class="ml10">礼包券兑换</span>
        <i class="iconfont "></i>
      </aside>
    </section>
    <bottom-tab></bottom-tab>
  </div>
</template>

<script>
import bottomTab from '@/components/bottom-tab/bottomTab'

export default {
  components: {
    bottomTab
  }
}
</script>
