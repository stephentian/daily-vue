<template>
  <div class="bag">
    <div class="bag-top">
      <div class="avatar">
        <div class="avatar-link">
          <img src="./bag-avatar.png" alt="你的头像" class="avatar-img">
        </div>
        <p class="avatar-name">你的名字</p>
      </div>
    </div>
    <div class="bag-wrap">
      <ul class="card-list">
        <li class="bank-card">
          <p class="card-name">银行卡</p>
          <p class="card-title">
            卡片数量
            <i class="name-filter">|</i>
            所属银行
          </p>
        </li>
        <li class="bus-card">
          <p class="card-name">公交卡</p>
          <p class="card-title">
            卡内余额
            <i class="name-filter">|</i>
            公交卡所在地
            <i class="name-filter">|</i>
            公交卡充值
          </p>
        </li>
        <li class="bike-card">
          <p class="card-name">共享单车</p>
          <p class="card-title">
            摩拜单车
            <i class="name-filter">|</i>
            offer单车
            <i class="name-filter">|</i>
            哈罗单车
          </p>
        </li>
      </ul>
      <ul class="work-list">
        <li class="order"><a href="javascript:;">我的订单<i class="more-msg">></i></a></li>
        <li class="favorite"><a href="javascript:;">我的收藏<i class="more-msg">></i></a></li>
        <li class="point"><a href="javascript:;">我的积分<i class="more-msg">></i></a></li>
        <li class="ticket"><a href="javascript:;">我的攻略<i class="more-msg">></i></a></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  .bag {
    padding-top: 56px;
  }
  .avatar {
    width: 100%;
    background: url(./bag-bg.jpg) no-repeat;
    background-size: cover;
    text-align: center;
    padding-top: 1rem;
    padding-bottom: 0.5rem;
  }
  .avatar-link {
    display: inline-block;
    width: 2.2rem;
    height: 2.2rem;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 100%;
    padding: 0.1rem;
  }
  .avatar-img {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
  }
  .avatar-name {
    font-size: 0.5rem;
    line-height: 1rem;
    color: #fff;
  }

  .bag-wrap {
    border-top: 0.2rem solid #dcdcdc;
  }
  .card-list {
    font-size: 0.45rem;
    color: #333;
  }
  .card-name, .card-title {
    padding-left: 0.5rem;
  }
  .card-name {
    line-height: 1rem;;
    height: 1rem;
  }
  .card-title {
    font-size: 0.4rem;
    color: #999;
    line-height: 0.6rem;
    border-bottom: 1px solid #ddd;
  }
  .name-filter {
    margin: 0 0.1rem;
  }
  .work-list {
    border-top: 0.2rem solid #ddd;
    padding-top: 0.2rem;
    padding-bottom: 1.2rem;
  }
  .work-list li {
    width: 9rem;
    margin: 0 auto;
    font-size: 0.45rem;
    border-bottom: 1px solid #ddd;
    line-height: 1rem;
    position: relative;
  }
  .more-msg {
    position: absolute;
    right: 0;
  }
</style>
