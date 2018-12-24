<template>
  <div>
    <div class="tabs-bar">
      <div v-for="(item, index) in navList"
           :key="index"
           @click="handleChange(index)"
           :class="tabCls(item)">{{ item.label }}</div>
    </div>
    <div class="tabs-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: [
    'value'
  ],
  data () {
    return {
      navList: [],
      currentValue: this.value
    }
  },
  methods: {
    tabCls (item) {
      return [
        'tabs-tab',
        {
          'active': item.name === this.currentValue
        }
      ]
    },
    handleChange (index) {
      var nav = this.navList[index]
    },
    getTabs () {
      return this.$children.filter(function (item) {
        return item.$options.name = 'pane'
      })
    },
    updateStatus () {
      var tabs = this.getTabs()
      console.log(tabs)
      var _this = this
      tabs.forEach(function (tab) {
        return tab.show = tab.name === _this.currentValue
      })
    }
  }
}
</script>

<style scoped>
</style>