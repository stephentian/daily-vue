<template lang="html">
  <div class="g-comlogin">
    <header class="m-top g-top-user box-shadow">
      <h2 class="m-top-title tac ml20">
        <i class="iconfont icon-arrow-left mr10"  @click="back"></i>
        <span>登录</span>
        <span class="fr mr10 registerSpan">
          <router-link class="ver-c" style="color:#fff;" :to="{name:'register'}">注册</router-link>
        </span>
      </h2>
    </header>
    <div class="header-top-space"></div>
    <!-- 账号登陆 -->
    <section v-if="loginFlag" class="m-comlogin m-com-div">
      <div class="m-login-input layoutFlex">
        <span>
          <img src="../../../../public/images/username.png" alt="">
        </span>
        <input v-model="user.login_phone_num" id="mobile" name="mobile" type="text" placeholder="手机号" value="" maxlength="11" required="required" pattern="[0-9]">
      </div>
      <div class="m-login-input layoutFlex">
        <span>
          <img src="../../../../public/images/lock.png" alt="">
        </span>
        <input v-model="user.login_password" name="password" type="password" placeholder="请输入密码" maxlength="20" @keyup.13="entry(true)">
      </div>
      <div class="m-comlogin-btn tac bgColor" style="position:relative;">
        <div class="opacityDiv1" v-if="user.login_phone_num === '' || user.login_password === ''">

        </div>
        <div class="opacityDiv2" @click="entry(true)">
          登录
        </div>
      </div>
      <div class="m-comlogin-fast-login layoutFlex">
        <span @click="changeShow">快捷方式登录</span>
        <span @click="rePassFnc">找回密码</span>
      </div>
    </section>
    <!-- 快捷登陆 -->
    <section v-else class="m-fastlogin m-com-div">
      <div class="m-login-input layoutFlex">
        <span>
          <img src="../../../../public/images/username.png" alt="">
        </span>
        <input v-model="phone_user.login_phone_num" id="mobile1" name="mobile" type="text" placeholder="请输入手机号" value="" maxlength="11" required="required" pattern="[0-9]">
      </div>
      <div class="m-login-input layoutFlex" style="position:relative">
        <span>
          <img src="../../../../public/images/verify.png" alt="">
        </span>
        <input v-model="phone_user.code" name="idcode" type="text" placeholder="请输入验证码" maxlength="6" pattern="[0-9]">
        <div class="getVerify tar" @click.prevent="send" style="position:absolute;right:0">
          <span v-show="!showTimer">获取验证码</span>
          <span v-show="showTimer">{{ time_count }}s后重新发送</span>
        </div>
      </div>
      <div  class="m-comlogin-btn tac bgColor" style="position:relative">
        <div class="opacityDiv1" v-if="phone_user.code === '' || phone_user.login_phone_num === ''">

        </div>
        <div class="opacityDiv2" @click="entry(false)">
          登录
        </div>
      </div>
    </section>
    <to-load v-show="loadShow"></to-load>
    <bottom-tips ref="bTips"></bottom-tips>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import api from "@/api/api";
