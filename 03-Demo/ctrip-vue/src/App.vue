<template>
  <div id="app">
    <top-bar></top-bar>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    <bottom-tab></bottom-tab>
  </div>
</template>

<script>

import topBar from '@/components/top-bar/topBar'
import bottomTab from '@/components/bottom-tab/bottomTab'

export default {
  name: 'app',
  components: {
    topBar,
    bottomTab
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
