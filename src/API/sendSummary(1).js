
export function  sendSummary() {
    //Send Mail to customer
    let deliveryInter = this.deliveryInterChrg + this.deliveryInterFFP2
    axios.post('/email/sendSummary', {
      params: {
        to: this.to, // 邮箱
        firstName: this.firstName,
        lastName: this.lastName,
        chrg: this.chrg,
        ffp: this.ffp2,
        chrgPrice: this.chrgPrice + "€",
        ffp2Price: this.ffp2Price + "€",
        deliveryInter: this.deliveryInter + "€",
        deliveryFrance: this.deliveryFrance + "€",
        chrgExpressPrice: this.chrgExpressPrice,  // chrg * chrgDeliveryPrice * 2
        ffp2ExpressPrice: this.ffp2ExpressPrice, // ffp2 * ffp2DeliveryPrice * 2
        express: this.express,
        ht: this.ht + "€",
        ttc: this.ttc + "€"
      }
    })

    // Add User and Deal to Database
    axios.post('/user/register', {
      params: {
        firstName: this.firstName,
        lastName: this.lastName,
        company: this.company,
        phone: this.phone,
        mail: this.mail
      }
    }).then(userId => {
      axios.post('/product/create', {
        params: {
          chrg: this.chrg,
          ffp2: this.ffp2,
          chrgExpress: this.chrgExpress,
          ffp2Express: this.ffp2Express
        }
      }).then(productId => {
        axios.post('/deal/create', {
          params: {
            product: productId,
            customer: userId
          }
        }).then(dealId => {
          axios.post('user/addDeal', {
            params: {
              userId: userId,
              deals: dealId
            }
          })
        })
      })
    })
    //Redirect to Page Quote 2
  }
