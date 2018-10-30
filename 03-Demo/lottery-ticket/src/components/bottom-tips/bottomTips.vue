<template>
  <!-- 通用信息提示框 -->
  <div class="bottom-tips" v-show="bottomShow">
    <div class="bottom-tips-message">{{ tips }}</div>
  </div>
</template>
<script>
export default {
  name: 'bottomBet',
  data: () => ({
    bottomShow: false,
    tips: ''
  }),
  props: ['bottomTips'],
  computed: {},
  mounted () {},
  methods: {
    bottompopTips: function (tips) {
      this.bottomShow = true
      this.tips = tips
      var _this = this
      setTimeout(function () {
        _this.bottomShow = false
      }, 3500)
    }
  }
}
</script>
<style lang="css" scoped>
.bottom-tips{
  line-height:2;
  position:fixed;
  bottom:5rem;
  left:50%;
  z-index:9999;
  -webkit-transition:opacity .3s;
  -moz-transition:opacity .3s;
  -o-transition:opacity .3s;
  transition:opacity .3s;
  -webkit-transform:translate(-50%, 0);
  -moz-transform:translate(-50%, 0);
  -o-transform:translate(-50%, 0);
  transform:translate(-50%, 0);
  -webkit-animation:tipsmove 5s infinite;
  -moz-animation:tipsmove 5s infinite;
  -o-animation:tipsmove 5s infinite;
  animation:tipsmove 5s infinite;
  opacity:0;
}
.bottom-tips-message{
  font-size:1rem;
  padding:0.5rem 1rem;
  background:#333;
  color:#fff;
  text-align:center;
  -webkit-border-radius:0.5rem;
  -moz-border-radius:0.5rem;
  border-radius:0.5rem;
}
@keyframes tipsmove
{
  0%   {bottom: 0;opacity:0;}
  10%  {bottom: 5rem;opacity:0.9;}
  90%  {bottom: 5rem;opacity:0.9;}
  100% {bottom: 0;opacity:0;}
}
@-moz-keyframes tipsmove
{
  0%   {bottom: 0;opacity:0;}
  10%  {bottom: 5rem;opacity:0.9;}
  90%  {bottom: 5rem;opacity:0.9;}
  100% {bottom: 0;opacity:0;}
}

@-webkit-keyframes tipsmove
{
  0%   {bottom: 0;opacity:0;}
  10%  {bottom: 5rem;opacity:0.9;}
  90%  {bottom: 5rem;opacity:0.9;}
  100% {bottom: 0;opacity:0;}
}
</style>
