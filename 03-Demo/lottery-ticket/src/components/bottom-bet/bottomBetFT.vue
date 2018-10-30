<template>
  <!-- 竞彩通用底部 -->
  <div class="bottom-bet">
    <div class="footer-bottom-space"></div>
    <footer class="m-footer box-shadow">
      <div class="layoutFlex m-footer-content">
        <div class="m-footer-clear tac ml5" style="padding-right:0.5rem;border-right:1px solid #eee;" @click="clear">
          <i class="iconfont icon-delete"></i>
          <span>清空</span>
        </div>
        <div class="m-footer-shake layoutFlex red ft12">
          <span>{{match === 0 ? '请选择比赛' : '已选 ' + match + ' 场'}}</span>
        </div>
        <div class="m-btn-next mr10">
          <button class="bgColor" id="" type="button" @click="submit" v-loading="isFTClicked">下一步</button>
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
export default {
  name: 'bottomBet',
  data: () => ({

  }),
  props: ['canSubmit', 'match', 'isFTClicked'],
  computed: {},
  mounted () {},
  methods: {
    clear: function () {
      this.$emit('clear')
    },
    submit: function () {
      if (!this.canSubmit) {
        this.$emit('submitFail')
        return false
      }
      this.$emit('submit')
    }
  }
}
</script>
<style lang="css" scoped>

</style>
