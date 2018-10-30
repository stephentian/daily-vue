// 奖期开奖结果查询

export default {
  state: {
    errno: '0',
    errmsg: '系统处理成功',
    data: [
      {
        name: '双色球', // 彩票名
        lottery_alias: 'ssq', // 彩票简称
        lottery_period: '18010512', // 彩期
        stop_day: '2018-01-05', // 开奖日期
        stop_week: '周一',
        // bonus_code: 01, 19, 25,26,27,33,10 // 开奖号码
        // 将接受的 中奖号码 进行数据处理，切割字符串，返回数组
        bonus_code: ['01', '19', '25', '26', '27', '33', '10'],
        seles_money: 1100, // 销售奖金
        bonus_money: 1200 // 奖金
      },
      {
        name: '大乐透',
        lottery_alias: 'dlt',
        lottery_period: '17139',
        stop_day: '2018-01-05',
        stop_week: '周二',
        bonus_code: ['02', '06', '19', '25', '32', '09', '12'],
        seles_money: 2100,
        bonus_money: 2200
      },
      {
        name: '福彩3D',
        lottery_alias: '3d',
        lottery_period: '171390',
        stop_day: '2018-01-05',
        stop_week: '周三',
        bonus_code: ['32', '09', '12'],
        seles_money: 2100,
        bonus_money: 2200
      },
      {
        name: '新快3',
        lottery_alias: 'jxk3',
        lottery_period: '17139',
        stop_day: '2018-01-05',
        stop_week: '周四',
        bonus_code: ['19', '25', '32'],
        seles_money: 2100,
        bonus_money: 2200
      },
      {
        name: '11选5',
        lottery_alias: 'dlc',
        lottery_period: '117139',
        stop_day: '2018-01-05',
        stop_week: '周五',
        bonus_code: ['19', '25', '32', '09', '12'],
        seles_money: 2100,
        bonus_money: 2200
      }
    ]
  }
}
