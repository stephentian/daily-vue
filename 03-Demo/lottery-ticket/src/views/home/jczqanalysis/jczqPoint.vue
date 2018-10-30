<template>
  <div id="jczqPoint">
    <section class="g-match-tab">
      <div class="m-tab">
        <a class="zjf tac w33" :class="{'active': show_point === 0}" @click="show_point = 0">总积分</a>
        <a class="zcjf tac w33" :class="{'active': show_point === 1}" @click="show_point = 1">主场积分</a>
        <a class="kcjf tac w33" :class="{'active': show_point === 2}" @click="show_point = 2">客场积分</a>
      </div>
    </section>
    <section class="g-match-point" v-show="show_point === 0" v-for="(all, index) in all_point" :key="index">
      <h5 class="m-title-h5 tac">{{ all.title }}</h5>
      <dl class="m-match-point">
        <dt>
          <span class="tac">排名</span>
          <span class="tac">球队</span>
          <span class="tac">已赛</span>
          <span class="tac">胜</span>
          <span class="tac">平</span>
          <span class="tac">负</span>
          <span class="tac">进/失</span>
          <span class="tac">净</span>
          <span class="tac">积分</span>
        </dt>
        <dd v-for="(rank, index) in all.ranks" :key="index">
          <span class="tac">{{ rank.ranking }}</span>
          <span class="tac">{{ rank.team_name }}</span>
          <span class="tac">{{ rank.over }}</span>
          <span class="tac">{{ rank.win }}</span>
          <span class="tac">{{ rank.draw }}</span>
          <span class="tac">{{ rank.lose }}</span>
          <span class="tac">{{ rank.goal_win }}/{{ rank.goal_lose }}</span>
          <span class="red tac">{{ rank.goal_net }}</span>
          <span class="tac">{{ rank.point }}</span>
        </dd>
      </dl>
    </section>
    <!-- 主场积分 -->
    <section class="g-match-point">
      <div v-show="show_point === 1" v-for="(home, index) in home_point" :key="index">
        <h5 class="m-title-h5 tac">{{ home.title }}</h5>
        <dl class="m-match-point">
          <dt>
            <span class="tac">排名</span>
            <span class="tac">球队</span>
            <span class="tac">已赛</span>
            <span class="tac">胜</span>
            <span class="tac">平</span>
            <span class="tac">负</span>
            <span class="tac">进/失</span>
            <span class="tac">净</span>
            <span class="tac">积分</span>
          </dt>
          <dd v-for="(rank, index) in home.ranks" :key="index">
            <span class="tac">{{ rank.ranking }}</span>
            <span class="tac">{{ rank.team_name }}</span>
            <span class="tac">{{ rank.over }}</span>
            <span class="tac">{{ rank.win }}</span>
            <span class="tac">{{ rank.draw }}</span>
            <span class="tac">{{ rank.lose }}</span>
            <span class="tac">{{ rank.goal_win }}/{{ rank.goal_lose }}</span>
            <span class="red tac">{{ rank.goal_net }}</span>
            <span class="tac">{{ rank.point }}</span>
          </dd>
        </dl>
      </div>
    </section>
    <!-- 客场积分 -->
    <section class="g-match-point" v-show="show_point === 2" v-for="(away, index) in away_point" :key="index">
      <h5 class="m-title-h5 tac">{{ away.title }}</h5>
      <dl class="m-match-point">
        <dt>
          <span class="tac">排名</span>
          <span class="tac">球队</span>
          <span class="tac">已赛</span>
          <span class="tac">胜</span>
          <span class="tac">平</span>
          <span class="tac">负</span>
          <span class="tac">进/失</span>
          <span class="tac">净</span>
          <span class="tac">积分</span>
        </dt>
        <dd v-for="(rank, index) in away.ranks" :key="index">
          <span class="tac">{{ rank.ranking }}</span>
          <span class="tac">{{ rank.team_name }}</span>
          <span class="tac">{{ rank.over }}</span>
          <span class="tac">{{ rank.win }}</span>
          <span class="tac">{{ rank.draw }}</span>
          <span class="tac">{{ rank.lose }}</span>
          <span class="tac">{{ rank.goal_win }}/{{ rank.goal_lose }}</span>
          <span class="red tac">{{ rank.goal_net }}</span>
          <span class="tac">{{ rank.point }}</span>
        </dd>
      </dl>
    </section>
    <h6 class="m-title-h6 mt15 tac">注：页面数据仅供参考，请以官方公布的比分数据为准</h6>
    <div class="footer-bottom-space"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'jczqPoint',
  components: {
  },
  props: {
    match_date: String,
    match_number: String
  },
  data () {
    return {
      show_point: 0,
      game_info: {
        game: 'FT',
        match_date: this.match_date,
        match_number: this.match_number
      }
    }
  },
  created () {
    this.$store.dispatch('getMatchPoint', this.game_info)
  },
  computed: {
    ...mapState({
      points: state => state.match.point_list,
      all_point: state => state.match.point_list.total_ranking,
      home_point: state => state.match.point_list.host_ranking,
      away_point: state => state.match.point_list.away_ranking
    })
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
.g-match-point h5 {
  background: #f0f0f0;
  color: #333;
}
.m-match-point {
  background: #fff;
}
.m-match-point dl {
  width: 100%;
}
.m-match-point dt,.m-match-point dd {
  height: 3.5rem;
  line-height: 3.5rem;
  border-bottom: 1px solid #d6d7dc;
  font-size: 1rem;
  background: #fff;
  color: #999;
  display: -webkit-flex;
  display: -moz-flex;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  position: relative;
}
.m-match-point dd {
  color: #333;
}
.m-match-point dd:last-child {
  border-bottom: 1px solid #fff;
}
.m-match-point dd.yellow {
  background: #fffed8;
}
.m-match-point span {
  display: inline-block;
  width: 10%;
}
.m-match-point span:nth-child(2) {
  width: 18%;
}
.m-match-point span:nth-child(7) {
  width: 12%;
}
.footer-bottom-space {
  padding-bottom: 2rem;
}
</style>
