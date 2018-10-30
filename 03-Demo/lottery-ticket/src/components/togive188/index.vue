<template>
  <div class="give188" v-show="floatData.switch1" id="moveDiv" @mousedown="down" @touchstart="down"
      @mousemove="move" @touchmove="move"
      @mouseup="end" @touchend="end">
    <img @click="linkto" :src="floatData.imgurl" alt="">
  </div>
</template>
<script>
import {
  mapState
} from 'vuex'

export default {
  name: 'give188',
  data () {
    return {
      switch1: false,
      targeturl: '',
      imgurl: '',
      flags: false,
      position: {
        x: 0,
        y: 0
      },
      nx: '',
      ny: '',
      dx: '',
      dy: '',
      xPum: '',
      yPum: '',
      isIos: false
    }
  },
  computed: {
    ...mapState({
      floatData: state => state.common.floatData
    })
  },
  methods: {
    linkto () {
      try {
        window.webkit.messageHandlers.iosBannerIndex.postMessage(this.floatData.targeturl)
      } catch (err) {
        window.open(this.floatData.targeturl)
      }
    },
    down () {
      document.body.style.overflow = 'hidden'
      let moveDiv = document.getElementById('moveDiv')
      this.flags = true
      let touch
      if (event.touches) {
        touch = event.touches[0]
      } else {
        touch = event
      }
      this.position.x = touch.clientX
      this.position.y = touch.clientY
      this.dx = moveDiv.offsetLeft
      this.dy = moveDiv.offsetTop
    },
    move () {
      let moveDiv = document.getElementById('moveDiv')
      if (this.isIos) {
        document.addEventListener('touchmove', this.handler, { passive: false })
      } else {
        document.addEventListener('touchmove', this.handler, false)
      }
      if (this.flags) {
        let touch
        if (event.touches) {
          touch = event.touches[0]
        } else {
          touch = event
        }
        this.nx = touch.clientX - this.position.x
        this.ny = touch.clientY - this.position.y
        this.xPum = this.dx + this.nx
        this.yPum = this.dy + this.ny
        moveDiv.style.left = this.xPum + 'px'
        moveDiv.style.top = this.yPum + 'px'
      }
    },
    end () {
      if (this.isIos) {
        document.removeEventListener('touchmove', this.handler, { passive: false })
      } else {
        document.removeEventListener('touchmove', this.handler, false)
      }
      document.body.style.overflow = 'scroll'
      this.flags = false
    },
    handler (e) {
      e.preventDefault()
    }
  }
}
</script>
<style lang="css" scoped>
.give188 {
  position: fixed;
  z-index: 998;
  margin: 0 auto;
  top: 81%;
  left: 82%;
  width: 18%;
  max-width: 120px;
}
.give188 img{
  width: 100%;
  display: block;
}
.give188 router-link{
  display: block;
}
.give188a{
  display: block;
}

</style>
