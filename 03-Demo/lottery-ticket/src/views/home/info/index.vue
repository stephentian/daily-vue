<template lang="html">
  <div class="info">
    <header class="m-top g-top-open">
      <h2 class="m-top-title tac"><i class="iconfont icon-arrow-left mr10" @click="routerBack"></i><span>资讯</span></h2>
    </header>
    <div class="header-top-space"></div>
    <section class="">
      <div class="info_nav">
        <div :class="activeIndex === 0 ? 'active' : ''" @click="activefnc(0)">
          竞彩推荐
        </div>
        <div :class="activeIndex === 1 ? 'active' : ''" @click="activefnc(1)">
          数字彩推荐
        </div>
      </div>
      <div class="info_data">
        <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" :bottomPullText="bottomText" ref="loadmore">
          <ul>
            <li v-for="(item, index) in index_info" :key="index">
              <div class="gray3" @click="linkTo(item.url)">
                <div class="layoutFlex">
                  <div class="info_data-l layoutFlex">
                    <div class="textEllipsis1">
                      {{item.title}}
                    </div>
                    <p class="gray9"><span class="red mr10">多多中</span>{{item.date | timefnc}}</p>
                  </div>
                  <div class="info_data-r">
                    <img :src="item.img_url">
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <!-- <router-link tag="aside" class="m-record-list" v-for="(lottery, index) in index_info" :key="index" :to="{ p}">
            <div class="tac">
              <h5 class="gray3">竞彩足球</h5>
              <p class=" gray9 mt5">{{ getTime(lottery.order_time) }}</p>
            </div>
            <div class="tac">
              <h5 class="gray3"></h5>
            </div>
            <div class="tac">
              <h5 class="red" v-if="lottery.order_status === 6">中奖{{ getMoney(lottery.bonus_money) }}元</h5>
              <h5 class="gray3" v-else>{{ getStatus(lottery.order_status) }}</h5>
              <p class=" gray9 mt5">投注 {{ getMoney(lottery.bet_money) }} 元</p>
            </div>
          </router-link> -->
        </mt-loadmore>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Loadmore } from 'mint-ui'

export default {
  name: 'info',
  data () {
    return {
      allLoaded: false,
      bottomText: '上拉加载更多 . . .',
      activeIndex: 0,
      infoData: {
        limit: 10,
        page: 1,
        type: 2
      }
    }
  },
  components: {
    'mt-loadmore': Loadmore
  },
  filters: {
    timefnc (v) {
      let crtTime = new Date(v)
      function dateFtt (fmt, date) { // author: meizz
        let o = {
          'M+': date.getMonth() + 1, // 月份
          'd+': date.getDate(), // 日
          'h+': date.getHours(), // 小时
          'm+': date.getMinutes(), // 分
          's+': date.getSeconds(), // 秒
          'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
          'S': date.getMilliseconds() // 毫秒
        }
        if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length)) }
        for (let k in o) {
          if (new RegExp('(' + k + ')').test(fmt)) { fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
        }
        return fmt
      }
      return dateFtt('yyyy-MM-dd hh:mm', crtTime)
    }
  },
  created () {
    this.$store.dispatch('getIndex_info', this.infoData)
  },
  computed: {
    ...mapState({
      lottery_order_msg_err: state => state.userOrder.lottery_order_msg_err,
      index_info: state => state.query.index_info
    })
  },
  mounted () {},
  methods: {
    routerBack () {
      // 返回上一级
      window.history.length > 2 ? this.$router.go(-1) : this.$router.push('/home')
    },
    activefnc (n) {
      this.activeIndex = n
      if (n === 0) {
        this.infoData.type = 2
      } else {
        this.infoData.type = 1
      }
      this.infoData.limit = 10
      this.$store.dispatch('getIndex_info', this.infoData)
    },
    loadBottom () {
      if (this.index_info.length < 10) {
        this.$refs.loadmore.onBottomLoaded()
        this.allLoaded = true
      } else {
        this.infoData.limit += 10
        setTimeout(() => {
          this.$store.dispatch('getIndex_info', this.infoData)
        }, 1000)
      }
    },
    linkTo (s) {
      try {
        window.webkit.messageHandlers.iosBannerIndex.postMessage(s)
      } catch (e) {
        let u = navigator.userAgent
        if (u.includes('cdd_h5')) {
          window.location.href = 'cdd://callbacUrl/cddAction?itemAction=2&url=' + encodeURIComponent(s)
        } else {
          window.location.href = s
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.m-top-title i {
  position: absolute;
  top: 50%;
  left: 2rem;
  -webkit-transform: translate(0,-50%);
  -moz-transform: translate(0,-50%);
  transform: translate(0,-50%);
}
.info_nav{
  background: #fff;
  border-bottom: 1px solid #F12C2C;
  >div{
    width: 50%;
    text-align: center;
    float: left;
    font-size: 1.17rem;
    height:4.17rem;
    line-height: 4.17rem;
  }
  .active{
    border-bottom:2px solid #F12C2C;
    background: #fff;
    color:#F12C2C;
  }

}
.info_nav:after{
  display: table;
  content: '';
  clear: both;
}
.info_data{
  ul{
    background: #fff;
    li{
      font-size: 1.08rem;
      padding: 1rem 1rem;
      border-bottom: 1px solid #eee;
      img{
        width: 7.92rem;
        height: 5.67rem;
      }
    }
  }
  .info_data-l{
    flex-direction: column;
    justify-content: space-between;
    flex:1;
    p{
      font-size: 0.92rem;
    }
  }
}
</style>
