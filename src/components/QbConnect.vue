<template>
  <div class="container">

  </div>
</template>

<script>
export default {
  data () {
    return {
      name: 'Thank',
      prevRoute: null
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      if (this.$route.query.access_token) {
        const data = this.$route.query
        console.log(data)
        this.$store.dispatch('qbAuthUri', data).then(() => {
          this.$router.push('/admin')
        })
      } else {
        this.$router.push('/')
      }
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
