<template>
    <div class="content">
      <vue-headful
              title="MedicalHero - Estimation"
              description="Faites une estimation en live de votre commande et recevez un devis."
          />
      <div class="c_top">
        <div class="container">
          <h2>Estimation tarifaire</h2>
          <h4>Produits demandés</h4>
          <div>
            <div class="c_side">
              <el-row type="flex" justify="space-between" align="middle">
                <el-col>
                  <div class="c_text">
                    <span>Masques Chirurgicaux (Lots de 2000)：</span><span>{{num2}}</span>
                  </div>
                </el-col>
                <el-col>
                  <div class="block">
                    <el-input-number v-model="num2" :step="2000" step-strictly :min="0" @change="change2()"></el-input-number>
                  </div>
                </el-col>
              </el-row>
            </div>
            <div class="c_side">
              <el-row type="flex" justify="space-between" align="middle">
                <el-col>
                  <div class="c_text">
                    <span>Masques FFP2 (Lots de 600)：</span><span>{{num1}}</span>
                  </div>
                </el-col>
                <el-col>
                  <div class="block">
                    <el-input-number v-model="num1" :step="600" step-strictly :min="0" @change="change1()"></el-input-number>
                  </div>
                </el-col>
              </el-row>
            </div>
            <el-collapse-transition>
              <div v-show="isEmpty">
                <el-alert title="La commande ne peut être vide." type="error" :closable="false"></el-alert>
              </div>
            </el-collapse-transition>
            <div>
              <p style="color:gray;font-size:12px;">🚀<i>Contactez nous si vous avez des questions.<br/>
              Par mail : <a href="mailto:contact@medicalhero.fr" target="_blank">contact@medicalhero.fr</a><br/>
              Par téléphone : Anne est à votre disposition du Lundi au Samedi de 9h à 19h, au +33(0)6 46 84 13 45</i></p>
            </div>
            <!-- <div>
              <p style="font-size:12px"><el-checkbox v-model="flag">
                Service Urgence Express:</el-checkbox> Réception sous 2j de 10% maximum de la commande dans la limite du stock disponible.
              </p>
            </div> -->
            <el-collapse-transition>
              <div v-show="flag">
                <div class="c_side">
                  <el-row type="flex" justify="space-between" align="middle">
                    <el-col>
                      <div class="c_text">
                        <span>Masques Chirurgicaux (Lots de 50)：</span><span>{{express_chrg}}</span>
                      </div>
                    </el-col>
                    <el-col>
                      <div class="block">
                        <el-input-number v-model="express_chrg" :step="50" step-strictly :min="0" :max="chrg_max"></el-input-number>
                      </div>
                    </el-col>
                  </el-row>
                </div>
                <div class="c_side">
                  <el-row type="flex" justify="space-between" align="middle">
                    <el-col>
                      <div class="c_text">
                        <span>Masques FFP2 (Lots de 10)：</span><span>{{express_ffp2}}</span>
                      </div>
                    </el-col>
                    <el-col>
                      <div class="block">
                        <el-input-number
                          v-model="express_ffp2"
                          :step="10"
                          step-strictly
                          :min="0"
                          :max="ffp2_max">
                        </el-input-number>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </el-collapse-transition>
          </div>
        </div>
      </div>
      <!--上边报价单-->
      <!-- <div class="c_middle">
        <div class="container">
          <table>
            <thead>
              <tr class="t_title">
                <th class="t_date">PRODUITS / SERVICES</th>
                <th class="t_center">QTE</th>
                <th class="t_center">PRIX UNITARE</th>
                <th class="t_num">MONTANT</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="t_date t_height">Masques Chirurgicaux</td>
                <td class="t_center t_height">{{num2}}</td>
                <td class="t_center t_height">{{chrgPrice}}</td>
                <td class="t_num t_height">{{chrgTotal | currency}}</td>
              </tr>
              <tr>
                <td class="t_date">Masques FFP2</td>
                <td class="t_center" style="width:300px">{{num1}}</td>
                <td class="t_center">{{ffp2Price}}</td>
                <td class="t_num">{{ffp2Total | currency}}</td>
              </tr>
              <tr>
                <td class="t_date">Livraison - Masques chirurgicaux</td>
                <td class="t_center"></td>
                <td class="t_center"></td>
                <td class="t_num">{{nationChrg | currency}}</td>
              </tr>
              <tr>
                <td class="t_date">Livraison - Masques FFP2</td>
                <td class="t_center"></td>
                <td class="t_center"></td>
                <td class="t_num">{{nationFFP2 | currency}}</td>
              </tr>
            </tbody>
          </table> -->
          <!-- <el-collapse-transition>
            <div v-show="flag">
              <table>
                <tbody>
                  <tr>
                    <td class="t_date">Express: Masques chirurgicaux</td>
                    <td class="t_center">{{express_chrg}}</td>
                    <td class="t_center">{{priceEXPchrg}}</td>
                    <td class="t_num">{{expressTotalChrg | currency}}</td>
                  </tr>
                  <tr>
                    <td class="t_date">Express: Masques FFP2</td>
                    <td class="t_center">{{express_ffp2}}</td>
                    <td class="t_center">{{priceEXPffp2}}</td>
                    <td class="t_num">{{expressTotalFFP2 | currency}}</td>
                  </tr>
                  <tr>
                    <td class="t_date">Express: Livraison</td>
                    <td class="t_center"></td>
                    <td class="t_center"></td>
                    <td class="t_num">{{express | currency}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </el-collapse-transition> -->
          <!-- <table style="border-bottom: 1px solid rgba(232, 232, 232, 1)">
            <tbody>
              <tr>
                <td style="padding:20px 0 10px"><div class="line"></div></td>
                <td style="padding:20px 0 10px"><div class="line"></div></td>
                <td style="padding:20px 0 10px"><div class="line"></div></td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td class="t_date"></td>
                <td class="t_center t_height">TOTAL HT</td>
                <td class="t_num t_height" style="width:40%">
                  {{total_HT | currency}}
                </td>
              </tr>
              <tr>
                <td class="t_date"></td>
                <td class="t_center">TOTAL TVA</td>
                <td class="t_num">
                  {{total_TVA | currency}}
                </td>
              </tr>
              <tr>
                <td class="t_date"></td>
                <td class="t_center">TOTAL TTC</td>
                <td class="t_num t_total" style="width:40%">
                  {{total_TTC | currency}} EUR
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div> -->
      <div class="c_bottom">
        <div class="container">
          <h4>Contact</h4>
          <el-form :model="userForm" :rules="userFormRules" ref="userFormRef" class="el_form">
            <el-row type="flex" justify="center" align="middle" class="contact_input" :gutter="20">
              <el-col>
                <el-form-item prop="firstName" label="Prénom" class="label">
                  <el-input v-model="userForm.firstName"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item prop="lastName" label="Nom">
                  <el-input v-model="userForm.lastName"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="center" align="middle" class="contact_input" :gutter="20">
              <el-col>
                <el-form-item prop="company" label="Société">
                  <el-input v-model="userForm.company"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item prop="telephone" label="Téléphone">
                  <el-input v-model="userForm.telephone"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="center" align="middle" class="contact_input" :gutter="20">
              <el-col>
                <el-form-item prop="to" label="Email">
                  <el-input v-model="userForm.to"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="c_button"><el-button @click.stop.prevent="postForm('userFormRef')" native-type="submit" type="primary" :disabled="isEmpty">Recevoir un devis final</el-button></div>
          </el-form>
        </div>
      </div>
    </div>
</template>

<script>

export default {
  name: 'FormData',
  data () {
    const checkName = (rule, value, callback) => {
      const regTel = /^[a-zA-Z]*$/
      if (regTel.test(value)) {
        return callback()
      }
      callback(new Error('Ne peut contenir de caractères spéciaux.'))
    }
    const checkTel = (rule, value, callback) => {
      const regTel = /^\d{10}$/
      if (regTel.test(value)) {
        return callback()
      }
      callback(new Error('Veuillez saisir un numéro de tél valide.'))
    }
    const checkEmail = (rule, value, callback) => {
      // 验证邮箱的正则表达式
      const regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
      if (regEmail.test(value)) {
        return callback()
      }
      callback(new Error('Veuillez saisir un mail valide.'))
    }
    return {
      /* input: 12, */
      /* 口罩数量 */
      num1: 600,
      num2: 2000,
      /* 口罩数组单价 */
      price1: [1, 2, 3, 4],
      price2: [1, 2, 3, 4, 5],
      /*  国际和法国两个快递 */
      ffp2DeliveryPrice: [], // ffp2_国际快递费
      chrgDeliveryPrice: [], // 医用_国际快递费
      franceDeliveryPrice: [], // 法国快递数组费
      /* 超级快递中口罩数量 */
      express_ffp2: 0, // 10个10个一加
      express_chrg: 0, // 50个50个一加
      // ffp2_max: 10, /* ffp2超级快递数量最大值 */
      // chrg_max: 50, /* chrg_max超级快递数量最大值 */
      /* ------------------ */
      flag: false,
      // disabled: true,
      // isActive: false,
      userForm: {
        firstName: '',
        lastName: '',
        company: '',
        telephone: '',
        to: ''
      },
      userFormRules: {
        firstName: [
          { required: true, message: 'Veuillez saisir votre nom de famille!', trigger: 'blur' },
          { validator: checkName, trigger: 'blur' }
        ],
        lastName: [
          { required: true, message: 'Veuillez saisir votre nom!', trigger: 'blur' }
        ],
        company: [
          { required: true, message: 'Veuillez saisir le nom de votre société!', trigger: 'blur' }
        ],
        telephone: [
          { required: true, message: 'Entrez votre téléphone!', trigger: 'blur' },
          { validator: checkTel, trigger: 'blur' }
        ],
        to: [
          { required: true, message: 'Veuillez saisir votre Email!', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ]
      }
      // userId: '',
      // productId: '',
      // dealId: ''
    }
  },
  computed: {
    isEmpty () {
      if (this.num1 === 0 && this.num2 === 0) {
        return true
      } else {
        return false
      }
    },
    /* ffp2口罩单价 */
    ffp2Price () {
      let ffpMoney
      if (this.num1 >= 1000000) {
        ffpMoney = this.price1[3]
      } else if (this.num1 >= 100000) {
        ffpMoney = this.price1[2]
      } else if (this.num1 >= 10000) {
        ffpMoney = this.price1[1]
      } else if (this.num1 >= 0) {
        ffpMoney = this.price1[0]
      }
      return ffpMoney
    },
    /* 医用口罩单价 */
    chrgPrice () {
      let chrgMoney
      if (this.num2 >= 1000000) {
        chrgMoney = this.price2[4]
      } else if (this.num2 >= 100000) {
        chrgMoney = this.price2[3]
      } else if (this.num2 >= 20000) {
        chrgMoney = this.price2[2]
      } else if (this.num2 >= 10000) {
        chrgMoney = this.price2[1]
      } else if (this.num2 >= 0) {
        chrgMoney = this.price2[0]
      }
      return chrgMoney
    },
    /* ffp2口罩总金额 */
    ffp2Total () {
      return this.num1 * this.ffp2Price
    },
    /* 医用口罩总金额 */
    chrgTotal () {
      return this.num2 * this.chrgPrice
    },
    /* ffp2 国际快递总金额 */
    nationFFP2 () {
      let ffpMoney = 0
      if (this.num1 >= 1000000) {
        ffpMoney = this.ffp2DeliveryPrice[3]
      } else if (this.num1 >= 100000) {
        ffpMoney = this.ffp2DeliveryPrice[2]
      } else if (this.num1 >= 10000) {
        ffpMoney = this.ffp2DeliveryPrice[1]
      } else if (this.num1 >= 600) {
        ffpMoney = this.ffp2DeliveryPrice[0] * (this.num1 / 600)
      }
      return ffpMoney
    },
    /* 医用 国际快递总金额 */
    nationChrg () {
      let chrgMoney = 0
      if (this.num2 >= 100000) {
        chrgMoney = this.chrgDeliveryPrice[3]
      } else if (this.num2 >= 20000) {
        chrgMoney = this.chrgDeliveryPrice[2]
      } else if (this.num2 >= 10000) {
        chrgMoney = this.chrgDeliveryPrice[1]
      } else if (this.num2 >= 2000) {
        chrgMoney = this.chrgDeliveryPrice[0] * (this.num2 / 2000)
      }
      return chrgMoney
    },
    nationTotal () {
      return this.nationFFP2 + this.nationChrg
    },
    /* 法国快递的盒数 */
    num3 () {
      return this.num1 / 600 + this.num2 / 2000
    },
    /* 法国快递费——法国快递根据盒数计算对应金额(唯一的一个价格) */
    francePrice () {
      let money = 0
      switch (this.num1 / 600 + this.num2 / 2000) {
        case 1: money = this.franceDeliveryPrice[0]
          break
        case 2: money = this.franceDeliveryPrice[1]
          break
        case 3: money = this.franceDeliveryPrice[2]
          break
        case 4: money = this.franceDeliveryPrice[3]
          break
        case 5: money = this.franceDeliveryPrice[4]
          break
        case 6: money = this.franceDeliveryPrice[5]
          break
        default: money = this.franceDeliveryPrice[6]
          break
      }
      return money
    },
    /* ffp2超级快递单价 */
    priceEXPffp2 () {
      return this.ffp2DeliveryPrice * 2
    },
    /* chrg超级快递单价 */
    priceEXPchrg () {
      return this.chrgDeliveryPrice * 2
    },
    /* 超级快递费计算 */
    expressTotalFFP2 () {
      return this.express_ffp2 * this.priceEXPffp2
    },
    expressTotalChrg () {
      return this.express_chrg * this.priceEXPchrg
    },
    express () {
      const boxes = this.express_chrg / 50 + this.express_ffp2 / 10
      if (boxes === 0) {
        return 0
      } else {
        return Math.ceil(boxes / 9) * 7 >= 150 ? 150 : Math.ceil(boxes / 9) * 7
      }
    },
    /* 总价 */
    total_HT () {
      if (this.flag) { /* 加超级快递 */
        return this.ffp2Total + this.chrgTotal + this.nationFFP2 + this.nationChrg + this.expressTotalFFP2 + this.expressTotalChrg + this.express
      } else { /* 不加超级快递 */
        return this.ffp2Total + this.chrgTotal + this.nationFFP2 + this.nationChrg
      }
    },
    /* 纳税 */
    total_TVA () {
      return this.total_HT * 0.055
    },
    /* 最终金额 */
    total_TTC () {
      return this.total_HT * 1.055
    },
    /* 选择超级快递之后ffp2和chrg的可选最大值 */
    ffp2_max () {
      if (this.num1 !== 0) {
        return this.num1 * 0.1
      } else {
        return 0
      }
    },
    chrg_max () {
      if (this.num2 !== 0) {
        return this.num2 * 0.1
      } else {
        return 0
      }
    }
  },
  created () {
    this.getPrice()
  },
  methods: {
    getPrice () {
      this.$http.get('info').then((res) => {
        if (res.status === 200) {
          this.ffp2DeliveryPrice = res.data.ffp2DeliveryPrice // ffp2_国际快递费
          this.chrgDeliveryPrice = res.data.chrgDeliveryPrice // 医用_国际快递费
          this.price1 = res.data.ffp2Price // ffp2单价——数组
          this.price2 = res.data.chrgPrice // 医用口罩单价——数组
        }
      })
    },
    postForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post('user/register', {
            firstName: this.capitalLetter(this.userForm.firstName),
            lastName: this.capitalLetter(this.userForm.lastName),
            company: this.capitalLetter(this.userForm.company),
            phone: this.userForm.telephone,
            mail: this.userForm.to
          }).then((resp) => {
            this.$store.commit('auth_success', resp.data.token, resp.data.userId, resp.data.permission)
            this.$http.defaults.headers.common.Authorization = resp.data.token
            // send mail
            this.$http.post('email/sendSummary', {
              to: this.userForm.to, // 邮箱
              firstName: this.capitalLetter(this.userForm.firstName),
              lastName: this.capitalLetter(this.userForm.lastName),
              ffp2: this.num1, // ffp2口罩数量
              chrg: this.num2, // 医用口罩数量
              ffp2Price: this.ffp2Total + '€', // ffp2价格(×)
              chrgPrice: this.chrgTotal + '€', // 医用价格(×)
              deliveryInter: this.nationTotal + '€', // 国际快递
              ht: Math.round(this.total_HT * 100) / 100 + '€', // (总价)
              ttc: Math.round(this.total_TTC * 100) / 100 + '€' // (总价+税价(1.2))
            })

            this.$http.post('product/create', {
              ffp2: this.num1, // ffp2口罩数目
              chrg: this.num2, // 医用口罩数目
              ffp2Express: this.ffp2Express, // ffp2超级快递数量
              chrgExpress: this.chrgExpress // chrg超级快递数量
            }).then((productId) => {
              this.$http.post('deal/create', {
                productId: productId.data,
                userId: resp.data.userId // 上面的userId
              }).then((dealId) => {
                this.$http.post('user/addDeal', {
                  userId: resp.data.userId,
                  dealId: dealId.data
                }).then((res) => {
                  /* 跳转到感谢页面并传参过去 */
                  this.$router.push({ path: '/validationEstimation', query: { ffp2: this.num1, chrg: this.num2, express_ffp2: this.express_ffp2, express_chrg: this.express_chrg } })
                })
              })
            })
          })
        } else {
          return false
        }
      })
    },
    change1 () {
      this.express_ffp2 = this.num1 * 0.1 < this.express_ffp2 ? this.num1 * 0.1 : this.express_ffp2
    },
    change2 () {
      this.express_chrg = this.num2 * 0.1 < this.express_chrg ? this.num2 * 0.1 : this.express_chrg
    },
    capitalLetter (str) {
      str = str.split(' ')

      for (var i = 0, x = str.length; i < x; i++) {
        str[i] = str[i][0].toUpperCase() + str[i].substr(1).toLowerCase()
      }

      return str.join(' ')
    }
  }
}
</script>

