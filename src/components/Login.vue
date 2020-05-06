<template>
  <div class="container">
    <div id="login">
      <div class="box">
        <h3 >Mon espace personnel</h3>
        <el-form :model="userForm" :rules="userFormRules" ref="userFormRef" ><!-- label-width="80px"-->
          <!-- <el-form-item prop="email">
            <div class="field">
              <el-input v-model="userForm.email" @focus="emailFocus=true" @blur="unfocus('email')" auto-complete="email" id="email" name="email"></el-input>
              <div class="floatLabel">
                <transition name="el-zoom-in-bottom">
                  <div v-show="emailFocus">Email</div>
                </transition>
              </div>
              <div class="placeholder">
                <transition name="el-zoom-in-bottom">
                  <div v-show="!emailFocus">Email</div>
                </transition>
              </div>
            </div>
          </el-form-item>
          <el-form-item prop="password">
            <div class="field">
              <el-input v-model="userForm.password" show-password @focus="passwordFocus=true" @blur="unfocus('password')" auto-complete="current-password" id="password" name="password"></el-input>
              <div class="floatLabel">
                <transition name="el-zoom-in-bottom">
                  <div v-show="passwordFocus">Mot de passe</div>
                </transition>
              </div>
              <div class="placeholder">
                <transition name="el-zoom-in-bottom">
                  <div v-show="!passwordFocus">Mot de passe</div>
                </transition>
              </div>
            </div>
          </el-form-item> -->
           <el-form-item prop="email" label="email">
                  <el-input v-model="userForm.email" type="email" id="email" name="email" auto-complete="email"></el-input>
                </el-form-item>
                 <el-form-item prop="password" label="password">
                  <el-input v-model="userForm.password" type="password" id="password" name="password" auto-complete="current-password"></el-input>
                </el-form-item>
          <el-form-item class="login_button">
            <el-button native-type="submit" type="primary" @click.stop.prevent="login()">Me connecter</el-button>
          </el-form-item>
        </el-form>
        <div style="font-size:0.8rem">
            <el-button type="primary" v-if="this.$store.getters.permission >= 2" @click="logout()">deco</el-button>
          <router-link to="/">Mot de passe oublié?</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    var checkEmail = (rule, value, callback) => {
      // 验证邮箱的正则表达式
      const regEmail = /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      if (regEmail.test(value)) {
        return callback()
      }
      callback(new Error('Veuillez saisir un Email valide.'))
    }
    return {
      emailFocus: false,
      passwordFocus: false,
      userForm: {
        email: '', // 邮箱
        password: ''
      },
      userFormRules: {
        email: [
          { required: true, message: 'Veuillez saisir votre Email.', trigger: 'none' },
          { validator: checkEmail, trigger: 'none' }
        ],
        password: [
          { required: true, message: 'Veuillez saisir votre mot de passe.', trigger: 'none' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.userFormRef.validate((valid) => {
        if (valid) {
          const mail = this.userForm.email
          const password = this.userForm.password
          this.$store.dispatch('login', { mail, password })
            .then(() => {
              this.$router.push('/admin')
            })
            .catch(err => console.log(err))
        }
      })
    },
    unfocus (string) {
      if (string === 'email') {
        this.userForm.email ? this.emailFocus = true : this.emailFocus = false
      }
      if (string === 'password') {
        this.userForm.password ? this.passwordFocus = true : this.passwordFocus = false
      }
    },
    logout () {
      this.$store.dispatch('logout')
        .then(() => {
          if (this.$router.currentRoute.path !== '/login') {
            console.log('test')
            this.$router.push('/login')
          }
        })
        .catch(err => console.log(err))
    }
  }
}
</script>

<style lang="scss">
#login{
  width:100%;
  height:100%;
  display:flex;
  justify-content: center;
  align-items: center;
  padding: 3.5rem 0;
  .box{
    width:400px;
    .el-form{
      margin-top:30px;
      .el-form-item{
        margin:20px 0;
        .el-form-item__label{
          &::before {
            content: '';
          }
        }
      }
      .login_button {
        margin-top:20px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  .floatLabel {
    position: absolute;
    top: 3px;
    left: 17px;
    font-size: 10px;
    color:#91A2BA;
    pointer-events: none;
  }

  .placeholder {
    position: absolute;
    top: 11px;
    left: 16px;
    font-size: 15px;
    color:#BDC8D6;
    pointer-events: none;
  }

  .field {
    position: relative;
    display: flex;
    flex-flow: column-reverse;
    line-height: normal;
  }

  input {
    height: 2.5rem;
    padding-top: 0.5rem;
  }

  //invible placeholder
  ::-webkit-input-placeholder {
    opacity: 0;
  }
}

</style>
