<template>
  <div id="dltWay">
    <header class="m-top g-top-login" v-if="!topShow">
      <h2 class="m-top-title tac">
        <i class="iconfont icon-arrow-left mr10" @click="routerBack"></i>
        <span>大乐透玩法说明</span></h2>
    </header>
    <div class="header-top-space" v-if="!topShow"></div>
    <!-- <section class="mt20">
      <h1 style="color:#434343;padding:0 0 0 0;margin:0 1rem .167rem .625rem" class="h5Title dis_all fs3 strong left">
        <div>截止时间：每周一、三、六19:40截止投注</div>
      </h1>
    </section>
    <section>
      <h1 style="color:#434343;padding:0 0 0 0;margin:0 1rem .167rem .625rem" class="h5Title dis_all fs3 strong left">
        <div>开奖时间：每周一、三、六20:30开奖</div>
      </h1>
    </section>
    <section>
      <h1 style="color:#434343;padding:0 0 0 0;margin:0 1rem .167rem .625rem" class="h5Title dis_all fs3 strong left">
        <div>玩法规则：5个红球+2个蓝球=1注（2元)，追加投注1元，最多可中1600万</div>
      </h1>
    </section>
    <section>
      <h1 style="color:#434343;padding:0 0 0 0;margin:0 1rem .167rem .625rem" class="h5Title dis_all fs3 strong left">
        <div>奖项设置：</div>
      </h1>
    </section> -->
    <section style="padding:0 0 0 0;background-color:#ffffff">
      <div class="imgBox">
        <img class="" src="../../assets/dltWay.jpg">
      </div>
    </section>
   <!--  <section>
      <h1 style="color:#434343;padding:0 0 0 0;margin:0 1rem 0 .625rem" class="h5Title dis_all fs3 strong left">
        <div>如何领奖</div>
      </h1>
    </section>
    <section style="color:#5d5d5d;background-color:transparent;padding-bottom: 30px;" class="p fs3 left">
      <p style="margin:0 1rem 0 .625rem;">单注中奖100万元以上，专人第一时间联系您安全领奖；100万元以下奖金将直接打入您的账户。</p>
    </section> -->
  </div>
</template>

<script>
export default {
  name: 'dltWay',
  data: () => ({
    topShow: true
  }),
  mounted () {
    this.topShow = navigator.userAgent.includes('cdd_ios') && true
  },
  methods: {
    routerBack () {
      // 返回上一级
      window.history.length > 2 ? this.$router.go(-1) : this.$router.push('/dlt')
    }
  }
}
</script>

<style lang="css" scoped>
.m-top-title i {
  position: absolute;
  top: 50%;
  left: 2rem;
  -webkit-transform: translate(0,-50%);
  -moz-transform: translate(0,-50%);
  transform: translate(0,-50%);
}
.h5Title {
    text-align: center;
    font-family: "Microsoft YaHei", arial;
    font-weight: 400;
    background-position: 50% 0;
    background-repeat: no-repeat;
    background-size: auto 100%
}
.h5Title.right {
    text-align: right;
    background-position: 100% 0
}
.h5Title.left {
    text-align: left;
    background-position: 0 0
}
.h5Title a,
.p a {
    color: #157efb;
    text-decoration: none
}
.h5Title b,
.p b {
    color: #f26061
}
.h5Title i,
.p i {
    color: #fc0
}
.h5Title em,
.p em {
    color: #5d5d5d
}
.h5Title strong,
.p strong,
.p strong *,
.strong.h5Title,
.strong.h5Title * {
    font-weight: 700
}
.h5Title > div {
    position: relative
}
.h5Title .cusLink {
    color: inherit;
    font-weight: 400
}
.h5Title .cusLink .iconSet {
    position: relative;
    top: 1px;
    color: inherit;
    font-weight: 400
}
.h5Title .hLeft {
    float: left
}
.h5Title .hRight {
    float: right
}
.h5Title.center .hLeft {
    position: absolute;
    left: 0
}
.h5Title.center .hRight {
    position: absolute;
    right: 0
}
.imgBox {
    position: relative;
    margin: auto;
    overflow: hidden
}
.imgBox img {
    width: 100%;
    display: block;
    margin: auto;
}
.fs3 {
    font-size: 1.333rem;
}
</style>
