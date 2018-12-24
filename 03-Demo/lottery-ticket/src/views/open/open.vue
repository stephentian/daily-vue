<template lang="html">
  <div class="">
    <header class="m-top g-top-open">
      <h2 class="m-top-title tac ml20">开奖</h2>
      <!-- <div class="m-top-txt">
        <i class="iconfont icon-bell"></i>
        <router-link tag="span" class="ml5" to="/open/notice">开奖通知</router-link>
      </div> -->
    </header>
    <div class="header-top-space"></div>
    <div style="height:3.25rem"></div>
    <div class="header-nav">
      <ul class="layoutFlex tac">
        <li :class=" 0 === typeIndex ? 'active' : ''" @click="typeFnc(0)">
          <span>
            全部
          </span>
        </li>
        <li :class=" 1 === typeIndex ? 'active' : ''" @click="typeFnc(1)">
          <span>
            竞技彩
          </span>
        </li>
        <li :class=" 2 === typeIndex ? 'active' : ''" @click="typeFnc(2)">
          <span>
            数字彩
          </span>
        </li>
        <li :class=" 3 === typeIndex ? 'active' : ''" @click="typeFnc(3)">
          <span>
            高频彩
          </span>
        </li>
      </ul>
    </div>
    <section class="g-open-lists">
      <aside v-for="(item, index) in periodInfo" :key="'period-' + index" class="m-open-list" v-if="type.includes(item.lottery_alias)">
        <router-link :to="{ path: '/open/' + item.lottery_alias + 'result' }">
          <div class="m-open-list-info">
            <h3><a class="lottery_name">{{ item.lottery_name }}</a><span class="ml15">第{{ item.lottery_period }}期 {{ item.official_stop_time | DateTime }}</span></h3>
            <div class="balls mt5">
              <em class="tac mr5 fl red-ball" v-for="(ball, i) in item.redBalls" :key="'redball-' + i">{{ ball }}</em>
              <!-- <em class="tac mr5 fl blue-ball" v-if="item.blueBalls.length > 0" v-for="(ball, i) in item.blueBalls" :key="i">{{ ball }}</em> -->
              <em class="tac mr5 fl blue-ball" v-for="(ball, i) in item.blueBalls" :key="'bluebal-' + i">{{ ball }}</em>
              <!-- <em class="tac mr5 fl" :class="[redBall ? 'red-ball' : 'blue-ball']" v-for="(item, index) in Balls(item.lottery_alias,item.bonus_code)" :value="index" :index="index">{{ item }}-{{ item.split(",").length > index }}</em> -->
              <!-- <em class="tac mr5 fl" :class="[redBall ? 'red-ball' : 'blue-ball']" v-for="(items, indexs) in item.bonus_code">{{ items }}</em> -->
              <!-- <em class="tac mr5 fl" v-for="(items, indexs) in item.bonus_code" :class="['tac','mr5','fl',indexs>5?'blue-ball':'red-ball']" >{{ items }}</em> -->
            </div>
          </div>
          <i class="iconfont icon-arrow-right"></i>
          <!-- <router-link tag="i" class="iconfont icon-arrow-right" :to="{ path: '/open/' + item.lottery_alias + 'result' }"></router-link> -->
        </router-link>
      </aside>
      <aside v-if="zqResult && type.includes('jczq')" class="m-open-list">
        <router-link :to="{ path: '/open/jczqresult' }">
        <div class="m-open-list-info">
          <h3>竞彩足球<span class="ml15">比赛日：{{ zqResult.match_date }}</span></h3>
          <div class="balls mt10">
            <img class="mr10" src="../../../public/images/zuqiu.png" alt=""><span class="gray6 zuqiubj bgColor">{{ getHomeTeam(zqResult.team_name) }}  <span class="ml20 mr20">{{ zqResult.ft_home_point }}<span class="ml5 mr5">:</span>{{ zqResult.ft_away_point }}</span> {{ getRoadTeam(zqResult.team_name) }}</span>
          </div>
        </div>
        <i class="iconfont icon-arrow-right"></i>
        </router-link>
      </aside>
      <!-- <aside v-else class="m-open-list">
        <router-link :to="{ path: '/open/jczqresult' }">
        <div class="m-open-list-info">
          <h3>竞彩足球<span class="ml15">比赛日：2018-05-08</span></h3>
          <div class="balls mt10">
            <span class="tac mr5 football-ball">巴萨 ： 皇马</span>
          </div>
        </div>
        <i class="iconfont icon-arrow-right"></i>
        </router-link>
      </aside> -->
    </section>
    <bottom-tab></bottom-tab>
    <togive188></togive188>
  </div>
