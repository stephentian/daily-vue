<template lang="html">
  <div>
    <header class="m-top g-top-user box-shadow">
      <h2 class="m-top-title tac ml20"><i class="iconfont icon-arrow-left mr10" @click="back"></i><span>修改密码</span></h2>
    </header>
    <div class="header-top-space"></div>
    <section class="m-middle g-middle-password">
      <div class="m-middle-input mt25">
        <input v-model="change_info.new_password" id="newpassword" name="newpassword" type="password" placeholder="设置新密码" onkeyup="this.value=this.value.replace(/[^\w.\/]/ig,'')" maxlength="20">
      </div>
      <div class="m-middle-input mt25">
        <input v-model="check_pwd" id="rnewpassword" name="rnewpassword" type="password" placeholder="确认密码" onkeyup="this.value=this.value.replace(/[^\w.\/]/ig,'')" maxlength="20">
      </div>
      <button @click.prevent="changePwd" class="m-middle-button mt30 bgColor" type="button">完成</button>
    </section>
    <bottom-tips ref="bTips"></bottom-tips>
  </div>
</template>

<script>
import api from '@/api/api'
import bottomTips from '@/components/bottom-tips/bottomTips'

export default {
  name: '',
  components: {
    bottomTips
  },
  data: () => ({
    change_info: {
      phone_number: JSON.parse(localStorage.user_info).phone_number,
      new_password: '',
      user_id: localStorage.user_id
    },
    check_pwd: '',
    time_count: '',
    showTimer: false,
    timer: null,
    intervalId: null
  }),
  computed: {},
  methods: {
    back () {
      this.$router.go(-1)
    },
    send () {
      let count = 60
      this.$store.dispatch('codeSend', this.change_info.phone_number)
      if (!this.timer) {
        this.time_count = count
        this.showTimer = true
        this.timer = setInterval(() => {
          if (this.time_count > 0 && this.time_count <= 60) {
            this.time_count--
          } else {
            this.showTimer = false
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
    },
    changePwd () {
      if (!this.change_info.new_password || !this.check_pwd) {
        this.$refs.bTips.bottompopTips('输入不能为空！')
      } else if (this.change_info.new_password !== this.check_pwd) {
        this.$refs.bTips.bottompopTips('两次密码输入不一致！')
      } else {
        api.update(this.change_info)
          .then(res => {
            if (res.errno === '0') {
              this.$refs.bTips.bottompopTips(res.errmsg)
              this.intervalId = setInterval(() => {
                this.$router.push('/my')
              }, 2000)
            } else {
              this.$refs.bTips.bottompopTips(res.errmsg)
            }
          }).catch(err => console(err))
      }
    }
  },
  beforeDestroy () {
    if (this.intervalId) { // 如果定时器还在运行 或者直接关闭，不用判断
      clearInterval(this.intervalId) // 关闭
    }
  }
}
</script>

<style lang="css" scoped>
.m-top-title i{position:absolute;top:50%;left:2rem;-webkit-transform:translate(0,-50%);-moz-transform:translate(0,-50%);transform:translate(0,-50%);}
.m-title-h5 {
  font-size: 1.4rem;
}
.getidcode {
  font-size: 1rem;
}
.g-middle-password {
  -webkit-transform: translate(-50%,0);
  -moz-transform: translate(-50%,0);
  transform: translate(-50%,0);
}
.m-middle {
  top: 6rem;
}
</style>
