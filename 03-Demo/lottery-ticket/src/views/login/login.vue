<template lang="html">
  <div>
    <!-- <header class="m-top g-top-my box-shadow">
      <router-link tag="h2" :to="{ name: 'user'}" class="m-top-title tal ml20">
        <i class="iconfont avatar mr10"></i><span>{{ user_info.phone_number }}</span>
      </router-link>
      <router-link tag='div' :to="{ name: 'set'}" class="m-top-txt">
        <i class="iconfont  icon-settings "></i>
      </router-link>
    </header>
    <div class="header-top-space"></div>
    <section class="g-my-own">
      <aside class="m-own-list tac">
        <h5>购彩金额</h5>
        <p class="mt10">{{ money }}元</p>
      </aside>
      <router-link tag="aside" class="m-own-list tac" :to="{ name: 'gameCoin'}">
        <h5>游戏币</h5>
        <p class="mt10">{{ user_info.game_coin }} 金币</p>
      </router-link>
    </section>
    <section class="g-my-deal">
      <router-link tag='aside' class="m-deal-list tac fl" :to="{ name: 'recharge'}">
        <i class="iconfont icon-recharge"></i>
        <span class="ml5">充值</span>
      </router-link>

      <aside v-if="!this.bank_id || !this.real_name" @click="showDialog" class="m-deal-list tac fl">
        <i class="iconfont icon-withdraw-cash"></i>
        <span class="ml5">提现</span>
      </aside>
      <router-link v-else tag='aside' class="m-deal-list tac fl" :to="{ name: 'cash'}">
        <i class="iconfont icon-withdraw-cash"></i>
        <span class="ml5">提现</span>
      </router-link>
    </section> -->
    <!-- 登录后 end -->

    <header>
      <router-link tag='div' :to="{ name: 'set'}" class="header-set">
        <i class="iconfont icon-settings ft20"></i>
      </router-link>
      <div class="bgColor"></div>
      <div class="header-content box-shadow">
        <router-link tag="div" :to="{ name: 'user'}" class="header-avatar">
          <span>
            <img src="../../../public/upfile/user.jpg">
          </span>
        </router-link>
        <div class="header-username">
          <span>{{ user_info.phone_number }}</span>
        </div>
        <div class="header-balance mt30 layoutFlex gray3">
          <div class="tac">
            <p>{{money}}元</p>
            <p>余额</p>
          </div>
          <router-link class="tac" to="/gameCoin" tag="div">
            <p>{{ user_info.game_coin }}金币</p>
            <p>游戏币</p>
          </router-link>
        </div>
      </div>
      <div class="header-Recharge layoutFlex gray3">
        <router-link tag='div' :to="{ name: 'recharge'}">
          <img src="../../../public/images/recharge.png" alt="">
          <span class="ml5">充值</span>
        </router-link>
        <div v-if="!this.bank_id || !this.real_name" @click="showDialog">
          <img src="../../../public/images/cash.png" alt="">
          <span class="ml5">提现</span>
        </div>
        <router-link v-else tag='div' :to="{ name: 'cash'}">
          <img src="../../../public/images/cash.png" alt="">
          <span class="ml5">提现</span>
        </router-link>
      </div>
    </header>
    <section class="g-user-list mt5">
      <router-link class="m-user-list" tag="aside" :to="{ name: 'zqRecord'}">
        <i class="iconfont icon-my-record"></i>
        <span class="ml10">投注记录</span>
        <i class="iconfont icon-arrow-right arrow mr10"></i>
      </router-link>
      <router-link class="m-user-list" tag="aside" :to="{ name: 'account'}">
        <i class="iconfont icon-my-account"></i>
        <span class="ml10">账户明细</span>
        <i class="iconfont icon-arrow-right arrow mr10"></i>
      </router-link>
      <router-link class="m-user-list" tag="aside" :to="{ name: 'betting'}">
        <i class="iconfont icon-my-manage"></i>
        <span class="ml10">追号管理</span>
        <i class="iconfont icon-arrow-right arrow mr10"></i>
      </router-link>
      <router-link  class="m-user-list" tag="aside" :to="{ name: 'coupon'}">
        <i class="iconfont icon-my-coupon"></i>
        <span class="ml10">优惠券记录</span>
        <i class="iconfont icon-arrow-right arrow mr10"></i>
      </router-link>
      <router-link  class="m-user-list" tag="aside" :to="{ name: 'share'}">
        <i class="iconfont icon-my-share"></i>
        <span class="ml10">分享好友得返利</span>
        <i class="iconfont icon-arrow-right arrow mr10"></i>
      </router-link>
      <aside class="m-user-list">
        <a href="http://p.qiao.baidu.com/cps/chat?siteId=11842513&userId=24092662">
          <i class="iconfont icon-my-service"></i>
          <span class="ml10">在线客服</span>
          <i class="iconfont icon-arrow-right arrow mr10"></i>
        </a>
      </aside>
    </section>
    <bottom-tab></bottom-tab>
    <togive188></togive188>
    <div class="popup-box" v-show="centerDialogVisible">
      <div class="popup-wrap middle">
        <h3 class="m-title-h3"><span>温馨提示</span><i class="iconfont mr10" @click="centerDialogVisible = false">×</i></h3>
        <div style="text-align:center;font-size:1.5rem;" class="mt15 ml15 mr15 mb20">
          <span v-if="!this.real_name" class="tips">您还未实名认证！</span>
          <span v-else class="tips">您还未绑定银行卡！</span>
        </div>
        <div class="m-bottom-btn">
          <router-link v-if="!this.real_name" tag="button" class="m-footer-btn bgColor" :to="{ name: 'nameComfirm'}">去实名认证</router-link>
          <router-link v-else tag="button" class="m-footer-btn bgColor" :to="{ name: 'bankComfirm'}">前去绑卡</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bottomTab from "@/components/bottom-tab/bottomTab";
