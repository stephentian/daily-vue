<template>
  <div class="footer">
    <mu-paper>
      <mu-bottom-nav shift
                     :value="bottomNav"
                     @change="handleChange">
        <mu-bottom-nav-item to="/tour"
                            value="行程"
                            title="行程"
                            icon="flight_takeoff"></mu-bottom-nav-item>
        <mu-bottom-nav-item to="/meet"
                            value="相逢"
                            title="相逢"
                            icon="subject"></mu-bottom-nav-item>
        <mu-bottom-nav-item to="/link"
                            value="相识"
                            title="相识"
                            icon="email"></mu-bottom-nav-item>
        <mu-bottom-nav-item to="/bags"
                            value="背包"
                            title="背包"
                            icon="person_pin"></mu-bottom-nav-item>
      </mu-bottom-nav>
    </mu-paper>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    bottomNav () {
      return this.$store.state.tabValue
    }
  },
  methods: {
    handleChange (val) {
      this.$store.dispatch('changeValue', val)
    }
  }
}
</script>

<style>
.footer {
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
}
</style>
