<template>
  <div id="jczqRate">
    <section class="g-match-tab">
      <div class="m-tab">
        <a class="op tac w33" :class="{'active': show_rate === 0}" @click="show_rate = 0">欧赔</a>
        <a class="yp tac w33" :class="{'active': show_rate === 1}" @click="show_rate = 1">亚盘</a>
        <a class="dxp tac w33" :class="{'active': show_rate === 2}" @click="show_rate = 2">大小盘</a>
      </div>
    </section>
    <section class="g-match-table mt15" v-show="show_rate === 0">
      <table>
        <tbody>
          <tr class="tac">
            <th style="width: 30%">公司</th>
            <th style="width: 15%">开盘</th>
            <th>胜</th>
            <th>平</th>
            <th>负</th>
          </tr>
        </tbody>
      </table>
      <table cellpadding="0" cellspacing="0">
          <tr class="tac" v-for="(rate, index) in europe_rates.rates" :key="index">
            <td style="width: 30%">{{ rate.company_name }}</td>
            <td style="width: 15%">
              <p>
                <span class="gray9">初盘</span>
              </p>
              <p>
                <span class="gray9">即时</span>
              </p>
            </td>
            <td>
              <p><span class="gray6">{{ rate.first_home_level }}</span></p>
              <p><span :class="getColor(rate.flag[0])">{{ rate.now_home_level + getFlag(rate.flag[0]) }}</span></p>
            </td>
            <td>
              <p><span class="gray6">{{ rate.first_concede }}</span></p>
              <p><span :class="getColor(rate.flag[1])">{{ rate.now_concede + getFlag(rate.flag[1]) }}</span></p>
            </td>
            <td>
              <p><span class="gray6">{{ rate.first_away_level }}</span></p>
              <p><span :class="getColor(rate.flag[2])">{{ rate.now_away_level + getFlag(rate.flag[2]) }}</span></p>
            </td>
          </tr>
      </table>
    </section>
    <!-- 亚盘 -->
    <section class="g-match-table mt15" v-show="show_rate === 1">
      <table>
        <tbody>
          <tr class="tac">
            <th style="width: 30%">公司</th>
            <th style="width: 15%">开盘</th>
            <th>胜</th>
            <th>平</th>
            <th>负</th>
          </tr>
        </tbody>
      </table>
      <table cellpadding="0" cellspacing="0">
          <tr class="tac" v-for="(rate, index) in asia_rates.rates" :key="index">
            <td style="width: 30%">{{ rate.company_name }}</td>
            <td style="width: 15%">
              <p>
                <span class="gray9">初盘</span>
              </p>
              <p>
                <span class="gray9">即时</span>
              </p>
            </td>
            <td>
              <p><span class="gray6">{{ rate.first_home_level }}</span></p>
              <p><span :class="getColor(rate.flag[0])">{{ rate.now_home_level }}{{ getFlag(rate.flag[0]) }}</span></p>
            </td>
            <td>
              <p><span class="gray6">{{ rate.first_concede }}</span></p>
              <p><span :class="getColor(rate.flag[1])">{{ rate.now_concede }}{{ getFlag(rate.flag[1]) }}</span></p>
            </td>
            <td>
              <p><span class="gray6">{{ rate.first_away_level }}</span></p>
              <p><span :class="getColor(rate.flag[2])">{{ rate.now_away_level }}{{ getFlag(rate.flag[2]) }}</span></p>
            </td>
          </tr>
      </table>
    </section>
    <!-- 大小盘 -->
    <section class="g-match-table mt15" v-show="show_rate === 2">
      <table>
        <tbody>
          <tr class="tac">
            <th style="width: 30%">公司</th>
            <th style="width: 15%">开盘</th>
            <th>胜</th>
            <th>平</th>
            <th>负</th>
          </tr>
        </tbody>
      </table>
      <table cellpadding="0" cellspacing="0">
          <tr class="tac" v-for="(rate, index) in dxp_rates.rates" :key="index">
            <td style="width: 30%">{{ rate.company_name }}</td>
            <td style="width: 15%">
              <p>
                <span class="gray9">初盘</span>
              </p>
              <p>
                <span class="gray9">即时</span>
              </p>
            </td>
            <td>
              <p><span class="gray6">{{ rate.first_home_level }}</span></p>
              <p><span :class="getColor(rate.flag[0])">{{ rate.now_home_level }}{{ getFlag(rate.flag[0]) }}</span></p>
            </td>
            <td>
              <p><span class="gray6">{{ rate.first_concede }}</span></p>
              <p><span :class="getColor(rate.flag[1])">{{ rate.now_concede }}{{ getFlag(rate.flag[1]) }}</span></p>
            </td>
            <td>
              <p><span class="gray6">{{ rate.first_away_level }}</span></p>
              <p><span :class="getColor(rate.flag[2])">{{ rate.now_away_level }}{{ getFlag(rate.flag[2]) }}</span></p>
            </td>
          </tr>
      </table>
    </section>
    <h6 class="m-title-h6 mt15 tac">注：页面数据仅供参考，请以官方公布的比分数据为准</h6>
    <div class="footer-bottom-space"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'jczqRate',
  components: {
  },
  props: {
    match_date: String,
    match_number: String
  },
  data () {
    return {
      show_rate: 0,
      game_info: {
        game: 'FT',
        match_date: this.match_date,
        match_number: this.match_number
      }
    }
  },
  created () {
    this.$store.dispatch('getMatchRate', this.game_info)
  },
  computed: {
    ...mapState({
      europe_rates: state => state.match.rate_list.europe_rates,
      asia_rates: state => state.match.rate_list.asia_rates,
      dxp_rates: state => state.match.rate_list.dxp_rates
    })
  },
  mounted () {},
  methods: {
    getFlag (flag) {
      switch (flag) {
        case 1:
          return '↑'
        case -1:
          return '↓'
        default:
          return ''
      }
    },
    getColor (flag) {
      switch (flag) {
        case 1:
          return 'red'
        case -1:
          return 'green'
        default:
          return 'gray6'
      }
    }
  }
}
</script>

<style lang="css" scoped>
.g-match-tab .m-tab {
  width: 80%;
  height: 3.6rem;
  line-height: 3.6rem;
  margin: 1.5rem auto 0.5rem auto;
  border: 1px solid #d6d7dc;
  background: #f0f0f0;
}
.g-match-tab .m-tab a {
    font-size: 1.2rem;
    background: #fff;
    color: #333;
}
.g-match-tab .m-tab a.active,.g-match-tab .m-tab a:active{
  background: #e52222;
  color: #fff;
}
.g-match-table {

}
.g-match-table table {
  width: 100%;
  background: #fff;
}
.g-match-table tr {
  height: 2.4rem;
  line-height: 2.4rem;
}
.g-match-table tbody tr {
  height: 3rem;
  line-height: 3rem;
  border-top: 1px solid #d6d7dc;
  border-bottom: 1px solid #d6d7dc;
  font-size: 1.2rem;
  color: #999;
}
.g-match-table tr {
  border-bottom: 1px solid #d6d7dc;
}
.g-match-table td {
  vertical-align: middle;
}
.g-match-table td[rowspan="2"] {
  border-right: 1px solid #d6d7dc;
  border-bottom: 1px solid #d6d7dc;
  color: #333;
}
.footer-bottom-space {
  padding-bottom: 2rem;
}
</style>
