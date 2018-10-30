<template>
  <div class="openBrower"
       v-if="openWechat">
    <div>
      <img src="../../../public/upfile/openBrower.png">
    </div>
    <p>请选择在浏览器当中打开</p>
  </div>
</template>
<script>
export default {
  name: "openBrower",
  data() {
    return {
      openWechat: false
    };
  },
  created() {
    let ua = navigator.userAgent.toLowerCase();
    if (
      ua.toLowerCase().includes("micromessenger") ||
      ua.match(/QQ/i) === "qq"
    ) {
      this.openWechat = true;
    }
  }
};
</script>
<style lang="css" scoped>
.openBrower {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  color: #fff;
  font-size: 1.8rem;
  background: rgba(0, 0, 0, 0.5);
}
.openBrower > p {
  text-align: right;
  margin-right: 1.2rem;
}
.openBrower img {
  width: 100%;
  margin-top: 1.2rem;
}
</style>
