<template>
  <div class="index-popup layoutFlex"
       v-if="popShow && bonus_pop && requestFlag">
    <div>
      <img src="../../../public/images/win_model.png"
           alt="">
      <span class="lotteryName tac">
        喜中{{bonus_pop | type}}
      </span>
      <span class="balance tac">
        <span class="red">{{bonus_pop ? bonus_pop.split('#')[1]: ''}}</span> 元
      </span>
      <span class="record"
            @click="recordFnc">

      </span>
      <span class="close"
            @click="closeFnc">

      </span>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import store from "@/store/index.js";
export default {
  name: "index-popup",
  data() {
    return {
      popShow: true,
      requestFlag: false
    };
  },
  filters: {
    type(v) {
      if (v) {
        let b = v.split("#")[0];
        let b1 = "";
        switch (b) {
          case "jczq":
            b1 = "竞彩足球";
            break;
          case "ssq":
            b1 = "双色球";
            break;
          case "dlt":
            b1 = "大乐透";
            break;
          case "dlc":
            b1 = "11选5";
            break;
          case "3d":
            b1 = "福彩3d";
            break;
          case "JXK3":
            b1 = "新快3";
            break;
        }
        return b1;
      }
    }
  },
  computed: {
    ...mapState({
      bonus_pop: state => {
        return state.query.bonus_pop;
      }
    })
  },
  created() {
    let u = localStorage.getItem("user_id")
      ? localStorage.getItem("user_id")
      : "";
    this.$store.dispatch("getBonus_pop", { user_id: u }).then(() => {
      this.requestFlag = true;
    });
  },
  methods: {
    recordFnc() {
      this.requestFlag = false;
      store.commit("PAY_BONUSPOP", "");
      setTimeout(() => {
        if (this.bonus_pop.includes("jczq")) {
          this.$router.push({ path: "zqWin" });
        } else {
          this.$router.push({ path: "win" });
        }
      }, 100);
    },
    closeFnc() {
      this.popShow = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.index-popup {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  z-index: 9999;
}
.index-popup {
  align-items: center;
  justify-content: center;
  div {
    position: relative;
    width: 90%;
    > img {
      width: 100%;
    }
  }
  .lotteryName {
    position: absolute;
    height: 2.5rem;
    line-height: 2.5rem;
    font-size: 1.3rem;
    left: 30%;
    top: 44%;
    width: 40%;
  }
  .balance {
    position: absolute;
    height: 2.5rem;
    line-height: 2.5rem;
    font-size: 1.3rem;
    left: 30%;
    top: 52%;
    width: 40%;
  }
  .record {
    position: absolute;
    height: 3rem;
    left: 30%;
    top: 89%;
    width: 40%;
  }
  .close {
    position: absolute;
    width: 2rem;
    height: 2rem;
    right: 1rem;
    top: 0;
  }
}
</style>
