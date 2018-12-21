Vue.component('tabs', {
  template: '\
  <div class="tabs">\
    <div class="tabs-bar">\
      <div \
        :class="tabCls(item)" \
        v-for="(item, index) in navList" \
        @click="handleChange(index)"> \
        {{ item.label }} \
      </div> \
    </div> \
    <div class = "tabs-content"> \
      <slot></slot> \
    </div> \
  </div>',
  props: {
    value: {
      type: [String, Number]
    }
  },
  data() {
    return {
      // 不能修改 value, 复制一份自己维护
      currentValue: this.value,
      navList: []
    }
  },
  methods: {
    tabCls(item) {
      return [
        'tabs-tab',
        {
          // 给当前选中的 tab 加一个 class
          'tabs-tab-active': item.name === this.currentValue
        }
      ]
    },
    handleChange(index) {
      var nav = this.navList[index]
      var name = nav.name
      this.currentValue = name
      // 触发自定义事件，供父级使用
      // this.$emit('input', name)
      // this.$emit('on-click', name)
    },
    getTabs() {
      return this.$children.filter(function (item) {
        return item.$options.name = 'pane'
      })
    },
    updateNav() {
      this.navList = []
      // 绑定 this ，在 function 回调里， this 不指向 Vue 实例
      var _this = this
      // 遍历每个 pane 组件, 提取 label 和 name
      this.getTabs().forEach(function (pane, index) {
        _this.navList.push({
          label: pane.label,
          name: pane.name || index
        })
        if (!pane.name) pane.name = index
        if (index === 0) {
          if (!_this.currentValue) {
            _this.currentValue = pane.name || index
          }
        }
      })
      this.updateStatus()
    },
    updateStatus() {
      var tabs = this.getTabs()
      var _this = this
      tabs.forEach(function (tab) {
        // 当 tab name 和 currentValue 相同时, tab.show 为 true
        return tab.show = tab.name === _this.currentValue
      })
    }
  },
  watch: {
    value(val) {
      this.currentValue = val
    },
    currentValue() {
      this.updateStatus()
    }
  },
})