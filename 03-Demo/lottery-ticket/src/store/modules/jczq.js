// 竞彩足球投注
import api from '../../api/api'
import store from '../index.js'

const state = {
  match: 0,
  FTQuery: [],
  FT01Query: [],
  FT02Query: [],
  FT03Query: [],
  FT04Query: [],
  FT05Query: [],
  FT09Query: [],
  jczq: [],
  leagues: [],
  leagues_temp: [],
  filterSelect: false
}

const getters = {
  FTQuery: state => state.FTQuery,
  FT01Query: state => state.FT01Query,
  FT02Query: state => state.FT02Query,
  FT03Query: state => state.FT03Query,
  FT04Query: state => state.FT04Query,
  FT05Query: state => state.FT05Query,
  FT09Query: state => state.FT09Query,
  jczq: state => state.jczq
}

const mutations = {
  FTmatch (state, res) {
    state.match = res
  },
  FTQuery (state, res) {
    state.FTQuery = res
  },
  FTleagues (state, res) {
    state.leagues = []
    let leagues = res.map(i => { return i['league'] })
    function unique (arr) {
      const seen = new Map()
      return arr.filter((a) => !seen.has(a) && seen.set(a, 1))
    }
    let lRes = unique(leagues)
    lRes.forEach(r => {
      let league = {}
      league.league = r
      league.isSelected = true
      state.leagues.push(league)
    })
    state.leagues.sort((a, b) => a['league'].localeCompare(b['league'], 'zh'))
  },
  FTleaguesStore (state, res) {
    state.leagues_temp = JSON.parse(JSON.stringify(state.leagues))
  },
  FTleaguesSelect (state, res) {
    let type = res.type
    let leagues = JSON.parse(JSON.stringify(state.leagues))
    if (type === 0) {
      // 全选
      leagues.forEach(r => {
        r.isSelected = true
      })
    } else if (type === 1) {
      // 反选
      leagues.forEach(r => {
        r.isSelected = !r.isSelected
      })
    } else if (type === 2) {
      // 五大联赛
      let five = ['英超', '意甲', '德甲', '西甲', '法甲']
      leagues.forEach(r => {
        if (five.indexOf(r['league']) > -1) {
          r.isSelected = true
        } else {
          r.isSelected = false
        }
      })
    } else {
      leagues[res.index].isSelected = !leagues[res.index].isSelected
    }
    state.leagues = leagues
  },
  FTleaguesChange (state, res) {
    if (!res.filterSelect) {
      state.leagues = state.leagues_temp
    }
    state.filterSelect = res.filterSelect
  },
  FT01_QUERY (state, res) {
    let newArr = {}

    res.forEach(obj => {
      obj.homeSelected = false
      obj.drawSelected = false
      obj.awaySelected = false
      obj.gametype = '胜平负'
      obj.lottery_id = 'FT01'

      let arr = newArr[obj['match_date']] || []
      arr.push(obj)
      newArr[obj['match_date']] = arr
    })

    state.FT01Query = Object.keys(newArr).sort((a, b) => new Date(a.replace(/-/g, '/')) - new Date(b.replace(/-/g, '/'))).map(key => {
      let arrAsc = newArr[key].sort((c, d) => c.match_index - d.match_index)
      return [key, arrAsc]
    })
  },
  FT01matchSelect (state, res) {
    if (res.m === 0) {
      state.FT01Query[res.index][1][res.i].homeSelected = !state.FT01Query[res.index][1][res.i].homeSelected
    } else if (res.m === 1) {
      state.FT01Query[res.index][1][res.i].drawSelected = !state.FT01Query[res.index][1][res.i].drawSelected
    } else if (res.m === 2) {
      state.FT01Query[res.index][1][res.i].awaySelected = !state.FT01Query[res.index][1][res.i].awaySelected
    }
  },
  FT02_QUERY (state, res) {
    let newArr = {}
    res.forEach(obj => {
      obj.homeSelected = false
      obj.drawSelected = false
      obj.awaySelected = false
      obj.gametype = '让球胜平负'
      obj.lottery_id = 'FT02'

      let arr = newArr[obj['match_date']] || []
      arr.push(obj)
      newArr[obj['match_date']] = arr
    })
    state.FT02Query = Object.keys(newArr).sort((a, b) => new Date(a.replace(/-/g, '/')) - new Date(b.replace(/-/g, '/'))).map(key => {
      let arrAsc = newArr[key].sort((c, d) => c.match_index - d.match_index)
      return [key, arrAsc]
    })
  },
  FT02matchSelect (state, res) {
    if (res.m === 0) {
      state.FT02Query[res.index][1][res.i].homeSelected = !state.FT02Query[res.index][1][res.i].homeSelected
    } else if (res.m === 1) {
      state.FT02Query[res.index][1][res.i].drawSelected = !state.FT02Query[res.index][1][res.i].drawSelected
    } else if (res.m === 2) {
      state.FT02Query[res.index][1][res.i].awaySelected = !state.FT02Query[res.index][1][res.i].awaySelected
    }
  },
  FT03_QUERY (state, res) {
    let newArr = {}

    res.forEach(obj => {
      obj.scoreSelected = {'10': false, '11': false, '12': false, '13': false, '14': false, '15': false, '20': false, '21': false, '22': false, '23': false, '24': false, '25': false, '30': false, '31': false, '32': false, '33': false, '40': false, '41': false, '42': false, '50': false, '51': false, '52': false, '90': false, '99': false, '00': false, '01': false, '02': false, '03': false, '04': false, '05': false, '09': false}
      obj.gametype = '比分'
      obj.gametext = ['点击选择投注内容']
      obj.lottery_id = 'FT03'

      let arr = newArr[obj['match_date']] || []
      arr.push(obj)
      newArr[obj['match_date']] = arr
    })
    state.FT03Query = Object.keys(newArr).sort((a, b) => new Date(a.replace(/-/g, '/')) - new Date(b.replace(/-/g, '/'))).map(key => {
      let arrAsc = newArr[key].sort((c, d) => c.match_index - d.match_index)
      return [key, arrAsc]
    })
  },
  FT03matchSelect (state, res) {
    state.FT03Query[res.index][1][res.i].scoreSelected[res.m] = !state.FT03Query[res.index][1][res.i].scoreSelected[res.m]
  },
  FT03InitScore (state, res) {
    state.FT03Query[res.index][1][res.i].scoreSelected = res.scoreSelected
  },
  FT03GameText (state, res) {
    if (res.gametext.length < 1) {
      res.gametext = ['点击选择投注内容']
    }
    state.FT03Query[res.index][1][res.i].gametext = res.gametext
  },
  FT04_QUERY (state, res) {
    let newArr = {}

    res.forEach(obj => {
      obj.scoreSelected = {'0': false, '1': false, '2': false, '3': false, '4': false, '5': false, '6': false, '7': false}
      obj.gametype = '总进球数'
      obj.lottery_id = 'FT04'

      let arr = newArr[obj['match_date']] || []
      arr.push(obj)
      newArr[obj['match_date']] = arr
    })
    state.FT04Query = Object.keys(newArr).sort((a, b) => new Date(a.replace(/-/g, '/')) - new Date(b.replace(/-/g, '/'))).map(key => {
      let arrAsc = newArr[key].sort((c, d) => c.match_index - d.match_index)
      return [key, arrAsc]
    })
  },
  FT04matchSelect (state, res) {
    state.FT04Query[res.index][1][res.i].scoreSelected[res.m] = !state.FT04Query[res.index][1][res.i].scoreSelected[res.m]
  },
  FT04InitScore (state, res) {
    state.FT04Query[res.index][1][res.i].scoreSelected = {'0': false, '1': false, '2': false, '3': false, '4': false, '5': false, '6': false, '7': false}
  },
  FT05_QUERY (state, res) {
    let newArr = {}

    res.forEach(obj => {
      obj.scoreSelected = {'00': false, '01': false, '03': false, '10': false, '11': false, '13': false, '30': false, '31': false, '33': false}
      obj.gametype = '半全场'
      obj.gametext = ['点击选择投注内容']
      obj.lottery_id = 'FT05'

      let arr = newArr[obj['match_date']] || []
      arr.push(obj)
      newArr[obj['match_date']] = arr
    })
    state.FT05Query = Object.keys(newArr).sort((a, b) => new Date(a.replace(/-/g, '/')) - new Date(b.replace(/-/g, '/'))).map(key => {
      let arrAsc = newArr[key].sort((c, d) => c.match_index - d.match_index)
      return [key, arrAsc]
    })
  },
  FT05matchSelect (state, res) {
    state.FT05Query[res.index][1][res.i].scoreSelected[res.m] = !state.FT05Query[res.index][1][res.i].scoreSelected[res.m]
  },
  FT05InitScore (state, res) {
    state.FT05Query[res.index][1][res.i].scoreSelected = res.scoreSelected
  },
  FT05GameText (state, res) {
    if (res.gametext.length < 1) {
      res.gametext = ['点击选择投注内容']
    }
    state.FT05Query[res.index][1][res.i].gametext = res.gametext
  },
  FT09_QUERY (state, res) {
    let newArr = {}

    res.forEach(obj => {
      let FT01Selected = {'0': false, '1': false, '3': false}
      let FT02Selected = {'0': false, '1': false, '3': false}
      let FT03Selected = {'10': false, '11': false, '12': false, '13': false, '14': false, '15': false, '20': false, '21': false, '22': false, '23': false, '24': false, '25': false, '30': false, '31': false, '32': false, '33': false, '40': false, '41': false, '42': false, '50': false, '51': false, '52': false, '90': false, '99': false, '00': false, '01': false, '02': false, '03': false, '04': false, '05': false, '09': false}
      let FT04Selected = {'0': false, '1': false, '3': false, '4': false, '5': false, '6': false, '7': false}
      let FT05Selected = {'00': false, '01': false, '03': false, '10': false, '11': false, '13': false, '30': false, '31': false, '33': false}
      obj.selectedName = {
        'FT01': {
          '0': '客胜', '1': '平', '3': '主胜'
        },
        'FT02': {
          '0': '客胜', '1': '平', '3': '主胜'
        },
        'FT03': {
          '10': '1:0', '11': '1:1', '12': '1:2', '13': '1:3', '14': '1:4', '15': '1:5', '20': '2:0', '21': '2:1', '22': '2:2', '23': '2:3', '24': '2:4', '25': '2:5', '30': '3:0', '31': '3:1', '32': '3:2', '33': '3:3', '40': '4:0', '41': '4:1', '42': '4:2', '50': '5:0', '51': '5:1', '52': '5:2', '90': '胜其他', '99': '平其他', '00': '0:0', '01': '0:1', '02': '0:2', '03': '0:3', '04': '0:4', '05': '0:5', '09': '0:9'
        },
        'FT04': {
          '0': '0', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7'
        },
        'FT05': {
          '00': '负负', '01': '负平', '03': '负胜', '10': '平负', '11': '平平', '13': '平胜', '30': '胜负', '31': '胜平', '33': '胜胜'
        }
      }

      obj.scoreSelected = {'FT01': FT01Selected, 'FT02': FT02Selected, 'FT03': FT03Selected, 'FT04': FT04Selected, 'FT05': FT05Selected}
      obj.gametype = '混合过关'
      obj.gametext = ['展开全部']
      obj.lottery_id = 'FT09'

      let arr = newArr[obj['match_date']] || []
      arr.push(obj)
      newArr[obj['match_date']] = arr
    })

    state.FT09Query = Object.keys(newArr).sort((a, b) => new Date(a.replace(/-/g, '/')) - new Date(b.replace(/-/g, '/'))).map(key => {
      let arrAsc = newArr[key].sort((c, d) => c.match_index - d.match_index)
      return [key, arrAsc]
    })
  },
  FT09matchSelect (state, res) {
    state.FT09Query[res.index][1][res.i].scoreSelected[res.lottery_id][res.m] = !state.FT09Query[res.index][1][res.i].scoreSelected[res.lottery_id][res.m]
  },
  FT09InitScore (state, res) {
    state.FT09Query[res.index][1][res.i].scoreSelected = res.scoreSelected
  },
  FTSelected (state, res) {
    state.jczq.push(res)
  },
  jczq_update (state, res) {
    state.jczq[res.x].scoreSelected = res.scoreSelected
  },
  jczq_clear (state) {
    if (state.jczq.length > 0) {
      store.dispatch('getFTQuery', {game: 'FT', lottery_id: state.jczq[0].lottery_id})
    }
    state.jczq.splice(0, state.jczq.length)
  },
  jczq_delete (state, res) {
    let index = res.index
    let lottery_id = state.jczq[0].lottery_id
    if (lottery_id === 'FT01') {
      for (let j = 0; j < state.FT01Query.length; j++) {
        for (let i = 0; i < state.FT01Query[j][1].length; i++) {
          let FT01QueryObj = state.FT01Query[j][1][i]
          let jczqObj = state.jczq[index]
          if (FT01QueryObj.game === jczqObj.game && FT01QueryObj.match_number === jczqObj.match_number) {
            FT01QueryObj.homeSelected = false
            FT01QueryObj.drawSelected = false
            FT01QueryObj.awaySelected = false
          }
        }
      }
    } else if (lottery_id === 'FT02') {
      for (let j = 0; j < state.FT02Query.length; j++) {
        for (let i = 0; i < state.FT02Query[j][1].length; i++) {
          let FT02QueryObj = state.FT02Query[j][1][i]
          let jczqObj = state.jczq[index]
          if (FT02QueryObj.game === jczqObj.game && FT02QueryObj.match_number === jczqObj.match_number) {
            FT02QueryObj.homeSelected = false
            FT02QueryObj.drawSelected = false
            FT02QueryObj.awaySelected = false
          }
        }
      }
    } else if (lottery_id === 'FT03') {
      for (let j = 0; j < state.FT03Query.length; j++) {
        for (let i = 0; i < state.FT03Query[j][1].length; i++) {
          let FT03QueryObj = state.FT03Query[j][1][i]
          let jczqObj = state.jczq[index]
          if (FT03QueryObj.game === jczqObj.game && FT03QueryObj.match_number === jczqObj.match_number) {
            let scoreSelected = {'10': false, '11': false, '12': false, '13': false, '14': false, '15': false, '20': false, '21': false, '22': false, '23': false, '24': false, '25': false, '30': false, '31': false, '32': false, '33': false, '40': false, '41': false, '42': false, '50': false, '51': false, '52': false, '90': false, '99': false, '00': false, '01': false, '02': false, '03': false, '04': false, '05': false, '09': false}
            store.commit('FT03InitScore', {index: j, i: i, scoreSelected: scoreSelected})
            state.FT03Query[j][1][i].gametext = ['点击选择投注内容']
          }
        }
      }
    } else if (lottery_id === 'FT04') {
      for (let j = 0; j < state.FT04Query.length; j++) {
        for (let i = 0; i < state.FT04Query[j][1].length; i++) {
          let FT04QueryObj = state.FT04Query[j][1][i]
          let jczqObj = state.jczq[index]
          if (FT04QueryObj.game === jczqObj.game && FT04QueryObj.match_number === jczqObj.match_number) {
            store.commit('FT04InitScore', {index: j, i: i})
          }
        }
      }
    } else if (lottery_id === 'FT05') {
      for (let j = 0; j < state.FT05Query.length; j++) {
        for (let i = 0; i < state.FT05Query[j][1].length; i++) {
          let FT05QueryObj = state.FT05Query[j][1][i]
          let jczqObj = state.jczq[index]
          if (FT05QueryObj.game === jczqObj.game && FT05QueryObj.match_number === jczqObj.match_number) {
            let scoreSelected = {'00': false, '01': false, '03': false, '10': false, '11': false, '13': false, '30': false, '31': false, '33': false}
            store.commit('FT05InitScore', {index: j, i: i, scoreSelected: scoreSelected})
            state.FT05Query[j][1][i].gametext = ['点击选择投注内容']
          }
        }
      }
    } else if (lottery_id === 'FT09') {
      for (let j = 0; j < state.FT09Query.length; j++) {
        for (let i = 0; i < state.FT09Query[j][1].length; i++) {
          let FT09QueryObj = state.FT09Query[j][1][i]
          let jczqObj = state.jczq[index]
          if (FT09QueryObj.game === jczqObj.game && FT09QueryObj.match_number === jczqObj.match_number) {
            // var scoreSelected = {"10": false, "11": false, "12": false, "13": false, "14": false, "15": false, "20": false, "21": false, "22": false, "23": false, "24": false, "25": false, "30": false, "31": false, "32": false, "33": false, "40": false, "41": false, "42": false, "50": false, "51": false, "52": false, "90": false, "99": false, "00": false, "01": false, "02": false, "03": false, "04": false, "05": false, "09": false};
            let FT01Selected = {'0': false, '1': false, '3': false}
            let FT02Selected = {'0': false, '1': false, '3': false}
            let FT03Selected = {'10': false, '11': false, '12': false, '13': false, '14': false, '15': false, '20': false, '21': false, '22': false, '23': false, '24': false, '25': false, '30': false, '31': false, '32': false, '33': false, '40': false, '41': false, '42': false, '50': false, '51': false, '52': false, '90': false, '99': false, '00': false, '01': false, '02': false, '03': false, '04': false, '05': false, '09': false}
            let FT04Selected = {'0': false, '1': false, '3': false, '4': false, '5': false, '6': false, '7': false}
            let FT05Selected = {'00': false, '01': false, '03': false, '10': false, '11': false, '13': false, '30': false, '31': false, '33': false}
            let scoreSelected = {'FT01': FT01Selected, 'FT02': FT02Selected, 'FT03': FT03Selected, 'FT04': FT04Selected, 'FT05': FT05Selected}
            state.FT09Query[j][1][i].gametext[0] = '展开全部'
            store.commit('FT09InitScore', {index: j, i: i, scoreSelected: scoreSelected})
          }
        }
      }
    }
    state.jczq.splice(index, 1)
  }
}

const actions = {
  getFTQuery ({ commit }, match) {
    return api.matchQuery({
      game: 'FT',
      lottery_id: match.lottery_id
    })
      .then(res => {
        let FT_QUERY = match.lottery_id + '_QUERY'
        commit(FT_QUERY, res.data)
        commit('FTQuery', res.data)
        commit('FTleagues', res.data)
      })
      .catch(err => console.log(err))
  },
  getLeaguesFilter ({ commit }, match) {
    let FT = state.FTQuery
    let leaguesF = state.leagues.filter(l => l.isSelected).map(r => r.league)
    let fRes = []
    fRes = FT.filter(i => {
      if (leaguesF.indexOf(i.league) > -1) {
        return i
      }
    })

    let res = state.filterSelect ? fRes : FT
    let FT_QUERY = match.lottery_id + '_QUERY'
    commit(FT_QUERY, res)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
