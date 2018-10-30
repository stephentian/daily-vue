<template>
  <div id="bt3Jxk3">
    <section class="g-bet-box">
      <div class="m-bet-box">
        <h5 class="tar">
          <span class="red-circle fl"></span><span class="tal fl h5-txt">选<span class="red">3</span>个不同号码，与开奖相同即中<span class="red">40</span>元</span>
          <!-- <span class="tar" @click="moreShow()">
            <i class="iconfont icon-lishi"></i>
            历史开奖
          </span> -->
          <span class="tar ml5" @click="missShow()">
            <i class="iconfont icon-touzhu-xianshiyilou"></i>
            显示遗漏
          </span>
        </h5>
        <div class="balls mt10 mb" :class="eyeShow ? '' : 'mark'">
          <em class="white-rectangle red" v-for="(item, index) in three" :key="index" :class="{selected:item.isSelected}" @click="three_select(item, index)"><span>{{item.num}}</span><mark>{{trendData[index]}}</mark></em>
        </div>
      </div>
    </section>
    <bottom-bet @clear="init" :count="count" :money="money" @submit="submit" :canSubmit="canSubmit" :isDigClicked="isDigClicked" @shake="randomBalls()" @moreBet="moreBet" :moreBtn="true" :shakeBtn="true" :betBtn="false" @submitFail="submitFail"></bottom-bet>
    <bottom-tips ref="bTips"></bottom-tips>
  </div>
</template>

<script>
import router from '@/router/index.js'
import store from '@/store/index.js'
import bottomBet from '@/components/bottom-bet/bottomBetCom'
import bottomTips from '@/components/bottom-tips/bottomTips'
import { mapState } from 'vuex'

