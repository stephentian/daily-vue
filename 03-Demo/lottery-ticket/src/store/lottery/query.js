// 获取彩种的开通状态

export default {
  state: {
    data: [
      {
        id: 1,
        lottery_name: '大乐透', // 彩种名称
        lottery_alias: 'dlt', // 彩票简称
        lottery_type: 2, // 1：普通彩，2：高频彩，3：竞彩
        description: '3元1600万', // 描述
        status: 1 // 0：下线，1：上线，2：暂停
      },
      {
        id: 2,
        lottery_name: '双色球', // 彩种名称
        lottery_alias: 'ssq', // 彩票简称
        lottery_type: 2, // 1：普通彩，2：高频彩，3：竞彩
        description: '大奖等你来拿！', // 描述
        status: 1 // 0：下线，1：上线，2：暂停
      },
      {
        id: 3,
        lottery_name: '福彩3D', // 彩种名称
        lottery_alias: '3d', // 彩票简称
        lottery_type: 2, // 1：普通彩，2：高频彩，3：竞彩
        description: '天天开奖', // 描述
        status: 1 // 0：下线，1：上线，2：暂停
      },
      {
        id: 4,
        lottery_name: '快3', // 彩种名称
        lottery_alias: 'jxk3', // 彩票简称
        lottery_type: 2, // 1：普通彩，2：高频彩，3：竞彩
        description: '敬请期待', // 描述
        status: 1 // 0：下线，1：上线，2：暂停
      },
      {
        id: 5,
        lottery_name: '排列3', // 彩种名称
        lottery_alias: 'pls', // 彩票简称
        lottery_type: 2, // 1：普通彩，2：高频彩，3：竞彩
        description: '敬请期待', // 描述
        status: 1 // 0：下线，1：上线，2：暂停
      },
      {
        id: 6,
        lottery_name: '排列5', // 彩种名称
        lottery_alias: 'plw', // 彩票简称
        lottery_type: 2, // 1：普通彩，2：高频彩，3：竞彩
        description: '敬请期待', // 描述
        status: 1 // 0：下线，1：上线，2：暂停
      },
      {
        id: 7,
        lottery_name: '东方6+1', // 彩种名称
        lottery_alias: 'dfljy', // 彩票简称
        lottery_type: 2, // 1：普通彩，2：高频彩，3：竞彩
        description: '敬请期待', // 描述
        status: 1 // 0：下线，1：上线，2：暂停
      },
      {
        id: 8,
        lottery_name: '11选5', // 彩种名称
        lottery_alias: 'dlc', // 彩票简称
        lottery_type: 2, // 1：普通彩，2：高频彩，3：竞彩
        description: '每天84期', // 描述
        status: 1 // 0：下线，1：上线，2：暂停
      },
      {
        id: 9,
        lottery_name: '15选5', // 彩种名称
        lottery_alias: 'swxw', // 彩票简称
        lottery_type: 2, // 1：普通彩，2：高频彩，3：竞彩
        description: '敬请期待', // 描述
        status: 1 // 0：下线，1：上线，2：暂停
      },
      {
        id: 10,
        lottery_name: '竞彩篮球', // 彩种名称
        lottery_alias: 'jclq', // 彩票简称
        lottery_type: 2, // 1：普通彩，2：高频彩，3：竞彩
        description: '敬请期待', // 描述
        status: 1 // 0：下线，1：上线，2：暂停
      },
      {
        id: 11,
        lottery_name: '竞彩足球', // 彩种名称
        lottery_alias: 'jczq', // 彩票简称
        lottery_type: 2, // 1：普通彩，2：高频彩，3：竞彩
        description: '敬请期待', // 描述
        status: 1 // 0：下线，1：上线，2：暂停
      }
    ],
    errmsg: '系统处理成功',
    errno: '0' // 0：成功，其他失败
  }
}
