
export function  sendSummary() {
    //Send Mail to customer
    let deliveryInter = this.deliveryInterChrg + this.deliveryInterFFP2
    axios.post('email/sendSummary', {
      to: this.to,
      firstName: this.firstName,
      lastName: this.lastName,
      chrg: this.chrg,
      ffp: this.ffp2,
      chrgPrice: this.chrgPrice + "€",
      ffp2Price: this.ffp2Price + "€",
      deliveryInter: deliveryInter + "€",
      deliveryFrance: this.deliveryFrance + "€",
      express: this.express,
      ht: this.ht,
      ttc: this.ttc
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
          ffp2: this.ffp2
        }
      }).then(productId => {
        axios.post('/deal/create', {
          params: {
            product: this.productId,
            customer: this.userId
          }
        }).then(dealId => {
          axios.post('user/addDeal', {
            params: {
              userId: this.userId,
              deals: this.dealId
            }
          })
        })
      })
    })
    //Redirect to Page Quote 2
  }
