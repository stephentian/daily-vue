<template>
  <footer class="m-bottom-service">
        <!-- <span class="tag-read" data-clipboard-text="jiangxijianhai@163.com" @click="copy">jiangxijianhai@163.com (点击复制)</span> -->

    <!-- <p style="">
      更多资讯请关注公众号:
      <span class="copygzh" style="color: #F12C2C;" data-clipboard-text="多多中助手" @click="copy('copygzh')">多多中助手(点击复制)</span>
    </p> -->
    <p>
      客服QQ:
      <span class="copyqqh1" style="color: #F12C2C;" data-clipboard-text="2018582198" @click="copy('copyqqh1')">2018582198</span>
      <!-- <span style="color: #F12C2C;">|</span>
      <span class="copyqqh2" style="color: #F12C2C;" data-clipboard-text="3600782445" @click="copy('copyqqh2')">3600782445</span> -->
    </p>
    <p style="">客服电话:  <a class="tdl" style="color: #F12C2C;text-decoration: none;" href="tel:0791-82309268">0791-82309268</a></p>
    <!-- <input class="qq-input" id="wx" size="9" type="text" value="duoduozhongcp" readonly>
    <input class="qq-input" id="qqa" size="7" type="text" value="2018582198" readonly><input class="qq-input" id="qqb" size="7" type="text" value="3600782445" readonly> -->
    <bottom-tips ref="bTips"></bottom-tips>
  </footer>
</template>
<script>
import bottomTips from '@/components/bottom-tips/bottomTips'
import Clipboard from 'clipboard'
export default {
  name: 'bootomService',
  components: {
    bottomTips
  },
  data: () => ({
  }),
  methods: {
    copyqqA () {
      let qqA = document.getElementById('qqa')
      qqA.select()
      document.execCommand('copy')
      this.$refs.bTips.bottompopTips('已复制QQ号')
    },
    copyqqB () {
      let qqB = document.getElementById('qqb')
      qqB.select()
      document.execCommand('copy')
      this.$refs.bTips.bottompopTips('已复制QQ号')
    },
    copyWx () {
      let wx = document.getElementById('wx')
      wx.select()
      document.execCommand('copy')
      this.$refs.bTips.bottompopTips('已复制微信号')
    },
    copy (v) {
      let clipboard = new Clipboard('.' + v)
      let s = ''
      switch (v) {
        case 'copygzh':
          s = '已复制公众号'
          break
        case 'copyqqh1':
          s = '已复制QQ号'
          break
        case 'copyqqh2':
          s = '已复制QQ号'
          break
      }
      clipboard.on('success', e => {
        this.$refs.bTips.bottompopTips(s)
        // 释放内存
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        // 不支持复制
        this.$refs.bTips.bottompopTips('该浏览器不支持复制')
        // 释放内存
        clipboard.destroy()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.m-bottom-service{
  padding-top:1rem;
  padding-bottom: 1rem;
}
.m-bottom-service p{
  color:#666;
  line-height: 2rem;
  height: 2rem;
  font-size: 1.2rem;
  padding-left: 3rem;
}
.m-bottom-service p input {
  display: inline-block;
  /* width: 6.5rem; */
  height: auto;
  color:#F12C2C;
}
.m-bottom-service .qq-input {
  position: absolute;
  bottom: 0;
  left: 0;
  opacity: 0;
  z-index: -1000;
}
</style>
