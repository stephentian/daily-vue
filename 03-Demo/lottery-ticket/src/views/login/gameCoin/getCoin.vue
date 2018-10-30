<template>
  <div style="width: 100%;height: 100%;">
    <div class="shadow"
         v-bind:style="{display:this.display}"></div>
    <p class="warning-tip"
       id="warning_tip"
       style="display:none;"></p>
    <header class="m-top box-shadow"
            :style="{display:this.header}"
            v-if="topShow">
      <h2 class="m-top-title tal ml20">
        <i class="iconfont icon-arrow-left mr10"
           @click="back"></i>
        <span>兑换游戏币</span>
      </h2>
    </header>
    <div class="header-top-space"
         v-if="topShow"></div>
    <div class="box"
         :style="{top:this.top}">
      <div id="getCoin">
        <div class="getCoinImg">
          <div class="gametop"
               @click="handleHref">
            <div class="gametopImg">
              <span class="downbtn"></span>
              <!-- <a class="downbtn" href="http://h5.2217.com/game/1042/login/life/h5" v-if="Ios==='isIOS'"></a> -->
              <!-- <a class="downbtn" href="http://cdn.pkg.xiangwanwan.com/h5/pkg/hezi/hezi_life_frfxz.apk" v-else></a> -->
            </div>
          </div>
          <div class="rule">
            <ol>
              <li>1.每充值1元获得10个游戏币</li>
              <li>2.专属礼包需用游戏币兑换</li>
              <li>3.单个游戏id每个礼包仅可使用一次</li>
            </ol>
          </div>
          <div class="account">
            账户余额：{{game_coin}}游戏币
          </div>
          <div class="exchange">
            <ul class="exchangeUl">
              <li class="exchangeLi"
                  v-for="(item,index) in prizeList"
                  :key="index">
                <div class="treasure"
                     @click="ExplainClick(index)">
                  <img :src=item.img
                       alt="">
                  <p class="count">{{item.exchangeMoney}}游戏币</p>
                </div>
                <div class="exchangeBut">
                  <template v-if="game_coin">
                    <div class="exchangeButCom"
                         v-if="Number(game_coin) < Number(item.exchangeMoney)">
                      <span class="exchangeButImg tabbg_default">游戏币不足</span>
                    </div>
                    <div class="exchangeButCom"
                         v-else>
                      <span class="exchangeButImg tabbg_active"
                            @click="exchangeClick(item.exchangeMoney)">立即兑换</span>
                    </div>
                  </template>
                  <template v-else>
                    <div class="exchangeButCom">
                      <span class="exchangeButImg tabbg_default">游戏币不足</span>
                    </div>
                  </template>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="Popup"
         v-show="ExplainShow">
      <div class="PopupCon">
        <div class="PopupImg"></div>
        <div class="Popuptitle">{{title}}</div>
        <div class="Popupcontent">{{text}}</div>
        <div class="ClosePopup"
             @click="ClosePopup">{{close}}</div>
      </div>
    </div>
    <div class="Popup"
         v-show="exchangeShow">
      <div class="PopupCon">
        <div class="PopupImg"></div>
        <div class="Popuptitle">{{title}}</div>
        <div class="exchangecontent">{{text}}
          <div class="exchangeCode">
            {{copyData}}
          </div>
        </div>
        <div class="ClosePopup"
             v-clipboard="copyData"
             @success="handleSuccess"
             @error="handleError">{{close}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import axios from "axios";
import VueClipboard from "vue-clipboards";
import api from "@/api/api";
import "../../../../public/css/tg.css";
Vue.use(VueClipboard);
export default {
  name: "",
  data() {
    return {
      prizeList: [
        {
          img:
            "https://cstatic.duoduocp.cn/cdd/p/active/exchangecoin/icon1.png",
          exchangeMoney: "20",
          prize_id: 1
        },
        {
          img:
            "https://cstatic.duoduocp.cn/cdd/p/active/exchangecoin/icon2.png",
          exchangeMoney: "100",
          prize_id: 2
        },
        {
          img:
            "https://cstatic.duoduocp.cn/cdd/p/active/exchangecoin/icon3.png",
          exchangeMoney: "500",
          prize_id: 3
        },
        {
          img:
            "https://cstatic.duoduocp.cn/cdd/p/active/exchangecoin/icon4.png",
          exchangeMoney: "1000",
          prize_id: 4
        },
        {
          img:
            "https://cstatic.duoduocp.cn/cdd/p/active/exchangecoin/icon5.png",
          exchangeMoney: "2000",
          prize_id: 5
        },
        {
          img:
            "https://cstatic.duoduocp.cn/cdd/p/active/exchangecoin/icon6.png",
          exchangeMoney: "5000",
          prize_id: 6
        }
      ],
      prizeExplain: [
        {
          text: "元宝*588，铜钱*588888",
          title: "青铜礼包"
        },
        {
          text: "元宝*500,强化石*100",
          title: "白银礼包"
        },
        {
          text: "仙侣培养石*50，仙宠培养石*50",
          title: "黄金礼包"
        },
        {
          text: "乾坤币*10,真气*800000",
          title: "铂金礼包"
        },
        {
          text: "仙侣培养石*30,仙侣炼神丹*1,仙宠培养石*30,仙宠炼神丹*1",
          title: "钻石礼包"
        },
        {
          text: "元宝*400,升星石*5,强化石*500",
          title: "王者礼包"
        }
      ],
      ExplainShow: false,
      display: "none",
      title: "",
      text: "",
      close: "",
      exchangeShow: false,
      game_coin: "",
      copyData: "",
      Ios: "",
      android: "",
      user_id: "",
      token: "",
      header: "block",
      top: "",
      topShow: true
    };
  },
  mounted() {
    if (
      navigator.userAgent.includes("cdd_ios") ||
      navigator.userAgent.includes("cdd_android")
    ) {
      this.topShow = false;
    } else {
      this.topShow = true;
    }
    setTimeout(() => {
      this.getGame_coin();
      this.JudgeService();
    }, 2000);
  },
  methods: {
    JudgeService() {
      let u = navigator.userAgent;
      let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      if (isIOS) {
        this.Ios = "isIOS";
      }
    },
    back() {
      this.$router.go(-1);
    },
    getGame_coin() {
      this.android = window.location.href.indexOf("=android");
      if (this.android !== -1) {
        this.user_id = android.getUserId();
        this.token = android.getToken();
        axios.defaults.headers.post["Content-Type"] =
          "application/x-www-form-urlencoded;charset=UTF-8";
        axios.defaults.headers.common["x-cdd-jwt"] = this.token
          ? this.token
          : "";
        this.header = "none";
        this.top = "0px";
      } else {
        this.user_id = localStorage.user_id;
        axios.defaults.headers.post["Content-Type"] =
          "application/x-www-form-urlencoded;charset=UTF-8";
        axios.defaults.headers.common["x-cdd-jwt"] = localStorage.token
          ? localStorage.token
          : "";
      }
      // localStorage.setItem('w1', this.user_id)
      api
        .userInfo({
          user_id: this.user_id
        })
        .then(res => {
          if (Number(res.errno) === 0) {
            this.game_coin = res.data.game_coin;
          }
        });
    },
    ExplainClick(index) {
      this.title = this.prizeExplain[index].title;
      this.text = this.prizeExplain[index].text;
      this.display = "block";
      this.ExplainShow = true;
      this.close = "关闭";
    },
    exchangeClick(exchangeMoney) {
      this.android = window.location.href.indexOf("=android");
      if (this.android !== -1) {
        this.user_id = android.getUserId();
        this.token = android.getToken();
        axios.defaults.headers.post["Content-Type"] =
          "application/x-www-form-urlencoded;charset=UTF-8";
        axios.defaults.headers.common["x-cdd-jwt"] = this.token
          ? this.token
          : "";
      } else {
        this.user_id = localStorage.user_id;
      }
      api
        .exchange({
          user_id: this.user_id,
          card_face: Number(exchangeMoney)
        })
        .then(res => {
          if (Number(res.errno) === 0) {
            this.title = "领取礼包";
            this.text = "礼包码";
            this.close = "复制";
            this.display = "block";
            this.exchangeShow = true;
            this.copyData = res.data;
          }
          this.getGame_coin();
        });
    },
    ClosePopup() {
      this.display = "none";
      this.ExplainShow = false;
    },
    warningTip(message, time) {
      document.getElementById("warning_tip").innerText = message;
      document.getElementById("warning_tip").style.display = "block";
      setTimeout(function() {
        document.getElementById("warning_tip").style.display = "none";
      }, time);
    },
    handleSuccess(e) {
      this.display = "none";
      this.exchangeShow = false;
      this.warningTip("复制成功", 3000);
    },
    handleError(e) {
      this.warningTip("复制失败", 3000);
    },
    handleHref() {
      if (this.Ios === "isIOS") {
        try {
          // ios
          window.webkit.messageHandlers.iosBannerIndex.postMessage(
            "https://h5.2217.com/game/1042/login/life/h5"
          );
        } catch (err) {
          // h5
          window.open("https://h5.2217.com/game/1042/login/life/h5");
        }
      } else {
        this.android = window.location.href.indexOf("=android");
        if (this.android !== -1) {
          android.goto_Sys_webview(
            "https://cdn.pkg.xiangwanwan.com/h5/pkg/hezi/hezi_life_frfxz.apk"
          );
        } else {
          window.location.href =
            "https://cdn.pkg.xiangwanwan.com/h5/pkg/hezi/hezi_life_frfxz.apk";
        }
      }
    }
  }
};
</script>
