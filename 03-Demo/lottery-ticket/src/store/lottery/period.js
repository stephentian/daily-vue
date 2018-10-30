// 彩种奖期信息查询

export default {
  data: {
    lottery_alias: 'dlt', // 彩票简称
    lottery_period: 18011008, // 彩票奖期
    lottery_start_time: '2018-01-10 10:07:00', // 奖期开始时间
    lottery_stop_time: '2018-01-10 10:17:00', // 奖期结束时间
    period_status: 1, // 奖期状态，0：未开启投注，1：开启投注，2：停止投注
    period_remain_second: 461 // 当前奖期剩余时间（秒）
  },
  errmsg: '系统处理成功',
  errno: '0'
}
