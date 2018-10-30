<template>
  <div id="jczqHistory">
    <section class="g-match-title">
      <p class="ml20"><span class="mr10">历史交锋</span>近{{ history.home_away_history_count }}场比赛 主队<em class="red">{{ sliceData(history.home_away_history_desc, 0, 1) }}胜 </em><em class="blue">{{ sliceData(history.home_away_history_desc, 2, 3) }}平 </em><em class="green">{{ sliceData(history.home_away_history_desc, 4, 5) }}负</em></p>
    </section>
    <section class="g-match-lists">
      <dl class="m-match-lists">
        <dt>
          <span class="tac">赛事</span>
          <span class="tac">日期</span>
          <span class="tac">主队</span>
          <span class="tac">比分</span>
          <span class="tac">客队</span>
          <span class="tac">胜负</span>
        </dt>
        <dd v-for="(match, index) in history_match.data" :key="index" v-if="history_match.data" style="color: black;">
          <span class="tac">{{ match.league_name }}</span>
          <span class="tac">{{ match.match_date }}</span>
          <span class="tac" :class="getHomeTeam(match.match_result, match.home_team, history.home_team)">{{ match.home_team }}</span>
          <span class="tac">{{ match.final_point }}</span>
          <span class="tac" :class="getHomeTeam(match.match_result, match.away_team, history.home_team)">{{ match.away_team }}</span>
          <span class="tac" :class="getHomeTeam(match.match_result, history.home_team, history.home_team)">{{ match.match_result }}</span>
        </dd>
      </dl>
    </section>
    <section class="g-match-lately mt15">
      <h2>最近战绩<span class="ml10">近{{ history.home_history_count }}场比赛</span></h2>
      <p class="mt5"><i class="mr10"><img :src="history.home_flag_url"></i>{{ history.home_team }}(主队) <em class="red">{{ sliceData(history.home_history_desc, 0, 1) }}胜 </em><em class="blue">{{ sliceData(history.home_history_desc, 2, 3) }}平 </em><em class="green">{{ sliceData(history.home_history_desc, 4, 5) }}负 </em></p>
    </section>
    <section class="g-match-lists">
      <dl class="m-match-lists">
        <dt>
          <span class="tac">赛事</span>
          <span class="tac">日期</span>
          <span class="tac">主队</span>
          <span class="tac">比分</span>
          <span class="tac">客队</span>
          <span class="tac">胜负</span>
        </dt>
        <dd v-for="(home, index) in home_his.data" :key="index" v-if="home_his.data" style="color: black;">
          <span class="tac">{{ home.league_name }}</span>
          <span class="tac">{{ home.match_date }}</span>
          <span class="tac" :class="getHomeTeam(home.match_result, home.home_team, history.home_team)">{{ home.home_team }}</span>
          <span class="tac">{{ home.final_point }}</span>
          <span class="tac" :class="getHomeTeam(home.match_result, home.away_team, history.home_team)">{{ home.away_team }}</span>
          <span class="tac" :class="getHomeTeam(home.match_result, history.home_team, history.home_team)">{{ home.match_result }}</span>
        </dd>
      </dl>
    </section>
    <section class="g-match-lately mt15">
      <p><i class="mr10"><img :src="history.away_flag_url"></i>{{ history.away_team }}(客队) <em class="red">{{ sliceData(history.away_history_desc, 0, 1) }}胜 </em><em class="blue">{{ sliceData(history.away_history_desc, 2, 3) }}平 </em><em class="green">{{ sliceData(history.away_history_desc, 4, 5) }}负 </em></p>
    </section>
    <section class="g-match-lists">
      <dl class="m-match-lists">
        <dt>
          <span class="tac">赛事</span>
          <span class="tac">日期</span>
          <span class="tac">主队</span>
          <span class="tac">比分</span>
          <span class="tac">客队</span>
          <span class="tac">胜负</span>
        </dt>
        <dd v-for="(away, index) in away_his.data" :key="index" v-if="away_his.data" style="color: black;">
          <span class="tac">{{ away.league_name }}</span>
          <span class="tac">{{ away.match_date }}</span>
          <span class="tac" :class="getHomeTeam(away.match_result, away.home_team, history.away_team)">{{ away.home_team }}</span>
          <span class="tac">{{ away.final_point }}</span>
          <span class="tac" :class="getHomeTeam(away.match_result, away.away_team, history.away_team)">{{ away.away_team }}</span>
          <span class="tac" :class="getHomeTeam(away.match_result, history.away_team, history.away_team)">{{ away.match_result }}</span>
        </dd>
      </dl>
    </section>
    <section class="g-match-lately mt15">
      <h2>未来赛事</h2>
      <p class="mt5"><i class="mr10"><img :src="history.home_flag_url"></i>{{ history.home_team }}(主队)</p>
    </section>
    <section class="g-match-lists">
      <dl class="m-match-lists">
        <dt>
          <span class="tac">赛事</span>
          <span class="tac">日期</span>
          <span class="tac">主队</span>
          <span class="tac">比分</span>
          <span class="tac">客队</span>
          <span class="tac">相隔</span>
        </dt>
        <dd v-for="(home_f, index) in home_fu.future_match" :key="index" v-if="home_fu.future_match" style="color: black;">
          <span class="tac">{{ home_f.home_team }}</span>
          <span class="tac">{{ home_f.match_date }}</span>
          <span class="tac">{{ home_f.home_team }}</span>
          <span class="tac">VS</span>
          <span class="tac">{{ home_f.away_team }}</span>
          <span class="tac">{{ getDay(home_f.match_date, history.match_date) }}天</span>
        </dd>
        <dd v-else>
          <p class="tac"> - - - 暂无数据 - - - </p>
        </dd>
      </dl>
    </section>
    <section class="g-match-lately mt15">
      <p class="mt5"><i class="mr10"><img :src="history.away_flag_url"></i>{{ history.away_team }}(客队)</p>
    </section>
    <section class="g-match-lists">
      <dl class="m-match-lists">
        <dt>
          <span class="tac">赛事</span>
          <span class="tac">日期</span>
          <span class="tac">主队</span>
          <span class="tac">比分</span>
          <span class="tac">客队</span>
          <span class="tac">相隔</span>
        </dt>
        <dd v-for="(away_f, index) in away_fu.future_match" :key="index" v-if="away_fu.future_match" style="color: black;">
          <span class="tac">{{ away_f.home_team }}</span>
          <span class="tac">{{ away_f.match_date }}</span>
          <span class="tac">{{ away_f.home_team }}</span>
          <span class="tac">VS</span>
          <span class="tac">{{ away_f.away_team }}</span>
          <span class="tac">{{ getDay(away_f.match_date, history.match_date) }}天</span>
        </dd>
        <dd v-else>
          <p class="tac"> - - - 暂无数据 - - - </p>
        </dd>
      </dl>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'jczqHistory',
  components: {
  },
  props: {
    match_date: String,
    match_number: String
  },
  computed: {
    ...mapState({
      history: state => state.match.history_list,
      away_fu: state => state.match.history_list.away_future_match,
      away_his: state => state.match.history_list.away_history_result,
      home_fu: state => state.match.history_list.home_future_match,
      home_his: state => state.match.history_list.home_history_result,
      history_match: state => state.match.history_list.home_away_history_match
    })
  },
  methods: {
    sliceData (data = [], a, b) {
      return data.slice(a, b)
    },
    getDay (day1, day2) {
      const day = new Date(day1).getTime() - new Date(day2).getTime()
      return parseInt(day / (1000 * 24 * 60 * 60))
    },
    getHomeTeam (res, team, home_team) {
      if (home_team.indexOf(team) !== -1) {
        switch (res) {
          case '胜':
            return 'red'
          case '负':
            return 'green'
          default:
            return 'blue'
        }
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="css" scoped>
.g-match-title {
  height: 3.8rem;
  line-height: 3.8rem;
  background: #fff;
}
.g-match-title p {
  font-size: 1.2rem;
  color: #999;
}
.g-match-title span {
  color: #333;
}
.g-match-lists {
  background: #fff;
}
.g-match-lists dl {
  width: 100%;
}
.g-match-lists dt,.g-match-lists dd {
  height: 3.5rem;
  line-height: 3.5rem;
  font-size: 1rem;
  color: #999;
  display: -webkit-flex;
  display: -moz-flex;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  position: relative;
}
.g-match-lists dt {
  background: #f5f5f5;
}
.g-match-lists dd {
  border-bottom: 1px solid #d6d7dc;
  background: #fff;
}
.g-match-lists dd:last-child {
  border-bottom: 1px solid #fff;
}
.g-match-lists span {
  display: inline-block;
}
.g-match-lists span:nth-child(1), .g-match-lists span:nth-child(4), .g-match-lists span:nth-child(6) {
  width: 14%;
}
.g-match-lists span:nth-child(2) {
  width: 18%;
}
.g-match-lists span:nth-child(3), .g-match-lists span:nth-child(5) {
  width: 20%;
}
.g-match-lately {
  padding: 1rem 2rem;
  background: #fff;
}
.g-match-lately h2 {
  font-size: 1.2rem;
  font-weight: 500;
  color: #333;
}
.g-match-lately h2 span {
  color: #999;
}
.g-match-lately p {
  height: 2.6rem;
  line-height: 2.6rem;
}
.g-match-lately p i {
  width: 2.6rem;
  height: 2.6rem;
  font-size: 1.2rem;
  background: #ddd;
  color: #666;
  display: inline-block;
}
.g-match-lately p img {
  width: 100%;
  height: 100%;
}
</style>
