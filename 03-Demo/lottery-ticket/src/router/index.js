/**
 * author: stephentian
 * email: stephentian@foxmail.com
 * day: 2018-10-29
 **/

import Vue from "vue";
import Router from "vue-router";
import store from "../store";

// const app = resolve => require(['@/App'])
// 购彩（首页）
const home = resolve => require(["@/views/home/Home"], resolve);
// const home1 = resolve => require(['@/views/home/home1'], resolve)
// 红包活动
const redBag = resolve => require(["@/views/home/redpacket"], resolve);
// 大乐透
const dlt = resolve => require(["@/views/home/dlt/dlt"], resolve);
// 大乐透投注单
const dltcart = resolve => require(["@/views/home/dltcart/dltcart"], resolve);
// 大乐透投注详情
const dltdetail = resolve =>
  require(["@/views/home/dltdetail/dltdetail"], resolve);
// 双色球
const ssq = resolve => require(["@/views/home/ssq/ssq"], resolve);
// 双色球投注单
const ssqcart = resolve => require(["@/views/home/ssqcart/ssqcart"], resolve);
// 双色球投注详情
const ssqdetail = resolve =>
  require(["@/views/home/ssqdetail/ssqdetail"], resolve);
// 11选5
const dlc = resolve => require(["@/views/home/dlc/dlc"], resolve);
// 11选5投注单
const dlccart = resolve => require(["@/views/home/dlccart/dlccart"], resolve);
// 11选5投注详情
const dlcdetail = resolve =>
  require(["@/views/home/dlcdetail/dlcdetail"], resolve);
// 福彩3D
const d3 = resolve => require(["@/views/home/d3/d3"], resolve);
// 福彩3D投注单
const d3cart = resolve => require(["@/views/home/d3cart/d3cart"], resolve);
// 福彩3D投注详情
const d3detail = resolve =>
  require(["@/views/home/d3detail/d3detail"], resolve);
// 江西快3
const jxk3 = resolve => require(["@/views/home/jxk3/jxk3"], resolve);
// 江西快3投注单
const jxk3cart = resolve =>
  require(["@/views/home/jxk3cart/jxk3cart"], resolve);
// 江西快3投注详情
const jxk3detail = resolve =>
  require(["@/views/home/jxk3detail/jxk3detail"], resolve);

// 排列 3
const pl3 = resolve => require(["@/views/home/pls"], resolve);
// 排列 5
const pl5 = resolve => require(["@/views/home/plw"], resolve);
// 东方 6+1
const dfljy = resolve => require(["@/views/home/dfljy"], resolve);
// 15选5
const swxw = resolve => require(["@/views/home/swxw"], resolve);
// 竞彩蓝球
const jclq = resolve => require(["@/views/home/jclq"], resolve);
// 竞彩足球
const jczq = resolve => require(["@/views/home/jczq/jczq"], resolve);
// 竞彩足球投注单
const jczqcart = resolve =>
  require(["@/views/home/jczqcart/jczqcart"], resolve);
// 竞彩足球投注详情
const jczqdetail = resolve =>
  require(["@/views/home/jczqdetail/jczqdetail"], resolve);
// 竞彩足球数据分析
const jczqAnalysis = resolve =>
  require(["@/views/home/jczqanalysis/jczqAnalysis"], resolve);
// 竞彩足球数据分析（分析）
const jczqHistory = resolve =>
  require(["@/views/home/jczqanalysis/jczqHistory"], resolve);
// 竞彩足球数据分析（赔率）
const jczqRate = resolve =>
  require(["@/views/home/jczqanalysis/jczqRate"], resolve);
// 竞彩足球数据分析（积分）
const jczqPoint = resolve =>
  require(["@/views/home/jczqanalysis/jczqPoint"], resolve);
// 资讯页面
const info = resolve => require(["@/views/home/info/index"], resolve);
// 号码趋势
const trend = resolve => require(["@/views/home/trend/index"], resolve);
// 胆拖说明
const dtInfo = resolve => require(["@/components/dtInfo/dtInfo"], resolve);
// 投注失败
const fail = resolve => require(["@/views/home/fail/fail"], resolve);
// 投注成功
const success = resolve => require(["@/views/home/success/success"], resolve);
// 彩票服务协议
const agreement = resolve =>
  require(["@/views/home/agreement/agreement"], resolve);