import togive188 from "@/components/togive188/index";
import { mapState } from "vuex";

export default {
  components: {
    bottomTab,
    togive188
  },
  data() {
    return {
      is_comfirm: true,
      centerDialogVisible: false
    };
  },
  computed: {
    ...mapState({
      user_info: state => state.login.user_info,
      real_name: state => state.login.user_info.real_name,
      bank_id: state => state.login.user_info.bank_id
    }),
    money() {
      return (this.user_info.balance / 100).toFixed(2);
    }
  },
  methods: {
    isComfirm() {
      if (!this.bank_id || !this.real_name) {
      }
    },
    showDialog() {
      this.centerDialogVisible = true;
    }
  },
  created() {
    // do something after creating vue instance
    this.$store.dispatch("getUserInfo", { user_id: localStorage.user_id });
  }
};
</script>

<style lang="scss" scoped>
header {
  position: relative;
  .header-set {
    position: absolute;
    top: 1.5rem;
    right: 1rem;
    color: #fff;
  }
  .bgColor {
    height: 9rem;
    width: 100%;
  }
  .header-content {
    height: 11.5rem;
    width: 92%;
    border-radius: 0.4rem;
    background: #fff;
    position: absolute;
    top: 5rem;
    left: 4%;
    .header-avatar {
      display: block;
      width: 5rem;
      height: 5rem;
      border-radius: 2.5rem;
      overflow: hidden;
      margin-top: -2.5rem;
      margin-left: 1.2rem;
      img {
        width: 100%;
      }
    }
    .header-username {
      font-size: 1.5rem;
      margin-top: -1rem;
      text-indent: 6.5rem;
    }
    .header-balance {
      font-size: 1.33rem;
      width: 100%;
      justify-content: space-between;
      > div {
        width: 40%;
        p {
          margin-bottom: 0.5rem;
        }
      }
    }
  }
  .header-Recharge {
    margin-top: 8.2rem;
    background: #fff;
    height: 6.17rem;
    align-items: center;
    justify-content: space-around;
    font-size: 1.33rem;
    div {
      img {
        width: 3.5rem;
        height: 3.5rem;
        border-radius: 50%;
      }
    }
  }
}
.m-user-list {
  padding: 0 1rem;
  border-bottom: 0.5px solid #eee;
}
.m-user-list i.arrow {
  font-size: 1.3rem;
}
.m-user-list > a {
  display: inline-block;
  height: 100%;
  width: 100%;
}
.m-user-list span {
  font-weight: normal;
}
</style>
