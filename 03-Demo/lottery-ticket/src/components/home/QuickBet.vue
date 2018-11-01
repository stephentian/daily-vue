<template>
  <div>
    <section v-show="totalData.show_index === '1' && totalData.ssq_switch ==='1'"
             class="m-index-ssq">
      <div>
        <p class="m-index-title"><span class="m-index-title-txt">双色球</span><span class="m-index-tilte-more"></span></p>
        <div class="m-index-ssq-number">
          <div class="m-index-ssq-number-l">
            <ul>
              <li v-for="(item, index) in reds_selected"
                  :key="index"
                  :class="{'classScale': classList[index] }">
                {{item}}
              </li>
              <li style="background:#208EFD;color:#fff;border:1px solid #208EFD;"
                  :class="{'classScale': classList[6] }">
                {{blues_selected[0]}}
              </li>
            </ul>
          </div>
          <div class="m-index-ssq-number-r layoutFlex"
               @click="randomBalls">
            <img :class="{'classRotate': !randomFlag}"
                 src="../../../public/images/refresh.png"
                 alt="">
          </div>
        </div>
        <div class="m-index-ssq-detail">
          <div class="m-index-ssq-detail-l">
            <span>
              周二四日21:15开奖
            </span>
            <span>
              {{stopTime}}截止
            </span>
          </div>
          <div class="m-index-ssq-detail-r">
            <button class="ssqBuy tac indexCommonBtn"
                    @click="ssqSubmit">立即购买</button>
          </div>
        </div>
      </div>
    </section>
    <section v-show="totalData.show_index !== '1' && totalData.jczq_switch ==='1'"
             v-if="totalData.jczq ? true : false"
             class="m-index-focus">
      <div>
        <div class="m-index-focus-icon">
          <img src="../../../public/images/focusIcon.png"
               alt="">
        </div>
        <div class="m-index-focus-select">
          <div class="m-index-focus-home"
               :class="teamSelect.homeWin ? 'focusActive' : ''"
               @click="teamSelectFnc(0)">
            <p><span>{{ totalData.jczq.home_team}}</span><span>胜</span></p>
            <span>{{totalData.jczq.rates['3']}}</span>
          </div>
          <div class="m-index-focus-flat"
               :class="teamSelect.flat ? 'focusActive' : ''"
               @click="teamSelectFnc(1)">
            <p><span>平</span></p>
            <span>{{totalData.jczq.rates['1']}}</span>
          </div>
          <div class="m-index-focus-away"
               :class="teamSelect.awayWin ? 'focusActive' : ''"
               @click="teamSelectFnc(2)">
            <p><span>{{totalData.jczq.away_team}}</span><span>胜</span></p>
            <span>{{totalData.jczq.rates['0']}}</span>
          </div>
        </div>
        <div class="m-index-focus-submit">
          <div class="m-index-focus-input">
            <div class="selectMount layoutFlex">
              <input v-model.number="value"
                     type="number"
                     @change="numberChange(value)">
              <span class="text">倍</span>
              <span class="arrow"
                    @click="arrowClick()"><i class="iconfont ml5"
                   :class="DownUp ? 'icon-arrow-horizontal-up' : 'icon-arrow-horizontal-down'"></i></span>
              <div class="selectOption"
                   v-show="DownUp">
                <ul>
                  <li v-for="(item ,index) in options"
                      @click="selectNumberFnc(item)"
                      :key="index">{{item}}</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="m-index-focus-btn textEllipsis"
               @click="popShowFnc">
            <span>提交方案</span><span>(预计奖金{{foreBonus}}元)</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      a: '1',
      b: 2
    }
  },
  methods () {
    function fun () {
      var vc = 2
      this.a = vc
    }
    function a () { }
  }
}
</script>

<style scoped>
</style>
