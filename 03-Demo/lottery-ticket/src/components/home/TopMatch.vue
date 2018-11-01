<template>
  <div>
    <section class="exchangePosition">
      <section v-show="totalData.show_index ==='1' && totalData.jczq_switch === '1'"
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
export default {}
</script>

<style scoped>
</style>
