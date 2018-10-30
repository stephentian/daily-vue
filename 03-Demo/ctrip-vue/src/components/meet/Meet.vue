<template>
  <div class="meet">
    <ul class="meet-wrap">
      <li class="game-list">
        <div class="list-main"><a href="javascript:;" class="list-name">一起开黑</a></div>
        <div class="list-content">
          <a href="javascript:;" class="list-item">王者荣耀</a>
          <a href="javascript:;" class="list-item">三国杀</a>
          <a href="javascript:;" class="list-item">卡牌游戏</a>
          <a href="javascript:;" class="list-item">狼人杀</a>
        </div>
      </li>
      <li class="vehicle-list">
        <div class="list-main"><a href="javascript:;" class="list-name">出行工具</a></div>
        <div class="list-content">
          <a href="javascript:;" class="list-item">公交卡</a>
          <a href="javascript:;" class="list-item">火车票</a>
          <a href="javascript:;" class="list-item">飞机票</a>
          <a href="javascript:;" class="list-item">滴滴叫车</a>
        </div>
      </li>
      <li class="nearby-list">
        <div class="list-main"><a href="javascript:;" class="list-name">附近闲逛</a></div>
        <div class="list-content">
          <a href="javascript:;" class="list-item">美食街</a>
          <a href="javascript:;" class="list-item">游乐园</a>
          <a href="javascript:;" class="list-item">公交站</a>
          <a href="javascript:;" class="list-item">商贸城</a>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  .meet {
    padding-top: 56px;
  }
  .meet-wrap {
    padding: 0.25rem 0.25rem 1.5rem 0.25rem;
  }
  .meet a {
    color: #fff;
  }

  /* 游戏列表 */
  .meet-wrap li {
    display: flex;
    height: 3rem;
    box-sizing: content-box;
    border-bottom: 0.25rem solid #eee;
  } 
  .list-main {
    width: 33.33%;
    height: 100%;
  }
  .list-content {
    width: 66.67%;
    display: flex;
    flex-wrap: wrap;
  }
  .list-content .list-item {
    width: 50%;
    height: 1.5rem;
    border: 1px solid #eee;
    box-sizing: border-box;
    line-height: 1.5rem;
  }
  .meet-wrap li a {
    width: 100%;
    height: 100%;
    display: inline-block;
    text-align: center;
    font-size: 0.45rem;
  }
  .game-list a {
    background-color: #f55;
  }
  .vehicle-list a {
    background-color: #00a7f7;
  }
  .nearby-list a {
    background-color: #44c522;
  }
  .list-name {
    line-height: 3rem;
  }
</style>