// 公用公告
const comNotice = resolve => require(["@/views/common/comNotice"], resolve);
// 双色球玩法说明
const ssqWay = resolve => require(["@/views/common/ssqWay"], resolve);
// 大乐透玩法说明
const dltWay = resolve => require(["@/views/common/dltWay"], resolve);
// 福彩3D玩法说明
const fc3dWay = resolve => require(["@/views/common/fc3dWay"], resolve);
// 江西快3玩法说明
const jxk3Way = resolve => require(["@/views/common/jxk3Way"], resolve);
// 11选5玩法说明
const dlcWay = resolve => require(["@/views/common/dlcWay"], resolve);
// 竞彩足球玩法说明
const jczqWay = resolve => require(["@/views/common/jczqWay"], resolve);

// 开奖
const open = resolve => require(["@/views/open/open"], resolve);
// 开奖通知
const notice = resolve => require(["@/views/open/notice/notice"], resolve);
// 开奖结果（双色球）
const ssqresult = resolve =>
  require(["@/views/open/result/ssqresult"], resolve);
// 开奖结果（大乐透）
const dltresult = resolve =>
  require(["@/views/open/result/dltresult"], resolve);
// 开奖结果（福彩3D）
const d3result = resolve => require(["@/views/open/result/d3result"], resolve);
// 开奖结果（十一选五）
const dlcresult = resolve =>
  require(["@/views/open/result/dlcresult"], resolve);
// 开奖结果（新快3）
const jxk3result = resolve =>
  require(["@/views/open/result/jxk3result"], resolve);
// 开奖结果（竞彩足球）
const jczqresult = resolve =>
  require(["@/views/open/result/jczqresult"], resolve);
// 开奖详情
const award = resolve => require(["@/views/open/award/index"], resolve);

// 我的（未登录）
const signout = resolve => require(["@/views/signout/signout"], resolve);
// 注册
const register = resolve =>
  require(["@/views/signout/register/register"], resolve);
// 账号登录
const comLogin = resolve =>
  require(["@/views/signout/comLogin/comLogin"], resolve);
// 快捷登录
const fastLogin = resolve =>
  require(["@/views/signout/fastLogin/fastLogin"], resolve);
// 输入验证码
const validate = resolve =>
  require(["@/views/signout/validate/validate"], resolve);
// 重置信息
const reset = resolve => require(["@/views/signout/reset/reset"], resolve);

// 我的（已登录）
const login = resolve => require(["@/views/login/login"], resolve);
// 设置
const set = resolve => require(["@/views/login/set/set"], resolve);
// 关于
const about = resolve => require(["@/views/login/set/about"], resolve);
// 修改登录密码
const change = resolve => require(["@/views/login/set/change"], resolve);
// 帮助中心
const help = resolve => require(["@/views/login/set/help/index"], resolve);
// 常见问题
const commonIssue = resolve =>
  require(["@/views/login/set/help/commonIssue"], resolve);
// 支付问题
const addIssue = resolve =>
  require(["@/views/login/set/help/addIssue"], resolve);
// 兑奖问题
const winIssue = resolve =>
  require(["@/views/login/set/help/winIssue"], resolve);
// 游戏币明细
const gameCoin = resolve => require(["@/views/login/gameCoin"], resolve);
// 兑换游戏币
const getCoin = resolve => require(["@/views/login/gameCoin/getCoin"], resolve);
// accountdetail 账户明细（积分明细）
const account = resolve => require(["@/views/login/account"], resolve);
// 追号管理（进行中）
const betting = resolve => require(["@/views/login/betchase/betting"], resolve);
// 追号管理（已完结）
const beted = resolve => require(["@/views/login/betchase/beted"], resolve);
// betchasedetail 追号详情
const betInfo = resolve => require(["@/views/login/betInfo/betInfo"], resolve);
// 3d 追号详情
const d3More = resolve => require(["@/views/login/betInfo/d3More"], resolve);
// 大乐透 追号详情
const dltMore = resolve => require(["@/views/login/betInfo/dltMore"], resolve);
// 多乐彩 追号相亲
const dlcMore = resolve => require(["@/views/login/betInfo/dlcMore"], resolve);
// 江西快3 追号详情
const jxk3More = resolve =>
  require(["@/views/login/betInfo/jxk3More"], resolve);
