<template>
 <div class="link">
  <ul class="link-list">
    <li>
      <div class="man-avatar"><img src="./avatar1.jpg" alt=""></div>
      <div class="man-content">
        <p class="man-name">朋友A</p>
        <p class="man-desc">最近去哪里玩？</p>
      </div>
    </li>
    <li>
      <div class="man-avatar"><img src="./bag-avatar.png" alt=""></div>
      <div class="man-content">
        <p class="man-name">朋友B</p>
        <p class="man-desc">最近去哪里玩？</p>
      </div>
    </li>
    <li>
      <div class="man-avatar"><img src="./avatar.jpg" alt=""></div>
      <div class="man-content">
        <p class="man-name">朋友C</p>
        <p class="man-desc">最近去哪里玩？</p>
      </div>
    </li>
    <li>
      <div class="man-avatar"><img src="./avatar2.jpg" alt=""></div>
      <div class="man-content">
        <p class="man-name">朋友D</p>
        <p class="man-desc">最近去哪里玩？</p>
      </div>
    </li>
    <li>
      <div class="man-avatar"><img src="./avatar3.jpg" alt=""></div>
      <div class="man-content">
        <p class="man-name">朋友E</p>
        <p class="man-desc">最近去哪里玩？</p>
      </div>
    </li>
    <li>
      <div class="man-avatar"><img src="./avatar4.jpg" alt=""></div>
      <div class="man-content">
        <p class="man-name">朋友1</p>
        <p class="man-desc">最近去哪里玩？</p>
      </div>
    </li>
    <li>
      <div class="man-avatar"><img src="./avatar2.jpg" alt=""></div>
      <div class="man-content">
        <p class="man-name">朋友2</p>
        <p class="man-desc">最近去哪里玩？</p>
      </div>
    </li>
    <li>
      <div class="man-avatar"><img src="./avatar1.jpg" alt=""></div>
      <div class="man-content">
        <p class="man-name">朋友3</p>
        <p class="man-desc">最近去哪里玩？</p>
      </div>
    </li>
    <li>
      <div class="man-avatar"><img src="./avatar3.jpg" alt=""></div>
      <div class="man-content">
        <p class="man-name">朋友4</p>
        <p class="man-desc">最近去哪里玩？</p>
      </div>
    </li>
    <li>
      <div class="man-avatar"><img src="./avatar4.jpg" alt=""></div>
      <div class="man-content">
        <p class="man-name">朋友5</p>
        <p class="man-desc">最近去哪里玩？</p>
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
 .link {
   padding-top: 56px;
   padding-bottom: 3rem;
 }
 .link-list li {
   height: 2rem;
   padding-left: 0.25rem;
   padding-right: 0.25rem;
   border-bottom: 1px solid #dcdcdc;
   box-sizing: border-box;
 }
 .man-avatar {
   float: left;
   padding: 0.25rem 0.25rem 0 0;
 }
 .man-avatar::after {
   display: block;
   clear: both;
   content: "";
   width: 0;
   overflow: hidden;
 }
 .man-avatar img {
   width: 1.5rem;
   height: 1.5rem;
   border-radius: 50%;
 }
 .man-content {
   margin-left: 1.75rem;
 }
 .man-name {
   padding-top: 0.3rem;
   font-size: 0.5rem;
 }
 .man-desc {
   padding-top: 0.15rem;
   font-size: 0.4rem;
   color: #808080;
 }
</style>
