<template>
  <div id="">
    <header class="m-top g-top-user box-shadow">
      <h2 class="m-top-title tal ml20"><i class="iconfont icon-arrow-left mr10" @click="backUser"></i><span>绑定银行卡</span></h2>
    </header>
    <div class="header-top-space"></div>
    <section class="g-user-inputs">
      <p class="tac">请绑定需要提现的银行卡</p>
      <div class="m-user-input">
        <label>持卡人</label>
        <input v-model="user_name" id="username" name="username" type="text" placeholder="" value="张三" readonly>
      </div>
      <div class="m-user-input">
        <label for="bankcard">银行卡号</label>
        <input v-model="bank_info.bank_card" id="bankcard" name="bankcard" type="text" placeholder="请输入银行卡号" required="required" maxlength="20" pattern="[0-9]">
      </div>
      <div class="m-user-input">
        <label for="bank">开户银行</label>
        <select class="bankList" v-model="bank_info.bank_name">
          <option disabled value="">请选择</option>
          <option>中国农业银行</option>
          <option>交通银行</option>
          <option>北京银行</option>
          <option>中国银行</option>
          <option>上海银行</option>
          <option>包商银行</option>
          <option>渤海银行</option>
          <option>中国建设银行</option>
          <option>中国光大银行</option>
          <option>成都银行</option>
          <option>兴业银行</option>
          <option>中信银行</option>
          <option>招商银行</option>
          <option>中国民生银行</option>
          <option>重庆银行</option>
          <option>长沙银行</option>
          <option>浙商银行</option>
          <option>东莞银行</option>
          <option>恒丰银行</option>
          <option>广东发展银行</option>
          <option>河北银行</option>
          <option>徽商银行</option>
          <option>华夏银行</option>
          <option>杭州银行</option>
          <option>中国工商银行</option>
          <option>吉林银行</option>
          <option>晋商银行</option>
          <option>江苏银行</option>
          <option>江西银行</option>
          <option>昆仑银行</option>
          <option>兰州银行</option>
          <option>宁波银行</option>
          <option>平安银行</option>
          <option>攀枝花市商业银行</option>
          <option>青岛银行</option>
          <option>青海银行</option>
          <option>上海浦东发展银行</option>
          <option>天津银行</option>
          <option>烟台银行</option>
        </select>
      </div>
    </section>
    <div class="footer-bottom-space"></div>
    <footer class="m-footer">
      <button @click="bandCard" class="m-footer-btn bgColor" id="" type="button">提交</button>
    </footer>
    <bottom-tips ref="bTips"></bottom-tips>
  </div>
</template>
<script>
import bottomTips from '@/components/bottom-tips/bottomTips'
import api from '@/api/api'

export default {
  name: '',
  components: {
    bottomTips
  },
  data: () => ({
    bank_info: {
      user_id: localStorage.user_id,
      bank_name: '',
      bank_card: ''
    },
    user_name: JSON.parse(localStorage.user_info).real_name,
    phone_number: '',
    time_count: '',
    showTimer: false,
    timer: null
  }),
  methods: {
    backUser () {
      this.$router.push('/user')
    },
    bandCard () {
      if (!this.bank_info.bank_name || !this.bank_info.bank_card) {
        this.$refs.bTips.bottompopTips('输入不能为空！')
      } else {
        api.bindCard(this.bank_info)
          .then(res => {
            this.$refs.bTips.bottompopTips(res.errmsg)
            if (res.errno === '0') {
              this.$router.push('/user')
            }
          }).catch(err => console.log(err))
      }
    }
  }
}
</script>
<style lang="css" scoped>
.m-user-input .getidcode {
  font-size: 1rem;
}
.bankList {
    width: calc(100% - 7.3rem);
    font-size: 1.4rem;
    color: #333;
    display: inline-block;
}
</style>