export default {
  name: 'bt3Jxk3',
  components: {
    bottomBet,
    bottomTips
  },
  data () {
    return {
      three: [], // 球
      three_selected: [], // 选中的球
      count: 0, // 投注数
      money: 0, // 投注金额
      canSubmit: false, // 提交投注
      isDigClicked: false
    }
  },
  props: ['eyeShow', 'countdown', 'trendData'],
  created () {
    this.init()
  },
  computed: {
    ...mapState({
      // lotteryStopTime: state => state.period.jxk3StopTime,
      lottery_period: state => state.period.jxk3StopTime.lottery_period
      // lottery_stop_time: state => state.period.jxk3StopTime.lottery_stop_time,
      // lottery_stop_weekday: state => {
      //   if (state.period.jxk3StopTime.lottery_stop_time) {
      //     let time = state.period.jxk3StopTime.lottery_stop_time.replace(/-/g, '/')
      //     let day = new Date(time).getDay()
      //     let show_day = ['日', '一', '二', '三', '四', '五', '六']
      //     return show_day[day]
      //   }
      // }
    })
  },
  methods: {
    init: function () {
      // 初始化
      let three = []
      for (let i = 1; i < 7; i++) {
        three.push({num: i, isSelected: false})
      }
      this.$set(this, 'three', three)
      this.three_selected.splice(0, this.three_selected.length)
      this.check()
      this.canSubmit = false
      this.count = 0
      this.money = 0
    },
    moreBet (e) {
      let o = {
        period: this.lottery_period,
        type: 'bt3jxk3',
        n: e
      }
      store.commit('bt3jxk3', o)
      router.push('/jxk3cart')
    },
    moreShow () {
      this.$emit('moreShow')
    },
    missShow () {
      this.$emit('missShow')
    },
    check: function () {
      if (this.three_selected.length >= 3) {
        this.$set(this, 'canSubmit', true)
        if (this.three_selected.length > 3) {
          this.count = this.combinations(this.three_selected.length, 3)
        } else {
          this.count = 1
        }
        this.money = this.count * 2
      } else {
        this.canSubmit = false
        this.count = 0
        this.money = 0
      }
    },
    three_select: function (item) {
      let l1 = this.three.filter((o, i) => {
        return o.isSelected === true
      })
      if (l1.length === 3 && !item.isSelected) {
        this.$refs.bTips.bottompopTips('不能超过三个号码')
        return false
      }
      item.isSelected = !item.isSelected
      if (item.isSelected) {
        this.three_selected.push(item.num)
      } else {
        for (let i = 0; i < this.three_selected.length; i++) {
          (this.three_selected[i] === item.num) && (this.three_selected.splice(i, 1))
        }
      }
      this.check()
    },
    randomBalls: function () {
      this.init()
      let result = this.randomArr(3)

      for (let i in result) {
        let num = parseInt(result[i])
        this.three_select(this.three[num])
      }
      this.check()
    },
    randomArr (sum) {
      let arr = [0, 1, 2, 3, 4, 5]
      let result = []
      let newArr = arr
      let count = newArr.length

      for (let i = 0; i < sum; i++) {
        let index = ~~(Math.random() * count) + i
        result[i] = newArr[index]
        newArr[index] = newArr[i]
        count--
      }
      return result
    },
    Coms: function () {
      // 普通投注号
      const arr1 = this.three_selected

      this.ante_code = arr1.join(',').split()
    },
    bonusCombination (arr, num, fun) {
      /**
      * 排列组合算法（列举出数组里取出的元素， 并排成组合）
      **/
      if (arr.length < num || num > 10) {
        return []
      }
      let variable = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u']
      let replaceStr = '#$#'
      let str = 'var arr=arguments[0]; var fun=arguments[1];  var ret=[]; for (var a = 0; a < arr.length; a++) { ' + replaceStr + ' } return ret;'
      for (let i = 1; i < num; i++) {
        str = str.replace(replaceStr, ' for (var ' + variable[i] + ' =' + variable[i - 1] + '+ 1; ' + variable[i] + ' < arr.length; ' + variable[i] + '++) { ' + replaceStr + '  }')
      }
      let temp = 'var temp= [];'
      for (let i = 0; i < num; i++) {
        temp += 'temp.push(arr[' + variable[i] + ']);'
      }
      if (fun) {
        temp += 'ret.push(fun(temp)); '
      } else {
        temp += 'ret.push(temp);'
      }
      str = str.replace(replaceStr, temp)
      return (new Function(str)).apply(null, [arr, fun])
    },
    combinations (m, n) {
      if (!n || n < 1) {
        return []
      }

      let resultArrs = []
      let flagArr = []
      let isEnd = false
      let i
      let j
      let leftCnt

      for (i = 0; i < m; i++) {
        flagArr[i] = i < n ? 1 : 0
      }

      resultArrs.push(flagArr.concat())

      while (!isEnd) {
        leftCnt = 0
        for (i = 0; i < m - 1; i++) {
          if (flagArr[i] === 1 && flagArr[i + 1] === 0) {
            for (j = 0; j < i; j++) {
              flagArr[j] = j < leftCnt ? 1 : 0
            }
            flagArr[i] = 0
            flagArr[i + 1] = 1
            let aTmp = flagArr.concat()
            resultArrs.push(aTmp)
            if (aTmp.slice(-n).join('').indexOf('0') === -1) {
              isEnd = true
            }
            break
          }
          flagArr[i] === 1 && leftCnt++
        }
      }
      return resultArrs.length
    },
    submitFail () {
      this.$refs.bTips.bottompopTips('请选择三个号码')
    },
    submit: function () {
      if (this.isDigClicked) {
        this.$refs.bTips.bottompopTips('已经被点击了，请勿重复点击')
      } else {
        let beforeDone = () => (new Promise((resolve, reject) => {
          this.isDigClicked = true
          // this.Coms()
          const jxk3Obj = {}
          jxk3Obj.play_type = '311'
          jxk3Obj.ante_info = '三不同号'
          jxk3Obj.lottery_alias = 'JXK3'
          jxk3Obj.lottery_period = this.lottery_period
          jxk3Obj.ante_code = this.three_selected
          jxk3Obj.count = this.count
          jxk3Obj.single_money = this.money

          // if (this.three_selected.length === 3) {
          //   const jxk3Obj = {}
          //   jxk3Obj.play_type = '311'
          //   jxk3Obj.ante_info = '三不同号'
          //   jxk3Obj.lottery_alias = 'JXK3'
          //   jxk3Obj.lottery_period = this.lottery_period
          //   jxk3Obj.ante_code = this.three_selected
          //   jxk3Obj.count = this.count
          //   jxk3Obj.single_money = this.money
          //   if (localStorage.token) {
          //     store.commit('Jxk3', jxk3Obj)
          //   }
          // } else {
          //   let three_selected_arr = this.bonusCombination(this.three_selected, 3)
          //   for (var i = 0; i < three_selected_arr.length; i++) {
          //     const jxk3Obj = {}
          //     jxk3Obj.play_type = '311'
          //     jxk3Obj.ante_info = '三不同号'
          //     jxk3Obj.lottery_alias = 'JXK3'
          //     jxk3Obj.lottery_period = this.lottery_period
          //     jxk3Obj.ante_code = three_selected_arr[i]
          //     jxk3Obj.count = 1
          //     jxk3Obj.single_money = 2
          //     if (localStorage.token) {
          //       store.commit('Jxk3', jxk3Obj)
          //     }
          //   }
          // }

          if (localStorage.token) {
            store.commit('Jxk3', jxk3Obj)
          }
          resolve()
        }))
        beforeDone().then(() => {
          // this.canSubmit = false;
          router.push('/jxk3cart')
        }).catch((err) => {
          this.$refs.bTips.bottompopTips(`submit函数出错${err}`)
          this.isDigClicked = false
        })
      }
    }
  }
}
</script>

<style lang="css" scoped>
.m-bet-box .balls{
  justify-content: space-between;
}
.m-bet-box .balls em.white-rectangle{
  margin:0px;
  width:15%;
  padding-top: 10.5%;
  border-radius:3px;
}
.m-bet-box .balls em.white-rectangle span{
  border:1px solid #ddd;
  border-radius:3px;
}
</style>
