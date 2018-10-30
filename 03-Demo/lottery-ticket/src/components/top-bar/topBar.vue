<template>
  <header class="m-top top-bar">
    <h2 class="m-top-title tal ml20"><i class="iconfont icon-arrow-left mr10"></i><span>大乐透</span></h2>
    <div class="m-top-txt">
      <i class="iconfont icon-listbox"></i>
    </div>
    <div class="m-top-menu box-shadow">
      <ul>
        <li><a href="#"><i class="iconfont icon-lottery-calendar mr5 "></i><span>近期开奖</span></a></li>
        <li><a href="#"><i class="iconfont icon-eye-show mr5"></i><span>隐藏遗漏</span></a></li>
        <li><a href="#"><i class="iconfont icon-exclamatory-mark mr5"></i><span>玩法说明</span></a></li>
      </ul>
    </div>
    <div class="m-top-choose box-shadow">
        <ul>
          <li class="tac active"><a href="#">任选二</a></li>
          <li class="tac"><a href="#">任选三</a></li>
          <li class="tac"><a href="#">任选四</a></li>
          <li class="tac"><a href="#">任选五</a></li>
          <li class="tac"><a href="#">任选六</a></li>
          <li class="tac"><a href="#">任选七</a></li>
          <li class="tac"><a href="#">任选八</a></li>
          <li class="tac"><a href="#">前一直选</a></li>
          <li class="tac"><a href="#">前二直选</a></li>
          <li class="tac"><a href="#">前二组选</a></li>
          <li class="tac"><a href="#">前三直选</a></li>
          <li class="tac"><a href="#">前三组选</a></li>
        </ul>
      </div>
  </header>
</template>
<script>
export default {
  name: 'topBar',
  data: () => ({

  }),
  props: ['', '', ''],
  computed: {},
  mounted () {},
  methods: {
    routerBack () {
      // 返回上一级
      window.history.length > 2 ? this.$router.go(-1) : this.$router.push('/home')
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
