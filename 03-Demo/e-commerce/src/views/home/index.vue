<template>
  <div>
    <div class="search-bar">
      <van-row type="flex"
               align="center"
               justify="space-around">
        <van-col :span="3">
          <img :src="locationIcon"
               width="80%"
               calss
               class="location-icon">
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
          <img v-lazy="item.imageUrl"
               width="100%">
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="type-bar">
      <div v-for="(item, index) in category"
           :key="index">
        <img v-lazy="item.image"
             width="90%">
        <span>{{ item.mallCategoryName }}</span>
      </div>
    </div>
    <div class="mid-banner">
      <img v-lazy="adBanner"
           width="100%">
    </div>
    <div class="recom-area">
      <div class="recom-title">商品推荐</div>
      <div class="recom-goods">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item,index) in recommendGoods "
                        :key="index">
            <div class="recom-item">
              <img :src="item.image"
                   width="80%">
              <div>{{item.goodsName}}</div>
              <div>￥{{item.price | moneyFilter}}(￥{{item.mallPrice | moneyFilter}})</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <floor-component :floorData="floor1"
                     :floorTitle="floorName.floor1"></floor-component>
    <floor-component :floorData="floor2"
                     :floorTitle="floorName.floor2"></floor-component>
    <floor-component :floorData="floor3"
                     :floorTitle="floorName.floor3"></floor-component>
    <div class="hot-area">
      <div class="hot-title">热卖商品</div>
      <div class="hot-goods">
        <van-list>
          <van-row gutter="20">
            <van-col span="12"
                     v-for="(item , index) in hotGoods"
                     :key="index">
              <goods-info :goodsId="item.goodsId"
                          :goodsImage="item.image"
                          :goodsName="item.name"
                          :goodsPrice="item.price"></goods-info>
            </van-col>
          </van-row>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// import { Swiper, Slide } from "vue-swiper-component";
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

import FloorComponent from './components/FloorComponent'
import GoodsInfo from './components/GoodsInfo'

export default {
  data () {
    return {
      swiperOption: {
        slidesPerView: 3
      },
      locationIcon: require('../../assets/images/location.png'),
      bannerArr: [
        { imageUrl: 'https://aecpm.alicdn.com/simba/img/TB1CWf9KpXXXXbuXpXXSutbFXXX.jpg_q50.jpg' },
        { imageUrl: 'https://gw.alicdn.com/imgextra/i2/63/O1CN01kNLsUy1CKtRgzDilw_!!63-0-lubanu.jpg' },
        { imageUrl: 'https://gw.alicdn.com/imgextra/i1/14/O1CN01aybOBC1ByS2Q99AMl_!!14-0-lubanu.jpg' }
      ],
      category: [],
      adBanner: '',
      recommendGoods: [],
      floor1: [],
      floor2: [],
      floor3: [],
      floorName: {},
      hotGoods: [],
    }
  },
  components: {
    swiper,
    swiperSlide,
    FloorComponent,
    GoodsInfo
  },
  filters: {
    moneyFilter (m) {
      return m.toFixed(2)
    }
  },
  created () {
    axios({
      url: 'https://www.easy-mock.com/mock/5bd91a2523c468500c85b724/rebuy/main/alldata',
      method: 'get'
    })
      .then(res => {
        console.log(res.data)
        if (res.status == 200) {
          this.category = res.data.data.category
          this.adBanner = res.data.data.advertesPicture.PICTURE_ADDRESS
          this.bannerPicArray = res.data.data.slides
          this.recommendGoods = res.data.data.recommend
          this.floor1 = res.data.data.floor1
          this.floor2 = res.data.data.floor2
          this.floor3 = res.data.data.floor3
          this.floorName = res.data.data.floorName
          this.hotGoods = res.data.data.hotGoods
        }
      })
      .catch((err) => {
        console.log('Error: ', err)
      })
  }
}
</script>

<style lang="css"  scoped>
.search-bar {
  height: 2.2rem;
  background-color: rgba(47, 45, 44, 0.9);
}

.search-input {
  width: 94%;
  height: 1.4rem;
  border: 0;
  border-bottom: 1px solid #fff;
  border-radius: 5px;
  padding-left: 0.25rem;
}

.type-bar {
  background-color: #fff;
  margin: 0 0.3rem 0.3rem 0.3rem;
  border-radius: 2px;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.type-bar div {
  padding: 0.3rem;
  font-size: 12px;
  text-align: center;
}

.swipper-container {
  max-height: 6.52rem;
}

.recom-area {
  background-color: #fff;
  margin-top: 0.3rem;
}
.recom-title {
  border-bottom: 1px solid #eee;
  font-size: 14px;
  padding: 0.2rem;
  color: #e5017d;
}
.recom-goods {
  border-bottom: 1px solid #eee;
}
.recom-item {
  width: 99%;
  border-right: 1px solid #eee;
  font-size: 12px;
  text-align: center;
}
.hot-area {
  text-align: center;
  font-size: 14px;
  height: 1.8rem;
  line-height: 1.8rem;
}
.hot-goods {
  height: 130rem;
  overflow: hidden;
  background-color: #fff;
}
</style>