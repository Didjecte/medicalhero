<template>
  <div class="container context_top">
    <vue-headful
      title="MedicalHero - Dashboard"
      />
    <h1 style="margin:30px 0;">Dashboard Admin</h1>
    <el-button @click="createQuote()" type="primary" style="margin:30px 0 20px 0;" >Créer un Deal</el-button>

  </div>
</template>

<script>
export default {
  name: 'AdminHome',
  data () {
    return {
      info: null,
      user: [],
      dealId: '5eb6dcd12800247ffb6c83e8'
    }
  },
  watch: {

  },
  mounted () {
    this.$nextTick(function () {
      // this.dealId = this.$route.params.id
      this.getInfo()
      this.getUserInfo()
    })
  },
  methods: {
    getInfo () {
      this.$http.get('info').then((res) => {
        this.info = res.data
      })
    },
    getUserInfo () {
      this.$http.get('deal/deal/' + this.dealId).then((deal) => {
        console.log('yes')
        if (deal.data === null) {
          this.$router.push({ path: '/notFound' })
        } else {
          this.$http.get('user/user/' + deal.data.user).then((user) => {
            if (user.data !== null) {
              this.user = user.data
            }
          })
        }
      })
    },
    createQuote () {
      // create Customer on Quickbooks and add password
      if (!this.user.customerId) {
        this.$http.post('qb/createCustomer', {
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          company: this.user.company,
          phone: this.user.phone,
          mail: this.user.mail
        }).then(customerId => {
          console.log('next')
          this.$http.post('user/addPass', {
            userId: this.user.userId,
            customerId: customerId.data
          }).then(password => { password = password.data })
        })
      }
      // increment quoteNumber
      this.$http.post('info/quoteNumber', {
        quoteNumber: this.info.quoteNumber + 1
      })

      // create Quote on quickbooks
      this.$http.post('qb/createQuote', {
        quoteNumber: this.info.quoteNumber,
        chrg: this.product.chrg,
        ffp2: this.product.ffp2,
        chrgPrice: this.chrgPrice,
        ffp2Price: this.ffp2Price,
        chrgDeliveryPrice: +this.info.chrgDeliveryPrice,
        ffp2DeliveryPrice: +this.info.ffp2DeliveryPrice,
        chrgExpress: this.product.chrgExpress,
        ffp2Express: this.product.ffp2Express
      }).then(result => {
        this.$http.post('deal/quote', {
          dealId: this.result.data.dealId,
          quoteId: this.result.data.quoteId,
          quoteName: this.result.data.quoteName
        })
        this.$http.post('qb/getQuotePdf', {
          quoteId: this.result.data.quoteId,
          quoteName: this.result.data.quoteName
        }).then(function () {
          const parameters = {
            quoteName: this.result.data.quoteName,
            firstname: this.user.firstName,
            chrg: this.product.chrg,
            ffp2: this.product.ffp2,
            to: this.user.mail,
            new: false
          }
          if (this.user.customerId) {
            parameters.params.new = true
          }
          this.$http.post('email/sendQuote', parameters)
        })
      })
    }
  }
}
</script>

<style scoped>
  .context_top{
    margin-top:60px;
  }

</style>
