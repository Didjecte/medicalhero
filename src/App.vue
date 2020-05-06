<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import SimpleBar from 'simplebar' // simplebar
export default {
  data () {
    return {
      el: null
    }
  },
  created: function () {
    this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch('logout')
        }
        throw err
      })
    })
  },
  mounted () {
    this.el = SimpleBar.instances.get(document.querySelector('[data-simplebar]'))
  },
  updated () {
    this.$nextTick(function () {
      this.el.getScrollElement().scrollTop = 0
    })
  }
}
</script>

<style lang="scss">
</style>