// 双色球 追号详情
const ssqMore = resolve => require(["@/views/login/betInfo/ssqMore"], resolve);
// 支付（暂时不使用）
const betPay = resolve => require(["@/views/login/betPay"], resolve);
// 投注记录（全部）
const comRecord = resolve =>
  require(["@/views/login/betRecord/index"], resolve);
const zqRecord = resolve =>
  require(["@/views/login/betRecord/zqRecord"], resolve);
// 投注记录（中奖）
const comWin = resolve =>
  require(["@/views/login/betRecord/win/index"], resolve);
const zqWin = resolve =>
  require(["@/views/login/betRecord/win/zqWin"], resolve);
// 投注记录（待开奖）
const comWait = resolve =>
  require(["@/views/login/betRecord/wait/index"], resolve);
const zqWait = resolve =>
  require(["@/views/login/betRecord/wait/zqWait"], resolve);
// 待支付
const comWaitPay = resolve =>
  require(["@/views/login/betRecord/waitPay/index"], resolve);
const zqWaitPay = resolve =>
  require(["@/views/login/betRecord/waitPay/zqWaitPay"], resolve);
// 投注记录（未开奖）
const comLose = resolve =>
  require(["@/views/login/betRecord/lose/index"], resolve);
const zqLose = resolve =>
  require(["@/views/login/betRecord/lose/zqLose"], resolve);
// 优惠券记录
const coupon = resolve => require(["@/views/login/coupon"], resolve);
// 优惠券记录历史
const couponUsed = resolve =>
  require(["@/views/login/coupon/couponUsed"], resolve);
// 充值
const recharge = resolve =>
  require(["@/views/login/recharge/recharge"], resolve);
// 充值失败
const rechargeFail = resolve =>
  require(["@/views/login/recharge/fail"], resolve);
// 充值成功
const rechargeSuc = resolve =>
  require(["@/views/login/recharge/success"], resolve);
// 支付支付
// 微信二维码支付
const qrCode = resolve => require(["@/views/login/recharge/qrCode"], resolve);

const aliSuccess = resolve =>
  require(["@/views/login/recharge/aliSuccess"], resolve);

// 支付宝二维码支付
const aliPay = resolve => require(["@/views/login/recharge/aliPay"], resolve);
// 提现
const cash = resolve => require(["@/views/login/cash/cash"], resolve);
// 提现记录
const cashRecord = resolve =>
  require(["@/views/login/cash/cashRecord"], resolve);
// 提现失败
const cashFail = resolve => require(["@/views/login/cash/fail"], resolve);
// 支付详情页面
const payDetail = resolve => require(["@/views/home/pay/pay"], resolve);
// 提现成功
const cashSuc = resolve => require(["@/views/login/cash/success"], resolve);
// 个人信息
const user = resolve => require(["@/views/login/user/user"], resolve);
// 个人信息-实名认证(已认证)
const userName = resolve => require(["@/views/login/user/name"], resolve);
// 个人信息-实名认证（未认证）
const nameComfirm = resolve =>
  require(["@/views/login/user/nameComfirm"], resolve);
// 个人信息-银行卡信息
const userBank = resolve => require(["@/views/login/user/bank"], resolve);
// 个人信息- 绑定银行卡
const bankComfirm = resolve =>
  require(["@/views/login/user/bankComfirm"], resolve);
// 微信支付跳转页
const rechargePage = resolve =>
  require(["@/views/login/recharge/rechargePage"], resolve);