<style lang="scss" scoped>
.active{
  color:#6ebcc5;
}
.content{
  height:100%;
  display:flex;
  flex-direction:column;
  padding: 2rem 0;
   // align-items: center; Not good practice the container size depends of your content size.
  th,td{
    padding:10px 3%;
  }
  .t_date{
    text-align: left;
    width: 45%;
  }
  .t_num{
    text-align: right;
    width: 20%;
  }
  .t_center{
    text-align: center;
    width: 20%;
  }
  .t_height{
    padding:30px 3% 10px;
  }
  .t_total{
    font-size:18px;
    font-weight: bold;
  }
  .c_top{
    h2{
      margin:25px 0 40px;
    }
    .c_side{
      margin:0 0 5px 0;
      // display:flex;
      // justify-content: space-between;
      // align-items: center;
      .c_text{
        span{
          &:first-child{
            font-size:14px;
          }
          &:nth-child(2){
            font-size:14px;
            font-weight: bold;
            color:#6ebcc5;
          }
        }
      }
      .block{
        width:100%;
        .el-input-number{
          width:100%;
        }
      }
    }
    .c_left{
      p{
        margin-left:10px;
        display:inline-block;
      }
    }
  }
  .c_middle{
    table{
      width:100%;
      font-size:12px;
      border-width: 0 1px 0 1px;
      border-style: solid;
      border-color: rgba(232, 232, 232, 1);
      border-radius: 8px;
      thead{
        /*font-family: SourceHanSansSC-regular;*/
        background: rgba(232, 232, 232, 1);
        color: rgba(179, 179, 179, 179);
        .t_title {
          height: 30px;
        }
      }
      .line{
        width:99%;
        height: 2px;
        border-bottom: 2px dotted rgba(187, 187, 187, 1);
      }
    }
  }
  .c_bottom{
    margin-top:40px;
    h2{
      margin-bottom:20px;
    }
    .el_form{
      display:flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .c_two{
        width:40%;
        span{
          margin:0 0 10px 0;
        }
        .el-form-item__content{
          margin-left:0!important;
          margin-top:10px;
        }
      }
        label{
          line-height: 20px !important;
        }
    }
  }
  .c_button{
    margin:15px 0 30px 0;
    display:flex;
    flex-direction:column;
    align-items: center;
  }
}

.contact_input{
  width: calc(100% + 20px);
}

h4 {
  margin-bottom: 10px
}
</style>
