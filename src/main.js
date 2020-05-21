import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import vueHeadful from 'vue-headful' // titles
// import 'element-ui/lib/theme-chalk/index.css'
import '../src/assets/scss/index.css' // custom theme colors(主题色)
import 'element-ui/lib/theme-chalk/display.css'
import locale from '../node_modules/element-ui/lib/locale/lang/en' /* 切换成英文版 */
import '../src/assets/scss/global.scss'
import axios from 'axios'
import { currency } from './util/currency' // 全局过滤器的使用
import simplebar from 'simplebar-vue' // simplebar
import 'simplebar/dist/simplebar.min.css'

// axios.interceptors.request.use(config => {
//   config.headers.Authorization = window.localStorage.getItem('token')
//   return config
// })

// reauth user
const token = window.localStorage.getItem('token')
if (token) {
  if (store.getters.user) {
    axios.defaults.headers.common.Authorization = token
    store.dispatch('reAuth', token)
  }
}

// reauth qb
const qb = window.localStorage.getItem('qb')
if (qb) {
  store.dispatch('qbReAuth')
}

axios.defaults.baseURL = 'https://www.supply.medicalhero.fr/api/'
// axios.defaults.baseURL = 'https://www.medicalhero.fr/api/'
// axios.defaults.baseURL = 'http://localhost:8444/'

Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(ElementUI, { locale }) /* 成功切换成英文版本 */
Vue.use(VueRouter)
Vue.component('vue-headful', vueHeadful)
Vue.component('simplebar', simplebar)
Vue.filter('currency', currency)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
