<template lang="html">
  <div>
    <header class="m-top g-top-user box-shadow" v-if="topShow">
      <h2 class="m-top-title tal ml20"><i @click="back" class="iconfont icon-arrow-left mr10"></i><span>备用支付入口</span></h2>
    </header>
    <div class="header-top-space" v-if="topShow"></div>
    <div class="tac gray6 f1">
      <p class="mt20">
        请将截图保存到相册
      </p>
      <p class="mt5">
        然后打开支付宝扫码识别二维码支付
      </p>
      <p class="mt5">
        或转账至支付宝账号
      </p>
      <p class="red mt10 mb10">
        <span class="tag-read" data-clipboard-text="jiangxijianhai@163.com" @click="copy">jiangxijianhai@163.com (点击复制)</span>
      </p>
    </div>
    <div class="aliPayImg">
      <img src="../../../../public/images/aliPay.png" alt="">
    </div>
    <p class="red tac f1 mt15 mb5">支付时请备注手机号</p>
    <p class="red tac f1 mt15 mb5">支付完成后请将支付截图发送给客服</p>
    <!-- <div class="f2">
      <p class="red tac f1 mt15 mb20">支付完成后请将支付截图发送给客服</p>
      <div style="text-indent:6.5rem;">
        <p>客服公众号: <span class="red">多多中彩票 (点击复制)</span></p>
        <p class="mt5">客服QQ: <span class="red">2018582198</span><span class="red"> | </span><span class="red">3600782445</span></p>
        <p class="mt5">客服电话: <span><a class="red" href="tel:0791-82309268">0791-82309268</a></span></p>
      </div>
    </div> -->
    <bottomService></bottomService>
    <bottom-tips ref="bTips"></bottom-tips>
  </div>
</template>
<script>
import Clipboard from "clipboard";
import bottomTips from "@/components/bottom-tips/bottomTips";
import bottomService from "@/components/bottom-service/bottomService";
export default {
  name: "",
  components: {
    bottomService,
    bottomTips
  },
  data: () => ({
    topShow: true
  }),
  mounted() {
    if (
      navigator.userAgent.includes("cdd_ios") ||
      navigator.userAgent.includes("cdd_android")
    ) {
      this.topShow = false;
    } else {
      this.topShow = true;
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    alipayFnc() {
      let alipay = document.getElementById("alipay");
      alipay.select();
      document.execCommand("copy");
    },
    copy() {
      let clipboard = new Clipboard(".tag-read");
      clipboard.on("success", e => {
        this.$refs.bTips.bottompopTips("已复制支付宝账号");
        // 释放内存
        clipboard.destroy();
      });
      clipboard.on("error", e => {
        // 不支持复制
        this.$refs.bTips.bottompopTips("该浏览器不支持复制");
        // 释放内存
        clipboard.destroy();
      });
    }
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
.aliPayImg {
  margin: 0 auto;
  background: #fff;
  width: 45%;
  padding: 3%;
  img {
    width: 100%;
  }
}
.f1 {
  font-size: 1.5rem;
}
.f2 {
  font-size: 1.17rem;
}
.qq-input {
  position: absolute;
  bottom: 0;
  left: 0;
  opacity: 0;
  z-index: -1000;
}
</style>
