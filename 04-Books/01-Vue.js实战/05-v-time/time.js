var Time = {
  // 获取当前时间戳
  getUnix: function () {
    var date = new Date()
    return date.getTime()
  },
  // 获取今天 0 点 0 分 0 秒的时间戳(记得微秒也为 0)
  getTodayUnix: function () {
    var date = new Date()
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)
    return date.getTime()
  },
  // 获取今年 1 月 1 日 0 点 0 分 0 秒的时间戳
  // 注意 1 月在 Month 中为 0
  getYearUnix: function () {
    var date = new Date()
    date.setMonth(0)
    date.setDate(1)
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)
    return date.getTime()
  },
  // 获取标准年月日
  getLastDate: function (time) {
    var date = new Date(time)
    // 月份显示为 01 或者 11，12
    var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    return date.getFullYear() + '-' + month + '-' + date
  },
  // 转换 距今时间
  getFormatTime: function (timestamp) {
    var now = this.getUnix()
    var today = this.getTodayUnix()
    var year = this.getYearUnix()
    // 时间戳为毫秒级，现转换为秒级时间
    var timer = (now - timestamp) / 1000
    var tip = ''
    if (timer < 0) {
      // 一秒以内
      tip = '刚刚'
    } else if (Math.floor(timer / 60) <= 0) {
      // 一分钟以内
      tip = '刚刚'
    } else if (timer < 3600) {
      tip = Math.floor(timer / 60) + '分钟前'
    } else if (timer >= 3600 && (timestamp - today) >= 0) {
      tip = Math.floor(timer / 3600) + '小时前'
    } else if (timer / 86400 <= 31) {
      tip = Math.ceil(timer / 86400) + '天前'
    } else {
      tip = this.getLastDate(timestamp)
    }
    return tip
  }
}

Vue.directive('time', {
  bind: function (el, binding) {
    el.innerHTML = Time.getFormatTime(binding.value)
    el.__timeout__ = setInterval(function () {
      el.innerHTML = Time.getFormatTime(binding.value)
    }, 6000)
  },
  unbind: function (el) {
    clearInterval(el.__timeout__)
    delete el.__timeout__
  }
})