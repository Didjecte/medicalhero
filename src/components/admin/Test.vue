<template>
  <!--这里是之前写的cart里面的data数据-->
 <div class="container context_top">
    <vue-headful
      title="MedicalHero - Dashboard"
    />
    <h1 style="margin:30px 0;">Dashboard Admin</h1>
    <el-button @click="connectQb()" type="success" style="margin:30px 0 20px 0;" v-if="!qbConnect">Connect</el-button>
    <br>
    <el-button @click="test()" type="error" style="margin:30px 0 20px 0;">test</el-button>
    <br>
    <el-button @click="createQuote()" type="primary" style="margin:30px 0 20px 0;" >Créer un Deal</el-button>
    <p>{{chrg}}</p>
    <p>{{ffp2}}</p>
    <p>{{chrgExpress}}</p>
    <p>{{ffp2Express}}</p>
    <p>{{chrgPrice}}</p>
    <p>{{ffp2Price}}</p>
    <p>{{chrgStandardPrice}}</p>
    <p>{{ffp2StandardPrice}}</p>
    <p>{{chrgExpressPrice}}</p>
    <p>{{ffp2ExpressPrice}}</p>
    <p>{{totalChrg}}</p>
    <p>{{totalFfp2}}</p>
    <p>{{totalChrgStandard}}</p>
    <p>{{totalFfp2Standard}}</p>
    <p>{{totalChrgExpress}}</p>
    <p>{{totalFfp2Express}}</p>
    <p>{{total_HT | currency}}</p>
    <p>{{total_TVA | currency}}</p>
    <p>{{total_TTC | currency}}</p>
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
      chrgExpress: 0,
      ffp2Express: 0,
      chrgPrice: 0,
      ffp2Price: 0,
      chrgPriceDiscount: 0,
      ffp2PriceDiscount: 0,
      chrgStandardPrice: 0,
      ffp2StandardPrice: 0,
      chrgExpressPrice: 0,
      ffp2ExpressPrice: 0,
      chrgStandardPriceDiscount: 0,
      ffp2StandardPriceDiscount: 0,
      chrgExpressPriceDiscount: 0,
      ffp2ExpressPriceDiscount: 0,

      qbConnect: false
    }
  },
  computed: {
    totalChrg () {
      return this.chrg * this.chrgPrice * (1 + this.chrgPriceDiscount / 100)
    },
    totalFfp2 () {
      return this.ffp2 * this.ffp2Price * (1 + this.ffp2PriceDiscount / 100)
    },
    chrgStandard () {
      return this.chrg - this.chrgExpress
    },
    ffp2Standard () {
      return this.ffp2 - this.ffp2Express
    },
    totalChrgStandard () {
      return this.chrgStandardPrice * (1 + this.chrgStandardPriceDiscount / 100)
    },
    totalChrgExpress () {
      return this.chrgExpressPrice * this.chrgExpress * (1 + this.chrgExpressPriceDiscount / 100)
    },
    totalFfp2Standard () {
      return this.ffp2StandardPrice * this.ffp2Express * (1 + this.ffp2StandardPriceDiscount / 100)
    },
    totalFfp2Express () {
      return this.ffp2ExpressPrice * (1 + this.ffp2ExpressPriceDiscount / 100)
    },
    total_HT () {
      return this.totalChrg + this.totalFfp2 + this.totalChrgStandard + this.totalFfp2Standard + this.totalFfp2Standard + this.totalChrgExpress + this.totalFfp2Express
    },
    total_TVA () {
      return (this.totalChrg + this.totalFfp2) * 0.055 + (this.totalChrgStandard + this.totalFfp2Standard + this.totalChrgExpress + this.totalFfp2Express) * 0.2
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
          if (this.$store.getters.qb !== '') {
            console.log(this.$store.getters.qb)
          }
        })
      })
    })
  },
  methods: {
    test () {
      this.$store.dispatch('qbReAuth')
    },
    connectQb () {
      window.location.href = 'https://www.supply.medicalhero.fr/api/qb/authUri'
      // window.open('https://www.supply.medicalhero.fr/api/qb/authUri', '_blank')
      // window.open('https://www.supply.medicalhero.fr/api/qb/authUri', '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes')
    },
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
                this.chrgExpress = product.data.chrgExpress
                this.ffp2Express = product.data.ffp2Express
              }
              resolve()
            })
          }
        })
      })
    },
    setQuote () {
      if (this.chrg >= 1000000) {
        this.chrgStandardPrice = this.info.chrg.standardPrice[3]
        this.chrgExpressPrice = this.info.chrg.expressPrice[3]
        this.chrgPrice = this.info.chrg.price[4]
      } else if (this.chrg >= 100000) {
        this.chrgStandardPrice = this.info.chrg.standardPrice[3]
        this.chrgExpressPrice = this.info.chrg.expressPrice[3]
        this.chrgPrice = this.info.chrg.price[3]
      } else if (this.chrg >= 20000) {
        this.chrgStandardPrice = this.info.chrg.standardPrice[2]
        this.chrgExpressPrice = this.info.chrg.expressPrice[2]
        this.chrgPrice = this.info.chrg.price[2]
      } else if (this.chrg >= 10000) {
        this.chrgStandardPrice = this.info.chrg.standardPrice[1]
        this.chrgExpressPrice = this.info.chrg.expressPrice[1]
        this.chrgPrice = this.info.chrg.price[1]
      } else if (this.chrg >= 2000) {
        this.chrgStandardPrice = this.info.chrg.standardPrice[0]
        this.chrgExpressPrice = this.info.chrg.expressPrice[0]
        this.chrgPrice = this.info.chrg.price[0]
      } else {
        this.chrgStandardPrice = 0
        this.chrgExpressPrice = 0
        this.chrgPrice = 0
      }
      if (this.ffp2 >= 1000000) {
        this.ffp2StandardPrice = this.info.ffp2.standardPrice[2]
        this.ffp2ExpressPrice = this.info.ffp2.expressPrice[2]
        this.ffp2Price = this.info.ffp2.price[3]
      } else if (this.ffp2 >= 100000) {
        this.ffp2StandardPrice = this.info.ffp2.standardPrice[2]
        this.ffp2ExpressPrice = this.info.ffp2.expressPrice[2]
        this.ffp2Price = this.info.ffp2.price[2]
      } else if (this.ffp2 >= 10000) {
        this.ffp2StandardPrice = this.info.ffp2.standardPrice[1]
        this.ffp2ExpressPrice = this.info.ffp2.expressPrice[1]
        this.ffp2Price = this.info.ffp2.price[1]
      } else if (this.ffp2 >= 600) {
        this.ffp2StandardPrice = this.info.ffp2.standardPrice[0]
        this.ffp2ExpressPrice = this.info.ffp2.expressPrice[0]
        this.ffp2Price = this.info.ffp2.price[0]
      } else {
        this.ffp2StandardPrice = 0
        this.ffp2ExpressPrice = 0
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
            mail: this.user.mail,
            address: this.user.address[0]
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
          chrgExpress: this.chrgExpress,
          ffp2Express: this.ffp2Express,
          chrgPrice: this.chrgPrice,
          ffp2Price: this.ffp2Price,
          chrgPriceDiscount: this.chrgPriceDiscount,
          ffp2PriceDiscount: this.ffp2PriceDiscount,
          chrgStandardPrice: this.chrgStandardPrice,
          ffp2StandardPrice: this.ffp2StandardPrice,
          chrgStandardPriceDiscount: this.chrgStandardPriceDiscount,
          ffp2StandardPriceDiscount: this.ffp2StandardPriceDiscount,
          chrgExpressPrice: this.chrgExpressPrice,
          ffp2ExpressPrice: this.ffp2ExpressPrice,
          chrgExpressPriceDiscount: this.chrgExpressPriceDiscount,
          ffp2ExpressPriceDiscount: this.ffp2ExpressPriceDiscount
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