// 我的分享
const share = resolve => require(["@/views/login/share/share"], resolve);

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: home
    },
    // {
    //   path: '/home1',
    //   name: '/home1',
    //   component: home1
    // },
    {
      path: "/redBag",
      name: "/redBag",
      component: redBag
    },
    {
      path: "/dlt",
      name: "dlt",
      component: dlt
    },
    {
      path: "/dltcart",
      name: dltcart,
      component: dltcart,
      meta: {
        requireAuth: true
      }
    },
    {
      path: "/dltdetail",
      component: dltdetail
    },
    {
      path: "/ssq",
      name: "ssq",
      component: ssq
    },
    {
      path: "/ssqcart",
      name: "ssqcart",
      component: ssqcart,
      meta: {
        requireAuth: true
      }
    },
    {
      path: "/ssqdetail",
      component: ssqdetail
    },
    {
      path: "/dlc",
      name: "dlc",
      component: dlc
    },
    {
      path: "/dlccart",
      name: "dlccart",
      component: dlccart,
      meta: {
        requireAuth: true
      }
    },
    {
      path: "/dlcdetail",
      component: dlcdetail
    },
    {
      path: "/3d",
      name: "3d",
      component: d3
    },
    {
      path: "/d3cart",
      name: "d3cart",
      component: d3cart,
      meta: {
        requireAuth: true
      }
    },
    {
      path: "/3ddetail",
      component: d3detail
    },
    {
      path: "/JXK3",
      name: "JXK3",
      component: jxk3
    },
    {
      path: "/JXK3cart",
      name: "jxk3cart",
      component: jxk3cart,
      meta: {
        requireAuth: true
      }
    },
    {
      path: "/JXK3detail",
      component: jxk3detail
    },
    {
      path: "/pl3",
      name: "pl3",
      component: pl3
    },
    {
      path: "/pl5",
      name: "pl5",
      component: pl5
    },
    {
      path: "/dfljy",
      name: "dfljy",
      component: dfljy
    },
    {
      path: "/swxw",
      name: "swxw",
      component: swxw
    },
    {
      path: "/jclq",
      name: "jclq",
      component: jclq
    },
    {
      path: "/jczq",
      name: "jczq",
      component: jczq,
      meta: {
        keepAlive: true
      }
    },
    {
      path: "/jczqcart",
      name: "jczqcart",
      component: jczqcart,
      meta: {
        requireAuth: true
      }
    },
    {
      path: "/jczqdetail",
      component: jczqdetail
    },
    {
      path: "/jczqAnalysis",
      name: "jczqAnalysis",
      component: jczqAnalysis
    },
    {
      path: "/jczqHistory",
      name: "jczqHistory",
      component: jczqHistory
    },
    {
      path: "/jczqPoint",
      name: "jczqPoint",
      component: jczqPoint
    },
    {
      path: "/jczqRate",
      name: "jczqRate",
      component: jczqRate
    },
    {
      path: "/info",
      name: "info",
      component: info
    },
    {
      path: "/trend",
      name: "trend",
      component: trend
    },
    {
      path: "/dtInfo",
      name: "dtInfo",
      component: dtInfo
    },
    {
      path: "/fail",
      component: fail
    },
    {
      path: "/success",
      component: success
    },
    {
      path: "/agreement",
      name: "agreement",
      component: agreement
    },
    {
      path: "/open",
      name: "open",
      component: open
    },
    {
      path: "/open/notice",
      component: notice
    },
    {
      path: "/open/ssqresult",
      component: ssqresult
    },
    {
      path: "/open/dltresult",
      component: dltresult
    },
    {
      path: "/open/3dresult",
      component: d3result
    },
    {
      path: "/open/dlcresult",
      component: dlcresult
    },
    {
      path: "/open/jxk3result",
      component: jxk3result
    },
    {
      path: "/open/jczqresult",
      component: jczqresult
    },
    {
      path: "/award/index",
      component: award
    },
    // 游客身份
    {
      path: "/visitor",
      name: "visitor",
      component: signout
    },
    {
      path: "/comlogin",
      name: "comLogin",
      component: comLogin,
      beforeEnter(to, from, next) {
        store.commit("LOGIN_FROM_PATH", from.path);
        next();
      }
    },
    {
      path: "/fastLogin",
      name: "fastLogin",
      component: fastLogin
    },
    {
      path: "/register",
      name: "register",
      component: register
    },
    {
      path: "/validate",
      name: "validate",
      component: validate
    },
    {
      path: "/reset",
      name: "reset",
      component: reset
    },
    {
      path: "/comNotice",
      name: "comNotice",
      component: comNotice
    },
    {
      path: "/ssqWay",
      name: "ssqWay",
      component: ssqWay
    },
    {
      path: "/dltWay",
      name: "dltWay",
      component: dltWay
    },
    {
      path: "/fc3dWay",
      name: "fc3dWay",
      component: fc3dWay
    },
    {
      path: "/jxk3Way",
      name: "jxk3Way",
      component: jxk3Way
    },
    {
      path: "/dlcWay",
      name: "dlcWay",
      component: dlcWay
    },
    {
      path: "/jczqWay",
      name: "jczqWay",
      component: jczqWay
    },

    // 我的（已登录）
    {
      path: "/my",
      name: "my",
      component: login,
      meta: {
        requireAuth: true
      }
    },
    {
      path: "/set",
      name: "set",
      component: set
    },
    {
      path: "/about",
      name: "about",
      component: about
    },
    {
      path: "/change",
      name: "change",
      component: change
    },
    {
      path: "/help",
      name: "help",
      component: help
    },
    {
      path: "/commonIssue",
      name: "commonIssue",
      component: commonIssue
    },
    {
      path: "/addIssue",
      name: "addIssue",
      component: addIssue
    },
    {
      path: "/winIssue",
      name: "winIssue",
      component: winIssue
    },
    {
      path: "/account",
      name: "account",
      component: account
    },
    {
      path: "/gameCoin",
      name: "gameCoin",
      component: gameCoin
    },
    {
      path: "/getCoin",
      name: "getCoin",
      component: getCoin
    },
    {
      path: "/betting",
      name: "betting",
      component: betting
    },
    {
      path: "/beted",
      name: "beted",
      component: beted
    },
    {
      path: "/betInfo/index",
      name: "betInfo",
      component: betInfo
    },
    {
      path: "/3dMore",
      name: "3dMore",
      component: d3More
    },
    {
      path: "/dltMore",
      name: "dltMore",
      component: dltMore
    },
    {
      path: "/dlcMore",
      name: "dlcMore",
      component: dlcMore
    },
    {
      path: "/jxk3More",
      name: "jxk3More",
      component: jxk3More
    },
    {
      path: "/ssqMore",
      name: "ssqMore",
      component: ssqMore
    },
    {
      path: "/betPay",
      name: "/betPay",
      component: betPay
    },
    {
      path: "/betRecord",
      name: "betRecord",
      component: comRecord
    },
    {
      path: "/lose",
      name: "betLose",
      component: comLose
    },
    {
      path: "/wait",
      name: "betWait",
      component: comWait
    },
    {
      path: "/win",
      name: "betWin",
      component: comWin
    },
    {
      path: "/zqRecord",
      name: "zqRecord",
      component: zqRecord
    },
    {
      path: "/zqLose",
      name: "zqLose",
      component: zqLose
    },
    {
      path: "/zqWait",
      name: "zqWait",
      component: zqWait
    },
    {
      path: "/zqWaitPay",
      name: "zqWaitPay",
      component: zqWaitPay
    },
    {
      path: "/comWaitPay",
      name: "comWaitPay",
      component: comWaitPay
    },
    {
      path: "/zqWin",
      name: "zqWin",
      component: zqWin
    },
    {
      path: "/coupon",
      name: "coupon",
      component: coupon
    },
    {
      path: "/couponUsed",
      name: "couponUsed",
      component: couponUsed
    },
    {
      path: "/recharge",
      name: "recharge",
      component: recharge,
      meta: {
        requireAuth: true
      }
    },
    {
      path: "/rechargePage",
      name: "rechargePage",
      component: rechargePage
    },
    {
      path: "/rechargeFail",
      name: "rechargeFail",
      component: rechargeFail
    },
    {
      path: "/rechargeSuc",
      name: "rechargeSuc",
      component: rechargeSuc
    },
    {
      path: "/aliSuccess",
      name: "aliSuccess",
      component: aliSuccess
    },
    {
      path: "/qrCode",
      name: "qrCode",
      component: qrCode
    },
    {
      path: "/aliPay",
      name: "aliPay",
      component: aliPay
    },
    {
      path: "/cash",
      name: "cash",
      component: cash
    },
    {
      path: "/cashRecord",
      name: "cashRecord",
      component: cashRecord
    },
    {
      path: "/cashFail",
      name: "cashFail",
      component: cashFail
    },
    {
      path: "/payDetail",
      name: "payDetail",
      component: payDetail
    },
    {
      path: "/cashSuc",
      name: "cashSuc",
      component: cashSuc
    },
    {
      path: "/user",
      name: "user",
      component: user
    },
    {
      path: "/bank",
      name: "userBank",
      component: userBank
    },
    {
      path: "/bankComfirm",
      name: "bankComfirm",
      component: bankComfirm
    },
    {
      path: "/name",
      name: "userName",
      component: userName
    },
    {
      path: "/nameComfirm",
      name: "nameComfirm",
      component: nameComfirm
    },
    {
      path: "/share",
      name: "share",
      component: share
    },
    {
      path: "/home",
      redirect: "/"
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});
