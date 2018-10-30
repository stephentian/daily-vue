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
          <!-- 多选 -->
          <div class="m-footer-clear tac m-footer-more ml5" @click="moreBetShow = !moreBetShow"  v-if="moreBtn">
            <div class="tac box-shadow" v-show="moreBetShow">
              <ul>
                <li @click="moreBet(1)">机选1注</li>
                <li @click="moreBet(5)">机选5注</li>
                <li @click="moreBet(10)">机选10注</li>
              </ul>
            </div>
            <i class="iconfont icon-duoxuan"></i>
            <span>多选</span>
          </div>
        </div>
        <div class="m-footer-bet layoutFlex tac" v-if="betBtn">
          <span class="ml15">{{count}}注</span>
          <span class="ml15">{{money}}元</span>
        </div>
        <div class="m-footer-shake layoutFlex" @click="shakeFnc" v-if="shakeBtn">
          <i class="iconfont icon-yaoyiyao ft20 mr5"></i>
          <span>摇一摇机选</span>
        </div>
        <div class="m-btn-next mr10">
          <button class="bgColor" id="" type="button" @click="submit" v-loading="isDigClicked">下一步</button>
        </div>
      </div>
      <!-- <div class="m-footer-bet">
        <span class="ml15">{{count}}注</span>
        <span class="ml15">{{money}}元</span>
      </div> -->
    </footer>
    <bottom-tips ref="bTips"></bottom-tips>
  </div>
</template>
<script>
import bottomTips from '@/components/bottom-tips/bottomTips'
export default {
  name: 'bottomBet',
  data: () => ({
    moreBetShow: false
  }),
  props: ['canSubmit', 'count', 'money', 'isDigClicked', 'moreBtn', 'shakeBtn', 'betBtn'],
  computed: {},
  mounted () {
    this.shake()
  },
  components: {
    bottomTips
  },
  methods: {
    clear () {
      this.$emit('clear')
    },
    submit () {
      if (!this.canSubmit) {
        this.$emit('submitFail')
      } else {
        this.$emit('submit')
      }
    },
    moreBet (n) {
      this.$emit('moreBet', n)
    },
    shakeFnc () {
      this.$emit('shake')
    },
    shake () {
      // 摇一摇
      const SHAKE_SPEED = 300
      let _self = this
      let lastTime = 0// 上次变化的时间
      let x = 0
      let y = 0
      let z = 0
      let lastX = 0
      let lastY = 0
      let lastZ = 0
      function motionHandler (event) {
        let acceleration = event.accelerationIncludingGravity
        let curTime = Date.now()// 取得当前时间
        if ((curTime - lastTime) > 120) {
          let diffTime = curTime - lastTime
          lastTime = curTime
          x = acceleration.x
          y = acceleration.y
          z = acceleration.z
          // 计算摇动速度
          let speed = Math.abs(x + y + z - lastX - lastY - lastZ) / diffTime * 1000
          if (speed > SHAKE_SPEED) {
            _self.$emit('shake')
          }
          lastX = x
          lastY = y
          lastZ = z
        }
      }
      if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', motionHandler, false)
      } else {
        this.$refs.bTips.bottompopTips('你的设备不支持位置感应')
      }
    }
  }
}
</script>
<style lang="css" scoped>
.m-footer-bet {width: 12rem;}
</style>
