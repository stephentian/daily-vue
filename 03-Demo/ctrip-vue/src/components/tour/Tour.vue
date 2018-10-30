<template>
  <div class="tour-map">
    <div class="map-wrap">
      <p class="position">您的位置是: 
        <span v-if="this.location != ''" class="local">{{ location }}</span>
        <span v-else class="local">正在定位......</span>
      </p>
      <div class="map-content" id="map"></div>
    </div>
    <div id="r-result"></div>
  </div>
</template>

<script>
import {MP} from './map.js'

export default {
  data () {
    return {
      location: '',
      longtitude: '',
      latitude: ''
    }
  },
  mounted () {
    this.$nextTick(function () {
      // MP(你的密匙)
      MP('KgeOqAF2LHCpbMZlqT0XOGDo76QHiyxa').then(BMap => {
        console.log('地图加载中ing')
        // 把 this赋值给 _this，以便再后面调用
        var _this = this
        // 创建一个地图，会在 id = 'map' 的标签盒子里显示，记得给这个盒子设置 width和 height!
        var map = new BMap.Map('map')
        // 先假定一个点，万一定位不到会有这个点待定（可以不要）
        var point = new BMap.Point(121.76, 31.05)
        // 初始化地图， 设置中心点的坐标 point，以及地图级别 12
        map.centerAndZoom(point, 12)
        // map.addControl(new BMap.MapTypeControl())
        map.setCurrentCity('南昌')
        // 开启鼠标滚轮功能
        map.enableScrollWheelZoom(true)

        // 实例化获取当前地理位置
        var geolocation = new BMap.Geolocation()
        geolocation.getCurrentPosition(function (r) {
          // 判断是否获取成功；若获取成功，参数 r 中就有 point代表当前地址经纬度
          if (this.getStatus() === _this.$store.state.BMAP_STATUS_SUCCESS) {
            // 创建标注
            // var marker = new BMap.Marker(r.point)
            // 将标注添加到地图中
            // map.addOverlay(marker)
            // 让地图指向当前经纬度位置
            // map.panTo(r.point)
            // 将获取地址的经纬度传给 data
            _this.longtitude = r.point.lng
            _this.latitude = r.point.lat
            // 逆解析，将前面获取的经纬度转为地址
            var city = new BMap.Geocoder()
            // 根据获取的 r的经纬度，实例化一个点
            var local = new BMap.Point(r.point.lng, r.point.lat)
            // 设置中心点坐标为当前位置
            map.centerAndZoom(local, 12)
            city.getLocation(local, function (rs) {
              var addComp = rs.addressComponents
              _this.location = addComp.city

              // 周边搜索
              var nearby = new BMap.LocalSearch(map, {
                renderOptions: {map: map, panel: 'r-result'}
              })
              nearby.search('景点')
            })
          } else {
            alert('failed' + this.getStatus())
          }
        }, {enableHighAccuracy: true})

        // 周边搜索
        // var localMap = new BMap.Point(_this.longtitude, _this.latitude)
        // console.log(_this.longtitude + '和' + _this.latitude)
        // var nearby = new BMap.LocalSearch(localMap, {
        //   renderOptions: {localMap: map, panel: 'r-result'}
        // })
        // nearby.search('景点')
      })
    })
  }
}
</script>

<style scoped>
  .tour-map {
    padding-top: 56px;
  }
  .map-wrap {
    position: fixed;
    left: 0;
    top: 56px;
    width: 100%;
  }
  .position {
    padding: 0.2rem;
    font-size: 0.4rem;
    background-color: #e1f5fe;
  }
  .local {
    color: #f44336;
    letter-spacing: 0.05rem;
  }
  .map-content {
    position: relative;
    width: 100%;
    height: 5rem;
  }
  #r-result {
    padding-top: 6rem;
    width: 100%;
    padding-bottom: 1.7rem;
    /* height: 14.5rem; */
    /* font-size: 16px; */
  }
</style>
