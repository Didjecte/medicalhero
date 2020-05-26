<template>
  <div class="deal_form">
    <h2>Générer le devis</h2>
    <el-form :model="quoteForm" ref="quoteFormRef">
      <table>
        <tbody>
          <tr>
            <td colspan="3">
              <div class="deal_title">
                <span>Masques Chirurgicaux</span>
              </div>
            </td>
            <td class="deal_right">MONTANT</td>
          </tr>
          <tr>
            <td class="deal_left">
              <el-form-item prop="chrg" label="Nombre d'unités">
                <el-input v-model="quoteForm.chrg" size="medium"></el-input>
              </el-form-item>
            </td>
            <td class="deal_left">
              <el-form-item prop="chrgPrice" label="Prix Unitaire">
                <el-input v-model="quoteForm.chrgPrice" size="medium"></el-input>
              </el-form-item>
            </td>
            <td class="deal_middle">
              <el-form-item prop="chrgPriceDiscount" label="Remise %">
                <el-input v-model="quoteForm.chrgPriceDiscount" size="medium"></el-input>
              </el-form-item>
            </td >
            <td class="deal_right"><span style="display:block; margin-bottom: 10px">{{totalChrg | currency}}</span></td>
          </tr>
          <tr>
            <td class="deal_left">
              <el-form-item prop="chrgStandard" label="Livraison Standard">
                <el-input v-model="chrgStandard" size="medium" disabled></el-input>
              </el-form-item>
            </td>
            <td class="deal_left">
              <el-form-item prop="chrgStandardPrice" label="Prix Unitaire">
                <el-input v-model="quoteForm.chrgStandardPrice" size="medium"></el-input>
              </el-form-item>
            </td>
            <td class="deal_middle">
              <el-form-item prop="chrgStandardPriceDiscount" label="Remise %">
                <el-input v-model="quoteForm.chrgStandardPriceDiscount" size="medium"></el-input>
              </el-form-item>
            </td >
            <td class="deal_right"><span style="display:block; margin-bottom: 10px">{{totalChrgStandard | currency}}</span></td>
          </tr>
          <tr>
            <td class="deal_left">
              <el-form-item prop="chrgExpress" label="Livraison Express">
                <el-input v-model="quoteForm.chrgExpress" size="medium"></el-input>
              </el-form-item>
            </td>
            <td class="deal_left">
              <el-form-item prop="chrgStandardPrice" label="Prix Unitaire">
                <el-input v-model="quoteForm.chrgExpressPrice" size="medium"></el-input>
              </el-form-item>
            </td>
            <td class="deal_middle">
              <el-form-item prop="chrgExpressPriceDiscount" label="Remise %">
                <el-input v-model="quoteForm.chrgExpressPriceDiscount" size="medium"></el-input>
              </el-form-item>
            </td >
            <td class="deal_right"><span style="display:block; margin-bottom: 10px">{{totalChrgExpress | currency}}</span></td>
          </tr>
        </tbody>
      </table>
      <table>
        <tbody>
          <tr>
            <td colspan="3">
              <div class="deal_title">
                <span>Masques FFP2</span>
              </div>
            </td>
            <td class="deal_right"></td>
          </tr>
          <tr>
            <td class="deal_left">
              <el-form-item prop="ffp2" label="Nombre d'unités">
                <el-input v-model="quoteForm.ffp2" size="medium"></el-input>
              </el-form-item>
            </td>
            <td class="deal_left">
              <el-form-item prop="ffp2Price" label="Prix Unitaire">
                <el-input v-model="quoteForm.ffp2Price" size="medium"></el-input>
              </el-form-item>
            </td>
            <td class="deal_middle">
              <el-form-item prop="ffp2PriceDiscount" label="Remise %">
                <el-input v-model="quoteForm.ffp2PriceDiscount" size="medium"></el-input>
              </el-form-item>
            </td >
            <td class="deal_right"><span style="display:block; margin-bottom: 10px">{{totalFfp2 | currency}}</span></td>
          </tr>
          <tr>
            <td class="deal_left">
              <el-form-item prop="ffp2Standard" label="Livraison Standard">
                <el-input v-model="ffp2Standard" size="medium" disabled></el-input>
              </el-form-item>
            </td>
            <td class="deal_left">
              <el-form-item prop="ffp2StandardPrice" label="Prix Unitaire">
                <el-input v-model="quoteForm.ffp2StandardPrice" size="medium"></el-input>
              </el-form-item>
            </td>
            <td class="deal_middle">
              <el-form-item prop="ffp2StandardPriceDiscount" label="Remise %">
                <el-input v-model="quoteForm.ffp2StandardPriceDiscount" size="medium"></el-input>
              </el-form-item>
            </td >
            <td class="deal_right"><span style="display:block; margin-bottom: 10px">{{totalFfp2Standard | currency}}</span></td>
          </tr>
          <tr>
            <td class="deal_left">
              <el-form-item prop="ffp2Express" label="Livraison Express">
                <el-input v-model="quoteForm.ffp2Express" size="medium"></el-input>
              </el-form-item>
            </td>
            <td class="deal_left">
              <el-form-item prop="ffp2StandardPrice" label="Prix Unitaire">
                <el-input v-model="quoteForm.ffp2ExpressPrice" size="medium"></el-input>
              </el-form-item>
            </td>
            <td class="deal_middle">
              <el-form-item prop="ffp2ExpressPriceDiscount" label="Remise %">
                <el-input v-model="quoteForm.ffp2ExpressPriceDiscount" size="medium"></el-input>
              </el-form-item>
            </td >
            <td class="deal_right"><span style="display:block; margin-bottom: 10px">{{totalFfp2Express | currency}}</span></td>
          </tr>
        </tbody>
      </table>
      <table style="width: 100%">
        <tbody>
          <tr>
            <td class="deal_left"></td>
            <td class="deal_left"></td>
            <td class="deal_middle">TOTAL HT</td>
            <td class="deal_right">{{total_HT | currency}} €</td>
          </tr>
          <tr>
            <td class="deal_left" style="position: relative">
              <div class="deal_button" style="position:absolute; top:0px">
                <el-button @click.stop.prevent="createQuote('quoteFormRef')" native-type="submit" type="primary">Générer le devis</el-button>
              </div>
            </td>
            <td class="deal_left"></td>
            <td class="deal_middle">TOTAL TVA</td>
            <td class="deal_right">{{total_TVA | currency}} €</td>
          </tr>
          <tr >
            <td class="deal_left" colspan="2">
            </td>
            <td class="deal_middle" style="vertical-align: middle">TOTAL TTC</td>
            <td class="deal_right" style="vertical-align: middle"><b style="font-size:x-large">{{total_TTC | currency}} €</b></td>
          </tr>
        </tbody>
      </table>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'DealZero',
  props: {
      info: Object,
      user: Object,
      address: Object,
      dealId: String,
      deal: Object,
      product: Object
  },
  data () {
    return {
      active: 0,
      status_1: '',
      status_2: '',
      status_3: '',
      status_4: '',
      status_5: '',
      desc: 'waiting/to do',
      
      // info: null,
      // user: null,
      // address: null,
      // dealId: '',
      // deal: null,
      // product: null,
      password: '',

      // quote
      quoteForm: {
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
      },
      qbConnect: false
    }
  },
  computed: {
    totalChrg () {
      return this.quoteForm.chrg * this.quoteForm.chrgPrice * (1 + this.quoteForm.chrgPriceDiscount / 100)
    },
    totalFfp2 () {
      return this.quoteForm.ffp2 * this.quoteForm.ffp2Price * (1 + this.quoteForm.ffp2PriceDiscount / 100)
    },
    chrgStandard () {
      return this.quoteForm.chrg - this.quoteForm.chrgExpress
    },
    ffp2Standard () {
      return this.quoteForm.ffp2 - this.quoteForm.ffp2Express
    },
    totalChrgStandard () {
      return this.quoteForm.chrgStandardPrice * this.chrgStandard * (1 + this.quoteForm.chrgStandardPriceDiscount / 100)
    },
    totalChrgExpress () {
      return this.quoteForm.chrgExpressPrice * this.quoteForm.chrgExpress * (1 + this.quoteForm.chrgExpressPriceDiscount / 100)
    },
    totalFfp2Standard () {
      return this.quoteForm.ffp2StandardPrice * this.ffp2Standard * (1 + this.quoteForm.ffp2StandardPriceDiscount / 100)
    },
    totalFfp2Express () {
      return this.quoteForm.ffp2ExpressPrice * this.quoteForm.ffp2Express * (1 + this.quoteForm.ffp2ExpressPriceDiscount / 100)
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
      this.quoteForm.chrg = this.product.chrg
      this.quoteForm.ffp2 = this.product.ffp2
      this.quoteForm.chrgExpress = this.product.chrgExpress
      this.quoteForm.ffp2Express = this.product.ffp2Express
      this.setQuote()
      console.log(this.dealId)
    })
  },
  methods: {
    setQuote () {
      if (this.quoteForm.chrg >= 1000000) {
        this.quoteForm.chrgStandardPrice = this.info.chrg.standardPrice[3]
        this.quoteForm.chrgExpressPrice = this.info.chrg.expressPrice[3]
        this.quoteForm.chrgPrice = this.info.chrg.price[4]
      } else if (this.quoteForm.chrg >= 100000) {
        this.quoteForm.chrgStandardPrice = this.info.chrg.standardPrice[3]
        this.quoteForm.chrgExpressPrice = this.info.chrg.expressPrice[3]
        this.quoteForm.chrgPrice = this.info.chrg.price[3]
      } else if (this.quoteForm.chrg >= 20000) {
        this.quoteForm.chrgStandardPrice = this.info.chrg.standardPrice[2]
        this.quoteForm.chrgExpressPrice = this.info.chrg.expressPrice[2]
        this.quoteForm.chrgPrice = this.info.chrg.price[2]
      } else if (this.quoteForm.chrg >= 10000) {
        this.quoteForm.chrgStandardPrice = this.info.chrg.standardPrice[1]
        this.quoteForm.chrgExpressPrice = this.info.chrg.expressPrice[1]
        this.quoteForm.chrgPrice = this.info.chrg.price[1]
      } else if (this.quoteForm.chrg >= 2000) {
        this.quoteForm.chrgStandardPrice = this.info.chrg.standardPrice[0]
        this.quoteForm.chrgExpressPrice = this.info.chrg.expressPrice[0]
        this.quoteForm.chrgPrice = this.info.chrg.price[0]
      } else {
        this.quoteForm.chrgStandardPrice = 0
        this.quoteForm.chrgExpressPrice = 0
        this.quoteForm.chrgPrice = 0
      }
      if (this.quoteForm.ffp2 >= 1000000) {
        this.quoteForm.ffp2StandardPrice = this.info.ffp2.standardPrice[2]
        this.quoteForm.ffp2ExpressPrice = this.info.ffp2.expressPrice[2]
        this.quoteForm.ffp2Price = this.info.ffp2.price[3]
      } else if (this.quoteForm.ffp2 >= 100000) {
        this.quoteForm.ffp2StandardPrice = this.info.ffp2.standardPrice[2]
        this.quoteForm.ffp2ExpressPrice = this.info.ffp2.expressPrice[2]
        this.quoteForm.ffp2Price = this.info.ffp2.price[2]
      } else if (this.quoteForm.ffp2 >= 10000) {
        this.quoteForm.ffp2StandardPrice = this.info.ffp2.standardPrice[1]
        this.quoteForm.ffp2ExpressPrice = this.info.ffp2.expressPrice[1]
        this.quoteForm.ffp2Price = this.info.ffp2.price[1]
      } else if (this.quoteForm.ffp2 >= 600) {
        this.quoteForm.ffp2StandardPrice = this.info.ffp2.standardPrice[0]
        this.quoteForm.ffp2ExpressPrice = this.info.ffp2.expressPrice[0]
        this.quoteForm.ffp2Price = this.info.ffp2.price[0]
      } else {
        this.quoteForm.ffp2StandardPrice = 0
        this.quoteForm.ffp2ExpressPrice = 0
        this.quoteForm.ffp2Price = 0
      }
    },
    createCustomer () {
      // create Customer on Quickbooks and add password
      return new Promise((resolve, reject) => {
        if (!this.user.customerId) {
          console.log('customers')
          this.$http.post('qb/createCustomer', {
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            company: this.user.company,
            phone: this.user.phone,
            mail: this.user.mail,
            city: this.address.city,
            zip: this.address.zip,
            street: this.address.street,
            complement: this.address.complement
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
    createQuote (formName) {
      // create Quote on quickbooks
      this.createCustomer().then(() => {
        this.$http.post('qb/createQuote', {
          quoteNumber: this.info.quoteNumber,
          customerId: this.user.customerId,
          chrg: this.quoteForm.chrg,
          ffp2: this.quoteForm.ffp2,
          chrgExpress: this.quoteForm.chrgExpress,
          ffp2Express: this.quoteForm.ffp2Express,
          chrgPrice: this.quoteForm.chrgPrice,
          ffp2Price: this.quoteForm.ffp2Price,
          chrgPriceDiscount: this.quoteForm.chrgPriceDiscount,
          ffp2PriceDiscount: this.quoteForm.ffp2PriceDiscount,
          chrgStandardPrice: this.quoteForm.chrgStandardPrice,
          ffp2StandardPrice: this.quoteForm.ffp2StandardPrice,
          chrgStandardPriceDiscount: this.quoteForm.chrgStandardPriceDiscount,
          ffp2StandardPriceDiscount: this.quoteForm.ffp2StandardPriceDiscount,
          chrgExpressPrice: this.quoteForm.chrgExpressPrice,
          ffp2ExpressPrice: this.quoteForm.ffp2ExpressPrice,
          chrgExpressPriceDiscount: this.quoteForm.chrgExpressPriceDiscount,
          ffp2ExpressPriceDiscount: this.quoteForm.ffp2ExpressPriceDiscount
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
              chrg: this.quoteForm.chrg,
              ffp2: this.quoteForm.ffp2,
              to: this.user.mail,
              password: this.password,
              new: false
            }
            if (this.password) {
              parameters.new = true
            }
            this.$http.post('email/sendQuote', parameters)
            this.emitToParent()
          })
        })
      })

      // increment quoteNumber
      this.$http.post('info/quoteNumber', {
        quoteNumber: this.info.quoteNumber + 1
      })
    },
    emitToParent (event) {
      this.$emit('submitQuote')
    }
  }
}
</script>

<style lang="scss" scoped>
  .deal_left{
    width:30%;
  }

  // .deal_middle{
  //   width:10%;
  // }

  .deal_right{
    width:30%;
    text-align: right;
  }
  .context_top{
    margin-top:60px;
  }
  .deal_card{
    display: flex;
    justify-content: space-between;
    // margin-top:20px;
    @media (max-width: 767px) {
      display: block;
      margin-bottom:20px;
    }
    .el-card__body{
      padding: 1em;
      // margin-top:20px;
    }
    .deal_num{
      margin-left:1.2rem;
      margin-right:1rem;
    }
    a{
      display:inline-block;
      text-align: right;
      margin-left:11rem;
    }
  }
  .deal_step{
    margin-top:50px;
    .el-step__line{
      height:1px!important;
      top:9px!important;
      border-bottom:2px dashed #BDC8D6;
      background-color:white;
    }
    .el-step__line-inner{
      border-width:1.5px!important;
      border-color: black;
      transition-delay: 0ms!important;
    }
    .el-step__head.is-success{
      color:black;
      border-color:black;
    }
    .el-step__title.is-success{
      color:black;
    }
    /*.el-step__description.is-success{ !* is-process ??? *!
      color:black;
      width:100px;
      height:100px;
      border-bottom: 50px solid blue;
    }*/
    .el-step__description.is-process{
      color:white;
      background-color:#303133;
      padding-top:10px;
      margin-top:10px;
      position:relative;
      border-radius: 4px;
      height:30px;
      // width:60px;
    }
    .el-step__description.is-process:before{
      content:"";
      width: 0;
      height: 0;
      border-style:solid;
      border-width:10px;
      border-color:transparent transparent #303133 transparent;
      position:absolute;
      top:-19px;
      margin-left:16%;
    }
    @media (max-width:421px) {
      .el-step__description.is-process:before{
        // margin-left:44%;
      }
    }
    .el-step__description{}
  }
  .deal_form{
    margin:5rem 0 2rem 0;
    h1{
      margin:10px 0 25px 0;
    }
    table{/* table可以设置margin但不可以设置padding */
      margin-top:30px;
      @media (max-width: 767px) {
        width:100%;
      }
      .deal_title{
        span{
          font-size:1.2rem;
          font-weight:600;
          padding-right:0.8rem;
        }
        .el-input{
          width:40%;
          @media (max-width: 767px){
            width:100%;
          }
        }
      }
      tr{/* tr、td可以设置padding但不可以设置margin */
        td{
          padding-bottom:20px;
          padding-right:20px;
          @media (max-width: 767px){
            padding-right:10px;
          }
          .el-input{
            margin-top:10px;
          }
        }
      }
    }
  }

  .el-tooltip__popper {
    pointer-events: none !important;
    color:black;
  }

  .info-grey {
    color:grey;
    // font-size:12px;
  }

  .el-input {
    margin-top: 0.1rem !important;
  }
  
  .el-form-item {
    margin-bottom: 0px !important;
  }
  
  /deep/ label{
    text-align: left !important;
    line-height: 20px !important;
  }
  
  td {
    vertical-align: bottom;
    padding-bottom: 10px !important;
  }
</style>