import axios from "axios";
import bottomTips from "@/components/bottom-tips/bottomTips";
import toLoad from "@/components/to-load/index";
// 用户登录 与 用户快速登录是同一个页面
export default {
  name: "",
  components: {
    bottomTips,
    toLoad
  },
  data: () => ({
    user: {
      login_phone_num: "",
      login_password: "",
      login_type: "password",
      platform: 1
    },
    loginFlag: true, // 切换显示用户登陆还是快速登陆
    showTimer: false,
    phone_user: {
      login_phone_num: "",
      code: "",
      login_type: "2",
      channel: localStorage.channel_info ? localStorage.channel_info : "100001", // 渠道号，区分由 哪个链接进入
      platform: localStorage.platform1 ? localStorage.platform1 : 1 // 登录平台
    },
    time_count: "",
    clientHeight: 0,
    loadShow: true
  }),
  mounted() {
    let that = this;
    const clientHeight = `${document.documentElement.clientHeight}`;
    window.onresize = function temp() {
      let clientHeight1 = `${document.documentElement.clientHeight}`;
      if (Number(clientHeight1) < Number(clientHeight)) {
        that.loadShow = false;
      } else {
        that.loadShow = true;
      }
    };
    window.addEventListener(
      "orientationchange",
      function() {
        if (window.orientation !== 0) {
          that.loadShow = false;
        } else {
          that.loadShow = true;
        }
      },
      false
    );
  },
  methods: {
    ...mapMutations(["types.GET_USER_INFO"]),
    back() {
      if (this.loginFlag) {
        this.$router.go(-1);
      } else {
        this.loginFlag = true;
      }
    },
    send() {
      let count = 60;
      if (this.phone_user.login_phone_num.length !== 11) {
        this.$refs.bTips.bottompopTips("请输入正确的电话号码！");
      } else {
        this.$store.dispatch("codeSend", this.phone_user.login_phone_num);
        if (!this.timer) {
          this.time_count = count;
          this.showTimer = true;
          this.timer = setInterval(() => {
            if (this.time_count > 0 && this.time_count <= 60) {
              this.time_count--;
            } else {
              this.showTimer = false;
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000);
        }
      }
    },
    entry(s) {
      let o = s ? this.user : this.phone_user;
      if (s) {
        if (!o.login_phone_num || !this.user.login_password) {
          this.$refs.bTips.bottompopTips("输入不能为空！");
          return false;
        } else if (this.user.login_phone_num.length !== 11) {
          this.$refs.bTips.bottompopTips("请输入正确号码！");
          return false;
        }
      } else {
        if (this.phone_user.login_phone_num.length !== 11) {
          this.$refs.bTips.bottompopTips("请输入正确的电话号码！");
          return false;
        }
      }
      api.login(o).then(res => {
        if (res.errno === "0") {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user_id", res.data.user_id);
          axios.defaults.headers.common["x-cdd-jwt"] = res.data.token;
          this.$store
            .dispatch("getUserInfo", { user_id: res.data.user_id })
            .then(() => {
              let loginFromPath = this.$store.state.common.loginFromPath;
              let lotteryAlias = [
                "/ssq",
                "/dlt",
                "/3d",
                "/JXK3",
                "/dlc",
                "/jczq",
                "/jczqcart"
              ];
              if (lotteryAlias.indexOf(loginFromPath) > -1) {
                this.$router.push(loginFromPath);
              } else {
                this.$router.push("/my");
              }
            });
        }
      });
    },
    changeShow() {
      this.loginFlag = false;
    },
    rePassFnc() {
      this.$router.push("/register?retrieve=true");
    }
  }
};
</script>

<style lang="scss" scoped>
.ver-c {
  vertical-align: middle;
  font-size: 1.4rem;
}
.g-comlogin {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #fff;
  font-size: 1.33rem;

  .m-com-div {
    width: 82%;
    .m-login-input {
      height: 3.6rem;
      margin-top: 1.4rem;
      line-height: 3.6rem;
      input {
        flex: 14;
        border-bottom: 1px solid #e1e1e1;
        text-indent: 1rem;
        // -webkit-box-shadow: 0 0 0px 1000px white inset !important;
        // box-shadow: 0 0 0px 1000px white inset !important;
        // background-color: rgb(0, 0, 0) !important;
        background-image: none !important;
        // color: rgb(0, 0, 0) !important;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0) !important;
      }
      span {
        flex: 1;
        img {
          width: 100%;
          margin-top: -0.5rem;
        }
      }
      .getVerify {
        flex: 8;
        font-size: 1.33rem;
        color: #f12c2c;
        // border-bottom: 1px solid #E1E1E1;
      }
    }
    .m-comlogin-btn {
      border-radius: 2rem;
      height: 3.46rem;
      color: #fff;
      line-height: 3.46rem;
      font-size: 1.33rem;
      margin-top: 3rem;
    }
    .m-comlogin-fast-login {
      margin-top: 3rem;
      justify-content: space-between;
      font-size: 1.08rem;
      color: rgba(142, 142, 142, 1);
    }
  }
}
.opacityDiv1 {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.4);
  z-index: 2;
}
.opacityDiv2 {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}
</style>
