<template>
  <div id="">
    <header class="m-top box-shadow">
      <h2 class="m-top-title tal ml20">
        <i class="iconfont icon-arrow-left mr10" @click="backMy"></i>
        <span>游戏币明细</span>
      </h2>
    </header>
    <div class="header-top-space"></div>
    <section class="g-tab">
      <div class="m-tab">
        <a href="javascript:;" class="sj w33 tac">时间</a>
        <a href="javascript:;" class="sj w33 tac">类型</a>
        <a href="javascript:;" class="sj w33 tac">数量</a>
      </div>
    </section>
    <section class="g-record-lists" v-for="(coin, index) in coin_list" :key="index">
      <div class="m-record-border">
        <aside class="m-record-list" style="border:none">
          <div class="tac">
            <h5 class="gray3">{{ getTime(coin.add_time) }}</h5>
          </div>
          <div class="tac">
            <h5 class="gray3">{{ getType(coin.type) }}</h5>
          </div>
          <div class="tac">
            <h5 class="gray3">{{ getFee(coin.game_coin_before, coin.game_coin_now, coin.fee) }}</h5>
          </div>
        </aside>
        <div style="text-align: right;padding-right: 1rem;margin-bottom: 0.5rem;">
           <!-- <h5 v-clipboard="coin.mark" @success="handleSuccess" @error="handleError">{{coin.mark}}</h5> -->
          <h5 @click="copyFnc(index)">{{coin.mark}}</h5>
          <input readonly="readonly" type="text" :Value="coin.mark" :id="'copyInput' + index" style="position:absolute;bottom:0;left: 0;opacity: 0;z-index: -10000;">
        </div>
      </div>
    </section>
    <div class="footer-bottom-space"></div>
    <footer class="m-footer">
      <router-link tag="button" class="m-footer-btn bgColor" :to="{ name: 'getCoin'}">去兑换</router-link>
    </footer>
    <bottom-tips ref="bTips"></bottom-tips>
  </div>
</template>

<script>
import Vue from 'vue'
import VueClipboard from 'vue-clipboards'
import { mapState } from 'vuex'
import bottomTips from '@/components/bottom-tips/bottomTips'
Vue.use(VueClipboard)

export default {
  name: '',
  data: () => ({
    get_coin_info: {
      user_id: localStorage.user_id,
      limit: 10,
      page: 1
    },
    copyText: ''
  }),
  computed: {
    ...mapState({
      coin_list: state => state.user.coin_list
    })
  },
  components: {
    bottomTips
  },
  methods: {
    copyFnc (index) {
      let wx = document.getElementById('copyInput' + index)
      wx.select()
      document.execCommand('copy')
      this.$refs.bTips.bottompopTips('已复制兑换码')
    },
    backMy () {
      this.$router.go(-1)
    },
    getFee (fee_before, fee_now, fee) {
      if (fee_before > fee_now) {
        return '-' + fee
      } else if (fee_before < fee_now) {
        return '+' + fee
      } else {
        return fee
      }
    },
    getTime (time) {
      return time.slice(0, 10)
    },
    getType (type) {
      switch (type) {
        case 0:
          return '未知'
        case 1:
          return '充值'
        case 2:
          return '兑换'
        default:
          return '未知'
      }
    }
  },
  created () {
    this.$store.dispatch('getCoinInfo', this.get_coin_info)
  }
}
</script>
