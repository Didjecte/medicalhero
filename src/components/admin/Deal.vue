<template>
  <div class="container context_top">
    <vue-headful
            title="MedicalHero - Deal"
        />
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
    <div class="deal_card" v-if="address && product">
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
        <span v-if="product.chrgExpress-product.chrg"><span class="info-grey">Chrg Standard:</span> {{product.chrgExpress-product.chrg}}<br></span>
        <span v-if="product.ffp2Express-product.ffp2"><span class="info-grey">FFP2 Standard:</span> {{product.ffp2Express-product.ffp2}}<br></span>
        <span v-if="product.chrgExpress"><span class="info-grey">Chrg Express:</span> {{product.chrgExpress}}<br></span>
        <span v-if="product.ffp2Express"><span class="info-grey">FFP2 Express:</span> {{product.ffp2Express}}<br></span>
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
    <!--Deal 0-->
    <div v-if="product && address">
      <DealZero v-if="deal.stage == 0"
                :info="info"
                :user="user"
                :address="address"
                :dealId="dealId"
                :deal="deal"
                :product="product"
                v-on:submitQuote="onQuoteSubmit">
                </DealZero>
      <div v-if="deal.stage == 1">
        En attente du bon pour accord.
      </div>
    </div>
  </div>

</template>

<script>
import DealZero from '../admin/DealZero.vue'
export default {
  name: 'Deal',
  components: {
    DealZero
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

      info: null,
      user: null,
      address: null,
      dealId: '',
      deal: null,
      product: null,

      // quoteForm: {
      //   chrg: 0,
      //   ffp2: 0,
      //   chrgExpress: 0,
      //   ffp2Express: 0,
      //   chrgPrice: 0,
      //   ffp2Price: 0,
      //   chrgPriceDiscount: 0,
      //   ffp2PriceDiscount: 0,
      //   chrgStandardPrice: 0,
      //   ffp2StandardPrice: 0,
      //   chrgExpressPrice: 0,
      //   ffp2ExpressPrice: 0,
      //   chrgStandardPriceDiscount: 0,
      //   ffp2StandardPriceDiscount: 0,
      //   chrgExpressPriceDiscount: 0,
      //   ffp2ExpressPriceDiscount: 0,
      // },
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
      return this.quoteForm.chrgStandardPrice * (1 + this.quoteForm.chrgStandardPriceDiscount / 100)
    },
    totalChrgExpress () {
      return this.quoteForm.chrgExpressPrice * this.quoteForm.chrgExpress * (1 + this.quoteForm.chrgExpressPriceDiscount / 100)
    },
    totalFfp2Standard () {
      return this.quoteForm.ffp2StandardPrice * this.quoteForm.ffp2Express * (1 + this.quoteForm.ffp2StandardPriceDiscount / 100)
    },
    totalFfp2Express () {
      return this.quoteForm.ffp2ExpressPrice * (1 + this.quoteForm.ffp2ExpressPriceDiscount / 100)
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
          this.setStage()
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
            }).then(() => {
              this.$http.get('address/address/'+ this.user.billingAddress).then((address) => {
                this.address = address.data
              })
            })
            this.$http.get('product/product/' + deal.data.product).then((product) => {
              if (product.data !== null) {
                this.product = product.data
                // this.quoteForm.chrg = product.data.chrg
                // this.quoteForm.ffp2 = product.data.ffp2
                // this.quoteForm.chrgExpress = product.data.chrgExpress
                // this.quoteForm.ffp2Express = product.data.ffp2Express
              }
              resolve()
            })
          }
        })
      })
    },
    setStage() {
      let stage = +this.deal.stage
      if(stage%2 == 0) {
        this.desc = "To Do"
      }else {
        this.desc = "Waiting"
      }
      if (stage === 0 || stage === 1) {
        this.status_1 = 'process'/*  */
        this.status_2 = 'wait'
        this.status_3 = 'wait'
        this.status_4 = 'wait'
        this.status_5 = 'wait'
      } else if (stage === 2 || stage === 3) {
        this.status_1 = 'success'
        this.status_2 = 'process'
        this.status_3 = 'wait'
        this.status_4 = 'wait'
        this.status_5 = 'wait'
      } else if (stage === 4 || stage === 5) {
        this.status_1 = 'success'
        this.status_2 = 'success'
        this.status_3 = 'process'
        this.status_4 = 'wait'
        this.status_5 = 'wait'
      } else if (stage === 6 || stage === 7) {
        this.status_1 = 'success'
        this.status_2 = 'success'
        this.status_3 = 'success'
        this.status_4 = 'process'
        this.status_5 = 'wait'
      } else if (stage === 8 || stage === 9) {
        this.status_1 = 'success'
        this.status_2 = 'success'
        this.status_3 = 'success'
        this.status_4 = 'success'
        this.status_5 = 'process'
      }
    },
    onQuoteSubmit() {
      console.log('test')
      this.getInfo().then(() => {
        this.getDealUserProduct().then(() => {
          console.log(this.deal.stage)
          this.setStage()
        })
      })
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
