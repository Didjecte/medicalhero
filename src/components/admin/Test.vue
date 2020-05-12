<template>
  <div class="container context_top">
    <vue-headful
      title="MedicalHero - Dashboard"
      />
    <h1 style="margin:30px 0;">Dashboard Admin</h1>
    <el-button @click="createQuote()" type="primary" style="margin:30px 0 20px 0;" >Créer un Deal</el-button>
    <p>{{chrg}}</p>
    <p>{{ffp2}}</p>
    <p>{{chrgPrice}}</p>
    <p>{{ffp2Price}}</p>
    <p>{{chrgDeliveryPrice}}</p>
    <p>{{ffp2DeliveryPrice}}</p>
    <p>{{totalChrg}}</p>
    <p>{{totalFfp2}}</p>
    <p>{{totalChrgDelivery}}</p>
    <p>{{totalFfp2Delivery}}</p>
    <p>{{total_HT}}</p>
    <p>{{total_TVA}}</p>
    <p>{{total_TTC}}</p>
  </div>
</template>

<script>
export default {
  name: 'AdminHome',
  data () {
    return {
      info: null,
      user: [],
      dealId: '5eb6dcf32800247ffb6c83eb',
      deal: [],
      product: [],
      password: '',

      // quote
      chrg: 0,
      ffp2: 0,
      chrgPrice: 0,
      ffp2Price: 0,
      chrgPriceDiscount: 0,
      ffp2PriceDiscount: 0,
      chrgDeliveryPrice: 0,
      ffp2DeliveryPrice: 0,
      chrgDeliveryPriceDiscount: 0,
      ffp2DeliveryPriceDiscount: 0
    }
  },
  computed: {
    totalChrg () {
      return this.chrg * this.chrgPrice * (1 + this.chrgPriceDiscount / 100)
    },
    totalFfp2 () {
      return this.chrg * this.chrgPrice * (1 + this.chrgPriceDiscount / 100)
    },
    totalChrgDelivery () {
      return this.chrgDeliveryPrice * (1 + this.chrgDeliveryPriceDiscount / 100)
    },
    totalFfp2Delivery () {
      return this.ffp2DeliveryPrice * (1 + this.ffp2DeliveryPriceDiscount / 100)
    },
    total_HT () {
      return this.totalChrg + this.totalFfp2 + this.totalChrgDelivery + this.totalFfp2Delivery
    },
    total_TVA () {
      return (this.totalChrg + this.totalFfp2) * 0.055 + (this.totalChrgDelivery + this.totalFfp2Delivery) * 0.2
    },
    total_TTC () {
      return this.total_HT + this.total_TVA
    }
  },
  mounted () {
    this.$nextTick(function () {
      // this.dealId = this.$route.params.id
      this.getInfo().then(() => {
        this.getDealUserProduct().then(() => {
          this.setQuote()
        })
      })
    })
  },
  methods: {
    getInfo () {
      return new Promise((resolve, reject) => {
        this.$http.get('info').then((res) => {
          this.info = res.data
          resolve()
        })
      })
    },
    getDealUserProduct () {
      return new Promise((resolve, reject) => {
        this.$http.get('deal/deal/' + this.dealId).then((deal) => {
          if (deal.data === null) {
            this.$router.push({ path: '/notFound' })
            resolve()
          } else {
            this.deal = deal.data
            this.$http.get('user/user/' + deal.data.user).then((user) => {
              if (user.data !== null) {
                this.user = user.data
              }
            })
            this.$http.get('product/product/' + deal.data.product).then((product) => {
              if (product.data !== null) {
                this.product = product.data
                this.chrg = product.data.chrg
                this.ffp2 = product.data.ffp2
              }
              resolve()
            })
          }
        })
      })
    },
    setQuote () {
      if (this.chrg >= 1000000) {
        this.chrgDeliveryPrice = this.info.chrgDeliveryPrice[3]
        this.chrgPrice = this.info.chrgPrice[4]
      } else if (this.chrg >= 100000) {
        this.chrgDeliveryPrice = this.info.chrgDeliveryPrice[3]
        this.chrgPrice = this.info.chrgPrice[3]
      } else if (this.chrg >= 20000) {
        this.chrgDeliveryPrice = this.info.chrgDeliveryPrice[2]
        this.chrgPrice = this.info.chrgPrice[2]
      } else if (this.chrg >= 10000) {
        this.chrgDeliveryPrice = this.info.chrgDeliveryPrice[1]
        this.chrgPrice = this.info.chrgPrice[1]
      } else if (this.chrg >= 2000) {
        this.chrgDeliveryPrice = this.info.chrgDeliveryPrice[0]
        this.chrgPrice = this.info.chrgPrice[0]
      } else {
        this.chrgDeliveryPrice = 0
        this.chrgPrice = 0
      }
      if (this.ffp2 >= 1000000) {
        this.ffp2DeliveryPrice = this.info.ffp2DeliveryPrice[2]
        this.ffp2Price = this.info.ffp2Price[3]
      } else if (this.ffp2 >= 100000) {
        this.ffp2DeliveryPrice = this.info.ffp2DeliveryPrice[2]
        this.ffp2Price = this.info.ffp2Price[2]
      } else if (this.ffp2 >= 10000) {
        this.ffp2DeliveryPrice = this.info.ffp2DeliveryPrice[1]
        this.ffp2Price = this.info.ffp2Price[1]
      } else if (this.ffp2 >= 600) {
        this.ffp2DeliveryPrice = this.info.ffp2DeliveryPrice[0]
        this.ffp2Price = this.info.ffp2Price[0]
      } else {
        this.ffp2DeliveryPrice = 0
        this.ffp2Price = 0
      }
    },
    createCustomer () {
      // create Customer on Quickbooks and add password
      return new Promise((resolve, reject) => {
        if (!this.user.customerId) {
          this.$http.post('qb/createCustomer', {
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            company: this.user.company,
            phone: this.user.phone,
            mail: this.user.mail
          }).then(customerId => {
            this.$http.post('user/addPass', {
              userId: this.user._id,
              customerId: customerId.data
            }).then(password => {
              this.password = password.data
              this.$http.get('user/user/' + this.deal.user).then((user) => {
                if (user.data !== null) {
                  this.user = user.data
                }
                setTimeout(function () {
                  resolve()
                }, 1000)
              })
            })
          })
        } else {
          setTimeout(function () {
            resolve()
          }, 1000)
        }
      })
    },
    createQuote () {
      // create Quote on quickbooks
      this.createCustomer().then(() => {
        this.$http.post('qb/createQuote', {
          quoteNumber: this.info.quoteNumber,
          customerId: this.user.customerId,
          chrg: this.chrg,
          ffp2: this.ffp2,
          chrgPrice: this.chrgPrice,
          ffp2Price: this.ffp2Price,
          chrgPriceDiscount: this.chrgPriceDiscount,
          ffp2PriceDiscount: this.ffp2PriceDiscount,
          chrgDeliveryPrice: this.totalChrgDelivery,
          ffp2DeliveryPrice: this.totalFfp2Delivery,
          chrgDeliveryPriceDiscount: this.chrgDeliveryPriceDiscount,
          ffp2DeliveryPriceDiscount: this.ffp2DeliveryPriceDiscount
        }).then(result => {
          this.$http.post('deal/quote', {
            dealId: this.dealId,
            quoteId: result.data.quoteId,
            quoteName: result.data.quoteName
          })
          this.$http.post('qb/getQuotePdf', {
            quoteId: result.data.quoteId,
            quoteName: result.data.quoteName
          }).then(() => {
            const parameters = {
              quoteName: result.data.quoteName,
              firstName: this.user.firstName,
              chrg: this.chrg,
              ffp2: this.ffp2,
              to: this.user.mail,
              password: this.password,
              new: false
            }
            if (this.password) {
              parameters.new = true
            }
            this.$http.post('email/sendQuote', parameters)
          })
        })
      })

      // increment quoteNumber
      this.$http.post('info/quoteNumber', {
        quoteNumber: this.info.quoteNumber + 1
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
