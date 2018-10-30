// 投注接口

export default {
  state: {
    errno: 0,
    errmsg: '系统处理成功',
    data: [{
      lottery_alias: 'dlc',
      lottery_period: '18010512', // 期数
      start_time: '2018-01-05 19:49:25', // 结束时间
      stop_time: '2018-01-05 19:59:25',
      status: 1 // 0：未开启，1：开启新奖期
    }]
  }
}
