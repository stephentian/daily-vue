<template lang="html">
  <div id="jczqresult">
    <header class="m-top g-top-open">
      <h2 class="m-top-title tac"><i class="iconfont icon-arrow-left mr10" @click="routerBack"></i><span>竞彩足球开奖结果</span></h2>
    </header>
    <div class="header-top-space"></div>
    <div class="m-football-item">
      <h3 class="m-title-h3 tar" v-if="zqToday[0]"  @click="toggleArrow(0)">
        <span class="tal fl">{{ zqToday[0].match_date }} 星期{{ getWeekDay(zqToday[0].match_date) }} {{ zqToday.length }}场比赛已开奖</span>
        <i class="iconfont" :class="show_today ? 'icon-arrow-horizontal-up' : 'icon-arrow-horizontal-down'"></i>
      </h3>
      <h3 class="m-title-h3 tar" v-else>
        <span class="tal fl"> 0 场比赛已开奖</span>
        <i class="iconfont icon-arrow-horizontal-up-smal"></i>
      </h3>
      <ul v-show="show_today" class="m-football-lists">
        <li class="m-football-list" v-for="(match, index) in zqToday" :key="index">
          <aside class="m-football-info">
            <div class="m-football-gameinfo tac">
              <span>{{ match.league }}</span>
              <span>周{{ getWeekDay(match.match_date) }}{{ match.match_index }}</span>
              <span>{{ getStopTime(match.match_time) }}截止</span>
            </div>
            <div class="m-football-teaminfo">
              <h5 class="tac mb5"><span>{{ getHomeTeam(match.team_name) }}({{ match.ft_let_point_multi }})</span><em class="ml10 red">{{ match.ft_home_point }}:{{ match.ft_away_point }}</em><span>{{ getRoadTeam(match.team_name) }}</span></h5>
              <p class="tac">半场 {{ match.ft_half_home_point }}:{{ match.ft_half_away_point }}</p>
            </div>
          </aside>
        </li>
        <!-- <li class="m-football-list">
          <aside class="m-football-info">
            <div class="m-football-gameinfo tac">
              <span>欧罗巴联</span>
              <span>周五001</span>
              <span>23:57截止</span>
            </div>
            <div class="m-football-teaminfo">
              <h5 class="tac mb5"><span>塔帕丘拉(+1)</span><em class="ml10 green">1:3</em><span>托卢卡</span></h5>
              <p class="tac">半场 0:1</p>
            </div>
          </aside>
        </li> -->
        <!-- <li class="m-football-list">
          <aside class="m-football-info">
            <div class="m-football-gameinfo tac">
              <span>欧罗巴联</span>
              <span>周五001</span>
              <span>23:57截止</span>
            </div>
            <div class="m-football-teaminfo">
              <h5 class="tac mb5"><span>玻利瓦尔(-1)</span><em class="ml10 blue">1:1</em><span>科洛科洛</span></h5>
              <p class="tac">半场 1:0</p>
            </div>
          </aside>
        </li> -->
      </ul>
    </div>

    <div class="m-football-item">
      <h3 class="m-title-h3 tar" v-if="zqOneAgo[0]"  @click="toggleArrow(1)">
        <span class="tal fl">{{ zqOneAgo[0].match_date }} 星期{{ getWeekDay(zqOneAgo[0].match_date) }} {{ zqOneAgo.length }}场比赛已开奖</span>
        <i class="iconfont" :class="show_one ? 'icon-arrow-horizontal-up' : 'icon-arrow-horizontal-down'"></i>
      </h3>
      <h3 class="m-title-h3 tar" v-else>
        <span class="tal fl">0 场比赛已开奖</span>
        <i class="iconfont icon-arrow-horizontal-down"></i>
      </h3>
      <ul v-show="show_one" class="m-football-lists">
        <li class="m-football-list" v-for="(match, index) in zqOneAgo" :key="index">
          <aside class="m-football-info">
            <div class="m-football-gameinfo tac">
              <span>{{ match.league }}</span>
              <span>周{{ getWeekDay(match.match_date) }}{{ match.match_index }}</span>
              <span>{{ getStopTime(match.match_time) }}截止</span>
            </div>
            <div class="m-football-teaminfo">
              <h5 class="tac mb5"><span>{{ getHomeTeam(match.team_name) }}({{ match.ft_let_point_multi }})</span><em class="ml10 red">{{ match.ft_home_point }}:{{ match.ft_away_point }}</em><span>{{ getRoadTeam(match.team_name) }}</span></h5>
              <p class="tac">半场 {{ match.ft_half_home_point }}:{{ match.ft_half_away_point }}</p>
            </div>
          </aside>
        </li>
      </ul>
    </div>

    <div class="m-football-item">
      <h3 class="m-title-h3 tar" v-if="zqTwoAgo[0]"  @click="toggleArrow(2)"><span class="tal fl">{{ zqTwoAgo[0].match_date }} 星期{{ getWeekDay(zqTwoAgo[0].match_date) }} {{ zqTwoAgo.length }}场比赛已开奖</span><i class="iconfont icon-arrow-horizontal-down"></i></h3>
      <h3 class="m-title-h3 tar" v-else>
        <span class="tal fl">0 场比赛已开奖</span>
        <i class="iconfont icon-arrow-horizontal-down"></i>
      </h3>
      <ul v-show="show_two" class="m-football-lists">
        <li class="m-football-list" v-for="(match, index) in zqTwoAgo" :key="index">
          <aside class="m-football-info">
            <div class="m-football-gameinfo tac">
              <span>{{ match.league }}</span>
              <span>周{{ getWeekDay(match.match_date) }}{{ match.match_index }}</span>
              <span>{{ getStopTime(match.match_time) }}截止</span>
            </div>
            <div class="m-football-teaminfo">
              <h5 class="tac mb5"><span>{{ getHomeTeam(match.team_name) }}({{ match.ft_let_point_multi }})</span><em class="ml10 red">{{ match.ft_home_point }}:{{ match.ft_away_point }}</em><span>{{ getRoadTeam(match.team_name) }}</span></h5>
              <p class="tac">半场 {{ match.ft_half_home_point }}:{{ match.ft_half_away_point }}</p>
            </div>
          </aside>
        </li>
      </ul>
    </div>
    <div class="footer-bottom-space"></div>
    <footer class="m-footer">
      <router-link tag="button" class="m-footer-btn bgColor" to="/jczq">去投注</router-link>
    </footer>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'jczqresult',
  data () {
    return {
      show_today: true,
      show_one: false,
      show_two: false,
      football_info: {
        game: 'FT',
        all: 1 // 0 为只请求最近一场比赛, 1 为请求最近三天比赛
      }
    }
  },
  created () {
    this.$store.dispatch('getMatchResult', this.football_info)
  },
  computed: {
    ...mapState({
      zqToday: state => state.match.zq_today,
      zqOneAgo: state => state.match.zq_one_ago,
      zqTwoAgo: state => state.match.zq_two_ago
    })
  },
  mounted () {},
  methods: {
    routerBack () {
      // 返回上一级
      window.history.length > 2 ? this.$router.go(-1) : this.$router.push('/open')
    },
    toggleArrow (state) {
      // 下拉展示
      switch (state) {
        case 0:
          this.show_today = !this.show_today
          break
        case 1:
          this.show_one = !this.show_one
          break
        case 2:
          this.show_two = !this.show_two
          break
      }
    },
    // DateTime(date){
    //   var date = new Date(date);
    //   var y = date.getFullYear();
    //   var m = date.getMonth() + 1;
    //   m = m < 10 ? '0' + m : m;
    //   var d = date.getDate();
    //   d = d < 10 ? ('0' + d) : d;
    //   return y + '-' + m + '-' + d;
    // },
    getWeekDay (strDate) {
      let the_day = new Date(strDate).getDay()
      let show_day = ['日', '一', '二', '三', '四', '五', '六']
      return show_day[the_day]
    },
    getStopTime (time) {
      return time.slice(11, 16)
    },
    getHomeTeam (team) {
      return team.split(':')[0]
    },
    getRoadTeam (team) {
      return team.split(':')[1]
    }
  }
}
</script>

<style lang="css" scoped>
.m-top-title i {
  position: absolute;
  top: 50%;
  left: 2rem;
  -webkit-transform: translate(0,-50%);
  -moz-transform: translate(0,-50%);
  transform: translate(0,-50%);
}
.m-football-info{
  height:6rem;
}
.m-football-teaminfo h5 span{
  width: 9rem;
  font-size: 1.4rem;
  display: inline-block;
}
.m-football-teaminfo p{
  font-size: 1.2rem;
  color: #999;
}
</style>
