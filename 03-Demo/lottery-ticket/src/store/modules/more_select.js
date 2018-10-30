// 更多投注5倍 10倍
import store from '../index.js'
const state = {
}

const getters = {

}

const mutations = {
  // 和值
  hzjxk3 (state, res) {
    let l = 0
    while (l < res.n) {
      l++
      let l0 = []
      let l1 = parseInt(Math.random() * 14) + 4
      let l2 = String(l1).length === 1 ? '0' + l1 : l1
      l0.push(String(l2))
      const jxk3Obj = {}
      jxk3Obj.play_type = '312'
      jxk3Obj.ante_info = '和值'
      jxk3Obj.lottery_alias = 'JXK3'
      jxk3Obj.lottery_period = res.period
      jxk3Obj.ante_code = l0
      jxk3Obj.count = 1
      jxk3Obj.single_money = 2
      if (localStorage.token) {
        store.commit('Jxk3', jxk3Obj)
      }
    }
  },
  // 3同号单选
  t3dxjxk3 (state, res) {
    let l = 0
    while (l < res.n) {
      l++
      let l0 = []
      let l1 = parseInt(Math.random() * 4) + 1
      let l2 = l1 + ',' + l1 + ',' + l1
      l0.push(String(l2))

      const jxk3Obj = {}
      jxk3Obj.play_type = '311'
      jxk3Obj.ante_info = '三同号单选'
      jxk3Obj.lottery_alias = 'JXK3'
      jxk3Obj.lottery_period = res.period
      jxk3Obj.ante_code = l0
      jxk3Obj.count = 1
      jxk3Obj.single_money = 2

      if (localStorage.token) {
        store.commit('Jxk3', jxk3Obj)
      }
    }
  },
  // 3同号通选
  t3txjxk3 (state, res) {
    let l = 0
    while (l < res.n) {
      l++
      const jxk3Obj = {}
      jxk3Obj.play_type = '302'
      jxk3Obj.ante_info = '三同号通选'
      jxk3Obj.lottery_alias = 'JXK3'
      jxk3Obj.lottery_period = res.period
      jxk3Obj.ante_code = ['aaa']
      jxk3Obj.count = 1
      jxk3Obj.single_money = 2

      if (localStorage.token) {
        store.commit('Jxk3', jxk3Obj)
      }
    }
  },
  // 2同号单选
  t2dxjxk3 (state, res) {
    let l = 0
    while (l < res.n) {
      l++
      let l0 = []
      let r1 = parseInt(Math.random() * 6) + 1
      let r2 = parseInt(Math.random() * 6) + 1
      l0.push(r1)
      l0.push(r1)
      l0.push(r2)
      const jxk3Obj = {}
      jxk3Obj.play_type = '311'
      jxk3Obj.ante_info = '二同号单选'
      jxk3Obj.lottery_alias = 'JXK3'
      jxk3Obj.lottery_period = res.period
      jxk3Obj.ante_code = l0
      jxk3Obj.count = 1
      jxk3Obj.single_money = 2

      if (localStorage.token) {
        store.commit('Jxk3', jxk3Obj)
      }
    }
  },
  // 2同号复选
  t2fxjxk3 (state, res) {
    let l = 0
    while (l < res.n) {
      l++
      let l0 = []
      let r1 = parseInt(Math.random() * 6) + 1
      l0.push(r1)
      const jxk3Obj = {}
      jxk3Obj.play_type = '314'
      jxk3Obj.ante_info = '二同号复选'
      jxk3Obj.lottery_alias = 'JXK3'
      jxk3Obj.lottery_period = res.period
      jxk3Obj.ante_code = l0
      jxk3Obj.count = 1
      jxk3Obj.single_money = 2

      if (localStorage.token) {
        store.commit('Jxk3', jxk3Obj)
      }
    }
  },
  // 二不同号
  bt2jxk3 (state, res) {
    let l = 0
    while (l < res.n) {
      l++
      let ll = []
      let l0 = [1, 2, 3, 4, 5, 6]
      let r1 = parseInt(Math.random() * 6)
      let r2 = parseInt(Math.random() * 5)
      let r3 = String(l0.splice(r1, 1))
      let r4 = String(l0.splice(r2, 1))

      if (Number(r3) > Number(r4)) {
        ll.push(r4 + r3)
      } else {
        ll.push(r3 + r4)
      }

      const jxk3Obj = {}
      jxk3Obj.play_type = '313'
      jxk3Obj.ante_info = '二不同号'
      jxk3Obj.lottery_alias = 'JXK3'
      jxk3Obj.lottery_period = res.period
      jxk3Obj.ante_code = ll
      jxk3Obj.count = 1
      jxk3Obj.single_money = 2

      if (localStorage.token) {
        store.commit('Jxk3', jxk3Obj)
      }
    }
  },
  // 三不同号
  bt3jxk3 (state, res) {
    let l = 0
    while (l < res.n) {
      let l0 = [1, 2, 3, 4, 5, 6]
      let j = 0
      let j1 = []
      l++
      while (j < 3) {
        let p = l0[parseInt((Math.random() * 6))]
        if (j1.includes(p)) {
          continue
        } else {
          j1.push(p)
          j++
        }
      }
      const jxk3Obj = {}
      jxk3Obj.play_type = '311'
      jxk3Obj.ante_info = '三不同号'
      jxk3Obj.lottery_alias = 'JXK3'
      jxk3Obj.lottery_period = res.period
      jxk3Obj.ante_code = j1.sort()
      jxk3Obj.count = 1
      jxk3Obj.single_money = 2

      if (localStorage.token) {
        store.commit('Jxk3', jxk3Obj)
      }
    }
  },
  l3txjxk3 (state, res) {
    let l = 0
    while (l < res.n) {
      l++
      const jxk3Obj = {}
      jxk3Obj.play_type = '305'
      jxk3Obj.ante_info = '三连号通选'
      jxk3Obj.lottery_alias = 'JXK3'
      jxk3Obj.lottery_period = res.period
      jxk3Obj.ante_code = ['abc']
      jxk3Obj.count = 1
      jxk3Obj.single_money = 2

      if (localStorage.token) {
        store.commit('Jxk3', jxk3Obj)
      }
    }
  },

  // 福彩3d多选
  com3d (state, res) {
    let l = 0
    while (l < res.n) {
      l++
      const d3Obj = {}
      d3Obj.play_type = '201'
      d3Obj.ante_info = '直选投注'
      d3Obj.lottery_alias = '3d'
      d3Obj.lottery_period = res.period
      d3Obj.ante_code = [parseInt(Math.random() * 10), parseInt(Math.random() * 10), parseInt(Math.random() * 10)]
      d3Obj.count = 1
      d3Obj.single_money = 2

      this.canSubmit = false
      if (localStorage.token) {
        store.commit('D3', d3Obj)
      }
    }
  },
  // 组选3
  zx3d3 (state, res) {
    let l = 0
    while (l < res.n) {
      l++
      const d3Obj = {}
      let r = parseInt(Math.random() * 10)

      let r1 = function () {
        let f = true
        while (f) {
          let p = parseInt(Math.random() * 10)
          if (p === r) {
            continue
          } else {
            f = false
          }
          return p
        }
      }

      d3Obj.play_type = '202'
      d3Obj.ante_info = '组选投注'
      d3Obj.lottery_alias = '3d'
      d3Obj.lottery_period = res.period
      d3Obj.ante_code = [r, r, r1()]
      d3Obj.count = 1
      d3Obj.single_money = 2

      this.canSubmit = false
      if (localStorage.token) {
        store.commit('D3', d3Obj)
      }
    }
  },
  // 组选6
  zx6d3 (state, res) {
    let l = 0
    while (l < res.n) {
      l++
      let list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      let list1 = []
      let l1 = parseInt(list.splice(parseInt(Math.random() * 10), 1).join(''))
      let l2 = parseInt(list.splice(parseInt(Math.random() * 9), 1).join(''))
      let l3 = parseInt(list.splice(parseInt(Math.random() * 8), 1).join(''))
      list1.push(l1)
      list1.push(l2)
      list1.push(l3)
      const d3Obj = {}
      d3Obj.play_type = '202'
      d3Obj.ante_info = '组选投注'
      d3Obj.lottery_alias = '3d'
      d3Obj.lottery_period = res.period
      d3Obj.ante_code = list1.sort()
      d3Obj.count = 1
      d3Obj.single_money = 2

      this.canSubmit = false
      if (localStorage.token) {
        store.commit('D3', d3Obj)
      }
    }
  },
  // 11选5
  q2comdlc (state, res) {
    let l = 0
    while (l < res.n) {
      l++
      let list = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']
      let l1 = list.splice(parseInt(Math.random() * 11), 1).join('')
      let l2 = list.splice(parseInt(Math.random() * 10), 1).join('')
      const dlcObj = {}
      dlcObj.play_type = '9'
      dlcObj.ante_info = '前二直选'
      dlcObj.lottery_alias = 'dlc'
      dlcObj.lottery_period = res.period
      dlcObj.ante_code = [l1, '|', l2]
      dlcObj.count = 1
      dlcObj.single_money = 2

      this.canSubmit = false
      if (localStorage.token) {
        store.commit('Dlc', dlcObj)
      }
    }
  },
  q2zxdlc (state, res) {
    let l = 0
    while (l < res.n) {
      l++
      let list = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']
      let l1 = list.splice(parseInt(Math.random() * 11), 1).join('')
      let l2 = list.splice(parseInt(Math.random() * 10), 1).join('')
      const dlcObj = {}
      dlcObj.play_type = '11'
      dlcObj.ante_info = '前二组选'
      dlcObj.lottery_alias = 'dlc'
      dlcObj.lottery_period = res.period
      dlcObj.ante_code = [l1, l2]
      dlcObj.count = 1
      dlcObj.single_money = 2

      this.canSubmit = false
      if (localStorage.token) {
        store.commit('Dlc', dlcObj)
      }
    }
  },
  q3comdlc (state, res) {
    let l = 0
    while (l < res.n) {
      l++
      let list = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']
      let l1 = list.splice(parseInt(Math.random() * 11), 1).join('')
      let l2 = list.splice(parseInt(Math.random() * 10), 1).join('')
      let l3 = list.splice(parseInt(Math.random() * 9), 1).join('')
      const dlcObj = {}
      dlcObj.play_type = '10'
      dlcObj.ante_info = '前三直选'
      dlcObj.lottery_alias = 'dlc'
      dlcObj.lottery_period = res.period
      dlcObj.ante_code = [l1, '|', l2, '|', l3]
      dlcObj.count = 1
      dlcObj.single_money = 2

      this.canSubmit = false
      if (localStorage.token) {
        store.commit('Dlc', dlcObj)
      }
    }
  },
  q3zxdlc (state, res) {
    let l = 0
    while (l < res.n) {
      l++
      let list = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']
      let l1 = list.splice(parseInt(Math.random() * 11), 1).join('')
      let l2 = list.splice(parseInt(Math.random() * 10), 1).join('')
      let l3 = list.splice(parseInt(Math.random() * 9), 1).join('')
      const dlcObj = {}
      dlcObj.play_type = '12'
      dlcObj.ante_info = '前三组选'
      dlcObj.lottery_alias = 'dlc'
      dlcObj.lottery_period = res.period
      dlcObj.ante_code = [l1, l2, l3]
      dlcObj.count = 1
      dlcObj.single_money = 2

      this.canSubmit = false
      if (localStorage.token) {
        store.commit('Dlc', dlcObj)
      }
    }
  },
  rx1dlc (state, res) {
    let l = 0
    while (l < res.n) {
      l++
      let c = parseInt(Math.random() * 11) + 1
      let c1 = String(c).length === 1 ? '0' + c : c
      const dlcObj = {}
      dlcObj.play_type = '1'
      dlcObj.ante_info = '前一'
      dlcObj.lottery_alias = 'dlc'
      dlcObj.lottery_period = res.period
      dlcObj.ante_code = [c1]
      dlcObj.count = 1
      dlcObj.single_money = 2

      this.canSubmit = false
      if (localStorage.token) {
        store.commit('Dlc', dlcObj)
      }
    }
  },
  rx2dlc (state, res) {
    let l = 0
    while (l < res.n) {
      l++
      let list = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']
      let l1 = list.splice(parseInt(Math.random() * 11), 1).join('')
      let l2 = list.splice(parseInt(Math.random() * 10), 1).join('')
      const dlcObj = {}
      dlcObj.play_type = '2'
      dlcObj.ante_info = '任选二'
      dlcObj.lottery_alias = 'dlc'
      dlcObj.lottery_period = res.period
      dlcObj.ante_code = [l1, l2]
      dlcObj.count = 1
      dlcObj.single_money = 2

      if (localStorage.token) {
        store.commit('Dlc', dlcObj)
      }
    }
  },
  rx3dlc (state, res) {
    let l = 0
    while (l < res.n) {
      l++
      let list = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']
      let l1 = list.splice(parseInt(Math.random() * 11), 1).join('')
      let l2 = list.splice(parseInt(Math.random() * 10), 1).join('')
      let l3 = list.splice(parseInt(Math.random() * 9), 1).join('')
      const dlcObj = {}
      dlcObj.play_type = '3'
      dlcObj.ante_info = '任选三'
      dlcObj.lottery_alias = 'dlc'
      dlcObj.lottery_period = res.period
      dlcObj.ante_code = [l1, l2, l3]
      dlcObj.count = 1
      dlcObj.single_money = 2

      if (localStorage.token) {
        store.commit('Dlc', dlcObj)
      }
    }
  },
  rx4dlc (state, res) {
    let l = 0
    while (l < res.n) {
      l++
      let list = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']
      let l1 = list.splice(parseInt(Math.random() * 11), 1).join('')
      let l2 = list.splice(parseInt(Math.random() * 10), 1).join('')
      let l3 = list.splice(parseInt(Math.random() * 9), 1).join('')
      let l4 = list.splice(parseInt(Math.random() * 8), 1).join('')
      const dlcObj = {}
      dlcObj.play_type = '4'
      dlcObj.ante_info = '任选四'
      dlcObj.lottery_alias = 'dlc'
      dlcObj.lottery_period = res.period
      dlcObj.ante_code = [l1, l2, l3, l4]
      dlcObj.count = 1
      dlcObj.single_money = 2

      if (localStorage.token) {
        store.commit('Dlc', dlcObj)
      }
    }
  },
  rx5dlc (state, res) {
    let l = 0
    while (l < res.n) {
      l++
      let list = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']
      let l1 = list.splice(parseInt(Math.random() * 11), 1).join('')
      let l2 = list.splice(parseInt(Math.random() * 10), 1).join('')
      let l3 = list.splice(parseInt(Math.random() * 9), 1).join('')
      let l4 = list.splice(parseInt(Math.random() * 8), 1).join('')
      let l5 = list.splice(parseInt(Math.random() * 7), 1).join('')
      const dlcObj = {}
      dlcObj.play_type = '5'
      dlcObj.ante_info = '任选五'
      dlcObj.lottery_alias = 'dlc'
      dlcObj.lottery_period = res.period
      dlcObj.ante_code = [l1, l2, l3, l4, l5]
      dlcObj.count = 1
      dlcObj.single_money = 2

      this.canSubmit = false
      if (localStorage.token) {
        store.commit('Dlc', dlcObj)
      }
    }
  },
  rx6dlc (state, res) {
    let l = 0
    while (l < res.n) {
      l++
      let list = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']
      let l1 = list.splice(parseInt(Math.random() * 11), 1).join('')
      let l2 = list.splice(parseInt(Math.random() * 10), 1).join('')
      let l3 = list.splice(parseInt(Math.random() * 9), 1).join('')
      let l4 = list.splice(parseInt(Math.random() * 8), 1).join('')
      let l5 = list.splice(parseInt(Math.random() * 7), 1).join('')
      let l6 = list.splice(parseInt(Math.random() * 6), 1).join('')
      const dlcObj = {}
      dlcObj.play_type = '6'
      dlcObj.ante_info = '任选六'
      dlcObj.lottery_alias = 'dlc'
      dlcObj.lottery_period = res.period
      dlcObj.ante_code = [l1, l2, l3, l4, l5, l6]
      dlcObj.count = 1
      dlcObj.single_money = 2

      this.canSubmit = false
      if (localStorage.token) {
        store.commit('Dlc', dlcObj)
      }
    }
  },
  rx7dlc (state, res) {
    let l = 0
    while (l < res.n) {
      l++
      let list = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']
      let l1 = list.splice(parseInt(Math.random() * 11), 1).join('')
      let l2 = list.splice(parseInt(Math.random() * 10), 1).join('')
      let l3 = list.splice(parseInt(Math.random() * 9), 1).join('')
      let l4 = list.splice(parseInt(Math.random() * 8), 1).join('')
      let l5 = list.splice(parseInt(Math.random() * 7), 1).join('')
      let l6 = list.splice(parseInt(Math.random() * 6), 1).join('')
      let l7 = list.splice(parseInt(Math.random() * 5), 1).join('')
      const dlcObj = {}
      dlcObj.play_type = '7'
      dlcObj.ante_info = '任选七'
      dlcObj.lottery_alias = 'dlc'
      dlcObj.lottery_period = res.period
      dlcObj.ante_code = [l1, l2, l3, l4, l5, l6, l7]
      dlcObj.count = 1
      dlcObj.single_money = 2

      this.canSubmit = false
      if (localStorage.token) {
        store.commit('Dlc', dlcObj)
      }
    }
  },
  rx8dlc (state, res) {
    let l = 0
    while (l < res.n) {
      l++
      let list = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']
      let l1 = list.splice(parseInt(Math.random() * 11), 1).join('')
      let l2 = list.splice(parseInt(Math.random() * 10), 1).join('')
      let l3 = list.splice(parseInt(Math.random() * 9), 1).join('')
      let l4 = list.splice(parseInt(Math.random() * 8), 1).join('')
      let l5 = list.splice(parseInt(Math.random() * 7), 1).join('')
      let l6 = list.splice(parseInt(Math.random() * 6), 1).join('')
      let l7 = list.splice(parseInt(Math.random() * 5), 1).join('')
      let l8 = list.splice(parseInt(Math.random() * 4), 1).join('')
      const dlcObj = {}
      dlcObj.play_type = '8'
      dlcObj.ante_info = '任选八'
      dlcObj.lottery_alias = 'dlc'
      dlcObj.lottery_period = this.lottery_period
      dlcObj.ante_code = [l1, l2, l3, l4, l5, l6, l7, l8]
      dlcObj.count = 1
      dlcObj.single_money = 2

      this.canSubmit = false
      if (localStorage.token) {
        store.commit('Dlc', dlcObj)
      }
    }
  }
}

const actions = {

}

export default {
  state,
  getters,
  mutations,
  actions
}
