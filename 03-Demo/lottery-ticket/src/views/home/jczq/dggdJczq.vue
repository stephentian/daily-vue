<template>
  <div id="dggdJczq">
    <section class="g-bet-box">
      <div class="m-bet-box">

      </div>
    </section>
    <bottom-bet @clear="init" :count="count" :money="money" @submit="submit" :canSubmit="canSubmit"></bottom-bet>
  </div>
</template>

<script>
import bottomBet from '@/components/bottom-bet/bottomBet'

export default {
  name: 'dggdJczq',
  components: {
    bottomBet
  },
  data () {
    return {
      count: 0, // 投注数
      money: 0, // 投注金额
      canSubmit: false // 提交投注
    }
  },
  props: ['eyeShow', 'countdown'],
  created () {

  },
  computed: {
  },
  mounted () {},
  methods: {
    init: function () {

    },
    submit: function () {

    }
  }
}
</script>

<style lang="css" scoped>

</style>
