<template>
    <h1>admin_home</h1>
</template>

<script>
export default {
  data () {
    return {
      tableData: [{}]
      // tableData [{
      //   contact: 'Didier HU',
      //   company: 'MedicalHero',
      //   stage: '1',
      //   status: '',
      //   dateStart: '06/05/2020'
      // }]
    }
  },
  computed: {
  },
  created () {

  },
  methods: {
    getDeals () {
      this.$http.post('/deal/')
        .then(deals => {
          // foreach(deals)
        })
    },

    getStatus () {

    }
  }
}
</script>

<style scoped>

</style>
