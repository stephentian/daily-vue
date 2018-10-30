<template>
  <mu-appbar class="title" :title="title">
    <mu-icon-button slot="left">
      <img src="../../assets/logo.jpg" alt="">
    </mu-icon-button>
    <mu-icon-button slot="right" icon="location_on"></mu-icon-button>
  </mu-appbar>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    title () {
      return this.$store.state.tabValue
    }
  }
}
</script>

<style scoped>
  .title {
    text-align: center;
    position: fixed;
    left: 0;
    top: 0;
  }
  .mu-icon-button img {
    height: auto;
    max-width: 100%;
  }
  .mu-icon-button {
    padding: 0;
  }
  .mu-text-field {
    width: 295px;
    margin-bottom: 0;
  }
  .mu-flat-button-label {
    padding: 0;
  }
</style>
