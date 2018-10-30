/**
 * author: stephentian
 * email: stephentian@foxmail.com
 * day: 2018-10-29
 **/

import Vue from "vue";
import Vuex from "vuex";
import common from "./modules/common";
import query from "./modules/query";
import period from "./modules/period";
import period_info from "./modules/period_info";
import order from "./modules/order";
import userOrder from "./modules/userOrder";
import login from "./modules/login";
import recharge from "./modules/recharge";
import user from "./modules/user";
import ssq from "./modules/ssq";
import dlt from "./modules/dlt";
import d3 from "./modules/d3";
import dlc from "./modules/dlc";
import jxk3 from "./modules/jxk3";
import activity from "./modules/activity";
import jczq from "./modules/jczq";
import match from "./modules/match";
import trend from "./modules/trend";
import more_select from "./modules/more_select";

Vue.use(Vuex);

const state = {};

export default new Vuex.Store({
  state,
  modules: {
    common,
    query,
    period,
    period_info,
    order,
    userOrder,
    login,
    recharge,
    user,
    ssq,
    dlt,
    d3,
    dlc,
    jxk3,
    activity,
    jczq,
    match,
    trend,
    more_select
  }
});
