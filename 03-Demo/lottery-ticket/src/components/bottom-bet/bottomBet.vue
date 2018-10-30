<template>
  <!-- 数字彩通用底部 -->
  <div class="bottom-bet">
    <div class="footer-bottom-space"></div>
    <footer class="m-footer box-shadow">

      <div class="layoutFlex m-footer-content">
        <div class="m-footer-operate layoutFlex">
          <div class="m-footer-clear tac ml5" style="padding-right:0.5rem; border-right:1px solid #eee;" @click="clear">
            <i class="iconfont icon-delete"></i>
            <span>清空</span>
          </div>
        </div>
        <div class="m-footer-bet layoutFlex tac">
          <span class="ml15">{{count}}注</span>
          <span class="ml15">{{money}}元</span>
        </div>
        <!-- <div class="m-footer-shake layoutFlex" @click="shakeFnc" v-if="shakeBtn">
          <i class="iconfont icon-yaoyiyao ft20 mr5"></i>
          <span>摇一摇机选</span>
        </div> -->
        <div class="m-btn-next mr10">
          <button class="bgColor" id="" type="button" @click="submit" v-loading="isDigClicked">下一步</button>
        </div>
      </div>
      <!-- 大的 -->
      <!-- <div class="m-footer-txt" @click="clear">
        <i class="iconfont icon-delete"></i>
        <span class="ml5">清空</span>
      </div>
      <div class="m-footer-bet">
        <span class="ml15">{{count}}注</span>
        <span class="ml15">{{money}}元</span>
      </div>
      <button class="m-btn-bet" id="" type="button" @click="submit" :disabled="!canSubmit" v-loading="isDigClicked">确定</button> -->
    </footer>
  </div>
</template>
<script>
export default {
  name: 'bottomBet',
  data: () => ({

  }),
  props: ['canSubmit', 'count', 'money', 'isDigClicked'],
  computed: {},
  mounted () {},
  methods: {
    clear: function () {
      this.$emit('clear')
    },
    submit: function () {
      if (this.canSubmit) {
        this.$emit('submit')
      } else {
        this.$emit('submitFail')
      }
    }
  }
}
</script>
<style lang="css" scoped>
.m-footer-bet {width: 12rem;}
</style>
