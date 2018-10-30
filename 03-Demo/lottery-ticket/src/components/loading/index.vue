<template>
  <div class="loading">
    <img src="../../assets/loadImg.gif" alt="" class="load-item">
  </div>
</template>
<script>
export default {
  name: 'loading',
  data: () => ({

  })
}
</script>
<style lang="css" scoped>
.loading {
  position: fixed;
  z-index: 1000;
  margin: 0 auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f2f2f2;
  width: 100%;
  height: 100%;
}
.load-item {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 4rem;
  height: 4rem;
  margin: auto;
}
.load-item::after {
  content: "";
  clear: both;
  visibility: hidden;
}
</style>
