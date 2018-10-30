<template lang="html">
  <div id="ssqresult">
    <header class="m-top g-top-open">
      <h2 class="m-top-title tac"><i class="iconfont icon-arrow-left mr10" @click="routerBack"></i><span>{{name}}</span></h2>
    </header>
    <div class="header-top-space"></div>
    <section class="g-open-lists">
      <aside class="m-open-list" >
        <div class="m-open-list-info">
          <h3><span>第{{period}}期 {{time}}</span></h3>
          <div class="balls mt5">
            <em class="tac mr5 fl red-ball" v-for="(item, index) in redBall"  :key="index + '1'">
              {{item}}
            </em>
            <em class="tac mr5 fl blue-ball" v-for="(item, index) in blueBall"  :key="index + '2'">
              {{item}}
            </em>
          </div>
        </div>
      </aside>
    </section>
    <section class="g-open-detail mt10">
      <div>
        <div class="layoutFlex" style="border-bottom:0.5px solid #f6f6f6;">
          <span class="ml15">本期销量</span>
          <span class="red mr15">
            {{totalsale | amountFormat}}元
          </span>
        </div>
        <div class="layoutFlex">
          <span class="ml15">奖池金额</span>
          <span class="red mr15">
            {{totalpool | amountFormat}}元
          </span>
        </div>
      </div>
    </section>

    <section class="g-open-detail mt10">
      <div>
        <div class="awardTable tac">
          <div class="layoutFlex">
            <span class="td1">奖项</span>
            <span class="td2">中奖注数</span>
            <span class="td3">每注奖金（元）</span>
          </div>
          <div class="layoutFlex" v-for="(item, index) in awardLevels" :key="index">
            <span class="td1">{{item.levelname}}</span>
            <span class="td2">{{item.levelcount}}</span>
            <span class="td3 red">{{item.levelbonus | amountFormat}}</span>
          </div>
        </div>
      </div>
    </section>
    <section class="open-bet bgColor" @click="toBet">
      <div>
        去投注
      </div>
    </section>
  </div>
</template>

<script>
import api from '@/api/api'
export default {
  name: 'award',
  data () {
    return {
      period: '',
      time: '',
      name: '',
      redBall: [],
      blueBall: [],
      awardLevels: [],
      totalpool: '',
      totalsale: ''
    }
  },
  created () {
    this.period = this.$route.query.lottery
    this.time = this.$route.query.time
    this.name = this.$route.query.name.includes('ssq') ? '双色球开奖详情' : '大乐透开奖详情'
    this.redBall = this.$route.query.redBall.toString().split(',')
    this.blueBall = this.$route.query.blueBall.toString().split(',')

    api.bonusInfo({
      'lottery_alias': this.$route.query.name,
      'lottery_period': this.period
    })
      .then((res) => {
        this.$set(this, 'awardLevels', res.data.awardLevels)
        this.totalpool = res.data.totalpool
        this.totalsale = res.data.totalsale
      })
  },
  filters: {
    amountFormat (num) {
      num = Number(num).toFixed(2)
      num = parseFloat(num)
      num = num.toLocaleString()
      return num
    }
  },
  methods: {
    routerBack () {
      // 返回上一级
      window.history.length > 2 ? this.$router.go(-1) : this.$router.push('/open')
    },
    toBet () {
      let g = this.$route.query.name.includes('ssq') ? '/ssq' : '/dlt'
      this.$router.push({'path': g})
    }
  }
}
</script>

<style lang="scss" scoped>
  .g-open-detail{
    background: #fff;
    font-size: 1.25rem;
    .layoutFlex{
      justify-content: space-between;
      height: 3.3rem;
      line-height: 3.3rem;
    }
    .awardTable{
      width:100%;
      .td1{
        flex:2;
        border-bottom: 0.5px solid #f6f6f6;
        border-right: 0.5px solid #f6f6f6;
      }
      .td2{
        flex:2;
        border-bottom: 0.5px solid #f6f6f6;
        border-right: 0.5px solid #f6f6f6;
      }
      .td3{
        flex:2;
        border-bottom: 0.5px solid #f6f6f6;
      }
    }
  }

  .open-bet{
    height:3.38rem;
    line-height: 3.38rem;
    width: 70%;
    margin: 2rem auto;
    text-align: center;
    font-size: 1.5rem;
    color:#fff;
    border-radius: 4px;
  }
</style>
