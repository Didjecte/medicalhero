<template>
  <div class="content" v-if="this.info">
    <vue-headful
            title="MedicalHero - Devis"
            description="Demander un devis pour votre commande."
        />
    <div v-if="state === 'devis'">
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
                    <el-input-number v-model="num2" :step="2000" step-strictly :min="0" @change="change2"></el-input-number>
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
                    <el-input-number v-model="num1" :step="600" step-strictly :min="0" @change="change1"></el-input-number>
                  </div>
                </el-col>
              </el-row>
            </div>
            <el-collapse-transition>
              <div v-show="isEmpty">
                <el-alert title="La commande ne peut être vide." type="error" :closable="false"></el-alert>
              </div>
            </el-collapse-transition>
            <p style="font-size:12px"><el-checkbox v-model="express">
              Livraison Express:</el-checkbox> Réception sous 2j dans la limite du stock disponible.
            </p>
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
            <div v-show="express">
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
            <el-row type="flex" justify="center" align="middle" class="contact_input" :gutter="20">
              <el-col :span="24">
                <el-form-item prop="street" label="Adresse">
                  <el-input v-model="userForm.street"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="center" align="middle" class="contact_input"  :gutter="20">
              <el-col>
                <el-form-item prop="complement" label="Complément d'adresse">
                  <el-input v-model="userForm.complement"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="center" align="middle" class="contact_input" :gutter="20">
              <el-col>
                <el-form-item prop="zip" label="Code Postal">
                  <el-input v-model="userForm.zip"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item prop="city" label="Ville">
                  <el-input v-model="userForm.city"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="c_button"><el-button @click.stop.prevent="postForm('userFormRef')" native-type="submit" type="primary" :disabled="isEmpty">Recevoir un devis final</el-button></div>
          </el-form>
        </div>
      </div>
    </div>
    <div v-if="state === 'thank'">
      <div class="c_top thank">
        <div class="container">
          <section class="section1">
            <!-- <img :src="require('../assets/images/medicalHeroLogo.png')" class="imgLogo"> -->
            <h2 class="title">Nous avez bien pris en compte votre demande</h2>
          </section>
          <section class="section2">
            <p>Un email récapitulatif vous a été envoyé.<i class="el-icon-s-promotion" style="font-size:25px"></i></p>
            <p>Vous recevrez votre devis sous <b>24h</b>, il est possible que nous vous contactions pour plus de précisions.</p>
            <b>Vous avez demandé un devis pour:</b>
            <div v-if="num2 !== 0">-&nbsp;&nbsp;<span>{{num2}}</span>&nbsp;&nbsp;masques chirugicaux</div><!--医用数量-->
            <div v-if="num1 !== 0">-&nbsp;&nbsp;<span>{{num1}}</span>&nbsp;&nbsp;masques ffp2</div><!--ffp2数量-->
            <div v-if="express">-&nbsp;&nbsp;<span>Livraison sous 2 jours</span></div><!--ffp2数量-->
          </section>
          <section style="margin-top: 2rem">
            <div>
              Vous pouvez également avoir une estimation du prix en live:
              <el-button @click="state = 'estimate'" type="primary" :disabled="isEmpty">Outil d'estimation</el-button>
            </div>
          </section>
          <section class="section4">
          </section>
        </div>
      </div>
    </div>
    <div v-if="state === 'estimate'">
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
                    <el-input-number v-model="num2" :step="2000" step-strictly :min="0" @change="change2"></el-input-number>
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
                    <el-input-number v-model="num1" :step="600" step-strictly :min="0" @change="change1"></el-input-number>
                  </div>
                </el-col>
              </el-row>
            </div>
            <div>
            <p style="font-size:12px"><el-checkbox v-model="express">
              Livraison Express:</el-checkbox> Réception sous 2j dans la limite du stock disponible.
            </p>
            </div>
            <el-collapse-transition>
              <div v-show="isEmpty">
                <el-alert title="La commande ne peut être vide." type="error" :closable="false"></el-alert>
              </div>
            </el-collapse-transition>
            <el-collapse-transition>
              <div v-show="express">
                <div class="c_side">
                  <el-row type="flex" justify="space-between" align="middle">
                    <el-col>
                      <div class="c_text">
                        <span>Masques Chirurgicaux (Max 20000)：</span><span>{{express_chrg}}</span>
                      </div>
                    </el-col>
                    <el-col>
                      <div class="block">
                        <el-input-number v-model="express_chrg" :step="2000" step-strictly :min="0" :max="chrg_max"></el-input-number>
                      </div>
                    </el-col>
                  </el-row>
                </div>
                <div class="c_side">
                  <el-row type="flex" justify="space-between" align="middle">
                    <el-col>
                      <div class="c_text">
                        <span>Masques FFP2 (Max 9600)：</span><span>{{express_ffp2}}</span>
                      </div>
                    </el-col>
                    <el-col>
                      <div class="block">
                        <el-input-number
                          v-model="express_ffp2"
                          :step="600"
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
            <div>
              <p style="color:gray;font-size:12px;">🚀<i>Contactez nous si vous avez des questions.<br/>
              Par mail : <a href="mailto:contact@medicalhero.fr" target="_blank">contact@medicalhero.fr</a><br/>
              Par téléphone : Anne est à votre disposition du Lundi au Samedi de 9h à 19h, au +33(0)6 46 84 13 45</i></p>
            </div>
          </div>
        </div>
      </div>
      <div class="c_middle">
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
                <td class="t_date t_height">Masques Chirurgicaux (Lots de 2000)</td>
                <td class="t_center t_height">{{num2}}</td>
                <td class="t_center t_height">{{chrgPrice}}</td>
                <td class="t_num t_height">{{chrgTotal | currency}}</td>
              </tr>
              <tr>
                <td class="t_date">Masques FFP2 (Lots de 600)</td>
                <td class="t_center" style="width:300px">{{num1}}</td>
                <td class="t_center">{{ffp2Price}}</td>
                <td class="t_num">{{ffp2Total | currency}}</td>
              </tr>
              <tr>
                <td class="t_date">Livraison Standard (7-12j) - Masques chirurgicaux</td>
                <td class="t_center">{{chrgStandard}}</td>
                <td class="t_center">{{nationChrg | currency}}</td>
                <td class="t_num">{{chrgStandard * nationChrg | currency}}</td>
              </tr>
              <tr>
                <td class="t_date">Livraison Standard (7-12j) - Masques FFP2</td>
                <td class="t_center">{{ffp2Standard}}</td>
                <td class="t_center">{{nationFFP2 | currency}}</td>
                <td class="t_num">{{ffp2Standard * nationFFP2 | currency}}</td>
              </tr>
            </tbody>
          </table>
          <el-collapse-transition>
            <div v-show="express">
              <table>
                <tbody>
                  <tr>
                    <td class="t_date">Livraison Express (2j) - Masques chirurgicaux</td>
                    <td class="t_center">{{express_chrg}}</td>
                    <td class="t_center">{{priceEXPchrg}}</td>
                    <td class="t_num">{{expressTotalChrg | currency}}</td>
                  </tr>
                  <tr>
                    <td class="t_date">Livraison Express Express (2j) - Masques FFP2</td>
                    <td class="t_center">{{express_ffp2}}</td>
                    <td class="t_center">{{priceEXPffp2}}</td>
                    <td class="t_num">{{expressTotalFFP2 | currency}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </el-collapse-transition>
          <table style="border-bottom: 1px solid rgba(232, 232, 232, 1)">
            <tbody>
              <tr>
                <td style="padding:20px 0 10px"><div class="line"></div></td>
                <td style="padding:20px 0 10px"><div class="line"></div></td>
                <td style="padding:20px 0 10px"><div class="line"></div></td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td class="t_date t_height"></td>
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
      </div>
      <div class="c_bottom">
        <div class="container">
          <el-form :model="userForm" :rules="userFormRules" ref="userFormRef" class="el_form">
            <div class="c_button" style="width:100%"><el-button @click.stop.prevent="postForm('userFormRef')" native-type="submit" type="primary" :disabled="isEmpty">Recevoir un autre devis</el-button></div>
          </el-form>
        </div>
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
    const checkZip = (rule, value, callback) => {
      const regTel = /^\d{5}$/
      if (regTel.test(value)) {
        return callback()
      }
      callback(new Error('Veuillez saisir un code postal valide.'))
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
      state: 'devis',
      /* input: 12, */
      /* 口罩数量 */
      num1: 600,
      num2: 2000,
      express: true,
      // flag: false,
      /* 口罩数组单价 */
      price1: [1, 2, 3, 4],
      price2: [1, 2, 3, 4, 5],
      /*  国际和法国两个快递 */
      ffp2DeliveryPrice: [], // ffp2_国际快递费
      chrgDeliveryPrice: [], // 医用_国际快递费
      franceDeliveryPrice: [], // 法国快递数组费
      /* 超级快递中口罩数量 */
      express_ffp2: 600, // 10个10个一加
      express_chrg: 2000, // 50个50个一加
      info: null,
      /* ------------------ */
      // disabled: true,
      // isActive: false,
      userForm: {
        firstName: '',
        lastName: '',
        company: '',
        telephone: '',
        to: '',
        street: '',
        complement: '',
        zip: '',
        city: ''
      },
      addressId: '',
      userFormRules: {
        firstName: [
          { required: true, message: 'Veuillez saisir votre prénom!', trigger: 'blur' },
          { validator: checkName, trigger: 'blur' }
        ],
        lastName: [
          { required: true, message: 'Veuillez saisir votre nom!', trigger: 'blur' },
          { validator: checkName, trigger: 'blur' }
        ],
        company: [
          { required: true, message: 'Veuillez saisir le nom de votre société!', trigger: 'blur' }
        ],
        telephone: [
          { required: true, message: 'Veuillez saisir votre téléphone!', trigger: 'blur' },
          { validator: checkTel, trigger: 'blur' }
        ],
        to: [
          { required: true, message: 'Veuillez saisir votre Email!', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        street: [
          { required: true, message: 'Veuillez saisir votre adresse!', trigger: 'blur' }
        ],
        complement: [
          { required: false }
        ],
        zip: [
          { required: true, message: 'Veuillez saisir votre code postal!', trigger: 'blur' },
          { validator: checkZip, trigger: 'blur' }
        ],
        city: [
          { required: true, message: 'Veuillez saisir votre ville!', trigger: 'blur' }
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
    chrgStandard () {
      if (this.express) {
        return this.num2 - this.express_chrg
      } else {
        return this.num2
      }
    },
    ffp2Standard () {
      if (this.express) {
        return this.num1 - this.express_ffp2
      } else {
        return this.num1
      }
    },
    /* ffp2 国际快递总金额 */
    nationFFP2 () {
      let ffpMoney = 0
      if (this.ffp2Standard >= 1000000) {
        ffpMoney = this.info.ffp2.standardPrice[2]
      } else if (this.ffp2Standard >= 100000) {
        ffpMoney = this.info.ffp2.standardPrice[2]
      } else if (this.ffp2Standard >= 10000) {
        ffpMoney = this.info.ffp2.standardPrice[1]
      } else if (this.ffp2Standard >= 600) {
        ffpMoney = this.info.ffp2.standardPrice[0]
      }
      return ffpMoney
    },
    /* 医用 国际快递总金额 */
    nationChrg () {
      let chrgMoney = 0
      if (this.chrgStandard >= 1000000) {
        chrgMoney = this.info.chrg.standardPrice[3]
      } else if (this.chrgStandard >= 100000) {
        chrgMoney = this.info.chrg.standardPrice[3]
      } else if (this.chrgStandard >= 20000) {
        chrgMoney = this.info.chrg.standardPrice[2]
      } else if (this.chrgStandard >= 10000) {
        chrgMoney = this.info.chrg.standardPrice[1]
      } else if (this.chrgStandard >= 2000) {
        chrgMoney = this.info.chrg.standardPrice[0]
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
    /* ffp2超级快递单价 */
    priceEXPffp2 () {
      if (this.express_ffp2 >= 1000000) {
        return this.info.ffp2.expressPrice[2]
      } else if (this.express_ffp2 >= 100000) {
        return this.info.ffp2.expressPrice[2]
      } else if (this.express_ffp2 >= 10000) {
        return this.info.ffp2.expressPrice[1]
      } else if (this.express_ffp2 >= 600) {
        return this.info.ffp2.expressPrice[0]
      } else {
        return 0
      }
    },
    /* chrg超级快递单价 */
    priceEXPchrg () {
      if (this.express_chrg >= 1000000) {
        return this.info.chrg.expressPrice[2]
      } else if (this.express_chrg >= 100000) {
        return this.info.chrg.expressPrice[2]
      } else if (this.express_chrg >= 10000) {
        return this.info.chrg.expressPrice[1]
      } else if (this.express_chrg >= 600) {
        return this.info.chrg.expressPrice[0]
      } else {
        return 0
      }
    },
    /* 超级快递费计算 */
    expressTotalFFP2 () {
      return this.express_ffp2 * this.priceEXPffp2
    },
    expressTotalChrg () {
      return this.express_chrg * this.priceEXPchrg
    },
    // express () {
    //   const boxes = this.express_chrg / 50 + this.express_ffp2 / 10
    //   if (boxes === 0) {
    //     return 0
    //   } else {
    //     return Math.ceil(boxes / 9) * 7 >= 150 ? 150 : Math.ceil(boxes / 9) * 7
    //   }
    // },
    /* 总价 */
    total_HT () {
      if (this.express) { /* 加超级快递 */
        return this.ffp2Total + this.chrgTotal + this.ffp2Standard * this.nationFFP2 + this.chrgStandard * this.nationChrg + this.expressTotalFFP2 + this.expressTotalChrg
      } else { /* 不加超级快递 */
        return this.ffp2Total + this.chrgTotal + this.ffp2Standard * this.nationFFP2 + this.chrgStandard * this.nationChrg
      }
    },
    /* 纳税 */
    total_TVA () {
      if (this.express) { /* 加超级快递 */
        return (this.ffp2Total + this.chrgTotal) * 0.055 + (this.ffp2Standard * this.nationFFP2 + this.chrgStandard * this.nationChrg + this.expressTotalFFP2 + this.expressTotalChrg) * 0.2
      } else { /* 不加超级快递 */
        return (this.ffp2Total + this.chrgTotal) * 0.055 + (this.ffp2Standard * this.nationFFP2 + this.chrgStandard * this.nationChrg) * 0.2
      }
    },
    /* 最终金额 */
    total_TTC () {
      return this.total_HT + this.total_TVA
    },
    /* 选择超级快递之后ffp2和chrg的可选最大值 */
    ffp2_max () {
      if (this.num1 < 9600) {
        return this.num1
      } else {
        return 9600
      }
    },
    chrg_max () {
      if (this.num2 < 20000) {
        return this.num2
      } else {
        return 20000
      }
    }
  },
  created () {
    this.getPrice()
  },
  mounted () {
    this.$nextTick(function () {
      this.getUser()
    })
  },
  methods: {
    getPrice () {
      this.$http.get('info').then((res) => {
        if (res.status === 200) {
          this.info = res.data
          this.ffp2DeliveryPrice = res.data.ffp2DeliveryPrice // ffp2_国际快递费
          this.chrgDeliveryPrice = res.data.chrgDeliveryPrice // 医用_国际快递费
          this.price1 = res.data.ffp2Price // ffp2单价——数组
          this.price2 = res.data.chrgPrice // 医用口罩单价——数组
        }
      })
    },
    getUser () {
      return new Promise((resolve, reject) => {
        if (this.$store.getters.user) {
          this.state = 'estimate'
          this.userId = this.$store.getters.user._id
          this.userForm.firstName = this.$store.getters.user.firstName
          this.userForm.lastName = this.$store.getters.user.lastName
          this.userForm.to = this.$store.getters.user.mail
          this.addressId = this.$store.getters.user.addresses[0]
          setTimeout(function () {
            resolve()
          }, 1000)
        } else {
          if (window.localStorage.getItem('token')) {
            this.$http.defaults.headers.common.Authorization = window.localStorage.getItem('token')
            this.$store.dispatch('reAuth', window.localStorage.getItem('token')).then(() => {
              if (this.$store.getters.user) {
                this.state = 'estimate'
                this.userId = this.$store.getters.user._id
                this.userForm.firstName = this.$store.getters.user.firstName
                this.userForm.lastName = this.$store.getters.user.lastName
              }
            })
          }
          setTimeout(function () {
            resolve()
          }, 1000)
        }
      })
    },
    createNewCustomer (formName) {
      return new Promise((resolve, reject) => {
        if (!this.$store.getters.user) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.$http.post('address/create', {
                street: this.userForm.street,
                complement: this.userForm.complement,
                zip: this.userForm.zip,
                city: this.userForm.city,
                name: this.userForm.firstName + ' ' + this.userForm.lastName,
                company: this.userForm.company,
                phone: this.userForm.telephone,
                mail: this.userForm.to
              }).then((address) => {
                this.addressId = address.data
                this.$http.post('user/register', {
                  firstName: this.capitalLetter(this.userForm.firstName),
                  lastName: this.capitalLetter(this.userForm.lastName),
                  company: this.capitalLetter(this.userForm.company),
                  phone: this.userForm.telephone,
                  mail: this.userForm.to,
                  address: address.data
                }).then((resp) => {
                  window.localStorage.setItem('token', resp.data.token)
                  this.userId = resp.data.userId
                  this.$store.commit('auth_success', resp.data.token, resp.data.userId, resp.data.permission)
                  this.$store.commit('set_user', resp.data.user)
                  this.$http.defaults.headers.common.Authorization = resp.data.token
                })
              })
            }
            setTimeout(function () {
              resolve()
            }, 1000)
          })
        }
        setTimeout(function () {
          resolve()
        }, 1000)
      })
    },
    postForm (formName) {
      this.createNewCustomer(formName).then(() => {
        // send mail
        this.$http.post('email/sendSummary', {
          to: this.userForm.to, // 邮箱
          firstName: this.capitalLetter(this.userForm.firstName),
          lastName: this.capitalLetter(this.userForm.lastName),
          ffp2: this.num1, // ffp2口罩数量
          chrg: this.num2 // 医用口罩数量
        })
        this.$http.post('product/create', {
          ffp2: this.num1, // ffp2口罩数目
          chrg: this.num2, // 医用口罩数目
          ffp2Express: this.express_ffp2, // ffp2超级快递数量
          chrgExpress: this.express_chrg // chrg超级快递数量
        }).then((productId) => {
          this.$http.post('deal/create', {
            productId: productId.data,
            userId: this.userId, // 上面的userId
            address: this.addressId
          }).then((dealId) => {
            this.$http.post('user/addDeal', {
              userId: this.userId,
              dealId: dealId.data
            }).then((res) => {
            /* 跳转到感谢页面并传参过去 */
              this.state = 'thank'
            // this.$router.push({ path: '/validationEstimation', query: { ffp2: this.num1, chrg: this.num2, express_ffp2: this.express_ffp2, express_chrg: this.express_chrg } })
            })
          })
        })
      })
    },
    change1 (currentValue, oldValue) {
      if (this.express_ffp2 + currentValue - oldValue < 9600) {
        if (this.express_ffp2 < oldValue) {
          this.express_ffp2 = currentValue
        } else {
          this.express_ffp2 = this.express_ffp2 + currentValue - oldValue
        }
      } else {
        this.express_ffp2 = 9600
      }
    },
    change2 (currentValue, oldValue) {
      if (this.express_chrg + currentValue - oldValue < 20000) {
        if (this.express_chrg < oldValue) {
          this.express_chrg = currentValue
        } else {
          this.express_chrg = this.express_chrg + currentValue - oldValue
        }
      } else {
        this.express_chrg = 20000
      }
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
      /deep/ label{
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

.thank{
  width:100%;
  height:100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3.5rem 0;
  .section4{
    margin-top:3rem;
    font-size:1.25rem;
    font-weight: bold;
  }
}

.imgLogo{
  height: 120px;
  display: block;
  margin: 0 auto;
}

.title {
  margin-bottom: 40px;
}
</style>
