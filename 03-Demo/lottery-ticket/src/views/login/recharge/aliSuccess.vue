<template lang="html">
  <div>
    <header class="m-top g-top-user box-shadow">
      <h2 class="m-top-title tal ml20"><i @click="backMy" class="iconfont icon-arrow-left mr10"></i><span>{{service_type ? '充值详情' : '支付详情'}}</span></h2>
    </header>
    <div class="header-top-space"></div>
    <section class="aliContent layoutFlex">
      <div class="ftColor payResult">{{pay_tip}}</div>
      <div class="layoutFlex">
        <div class="payImg">
          <img :src="payImg" alt="">
        </div>
        <div class="payProgress">
          <p class="progress1">
            提交成功
          </p>
          <p class="progress2">
            支付宝处理中
          </p>
          <p class="progress3">
            {{pay_tip1}}
          </p>
        </div>
      </div>
      <!-- 足彩 -->
      <!-- <router-link v-if="!pay && payResult " tag="button" class="tac seeDetail" :to="{ path: '/zqRecord' }">查看详情</router-link> -->
      <!-- 数字彩 -->
      <!-- <router-link v-if="service_type_n === '3' && !pay && payResult "  tag="button" class="tac seeDetail" :to="{ path: '/betRecord' }">查看详情</router-link> -->
      <div v-if="!pay && payResult " class="tac seeDetail" @click="routerTo">
        查看详情
      </div>
      <p class="returnPage" @click.prevent="backMy" >
        返回首页
      </p>
    </section>
  </div>
</template>
<script>
import api from '@/api/api'
import { mapState } from 'vuex'

var backUrl
if (process.env.NODE_ENV === 'development') {
  // 开发环境
  backUrl = 'https://h5-client.wangzheka.cn//my'
} else {
  // 编译环境
  if (process.env.HOST === 'pro') {
    // 正式环境
    backUrl = 'https://m.duoduocp.cn/my'
  } else {
    // 测试环境
    backUrl = 'https://h5-client.wangzheka.cn//my'
  }
}

export default {
  name: '',
  data: () => ({
    service_type: true,
    pay: true,
    payImg: '../../../../static/images/alipay_loading.png',
    payResult: false,
    pay_tip: '',
    pay_tip1: '',
    order_lst: '',
    interval: '',
    service_type_n: ''

  }),
  methods: {
    backMy () {
      window.top.location.href = backUrl
    },
    routerTo () {
      if (String(this.$route.query.service_type) === '2') {
        // 数字彩
        this.$router.push('/zqRecord')
      } else if (String(this.$route.query.service_type) === '3') {
        this.$router.push('/betRecord')
      }
    },
    viewDetails () {
      if (this.$route.query.service_type === '2') {
        // 数字彩
        this.$router.push('/zqRecord')
      } else if (this.$route.query.service_type === '3') {
        this.$router.push('/betRecord')
      }
    }
  },
  destroyed () {
    clearInterval(this.interval)
  },
  computed: {
    ...mapState({
      order_lottery_alias: state => state.userOrder.order_lottery_alias
    })
  },
  mounted () {
    this.service_type_n = this.$route.query.service_type
    this.order_lst = this.$route.query.order_lst
    if (String(this.$route.query.service_type) === '1') {
      this.pay = true
      this.pay_tip = '充值结果查询中...'
      this.pay_tip1 = '支付成功'
    } else {
      this.pay = false
      this.pay_tip = '支付结果查询中...'
      this.pay_tip1 = '充值成功'
    }

    this.interval = setInterval(() => {
      api.chargeEnd({'order_id': this.$route.query.trade_no})
        .then(res => {
          if (Number(res.status) === 1) {
            this.payResult = true
            this.payImg = '../../../../static/images/alipay_succeed.png'
            this.pay_tip = this.pay ? '充值成功' : '支付成功'
            this.pay_tip1 = this.pay ? '充值成功' : '支付成功'
            clearInterval(this.interval)
            // service_type
            // total_money
            // service_order_id
            // separate
            try {
              android.callAndroid(1, this.service_type_n, this.$route.query.total_money, this.$route.query.service_order_id, this.$route.query.separate)
            } catch (e) {
              console.log('出现错误, 如果在非android环境下访问, 出现该警告是正常的.')
            }

            try {
              window.webkit.messageHandlers.weixinRechargeResult.postMessage(1 + ',' + this.service_type_n + ',' + this.$route.query.total_money + ',' + this.$route.query.service_order_id + ',' + this.$route.query.separate)
            } catch (e) {
              console.log('非ios环境')
            }
          } else {
            try {
              android.callAndroid(0, this.service_type_n, this.$route.query.total_money, this.$route.query.service_order_id, this.$route.query.separate)
            } catch (e) {
              console.log('出现错误, 如果在非android环境下访问, 出现该警告是正常的.')
            }
            try {
              window.webkit.messageHandlers.weixinRechargeResult.postMessage(0 + ',' + this.service_type_n + ',' + this.$route.query.total_money + ',' + this.$route.query.service_order_id + ',' + this.$route.query.separate)
            } catch (e) {
              console.log('非ios环境')
            }
          }
        })
        .catch((error) => {
          console.log(error)
          clearInterval(this.interval)
        })
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
  .ftColor{
    color:#E52222;
  }
  .aliContent{
    flex-direction: column;
    align-items: center;
  }
  .layoutFlex{
    display: -webkit-flex;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
 }
 .payResult{
   font-size:1.75rem;
   margin-top:6rem;
   margin-bottom: 5rem;
 }
 .payImg{
   width: 2.33rem;
   img{
     width:100%;
   }
 }
 .payProgress{
   margin-left: 1rem;
   font-size:1.33rem;
   .progress2{
     margin-top:2.5rem;
   }
   .progress3{
     margin-top:2.5rem;
   }
 }
 .seeDetail{
    width:22.75rem;
    height:3.42rem;
    background:linear-gradient(18deg,rgba(255,113,73,1),rgba(241,43,44,1));
    border-radius:0rem;
    font-size:1.42rem;
    line-height: 3.42rem;
    color: #fff;
    border-radius: 3px;
    margin-top:7rem;
 }
 .returnPage{
   text-decoration:underline;
   margin-top: 1rem;
 }
</style>