</template>

<script>
import bottomTab from "@/components/bottom-tab/bottomTab";
import togive188 from "@/components/togive188/index";
import { mapState } from "vuex";

export default {
  data () {
    return {
      redBall: true,
      // 已将全部数据搬至 store 文件夹；按后端接口命名文件
      football_info: {
        game: "FT",
        all: 0 // 0 为只请求最近一场比赛, 1 为请求最近三天比赛
      },
      type: ["dlc", "JXK3", "3d", "ssq", "dlt", "jczq"],
      typeIndex: 0
    };
  },
  components: {
    bottomTab,
    togive188
  },
  computed: {
    ...mapState({
      periodInfo: state => state.period_info.periodInfo,
      zqResult: state => state.match.zq_result[0]
    })
  },
  filters: {
    DateTime (strDate) {
      let date = new Date(strDate.replace(/-/g, "/"));
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      return y + "-" + m + "-" + d;
    }
  },
  mounted () { },
  created () {
    // 拉取数字彩结果
    this.$store.dispatch("getPeriodInfo");
    // 足球竞彩结果
    this.$store.dispatch("getMatchResult", this.football_info);
  },
  methods: {
    DateTime (strDate) {
      let date = new Date(strDate);
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      return y + "-" + m + "-" + d;
    },
    getHomeTeam (team) {
      return team.split(":")[0];
    },
    getRoadTeam (team) {
      return team.split(":")[1];
    },
    typeFnc (i) {
      this.typeIndex = i;
      switch (i) {
        case 0:
          this.type = ["dlc", "JXK3", "3d", "ssq", "dlt", "jczq"];
          break;
        case 1:
          this.type = ["jczq"];
          break;
        case 2:
          this.type = ["3d", "ssq", "dlt"];
          break;
        case 3:
          this.type = ["dlc", "JXK3"];
          break;
      }
    }
    // Balls(lottery_alias,bonus_code,index){
    //   console.log("lottery_alias: "+lottery_alias);
    //   console.log("bonus_code: "+bonus_code);
    //   var balls = bonus_code.split("#");
    //   var reds = balls[0].split(",");
    //   console.log("index: "+index);
    //   console.log("111value: "+this.value);
    //   console.log("111index: "+this.index);

    //   if(lottery_alias == "ssq" || lottery_alias == "dlt"){
    //     console.log("222index: "+index);
    //     var blues = balls[1].split(",");
    //     var ball = reds.concat(blues);
    //     // if(index > reds.length){
    //       this.redBall = false
    //     // }
    //     return ball;
    //   } else {
    //     return reds;
    //   }
    // }
  }
};
</script>

<style lang="scss" scoped>
.m-open-list a {
  display: block;
}
.header-nav {
  position: fixed;
  z-index: 999;
  top: 3.8rem;
  width: 100%;
  height: 3.25rem;
  line-height: 3.25rem;
  background: #fff;
  align-content: center;
  font-size: 1.33rem;
  box-shadow: 0 2px 10px #ddd;
  -webkit-box-shadow: 0 2px 10px #ddd;
  li {
    flex: 1;
    span {
      padding: 0 5%;
      height: 98%;
      display: inline-block;
    }
  }
  li.active {
    span {
      border-bottom: 1px solid red;
      color: red;
    }
  }
}
.m-open-list-info {
  width: 100%;
  top: 55%;
  left: 0;
  padding-left: 1.5rem;
  .lottery_name {
    width: 15%;
    display: inline-block;
  }
  .balls {
    font-size: 1.17rem;
    img {
      width: 2rem;
    }
    em {
      width: 2.92rem;
      height: 2.92rem;
      line-height: 2.92rem;
      font-size: 1.5rem;
    }
  }
  h3 {
    font-weight: normal;
  }
}

.m-open-list i {
  font-size: 1.5rem;
  color: #ccc;
}

.zuqiubj {
  height: 2.54rem;
  display: inline-block;
  color: #fff;
  width: 70%;
  border-radius: 1.27rem;
  line-height: 2.54rem;
  text-align: center;
}
</style>
