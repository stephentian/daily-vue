<template>
  <div>
    <div class="search-bar">
      <van-row>
        <van-col :span="3">
          <img :src="locationIcon"
               width="80%"
               calss
               class="location-icon"
               alt="">
        </van-col>
        <van-col :span="16">
          <input type="text"
                 class="search-input">
        </van-col>
        <van-col :span="5">
          <van-button size="mini">查找</van-button>
        </van-col>
      </van-row>
    </div>
    <div class="swipper-container">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(item, index) in bannerArr"
                        :key="index">
          <img :src="item.imageUrl"
               width="100%">
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="mid-banner">
      <img src=""
           alt="">
    </div>
    <div class="recom-area">
      <div class="recom-title">商品推荐</div>
      <div class="recom-goods">
        <Swiper>
          <Slide v-for="(item, index) in bannerArr"
                 :key="index"></Slide>
        </Swiper>
      </div>
    </div>
    <floor-component></floor-component>
    <floor-component></floor-component>
    <floor-component></floor-component>
    <div class="hot-area">
      <div class="hot-title">热卖商品</div>
      <div class="hot-goods">
        <van-list>
          <van-row>
            <van-col>
              <goods-info></goods-info>
            </van-col>
          </van-row>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, Slide } from "vue-swiper-component";

import FloorComponent from './components/FloorComponent'
import GoodsInfo from './components/GoodsInfo'

export default {
  data () {
    return {
      locationIcon: require('../../assets/images/location.png'),
      bannerArr: [
        { imageUrl: 'https://aecpm.alicdn.com/simba/img/TB1CWf9KpXXXXbuXpXXSutbFXXX.jpg_q50.jpg' },
        { imageUrl: 'https://gw.alicdn.com/imgextra/i2/63/O1CN01kNLsUy1CKtRgzDilw_!!63-0-lubanu.jpg' },
        { imageUrl: 'https://gw.alicdn.com/imgextra/i1/14/O1CN01aybOBC1ByS2Q99AMl_!!14-0-lubanu.jpg' }
      ]
    }
  },
  components: {
    Swiper,
    Slide,
    FloorComponent,
    GoodsInfo
  }
}
</script>

<style lang="css"  scoped>
.search-bar {
  height: 2.2rem;
  background-color: rgb(47, 45, 44);
  /* line-height: 2.2rem; */
}

.search-input {
  width: 100%;
  height: 1.4rem;
  border: 0;
  border-bottom: 1px solid #fff;
  background-color: rgba(47, 45, 44, 0.1);
  border-radius: 5px;
  vertical-align: middle;
}
</style>