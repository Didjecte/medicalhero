<template>
  <div class="container context_top">
    <!-- <h1>Deal</h1> -->
    <!--
        内置过渡动画
        Layout 布局
        Card 卡片 + Border边框
        Steps 步骤条
        Timeline 时间线
        表单 + Table表格 ？
        响应式
    -->
    <div class="deal_card" v-if="address">
      <el-card shadow="never">
        <span style="font-size: 1.2em"><b>{{user.firstName}} {{user.lastName}}</b></span><br>
        <span>{{user.company}}</span>
        <el-divider direction="vertical"></el-divider>
        <span>{{address.street}}, {{address.city.toUpperCase()}} {{address.zip}} </span><br>
        <span>{{user.phone}}</span>
        <el-divider direction="vertical"></el-divider>
        <span>{{user.mail}}</span>
      </el-card>
      <el-card shadow="never">
        <span><span class="info-grey">N° </span> {{product._id}}</span><br>
        <span v-if="chrgStandard"><span class="info-grey">Chrg Standard:</span> {{chrg}}<br></span>
        <span v-if="ffp2Standard"><span class="info-grey">FFP2 Standard:</span> {{ffp2}}<br></span>
        <span v-if="chrgExpress"><span class="info-grey">Chrg Express:</span> {{chrgExpress}}<br></span>
        <span v-if="ffp2Express"><span class="info-grey">FFP2 Express:</span> {{ffp2Express}}<br></span>
      </el-card>
    </div>
    <!--步骤条-->
    <div class="deal_step">
      <el-steps :active="active" finish-status="success" align-center>
        <!-- error是红色，success是绿色，finish是主题色，wait是等待下一步的灰色，process是--><!--success process wait-->
        <el-step title="Quote" :description="status_1 === 'process' ? desc : ''" :status="status_1"></el-step><!---->
        <el-step title="Bill 1" :description="status_2 === 'process' ? desc : ''" :status="status_2"></el-step><!---->
        <el-step title="Shipping" :description="status_3 === 'process' ? desc : ''" :status="status_3"></el-step><!---->
        <el-step title="Bill 2" :description="status_4 === 'process' ? desc : ''" :status="status_4"></el-step><!---->
        <el-step title="Closed" :description="status_5 === 'process' ? desc : ''" :status="status_5"></el-step><!---->
      </el-steps>
    </div>
    <!--表单+表格-->
    <div class="deal_form">
      <h1>Generer le devis</h1>
      <table>
        <tbody>
        <tr>
          <td class="deal_left">
            <div class="deal_title">
              <span>Masques Chirurgicaux</span>
              <el-input v-model="num1" placeholder="请输入内容"></el-input>
            </div>
          </td>
          <td class="deal_middle"></td>
          <td class="deal_right">Prix total</td>
        </tr>
        <tr>
          <td class="deal_left">
            Prix Unitaire
            <el-input v-model="num2" placeholder="请输入内容"></el-input>
          </td>
          <td class="deal_middle">Remise %
            <el-input v-model="num3" placeholder="请输入内容"></el-input>
          </td >
          <td class="deal_right">1970$</td>
        </tr>
        <tr>
          <td class="deal_left">Prix Livraison
            <el-input v-model="num2" placeholder="请输入内容"></el-input>
          </td>
          <td class="deal_middle">Remise %
            <el-input v-model="num3" placeholder="请输入内容"></el-input>
          </td>
          <td class="deal_right">250$</td>
        </tr>
        </tbody>
      </table>
      <table>
        <tbody>
        <tr>
          <td class="deal_left">
            <div class="deal_title">
              <span>Masques Chirurgicaux</span>
              <el-input v-model="num1" placeholder="请输入内容"></el-input>
            </div>
          </td>
          <td class="deal_middle"></td>
          <td class="deal_right">Prix total</td>
        </tr>
        <tr>
          <td class="deal_left">
            Prix Unitaire
            <el-input v-model="num2" placeholder="请输入内容"></el-input>
          </td>
          <td class="deal_middle">Remise %
            <el-input v-model="num3" placeholder="请输入内容"></el-input>
          </td>
          <td class="deal_right">1970$</td>
        </tr>
        <tr>
          <td class="deal_left">Prix Livraison
            <el-input v-model="num2" placeholder="请输入内容"></el-input>
          </td>
          <td class="deal_middle">Remise %
            <el-input v-model="num3" placeholder="请输入内容"></el-input>
          </td>
          <td class="deal_right">250$</td>
        </tr>
        <tr>
          <td class="deal_left"></td>
          <td class="deal_middle">TOTAL HT</td>
          <td class="deal_right">3510$</td>
        </tr>
        <tr>
          <td class="deal_left"></td>
          <td class="deal_middle">TOTAL TTC</td>
          <td class="deal_right">4212$</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="deal_button">
      <el-button @click.stop.prevent="next()" type="primary">Generer</el-button>
    </div>
  </div>

</template>

<script>
export default {
  name: 'DealOne',
  data () {
    return {
      active: 0,
      num1: 2000,
      num2: 0.86,
      num3: 0,
      status_1: '',
      status_2: '',
      status_3: '',
      status_4: '',
      status_5: '',
      desc: 'waiting/to do',
      
      info: null,
      user: null,
      address: null,
      dealId: '',
      deal: null,
      product: null,
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
      this.dealId = this.$route.params.dealId
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
  created () {
    if (this.active === 0) {
      this.status_1 = 'process'/*  */
      this.status_2 = 'wait'
      this.status_3 = 'wait'
      this.status_4 = 'wait'
      this.status_5 = 'wait'
    }
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
            }).then(() => {
              console.log(this.user)
              this.$http.get('address/address/'+ this.user.billingAddress).then((address) => {
                this.address = address.data
              })
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
          this.$http.get('address/address'+ this.user.billingAddress).then((address) => {
            this.address = address
            this.$http.post('qb/createCustomer', {
              firstName: this.user.firstName,
              lastName: this.user.lastName,
              company: this.user.company,
              phone: this.user.phone,
              mail: this.user.mail,
              city: address.city,
              zip: address.zip,
              street: address.street,
              complement: address.complement
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
    },
    next () {
      /* if (this.active++ > 4) this.active = 1 */
      if (this.active === 0) {
        this.active += 2
      } else {
        this.active++
      }
      if (this.active === 1) {
        this.status_1 = 'process'/*  */
        this.status_2 = 'wait'
        this.status_3 = 'wait'
        this.status_4 = 'wait'
        this.status_5 = 'wait'
      } else if (this.active === 2) {
        this.status_1 = 'success'
        this.status_2 = 'process'
        this.status_3 = 'wait'
        this.status_4 = 'wait'
        this.status_5 = 'wait'
      } else if (this.active === 3) {
        this.status_1 = 'success'
        this.status_2 = 'success'
        this.status_3 = 'process'
        this.status_4 = 'wait'
        this.status_5 = 'wait'
      } else if (this.active === 4) {
        this.status_1 = 'success'
        this.status_2 = 'success'
        this.status_3 = 'success'
        this.status_4 = 'process'
        this.status_5 = 'wait'
      } else if (this.active === 5) {
        this.status_1 = 'success'
        this.status_2 = 'success'
        this.status_3 = 'success'
        this.status_4 = 'success'
        this.status_5 = 'process'
      }
    }
  }
}
</script>

<style lang="scss">
  .deal_left .deal_middle{
    width:40%;
  }
  .deal_right{
    width:20%;
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
</style>
