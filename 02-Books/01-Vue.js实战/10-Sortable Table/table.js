Vue.component('vTable', {
  props: {
    columns: {
      type: Array,
      default: function () {
        return []
      }
    },
    data: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data: function () {
    return {
      currentColumns: [],
      currentData: []
    }
  },
  methods: {
    makeColumns: function () {
      this.currentColumns = this.columns.map(function (col, index) {
        // 添加一个字段标识当前列排序的状态，后续使用
        col.sortType = 'normal'
        // 添加一个字符标志当前列在数组中的索引，后续使用
        col.index = index
        return col
      })
    },
    makeData: function () {
      this.currentData = this.data.map(function (row, index) {
        row.index = index
        return row
      })
    }
  },
  mounted() {
    this.makeColumns()
    this.makeData()
  }
})