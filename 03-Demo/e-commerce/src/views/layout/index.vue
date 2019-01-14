<template>
  <div id="layout">
    <div class="layout-container">
      <router-view></router-view>
    </div>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="shop"
                       :to="{ name: 'home'}">
        首页
      </van-tabbar-item>
      <van-tabbar-item icon="records"
                       :to="{ name: 'category'}">
        列表
      </van-tabbar-item>
      <van-tabbar-item icon="cart"
                       :to="{ name: 'cart'}">
        购物车
      </van-tabbar-item>
      <van-tabbar-item icon="contact"
                       :to="{ name: 'mine'}">
        我的
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0
    }
  },
  methods: {
  }
}
</script>