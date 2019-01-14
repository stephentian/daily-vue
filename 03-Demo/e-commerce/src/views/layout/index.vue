<template>
  <div id="layout">
    <div class="layout-container">
      <router-view></router-view>
    </div>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="shop">
        <router-link :to="{ name: 'main'}">首页</router-link>
      </van-tabbar-item>
      <van-tabbar-item icon="records">
        <router-link :to="{ name: 'category'}">列表</router-link>
      </van-tabbar-item>
      <van-tabbar-item icon="cart">
        <router-link :to="{ name: 'cart'}">购物车</router-link>
      </van-tabbar-item>
      <van-tabbar-item icon="contact">
        <router-link :to="{ name: 'mine'}">我的</router-link>
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